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

### Explication - Pourquoi utiliser React-Redux ?

<!-- Explication de React et ce qu'apporte Redux => phrase intéressante
Dan Abramov décrit Redux comme un conteneur à état prévisible pour les applications Javascript.

Dan Abramov :

    Redux is a predictable state container for JavaScript apps. It’s a « state container » because it holds all the state of your application. It doesn’t let you change that state directly, but instead forces you to describe changes as plain objects called « actions ». Actions can be recorded and replayed later, so this makes state management predictable. With the same actions in the same order, you’re going to end up in the same state.
    -->
### Historique

React est une librairie JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'applications web monopage, via la création de composants dépendants d'un état et générants une page (ou portion) HTML à chaque changement d'état. 

Redux, quant à lui, a été créé par Dan Abramov et Andrew Clark et sa première version est apparu le 2 juin 2015. Abramov a commencé à écrire la première implémentation de Redux lors de la préparation pour un discours de conférence à React Europe. Sa dernière version est actuellement la 7.1.0 qui est sorti le 11 juin 2019. 

### Contexte

Il est intéressant d'utiliser React-Redux quand les projets sont d'envergure. En effet, quand les branches components se multiplient et qu'elles dépendent les unes des autres, il devient difficile de gérer l'état de votre application ! Vous êtes alors obligé de faire remonter les states et redescendre les props de multiples fois.


Voici un scénario très probable que vous pourriez rencontrer en travaillant avec React.

* Vous construisez une application de taille moyenne et vos composants sont clairement divisés en composants simples et intelligents.. 
* Les composants intelligents gèrent l'état, puis les transmettent aux composants muets. Ils s’occupent d’appeler des API, d’extraire les données de la source ddonnées, de les traiter, puis de définir l’état. Les composants muets reçoivent les accessoires et renvoient la représentation de l'interface utilisateur. 
* Lorsque vous êtes sur le point d'écrire un nouveau composant, il n'est pas toujours clair où placer l'état. Vous pouvez laisser l'état faire partie d'un conteneur quest un parent immédiat du composant de présentation. Mieux encore, vous pouvez déplacer l'état plus haut dans la hiérarchie afin qu'il soit accessible à plusieurcomposants de présentation..
* Lorsque l'application grandit, vous voyez que l'état est dispersé partout. Lorsqu'un composant doit accéder à un état auquel il n'a pas immédiatement accès, vouessayez de le remonter jusqu'à l'ancêtre du composant le plus proche.. 
* Après un refactoring et un nettoyage constants, vous vous retrouvez avec la plupart des places détenues par l'état en haut de la hiérarchie des composants.. 
* Enfin, vous décidez qu’il est judicieux de laisser un composant en haut gérer l’état de manière globale, puis de tout transmettre. Chaque autre composant peusouscrire aux accessoires dont ils ont besoin et ignorer le reste.


Redux vous aide à séparer l'état de l'application de React. Redux crée un magasin global qui réside au plus haut niveau de votre application et transmet l'état à tous les autres composants. L'état complet de l'application se trouve dans cet objet magasin et vous pouvez éventuellement permuter la couche de vue avec une autre bibliothèque dont le magasin est intact..

Les composants sont restitués chaque fois que le magasin est mis à jour, avec un impact très faible sur les performances. C'est une bonne nouvelle et cela apporte de nombreux avantages. Vous pouvez traiter tous vos composants React facilement, et React peut se concentrer uniquement sur le point de vue de la visualisation..

Sans cela :

* l'état de votre application est complètement décentralisé à travers tous les components de votre application,
* les mises à jour de vos states ne suivent pas d'ordre précis à cause du temps de réponse du serveur côté API, de l'asynchronicité, de la gestion des routes, etc.

## Introduction React

Avant de s'intéresser de plus près à Redux, il est important de comprendre les avantages de React : 

  * La rapidité : React utilise un Virtual DOM qui permet d’updater le DOM uniquement sur les parties qui ont été modifiées. Autrement dit, il n'est pas nécessaire de réactualiser (comme sur Facebook par exemple).
  * La facilité d’utilisation : La création et la maintenance d’une application à grande échelle sont rendues beaucoup moins complexes.
  * Le support : La communauté est vaste, open source et maintenue par Facebook.

Lorsque l'on pense une application en React, il est important de scinder l'application en plusieurs parties. On pourrait, par exemple, avoir un bloc header, un bloc footer, un bloc navbar et un bloc contenu. Ces éléments s'appellent alors des composants.

On retrouve les composants classes et les composants fonctionnels qui vont permettre d'avoir un code réutilisable beaucoup plus facilement. Ils fonctionnent grâce au JSX qui est une version du HTML directement écrite à l'intérieur du composant.

### Render

La fonction render est très simple à comprendre : 

  <div id="root"></div>

-> Dans le body du fichier HTML on ajoute une div avec, par exemple, l'id "root".

  const element = <h1>Hello World!</h1>;
  ReactDOM.render(element, document.getElementById('root'));

-> Le composant est constitué d'une constante element qui a pour valeur "Hello World!".
-> La fonction render renvoie element dans la div dont l'id est "root".

### Fonctions classes

  class Welcome extends React.Component {
  render() {
    return <h1>Bonjour, {this.props.name}</h1>;
  }
}

On crée une classe Welcome qui étant de React.component et dont le render retournera un titre h1 "Bonjour, -le name qui aura été défini-". 

### Fonctions composants

  function Welcome(props) {
    return <h1>Bonjour, {props.name}</h1>;
  }

On crée une fonction Welcome, qui prendra props comme paramètre et qui va retourner un titre h1 "Bonjour, -le name qui aura été défini-".

### Spécificités des composants

Les composants ne peuvent jamais modifier leurs propres props : 

  function sum(a, b) {
    return a + b;
  }
    -> Fonction pure

  function withdraw(account, amount) {
    account.total -= amount;
  }
    -> Fonction impure

Tout composant React doit agir comme une fonction pure vis-à-vis de ses props.


### Props

  function Welcome(props) {
  return <h1>Bonjour, {props.name}</h1>;
  }


  const element = <Welcome name="Sara" />;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );

* On appelle ReactDOM.render() avec l’élément <Welcome name="Sara" />.
* React appelle le composant Welcome avec comme props {name: 'Sara'}.
* Notre composant Welcome retourne un élément <h1>Bonjour, Sara</h1> pour résultat.
* React DOM met à jour efficacement le DOM pour correspondre à <h1>Bonjour, Sara</h1>.

### Etat des composants

On peut définir l'état initial d'un composant (données, interface, ...) et celui-ci sera mis à jour automatiquement, sans besoin de réactualiser. Lorsque l'état changera, seule cette donnée sera modifiée dans le DOM.

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

## Introduction React-Redux

Pour comprendre le fonctionnement de React-Redux, il faut avant tout comprendre les particularités qui le caractérisent. Ainsi, nous allons aborder le magasin (store), les reducers, les actions, etc...

### Redux et son intégration dans l'UI

Pour utiliser redux with UI layer, il est nécessaire de passer par ces étapes :

  * Create a Redux store / Crée le store
  * Subscribe to updates / Utiliser la fonction Subscribe()
  * Inside the subscription callback: / A l'intérieur du callback de la fonction subscribe()
      * Get the current store state / récupérer l'état actuelle 
      * Extract the data needed by this piece of UI / extraire les données nécessaire par l'UI
      * Update the UI with the data / Mettre à jour l'UI avec les données
  * If necessary, render the UI with initial state / si nécessaire, rendre l'UI avec les états initials
  * Respond to UI inputs by dispatching Redux actions / Répondre à l'UI en affichant les actions de Redux

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

### Fonction pure

  Une fonction pure est juste une fonction normale avec deux contraintes supplémentaires auxquelles elle doit satisfaire: 

  * Étant donné un ensemble d'entrées, la fonction devrait toujours renvoyer la même sortie. 
  * Il ne produit aucun effet secondaire.

  Les fonctions pures donnent un résultat prévisible et sont déterministes. Une fonction devient impure lorsqu'elle effectue autre chose que le calcul de sa valeur de retour. 


### Le store

  Le store est un grand objet JavaScript qui contient des tonnes de paires clé-valeur qui représentent l'état actuel de l'application. Contrairement à l'objet d'état dans React qui est réparti sur différents composants, nous n'avons qu'un seul magasin. Le store fournit l’état de l’application et chaque fois que l’état est mis à jour, la vue est rendue. 

  toutefois, vous ne pouvez jamais muter ou changer de magasin. Au lieu de cela, vous créez de nouvelles versions du store via une action et le reducer. 

### Qu’est-ce qu’une action au sens Redux ?

  Les actions envoient les données de l’application vers un store. Ce sont les seules sources d’information pour un store. Elles sont définies comme un objet Javascript qui a une propriété ‘type’ pour indiquer le type d’action réalisé :

  Les actions sont définies par des fonctions appelées Action Creators puis envoyées aux Reducer par la fonction dispatch().

  Comment faire pour exécuter simultanément plusieurs actions ?

  Il est possible avec React de créer des actions asynchrones non bloquantes (les Redux async action évoquées en haut de l’article).

  Si les actions décrivent un changement qui vient de se produire, qui change le state de l’application ?

  C’est là qu’interviennent les Reducer.


### Les Reducers

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

### Redux Application Data Flow#

Earlier, we talked about "one-way data flow", which describes this sequence of steps to update the app:

    State describes the condition of the app at a specific point in time
    The UI is rendered based on that state
    When something happens (such as a user clicking a button), the state is updated based on what occurred
    The UI re-renders based on the new state

For Redux specifically, we can break these steps into more detail:

    Initial setup:
        A Redux store is created using a root reducer function
        The store calls the root reducer once, and saves the return value as its initial state
        When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the state has changed.
    Updates:
        Something happens in the app, such as a user clicking a button
        The app code dispatches an action to the Redux store, like dispatch({type: 'counter/incremented'})
        The store runs the reducer function again with the previous state and the current action, and saves the return value as the new state
        The store notifies all parts of the UI that are subscribed that the store has been updated
        Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
        Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen

Here's what that data flow looks like visually:

![Visualisation du data flow](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

