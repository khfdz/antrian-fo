const db = require("../config/db")

exports.tambahDepartemen = async (req, res) => {
  try {
    const { id, nama_departemen } = req.body

    await db.query(
      "INSERT INTO departemen (id, nama_departemen) VALUES (?, ?)",
      [id, nama_departemen]
    )

    await db.query(
      "INSERT INTO antrian_counter (id, nomor_terakhir) VALUES (?, 0)",
      [id]
    )

    res.status(201).json({ message: "Departemen berhasil ditambahkan" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllDepartemen = async (req, res) => {
  try {
    const [departemen] = await db.query("SELECT * FROM departemen")
    res.status(200).json(departemen)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
