const express = require("express")
const router = express.Router()
const {
  tambahAntrian,
  getAntrian,
  panggilAntrian,
} = require("../controllers/antrianController")

router.post("/tambah", tambahAntrian)
router.get("/", getAntrian)
router.put("/panggil/:id", panggilAntrian)

module.exports = router
