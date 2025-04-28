const db = require("../config/db")

exports.tambahLoket = async (req, res) => {
  try {
    const { id, nama_loket } = req.body;

    if (!id || !nama_loket) {
      return res.status(400).json({
        error: "ID dan nama_loket wajib diisi",
      });
    }

    await db.query(
      "INSERT INTO loket (id, nama_loket) VALUES (?, ?)",
      [id, nama_loket]
    );

    res.status(201).json({ message: "Loket berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllLoket = async (req, res) => {
  try {
    const [loket] = await db.query("SELECT * FROM loket")
    res.status(200).json(loket)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
