"use client";

import { Suspense, useState, useEffect } from "react";
import Header from "@/components/Header/Header";

function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handlePageReady = () => {
            setTimeout(() => {
                console.log("Fade out complete, setting isLoading to false...");
                setIsLoading(false);
                console.log("isLoading is now false");
            }, 3500);
        };

        window.addEventListener("pageReady", handlePageReady);

        return () => {
            window.removeEventListener("pageReady", handlePageReady);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasVisitedHomePage =
                sessionStorage.getItem("hasVisitedHomePage");

            if (hasVisitedHomePage) {
                sessionStorage.setItem("hasVisitedHomePage", "true");
                setIsLoading(false);
            }
        }

        console.log("Dispatching pageReady event from Layout...");
        window.dispatchEvent(new CustomEvent("pageReady"));
    }, []);

    return (
        <>
            <Suspense
                fallback={
                    <div className="flex items-center justify-center w-full h-dvh">
                        Loading...
                    </div>
                }
            >
                {!isLoading && (
                    <>
                        <Header />
                    </>
                )}
                <main>{children}</main>
            </Suspense>
        </>
    );
}

export default Layout;
