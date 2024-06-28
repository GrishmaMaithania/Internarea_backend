
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true }, // Optional, unique if present
  phoneNumber: { type: String, unique: true, sparse: true }, // Optional, unique if present
  ip: String,
  deviceInfo: {
    browser: String,
    os: String,
    device: String
  },
  loginHistory: [{
    loginTime: Date,
    ip: String,
    deviceInfo: {
      browser: String,
      os: String,
      device: String
    }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
