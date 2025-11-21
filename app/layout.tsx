import type {Metadata} from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Star Trek French Club - Communauté Francophone Star Trek",
    description:
        "Rejoignez la plus grande communauté francophone Star Trek. Conventions, événements, podcasts, quiz et bien plus.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <head>

        </head>
        <body className="bg-gray-900 text-white min-h-screen">
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
