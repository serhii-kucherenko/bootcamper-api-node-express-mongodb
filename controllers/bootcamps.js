// @decs    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.send({ success: true, msg: "Send all bootcamps" });
};

// @decs    Get single bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.send({ success: true, msg: `Display bootcamp with id ${req.params.id}` });
};

// @decs    Create new bootcamp
// @route   POST /api/v1/bootcamp/:id
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.send({ success: true, msg: "Create new bootcamp" });
};

// @decs    Update bootcamp
// @route   PUT /api/v1/bootcamp/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.send({ success: true, msg: `Update bootcamp with id ${req.params.id}` });
};

// @decs    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.send({ success: true, msg: `Delete bootcamp with id ${req.params.id}` });
};
