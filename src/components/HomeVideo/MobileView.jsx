import React from "react";
import VideoPlayer from "./VideoPlayer";

function MobileView({ videos, activeVideoIndex }) {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
            <VideoPlayer
                videoSrc={videos[activeVideoIndex].src}
                autoPlay={false}
                loop
            />
            <div className="absolute flex flex-col items-center space-y-2 bottom-4">
                <h1 className="text-lg text-white">
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
