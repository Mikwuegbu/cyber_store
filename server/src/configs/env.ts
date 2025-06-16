import "dotenv/config";

export const PORT = process.env.PORT ?? 5000;
export const MONGO_URI = process.env.MONGO_URI!;
export const NODE_ENV = process.env.NODE_ENV ?? "development";

export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_ACCESS_TOKEN_EXPIRES_IN =
  process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!;
export const JWT_REFRESH_TOKEN_EXPIRES_IN =
  process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_SERVICE = process.env.SMTP_SERVICE;
export const SMTP_PASS = process.env.SMTP_PASS;
