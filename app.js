let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 3;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales() {
    if (listaNumerosSorteados.length != numeroMaximo) {
        asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    }
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function condicionesFinales() {
    listaNumerosSorteados = [];
    document.querySelector('#reintentar').setAttribute('disabled', 'true');
    asignarTextoElemento('p', 'Ya se sortearon todos los números posibles, fin del juego!');
}

function reiniciarJuego() {
    limpiarCaja();
    asignarTextoElemento('h1', 'Juego del número secreto!');
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    if (listaNumerosSorteados.length == numeroMaximo) {
        condicionesFinales()
    } else {
        condicionesIniciales();
    }
}

condicionesIniciales();