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
    audioSequence.push(makeAudio(`/audio/${huruf}.mp3`));
    audioSequence.push(makeAudio("/audio/silahkan_menuju_ke_loket.mp3"));
    audioSequence.push(makeAudio(`/audio/${nama_loket.toUpperCase()}.mp3`));

    return audioSequence;
}

function convertNumberToAudio(number) {
    const audioParts = [];

    if (number <= 11) {
        audioParts.push(makeAudio(`/audio/${number}.mp3`));
    } else if (number < 20) {
        audioParts.push(makeAudio(`/audio/${number % 10}.mp3`));
        audioParts.push(makeAudio("/audio/belas.mp3"));
    } else if (number < 100) {
        const puluhan = Math.floor(number / 10);
        const satuan = number % 10;
        audioParts.push(makeAudio(`/audio/${puluhan}.mp3`));
        audioParts.push(makeAudio("/audio/puluh.mp3"));
        if (satuan > 0) {
            audioParts.push(makeAudio(`/audio/${satuan}.mp3`));
        }
    } else if (number === 100) {
        audioParts.push(makeAudio("/audio/100.mp3"));
    } else {
        audioParts.push(makeAudio(`/audio/${number}.mp3`));
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
