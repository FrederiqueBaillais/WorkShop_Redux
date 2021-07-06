## Pour commencer

Premièrement, nous devons écrire l'application et sa logique. Et dans notre cas, nous avons d'abord fait toute l'application en utilisant des états primitifs (sans utiliser Redux), juste pour mieux comprendre son fonctionnement. Et puis nous avons converti notre gestion d'état en utilisant Redux.

Donc, pour commencer, nous avons téléchargé le code d'état primitif dans la branche ```react```. L'application que nous allons monter en utilisant Redux se trouve dans une branche distincte que nous vous dévoilerons par la suite. Pour commencer, vous pouvez cloner la branche ```react``` et nous allons vous expliquer ce qui suit pour ajouter la gestion de l'état Redux à notre application.

```git clone git@github.com:FrederiqueBaillais/WorkShop_Redux.git```

```git checkout react```

```npm i``` ou ```npm install```

```npm start```

**Remarque :** Pour ce workshop, nous allons nous concentrer uniquement sur la mise en œuvre de Redux et non sur la création de l'ensemble de l'application à partir de zéro. Donc, il est préférable de parcourir les principaux composants pour au moins savoir quelle fonction fait quoi. Ce sera plus facile de suivre ;-)

## Travail de base

Toutes les fonctionnalités dont nous avons besoin se produisent en cliquant sur un bouton, nous devons donc transmettre une fonction de "gestionnaire au clic" à chacun de nos composants ```Button``` personnalisés en utilisant la propriété réservée ```clicked```.

```javascript
<Button clicked={this.incTimer}>+</Button>
<Button clicked={this.startTimer}>Start</Button>
<Button clicked={this.stopTimer}>Stop</Button>
<Button clicked={this.resetTimer}>Reset</Button>
<Button clicked={this.decTimer}>-</Button>
```

Si vous vous demandez quel est le composant ```Button```, voici un aperçu de cela :

```javascript
function Button(props) {
    return <button onClick={props.clicked}>{props.children}</button>;
}
```
