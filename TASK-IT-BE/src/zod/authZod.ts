import { z } from "zod";


export const signupInputValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(1)
});

export  const signinInputValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});


export const magicLinkValidation = z.object({
    email: z.string().email()
});

