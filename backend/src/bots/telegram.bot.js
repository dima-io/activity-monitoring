import {
  getTelegramBot,
  sendTelegramMessage,
} from "../services/telegram.service.js";

const GROUP_CHAT_ID = "-5282084878";

export function startTelegramBot() {
  const bot = getTelegramBot();

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    bot.sendMessage(
      chatId,
      `Привіт, ${firstName} 👋\nТвій Telegram chatId: ${chatId}`,
    );
  });

  bot.onText(/\/greeting/, async (msg) => {
    const userName = msg.text.replace("/greeting", "").trim();

    if (!userName) {
      return bot.sendMessage(
        msg.chat.id,
        "Напиши імʼя після команди. Наприклад: /greeting Катя",
      );
    }

    await sendTelegramMessage(
      GROUP_CHAT_ID,
      `🚀 Новий учасник!

👋 ${userName} приєднався до "Активних перців"

Бажаємо нових рекордів та багато кроків 👟🔥`,
    );
  });
  console.log("Telegram bot started");
}
