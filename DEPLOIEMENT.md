# Compteurs manuels : réinitialisation globale uniquement

Cette version retire les boutons de réinitialisation individuelle. Tous les
compteurs manuels et leurs dates utilisent désormais la dernière réinitialisation
globale (`kind = 'reset'`, `hub = 0`). Les événements individuels historiques sont
conservés mais ignorés dans ces calculs.

La correction SQL a été appliquée à la base partagée le 15 novembre 2026 via
la migration `manual_counters_global_reset_only`. Vérification après application :
79, 77 et 81 entrées (total 237), total quotidien 98 et veille 139. Les 928
événements historiques et leur empreinte étaient identiques avant et après.

Pour mettre cette correction en service, appliquer `update-counters.sql` à la
base existante, puis publier les fichiers reconstruits de l’application. Ce script
remplace uniquement `ioa_snapshot` ; il ne modifie aucune entrée, aucune permission
ni la fonction d’enregistrement `ioa_action`. Ne pas réexécuter `schema.sql` sur la
base existante et ne pas réinitialiser les compteurs pour activer la correction.

Les anciens navigateurs recevront également les nouveaux calculs ; recharger la
page après publication pour retirer leurs anciens boutons individuels. Un ancien
bouton individuel peut encore enregistrer un événement, mais cet événement n’a
plus d’effet sur les compteurs.

Vérifications réalisées : 17 tests d’interface et de compteur horaire, compilation
TypeScript et contrôle des pages statiques. Le corps SQL modifié a également été
exécuté en lecture seule avec sept jeux de données fictifs : réinitialisations
individuelles, absence de reset global, historique vide, reset global, entrée
suivante, avant 7 h et à 7 h. La reconstitution historique de la capture retrouve
75, 74 et 76 entrées, soit 225, et conserve le total quotidien de 86.

## Notes de la version précédente : compteur horaire

Les indications ci-dessous concernent uniquement l’ajout du compteur horaire.
La correction des compteurs manuels décrite ci-dessus nécessite bien la mise à
jour de `ioa_snapshot`.

Cette version ne modifie que l’interface et ajoute une lecture des événements.

## Pourquoi aucun SQL n’est nécessaire

Le schéma actuel du dépôt contient déjà :

- les horodatages serveur `hub_events.at`, en millisecondes ;
- les colonnes `hub`, `kind` et `seq` ;
- le droit SELECT pour `anon` et `authenticated` ;
- la politique RLS `shared_read` qui autorise cette lecture.

La nouvelle requête GET lit seulement `hub` et `at`, filtre `kind=entry` et la
fenêtre des 60 minutes, et parcourt toutes les pages dans l’ordre `seq`.
Le total exact de `Content-Range` évite de confondre une page limitée avec le total.
Aucune écriture, nouvelle table, RPC, permission, politique ou trigger n’est requis.
`ioa_snapshot`, `ioa_action`, `schema.sql` et `update-counters.sql` restent inchangés.

Le calcul horaire est séparé du snapshot et du traitement des actions. Il ne change
ni les compteurs existants, ni les chronos, ni les resets, ni la rotation.
Les confirmations existantes pour les entrées hors rotation sont conservées.

Le 14 novembre 2026, une vérification en lecture seule sur la production a
confirmé l’accès avec la seule clé publique de l’application. Les 6 événements de
la fenêtre contrôlée ont été lus en une page, puis en trois pages de 2 : résultats
identiques, projection limitée à `hub` et `at`, horodatages dans la fenêtre attendue.
Les en-têtes CORS exposent bien `Content-Range` au navigateur.
Aucune donnée, permission ou fonction n’a été modifiée lors de ce contrôle.

## Vérifications et publication éventuelle

```powershell
npm test
npm run build
npm run test:static
```

Les tests interceptent les appels HTTP, y compris la lecture des événements.
Ils n’écrivent rien en production. Ne pas tester en cliquant dans l’application
ouverte normalement : elle utilise toujours la base partagée de production.

Après accord explicite, publier les fichiers compilés selon le mode GitHub Pages
actuel (racine ou contenu de `dist/`). Aucun préalable SQL, aucune migration, aucun
réenregistrement de données et aucune remise à zéro ne sont nécessaires.
Les anciens postes peuvent rester ouverts pendant cette publication.
Un retour aux anciens fichiers suffit pour retirer le compteur horaire.

Une sauvegarde de la base n’est pas un préalable technique à cette mise à jour
sans écriture SQL ; conserver les sauvegardes habituelles et les anciens fichiers
publiés. La publication doit être déclenchée séparément du commit local.

## Limites d’actualisation

Les lectures suivent les snapshots toutes les 2 secondes et les réponses d’action.
Les entrées expirées disparaissent au tick suivant du timer de 1 seconde selon
l’heure serveur. Les timers des onglets en arrière-plan peuvent être ralentis.
Pendant une coupure réseau, les actions des autres postes ne peuvent pas être
connues ; une erreur de lecture horaire affiche `—`, jamais un zéro inventé.
Une lecture incomplète n’est jamais publiée comme un compteur exact.

La lecture porte sur la dernière heure, mais le serveur peut devoir parcourir
l’historique pour la filtrer. Aucun index n’est ajouté pour cette évolution ; si
le volume réel entraîne des lenteurs, mesurer la requête avant toute optimisation.

Référence de pagination : [documentation PostgREST](https://docs.postgrest.org/en/stable/references/api/pagination_count.html).
