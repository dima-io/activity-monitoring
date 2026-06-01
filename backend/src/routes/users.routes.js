import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.delete("/:userId", deleteUser);

export default router;
