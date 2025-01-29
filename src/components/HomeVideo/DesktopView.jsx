import React from "react";
import dynamic from "next/dynamic";
import HomeVideoDetails from "@/components/HomeVideoDetails/HomeVideoDetails";

const VideoPlayer = dynamic(
    () => import("@/components/HomeVideo/VideoPlayer"),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
);

function DesktopView({
    videos,
    activeVideoIndex,
    progressRefs,
    handleVideoChange,
    revealClass,
    isLogoVisible,
    isLogoTranslated,
    openModal,
}) {
    return (
        <>
            <VideoPlayer
                videoSrc={videos[activeVideoIndex].src}
                autoPlay
                onEnded={() =>
                    handleVideoChange((activeVideoIndex + 1) % videos.length)
                }
                progressRefs={progressRefs}
                activeVideoIndex={activeVideoIndex}
                onClick={() =>
                    openModal(videos[activeVideoIndex].muxPlaybackId)
                }
            />
            <HomeVideoDetails
                videos={videos}
                activeVideoIndex={activeVideoIndex}
                handleHover={handleVideoChange}
                progressRefs={progressRefs}
                revealClass={revealClass}
                isLogoVisible={isLogoVisible}
                isLogoTranslated={isLogoTranslated}
                openModal={openModal}
            />
        </>
    );
}

export default React.memo(DesktopView);
