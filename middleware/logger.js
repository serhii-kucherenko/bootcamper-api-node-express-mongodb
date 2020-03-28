// @desc    Logs request to console
const logger = (req, res, next) => {
  const { method, protocol, originalUrl } = req;
  console.log(`${method} ${protocol}://${req.get("host")}${originalUrl}`);

  next();
};

module.exports = logger;
