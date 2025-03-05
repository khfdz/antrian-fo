import { useState } from "react"

function App() {
  const [nomorAntrian, setNomorAntrian] = useState("")
  const [loket, setLoket] = useState("")

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const playAudio = async () => {
    // Memutar bel terlebih dahulu
    const bell = new Audio("/bell.mp3")
    await bell.play()

    // Menunggu 1 detik setelah bel selesai
    await delay(1000)

    // Memisahkan huruf dan angka di nomor antrian
    const nomorTerformat = nomorAntrian.replace(/(\D)(\d+)/, "$1 $2")

    // Menyebutkan "Antrian nomor B 5"
    const speech1 = new SpeechSynthesisUtterance(
      `Antrian nomor ${nomorTerformat}`
    )
    speech1.lang = "id-ID"

    window.speechSynthesis.speak(speech1)
    await new Promise((resolve) => (speech1.onend = resolve))

    // Menunggu 1 detik sebelum melanjutkan
    await delay(100)

    // Menyebutkan "Silakan ke loket 2"
    const speech2 = new SpeechSynthesisUtterance(`Silakan ke loket ${loket}`)
    speech2.lang = "id-ID"

    window.speechSynthesis.speak(speech2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nomorAntrian && loket) {
      playAudio()
    }
  }

  return (
    <div className="container">
      <h1>Antrian Pemanggilan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nomor Antrian: </label>
          <input
            type="text"
            value={nomorAntrian}
            onChange={(e) => setNomorAntrian(e.target.value.toUpperCase())}
            placeholder="Contoh: B5"
            required
          />
        </div>

        <div>
          <label>Loket: </label>
          <input
            type="text"
            value={loket}
            onChange={(e) => setLoket(e.target.value)}
            placeholder="Contoh: 2"
            required
          />
        </div>

        <button type="submit">Panggil Antrian</button>
      </form>
    </div>
  )
}

export default App
g
