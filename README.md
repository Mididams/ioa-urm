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

Les compteurs couvrent les 24 dernières heures depuis la dernière remise à zéro.
La remise à zéro conserve les chronomètres et la rotation. Après un échec réseau,
« Réessayer l’enregistrement » réutilise le même identifiant pour éviter les
doublons tant que la page reste ouverte.
