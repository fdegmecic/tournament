
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create schema
const MatchSchema = new Schema({
  playerOneId: {
    type:  Schema.Types.ObjectId, ref:'Players',
    required: true
  },
  playerTwoId: {
    type:  Schema.Types.ObjectId, ref:'Players',
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