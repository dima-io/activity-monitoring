bot.onText(/\/greeting/, async (msg) => {
  const firstName = msg.from.first_name;

  await sendTelegramMessage(
    GROUP_CHAT_ID,
    `🚀 Новий учасник!

👋 ${firstName} приєднався до "Активних перців"

Бажаємо нових рекордів та багато кроків 👟🔥`,
  );
});
