import React, { useRef, useEffect } from "react";
import useProgressBar from "../../hooks/useProgressBar";

function VideoPlayer({
    videoSrc,
    autoPlay = false,
    loop = false,
    muted = true,
    progressRefs = { current: [] }, // Default value for progressRefs
    activeVideoIndex,
    onEnded,
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
                resetProgressBar(activeVideoIndex); // Reset progress bar on play
                await video.play();
                console.log("Video is playing");
                startProgressUpdate(); // Start updating progress
            } catch (err) {
                console.warn("Error playing video:", err);
            }
        };

        if (autoPlay) {
            handlePlay();
        }

        // Stop updates and reset progress bar when video changes
        return () => {
            stopProgressUpdate();
            resetProgressBar(activeVideoIndex);
        };
    }, [
        videoSrc,
        autoPlay,
        muted,
        activeVideoIndex,
        startProgressUpdate,
        stopProgressUpdate,
        resetProgressBar,
    ]);

    return (
        <figure className="absolute top-0 left-0 w-full h-full">
            <video
                ref={videoRef}
                src={videoSrc}
                loop={loop}
                muted={muted}
                playsInline
                preload="auto"
                className="object-cover w-full h-full"
                onEnded={onEnded}
            />
        </figure>
    );
}

export default React.memo(VideoPlayer);
