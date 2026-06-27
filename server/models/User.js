const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    address: {
      type: String,
      default: ''
    },

    memberSince: {
      type: Date,
      default: Date.now
    },

    tier: {
      type: String,
      default: 'Standard Member'
    },

    avatar: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);