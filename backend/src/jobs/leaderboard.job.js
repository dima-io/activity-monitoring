import cron from "node-cron";
import { db } from "../config/db.js";
import { sendTelegramMessage } from "../services/telegram.service.js";

const GROUP_CHAT_ID = "-5282084878";

export function startLeaderboardJob() {
  cron.schedule("0 23 * * *", async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const users = await db.collection("users").find({}).toArray();

      const activities = await db
        .collection("activities")
        .find({ date: today })
        .toArray();

      const leaderboard = await Promise.all(
        activities.map(async (activity) => {
          const user = await db.collection("users").findOne({
            _id: activity.userId,
          });

          return {
            name: user?.name || user?.email || "Unknown",
            steps: activity.steps || 0,
            distance: activity.distance || 0,
            calories: activity.calories || 0,
          };
        }),
      );

      leaderboard.sort((a, b) => b.steps - a.steps);

      const activeUserIds = activities.map((activity) =>
        activity.userId.toString(),
      );

      const missingUsers = users.filter(
        (user) => !activeUserIds.includes(user._id.toString()),
      );

      const leaderboardMessage = leaderboard.length
        ? leaderboard
            .map(
              (item, index) =>
                `${index + 1}. 🏃 ${item.name}
👟 ${item.steps.toLocaleString()} кроків
📍 ${item.distance} км
🔥 ${item.calories} калорій`,
            )
            .join("\n\n")
        : "Сьогодні ще ніхто не проставив кроки 👀";

      const missingMessage = missingUsers.length
        ? `\n\n⏳ Ще не проставили кроки:\n${missingUsers
            .map((user) => `• ${user.name || user.email}`)
            .join("\n")}`
        : "\n\n✅ Всі учасники вже внесли кроки!";

      await sendTelegramMessage(
        GROUP_CHAT_ID,
        `🏆 Рейтинг за сьогодні\n\n${leaderboardMessage}${missingMessage}`,
      );

      console.log("Leaderboard sent");
    } catch (error) {
      console.error("Leaderboard error:", error);
    }
  });
}
