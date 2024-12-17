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
    const videoRef = useRef(null);
    const progressRefs = useRef([]);
    const readyCheckInterval = useRef(null);

    const revealClass = useRevealAnimation(!isLoading, "bottom");

    const handleVideoEnd = () => {
        if (!isMobile) {
            setActiveVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }
    };

    const handleHover = (index) => setActiveVideoIndex(index);

    const checkIfVideoReady = () => {
        const video = videoRef.current;
        if (video && video.readyState >= 3) {
            clearInterval(readyCheckInterval.current);
            fadeOutLoader();
        }
    };

    const fadeOutLoader = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsLoading(false);
            window.dispatchEvent(new CustomEvent("pageReady"));
        }, 500);
    };

    const updateProgress = () => {
        const video = videoRef.current;
        if (video && progressRefs.current[activeVideoIndex]) {
            const progress = (video.currentTime / video.duration) * 100 || 0;
            progressRefs.current[activeVideoIndex].style.width = `${progress}%`;
        }
    };

    const initializeVideoPlayback = () => {
        const video = videoRef.current;
        if (video) {
            video
                .play()
                .catch((err) => console.warn("Play method failed: ", err));
            readyCheckInterval.current = setInterval(checkIfVideoReady, 100);
            video.addEventListener("timeupdate", updateProgress);
        }
    };

    const clearVideoEventListeners = () => {
        const video = videoRef.current;
        if (video) {
            video.removeEventListener("timeupdate", updateProgress);
        }
        clearInterval(readyCheckInterval.current);
    };

    useEffect(() => {
        initializeVideoPlayback();

        return () => {
            clearVideoEventListeners();
        };
    }, [activeVideoIndex]);

    useEffect(() => {
        progressRefs.current.forEach((bar, index) => {
            if (bar) bar.style.width = index === activeVideoIndex ? "0%" : "";
        });
    }, [activeVideoIndex]);

    const renderMobileView = () => (
        <ul>
            {videos.map((video, index) => (
                <li
                    key={index}
                    className={`relative flex items-end w-full h-dvh ${revealClass}`}
                >
                    <figure className="flex items-end w-full h-full">
                        <video
                            ref={index === 0 ? videoRef : null}
                            src={video.src}
                            preload="auto"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 left-0 object-cover w-full h-dvh"
                            onLoadedData={fadeOutLoader}
                        />
                        <figcaption className="z-0 flex items-end justify-between w-full p-4 text-xs tracking-tight">
                            <div>
                                <p className="font-semibold text-gray-300">
                                    {video.title}
                                </p>
                                <p className="text-gray-400">{video.brand}</p>
                            </div>
                            <p className="text-gray-400">
                                Director: {video.director}
                            </p>
                        </figcaption>
                    </figure>
                </li>
            ))}
        </ul>
    );

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
                    onEnded={handleVideoEnd}
                    onLoadedData={fadeOutLoader}
                />
            </figure>
            <HomeVideoDetails
                videos={videos}
                activeVideoIndex={activeVideoIndex}
                handleHover={handleHover}
                progressRefs={progressRefs}
                revealClass={revealClass}
            />
        </>
    );

    return (
        <section className="relative w-full h-screen">
            {isLoading && <Loader fadeOut={isFadingOut} />}
            {isMobile ? renderMobileView() : renderDesktopView()}
        </section>
    );
}

export default HomeVideo;
