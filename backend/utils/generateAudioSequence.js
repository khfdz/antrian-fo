const audioConfig = require("../data/dataAudio.json");

function generateAudioSequence(nomor_antrian, nama_loket) {
    const audioSequence = [];

    audioSequence.push(makeAudio("/audio/bell.mp3"));
    audioSequence.push(makeAudio("/audio/antrian.mp3"));

    let angka, huruf;
    let match = nomor_antrian.match(/^(\d+)\s*([A-Z])$/i);
    if (match) {
        angka = parseInt(match[1]);
        huruf = match[2].toUpperCase();
    } else {
        match = nomor_antrian.match(/^([A-Z])\s*(\d+)$/i);
        if (match) {
            huruf = match[1].toUpperCase();
            angka = parseInt(match[2]);
        } else {
            return [];
        }
    }

    const angkaAudio = convertNumberToAudio(angka);
    audioSequence.push(...angkaAudio);

    // Tambahkan huruf dan tujuan loket
    audioSequence.push(makeAudio(`/audio/${huruf}.mp3`));
    audioSequence.push(makeAudio("/audio/silahkan_menuju_ke_loket.mp3"));
    audioSequence.push(makeAudio(`/audio/${nama_loket.toUpperCase()}.mp3`));

    return audioSequence;
}

function convertNumberToAudio(number) {
    const audioParts = [];

    const audioPath = `/audio/antrian_${number}.mp3`;

    if (audioConfig[audioPath]) {
        // Langsung pakai file audio jika tersedia
        audioParts.push(makeAudio(audioPath));
    } else {
        // Fallback jika audio tidak tersedia
        console.warn(`Audio untuk antrian_${number}.mp3 tidak tersedia.`);
    }

    return audioParts;
}

function makeAudio(path) {
    const config = audioConfig[path] || {};
    return {
        path,
        playbackRate: config.playbackRate || 1,
        delay: config.delay || 0,
        spokenPercent: config.spokenPercent || 0
    };
}

module.exports = {
    generateAudioSequence
};
