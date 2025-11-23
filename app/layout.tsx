import type {Metadata} from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { fetchGlobalConfig } from "@/app/api/globalConfig";
export const metadata: Metadata = {
    title: "Star Trek French Club - Communauté Francophone Star Trek",
    description:
        "Rejoignez une communauté francophone Star Trek. Conventions, événements, podcasts, quiz et bien plus.",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {

    const globalConfig = await fetchGlobalConfig();

    return (
        <html lang="fr">
        <head>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                strategy="afterInteractive"
            />
        </head>
        <body className="bg-gray-900 text-white min-h-screen">
        <Header menu={globalConfig.menus.header} />
        {children}
        <Footer menuFooter={globalConfig.menus.footer}
                menuLegal={globalConfig.menus.copyright}
                apiSocialLinks={globalConfig.socialLinks}
                seoFooterText={globalConfig.seoFooterText}
                newsletter={globalConfig.newsletter}
                copyright={globalConfig.copyright}
        />
        </body>
        </html>
    );
}
