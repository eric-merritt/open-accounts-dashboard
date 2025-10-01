const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  territory: { type: String, required: true }
});

module.exports = model("User", userSchema);
