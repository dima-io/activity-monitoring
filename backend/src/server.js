import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startTelegramBot } from "./bots/telegram.bot.js";

dotenv.config();

const PORT = process.env.PORT || 5050;

async function startServer() {
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
  console.log("TELEGRAM_BOT_TOKEN exists:", !!process.env.TELEGRAM_BOT_TOKEN);
  await connectDB();

  startTelegramBot();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
