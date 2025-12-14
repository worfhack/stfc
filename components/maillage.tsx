import Link from "next/link";
function LinkCard({ item }: { item: { url: string; title: string; description?: string } }) {
    return (
        <Link
            href={item.url}
            className="block bg-gray-800/50 border border-gray-700 rounded-xl p-6 w-full max-w-sm hover:border-blue-500/60 transition"
        >
            <h3 className="font-semibold text-lg mb-2 text-blue-400">
                {item.title}
            </h3>

            {!!item.description && (
                <p className="text-sm text-gray-400">
                    {item.description}
                </p>
            )}
        </Link>
    );
}


const Maillage = ({data}) => {

    if (!data){
        return  (<></>);
    }

    const links = data.links;
    return (
        <section className="py-12 sm:py-16 bg-gray-900/40 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {!!data?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                        {data.title}
                    </h2>
                )}

                {!!data?.head && (
                    <div
                        className="text-gray-400 max-w-3xl mx-auto text-center mb-8 sm:mb-12"
                        dangerouslySetInnerHTML={{__html: data.head}}
                    />
                )}

                {(() => {
                    const count = links.length;

                    // 1) 1 lien -> centré
                    if (count === 1) {
                        return (
                            <div className="flex justify-center">
                                <LinkCard item={links[0]}/>
                            </div>
                        );
                    }

                    // 2) 2 liens -> 1 colonne mobile, 2 colonnes dès sm, centrés en bloc
                    if (count === 2) {
                        return (
                            <div className="flex justify-center">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                                    {links.map((item, i) => (
                                        <LinkCard key={i} item={item}/>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    // 3+) -> grid classique
                    return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {links.map((item, i) => (
                                <LinkCard key={i} item={item}/>
                            ))}
                        </div>
                    );
                })()}

            </div>
        </section>


    );
};

export default Maillage;