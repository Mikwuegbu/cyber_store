import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch_async";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "../services/email.service";
import AppError from "../utils/app_error";
import {
  connectRedis,
  deleteTempData,
  generateOtp,
  getTempData,
  ItempData,
  saveTempData,
} from "../utils/generateOTP";
import { createSendToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env";

// register user
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { displayname, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(StatusCodes.CONFLICT).json({
        status: "error",
        message: "User already exists",
      });
      return next();
    }

    const otp = generateOtp();
    await connectRedis();
    await saveTempData({
      displayname,
      email,
      password,
      otp,
    });

    try {
      await sendEmail({
        email: email,
        subject: "Email Verification OTP",
        message: `<div style="max-width: 600px; margin:auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 40px 30px; font-family: 'Arial', sans-serif;">
        <h2 style="text-align: center; color: #333333; font-size: 24px; margin-bottom: 30px;">Welcome to Cyber Store</h2>
        <p style="color: #666666; line-height: 1.6;">Hello ${displayname},</p>
        <p style="color: #666666; line-height: 1.6;">Please use the following verification code to complete your registration. This code will expire in 5 minutes.</p>
        <div style="background: #f8f9fa; border-radius: 6px; text-align: center; padding: 20px; margin: 30px 0; letter-spacing: 6px; font-size: 32px; font-weight: bold; color: #333333;">${otp}</div>
        <p style="color: #666666; line-height: 1.6; margin-bottom: 0;">Best regards,</p>
        <p style="color: #666666; line-height: 1.6; margin-top: 5px;">The Cyber Store Team</p>
        </div>`,
      });

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "OTP sent to your email for verification.",
      });
    } catch (err: any) {
      console.log(err);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "There was an error sending the email. Try again later!",
      });
    }
  },
);

// verify OTP
export const verifyEmail = catchAsync(async (req, res, next) => {
  const { email, token } = req.body;

  const tempData = await getTempData(email);
  if (!tempData) {
    return next(
      new AppError(
        "Something happened, please retry again",
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }

  const data: ItempData = JSON.parse(tempData);

  if (!tempData || data.otp !== token) {
    return next(
      new AppError("Invalid or expired OTP.", StatusCodes.BAD_REQUEST),
    );
  }

  await User.create({
    email: data.email,
    displayname: data.displayname,
    password: data.password,
    isVerified: true,
  });
  await deleteTempData(email);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Email verified successfully.",
  });
});

// login user
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(
        new AppError("Incorrect email or password", StatusCodes.UNAUTHORIZED),
      );
    }

    createSendToken(user, 200, res);
    await user.save();
  },
);

// refresh user token
export const refreshAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.signedCookies;

    if (!refreshToken) {
      return next(new AppError("Refresh token is required.", 400));
    }

    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
        userId: string;
      };
      const user = await User.findById(decoded.userId);

      if (!user || user.token !== refreshToken) {
        return next(new AppError("Invalid refresh token.", 401));
      }

      createSendToken(user, 200, res);
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "failed",
        message: "Invalid Token!",
      });
    }
  },
);
