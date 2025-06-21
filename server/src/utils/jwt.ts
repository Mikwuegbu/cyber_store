import { Response } from "express";
import { IUserSchema } from "../types/index";
import { NODE_ENV } from "../configs/env";

const fifteenMinutes = 1000 * 60 * 15;
const sevenDays = 1000 * 60 * 60 * 24 * 7;

export const createSendToken = (
  user: IUserSchema,
  statusCode: number,
  res: Response,
): void => {
  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();

  if (!res.cookie) return;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    signed: true,
    secure: NODE_ENV === "production",
    expires: new Date(Date.now() + fifteenMinutes),
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    signed: true,
    secure: NODE_ENV === "production",
    expires: new Date(Date.now() + sevenDays),
  });

  user.token = refreshToken;

  res.status(statusCode).json({
    status: "success",
    accessToken,
    refreshToken,
  });
};
