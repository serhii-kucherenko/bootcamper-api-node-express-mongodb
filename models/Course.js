const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please, add a course title"]
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please, add a course description"]
  },
  weeks: {
    type: String,
    trim: true,
    required: [true, "Please, add a number of weeks"]
  },
  tuition: {
    type: Number,
    trim: true,
    required: [true, "Please, add a tuition cost"]
  },
  minimumSkill: {
    type: String,
    trim: true,
    required: [true, "Please, add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarshipAvaiable: {
    type: Boolean,
    defautl: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

// Static method to get average of course tuitions
CourseSchema.statics.getAverageCost = async function(bootcampId) {
  const obj = await this.aggregate([
    {
      $match: {
        bootcamp: bootcampId
      }
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" }
      }
    }
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (ex) {
    console.error(ex);
  }
};

// Call getAverageCost after save
CourseSchema.post("save", function() {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before save
CourseSchema.pre("remove", function() {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);
