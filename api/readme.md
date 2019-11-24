# API

Ce dossier contient l'API qui devra être interrogée dans le but de résoudre les défis et implémenter l'API GraphQL demandée dans le starter pack.

Les données sont lues au démarrage. Puis elle sont stockés en mémoire pour l'exécution de l'application.

L'application est dotée d'un Playground. Ainsi, naviguer à l'addresse de l'application sur un navigateur web permet d'accéder au Playground pour tester les requêtes et lire la documentation du schéma.

## Commandes

- `start`: permet de démarrer l'application. N.B.: Étant donnée que près d'un million d'entrée sont lues au démarrage, l'application peut prendre quelques secondes à démarrer.
- `lint`: permet d'exécuter `eslint` sur les fichiers sources et détecter des erreurs de styles.
- `dev`: permet de démarrer l'application avec nodemon afin de redémarrer automatiquement à chaque changement au code source.

## Notes

- Comme mentionnée dans le [`readme` du projet], les données doivent être téléchargés et placés dans le dossier `src/data/`. Également, il faut s'assurer que les noms de fichiers correspondent avec ceux écrits dans [`src/index.js`](src/index.js)

## Fichier utiles:

- [`package.json`](./package.json)
- [`schema.graphql`](./src/schema.graphql)
