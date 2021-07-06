## Comment réduire et stocker à partir d'un composant ?

```mapStateToProps```

Il s'agit d'une fonction qui fonctionne en sous-jacent pour nous donner accès à l'état global de notre composant, qui peut ensuite être consulté en tant que components dans notre composant.

```javascript
const mapStateToProps = (state) => {
    return {
        time: state.tmr.time,
        seconds: state.tmr.seconds
    };
};
```

Maintenant, comment devons-nous accéder à la propriété ```tmr``` à l'intérieur du ```state```? C'est parce que nous avons combiné notre "routeur" ```timer.js``` dans notre fichier ```index.js``` en utilisant ```combineReducers``` (toujours dans l'éventualité d'un autre réducteur à combiner) et nous avons indiqué ce nom dans notre fichier ```index```. Cela nous donnera la juste valeur de notre état.

```mapDispatchToProps```

Si vous vous demandiez comment passer les actions de notre composant au réducteur, c'est ce que fait cette fonction ```mapDispatchToProps```. Cela renvoie un tas de fonctions à l'intérieur d'un objet, qui, lorsqu'elles sont appelées, envoient l'action particulière que nous avons écrite pour cet objet. 

```javascript
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: (fn) => dispatch({ type: INCREMENT, secToTime: fn }),
        onDecrement: (fn) => dispatch({ type: DECREMENT, secToTime: fn }),
        onCountDown: (fn) => dispatch({ type: COUNTDOWN, secToTime: fn }),
        onCountDownAtZero: () => dispatch({ type: COUNTDOWNATZERO }),
        onReset: () => dispatch({ type: RESET })
    };
};
```

Ainsi, nous pouvons maintenant accéder à ces fonctions ```props``` dans notre composant et nous allons les appeler chaque fois que nous avons besoin de changement d'état.

## Comment accéder au Store depuis n'importe quel composant ?

La fonction ```mapStateToProps``` nous donne accès au store global via des components.

Ci-dessus, nous pouvons voir que cette fonction renvoie deux propriétés, à savoir ```time``` et ```seconds```. Nous pouvons y accéder où nous voulons en faisant simplement ```this.props.time``` et ```this.props.seconds```.

## Répartir des actions au lieu d'utiliser ```this.setState()```

Nous avons déjà accès à tous les répartiteurs d'actions et à l'état global de notre composant via les components, en utilisant les fonctions ```mapStateToProps``` et ```mapDispatchToProps```. Maintenant, il nous suffit de remplacer notre ```this.setState()``` par l'envoi des actions requises.

Quand on clique sur +, il y a une fonction ```this.incTimer``` qui s'exécute, comme ceci :

```javascript
incTimer() {
    if (this.state.seconds >= 0) {
        this.setState((prevState) => ({
            seconds: prevState.seconds + 60,
            time: this.secondsToTime(prevState.seconds + 60),
            }));
        }
}
```

Nous devons remplacer cela par l'appel de notre fonction de répartition d'action : ```onIncrement``` qui est définie dans notre fonction ```mapDispatchToProps``` et disponible via ```this.props```.

Voici notre nouvelle fonction ```incTimer``` :

```javascript
incTimer() {
    if (this.props.seconds >= 0) {
        this.props.onIncrement(this.secondsToTime);
        }
}
```

Cela fait exactement la même chose que nous faisions auparavant, avec notre état local.

## Voici le reste des gestionnaires de clics.

```javascript
    decTimer() {
        // Runs only if seconds > 61, to not result in getting -ve values rendered
        if (this.props.seconds > 61) this.props.onDecrement(this.secondsToTime);
    }

    startTimer() {
        // Runs only if timer isn't started already and seconds are atleast more than zero
        if (this.timer === 0 && this.props.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Removing a sec and setting state to re-render
        this.props.onCountDown(this.secondsToTime);

        // Check if we're at zero
        if (this.props.seconds === 0) {
            clearInterval(this.timer);
            this.props.onCountDownAtZero();
        }
    }

    stopTimer() {
        // Stop only if timer is running and seconds aren't zero already
        if (this.timer !== 0 && this.props.seconds !== 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    resetTimer() {
        // Getting back state to its original form
        this.props.onReset();

        // Also, if timer is running, we've to stop it too
        if (this.timer !== 0) {
            clearInterval(this.timer);fn
            this.timer = 0;
        }
    }
```

Cela va maintenant configurer nos actions à envoyer chaque fois que l'utilisateur clique sur l'un des boutons, ce qui l'amènera au réducteur et après avoir mis à jour l'objet d'état, il passera au store global et nous retournera l'état mis à jour.

## Rendu du composant de minuterie

Maintenant, qu'en est-il de la méthode ```render()``` ? Elle doit également avoir accès à notre état local afin d'afficher la minuterie actuelle, en utilisant ```this.timeFormatter```.

Nous devons donc remplacer le code ci-dessous de notre méthode ```render()``` pour accéder directement au store, au lieu d'appeler ```this.state```.

```javascript
let { h, m, s } = this.timeFormatter(this.state.time);
```

Vous souvenez-vous comment nous sommes censés accéder à notre store ?
Comme nous avons déjà mappé notre état sur les components, nous pouvons facilement y accéder comme ceci.

```javascript
this.props.time
this.props.seconds
```

Faisons juste cela.

```javascript
let { h, m, s } = this.timeFormatter(this.props.time);
```

Maintenant, nous pouvons facilement afficher les données de notre store global dans notre méthode ```render()```, ce qui fait que notre application fonctionne parfaitement. Vous pouvez maintenant exécuter votre serveur à l'aide de ```npm run start``` ou ```yarn start``` pour voir comment fonctionne votre compte à rebours.

Nous espérons que c'était une construction amusante pour vous, comme ça l'a été pour nous ;-)