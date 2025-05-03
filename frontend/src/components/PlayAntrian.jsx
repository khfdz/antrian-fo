import { useState } from "react";
import axios from "axios";

const PlayAntrian = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [loketId, setLoketId] = useState("");

  const playAudioSequence = async () => {
    if (!id || !loketId || isNaN(id) || isNaN(loketId)) {
      alert("ID Antrian dan Loket harus berupa angka!");
      return;
    }

    try {
      setIsPlaying(true);
      const response = await axios.post(
        `http://localhost:5555/api/antrian/panggil/${id}`,
        { loket_id: parseInt(loketId) }
      );

      const { audioSequence, message } = response.data;
      setMessage(message);

      for (const audio of audioSequence) {
        await playAudioWithTrimming(audio);
      }

      setIsPlaying(false);
    } catch (error) {
      console.error("Gagal memutar audio:", error);
      alert("Gagal memutar antrian: " + error.message);
      setIsPlaying(false);
    }
  };

  const playAudioWithTrimming = ({ path, playbackRate = 1, delay = 0, spokenPercent = 1 }) => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
      fetch(path)
        .then(res => res.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(audioBuffer => {
          const duration = audioBuffer.duration;
          const playTime = duration * (spokenPercent > 0 ? spokenPercent : 1);
  
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.playbackRate.value = playbackRate;
          source.connect(audioContext.destination);
  
          const now = audioContext.currentTime;
          source.start(now);
          source.stop(now + playTime);
  
          source.onended = () => {
            if (delay > 0) {
              setTimeout(resolve, delay);
            } else {
              resolve();
            }
          };
        })
        .catch(reject);
    });
  };
  

  return (
    <div className="my-6 p-4 bg-white shadow rounded-xl w-full max-w-xl mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">ID Antrian:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Contoh: 1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">ID Loket:</label>
        <input
          type="number"
          value={loketId}
          onChange={(e) => setLoketId(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Contoh: 3"
        />
      </div>

      <button
        onClick={playAudioSequence}
        disabled={isPlaying}
        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {isPlaying ? "Memutar..." : "Panggil Antrian"}
      </button>

      {message && (
        <div className="mt-4 text-center text-lg text-gray-700 font-medium">{message}</div>
      )}
    </div>
  );
};

export default PlayAntrian;
