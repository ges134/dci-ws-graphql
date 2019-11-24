# dci-ws-graphql

Workshop sur l'apprentissage de Graphql par la pratique!

## Le workshop

Le DCI Workshop - GraphQL, se divise en 2 parties: la théorie et l'atelier.

Dans le volet théorique, on y présente les notions nécessaires pour comprendre GraphQL. On les mes ensuite en application avec l'atelier.

Le dossier [`slides/`](./slides/readme.md) contient la présentation complète. La présentation a été réalisée avec reveal.js et des notes de présentations y sont consignées.

Les autres dossiers traitent le volet atelier. Le dossier [`api/`](./api/readme.md) contient une API à utiliser pour accomplir les défis dans [`challenges/`](./challenges/readme.md). l'API lit des données ouvertes de Montréal.

Les défis à accomplir nécessitent d'implémenter une API GraphQL qui offre un certain traitement des données. Je recommande donc de lire la documentation contenue dans le [`starter-pack/`](./starter-pack/readme.md). Si jamais vous avez des problèmes ou vous voulez comparer votre solution à la mienne, vous pouvez aller regarder le solutionnaire dans le dossier [`solution/`](./solution/readme.md).

## Débuter avec le projet.

Les données ouvertes étant trop volumineuses pour être hébergés sur Github, vous devez les télécharger au portail de données ouvertes de la ville de Montréal. Voici les liens des données ouvertes:

- [Feux de circulation – comptage des véhicules et des piétons aux intersections munies de feux ](http://donnees.ville.montreal.qc.ca/dataset/comptage-vehicules-pietons)
- [Inspection des aliments – contrevenants](http://donnees.ville.montreal.qc.ca/dataset/inspection-aliments-contrevenants)
- [Actes criminels](http://donnees.ville.montreal.qc.ca/dataset/actes-criminels)

Assurez-vous que les fichiers téléchargés ont les mêmes noms que ceux indiqué [ici](./api/src/index.js). Sinon, vous devez modifier les noms. Vous devez créer un dossier `data/` à l'intérieur de `src/`.

Pour débuter avec le workshop, vous devez utiliser la commande `yarn` dans les dossiers suivants:

- `solution/`
- `api/`

Vous pouvez ensuite:

- Consulter les présentations dans `slides/`.
- Démarrer l'[API](./api/readme.md)
- Démarrer le [solutionnaire](./solution/readme.md)
- commencez à développer avec le [starter pack](./starter-pack/readme.md)!

## Notes

- Les données ouvertes ont été téléchargées à la mi-octobre. Il est donc possible que les réponses fournies dans les `challenges` soient différentes du moment où vous installez ce repo. Si jamais vous voulez obtenir des flags à jour, vous pouvez, sous `challenges`, exécuter `npm run challenges`.
- Le solutionnaire et le starter pack démarrent sur le même port. Vous pouvez utiliser le port 4002 pour le starter pack si vous souhaitez exécuter les trois applications en même temps.
