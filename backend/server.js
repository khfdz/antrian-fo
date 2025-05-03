const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const departemenRoutes = require("./routes/departemenRoutes");
const antrianRoutes = require("./routes/antrianRoutes");
const loketRoutes = require("./routes/loketRoutes");

app.use("/api/departemen", departemenRoutes);
app.use("/api/antrian", antrianRoutes);
app.use("/api/loket", loketRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
