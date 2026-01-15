"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importing the jsonwebtoken library for token verification.
dotenv_1.default.config();
// Middleware to validate user authentication using a JWT token.
const userMiddleware = async (req, res, next) => {
    // Extract the "authorization" header from the request.
    const header = req.headers["authorization"];
    // Verify the JWT token using the secret key.
    const decoded = jsonwebtoken_1.default.verify(header, process.env.JWT_SECRET);
    // If the token is successfully decoded, attach the user ID to the request object.
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
    }
    else {
        // If the token is invalid, send a 401 Unauthorized response.
        res.status(401).json({ message: "Unauthorized User" });
    }
};
exports.userMiddleware = userMiddleware;
