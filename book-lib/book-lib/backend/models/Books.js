const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      enum: ["Fiction", "Non-fiction", "History"], // predefined values
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date(); // not in future
        },
        message: "Published date cannot be in the future",
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
