"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Loader from "../Loader/Loader";
import useIsMobile from "../../hooks/useIsMobile";
import useRevealAnimation from "../../hooks/useRevealAnimation";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

function HomeVideo({ videos, openModal }) {
    const isMobile = useIsMobile();
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isLogoVisible, setIsLogoVisible] = useState(false);
    const [isLogoTranslated, setIsLogoTranslated] = useState(false);
    const [isLoaderGone, setIsLoaderGone] = useState(false);

    const progressRefs = useRef([]);
    const revealClass = useRevealAnimation(isLogoTranslated, "bottom");

    const handleVideoChange = useCallback(
        (index) => {
            if (index === activeVideoIndex) return;
            resetProgressBar(activeVideoIndex);
            setActiveVideoIndex(index);
        },
        [activeVideoIndex]
    );

    const resetProgressBar = useCallback((index) => {
        if (progressRefs.current[index]) {
            progressRefs.current[index].style.width = "0%";
        }
    }, []);

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
        triggerRevealSequence();
    }, [triggerRevealSequence]);

    return (
        <section className="relative w-full h-screen">
            {isLoading && <Loader fadeOut={isFadingOut} />}
            {isMobile ? (
                <MobileView
                    videos={videos}
                    activeVideoIndex={activeVideoIndex}
                    openModal={openModal} // Pass to MobileView
                />
            ) : (
                <DesktopView
                    videos={videos}
                    activeVideoIndex={activeVideoIndex}
                    progressRefs={progressRefs}
                    handleVideoChange={handleVideoChange}
                    revealClass={revealClass}
                    isLogoVisible={isLogoVisible}
                    isLogoTranslated={isLogoTranslated}
                    isLoaderGone={isLoaderGone}
                    openModal={openModal} // Pass to DesktopView
                />
            )}
        </section>
    );
}

export default React.memo(HomeVideo);
