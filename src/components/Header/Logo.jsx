"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";

function Logo({ isOpen, handleNavigation }) {
    return (
        <TransitionLink
            href="/"
            className="p-6"
            onClick={() => handleNavigation("/")}
        >
            <Image
                src={`/images/Bolt_Star_${isOpen ? "Orange" : "White"}.svg`}
                alt={`Bolt Star ${isOpen ? "Orange" : "White"} Logo`}
                width={32}
                height={53}
                style={{ width: "32px", height: "53px" }}
                priority
            />
        </TransitionLink>
    );
}

export default Logo;
