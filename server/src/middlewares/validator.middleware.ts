import { NextFunction, Request, Response } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export function validateSchema(schema: ZodSchema) {
    return function (req: Request, res: Response, next: NextFunction): void {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    code: "VALIDATION_ERROR",
                    errors: error.errors.map((err) => ({
                        field: err.path.join("."), 
                        message: err.message, 
                    })),
                });
            } else {
                res.status(500).json({
                    code: "INTERNAL_SERVER_ERROR",
                    message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR,
                });
            }
        }
    };
}

export function validatePartialSchema(schema: ZodSchema) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            if (schema instanceof z.ZodObject) {
                const result = schema.partial().safeParse(req.body);
                console.log(result)
                if (!result.success) {
                    return res.status(400).json({
                        message: result.error.errors.map((err) => err.message),
                    });
                }
                next();
            }
            else {
                return res.status(400).json({ message: 'Invalid schema type' });
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
            return res.status(500).json({
                message: 'An unexpected error occurred',
            });
        }
    }
}
