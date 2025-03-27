import z from 'zod'


export const expenseSchema = z.object({
    expense_name: z
        .string({required_error: 'Expense name is required'})
        .min(1,{message: 'Expense name cannot be empty'})
        .max(20, {message: 'Expense name must be 100 characters or less'}),
    date: z.date({   
        required_error: 'Date is required',
        invalid_type_error: 'Invalid date format',
    }).default(()=> new Date()),
    note: z
        .string()
        .max(300, { message: 'Note must be 300 characters or less'})
        .optional(),
    recurrence: z
        .preprocess( (val) => (typeof val === 'string' ? val.toLowerCase() : val),
            z.enum(['weekly', 'monthly', 'yearly', 'one-time'], {
                required_error: 'Recurrence is required',
                invalid_type_error: 'Recurrence must be a string',
                })
    ),
    amount: z
        .number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
        .positive({message: 'Amount must be positive'})
        .max(100_000_000,'Amount must be less than 1,000,000')
})