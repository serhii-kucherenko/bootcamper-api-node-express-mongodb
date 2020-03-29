const express = require("express");
const path = require("path");
const morgan = require("morgan");
const fileupload = require("express-fileupload");

module.exports = app => {
  // Body Parser
  app.use(express.json());

  // Dev logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // File uploading
  app.use(fileupload());

  // Set static folder
  app.use(express.static(path.join(__dirname, "public")));
};
