# ioa-urm
Tableau partagé de rotation des trois hubs des urgences — IOA URM

## Ouvrir l’application

Ouvrir `index.html` directement ou avec Live Server. La page charge `app.js`,
le fichier JavaScript compilé fourni dans le dépôt, et `style.css`.

## Modifier le code en local

Prérequis : Node.js 22.12 ou plus récent.

```powershell
cd ioa-urm
npm install
npm run dev
```

Ouvrir l’adresse affichée dans le terminal (habituellement http://127.0.0.1:5173).
Modifier `App.tsx` ou `style.css` : le navigateur actualise l’application.
Pour retrouver les modifications TypeScript dans Live Server ou en ouvrant
`index.html` directement, lancer `npm run build` puis recharger la page.

## Vérifier et publier

```powershell
npm test
npm run build
npm run preview
```

Publier le contenu de `dist/` sur un hébergement HTTPS : `index.html`, `app.js`
et `style.css`. Ces trois fichiers sont aussi disponibles à la racine du projet.
`npm run build` vérifie TypeScript, compile les sources et met à jour `app.js`
à la racine et les fichiers de `dist/` ; `npm run preview` permet de vérifier
le résultat localement.

## Données partagées

L’URL Supabase et sa clé publique sont configurées dans la fonction `rpc` de
`App.tsx`. Le projet existant est partagé entre les postes, y compris lors du
développement local : les clics enregistrent de vraies entrées.
`schema.sql` décrit l’installation initiale pour une base vide ; ne pas le
réexécuter sur la base existante.

Les compteurs des hubs cumulent toutes les entrées depuis la dernière remise à
zéro du hub ou de tous les hubs, sans limite de 24 heures. Le total est leur somme.
Le compteur quotidien additionne les entrées de tous les hubs depuis 7 h,
heure de Paris ; avant 7 h, sa date de début est celle de la veille. Il repart
automatiquement à zéro chaque jour à 7 h (visible à la prochaine actualisation,
toutes les 2 secondes lorsque la connexion est disponible). Il ignore toutes
les remises à zéro manuelles. Les changements d’heure sont pris en compte.

`update-counters.sql` contient la mise à jour de la fonction de calcul pour une
base existante. Elle conserve les événements et les droits d’accès existants.
`schema.sql` contient aussi ce calcul pour les installations neuves.

Chaque hub affiche également ses entrées de la journée de 7 h à 7 h. Le total
de la veille correspond à la journée précédente de 7 h à 7 h, même lorsqu’aucun
poste n’était ouvert au changement de journée. Ces totaux sont calculés depuis
l’historique conservé en base : aucune entrée ni aucun chronomètre n’est effacé.
La date affichée en haut est celle de la dernière réinitialisation globale ;
chaque hub affiche sa dernière réinitialisation individuelle ou globale.
En l’absence de réinitialisation dans l’historique, aucune date n’est inventée.

Un clic sur un hub autre que le prochain hub affiché demande confirmation avant
d’enregistrer. Annuler ne crée aucune entrée.

La remise à zéro conserve les chronomètres, la rotation et le compteur quotidien.
Après un échec réseau,
« Réessayer l’enregistrement » réutilise le même identifiant pour éviter les
doublons tant que la page reste ouverte.

## Compteur glissant sur 60 minutes

Aucune migration SQL n’est nécessaire. Le compteur lit `hub_events` en GET avec
les droits SELECT et la politique `shared_read` déjà définis dans `schema.sql`.
Les RPC `ioa_snapshot` et `ioa_action`, les permissions et les données sont inchangées.
Ne pas réexécuter `schema.sql` ni `update-counters.sql` pour cette fonctionnalité.

`hourly.ts` récupère uniquement `hub` et `at` des événements `kind = entry` de la
fenêtre `]heure serveur - 60 minutes, heure serveur]`. La lecture est paginée avec
un total exact pour éviter les résultats tronqués. L’heure serveur vient de la
réponse existante de `ioa_snapshot` ; l’horloge du poste est corrigée avec ce décalage.
Les resets n’interviennent jamais dans ce calcul.

Les nouvelles données sont lues après les snapshots reçus toutes les 2 secondes
et après les actions confirmées. Le timer existant de 1 seconde retire les entrées
expirées, même sans clic. Les navigateurs peuvent ralentir les timers en arrière-plan.
Une lecture lente ne bloque pas les snapshots ni les actions et ne se chevauche
pas avec une autre lecture horaire. Une lecture échouée ou incomplète affiche `—`
uniquement pour l’heure, puis une nouvelle lecture est tentée au snapshot suivant.

`npm test` teste le compteur et les régressions avec HTTP simulé, sans accès à
Supabase. `npm run test:static` vérifie aussi les fichiers compilés avec réseau simulé.
Voir [DEPLOIEMENT.md](DEPLOIEMENT.md) pour la publication manuelle éventuelle.
