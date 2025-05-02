import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageView = () => {
    const antrianAktif = { nomor: "38 A", loket: "D" };

    const dataAntrian = [
        { loket: "Loket A", antrian: "1 B", color: "biru1" },
        { loket: "Loket B", antrian: "2 B", color: "biru1" },
        { loket: "Loket C", antrian: "3 B", color: "hijau1" },
        { loket: "Loket D", antrian: "4 B", color: "hijau1" },
    ];

    return (
        <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-slate-100 to-slate-200">
            <Navbar />
        

            {/* Konten Utama: Antrian Aktif + Video */}
            <div className="flex flex-row mt-[12vh] p-6 gap-6 flex-wrap">
                {/* Antrian Aktif */}
                <div className="flex-1  bg-white  shadow-2xl rounded-2xl w-[0vh] h-[45vh] flex items-center justify-center relative overflow-hidden px-6">
    {/* Glow Background */}


    {/* Konten: Teks + Tanda Seru */}
    <div className="z-10 flex flex-row items-center justify-center gap-6 text-center">
        {/* Teks Tengah */}
        <div className="flex flex-col items-center justify-center">
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
        </div>


    </div>
</div>


                {/* Video */}
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

            {/* Daftar Antrian */}
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

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PageView;
