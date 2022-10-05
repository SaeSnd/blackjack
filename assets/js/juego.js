/*Eng code
* 2C = Two of Clubs (Trebol)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Espadas)
* */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosCPU = 0;

////////////////////////////////////////
//TODO: referencias HTML
const btnPedir = document.querySelector('#btnRequestCard');
const btnNewGame = document.querySelector('#btnNewGame');
const btnStop = document.querySelector('#btnStop');
const puntuacion = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas');
const cartasCPU = document.querySelector('#computadora-cartas');


///////////////////////////////////
//TODO: Funciones

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos)
            deck.push(i + tipo);
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
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

const turnoCPU = (puntosMin) => {
    do {
        const carta = pedirCarta();
        puntosCPU += valorCarta(carta);
        console.log({carta});
        puntuacion[1].innerText = puntosCPU;
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = 'assets/cartas/' + carta + '.png'; //añade el source de la img
        cartasCPU.append(imgCarta);
    } while (puntosCPU < puntosMin && puntosCPU < 21);

    setTimeout(() => {
        if (puntosCPU === puntosMin) {
            alert('Empate.');
        } else if (puntosMin > 21 && puntosCPU < 21) {
            alert('Computadora gana');
        } else if (puntosCPU > 21) {
            alert('Has ganado!');
        }
    }, 100);

}

///////////////////////////////////////////////////////////
//TODO: Inicio de codigo

//const VALOR = valorCarta(pedirCarta());
deck = crearDeck();

//eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    console.log({carta});
    puntuacion[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = 'assets/cartas/' + carta + '.png'; //añade el source de la img
    cartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnStop.disabled = true;
        turnoCPU(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnStop.disabled = true;
        turnoCPU(puntosJugador);
    }
});

btnStop.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnStop.disabled = true;
    turnoCPU(puntosJugador);
});

btnNewGame.addEventListener('click', () => {
    //if (confirm('¿Reiniciar?')){
    const cartasActuales = document.querySelectorAll('.carta');
    for (let i = 0; i < cartasActuales.length; i++) cartasActuales[i].remove();

    btnPedir.disabled = false;
    btnStop.disabled = false;
    puntosCPU = 0;
    puntosJugador = 0;
    puntuacion[0].innerText = 0;
    puntuacion[1].innerText = 0;
    deck = [];
    deck = crearDeck();
    console.log(deck);
    //}
});