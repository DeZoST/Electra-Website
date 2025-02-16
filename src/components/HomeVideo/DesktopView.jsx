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
    revealClass,
    isLogoVisible,
    isLogoTranslated,
    openModal,
    isLoaderGone,
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
                    onClick={() => openModal(video.muxPlaybackId)}
                    visible={index === activeVideoIndex}
                    isLoaderGone={isLoaderGone}
                />
            ))}
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
