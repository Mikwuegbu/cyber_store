import { createClient } from "redis";
import crypto from "crypto";
import { REDIS_HOST, REDIS_PASS, REDIS_PORT } from "../configs/env";

const OTP_EXPIRY = 300; // 5 minutes in seconds

const redisClient = createClient({
  username: "default",
  password: REDIS_PASS,
  socket: {
    host: REDIS_HOST!,
    port: Number(REDIS_PORT),
  },
});

export const connectRedis = async () => {
  await redisClient.connect().catch((err) => {
    console.error("Redis connection error:", err);
  });
};

export const generateOtp = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

export const saveOtp = async (email: string, otp: string) => {
  await redisClient.setEx(`otp:${email}`, OTP_EXPIRY, otp);
};

export const getOtp = async (email: string) => {
  return await redisClient.get(`otp:${email}`);
};

export const deleteOTP = async (email: string) => {
  await redisClient.del(`otp:${email}`);
};
