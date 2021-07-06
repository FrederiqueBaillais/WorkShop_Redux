## Conception du Store

D'après nos connaissances Redux précédentes, nous savons que l'ensemble de notre application doit disposer d'un store global qui stockera toutes les données d'état. Choisissons donc la structure de notre store.

Tout d'abord, nous créerons un dossier ```store``` dans le répertoire /src, pour contenir les actions et les réducteurs nécessaires.

Maintenant, si vous regardez l'état de notre application prête à l'emploi dans la branche ```react```, c'est :

```javascript
this.state = { time: { h: 0, m: 0, s: 0 }, seconds: 0};
```

Nous pouvons ici en créer un ```reducers``` dans notre dossier ```store```, à savoir  ```timer.js```. En outre, nous le conserverons dans un dossier nommé ```reducers``` situé dans notre dossier ```store```.

## Création de notre Store

C'est là que nous commençons à utiliser Redux. Tout d'abord, nous devons installer les packages requis, à savoir :

* Redux - pour la gestion de l'état
* React-Redux - pour connecter Redux à notre application React

```npm install redux react-redux``` ou alors ```yarn add redux react-redux```

Maintenant, dans ```index.js``` de notre application, nous devons créer l'objet store et le transmettre à ses composants enfants.

Nous allons d'abord les importer dans ```index.js``` :

```javascript
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
```

Nous ajouterons également nos réducteurs à partir du dossier des réducteurs :

```javascript
import timerReducer from "./store/reducers/timer";
```

Maintenant, comme nous pouvons avoir plusieurs réducteurs différents, nous allons utiliser la fonction ```combineReducers``` pour les combiner et créer un fichier ```rootReducer```. Après quoi, nous pourrons créer un store en passant ceci dans la fonction ```createStore```.

```javascript
const rootReducer = combineReducers({
    tmr: timerReducer
});

const store = createStore(rootReducer);
```

**Remarque :** Le ```combineReducers``` peut stocker plusieurs réducteurs la fois, ici nous n'utiliserons que le réducteur ```timer``` dans une propriété d'objet, à savoir ```tmr``` mais vous pouvez le nommer comme vous voulez.

Enfin, et c'est le plus important, nous devons transmettre le store à tous les composants enfants pour qu'ils puissent y accéder localement. Nous pouvons le faire à travers le package ```Provider``` que nous avons inclus depuis le package ```react-redux```.
