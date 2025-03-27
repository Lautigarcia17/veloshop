import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email(),
    password: z.string()
        .min(1, 'Password is required')
        .min(6, {
            message: 'Password must be at least 6 characters'
        })
})

export const registerSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email({
            message: "Please enter a valid email address"
        }),
    password: z.string()
        .min(1,'Password is required')
        .min(6, {
            message: 'Password must be at least 6 characters'
        }),
    confirmPassword: z.string()
        .min(1,'Confirm Password is required')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });