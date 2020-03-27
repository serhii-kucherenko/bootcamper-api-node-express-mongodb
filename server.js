const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mone on port ${PORT}`
  );
});
