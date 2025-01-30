"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const VideoModal = dynamic(() => import("@/components/VideoModal/VideoModal"), {
    ssr: false,
});

function VideoModalHandler({ children }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPlaybackId, setCurrentPlaybackId] = useState(null);

    const handleOpenModal = (playbackId) => {
        setCurrentPlaybackId(playbackId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentPlaybackId(null);
        setModalOpen(false);
    };

    return (
        <>
            {children({ handleOpenModal, handleCloseModal })}
            <VideoModal
                isOpen={modalOpen}
                playbackId={currentPlaybackId}
                onClose={handleCloseModal}
            />
        </>
    );
}

export default VideoModalHandler;
