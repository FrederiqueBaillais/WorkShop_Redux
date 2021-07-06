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

## Connexion avec le composant Timer

Nous allons travailler sur le composant ```timer.js```. Nous devons d'abord importer les variables et les fonctions nécessaires.

```javascript
import { connect } from "react-redux";

import {
    INCREMENT,
    DECREMENT,
    COUNTDOWN,
    COUNTDOWNATZERO,
    RESET
} from "../../store/actions";
```

Donc, maintenant si vous regardez attentivement le code, vous remarquerez dans chaque fonction attachée à ces boutons, il y a un appel à ```this.setState``` qui mute notre état local et re-rend notre composant. C'est ce que nous devons changer en utilisant Redux.

La prochaine chose que nous devrions faire est de descendre ```export default Timer``` et d'encapsuler le ```Timer```dans la fonction ```connect``` que nous venons d'importer.

```export default connect(mapStateToProps, mapDispatchToProps)(Timer);```

Attends, mais c'est quoi ```mapStateToPropset``` et ```mapDispatchToProps``` ? Ce sont des fonctions que nous allons bientôt définir. Nous y reviendrons une fois que nous aurons fini de fabriquer notre réducteur. Une chose à la fois.