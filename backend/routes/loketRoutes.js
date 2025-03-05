const express = require("express")
const router = express.Router()
const { tambahLoket, getAllLoket } = require("../controllers/loketController")

router.post("/", tambahLoket)
router.get("/", getAllLoket)

module.exports = router
