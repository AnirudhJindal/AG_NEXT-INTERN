"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = require("../db/model");
const userAuth_1 = require("../middleweres/userAuth");
const userZod_1 = require("../zod/userZod");
exports.taskRouter = (0, express_1.Router)();
const updateTaskSchema = userZod_1.createTaskSchema.partial();
exports.taskRouter.get("/", userAuth_1.userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const tasks = await model_1.Task.find({ userId: req.userId })
            .sort({ createdAt: -1 });
        res.json({ tasks });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message,
        });
    }
});
/* =====================================================
   POST /api/tasks
   Create new task
===================================================== */
exports.taskRouter.post("/", userAuth_1.userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const parsed = userZod_1.createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsed.error.issues,
        });
    }
    try {
        const task = await model_1.Task.create({
            ...parsed.data,
            dueDate: parsed.data.dueDate
                ? new Date(parsed.data.dueDate)
                : undefined,
            userId: new mongoose_1.default.Types.ObjectId(req.userId),
        });
        res.status(201).json({
            message: "Task created successfully",
            task,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create task",
            error: error.message,
        });
    }
});
/* =====================================================
   GET /api/tasks/:id
   Get specific task
===================================================== */
exports.taskRouter.get("/:id", userAuth_1.userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const task = await model_1.Task.findOne({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ task });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch task",
            error: error.message,
        });
    }
});
exports.taskRouter.put("/:id", userAuth_1.userMiddleware, async (req, res) => {
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
        const updated = await model_1.Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, {
            ...parsed.data,
            dueDate: parsed.data.dueDate
                ? new Date(parsed.data.dueDate)
                : undefined,
        }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({
            message: "Task updated successfully",
            task: updated,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message,
        });
    }
});
exports.taskRouter.delete("/:id", userAuth_1.userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const deleted = await model_1.Task.deleteOne({
            _id: req.params.id,
            userId: req.userId,
        });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message,
        });
    }
});
exports.taskRouter.get("/stats", userAuth_1.userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const stats = await model_1.Task.aggregate([
            { $match: { userId: new mongoose_1.default.Types.ObjectId(req.userId) } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);
        res.json({ stats });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch stats",
            error: error.message,
        });
    }
});
