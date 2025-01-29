import React from "react";
import VideoPlayer from "./VideoPlayer";
import HomeVideoDetails from "../HomeVideoDetails/HomeVideoDetails";

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
