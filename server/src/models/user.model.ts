import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
} from "../configs/env";

// --User schema--
const userSchema = new mongoose.Schema(
  {
    displayname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Instance method to compare password ---
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate JWT Access Token
userSchema.methods.getAccessToken = function (): string {
  return jwt.sign({ userId: this._id }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
  } as SignOptions);
};

// Instance method to generate JWT Refresh Token
userSchema.methods.getRefreshToken = function (): string {
  const refreshToken = jwt.sign({ userId: this._id }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  } as SignOptions);
  this.refreshToken = refreshToken;
  return refreshToken;
};

const User = mongoose.model("User", userSchema);
export default User;
