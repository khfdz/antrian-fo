const db = require("../config/db")

// exports.tambahLoket = async (req, res) => {
//   try {
//     const { nama_loket, departemen_id } = req.body
//     await db.query(
//       "INSERT INTO loket (nama_loket, departemen_id) VALUES (?, ?)",
//       [nama_loket, departemen_id]
//     )
//     res.status(201).json({ message: "Loket berhasil ditambahkan" })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

exports.tambahLoket = async (req, res) => {
  try {
    const { nama_loket, departemen_id } = req.body

    if (!nama_loket || !departemen_id) {
      return res.status(400).json({
        error: "Nama loket dan departemen_id wajib diisi",
      })
    }

    const [departemen] = await db.query(
      "SELECT * FROM departemen WHERE id = ?",
      [departemen_id]
    )
    if (departemen.length === 0) {
      return res.status(404).json({ error: "Departemen tidak ditemukan" })
    }

    await db.query(
      "INSERT INTO loket (nama_loket, departemen_id) VALUES (?, ?)",
      [nama_loket, departemen_id]
    )

    res.status(201).json({ message: "Loket berhasil ditambahkan" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllLoket = async (req, res) => {
  try {
    const [loket] = await db.query("SELECT * FROM loket")
    res.status(200).json(loket)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
