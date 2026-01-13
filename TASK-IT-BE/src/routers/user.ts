import { Router } from "express";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";
import { userMiddleware } from "../middleweres/userAuth";
import { prisma } from "../db";
import { UserSignup, UserSignin, Content } from "../types";
import * as stytch from "stytch";

dotenv.config();
export const JWT_SECRET = "HTDJJHFGCHYJ";
export const userRouter = Router();

const stytchClient = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID || "",
  secret: process.env.STYTCH_SECRET || "",
});

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const signupInputValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(1)
});

const signinInputValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const contentValidation = z.object({
    link: z.string().url().optional(),
    title: z.string(),
    type: z.enum(["TEXT", "VIDEO", "IMAGE", "LINK"]),
    content: z.string().optional(),
    mediaUrl: z.string().url().optional(),
    tag: z.string().optional()
});

const magicLinkValidation = z.object({
    email: z.string().email()
});

userRouter.post("/signup", async function (req: Request<{}, {}, UserSignup>, res: Response) {

    const parsedData = signupInputValidation.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: `invalid input`
        });
        return;
    }

    const { email, password, username } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                emailId: email,
                fullName: username,
                authOption: 'PUBLIC',
                isEmailVerified: false,
                password : hashedPassword,
            }
        });
        
        
        
        res.status(201).json({
            message: "Email Magic Link Generated",
            userId: newUser.id,
            email : newUser.emailId
        });

    } catch (error) {
        console.log(`this thing fucked up in singup - ${error}`);

        res.status(500).json({
            message: "this thing fucked up", error
        });
    }
});

userRouter.post("/signin", async function (req: Request<{}, {}, UserSignin>, res: Response) {

    const parsedData = signinInputValidation.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: `invalid input`
        });
        return;
    }

    const { email, password } = parsedData.data;

    try {
        const validUser = await prisma.user.findUnique({
            where: { emailId: email }
        });

        if (!validUser) {
            console.log("invalid email id", email);
            res.status(400).json({
                message: `invalid email : ${email}`
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, validUser.fullName);
        if (isPasswordValid) {
            const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET as any);
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

    } catch (error) {
        console.log(`this thing fucked up in singIN - ${error}`);
        res.status(500).json({
            message: "this thing fucked up", error
        });
    }
});

userRouter.post("/magic-link/send", async function (req: Request, res: Response) {
    const parsedData = magicLinkValidation.safeParse(req.body);
    
    if (!parsedData.success) {
        res.status(400).json({
            message: "invalid input",
            errors: parsedData.error.issues
        });
        return;
    }

    const { email } = parsedData.data;

    try {
        const response = await stytchClient.magicLinks.email.loginOrCreate({
            email: email
        });

        res.json({
            message: "Magic link sent successfully!",
            data: response
        });

    } catch (error) {
        console.log(`Error sending magic link - ${error}`);
        res.status(500).json({
            message: "Failed to send magic link",
            error: error
        });
    }
});

userRouter.get("/magic-link/authenticate", async function (req: Request, res: Response) {
    const token = req.query.token as string;
    const tokenType = req.query.stytch_token_type as string;

    if (tokenType !== 'magic_links') {
        console.error(`Unsupported token type: '${tokenType}'`);
        res.status(400).json({
            message: `Unsupported token type: '${tokenType}'`
        });
        return;
    }

    try {
        const response = await stytchClient.magicLinks.authenticate({
            token: token,
            session_duration_minutes: 60,
        });

        const stytchUser = response.user;
        const email = stytchUser.emails[0].email;

        let user = await prisma.user.findUnique({
            where: { emailId: email }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    emailId: email,
                    fullName: email.split('@')[0],
                    authOption: 'PUBLIC',
                    isEmailVerified: true,
                    password
                }
            });
        } else {
            await prisma.user.update({
                where: { emailId: email },
                data: { isEmailVerified: true }
            });
        }

        const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as any);

        res.json({
            message: "Authentication successful!",
            token: jwtToken,
            user: {
                id: user.id,
                email: user.emailId,
                fullName: user.fullName
            },
            stytchSession: response.session_token
        });

    } catch (error) {
        console.log(`Error authenticating magic link - ${error}`);
        res.status(401).json({
            message: "Authentication failed",
            error: error
        });
    }
});

userRouter.post("/addcontent", userMiddleware, async function (req: Request<{}, {}, Content>, res: Response) {
    console.log('POST /addcontent route hit at:', new Date().toISOString());
    console.log('Request body:', req.body);
    console.log('User ID from middleware:', req.userId);

    if (!req.userId) {
        console.log('ERROR: No userId found - middleware issue');
        res.status(401).json({
            message: "Authentication failed - no user ID found"
        });
        return;
    }

    const parsedData = contentValidation.safeParse(req.body);

    if (!parsedData.success) {
        console.log('ERROR: Validation failed:', parsedData.error);
        res.status(400).json({
            message: `invalid input here`,
            errors: parsedData.error.issues
        });
        return;
    }

    const { link, title, type, content, mediaUrl, tag } = parsedData.data;
    console.log('SUCCESS: Validation passed, creating content...');

    try {
        const newContent = await prisma.post.create({
            data: {
                link: link,
                title: title,
                type: type as any,
                content: content,
                mediaUrl: mediaUrl,
                tag: tag,
                userId: req.userId,
                authOption: 'PUBLIC'
            }
        });

        console.log('SUCCESS: Content created successfully:', newContent.id);

        res.status(201).json({
            message: "Content added successfully!",
            content: {
                id: newContent.id,
                title: newContent.title,
                link: newContent.link,
                type: newContent.type
            }
        });

    } catch (error) {
        console.log(`ERROR: Database error: ${error}`);
        res.status(500).json({
            message: `Failed to create content: ${error}`
        });
    }
});

userRouter.get("/getcontent", userMiddleware, async function (req: Request, res: Response) {
    try {
        const userId = req.userId;
        console.log('GET /getcontent for user:', userId);

        if (!userId) {
            res.status(401).json({
                message: "Authentication failed - no user ID found"
            });
            return;
        }

        const content = await prisma.post.findMany({
            where: { userId: userId },
            include: {
                user: {
                    select: {
                        fullName: true
                    }
                }
            }
        });

        res.json({
            content: content
        });
    } catch (error) {
        console.log('ERROR: Error getting content:', error);
        res.status(500).json({
            message: "Failed to get content",
            error: error
        });
    }
});

userRouter.delete("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        const userId = req.userId;

        console.log('DELETE content:', contentId);
        console.log('User ID:', userId);

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

        const deletedContent = await prisma.post.deleteMany({
            where: {
                id: contentId,
                userId: userId
            }
        });

        if (deletedContent.count === 0) {
            res.status(404).json({
                message: "Content not found or already deleted"
            });
            return;
        }

        console.log('SUCCESS: Content deleted successfully');
        res.json({
            message: "Content deleted successfully",
            deletedCount: deletedContent.count
        });

    } catch (error) {
        console.log('ERROR: Error deleting content:', error);
        res.status(500).json({
            message: "Failed to delete content",
            error: error
        });
    }
});

userRouter.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "User router is working",
        timestamp: new Date().toISOString()
    });
});