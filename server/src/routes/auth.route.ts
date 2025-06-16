import { Router } from "express";
import { register, verifyEmail } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { registerSchema, verifySchema } from "../utils/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/verify-email", validate(verifySchema), verifyEmail);

export default router;
