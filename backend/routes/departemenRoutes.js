const express = require("express")
const router = express.Router()
const {
  tambahDepartemen,
  getAllDepartemen,
} = require("../controllers/departemenController")

router.post("/", tambahDepartemen)
router.get("/", getAllDepartemen)

module.exports = router
