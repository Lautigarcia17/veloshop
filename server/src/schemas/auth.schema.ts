import z from 'zod'

export const registerSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    })
        .email({
            message: "Invalid email format"
        }),
    password: z.string({
        required_error: 'Password is required'
    })
        .min(6, {
            message: 'Password must be at least 6 characters'
        }),
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

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    })
        .email({
            message: "Invalid email format"
        }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
})