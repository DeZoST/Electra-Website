"use client";

import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import useRevealAnimation from "@/hooks/useRevealAnimation";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname, useRouter } from "next/navigation";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const isMobile = useIsMobile();

    const pathname = usePathname();
    const router = useRouter();
    const revealClass = useRevealAnimation(isRevealed, "top");

    const handleNavigation = async (href) => {
        try {
            router.push(href);
        } finally {
            fadeOutLoader();
        }
    };

    const fadeOutLoader = () => {
        window.dispatchEvent(new CustomEvent("pageReady"));
    };

    const toggleMenu = useCallback(() => {
        if (isToggling) return;

        setIsToggling(true);
        setIsOpen((prev) => !prev);

        setTimeout(() => {
            setIsToggling(false);
        }, 1000);
    }, [isToggling]);

    const getLinkClass = (href) =>
        pathname === href
            ? "text-white"
            : "opacity-50 hover:opacity-100 text-white";

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setIsRevealed(true);
        } else {
            const handleReveal = () => {
                setIsRevealed(true);
                sessionStorage.setItem("hasVisited", "true");
            };

            const eventName = isMobile ? "pageIsReady" : "logoTranslated";
            window.addEventListener(eventName, handleReveal);

            return () => {
                window.removeEventListener(eventName, handleReveal);
            };
        }
    }, [isMobile]);

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
            {isMobile && <MobileMenu isOpen={isOpen} onClose={toggleMenu} />}

            <header
                className={`fixed top-0 left-0 pt-6 md:pt-4 right-0 z-40 flex items-center justify-between container header-text ${revealClass}`}
            >
                <Logo isOpen={isOpen} handleNavigation={handleNavigation} />

                <NavLinks
                    handleNavigation={handleNavigation}
                    getLinkClass={getLinkClass}
                />
                <button
                    className="block text-3xl text-white md:hidden"
                    onClick={toggleMenu}
                >
                    ☰
                </button>
            </header>
        </>
    );
}

export default Header;
