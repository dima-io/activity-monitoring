import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startTelegramBot } from "./bots/telegram.bot.js";

dotenv.config();

const PORT = process.env.PORT || 5050;

async function startServer() {
  await connectDB();

  startTelegramBot();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
