
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create schema
const TournamentSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Tournament = mongoose.model("tournaments", TournamentSchema)