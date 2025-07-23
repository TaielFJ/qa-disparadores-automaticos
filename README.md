# 📤 QA Disparadores Automáticos

Este proyecto permite enviar múltiples mensajes predefinidos a través de WhatsApp Web de forma automatizada. Es útil para probar respuestas y comportamientos de chatbots o flujos de conversación.

---

## ⚙️ Requisitos

- Node.js (v18 o superior recomendado)
- Git
- Google Chrome instalado
- Cuenta de WhatsApp activa

---

## 🚀 Instalación

```bash
git clone https://github.com/TaielFJ/qa-disparadores-automaticos.git
cd qa-disparadores-automaticos
npm install
```

---

## 📄 Formato del archivo `contactos.csv`

El archivo debe estar en la raíz del proyecto con el siguiente formato:

```csv
numero,mensaje
5491160000000,hola
5491160000000,quiero saber mi saldo
```

- `numero`: número de celular en formato internacional (sin `+`)
- `mensaje`: texto a enviar

---

## ▶️ Uso

```bash
npm test
```

O bien especificando el delay entre mensajes (en segundos):

```bash
node src/index.js 10
```

---

## 🛠 ¿Qué hace el script?

1. Abre WhatsApp Web en modo no headless
2. Espera escaneo de QR o detecta sesión activa
3. Cierra el popup inicial automáticamente
4. Envía todos los mensajes del CSV
5. Espera un delay entre cada mensaje

---

## 📁 Estructura del proyecto

```
qa-disparadores-automaticos/
├── src/
│   ├── index.js
│   ├── whatsappSender.js
│   └── csvReader.js
├── contactos.csv
├── .gitignore
├── package.json
└── README.md
```

---

## 🙋‍♂️ Autor

**Taiel Jara**  
