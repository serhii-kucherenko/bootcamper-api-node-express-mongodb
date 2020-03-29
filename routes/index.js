module.exports = app => {
  // Route files
  const bootcamps = require("./bootcamps");
  const courses = require("./courses");
  const auth = require("./auth");

  // Mount routers
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/bootcamps", bootcamps);
  app.use("/api/v1/courses", courses);
};
