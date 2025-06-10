import React from "react";
import dynamic from "next/dynamic";
import HomeVideoDetails from "@/components/HomeVideoDetails/HomeVideoDetails";

const VideoPlayer = dynamic(
    () => import("@/components/HomeVideo/VideoPlayer"),
    {
        ssr: false,
    }
);

function DesktopView({
    videos,
    activeVideoIndex,
    progressRefs,
    handleVideoChange,
    openModal,
}) {
    return (
        <>
            {videos.map((video, index) => (
                <VideoPlayer
                    key={index}
                    videoSrc={video.src}
                    autoPlay={index === activeVideoIndex}
                    onEnded={() =>
                        handleVideoChange(
                            (activeVideoIndex + 1) % videos.length
                        )
                    }
                    progressRefs={progressRefs}
                    activeVideoIndex={activeVideoIndex}
                    onClick={() => openModal()}
                    visible={index === activeVideoIndex}
                />
            ))}
            <HomeVideoDetails
                videos={videos}
                activeVideoIndex={activeVideoIndex}
                handleHover={handleVideoChange}
                progressRefs={progressRefs}
                openModal={openModal}
            />
        </>
    );
}

export default React.memo(DesktopView);
