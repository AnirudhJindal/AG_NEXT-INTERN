"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routers/user");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routers/auth");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://ANIRUDH:q543H7zVHKujxL9h@cluster0.lbiokv1.mongodb.net/TaskIt");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", auth_1.authRouter);
app.use("/api/task", user_1.taskRouter);
app.listen(3000, () => {
    console.log("app has started on port 3000");
});
exports.default = app;
