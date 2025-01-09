import { useCallback, useRef } from "react";

function useProgressBar(videoRef, activeVideoIndex, progressRefs) {
    const animationFrameId = useRef(null);

    const resetProgressBar = useCallback(
        (index) => {
            if (progressRefs.current[index]) {
                progressRefs.current[index].style.width = "0%";
            }
        },
        [progressRefs]
    );

    const updateProgress = useCallback(() => {
        const video = videoRef.current;
        if (video && progressRefs.current[activeVideoIndex]) {
            const progress = (video.currentTime / video.duration) * 100 || 0;
            progressRefs.current[activeVideoIndex].style.width = `${progress}%`;

            // Schedule the next update
            animationFrameId.current = requestAnimationFrame(updateProgress);
        }
    }, [activeVideoIndex, videoRef, progressRefs]);

    const stopProgressUpdate = useCallback(() => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
    }, []);

    const startProgressUpdate = useCallback(() => {
        stopProgressUpdate(); // Stop any ongoing updates
        resetProgressBar(activeVideoIndex); // Ensure the progress bar is reset
        animationFrameId.current = requestAnimationFrame(updateProgress);
    }, [
        updateProgress,
        stopProgressUpdate,
        resetProgressBar,
        activeVideoIndex,
    ]);

    return { startProgressUpdate, stopProgressUpdate, resetProgressBar };
}

export default useProgressBar;
