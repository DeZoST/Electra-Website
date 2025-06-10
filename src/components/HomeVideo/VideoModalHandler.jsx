"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const VideoModal = dynamic(() => import("@/components/VideoModal/VideoModal"), {
    ssr: false,
});

function VideoModalHandler({ children }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            {children({ handleOpenModal, handleCloseModal })}
            <VideoModal isOpen={modalOpen} onClose={handleCloseModal} />
        </>
    );
}

export default VideoModalHandler;
