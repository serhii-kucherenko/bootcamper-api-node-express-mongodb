const Bootcamp = require("../models/Bootcamp");

// @decs    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      data: bootcamps,
      count: bootcamps.length
    });
  } catch (ex) {
    res.status(400).json({
      success: false
    });
  }
};

// @decs    Get single bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (bootcamp) {
      res.status(200).json({
        success: true,
        data: bootcamp
      });
    } else {
      res.status(404).json({
        success: false
      });
    }
  } catch (ex) {
    res.status(400).json({
      success: false
    });
  }
};

// @decs    Create new bootcamp
// @route   POST /api/v1/bootcamp/:id
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (ex) {
    res.status(400).json({
      success: false
    });
  }
};

// @decs    Update bootcamp
// @route   PUT /api/v1/bootcamp/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (bootcamp) {
      res.status(200).json({
        success: true,
        data: bootcamp
      });
    } else {
      res.status(404).json({
        success: false
      });
    }
  } catch (ex) {
    res.status(400).json({
      success: false
    });
  }
};

// @decs    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (bootcamp) {
      res.status(200).json({
        success: true,
        data: bootcamp
      });
    } else {
      res.status(404).json({
        success: false
      });
    }
  } catch (ex) {
    res.status(400).json({
      success: false
    });
  }
};
