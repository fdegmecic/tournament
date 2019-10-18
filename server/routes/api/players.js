const express = require("express")
const router = express.Router()
// Load models
const Player = require("../../models/Players")

router.get("/", (req, res) => {
    Player.find()
      .then(player => res.json(player))
      .catch(err => res.status(404).json({ message: "No players found" }))
  })

router.post("/", (req, res) => {
    Player.findOne({ name: req.body.name })
      .then(player => {
        if (player) {
          return res.status(400).json({ message: "Player already exists" })
        } else {
          const newPlayer = new Player(req.body)
          newPlayer.save()
            .then(newPlayer => res.json(newPlayer))
            .catch(err => res.json(err))
        }
      })
      .catch(err => res.json(err))
  })

router.patch("/:id", (req, res) => {
    Player.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(player => {
        if (!player) {
          return res.status(404).json({ message: "Player to update not found" });
        } else {
          return res.json(player)
        }
      })
      .catch(err => console.log(err));
  
  })
  
module.exports = router