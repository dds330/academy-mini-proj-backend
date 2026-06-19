import { RequestHandler } from "express";
import { z, ZodSchema } from "zod";
import {ParsedQs} from "qs";

export function validateBody(schema: ZodSchema): RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }
        req.body = result.data; // replace body with validated, typed data
        next();
    };
} 

export function validateParams(schema: ZodSchema): RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({
            errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }
        next();
    };
}

export function validateQuery<T extends ZodSchema>(schema: T): RequestHandler<any, any, any, ParsedQs> {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            res.status(400).json({
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }
        res.locals.validatedQuery = result.data; // replace query with validated, typed data
        next();
    };
}
