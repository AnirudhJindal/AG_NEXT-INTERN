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
/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve all tasks for the authenticated user, sorted by creation date (newest first)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
exports.taskRouter.get("/", userAuth_1.userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const tasks = await model_1.Task.find({ userId: req.userId }).sort({
            createdAt: -1,
        });
        res.json({ tasks });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message,
        });
    }
});
/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *                 example: Complete project documentation
 *               description:
 *                 type: string
 *                 description: Task description
 *                 example: Write comprehensive API documentation with examples
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 description: Task status
 *                 example: pending
 *                 default: pending
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Task priority level
 *                 example: high
 *                 default: medium
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Task due date
 *                 example: 2024-12-31T23:59:59.000Z
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
            dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
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
/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get a specific task
 *     description: Retrieve a single task by ID for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *                 example: Updated task title
 *               description:
 *                 type: string
 *                 description: Task description
 *                 example: Updated description
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 description: Task status
 *                 example: completed
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Task priority
 *                 example: low
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Task due date
 *                 example: 2024-12-31T23:59:59.000Z
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by ID for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
/**
 * @swagger
 * /api/task/stats:
 *   get:
 *     summary: Get task statistics
 *     description: Retrieve task statistics grouped by status for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Task status
 *                         example: completed
 *                       count:
 *                         type: integer
 *                         description: Number of tasks with this status
 *                         example: 5
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
