import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues
      });
    }

    // overwrite req.body with validated data
    req.body = result.data;

    next();
  };
};