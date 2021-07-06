## Création du réducteur ```timer.js```

Tout d'abord, importons nos variables d'action au-dessus de la structure du fichier dans le fichier src/store/reducers/timer.js.

```javascript
import {
    INCREMENT,
    DECREMENT,
    COUNTDOWN,
    COUNTDOWNATZERO,
    RESET,
} from "../actions";
```

Maintenant, créons un ```initialState``` qui contiendra l'état requis pour commencer notre application.

```const initialState = { time: { h: 0, m: 0, s: 0 }, seconds: 0 };```

Maintenant nous allons créer la fonction ```reducer```. Nous vous suggèrons de revoir comment l'état est modifié (en utilisant this.setState() ) dans chacune des fonctions que nous avons passées au gestionnaire ```onClick``` du composant ```Button```. Cela vous donnera également une compréhension claire de notre fonction de réducteur.

Cela étant dit et/ou fait, voici à quoi ressemblera le réducteur :

```javascript
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT: // on clicking "+"
            return {
                ...state,
                seconds: state.seconds + 60,
                time: action.secToTime(state.seconds + 60),
            };
        case DECREMENT: // on clicking "-"
            return {
                ...state,
                seconds: state.seconds - 60,
                time: action.secToTime(state.seconds - 60),
            };
        case COUNTDOWN: // after clicking "start"
            return {
                ...state,
                seconds: state.seconds - 1,
                time: action.secToTime(state.seconds - 1),
            };
        case COUNTDOWNATZERO: // after clicking "start" but when time becomes 0
            return {
                ...state,
                seconds: 0,
                time: { h: 0, m: 0, s: 0 },
            };
        case RESET: // on clicking "reset"
            return {
                ...state,
                time: { h: 0, m: 0, s: 0 },
                seconds: 0,
            };
        default:
            return state;
    }
};

export default reducer;
```

**Remarque :** Nous passons ```secToTime()``` de nombreuses fois en tant que fonction dans notre objet action, c'est parce que nous avons toujours besoin de cette fonction pour nous donner le format d'heure exact, en entrant simplement des secondes.