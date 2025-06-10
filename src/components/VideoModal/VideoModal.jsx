import React, { useEffect, useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";

const VideoModal = ({ isOpen, onClose }) => {
    const errorRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleError = (error) => {
        console.error("Video playback error:", error);
        if (errorRef.current) {
            errorRef.current.style.display = "block";
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black "
            onClick={handleBackgroundClick}
        >
            <div className="relative flex items-center justify-center w-11/12 border-2 border-white h-3/6 lg:w-10/12">
                <button
                    className="absolute top-0 z-50 text-xl text-white transition-colors right-2 md:text-2xl lg:text-4xl hover:text-orange-400"
                    onClick={onClose}
                >
                    ×
                </button>
                <p className="absolute z-50 text-lg text-center text-white">
                    Exemple video message.
                </p>
            </div>
        </div>
    );
};

export default VideoModal;
