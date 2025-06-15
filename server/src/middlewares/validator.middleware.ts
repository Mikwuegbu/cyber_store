import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";
import { StatusCodes } from "http-status-codes";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        errors: result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    next();
  };
};
