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
        .min(1,'Confirm Password is required'),
    name: z.string({
        required_error: 'Name is required'
    })
        .min(2, {
            message: 'Password must be at least 2 characters'
        })
        .max(12, {
            message: 'The name must not have more than 12 characters.'
        }),
    surname: z.string({
        required_error: 'Surname is required'
    })
        .min(2, {
            message: 'Surname must be at least 2 characters'
        })
        .max(12, {
            message: 'The surname must not have more than 12 characters.'
        })
    
})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });