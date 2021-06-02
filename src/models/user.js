const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["regular", "admin"],
    default: "regular",
  },
});

module.exports = mongoose.model("User", userSchema);
