
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create schema
const PlayerSchema = new Schema({
  _id:{
    type:Schema.Types.ObjectId,
    required:true
  },
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