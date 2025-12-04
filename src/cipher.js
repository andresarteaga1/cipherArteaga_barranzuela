const cipher = {
  // Función para Cifrar
encode: function(offset, string) {
    // 1. Convertimos el offset a número y aseguramos que el texto esté en mayúsculas (requisito del PDF)
    let offsetNum = parseInt(offset);
    let texto = string.toUpperCase();
    let resultado = "";

    // 2. Recorremos letra por letra
    for (let i = 0; i < texto.length; i++) {
    let codigoAscii = texto.charCodeAt(i);

      // 3. Aplicamos fórmula solo si es letra Mayúscula (A=65, Z=90)
    if (codigoAscii >= 65 && codigoAscii <= 90) {
        // Fórmula: (x - 65 + offset) % 26 + 65
        let codigoNuevo = ((codigoAscii - 65 + offsetNum) % 26) + 65;
        resultado += String.fromCharCode(codigoNuevo);
    } else {
        // Si es espacio o signo, lo dejamos igual
        resultado += texto[i];
    }
    }
    return resultado;
},

  // Función para Descifrar
decode: function(offset, string) {
    let offsetNum = parseInt(offset);
    let texto = string.toUpperCase();
    let resultado = "";

    for (let i = 0; i < texto.length; i++) {
    let codigoAscii = texto.charCodeAt(i);

    if (codigoAscii >= 65 && codigoAscii <= 90) {
        // Fórmula inversa.
        // Nota: En JS el módulo de negativos puede dar problemas, así que sumamos 26 antes del módulo final.
        let codigoNuevo = ((codigoAscii - 65 - offsetNum) % 26 + 26) % 26 + 65;
        resultado += String.fromCharCode(codigoNuevo);
    } else {
        resultado += texto[i];
    }
    }
    return resultado;
}
};

export default cipher;