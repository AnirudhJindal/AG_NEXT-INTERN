"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    priority: zod_1.z.enum(["High", "Medium", "Low"]).optional(),
    status: zod_1.z.enum(["Pending", "In Progress", "Completed"]).optional(),
    dueDate: zod_1.z.string().datetime().optional(),
});
