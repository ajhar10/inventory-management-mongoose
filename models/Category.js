const mongoose = require("mongoose");
const validator = require("validator");
// const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Provide a unique name"],
      maxLength: [30, "Name is too large"],
      lowercase: true,
    },
    description: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please Provide a valid url"],
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);

exports = Category;
