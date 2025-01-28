"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

export const TransitionLink = ({ children, href, ...props }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (isTransitioning) {
            const main = document.querySelector("main");
            if (main) {
                main.classList.remove("page-transition");
            }
            setIsTransitioning(false);
        }
    }, [pathname, searchParams]);

    const handleTransition = async (e) => {
        e.preventDefault();
        const main = document.querySelector("main");

        if (main) {
            main.classList.add("page-transition");
        }

        setIsTransitioning(true);

        // Check if the current pathname matches the href
        if (pathname === href) {
            console.log("Already on the same page, resetting transition.");
            if (main) {
                main.classList.remove("page-transition");
            }
            setIsTransitioning(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 300));

        router.push(href);
    };

    return (
        <Link {...props} href={href} onClick={handleTransition}>
            {children}
        </Link>
    );
};
