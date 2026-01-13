"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.JWT_SECRET = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const userAuth_1 = require("../middleweres/userAuth");
dotenv_1.default.config();
exports.JWT_SECRET = "HTDJJHFGCHYJ";
exports.userRouter = (0, express_1.Router)();
const signupInputValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    username: zod_1.z.string().min(1)
});
const signinInputValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.userRouter.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedData = signupInputValidation.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: `invalid input`
            });
            return;
        }
        const { email, password, username } = parsedData.data;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        try {
            const newUser = yield db_1.userModel.create({
                email,
                password: hashedPassword,
                username
            });
            res.status(201).json({
                message: "User created successfully!",
                userId: newUser._id
            });
        }
        catch (error) {
            console.log(`this thing fucked up in singup - ${error}`);
            res.status(500).json({
                message: "this thing fucked up ", error
            });
        }
    });
});
exports.userRouter.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedData = signinInputValidation.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: `invalid input`
            });
            return;
        }
        const { email, password } = parsedData.data;
        try {
            const validUser = yield db_1.userModel.findOne({ email });
            if (!validUser) {
                console.log("invalid email id", email);
                res.status(400).json({
                    message: `invalid email : ${email}`
                });
                return;
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, validUser.password);
            if (isPasswordValid) {
                const token = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.JWT_SECRET);
                console.log(process.env.JWT_SECRET);
                res.json({
                    token: token
                });
            }
            else {
                res.status(400).json({
                    messgae: ` password - ${isPasswordValid} is incorrect `
                });
            }
        }
        catch (error) {
            console.log(`this thing fucked up in singIN - ${error}`);
            res.status(500).json({
                message: "this thing fucked up ", error
            });
        }
    });
});
const contentValidation = zod_1.z.object({
    link: zod_1.z.string().url(),
    title: zod_1.z.string(),
    type: zod_1.z.string()
});
// ✅ FIXED: Better error handling and userId validation
exports.userRouter.post("/addcontent", userAuth_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🟢 /addcontent route hit at:', new Date().toISOString());
        console.log('Request body:', req.body);
        console.log('User ID from middleware:', req.userId);
        console.log('Headers:', req.headers);
        // ✅ Check if userId exists from middleware
        if (!req.userId) {
            console.log('❌ No userId found - middleware issue');
            res.status(401).json({
                message: "Authentication failed - no user ID found"
            });
            return;
        }
        const parsedData = contentValidation.safeParse(req.body);
        if (!parsedData.success) {
            console.log('❌ Validation failed:', parsedData.error);
            res.status(400).json({
                message: `invalid input here`,
                errors: parsedData.error.issues
            });
            return;
        }
        const { link, title, type } = parsedData.data;
        console.log('✅ Validation passed, creating content...');
        try {
            const newContent = yield db_1.contentModel.create({
                link,
                title,
                type,
                tags: [],
                userId: req.userId // ✅ Proper type casting
            });
            console.log('✅ Content created successfully:', newContent._id);
            res.status(201).json({
                message: "Content added successfully!",
                content: {
                    id: newContent._id,
                    title: newContent.title,
                    link: newContent.link,
                    type: newContent.type
                }
            });
        }
        catch (error) {
            console.log(`❌ Database error: ${error}`);
            res.status(500).json({
                message: `Failed to create content: ${error}`
            });
        }
    });
});
//getcontent
exports.userRouter.get("/getcontent", userAuth_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            console.log('🟢 Getting content for user:', userId);
            if (!userId) {
                res.status(401).json({
                    message: "Authentication failed - no user ID found"
                });
                return;
            }
            const content = yield db_1.contentModel.find({ userId }).populate("userId", "username");
            res.json({
                content: content
            });
        }
        catch (error) {
            console.log('❌ Error getting content:', error);
            res.status(500).json({
                message: "Failed to get content",
                error: error
            });
        }
    });
});
exports.userRouter.delete("/api/v1/content", userAuth_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        const userId = req.userId;
        console.log('🟢 Deleting content:', contentId);
        console.log('🟢 User ID:', userId);
        if (!userId) {
            res.status(401).json({
                message: "Authentication failed - no user ID found"
            });
            return;
        }
        if (!contentId) {
            res.status(400).json({
                message: "Content ID is required"
            });
            return;
        }
        const deletedContent = yield db_1.contentModel.deleteMany({
            _id: contentId,
            userId: userId
        });
        if (deletedContent.deletedCount === 0) {
            res.status(404).json({
                message: "Content not found or already deleted"
            });
            return;
        }
        console.log('✅ Content deleted successfully');
        res.json({
            message: "Content deleted successfully",
            deletedCount: deletedContent.deletedCount
        });
    }
    catch (error) {
        console.log('❌ Error deleting content:', error);
        res.status(500).json({
            message: "Failed to delete content",
            error: error
        });
    }
}));
// Health check endpoint
exports.userRouter.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "User router is working",
        timestamp: new Date().toISOString()
    });
});
