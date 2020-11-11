const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  hash: String,
  salt: String,
  createdAt: { type: Date, default: Date.now },
});

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("User", UserSchema);
