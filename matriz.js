// 1. Importamos la pieza activa desde el taller de piezas
import { piezaActiva } from './piezas.js';

let columnas = 10;
export let filas = 20;

// Este es nuestro pizarrón original de ceros (nunca se ensucia permanentemente)
export let array = Array.from({length: filas}, () => new Array(columnas).fill(0));

const matrizUse = document.getElementById('matriz');

// 2. Creamos la función que se encargará de actualizar todo el juego en cada segundo
function actualizarJuego() {
    
    // CONTROL DE CAÍDA: Validamos si la pieza aún no ha tocado el fondo del tablero
    // El molde de la T tiene 3 filas de alto, por eso medimos (piezaActiva.y + 3)
    if (piezaActiva.y + 3 <= filas) {
        
        // Sacamos una fotocopia limpia del pizarrón de ceros
        let tableroCopia = structuredClone(array);

        // ESTAMPADO: Recorremos el molde 3x3 de la Pieza T
        piezaActiva.forma.forEach((filaPieza, r) => {
            filaPieza.forEach((valorCelda, c) => {
                if (valorCelda !== 0) {
                    // Calculamos la posición real sumando las coordenadas de la pieza
                    let tableroFila = piezaActiva.y + r;
                    let tableroColumna = piezaActiva.x + c;

                    // Pintamos el bloque en nuestra hoja de papel calca
                    tableroCopia[tableroFila][tableroColumna] = valorCelda;

                }
            });
        });



        // RENDEREADO: Mapeamos la fotocopia con la pieza ya estampada para crear el HTML
        const bloqueMatriz = tableroCopia.map(m => {
            const celdasDeEstaFila = m.map(celda => `<span>${celda}</span>`).join('');
            return `<div>${celdasDeEstaFila}</div>`;
        }).join('');

        // ENVIAR A LA PÁGINA: Mostramos el resultado actualizado al jugador
        matrizUse.innerHTML = bloqueMatriz;



        // SEGUIR CAYENDO: Incrementamos la posición Y para el siguiente segundo
        piezaActiva.y++;

    } else {
        // Si ya llegó al fondo, detenemos el reloj del juego por ahora
        clearInterval(gravedad);
        console.log("¡La pieza llegó al fondo!");
    }
}

// 3. Encendemos el reloj para que ejecute la función automáticamente cada 1 segundo (1000ms)
const gravedad = setInterval(actualizarJuego, 1000);

    window.addEventListener('keydown', (evento) => {
        if (evento.key === 'ArrowLeft') {
            piezaActiva.x = piezaActiva.x - 1;
            
            if(piezaActiva.x < 0){
                piezaActiva.x = 0;
            }
            console.log('Presionaste la flecha IZQUIERDA ⬅️');

        }else if (evento.key === 'ArrowRight') {
            piezaActiva.x = piezaActiva.x + 1;
            
            if(piezaActiva.x > 9){
                piezaActiva.x = 9;
            }
            console.log('Presionaste la flecha DERECHA ➡️');
        }
    })


// Ejecutamos la función una primera vez al cargar la página para que no empiece en blanco
actualizarJuego();
