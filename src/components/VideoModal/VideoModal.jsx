import React, { useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

const VideoModal = ({ isOpen, playbackId, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!isOpen || !playbackId) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black "
            onClick={handleBackgroundClick}
        >
            <div className="relative w-11/12 lg:w-10/12">
                <button
                    className="absolute z-50 text-xl text-white transition-colors right-2 md:text-2xl lg:text-4xl hover:text-orange-400"
                    onClick={onClose}
                >
                    ×
                </button>
                <MuxPlayer
                    playbackId={playbackId}
                    streamType="on-demand"
                    controls
                    autoPlay
                    accentColor="#fb923c"
                    className=" aspect-video"
                    forwardSeekOffset={5}
                    backwardSeekOffset={5}
                />
            </div>
        </div>
    );
};

export default VideoModal;
