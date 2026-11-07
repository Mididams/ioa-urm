# ioa-urm
Tableau partagé de rotation des trois hubs des urgences — IOA URM

## Démarrer en local

Prérequis : Node.js 22.12 ou plus récent.

```powershell
cd ioa-urm
npm install
npm run dev
```

Ouvrir l’adresse affichée dans le terminal (habituellement http://127.0.0.1:5173).
Modifier `App.tsx` ou `style.css` : le navigateur actualise l’application.
Ne pas ouvrir `index.html` par double-clic : les sources TypeScript nécessitent Vite.

## Vérifier et publier

```powershell
npm test
npm run build
npm run preview
```

Publier le contenu de `dist/` sur un hébergement HTTPS, y compris son dossier
`assets/`. Le fichier historique `app.js` à la racine n’est plus utilisé.
`npm run build` vérifie TypeScript et compile les sources ; `npm run preview`
permet de vérifier le résultat localement.

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
