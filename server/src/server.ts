import { NODE_ENV, PORT } from "./configs/env";
import connectDB from "./configs/db";
import app from "./app";
import { seedProducts } from "./data";

const startServer = async () => {
  try {
    await connectDB();
    // await seedProducts();

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
