
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create schema
const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  wins: {
    type: Number,
    required: true
  }
})

module.exports = Player = mongoose.model("players", PlayerSchema)