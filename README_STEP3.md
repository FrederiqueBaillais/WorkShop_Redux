## Créer toutes les actions

Comme nous le savons, c'est une bonne pratique d'affecter des variables à la propriété ```type``` de l'objet action plutôt que de fournir des chaînes directement, nous allons donc créer un fichier appelé ```actions.js``` à l'intérieur du dossier nommé ```/store``` pour avoir tous les types d'action.

```javascript
// actions.js

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const COUNTDOWN = "COUNTDOWN";
export const COUNTDOWNATZERO = "COUNTDOWNATZERO";
export const RESET = "RESET";
```
