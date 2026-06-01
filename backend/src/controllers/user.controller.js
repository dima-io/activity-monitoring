import { db } from "../config/db.js";
import { ObjectId } from "mongodb";

export async function getUsers(req, res) {
  try {
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(userId),
    });

    if (!result.deletedCount) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("DELETE USER ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}
