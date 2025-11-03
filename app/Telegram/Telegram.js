const messages = require('./messages');

module.exports = function(redT) {
    const bot = redT.telegram;

    bot.on('message', (msg) => {
        console.log('New message received:', msg.text);
        messages(bot, msg); // gọi hàm xử lý tin nhắn
    });

    console.log('Telegram Bot is running...');
}
