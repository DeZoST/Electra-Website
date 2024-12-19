"use client";

import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader.jsx";
import useIsMobile from "../../hooks/useIsMobile";
import useRevealAnimation from "../../hooks/useRevealAnimation";
import HomeVideoDetails from "../HomeVideoDetails/HomeVideoDetails.jsx";

function HomeVideo({ videos }) {
    const isMobile = useIsMobile();
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isReadyToReveal, setIsReadyToReveal] = useState(false); // New state
    const [isLogoAnimating, setIsLogoAnimating] = useState(false);
    const [isLogoRevealed, setIsLogoRevealed] = useState(false);
    const [isContainerTranslated, setIsContainerTranslated] = useState(false);

    const videoRef = useRef(null);
    const progressRefs = useRef([]);
    const readyCheckInterval = useRef(null);

    const revealClass = useRevealAnimation(isReadyToReveal, "bottom"); // Use new state

    const triggerLogoAnimationSequence = () => {
        setTimeout(() => {
            setIsLogoRevealed(true);

            setTimeout(() => {
                setIsLogoAnimating(true);

                setTimeout(() => {
                    setIsContainerTranslated(true);

                    // Trigger content reveal immediately before loader fade-out
                    setTimeout(() => {
                        setIsReadyToReveal(true); // Trigger animations
                        fadeOutLoader();
                    }, 500);
                }, 700);
            }, 700);
        }, 1000);
    };

    const fadeOutLoader = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsLoading(false); // Loader finishes fading out
        }, 1000);
    };

    const initializeVideoPlayback = () => {
        const video = videoRef.current;
        if (video) {
            video
                .play()
                .catch((err) => console.warn("Play method failed: ", err));
            readyCheckInterval.current = setInterval(() => {
                if (video.readyState >= 3) {
                    clearInterval(readyCheckInterval.current);
                    triggerLogoAnimationSequence();
                }
            }, 100);
        }
    };

    useEffect(() => {
        initializeVideoPlayback();
        return () => {
            const video = videoRef.current;
            if (video) video.removeEventListener("timeupdate", updateProgress);
        };
    }, []);

    const renderDesktopView = () => (
        <>
            <figure className="absolute top-0 left-0 w-full h-full">
                <video
                    ref={videoRef}
                    src={videos[activeVideoIndex].src}
                    preload="auto"
                    autoPlay
                    loop={false}
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                    onEnded={() =>
                        setActiveVideoIndex(
                            (prevIndex) => (prevIndex + 1) % videos.length
                        )
                    }
                    onLoadedData={triggerLogoAnimationSequence}
                />
            </figure>
            <HomeVideoDetails
                videos={videos}
                activeVideoIndex={activeVideoIndex}
                handleHover={(index) => setActiveVideoIndex(index)}
                progressRefs={progressRefs}
                revealClass={revealClass}
                isLogoAnimating={isLogoAnimating}
                isLogoRevealed={isLogoRevealed}
                isContainerTranslated={isContainerTranslated}
            />
        </>
    );

    return (
        <section className="relative w-full h-screen">
            {isLoading && <Loader fadeOut={isFadingOut} />}
            {!isMobile && renderDesktopView()}
        </section>
    );
}

export default HomeVideo;
