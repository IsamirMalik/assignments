import express from "express";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controllers.mjs";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

