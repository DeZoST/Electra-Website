"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TransitionLink } from "../TransitionLink/TransitionLink";
import { usePathname } from "next/navigation";
import useRevealAnimation from "../../hooks/useRevealAnimation";

function Header() {
    const [navLinks, setNavLinks] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const revealClass = useRevealAnimation(true, "top");

    useEffect(() => {
        async function fetchNavData() {
            try {
                const [linksRes, directorsRes] = await Promise.all([
                    fetch("/data/nav_links.json"),
                    fetch("/data/directors.json"),
                ]);

                const [linksData, directorsData] = await Promise.all([
                    linksRes.json(),
                    directorsRes.json(),
                ]);

                setNavLinks(linksData);
                setDirectors(Object.keys(directorsData));
            } catch (err) {
                console.error("Failed to fetch navigation data:", err);
            }
        }

        fetchNavData();
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const getLinkClass = (href) =>
        pathname === href
            ? "text-white"
            : "opacity-50 hover:opacity-100 text-white";

    return (
        <header
            className={`fixed z-50 flex items-center justify-between w-full header-text ${revealClass}`}
        >
            <TransitionLink href="/" className="px-10 py-6">
                <Image
                    src={`/images/Bolt_Star_${isOpen ? "Orange" : "White"}.svg`}
                    alt={`Bolt Star ${isOpen ? "Orange" : "White"} Logo`}
                    width={32}
                    height={53}
                />
            </TransitionLink>
            <nav>
                <ul className="items-center hidden text-xs font-bold tracking-tight uppercase group lg:flex">
                    <li className="relative hidden lg:block">
                        <button
                            className="flex items-center p-6 text-white uppercase transition-opacity duration-300 last:pr-6 hover:opacity-80"
                            onClick={toggleDropdown}
                        >
                            Directors
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <ul
                            className={`absolute z-50 w-48 p-4 text-sm rounded-md text-center -translate-x-1/2 left-1/2 transition-all duration-300 ease-in-out ${
                                isDropdownOpen
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            }`}
                        >
                            {directors.map((director, index) => (
                                <li
                                    key={index}
                                    className="py-1 text-white cursor-pointer hover:text-gray-300"
                                >
                                    <TransitionLink
                                        href={`/directors/${director}`}
                                        className="transition-all duration-150"
                                    >
                                        {director}
                                    </TransitionLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                    {navLinks.map((link, index) => (
                        <li key={index} className="last:pr-10">
                            <TransitionLink
                                href={link.href}
                                className={`px-6 transition-opacity duration-300 ${getLinkClass(
                                    link.href
                                )}`}
                            >
                                {link.name}
                            </TransitionLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <button
                aria-label="Open navigation"
                className="relative flex items-center before:bg-transparent before:absolute before:-inset-8 lg:hidden"
                onClick={toggleMenu}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 32 9"
                    className="nav-toggle__svg nav-toggle__svg--burger"
                >
                    <path stroke="currentColor" d="M0 .5h32"></path>
                    <path stroke="currentColor" d="M0 4.5h32"></path>
                    <path stroke="currentColor" d="M0 8.5h32"></path>
                </svg>{" "}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 34 11"
                    className="nav-toggle__svg nav-toggle__svg--cross"
                >
                    <path stroke="currentColor" d="m1 1 32 9"></path>
                    <path stroke="currentColor" d="M33 1 1 10"></path>
                </svg>
            </button>
        </header>
    );
}

export default Header;
