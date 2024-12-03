import { Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/layout";

const montSerrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Electra FilmWorks",
    description: "Electra FilmWorks official website",
    keywords:
        "Electra FilmWorks, Electra, FilmWorks, Electra FilmWorks official website, Commerc",
    icons: {
        icon: "/images/favicon.ico",
    },
    openGraph: {
        type: "website",
        url: "https://electrafilmworks.com",
        title: "Electra FilmWorks",
        description: "Electra FilmWorks official website",
        images: [
            {
                url: "/images/og.png",
                width: 300,
                height: 300,
                alt: "Electra FilmWorks Logo",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${montSerrat.className}`}>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
