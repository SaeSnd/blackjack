
const game = (() => {
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

////////////////////////////////////////
//referencias HTML
    const btnPedir = document.querySelector('#btnRequestCard'),
        btnNewGame = document.querySelector('#btnNewGame'),
        btnStop = document.querySelector('#btnStop'),
        puntuacion = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');


///////////////////////////////////
//Funciones

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];

        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnStop.disabled = false;

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores[i] = 0;
            puntuacion[i].innerText = puntosJugadores[i];
        }
    }

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos)
                deck.push(i + tipo);
        }
        for (let tipo of tipos) {
            for (let esp of especiales)
                deck.push(esp + tipo);
        }
        return _.shuffle(deck);
    }

    const pedirCarta = () => {
        if (deck.length === 0)
            throw 'No hay cartas en el deck'
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            ((valor === 'A') ? 11 : 10) : valor * 1;
    }

    //Turno: 0 es Jugador
    //ultimo es CPU
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntuacion[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, jugador) => {
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = 'assets/cartas/' + carta + '.png'; //añade el source de la img
        divCartasJugadores[jugador].append(imgCarta);
    };

    const determinarGanador = () => {

        const [puntosMin, puntosCPU] = puntosJugadores;

        setTimeout(() => {
            if (puntosCPU === puntosMin) {
                alert('Nadie gana :(');
            } else if (puntosMin > 21) {
                alert('Computadora gana')
            } else if (puntosCPU > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100);
    };

    const turnoCPU = (puntosMin) => {
        let CPUID = puntosJugadores.length - 1;
        do {
            const carta = pedirCarta();

            acumularPuntos(carta, CPUID);
            crearCarta(carta, CPUID);

        } while (puntosJugadores[CPUID] < puntosMin && puntosMin <= 21);

        determinarGanador();
    }

///////////////////////////////////////////////////////////
//Inicio de codigo

//eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(),
            puntosJugador1 = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador1 > 21) {
            btnPedir.disabled = true;
            btnStop.disabled = true;
            turnoCPU(puntosJugador1);
        } else if (puntosJugador1 === 21) {
            btnPedir.disabled = true;
            btnStop.disabled = true;
            turnoCPU(puntosJugador1);
        }
    });

    btnStop.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnStop.disabled = true;
        turnoCPU(puntosJugadores[0]);
    });

    btnNewGame.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        newGame: inicializarJuego
    };
})();