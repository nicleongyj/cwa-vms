import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const withRequestBodyValidation =
    (bodySchema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const result = bodySchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ error: result.error.errors });
            return;
        }
        next();
    };

export const withRequestParamsValidation =
    (querySchema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const result = querySchema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({ error: result.error.errors });
            return;
        }
        next();
    };
