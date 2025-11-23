import Link from "next/link";


const ComeWithUs = () => {

    return (
        <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{fontFamily: "Orbitron, sans-serif"}}
                >
                    Prêt à Rejoindre l&apos;Aventure ?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                    Devenez membre de notre communauté et participez à toutes ces
                    activités passionnantes
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/nous-rejoindre"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                        Devenir Membre
                    </Link>
                    <Link href="/evenements"
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                        Voir les Événements
                    </Link>
                </div>
            </div>
        </section>

    );
};

export default ComeWithUs;