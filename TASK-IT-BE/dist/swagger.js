"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API',
            version: '1.0.0',
            description: 'Complete API documentation for Task Management System with Authentication',
            contact: {
                name: 'API Support',
                email: 'support@taskmanager.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://api.yourdomain.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format: Bearer <token>',
                },
            },
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Task ID',
                            example: '507f1f77bcf86cd799439011',
                        },
                        title: {
                            type: 'string',
                            description: 'Task title',
                            example: 'Complete project documentation',
                        },
                        description: {
                            type: 'string',
                            description: 'Task description',
                            example: 'Write comprehensive API documentation',
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            description: 'Task status',
                            example: 'in-progress',
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high'],
                            description: 'Task priority',
                            example: 'high',
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Task due date',
                            example: '2024-12-31T23:59:59.000Z',
                        },
                        userId: {
                            type: 'string',
                            description: 'User ID who owns the task',
                            example: '507f1f77bcf86cd799439011',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Task creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Task last update timestamp',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID',
                            example: '507f1f77bcf86cd799439011',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'user@example.com',
                        },
                        fullName: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe',
                        },
                        isEmailVerified: {
                            type: 'boolean',
                            description: 'Email verification status',
                            example: false,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Account creation timestamp',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                            example: 'Something went wrong',
                        },
                        error: {
                            type: 'string',
                            description: 'Detailed error description',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Authentication endpoints',
            },
            {
                name: 'Tasks',
                description: 'Task management endpoints',
            },
        ],
    },
    apis: ['./src/routers/*.ts'], // Path to your API routes
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
