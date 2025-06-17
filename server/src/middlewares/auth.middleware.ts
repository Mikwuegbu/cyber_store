import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import AppError from "../utils/app_error";
import catchAsync from "../utils/catch_async";
import { StatusCodes } from "http-status-codes";
import { JWT_SECRET } from "../configs/env";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role?: string;
      };
    }
  }
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //  Get token from cookie
    let token: string | undefined;
    if (req.signedCookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in! Please log in to get access.",
          StatusCodes.UNAUTHORIZED,
        ),
      );
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return next(
          new AppError(
            "Invalid token. Please log in again!",
            StatusCodes.UNAUTHORIZED,
          ),
        );
      }
      if (err.name === "TokenExpiredError") {
        return next(
          new AppError(
            "Your token has expired! Please log in again.",
            StatusCodes.UNAUTHORIZED,
          ),
        );
      }
      return next(
        new AppError("Authentication failed.", StatusCodes.UNAUTHORIZED),
      );
    }

    // Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token no longer exists.",
          StatusCodes.NOT_FOUND,
        ),
      );
    }

    // 4) Grant access to protected route
    req.user = {
      userId: currentUser._id.toString(),
    };
    next();
  },
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role ?? "")) {
      // Check role
      return next(
        new AppError(
          "You do not have permission to perform this action",
          StatusCodes.FORBIDDEN,
        ),
      );
    }
    next();
  };
};
