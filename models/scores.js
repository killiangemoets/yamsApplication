var mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  score: {
    type: String,
    required: [true],
  },
});

var scoreModel = mongoose.model("scores", scoreSchema);

module.exports = scoreModel;
