const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    url: String,

    points: {
      type: Number,
      default: 0,
    },

    author: String,

    postedAt: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);