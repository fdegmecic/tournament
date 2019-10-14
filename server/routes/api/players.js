const express = require("express")
const router = express.Router()

// Load models
const Player = require("../../models/Players")

router.get("/", (req, res) => {
    Player.find()
      .then(player => res.json(player))
      .catch(err => res.status(404).json({ message: "No players where found" }))
  })

  module.exports = router