
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create schema
const MatchSchema = new Schema({
  playerOne: {
    type: String,
    required: true
  },
  playerTwo: {
    type: String,
    required: true
  },
  result: {
    type: Number,
    required: true
  }
})

module.exports = Match = mongoose.model("matches", MatchSchema)