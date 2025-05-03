import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlayAntrian from "../components/PlayAntrian";

const PageView = () => {
  const [antrianAktif, setAntrianAktif] = useState({ nomor: "-", loket: "-" });
  const [dataAntrian, setDataAntrian] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [antrianRes, loketRes] = await Promise.all([
          axios.get("http://localhost:5555/api/antrian"),
          axios.get("http://localhost:5555/api/loket"),
        ]);

        const semuaAntrian = antrianRes.data;
        const semuaLoket = loketRes.data;

        const sudahDipanggil = semuaAntrian
          .filter((item) => item.status === "sudah dipanggil")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        if (sudahDipanggil.length > 0) {
          const aktif = sudahDipanggil[0];
          setAntrianAktif({
              nomor: aktif.nomor_antrian,
              loket: aktif.nama_loket || "-",
            });
        }
        
        const daftar = semuaLoket.map((loket) => {
            const ditemukan = sudahDipanggil.find(
                (a) => a.nama_loket === loket.nama_loket
            );
            return {
                loket: `Loket ${loket.nama_loket}`,
                antrian: ditemukan?.nomor_antrian || "-",
                color: warnaLoket(loket.nama_loket),
            };
        });
        
        setDataAntrian(daftar);
    } catch (err) {
        console.error("Gagal load data:", err);
    }
};

    fetchData();
  }, []);

  const warnaLoket = (kode) => {
    const map = {
        A: "biru1",
        B: "biru1",
        C: "hijau1",
        D: "hijau1",
    };
    return map[kode] || "gray-500";
};

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-slate-100 to-slate-200">
      <Navbar />


      <div className="flex flex-row mt-[12vh] p-6 gap-6 flex-wrap">
        <div className="flex-1 bg-white shadow-2xl rounded-2xl w-[0vh] h-[45vh] flex items-center justify-center relative overflow-hidden px-6">
          <div className="z-10 flex flex-row items-center justify-center gap-6 text-center">
          <div className="flex flex-col items-center justify-center">
  {antrianAktif.nomor === "-" ? (
    <div className="text-[3rem] font-semibold text-gray-700 mt-4 text-center">
      Belum ada antrian yang dibuat !
    </div>
  ) : (
    <>
      <h2 className="text-4xl font-semibold text-gray-700">Nomor Antrian</h2>
      <div className="text-[7rem] font-extrabold text-blue-600 drop-shadow-lg leading-none">
        {antrianAktif.nomor}
      </div>
      <div className="text-4xl text-gray-700 font-medium mb-1">
        Silahkan Menuju Ke
      </div>
      <div className="text-[5rem] font-extrabold text-blue-600 drop-shadow-lg leading-none">
        Loket {antrianAktif.loket}
      </div>
    </>
  )}
</div>

          </div>
        </div>

        <div className="flex w-[full] h-[45vh] rounded-xl overflow-hidden shadow-2xl">
          <video
            src="/video/promo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataAntrian.map(({ loket, antrian, color }, index) => (
          <div
            key={index}
            className="rounded-xl shadow-lg ring-1 ring-gray-300 backdrop-blur-lg bg-white/70 overflow-hidden"
          >
            <div
              className={`bg-${color} text-center text-white text-4xl font-semibold px-4 py-3`}
            >
              {loket}
            </div>
            <div className="text-center text-gray-800 font-bold text-8xl py-6">
              {antrian}
            </div>
          </div>
        ))}
      </div>

      {/* <Footer /> */}
      <PlayAntrian />

    </div>
  );
};

export default PageView;
