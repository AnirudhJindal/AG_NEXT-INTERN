"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../db/model"); // your combined User/Task model file
const authZod_1 = require("../zod/authZod");
const userAuth_1 = require("../middleweres/userAuth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.authRouter = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error("JWT_SECRET missing");
/* =====================================================
   REGISTER
   POST /api/auth/register
===================================================== */
exports.authRouter.post("/register", async (req, res) => {
    const parsed = authZod_1.signupInputValidation.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsed.error.issues,
        });
    }
    const { email, password, username } = parsed.data;
    try {
        const existingUser = await model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await model_1.User.create({
            email,
            password: hashedPassword,
            fullName: username,
            isEmailVerified: false,
        });
        console.log(email);
        return res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
});
exports.authRouter.post("/login", async (req, res) => {
    const parsed = authZod_1.signinInputValidation.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsed.error.issues,
        });
    }
    const { email, password } = parsed.data;
    try {
        const user = await model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email ",
            });
        }
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({
                message: "Invalid  password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
        return res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
});
/* =====================================================
   PROFILE (PROTECTED)
   GET /api/auth/profile
===================================================== */
exports.authRouter.get("/profile", userAuth_1.userMiddleware, // 🔥 YOUR middleware
async (req, res) => {
    try {
        // @ts-ignore (because middleware attaches it)
        const userId = req.userId;
        const user = await model_1.User.findById(userId).select("_id email fullName isEmailVerified createdAt");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.json({
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch profile",
            error: error.message,
        });
    }
});
