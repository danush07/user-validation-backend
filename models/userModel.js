const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    mobile: {
      type: Number,
      unique: true,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    state: {
      type: Array,
    },
    city: {
      type: Array,
    },
    country: {
      type: Array,
    },
    zipcode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
