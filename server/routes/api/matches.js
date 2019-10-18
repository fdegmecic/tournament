const express = require("express")
const router = express.Router()
// Load models
const Match = require("../../models/Matches")

router.get("/", (req, res) => {
    Match.find()
      .then(match => res.json(match))
      .catch(err => res.status(404).json({ message: "No matches found" }))
  })

router.post("/", (req, res) => {
    Match.findOne({ name: req.body.name })
      .then(match => {
          const newMatch = new Match(req.body)
            newMatch.save()
            .then(newMatch => res.json(newMatch))
            .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  })

  router.patch("/:id", (req, res) => {
    Match.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(match => {
        if (!match) {
          return res.status(404).json({ message: "Match to update not found" });
        } else {
          return res.json(match)
        }
      })
      .catch(err => console.log(err));
  
  })

module.exports = router