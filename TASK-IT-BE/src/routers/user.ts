import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Task } from "../db/model";
import { userMiddleware } from "../middleweres/userAuth";
import { createTaskSchema } from "../zod/userZod";

export const taskRouter = Router();




const updateTaskSchema = createTaskSchema.partial();


taskRouter.get(
  "/",
  userMiddleware,
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const tasks = await Task.find({ userId: req.userId })
        .sort({ createdAt: -1 });

      res.json({ tasks });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch tasks",
        error: error.message,
      });
    }
  }
);

/* =====================================================
   POST /api/tasks
   Create new task
===================================================== */
taskRouter.post(
  "/",
  userMiddleware,
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.issues,
      });
    }

    try {
      const task = await Task.create({
        ...parsed.data,
        dueDate: parsed.data.dueDate
          ? new Date(parsed.data.dueDate)
          : undefined,
        userId: new mongoose.Types.ObjectId(req.userId),
      });

      res.status(201).json({
        message: "Task created successfully",
        task,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to create task",
        error: error.message,
      });
    }
  }
);

/* =====================================================
   GET /api/tasks/:id
   Get specific task
===================================================== */
taskRouter.get(
  "/:id",
  userMiddleware,
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const task = await Task.findOne({
        _id: req.params.id,
        userId: req.userId,
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ task });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch task",
        error: error.message,
      });
    }
  }
);


taskRouter.put(
  "/:id",
  userMiddleware,
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.issues,
      });
    }

    try {
      const updated = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        {
          ...parsed.data,
          dueDate: parsed.data.dueDate
            ? new Date(parsed.data.dueDate)
            : undefined,
        },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({
        message: "Task updated successfully",
        task: updated,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to update task",
        error: error.message,
      });
    }
  }
);


taskRouter.delete(
  "/:id",
  userMiddleware,
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const deleted = await Task.deleteOne({
        _id: req.params.id,
        userId: req.userId,
      });

      if (deleted.deletedCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task deleted successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to delete task",
        error: error.message,
      });
    }
  }
);


taskRouter.get(
  "/stats",
  userMiddleware,
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const stats = await Task.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      res.json({ stats });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch stats",
        error: error.message,
      });
    }
  }
);
