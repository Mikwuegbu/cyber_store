import { Router } from "express";
import {
  login,
  refreshAccessToken,
  register,
  verifyEmail,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  loginSchema,
  registerSchema,
  verifySchema,
} from "../utils/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/verify-email", validate(verifySchema), verifyEmail);
router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshAccessToken);

export default router;
