const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {  
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
