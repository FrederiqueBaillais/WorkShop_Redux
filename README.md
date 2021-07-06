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

## Introduction
## Introduction React

  Avant de s'intéresser de plus près à Redux, il est important de comprendre les avantages de React : 

    * La rapidité : React utilise un Virtual DOM qui permet d’updater le DOM uniquement sur les parties qui ont été modifiées. Autrement dit, il n'est pas nécessaire de réactualiser (comme sur Facebook par exemple).
    * La facilité d’utilisation : La création et la maintenance d’une application à grande échelle sont rendues beaucoup moins complexes.
    * Le support : La communauté est vaste, open source et maintenue par Facebook.

  Lorsque l'on pense une application en React, il est important de scinder l'application en plusieurs parties. On pourrait, par exemple, avoir un bloc header, un bloc footer, un bloc navbar et un bloc contenu. Ces éléments s'appellent alors des composants.

  On retrouve les composants classes et les composants fonctionnels qui vont permettre d'avoir un code réutilisable beaucoup plus facilement. Ils fonctionnent grâce au JSX qui est une version du HTML directement écrite à l'intérieur du composant.

### Render

  La fonction render est très simple à comprendre : 

    ```
    <div id="root"></div>
    ```

  -> Dans le body du fichier HTML on ajoute une div avec, par exemple, l'id "root".

    ```
    const element = <h1>Hello World!</h1>;
    ReactDOM.render(element, document.getElementById('root'));
    ```

  -> Le composant est constitué d'une constante element qui a pour valeur "Hello World!".
  -> La fonction render renvoie element dans la div dont l'id est "root".

### Fonctions classes

    ```
    class Welcome extends React.Component {
      render() {
        return <h1>Bonjour, {this.props.name}</h1>;
      }
    }
    ```

  On crée une classe Welcome qui étant de React.component et dont le render retournera un titre h1 "Bonjour, -le name qui aura été défini-". 

### Fonctions composants

    ```
    function Welcome(props) {
      return <h1>Bonjour, {props.name}</h1>;
    }
    ```

  On crée une fonction Welcome, qui prendra props comme paramètre et qui va retourner un titre h1 "Bonjour, -le name qui aura été défini-".

### Spécificités des composants

Les composants ne peuvent jamais modifier leurs propres props : 

    ```
    function sum(a, b) {
      return a + b;
    }
    ```
      -> Fonction pure

    ```
    function withdraw(account, amount) {
      account.total -= amount;
    }
    ```
      -> Fonction impure

  Tout composant React doit agir comme une fonction pure vis-à-vis de ses props.


### Props

    ```
    function Welcome(props) {
    return <h1>Bonjour, {props.name}</h1>;
    }

    const element = <Welcome name="Sara" />;
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
    ```

  * On appelle ReactDOM.render() avec l’élément ```<Welcome name="Sara" />```.
  * React appelle le composant Welcome avec comme props ```{name: 'Sara'}```.
  * Notre composant Welcome retourne un élément ```<h1>Bonjour, Sara</h1>``` pour résultat.
  * React DOM met à jour efficacement le DOM pour correspondre à ```<h1>Bonjour, Sara</h1>```.

### Etat des composants

  On peut définir l'état initial d'un composant (données, interface, ...) et celui-ci sera mis à jour automatiquement, sans besoin de réactualiser. Lorsque l'état changera, seule cette donnée sera modifiée dans le DOM.

    ```
    class Clock extends React.Component {
      constructor(props) {
        super(props);

      this.state = {date: new Date()};
      }

      render() {
        return (
          <div>
            <h1>Bonjour, monde !</h1>
            <h2>Il est {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    ```

## Introduction React-Redux

### Historique

React est une librairie JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'applications web monopage, via la création de composants dépendants d'un état et générants une page (ou portion) HTML à chaque changement d'état. 

Redux, quant à lui, a été créé par Dan Abramov et Andrew Clark et sa première version est apparu le 2 juin 2015. Abramov a commencé à écrire la première implémentation de Redux lors de la préparation pour un discours de conférence à React Europe. Sa dernière version est actuellement la 7.1.0 qui est sorti le 11 juin 2019. 

### Comprendre Redux

Avant tout, pour comprendre Redux, il faut comprendre comment transite les données avec Redux.
En ce qui concerne React par exemple, nous pouvons parler du "one-way data flow", qui se décrit de la façon suivante lors de la mise à jour de l'app :

  * L'état décrit la condition de l'app à un moment précis
  * L'UI fait un rendu basé sur cet état
  * Quand quelque chose survient (comme le clique d'un utilisateur),l'état est mis à jour sur base de cet évènement
  * L'UI refait un rendu basé sur ce nouvel état

For Redux specifically, we can break these steps into more detail:/Pour Redux spécifiquement, nous pouvons nous passer de ces étapes :

  Setup initial:

  * Un store Redux est crée dans le root du reducer
  * The store calls the root reducer once, and saves the return value as its initial state/Le store appel le reducer une fois et sauvegarde les valeur retournée comme l'état initiale
  * Quand l'UI est rendu, le component de l'UI a accès à l'état actuelle du store de Redux et utilise ces données pour décider quoi rendre. Il observe aussi les futures   mise à jours du store ainsi il sait quand un état a changé.
  
  Mise à jour:
  * Something happens in the app, such as a user clicking a button/ Quelque chose survient dans l'app, comme le clique sur un bouton 
  * The app code dispatches an action to the Redux store, like dispatch({type: 'counter/incremented'})/ Le code de l'app est envoyé par une action vers le store de Redux, comme par exemple envoyé ({type: 'counter/incremented'})
  * The store runs the reducer function again with the previous state and the current action, and saves the return value as the new state/Le store lance encore la fonction du reducer avec les états précédents et l'action actuelle et sauvegarde les données retourner comme le nouvel état
  * The store notifies all parts of the UI that are subscribed that the store has been updated/Le store notifie toutes les parties de l'UI qu'il a été mis à jours
  * Each UI component that needs data from the store checks to see if the parts of the state they need have changed./Chaque component de l'UI qui ont besoin des données du store regarde si la partie des états qu'ils ont besoin ont changé.
  * Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen/Chaque component qui constate que ses données ont changé refait un rendu avec ces nouvelles données, ainsi il peut mettre à jours ce qui est afficher à l'écran

Here's what that data flow looks like visually:/ Visualisation du data flow :

![Visualisation du data flow](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)


### Vocabulaire

Avant de regarder à comment intégrer Redux à notre app, il est impportant de préciser les termes suivant du point du de Redux.
#### Le store

  Le store est un grand objet JavaScript qui contient des tonnes de paires clé-valeur qui représentent l'état actuel de l'application. Contrairement à l'objet d'état dans React qui est réparti sur différents composants, nous n'avons qu'un seul magasin. Le store fournit l’état de l’application et chaque fois que l’état est mis à jour, la vue est rendue. 

  toutefois, vous ne pouvez jamais muter ou changer de magasin. Au lieu de cela, vous créez de nouvelles versions du store via une action et le reducer. 

#### Qu’est-ce qu’une action au sens Redux ?

  Les actions envoient les données de l’application vers un store. Ce sont les seules sources d’information pour un store. Elles sont définies comme un objet Javascript qui a une propriété ‘type’ pour indiquer le type d’action réalisé :

  Les actions sont définies par des fonctions appelées Action Creators puis envoyées aux Reducer par la fonction dispatch().

  Comment faire pour exécuter simultanément plusieurs actions ?

  Il est possible avec React de créer des actions asynchrones non bloquantes (les Redux async action évoquées en haut de l’article).

  Si les actions décrivent un changement qui vient de se produire, qui change le state de l’application ?

  C’est là qu’interviennent les Reducer.


#### Les Reducers

  Le reducer est une fonction pure (sans état) qui prend en entrée le précédent state et un action pour retourner en sortie le prochain state.

     (previousState, action) =>  newState

  Dans notre application, cela se retrouve comme cela :

    const initialState = { time: { h: 0, m: 0, s: 0 }, seconds: 0 };

    const reducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREMENT:
        return {
          ...state,
          seconds: state.seconds + 60,
          time: action.secToTime(state.seconds + 60),
        };
      case DECREMENT:
        return {
          ...state,
          seconds: state.seconds - 60,
          time: action.secToTime(state.seconds - 60),
        };
      case COUNTDOWN:
        return {
          ...state,
          seconds: state.seconds - 1,
          time: action.secToTime(state.seconds - 1),
        };
      case COUNTDOWNATZERO:
        return {
          ...state,
          seconds: 0,
          time: { h: 0, m: 0, s: 0 },
        };
      case RESET:
        return {
          ...state,
          time: { h: 0, m: 0, s: 0 },
          seconds: 0,
        };
      default:
        return state;
    }
  };

#### Intégration de Redux

Pour terminer, si nous voulons intégrer Redux dans notre UI, il est nécessaire de passer par ces différentes étapes :

  * Crée le store
  * Utiliser la fonction Subscribe()
  * A l'intérieur du callback de la fonction subscribe()
      * Récupérer l'état actuelle 
      * Extraire les données nécessaire par l'UI
      * Mettre à jour l'UI avec les données
  * Si nécessaire, rendre l'UI avec les états initials
  * Respond to UI inputs by dispatching Redux actions / Répondre à l'UI en affichant les actions de Redux

CODE :

// 1) Create a new Redux store with the `createStore` function
const store = Redux.createStore(counterReducer)

// 2) Subscribe to redraw whenever the data changes in the future
store.subscribe(render)

// Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById('value')

// 3) When the subscription callback runs:
function render() {
  // 3.1) Get the current store state
  const state = store.getState()
  // 3.2) Extract the data you want
  const newValue = state.value.toString()

  // 3.3) Update the UI with the new value
  valueEl.innerHTML = newValue
}

// 4) Display the UI with the initial store state
render()

// 5) Dispatch actions based on UI inputs
document.getElementById('increment').addEventListener('click', function () {
  store.dispatch({ type: 'counter/incremented' })
})


