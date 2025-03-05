const express = require("express")
const router = express.Router()
const {
  tambahAntrian,
  getAntrian,
  panggilANtrian,
} = require("../controllers/antrianController")

router.post("/", tambahAntrian)
router.get("/", getAntrian)
router.post("/:id", panggilANtrian)

module.exports = router
