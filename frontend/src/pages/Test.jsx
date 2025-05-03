import { useState } from "react";

const TestAudioPage = () => {
  // Hardcoded mapping dari label ke file audio
  const audioMap = {
    bell: "/audio/bell.mp3",
    antrian_5: "/audio/antrian_5.mp3",
    A: "/audio/A.mp3",

    silahkan_menuju_ke_loket_a: "/audio/silahkan_menuju_ke_loket_a.mp3"
  };

  // Fungsi untuk memutar berurutan
  const playAudioSequence = (sequence) => {
    if (!sequence.length) return;

    let index = 0;
    const audio = new Audio(audioMap[sequence[index]]);
    audio.play();

    audio.addEventListener("ended", () => {
      index++;
      if (index < sequence.length) {
        audio.src = audioMap[sequence[index]];
        audio.play();
      }
    });
  };

  const handlePlay = () => {
    const sequence = [
      "bell",
      "antrian_5",
   
      "A",
      "silahkan_menuju_ke_loket_a"
    ];
    playAudioSequence(sequence);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Pemanggilan Antrian</h1>
      <button
        onClick={handlePlay}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Panggil Antrian 15 ke Loket A
      </button>
    </div>
  );
};

export default TestAudioPage;
