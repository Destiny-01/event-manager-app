const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["business", "casual", "party", "general"],
    required: true,
  },
});
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
