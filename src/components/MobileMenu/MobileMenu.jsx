"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";

const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Contact", href: "/contact" },
];

function MobileMenu({ isOpen, onClose }) {
    const [textVisible, setTextVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setMenuVisible(true);
            setTimeout(() => {
                setTextVisible(true);
            }, 1000);
        } else {
            setTextVisible(false);
            setTimeout(() => {
                setMenuVisible(false);
            }, 400);
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 z-50 bg-white transform transition-transform duration-1000 ${
                menuVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <button
                className="absolute right-0 p-6 text-4xl text-black top-3"
                onClick={onClose}
            >
                ×
            </button>
            <ul className="flex flex-col items-center justify-center h-full">
                {navLinks.map((link, index) => (
                    <li
                        key={link.href}
                        className={`transform ease-out duration-700 ${
                            textVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{
                            transitionDelay: `${index * 100}ms`,
                        }}
                    >
                        <TransitionLink
                            href={link.href}
                            className="p-2 text-2xl font-bold text-black"
                            onClick={onClose}
                        >
                            {link.name}
                        </TransitionLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MobileMenu;
