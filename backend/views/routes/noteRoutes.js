import express from "express";
import {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(createNewTask)
  .patch(updateTask)
  .delete(deleteTask);

export default router;
