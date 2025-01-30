"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";

function DirectorsDropdown({ handleNavigation }) {
    const [directors, setDirectors] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        async function fetchDirectors() {
            try {
                const res = await fetch("/data/directors.json");
                const data = await res.json();
                setDirectors(Object.keys(data));
            } catch (err) {
                console.error("Failed to fetch directors:", err);
            }
        }

        fetchDirectors();
    }, []);

    const handleDropdownMouseEnter = () => setIsDropdownOpen(true);
    const handleDropdownMouseLeave = () => setIsDropdownOpen(false);

    return (
        <div
            className="relative hidden md:block"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
        >
            <button className="flex items-center p-6 text-white uppercase transition-opacity duration-300 last:pr-6 hover:opacity-80">
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
                className={`absolute flex flex-col items-center z-50 w-fit text-sm rounded-md -translate-x-1/2 left-1/2 transition-all duration-300 ease-in-out ${
                    isDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
                {directors.map((director, index) => (
                    <li
                        key={index}
                        className="w-full py-1 text-white cursor-pointer text-nowrap hover:text-gray-300"
                    >
                        <TransitionLink
                            href={`/directors/${director}`}
                            className="w-full transition-all duration-150"
                            onClick={() =>
                                handleNavigation(`/directors/${director}`)
                            }
                        >
                            {director}
                        </TransitionLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DirectorsDropdown;
