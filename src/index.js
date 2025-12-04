import cipher from './cipher.js';

// Seleccionamos los elementos del HTML
const inputTexto = document.getElementById('texto-entrada');
const outputTexto = document.getElementById('texto-salida');
const inputDesplazamiento = document.getElementById('desplazamiento');
const labelDesplazamiento = document.querySelector('label[for="desplazamiento"]');
const btnAccion = document.getElementById('btn-accion');
const btnsModo = document.querySelectorAll('.mode-btn');

// Estado actual (por defecto estamos en modo Cifrar)
let modoActual = 'cifrar'; 

// 2. Escuchar el slider para actualizar el numerito visualmente
inputDesplazamiento.addEventListener('input', () => {
labelDesplazamiento.textContent = `Desplazamiento: ${inputDesplazamiento.value}`;
});

// 3. Manejar los botones de modo (Cifrar / Descifrar)
btnsModo.forEach(btn => {
btn.addEventListener('click', (e) => {
    // Quitar clase active a todos y ponerla al clickeado
    btnsModo.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    // Actualizar el texto del botón grande
    if (e.target.innerText === "Cifrar") {
        modoActual = 'cifrar';
        btnAccion.innerText = "Cifrar Mensaje";
    } else {
        modoActual = 'descifrar';
        btnAccion.innerText = "Descifrar Mensaje";
    }
});
});

// 4. EL EVENTO PRINCIPAL: Al hacer click en el botón grande
btnAccion.addEventListener('click', () => {
    const texto = inputTexto.value;
    const offset = inputDesplazamiento.value;

    if (modoActual === 'cifrar') {
        const resultado = cipher.encode(offset, texto);
        outputTexto.value = resultado;
    } else {
        const resultado = cipher.decode(offset, texto);
        outputTexto.value = resultado;
    }
});
// === copi pega ===

const btnCopiar = document.getElementById('btn-copiar');
const btnIntercambiar = document.getElementById('btn-intercambiar');

//Botón Copiar
btnCopiar.addEventListener('click', () => {
    const textoParaCopiar = outputTexto.value;
    
    if (textoParaCopiar) {
        navigator.clipboard.writeText(textoParaCopiar)
            .then(() => {
                
                console.log('Texto copiado');
                const originalText = btnCopiar.innerText;
                btnCopiar.innerText = "✅";
                setTimeout(() => btnCopiar.innerText = originalText, 1000);
            })
            .catch(err => {
                console.error('Error al copiar: ', err);
            });
    }
});

//Botón Intercambiar
btnIntercambiar.addEventListener('click', () => {
    const textoSalida = outputTexto.value;
    if (textoSalida) {
        inputTexto.value = textoSalida; // cambio resultdo a entreda
        outputTexto.value = "";         // Limpial  salida
        
        // Invertir el modo automáticamente
        if (modoActual === 'cifrar') {
            btnsModo[1].click(); 
        } else {
            btnsModo[0].click(); 
        }
    }
});