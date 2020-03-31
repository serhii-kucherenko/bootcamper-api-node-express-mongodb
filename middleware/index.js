const express = require("express");
const path = require("path");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

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

  // Set security headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 600000, // 10 mins
      max: 100 // max amount of request per 'windowMs' time
    })
  );

  // Prevent http param pollution. For example: firstname=John&firstname=John -> ['John', 'John']
  app.use(hpp());

  // Enable CORS protection
  app.use(cors());

  // File uploading
  app.use(fileupload());

  // Set static folder
  app.use(express.static("public"));
};
