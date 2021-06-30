# WorkShop_Redux

Nous allons vous présenter Redux, qui travaille avec React.

## Plan de travail

* Introduction
  * Explications
  * Historique
  * Contexte
* Installation
  * Toutes les commandes terminal
* Projet
  * Repo dévoilé au fur et à mesure

## Qui a travaillé sur ce workshop ?

[Laura Vilain](https://github.com/Laura-VLN), [Loïc Hannecart](https://github.com/HanLoi) et [Frédérique Baillais](https://github.com/FrederiqueBaillais)

## Pour commencer

Premièrement, nous devons écrire l'application et sa logique. Et dans notre cas, nous avons d'abord fait toute l'application en utilisant des états primitifs (sans utiliser Redux), juste pour mieux comprendre son fonctionnement. Et puis nous avons converti notre gestion d'état en utilisant Redux.

Donc, pour commencer, nous avons téléchargé le code d'état primitif dans la branche ```react```. L'application que nous allons monter en utilisant Redux se trouve dans une branche distincte que nous vous dévoilerons par la suite. Pour commencer, vous pouvez cloner la branche ```react``` et nous allons vous expliquer ce qui suit pour ajouter la gestion de l'état Redux à notre application.

```git clone git@github.com:FrederiqueBaillais/WorkShop_Redux.git```

**Remarque :** Pour ce workshop, nous allons nous concentrer uniquement sur la mise en œuvre de Redux et non sur la création de l'ensemble de l'application à partir de zéro. Donc, il est préférable de parcourir les principaux composants pour au moins savoir quelle fonction fait quoi. Ce sera plus facile de suivre ;-)

## Travail de base

Toutes les fonctionnalités dont nous avons besoin se produisent en cliquant sur un bouton, nous devons donc transmettre une fonction de "gestionnaire au clic" à chacun de nos composants ```Button``` personnalisés en utilisant la propriété réservée ```clicked```.

```javascript
<Button clicked={this.incTimer}>+</Button>
<Button clicked={this.startTimer}>Start</Button>
<Button clicked={this.stopTimer}>Stop</Button>
<Button clicked={this.lapTimer}>Lap</Button>
<Button clicked={this.resetTimer}>Reset</Button>
<Button clicked={this.decTimer}>-</Button>
```

Si vous vous demandez quel est le Buttoncomposant, voici un aperçu de cela :

```javascript
function Button(props) {
    return <button onClick={props.clicked}>{props.children}</button>;
}
```

## Conception du Store

D'après nos connaissances Redux précédentes, nous savons que l'ensemble de notre application doit disposer d'un store global qui stockera toutes les données d'état. Choisissons donc la structure de notre store.

Tout d'abord, nous créerons un dossier ```store``` dans le répertoire racine, pour contenir les actions et les réducteurs nécessaires.

Maintenant, si vous regardez l'état de notre application prête à l'emploi dans la branche ```react```, c'est :

```javascript
this.state = { time: { h: 0, m: 0, s: 0 }, seconds: 0, laps: [] };
```

Nous avons tous les temps intermédiaires stockés dans le tableau ```laps``` et tout ce qui concerne le temps est stocké à la fois dans les valeurs ```seconds``` et ```time```. Donc, pour clarifier les choses, nous pouvons ici en créer deux différents ```reducers``` dans notre dossier ```store```, à savoir ```laps.js``` et ```timer.js```. En outre, nous les conserverons dans un dossier nommé ```reducers``` situé dans notre dossier ```store```.

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
import lapsReducer from "./store/reducers/laps";
```

Maintenant, comme nous avons deux réducteurs différents, nous allons utiliser la fonction ```combineReducers``` pour les combiner et créer un fichier ```rootReducer```. Après quoi, nous pourrons créer un store en passant ceci dans la fonction ```createStore```.
```javascript
const rootReducer = combineReducers({
    tmr: timerReducer,
    lpr: lapsReducer,
});

const store = createStore(rootReducer);
```

**Remarque :** le ```combineReducers``` va stocker à la fois les réducteurs ```timer``` et le ```lap``` dans deux propriétés d'objet différentes, à savoir ```tmr``` et ```lpr``` mais vous pouvez les nommer comme vous voulez.

Enfin, et c'est le plus important, nous devons transmettre le store à tous les composants enfants pour qu'ils puissent y accéder localement. Nous pouvons le faire à travers le package ```Provider``` que nous avons inclus depuis le package ```react-redux```.

```javascript
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

Vous pouvez parfois visiter la branche ```redux``` sur GitHub pour voir le code, si vous êtes bloqué quelque part.

