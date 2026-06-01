import cron from "node-cron";
import { db } from "../config/db.js";
import { sendTelegramMessage } from "../services/telegram.service.js";

const GROUP_CHAT_ID = "-5282084878";

export function startReminderJob() {
  cron.schedule("*/60 18-23 * * *", async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const users = await db.collection("users").find({}).toArray();

      const activities = await db
        .collection("activities")
        .find({ date: today })
        .toArray();

      const activeUserIds = activities.map((activity) =>
        activity.userId.toString(),
      );

      const missingUsers = users.filter(
        (user) => !activeUserIds.includes(user._id.toString()),
      );

      if (!missingUsers.length) {
        console.log("All users have submitted steps");
        return;
      }

      await sendTelegramMessage(
        GROUP_CHAT_ID,
        `🏃 Нагадування про челендж

Ще не проставили кроки:

${missingUsers.map((user) => `• ${user.name}`).join("\n")}

Не забудьте внести активність 👟`,
      );

      console.log("Reminder sent");
    } catch (error) {
      console.error("Reminder error:", error);
    }
  });
}
