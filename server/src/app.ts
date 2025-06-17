import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import { COOKIE_SECRET } from "./configs/env";

// Express app
const app = express();
// dev logger
app.use(morgan("dev"));

// cors
app.use(cors());
app.use(cookieParser(COOKIE_SECRET));

// data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// body parser
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.get("/api/v1", (req, res) => {
  res.send("server is running");
});

export default app;
