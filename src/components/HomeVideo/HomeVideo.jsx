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
    const [isJsonLoaded, setIsJsonLoaded] = useState(false);
    const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
    const [isFirstVideoLoaded, setIsFirstVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const progressRefs = useRef([]);
    const readyCheckInterval = useRef(null);

    const revealClass = useRevealAnimation(!isLoading, "bottom");

    const handleVideoEnd = () => {
        if (!isMobile) {
            const nextIndex = (activeVideoIndex + 1) % videos.length;
            setActiveVideoIndex(nextIndex);
        }
    };

    const handleHover = (index) => {
        setActiveVideoIndex(index);
    };

    const checkIfVideoReady = () => {
        const video = videoRef.current;
        if (video && video.readyState >= 3) {
            clearInterval(readyCheckInterval.current);

            setIsFadingOut(true);

            setTimeout(() => {
                setIsLoading(false);
                const event = new CustomEvent("pageReady");
                window.dispatchEvent(event);
            }, 500);
        }
    };

    const updateProgress = () => {
        const video = videoRef.current;
        const progressBar = progressRefs.current[activeVideoIndex];
        if (video && progressBar) {
            const progress = (video.currentTime / video.duration) * 100 || 0;
            progressBar.style.width = `${progress}%`;
        }
    };

    const handleJsonLoad = () => {
        setIsJsonLoaded(true);
    };

    const handleImageLoad = () => {
        setIsFirstImageLoaded(true);
    };

    const handleFirstVideoLoad = () => {
        setIsFirstVideoLoaded(true);
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current
                .play()
                .then(() => console.log("Video play triggered."))
                .catch((err) => console.warn("Play method failed: ", err));

            readyCheckInterval.current = setInterval(checkIfVideoReady, 100);

            videoRef.current.addEventListener("timeupdate", updateProgress);
        }

        return () => {
            clearInterval(readyCheckInterval.current);
            if (videoRef.current) {
                videoRef.current.removeEventListener(
                    "timeupdate",
                    updateProgress
                );
            }
        };
    }, [activeVideoIndex]);

    useEffect(() => {
        progressRefs.current.forEach((bar, index) => {
            if (bar) bar.style.width = index === activeVideoIndex ? "0%" : "";
        });
    }, [activeVideoIndex]);

    useEffect(() => {
        if (isJsonLoaded && isFirstImageLoaded && isFirstVideoLoaded) {
            setIsLoading(false);
        }
    }, [isJsonLoaded, isFirstImageLoaded, isFirstVideoLoaded]);

    return (
        <section className="relative w-full h-screen">
            {isLoading && <Loader fadeOut={isFadingOut} />}

            {isMobile ? (
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
                                    onLoadedData={handleFirstVideoLoad}
                                />
                                <figcaption className="z-0 flex items-end justify-between w-full p-4 text-xs tracking-tight ">
                                    <div>
                                        <p className="font-semibold text-gray-300">
                                            {video.title}
                                        </p>
                                        <p className="text-gray-400">
                                            {video.brand}
                                        </p>
                                    </div>
                                    <p className="text-gray-400">
                                        Director: {video.director}
                                    </p>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    <figure className={`absolute top-0 left-0 w-full h-full`}>
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
                            onLoadedData={handleFirstVideoLoad}
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
            )}
        </section>
    );
}

export default HomeVideo;
