import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageView = () => {
    const antrianAktif = { nomor: "38 A", loket: "D" };

    const dataAntrian = [
        { loket: "Loket A", antrian: "1 B", color: "from-blue-500 to-blue-300" },
        { loket: "Loket B", antrian: "2 B", color: "from-blue-500 to-blue-300" },
        { loket: "Loket C", antrian: "3 B", color: "from-green-500 to-green-300" },
        { loket: "Loket D", antrian: "4 B", color: "from-green-500 to-green-300" },
    ];

    return (
        <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-slate-100 to-slate-200">
            <Navbar />
        

            {/* Konten Utama: Antrian Aktif + Video */}
            <div className="flex flex-row mt-[12vh] p-6 gap-6 flex-wrap">
                {/* Antrian Aktif */}
                <div className="flex-1  bg-white shadow-lg rounded-xl w-[10vh] h-[40vh] p-6 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold text-gray-600 mb-4">Sedang Dipanggil</h2>
                    <div className="text-7xl font-bold text-blue-600">{antrianAktif.nomor}</div>
                    <div className="text-3xl mt-2 text-gray-700">→ Loket {antrianAktif.loket}</div>
                </div>

                {/* Video */}
                <div className="flex-[2] w-[100vh] h-[40vh] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
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

            {/* Daftar Antrian */}
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dataAntrian.map(({ loket, antrian, color }, index) => (
                    <div
                        key={index}
                        className="rounded-xl shadow-lg ring-1 ring-gray-300 backdrop-blur-lg bg-white/70 overflow-hidden"
                    >
                        <div
                            className={`bg-gradient-to-r ${color} text-center text-white text-xl font-semibold px-4 py-3`}
                        >
                            {loket}
                        </div>
                        <div className="text-center text-gray-800 font-bold text-5xl py-6">
                            {antrian}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PageView;
