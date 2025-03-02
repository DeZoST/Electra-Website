"use client";

import { useRef, useState, useCallback } from "react";
import VideoList from "@/components/HomeVideo/VideoList";
import VideoModalHandler from "@/components/HomeVideo/VideoModalHandler";

function HomeVideo({ videos }) {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const progressRefs = useRef([]);

    const resetProgressBar = useCallback((index) => {
        if (progressRefs.current[index]) {
            progressRefs.current[index].style.width = "0%";
        }
    }, []);

    const handleVideoChange = useCallback(
        (index) => {
            if (index === activeVideoIndex) return;
            resetProgressBar(activeVideoIndex);
            setActiveVideoIndex(index);
            resetProgressBar(index);
        },
        [activeVideoIndex, resetProgressBar]
    );

    return (
        <section className="relative w-full overflow-hidden h-dvh">
            <VideoModalHandler>
                {({ handleOpenModal }) => (
                    <VideoList
                        videos={videos}
                        activeVideoIndex={activeVideoIndex}
                        handleVideoChange={handleVideoChange}
                        progressRefs={progressRefs}
                        openModal={handleOpenModal}
                    />
                )}
            </VideoModalHandler>
        </section>
    );
}

export default HomeVideo;
