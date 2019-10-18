
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
  },
  tournament:{
    type: Schema.Types.ObjectId, ref:'Tournaments',
    required:true 
  }
})

module.exports = Match = mongoose.model("matches", MatchSchema)