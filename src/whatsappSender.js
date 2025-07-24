const { chromium } = require('playwright');

async function cerrarPopupSiExiste(pagina) {
    try {
        console.log('⌨️ Enviando tecla ESC para cerrar el popup...');
        await pagina.keyboard.press('Escape');
        console.log('✅ Se cerro el popup con ESC.');
    } catch (e) {
        console.warn('⚠️ No se pudo enviar ESC:', e.message);
    }
}

async function enviarMensajes(contactos, delay = 8000) {
    const browserOptions = {
        headless: false,
        args: [
            '--disable-web-security',
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox'
        ]
    };

    const navegador = await chromium.launch(browserOptions);
    const pagina = await navegador.newPage();

    // ✅ Abrir WhatsApp Web antes de iniciar el envío
    console.log('🟢 Abriendo WhatsApp Web para escanear QR...');
    await pagina.goto('https://web.whatsapp.com');
    await pagina.waitForLoadState('load');

    console.log('⏳ Verificando si hay sesión activa o si se necesita escanear QR...');

    const qrCanvas = await pagina.$('canvas[aria-label="Escanea el código QR"]');
    if (qrCanvas) {
        console.log('🔐 No hay sesión. Esperando a que escanees el QR...');
        await pagina.waitForSelector('canvas[aria-label="Escanea el código QR"]', { timeout: 0 }).catch(() => { });
        await pagina.waitForTimeout(10000);
    } else {
        console.log('🔓 Sesión activa detectada. Continuando...');
        await pagina.waitForSelector('div[role="grid"]', { timeout: 1000000 });
    }


    // ✅ Cerrar popup inicial si aparece
    await cerrarPopupSiExiste(pagina);

    console.log('✅ Sesión iniciada. Enviando mensajes...');

    for (let { numero, mensaje } of contactos) {
        try {
            const url = `https://web.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
            console.log(`Enviando a ${numero}: "${mensaje}"`);

            await pagina.goto(url, { timeout: 10000 });
            await pagina.waitForLoadState('load');

            const sendButtonSelector = 'button[aria-label="Enviar"], button[aria-label="Send"]';
            await pagina.waitForSelector(sendButtonSelector, { timeout: 10000, state: 'visible' });

            await pagina.keyboard.press('Enter');
            await pagina.waitForTimeout(delay);
        } catch (error) {
            console.error(`❌ Error al enviar a ${numero}: ${error.message}`);
        }
    }

    await navegador.close();
}

module.exports = { enviarMensajes };
