const pieza = {
    T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    L: [
        [2, 0, 0],
        [2, 0, 0],
        [2, 2, 0]
    ],
    J: [
        [0, 0, 3],
        [0, 0, 3],
        [0, 3, 3]
    ],
    S: [
        [0, 4, 4],
        [4, 4, 0],
        [0, 0, 0]
    ],
    Z: [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0]
    ],
    I: [
        [0, 0, 0, 0],
        [6, 6, 6, 6],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    O: [
        [7, 7],
        [7, 7]
    ]
};

// Exportamos la pieza activa para que el tablero sepa qué dibujar
export let piezaActiva = {
    forma: pieza['T'],
    x: 4,
    y: 0
};

function rotarIzquierda(pieza) {
    return pieza[0]
        .map((_, columna) => pieza.map(fila => fila[columna]))
        .reverse();
}

function rotarDerecha(pieza) {
    return pieza[0]
        .map((_, columna) => pieza.slice().reverse().map(fila => fila[columna]));
}

const piezasRotadas = {};

for (const nombre in pieza) {
    let actual = pieza[nombre];
    piezasRotadas[nombre] = [];

    for (let i = 0; i < 4; i++) {
        // Clonamos la matriz de forma segura antes de guardarla
        const copia = actual.map(fila => [...fila]); 
        piezasRotadas[nombre].push(copia);
        
        actual = rotarDerecha(actual);
    }
}

const click = document.getElementById('matriz');

click.addEventListener('mousedown', () => {
    piezaActiva.forma = rotarDerecha(piezaActiva.forma);


});