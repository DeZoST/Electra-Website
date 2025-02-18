"use client";

import { useState } from "react";
import Head from "next/head";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import useRevealAnimation from "@/hooks/useRevealAnimation";
import { usePathname, useRouter } from "next/navigation";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const revealClass = useRevealAnimation(true, "top");

    const handleNavigation = async (href) => {
        try {
            router.push(href);
        } finally {
            fadeOutLoader();
        }
    };

    const fadeOutLoader = () => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("pageReady"));
        }, 1000);
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const getLinkClass = (href) =>
        pathname === href
            ? "text-white"
            : "opacity-50 hover:opacity-100 text-white";

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="/images/Bolt_Star_White.svg"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/images/Bolt_Star_Orange.svg"
                    as="image"
                />
            </Head>
            <header
                className={`fixed z-40 flex items-center justify-between w-full header-text ${revealClass}`}
            >
                <Logo isOpen={isOpen} handleNavigation={handleNavigation} />

                <NavLinks
                    handleNavigation={handleNavigation}
                    getLinkClass={getLinkClass}
                />
            </header>
        </>
    );
}

export default Header;
