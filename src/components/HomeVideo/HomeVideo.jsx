"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import useRevealAnimation from "@/hooks/useRevealAnimation";
import VideoList from "@/components/HomeVideo/VideoList";
import VideoModalHandler from "@/components/HomeVideo/VideoModalHandler";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader/Loader"), {
    ssr: false,
});

function HomeVideo({ videos }) {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isLogoVisible, setIsLogoVisible] = useState(false);
    const [isLogoTranslated, setIsLogoTranslated] = useState(false);
    const [isLoaderGone, setIsLoaderGone] = useState(false);

    const progressRefs = useRef([]);
    const revealClass = useRevealAnimation(isLoaderGone, "bottom");

    const resetProgressBar = useCallback((index) => {
        if (progressRefs.current[index]) {
            progressRefs.current[index].style.width = "0%";
        }
    }, []);

    const handleVideoChange = useCallback(
        (index) => {
            if (index === activeVideoIndex) return;
            resetProgressBar(activeVideoIndex);
            setActiveVideoIndex(index);
            resetProgressBar(index);
        },
        [activeVideoIndex, resetProgressBar]
    );

    const fadeOutLoader = useCallback(() => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsLoaderGone(true);
        }, 1000);
    }, []);

    const triggerRevealSequence = useCallback(() => {
        setTimeout(() => {
            setIsLogoVisible(true);
            setTimeout(() => {
                setIsLogoTranslated(true);
                setTimeout(() => fadeOutLoader(), 1000);
            }, 1000);
        }, 500);
    }, [fadeOutLoader]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasVisitedHomePage =
                sessionStorage.getItem("hasVisitedHomePage");

            if (!hasVisitedHomePage) {
                triggerRevealSequence();
                sessionStorage.setItem("hasVisitedHomePage", "true");
            } else {
                setIsLogoTranslated(true);
                setIsLoading(false);
                setIsLoaderGone(true);
                setIsLogoVisible(true);
            }
        }
    }, []);

    return (
        <section className="relative w-full overflow-hidden h-dvh">
            {isLoading && <Loader fadeOut={isFadingOut} />}
            <VideoModalHandler>
                {({ handleOpenModal }) => (
                    <>
                        <VideoList
                            videos={videos}
                            activeVideoIndex={activeVideoIndex}
                            handleVideoChange={handleVideoChange}
                            progressRefs={progressRefs}
                            revealClass={revealClass}
                            isLogoVisible={isLogoVisible}
                            isLogoTranslated={isLogoTranslated}
                            openModal={handleOpenModal}
                            isLoaderGone={isLoaderGone}
                        />
                    </>
                )}
            </VideoModalHandler>
        </section>
    );
}

export default HomeVideo;
