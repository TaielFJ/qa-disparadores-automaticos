const { leerContactosDesdeCSV } = require('./csvReader');
const { enviarMensajes } = require('./whatsappSender');

(async () => {
    const delaySegundos = parseInt(process.argv[2]) || 8;
    const delayMs = Math.max(delaySegundos, 8) * 1000;

    console.log(`⏱ Usando delay de ${delayMs / 1000} segundos...`);
    console.log('📥 Leyendo contactos...');

    try {
        const contactos = await leerContactosDesdeCSV();
        if (contactos.length === 0) {
            console.warn('⚠️ No se encontraron contactos válidos.');
            process.exit(1);
        }

        await enviarMensajes(contactos, delayMs);
        console.log('✅ Todos los mensajes fueron procesados.');
    } catch (err) {
        console.error('❌ Error general:', err.message);
    }
})();
