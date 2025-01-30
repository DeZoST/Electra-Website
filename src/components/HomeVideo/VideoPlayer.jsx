import React, { useRef, useEffect } from "react";
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
}) {
    const videoRef = useRef(null);
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

        if (autoPlay) {
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
    ]);

    return (
        <video
            ref={videoRef}
            src={videoSrc}
            loop={loop}
            onClick={onClick}
            className="absolute top-0 left-0 object-cover h-full cursor-pointer -full"
        />
    );
}

export default VideoPlayer;
