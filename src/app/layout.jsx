import { Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/layout";

const montSerrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Electra FilmWorks",
    description:
        "Electra Filmworks is a leading film production company that has set itself apart in the industry by creating compelling branded content and commercial work.",
    keywords:
        "Electra FilmWorks, Electra, FilmWorks, Electra FilmWorks official website, Commercials",
    icons: {
        icon: "/images/favicon.ico",
    },
    openGraph: {
        type: "website",
        url: "https://electrafilmworks.com",
        title: "Electra FilmWorks",
        locale: "en_US",
        siteName: "Electra FilmWorks",
        description:
            "Electra Filmworks is a leading film production company that has set itself apart in the industry by creating compelling branded content and commercial work.",
        images: [
            {
                url: "/images/og.png",
                width: 300,
                height: 300,
                alt: "Electra FilmWorks Logo",
            },
        ],
    },
    metadataBase: new URL("https://electra-website-dusky.vercel.app"),
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
