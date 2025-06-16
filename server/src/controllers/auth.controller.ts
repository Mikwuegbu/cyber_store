import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch_async";
import crypto from "crypto";
import User from "../models/user.model";

import { StatusCodes } from "http-status-codes";
import { createClient } from "redis";
import { sendEmail } from "../services/email.service";
import AppError from "../utils/app_error";

const OTP_EXPIRY = 300; // 5 minutes in seconds

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});
const connectRedis = async () => {
  await redisClient.connect().catch((err) => {
    console.error("Redis connection error:", err);
  });
};
connectRedis();

const saveOtp = async (email: string, otp: string) => {
  await redisClient.setEx(`otp:${email}`, OTP_EXPIRY, otp);
};

export const generateOtp = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

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
    await saveOtp(email, otp);

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

      await User.create({
        displayname,
        email,
        password,
      });
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "OTP sent to your email for verification.",
      });
    } catch (err: any) {
      await User.findOneAndDelete({ email });
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

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found.", StatusCodes.NOT_FOUND));
  }

  const storedToken = await redisClient.get(`otp:${email}`);

  if (!storedToken || storedToken !== token) {
    return next(
      new AppError("Invalid or expired OTP.", StatusCodes.BAD_REQUEST),
    );
  }
  await redisClient.del(`otp:${email}`);

  user.isVerified = true;
  await user.save({ validateBeforeSave: false }); // Bypass password pre-save hook if not modified

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Email verified successfully.",
  });

  // createSendToken(user, 200, res); // Log in the user after verification
});
