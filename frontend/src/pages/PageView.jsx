import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PlayAntrian from "../components/PlayAntrian"

const PageView = () => {
  const [antrianAktif, setAntrianAktif] = useState({ nomor: "-", loket: "-" })
  const [dataAntrian, setDataAntrian] = useState([])
  const [antrianTerlewat, setAntrianTerlewat] = useState([
    { loket: "A", nomor: "A 3" },
    { loket: "B", nomor: "B 3" },
    { loket: "C", nomor: "C 3" },
    { loket: "D", nomor: "D 3" },
    { loket: "A", nomor: "A 3" },
    { loket: "B", nomor: "B 3" },
    { loket: "C", nomor: "C 3" },
    { loket: "D", nomor: "D 3" },
    { loket: "A", nomor: "A 3" },
    { loket: "B", nomor: "B 3" },
    { loket: "C", nomor: "C 3" },
    { loket: "D", nomor: "D 3" },
    { loket: "A", nomor: "A 3" },
    { loket: "B", nomor: "B 3" },
    { loket: "C", nomor: "C 3" },
    { loket: "D", nomor: "D 3" },
  ])
  const [indexTerlewat, setIndexTerlewat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexTerlewat((prev) => (prev + 5) % antrianTerlewat.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [antrianTerlewat])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [antrianRes, loketRes] = await Promise.all([
          axios.get("http://localhost:5555/api/antrian"),
          axios.get("http://localhost:5555/api/loket"),
        ])

        const semuaAntrian = antrianRes.data
        const semuaLoket = loketRes.data

        console.log("Semua Antrian:", semuaAntrian)
        console.log("Semua Loket:", semuaLoket)

        const sudahDipanggil = semuaAntrian
          .filter((item) => item.status === "sudah dipanggil")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        console.log("Antrian Sudah Dipanggil:", sudahDipanggil)

        if (sudahDipanggil.length > 0) {
          const aktif = sudahDipanggil[0]
          setAntrianAktif({
            nomor: aktif.nomor_antrian,
            loket: aktif.nama_loket || "-",
          })
          console.log("Antrian Aktif:", {
            nomor: aktif.nomor_antrian,
            loket: aktif.nama_loket || "-",
          })
        }

        const daftar = semuaLoket.map((loket) => {
          const ditemukan = sudahDipanggil.find(
            (a) => a.nama_loket === loket.nama_loket
          )
          return {
            loket: `Loket ${loket.nama_loket}`,
            antrian: ditemukan?.nomor_antrian || "-",
            color: warnaLoket(loket.nama_loket),
          }
        })

        console.log("Data Antrian Display:", daftar)

        setDataAntrian(daftar)
      } catch (err) {
        console.error("Gagal load data:", err)
      }
    }

    fetchData()
  }, [])

  const warnaLoket = (kode) => {
    const map = {
      A: "biru1",
      B: "biru1",
      C: "hijau1",
      D: "hijau1",
    }
    return map[kode] || "gray-500"
  }

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-slate-100 to-slate-200">
      <Navbar />

      <div className="flex gap-6 mt-[14vh] px-6 h-[50vh]">
        {/* Antrian Aktif */}
        <div className="w-[50vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Header biru */}
          <div className="bg-biru1 text-gray-100 text-4xl font-semibold py-3 px-4 text-center">
            Sedang Dipanggil
          </div>

          {/* Isi konten */}
          <div className="flex flex-col items-center text-center w-full px-4 py-6">
            {antrianAktif.nomor === "-" ? (
              <div className="text-[1.5rem] font-semibold text-gray-700">
                Belum ada antrian!
              </div>
            ) : (
              <>
                <h2 className="mt-6 text-5xl font-semibold text-gray-700 mb-2">
                  Nomor Antrian
                </h2>
                <div className="text-8xl font-extrabold text-blue-600 leading-none mb-4">
                  {antrianAktif.nomor}
                </div>
                <div className="text-5xl font-semibold text-gray-700 mb-2">
                  Silakan Menuju Ke
                </div>
                <div className="text-7xl font-extrabold text-blue-600 leading-none">
                  Loket {antrianAktif.loket}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Antrian Terlewat */}
        <div className="w-[50vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-red-500 text-gray-100 text-4xl font-semibold py-3 px-4 text-center">
            Antrian Terlewat
          </div>
          <div className=" mt-16 text-5xl flex flex-col text-center gap-2 text-2xl font-bold text-red-600">
            {antrianTerlewat.length === 0 ? (
              <span>-</span>
            ) : (
              antrianTerlewat
                .slice(indexTerlewat, indexTerlewat + 5)
                .map((item, index) => (
                  <div key={index}>
                    Loket {item.loket} : {item.nomor}
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Video Promo */}
        <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl">
          <video
            src="/video/promo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[50vh] object-cover rounded-2xl"
          />
        </div>
      </div>

      <div className="mt-4 px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataAntrian.map(({ loket, antrian, color }, index) => (
          <div
            key={index}
            className="rounded-xl shadow-lg ring-1 ring-gray-300 backdrop-blur-lg bg-white/70 overflow-hidden">
            <div
              className={`bg-${color} text-center text-white text-4xl font-semibold px-4 py-3`}>
              {loket}
            </div>
            <div className="text-center text-gray-800 font-bold text-8xl py-6">
              {antrian}
            </div>
          </div>
        ))}
      </div>

      <Footer />
      {/* <PlayAntrian /> */}
    </div>
  )
}

export default PageView
