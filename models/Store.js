const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a store name"],
      trim: true,
      enum: {
        values: [
          "dhaka",
          "chattogram",
          "rajshahi",
          "khulna",
          "rangpur",
          "barisal",
        ],
        message: "{VALUE} is not found",
      },
      lowercase: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);
const Store = mongoose.Model("Store", storeSchema);

exports = Store;
