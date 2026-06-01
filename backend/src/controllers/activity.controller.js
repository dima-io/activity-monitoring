import { ObjectId } from "mongodb";
import { ca } from "vuetify/locale";
import { db } from "../config/db.js";

export async function addActivity(req, res) {
  try {
    const { userId, date, steps, distance, calories } = req.body;
    const result = await db.collection("activities").updateOne(
      {
        userId: new ObjectId(userId),
        date,
      },
      {
        $set: {
          steps,
          distance,
          calories,
          updateAt: new Date(),
        },
        $setOnInsert: {
          userId: new ObjectId(userId),
          date,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    res.status(201).json({
      message: "Activity saved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function getActivities(req, res) {
  try {
    const { userId } = req.query;

    const activities = await db
      .collection("activities")
      .find({ userId: new ObjectId(userId) })
      .sort({ date: -1 })
      .toArray();

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
}
