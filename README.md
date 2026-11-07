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

Un clic sur un hub autre que le prochain hub affiché demande confirmation avant
d’enregistrer. Annuler ne crée aucune entrée.

La remise à zéro conserve les chronomètres, la rotation et le compteur quotidien.
Après un échec réseau,
« Réessayer l’enregistrement » réutilise le même identifiant pour éviter les
doublons tant que la page reste ouverte.
