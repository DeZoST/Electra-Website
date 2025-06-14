import React from "react";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(
    () => import("@/components/HomeVideo/VideoPlayer"),
    {
        ssr: false,
    }
);

function MobileView({
    videos,
    activeVideoIndex,
    handleVideoChange,
    openModal,
}) {
    return (
        <div className="relative flex flex-col items-center justify-end w-full h-full p-6 overflow-hidden">
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
                    onClick={() => openModal()}
                    visible={index === activeVideoIndex}
                />
            ))}
            <div
                className={`absolute flex flex-col items-center space-y-2 bottom-4}`}
            >
                <h1 className={`text-lg text-white`}>
                    {videos[activeVideoIndex].title}
                </h1>
                <p className="text-sm text-gray-300">
                    {videos[activeVideoIndex].brand} |{" "}
                    {videos[activeVideoIndex].director}
                </p>
            </div>
        </div>
    );
}

export default React.memo(MobileView);
