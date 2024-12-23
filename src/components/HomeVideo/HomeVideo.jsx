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
    const [isReadyToReveal, setIsReadyToReveal] = useState(false);
    const [isLogoAnimating, setIsLogoAnimating] = useState(false);
    const [isLogoRevealed, setIsLogoRevealed] = useState(false);
    const [isContainerTranslated, setIsContainerTranslated] = useState(false);
    const [isVideoReadyToPlay, setIsVideoReadyToPlay] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const videoRef = useRef(null);
    const progressRefs = useRef([]);
    const readyCheckInterval = useRef(null);

    const revealClass = useRevealAnimation(isReadyToReveal, "bottom");

    const updateProgress = () => {
        const video = videoRef.current;
        if (video && progressRefs.current[activeVideoIndex]) {
            const progress = (video.currentTime / video.duration) * 100 || 0;
            progressRefs.current[activeVideoIndex].style.width = `${progress}%`;
        }
    };

    const resetProgressBar = (index) => {
        if (progressRefs.current[index]) {
            progressRefs.current[index].style.width = "0%";
        }
    };

    const triggerLogoAnimationSequence = () => {
        setTimeout(() => {
            setIsLogoRevealed(true);

            setTimeout(() => {
                setIsLogoAnimating(true);

                setTimeout(() => {
                    setIsContainerTranslated(true);

                    setTimeout(() => {
                        setIsReadyToReveal(true);
                        fadeOutLoader();
                    }, 500);
                }, 700);
            }, 700);
        }, 1000);
    };

    const fadeOutLoader = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsVideoReadyToPlay(true);
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

            video.addEventListener("timeupdate", updateProgress);
        }
    };

    useEffect(() => {
        initializeVideoPlayback();

        return () => {
            const video = videoRef.current;
            if (video) video.removeEventListener("timeupdate", updateProgress);
            clearInterval(readyCheckInterval.current);
        };
    }, [activeVideoIndex]);

    useEffect(() => {
        resetProgressBar(activeVideoIndex);
    }, [activeVideoIndex]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (isVideoReadyToPlay) {
                video.play().catch((err) => console.warn("Play failed:", err));
            } else {
                video.pause();
            }
        }
    }, [isVideoReadyToPlay]);

    const handleVideoChange = (index) => {
        if (index === activeVideoIndex) return; // Skip resetting if the same video
        setIsTransitioning(true); // Start transition
        setTimeout(() => {
            resetProgressBar(activeVideoIndex); // Reset the previous video's progress bar
            setActiveVideoIndex(index);
            resetProgressBar(index); // Reset the new video's progress bar
            setIsTransitioning(false); // End transition
        }, 300); // Delay for the transition effect
    };

    const renderDesktopView = () => (
        <>
            <figure
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
                <video
                    ref={videoRef}
                    src={videos[activeVideoIndex].src}
                    preload="auto"
                    autoPlay={false}
                    loop={false}
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                    onEnded={() =>
                        handleVideoChange(
                            (activeVideoIndex + 1) % videos.length
                        )
                    }
                />
            </figure>
            <HomeVideoDetails
                videos={videos}
                activeVideoIndex={activeVideoIndex}
                handleHover={handleVideoChange}
                progressRefs={progressRefs}
                revealClass={revealClass}
                isLogoAnimating={isLogoAnimating}
                isLogoRevealed={isLogoRevealed}
                isContainerTranslated={isContainerTranslated}
            />
        </>
    );

    const renderMobileView = () => (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
            <video
                ref={videoRef}
                src={videos[activeVideoIndex].src}
                preload="auto"
                autoPlay={false}
                loop
                muted
                playsInline
                className="w-full h-auto"
            />
            <div className="absolute flex flex-col items-center space-y-2 bottom-4">
                <h1 className="text-lg text-white">
                    {videos[activeVideoIndex].title}
                </h1>
                <p className="text-sm text-gray-300">
                    {videos[activeVideoIndex].brand} |{" "}
                    {videos[activeVideoIndex].director}
                </p>
            </div>
        </div>
    );

    return (
        <section className="relative w-full h-screen">
            {isLoading && <Loader fadeOut={isFadingOut} />}
            {isMobile ? renderMobileView() : renderDesktopView()}
        </section>
    );
}

export default HomeVideo;
