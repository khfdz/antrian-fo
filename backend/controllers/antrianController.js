const db = require("../config/db")

exports.tambahAntrian = async (req, res) => {
  try {
    const { departemen_id, loket_id } = req.body

    const [counter] = await db.query(
      "SELECT nomor_terakhir FROM antrian_counter WHERE id = ?",
      [departemen_id]
    )
    const nomorBaru = counter[0].nomor_terakhir + 1

    await db.query(
      "UPDATE antrian_counter SET nomor_terakhir = ? WHERE id = ?",
      [nomorBaru, departemen_id]
    )

    const nommorAntrian = `${departemen_id} ${nomorBaru}`

    await db.query(
      "INSERT INTO antrian (nomor_antrian, departemen_id, loket_id) VALUES (?, ?, ?)",
      [nommorAntrian, departemen_id, loket_id]
    )

    res
      .status(201)
      .json({ message: "Antrian berhasil ditambahkan", nommorAntrian })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.panggilANtrian = async (req, res) => {
  try {
    const { id } = req.params
    await db.query(
      'UPDATE antrian SET status = "sudah dipanggil" WHERE id = ?',
      [id]
    )
    res
      .status(200)
      .json({ message: "Antrian No " + id + " berhasil dipanggil" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAntrian = async (req, res) => {
  try {
    const [antrian] = await db.query("SELECT * FROM antrian")
    res.status(200).json(antrian)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
