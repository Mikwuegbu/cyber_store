// import { Request, Response, NextFunction } from "express";
// import AppError from "../utils/appError";
// import { Error as MongooseError } from "mongoose";
// import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

// interface CustomError extends Error {
//   statusCode?: number;
//   status?: string;
//   isOperational?: boolean;
//   code?: number; // For MongoDB duplicate key error (11000)
//   keyValue?: { [key: string]: string }; // For duplicate fields
//   path?: string; // For CastError
//   value?: string; // For CastError
//   errors?: Record<string, { message: string }>; // For Mongoose validation errors
// }

// const handleCastErrorDB = (err: MongooseError.CastError): AppError => {
//   const message = `Invalid ${err.path}: ${err.value}.`;
//   return new AppError(message, 400);
// };

// const handleDuplicateFieldsDB = (err: CustomError): AppError => {
//   const value = err.keyValue
//     ? err.keyValue.email || err.keyValue.username
//     : "unknown";
//   const message = `Duplicate field value: '${value}'. Please use another value!`;
//   return new AppError(message, 400);
// };

// const handleValidationErrorDB = (
//   err: MongooseError.ValidationError,
// ): AppError => {
//   const errors = Object.values(err.errors).map((el) => el.message);
//   const message = `Invalid input data. ${errors.join(". ")}`;
//   return new AppError(message, 400);
// };

// const handleJWTError = (): AppError =>
//   new AppError("Invalid token. Please log in again!", 401);

// const handleJWTExpiredError = (): AppError =>
//   new AppError("Your token has expired! Please log in again.", 401);

// const sendErrorDev = (err: CustomError, res: Response): void => {
//   res.status(err.statusCode || 500).json({
//     status: err.status || "error",
//     error: err,
//     message: err.message,
//     stack: err.stack,
//   });
// };

// const sendErrorProd = (err: CustomError, res: Response): void => {
//   if (err.isOperational) {
//     res.status(err.statusCode || 500).json({
//       status: err.status || "error",
//       message: err.message,
//     });
//   } else {
//     console.error("ERROR 💥", err);
//     res.status(500).json({
//       status: "error",
//       message: "Something went very wrong!",
//     });
//   }
// };

// const globalErrorHandler = (
//   err: CustomError,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   if (process.env.NODE_ENV === "development") {
//     sendErrorDev(err, res);
//   } else if (process.env.NODE_ENV === "production") {
//     let error: CustomError = { ...err };
//     error.message = err.message; // Ensure message is copied from original error

//     if (error.name === "CastError")
//       error = handleCastErrorDB(error as MongooseError.CastError);
//     if (error.code === 11000) error = handleDuplicateFieldsDB(error);
//     if (error.name === "ValidationError")
//       error = handleValidationErrorDB(error as MongooseError.ValidationError);
//     if (error.name === "JsonWebTokenError") error = handleJWTError();
//     if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

//     sendErrorProd(error, res);
//   }
// };

// export default globalErrorHandler;
