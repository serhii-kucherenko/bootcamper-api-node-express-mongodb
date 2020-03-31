const express = require("express");
const path = require("path");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

module.exports = app => {
  // Body parser
  app.use(express.json());

  // Cookie parser
  app.use(cookieParser());

  // Dev logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Sanitize data
  app.use(mongoSanitize());

  // File uploading
  app.use(fileupload());

  // Set static folder
  app.use(express.static(path.join(__dirname, "public")));
};
