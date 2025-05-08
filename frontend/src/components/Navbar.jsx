import { useState, useEffect } from "react"
import logo from "../../public/image/logoPanjangAlamat.png"

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Update time and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Gagal memasuki mode fullscreen:", err)
      })
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Gagal keluar dari fullscreen:", err)
      })
    }
  }

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Set to true for 12-hour format
    }
    return date.toLocaleDateString("id-ID", options).replace("pukul", "").trim()
  }

  return (
    <nav className="bg-hijau1 border-gray-200 shadow-xl fixed top-0 w-full z-10">
      <div className="container flex flex-wrap justify-between items-center">
        <a href="/" className="flex items-center">
          <img src={logo} className="h-[11vh] mr-3 bg-white p-2" alt="Logo" />
        </a>

        <div className="flex flex-grow justify-center">
          <button
            onClick={handleFullscreen}
            className="bg-hijau1 text-hijau1 p-2 hover:bg-biru1 hover:text-white rounded-md">
            {document.fullscreenElement ? "Keluar dari Fullscreen" : "Full"}
          </button>
        </div>

        {/* Right aligned div with date and time separation */}
        <div className="flex items-center space-x-4 text-white text-3xl absolute right-0 p-5">
          <div className="flex flex-col items-end">
            <span>
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div className="flex mt-2 space-x-2">
              {new Date()
                .toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
                .split(":")
                .map((val, index) => (
                  <div
                    key={index}
                    className="bg-white text-hijau1 px-3 py-1 rounded-md font-mono">
                    {val}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
