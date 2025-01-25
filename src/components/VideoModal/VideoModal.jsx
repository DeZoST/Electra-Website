"use client";

import { useEffect } from "react";
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-9/12">
                <button
                    className="absolute right-2 text-white z-50 text-xl md:text-2xl lg:text-4xl hover:text-orange-400 transition-colors"
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
                    className="aspect-video"
                    forwardSeekOffset={5}
                    backwardSeekOffset={5}
                />
            </div>
        </div>
    );
};

export default VideoModal;
