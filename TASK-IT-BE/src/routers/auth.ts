import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/model"; // your combined User/Task model file
import {
  signupInputValidation,
  signinInputValidation,
} from "../zod/authZod";
import { userMiddleware } from "../middleweres/userAuth";
import dotenv from "dotenv"
dotenv.config

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

/* =====================================================
   REGISTER
   POST /api/auth/register
===================================================== */
authRouter.post("/register", async (req: Request, res: Response) => {
  const parsed = signupInputValidation.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.issues,
    });
  }

  const { email, password, username } = parsed.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullName: username,
      isEmailVerified: false,
    });
    console.log(email)

    return res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });


  } catch (error: any) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});


authRouter.post("/login", async (req: Request, res: Response) => {
  const parsed = signinInputValidation.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.issues,
    });
  }

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email ",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid  password",
      });
    }

    const token = jwt.sign(
      { id: user._id },   
      JWT_SECRET
    );

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error: any) {
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
authRouter.get(
  "/profile",
  userMiddleware, // 🔥 YOUR middleware
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore (because middleware attaches it)
      const userId = req.userId;

      const user = await User.findById(userId).select(
        "_id email fullName isEmailVerified createdAt"
      );

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
    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to fetch profile",
        error: error.message,
      });
    }
  }
);
