require("colors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const router = require("./routes/index");
const middlewares = require("./middleware/index");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Load middlewares
middlewares(app);

// Mount routers
router(app);

// Routes error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
