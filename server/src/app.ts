import express from "express";
import morgan from "morgan";
import cors from "cors";

// Express app
const app = express();

// dev logger
app.use(morgan("dev"));

// cors
app.use(cors());

// body parser
app.use(express.json());

export default app;
