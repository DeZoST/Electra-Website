"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";
import DirectorsDropdown from "@/components/Header/DirectorsDropdown";

function NavLinks({ handleNavigation, getLinkClass }) {
    const [navLinks, setNavLinks] = useState([]);

    useEffect(() => {
        async function fetchNavLinks() {
            try {
                const res = await fetch("/data/nav_links.json");
                const data = await res.json();
                setNavLinks(data);
            } catch (err) {
                console.error("Failed to fetch navigation links:", err);
            }
        }

        fetchNavLinks();
    }, []);

    return (
        <nav className="items-center justify-between hidden text-xs font-bold tracking-tight uppercase md:flex">
            <DirectorsDropdown handleNavigation={handleNavigation} />
            <ul className="flex items-center uppercase group">
                {navLinks.map((link) => (
                    <li key={link.href} className="last:pr-10">
                        <TransitionLink
                            href={link.href}
                            className={`p-6 transition-opacity duration-300 ${getLinkClass(
                                link.href
                            )}`}
                            onClick={() => handleNavigation(link.href)}
                        >
                            {link.name}
                        </TransitionLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavLinks;
