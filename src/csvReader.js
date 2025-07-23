const fs = require('fs');
const csv = require('csv-parser');

function leerContactosDesdeCSV(path = 'contactos.csv') {
    return new Promise((resolve, reject) => {
        const contactos = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (row) => {
                if (row.numero && row.mensaje) {
                    contactos.push({
                        numero: row.numero,
                        mensaje: row.mensaje
                    });
                }
            })
            .on('end', () => resolve(contactos))
            .on('error', (err) => reject(err));
    });
}

module.exports = { leerContactosDesdeCSV };
