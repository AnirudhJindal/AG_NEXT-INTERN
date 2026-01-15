"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magicLinkValidation = exports.signinInputValidation = exports.signupInputValidation = void 0;
const zod_1 = require("zod");
exports.signupInputValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    username: zod_1.z.string().min(1)
});
exports.signinInputValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.magicLinkValidation = zod_1.z.object({
    email: zod_1.z.string().email()
});
