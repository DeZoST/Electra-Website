import { useRef, useEffect, useState } from "react";
import useProgressBar from "@/hooks/useProgressBar";

function VideoPlayer({
    videoSrc,
    autoPlay = false,
    loop = false,
    muted = true,
    progressRefs = { current: [] },
    activeVideoIndex,
    onEnded,
    onClick,
    visible,
}) {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { startProgressUpdate, stopProgressUpdate, resetProgressBar } =
        useProgressBar(videoRef, activeVideoIndex, progressRefs);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = async () => {
            try {
                video.muted = muted;
                resetProgressBar(activeVideoIndex);
                await video.play();
                console.log("Video is playing");
                startProgressUpdate();
            } catch (err) {
                console.warn("Error playing video:", err);
            }
        };

        const handleEnded = () => {
            if (onEnded) onEnded();
        };

        video.addEventListener("ended", handleEnded);

        if (autoPlay && visible) {
            handlePlay();
        }

        return () => {
            video.removeEventListener("ended", handleEnded);
            stopProgressUpdate();
            resetProgressBar(activeVideoIndex);
        };
    }, [
        videoSrc,
        autoPlay,
        muted,
        activeVideoIndex,
        resetProgressBar,
        startProgressUpdate,
        stopProgressUpdate,
        onEnded,
        visible,
    ]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (visible) {
            video.play().catch((err) => {
                console.warn("Error playing video:", err);
            });
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [visible]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsLoaded(true);
                        observer.unobserve(video);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(video);

        return () => {
            observer.unobserve(video);
        };
    }, []);

    return (
        <video
            ref={videoRef}
            src={isLoaded ? videoSrc : null}
            loop={loop}
            onClick={onClick}
            muted={muted}
            playsInline
            className={`absolute top-0 left-0 object-cover h-full cursor-pointer w-full ${
                visible ? "block" : "hidden"
            }`}
        />
    );
}

export default VideoPlayer;
