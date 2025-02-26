import { useRef, useEffect } from "react";
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
    isLoaderGone,
}) {
    const videoRef = useRef(null);
    const { startProgressUpdate, stopProgressUpdate, resetProgressBar } =
        useProgressBar(videoRef, activeVideoIndex, progressRefs);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = async () => {
            try {
                if (isLoaderGone) {
                    video.muted = muted;
                    resetProgressBar(activeVideoIndex);
                    await video.play();
                    console.log("Video is playing");
                    startProgressUpdate();
                }
            } catch (err) {
                console.warn("Error playing video:", err);
            }
        };

        const handleEnded = () => {
            if (onEnded) onEnded();
        };

        video.addEventListener("ended", handleEnded);

        if (autoPlay && visible && isLoaderGone) {
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
        isLoaderGone,
    ]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (visible && isLoaderGone) {
            video.play().catch((err) => {
                console.warn("Error playing video:", err);
            });
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [visible, isLoaderGone]);

    return (
        <video
            ref={videoRef}
            src={videoSrc}
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
