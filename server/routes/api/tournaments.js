const express = require("express")
const router = express.Router()
// Load models
const Tournament = require("../../models/Tournaments")

router.get("/", (req, res) => {
    Tournament.find()
      .then(tournament => res.json(tournament))
      .catch(err => res.status(404).json({ message: "No players found" }))
    })
router.post("/", (req, res) => {
    Tournament.findOne({ name: req.body.name })
        .then(tournament => {
        if (tournament) {
              return res.status(400).json({ message: "Player already exists" })
            } else {
              const newTournament = new Tournament(req.body)
                newTournament.save()
                .then(newTournament => res.json(newTournament))
                .catch(err => res.json(err))
            }
        })
        .catch(err => res.json(err))
    })

module.exports = router