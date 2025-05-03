const express = require("express")
const router = express.Router()
const {
  tambahAntrian,
  getAllAntrian,
  panggilAntrian,
  resetAntrian
} = require("../controllers/antrianController")

router.post("/tambah", tambahAntrian)
router.get("/", getAllAntrian)
router.post("/panggil/:id", panggilAntrian)
router.post("/reset", resetAntrian)

module.exports = router
