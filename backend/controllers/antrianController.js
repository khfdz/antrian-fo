const db = require("../config/db")

exports.tambahAntrian = async (req, res) => {
  try {
    const { departemen_id } = req.body;

    const [counter] = await db.query(
      "SELECT nomor_terakhir FROM antrian_counter WHERE id = ?",
      [departemen_id]
    );

    if (!counter || counter.length === 0) {
      return res.status(404).json({ error: "Departemen tidak ditemukan dalam antrian_counter" });
    }

    const nomorBaru = counter[0].nomor_terakhir + 1;

    await db.query(
      "UPDATE antrian_counter SET nomor_terakhir = ? WHERE id = ?",
      [nomorBaru, departemen_id]
    );

    const nomorAntrian = `${nomorBaru} ${departemen_id}`;

    await db.query(
      "INSERT INTO antrian (nomor_antrian, departemen_id) VALUES (?, ?)",
      [nomorAntrian, departemen_id]
    );

    res.status(201).json({ message: "Antrian berhasil ditambahkan", nomorAntrian });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.panggilAntrian = async (req, res) => {
  try {
    const { id } = req.params;
    const { loket_id } = req.body;
    
    if (!loket_id) {
      return res.status(400).json({ error: "Loket ID wajib diisi" });
    }
    
    const [loket] = await db.query("SELECT * FROM loket WHERE id = ?", [loket_id])

    if (!loket || loket.length === 0) {
      return res.status(404).json({ error: `Loket ID ${loket_id} tidak ditemukan`})
    }

    const [antrian] = await db.query("SELECT * FROM antrian WHERE id = ?", [id])

    if (!antrian || antrian.length === 0) {
      return res.status(404).json({ error: `Antrian ID ${id} tiddak ditemukan`})
    }

    await db.query(
      `UPDATE antrian SET status = "sudah dipanggil", loket_id = ? WHERE id = ?`,
      [loket_id, id]
    );

    res.status(200).json({ message: `Antrian ${antrian[0].nomor_antrian}, silahkan menuju ke loket ${loket[0].nama_loket}` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAntrian = async (req, res) => {
  try { 
    const [antrian] = await db.query(
      `SELECT
      a.id,
      a.nomor_antrian,
      a.status,
      a.created_at,
      1.nama_loket
    FROM antrian a
    LEFT JOIN loket 1 ON a.loket_id = 1.id
    ORDER BY a.created_at ASC`
    )
    res.status(200).json(antrian)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};