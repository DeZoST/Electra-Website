"use client";

import { Suspense, useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Loader from "@/components/Loader/Loader";
import useIsMobile from "@/hooks/useIsMobile";

function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setIsLoading(false);
        } else {
            const handleEvent = () => {
                setIsFadingOut(true);
                setTimeout(() => {
                    console.log(
                        "Fade out complete, setting isLoading to false..."
                    );
                    setIsLoading(false);
                    console.log("isLoading is now false");
                    sessionStorage.setItem("hasVisited", "true");
                }, 1000);
            };

            const eventName = isMobile ? "pageIsReady" : "logoTranslated";
            window.addEventListener(eventName, handleEvent);

            if (isMobile) {
                window.dispatchEvent(new CustomEvent("pageIsReady"));
            }

            return () => {
                window.removeEventListener(eventName, handleEvent);
            };
        }
    }, [isMobile]);

    return (
        <>
            {isLoading && <Loader fadeOut={isFadingOut} />}
            <Suspense
                fallback={
                    <div className="flex items-center justify-center w-full h-dvh">
                        Loading...
                    </div>
                }
            >
                <Header />
                <main>{children}</main>
            </Suspense>
        </>
    );
}

export default Layout;
