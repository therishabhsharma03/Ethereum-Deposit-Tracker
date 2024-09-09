/**
 * Sends notifications to a specified Telegram chat using a bot.
 * The bot token and chat ID are retrieved from environment variables for security.
 * Uses Axios to make an API request to Telegram's sendMessage endpoint.
 */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const sendTelegramNotification = async (message) => {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const params = {
        chat_id: chatId,
        text: message,
    };
    
    try {
        await axios.post(url, params);
        console.log('Telegram notification sent.');
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
};

module.exports = {
    sendTelegramNotification,
};
