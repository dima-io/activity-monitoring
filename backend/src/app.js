import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://activity-monitoring-blond.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/activities", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.get("/", (req, res) => {
  res.json({ message: "API working" });
});

export default app;
