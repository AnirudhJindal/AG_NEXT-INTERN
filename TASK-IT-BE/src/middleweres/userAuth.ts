import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"; // Importing the JWT secret key from a configuration file.
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for token verification.
dotenv.config()

// Middleware to validate user authentication using a JWT token.
export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Extract the "authorization" header from the request.
    const header = req.headers["authorization"];
    
    // Verify the JWT token using the secret key.
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);

    // If the token is successfully decoded, attach the user ID to the request object.
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
    } else {
        // If the token is invalid, send a 401 Unauthorized response.
        res.status(401).json({ message: "Unauthorized User" });
    }
};