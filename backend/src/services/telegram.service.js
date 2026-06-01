import TelegramBot from "node-telegram-bot-api";

let bot;

export function getTelegramBot() {
  if (!bot) {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      throw new Error("TELEGRAM_BOT_TOKEN is missing");
    }

    bot = new TelegramBot(token, {
      polling: true,
    });
  }

  return bot;
}

export function sendTelegramMessage(chatId, text) {
  const bot = getTelegramBot();

  return bot.sendMessage(chatId, text);
}
