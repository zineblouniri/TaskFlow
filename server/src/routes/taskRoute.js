import express from "express";
import { createTask,getTasks, getMyTasks, updateTask, deleteTask  } from "../controllers/taskController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", verifyToken, getMyTasks);
router.get("/:projectId", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);



export default router;