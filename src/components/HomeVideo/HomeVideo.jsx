"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import useRevealAnimation from "@/hooks/useRevealAnimation";
import DesktopView from "@/components/HomeVideo/DesktopView";
import MobileView from "@/components/HomeVideo/MobileView";
import dynamic from "next/dynamic";

const VideoModal = dynamic(() => import("@/components/VideoModal/VideoModal"), {
    ssr: false,
});
const Loader = dynamic(() => import("@/components/Loader/Loader"), {
    ssr: false,
});

function HomeVideo({ videos }) {
    const isMobile = useIsMobile();
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isLogoVisible, setIsLogoVisible] = useState(false);
    const [isLogoTranslated, setIsLogoTranslated] = useState(false);
    const [isLoaderGone, setIsLoaderGone] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentPlaybackId, setCurrentPlaybackId] = useState(null);

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
        if (typeof window !== "undefined") {
            const hasVisitedHomePage =
                sessionStorage.getItem("hasVisitedHomePage");

            if (!hasVisitedHomePage) {
                triggerRevealSequence();
                sessionStorage.setItem("hasVisitedHomePage", "true");
            } else {
                setIsLogoVisible(true);
                setIsLogoTranslated(true);
                setIsLoading(false);
                setIsLoaderGone(true);
            }
        }
    }, [triggerRevealSequence]);

    const handleOpenModal = (muxID) => {
        setCurrentPlaybackId(muxID);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentPlaybackId(null);
        setModalOpen(false);
    };

    return (
        <section className="relative w-full h-screen">
            {isLoading && <Loader fadeOut={isFadingOut} />}
            {isMobile ? (
                <MobileView
                    videos={videos}
                    activeVideoIndex={activeVideoIndex}
                    handleVideoChange={handleVideoChange}
                    openModal={handleOpenModal}
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
                    openModal={handleOpenModal}
                />
            )}
            <VideoModal
                isOpen={modalOpen}
                playbackId={currentPlaybackId}
                onClose={handleCloseModal}
            />
        </section>
    );
}

export default React.memo(HomeVideo);
