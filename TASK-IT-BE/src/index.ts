import express from "express";
import { taskRouter } from "./routers/user";
import cors from "cors";
import { authRouter } from "./routers/auth";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!);

const app = express();


app.use(express.json());
app.use(cors());

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

// ADD THIS SECTION - Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
});

// Don't use: export default app;
// Only export if you're using it elsewhere, but still need app.listen()