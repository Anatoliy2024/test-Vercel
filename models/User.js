const { Schema, model } = require("mongoose")

const User = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  iat: { type: Number },
  exp: { type: Number },
  avatar: { type: String },
  // socketId: { type: String },
})

module.exports = model("User", User)
