import { z } from 'zod'

export const signupValidation = z.object({
    body: z.object({
        fullName: z.string().min(1, 'Full Name is required'),
        email: z.string().email('Invalid Email Format'),
        password: z.string().min(6, 'Password must be at least 6 characters')
    }),
});

export const signinValidation = z.object({
    body: z.object({
        email: z.string().email('Invalid Email Format'),
        password: z.string().min(1, 'Password must be at least 6 characters')
    }),
});