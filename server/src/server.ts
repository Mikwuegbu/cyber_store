import { NODE_ENV, PORT } from "./configs/env";
import connectDB from "./configs/db";
import app from "./app";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT} on ${NODE_ENV} mode`,
      );
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
