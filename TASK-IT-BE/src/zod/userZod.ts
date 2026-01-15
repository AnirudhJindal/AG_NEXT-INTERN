import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  priority: z.enum(["High", "Medium", "Low"]).optional(),
  status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
  dueDate: z.string().datetime().optional(),
});