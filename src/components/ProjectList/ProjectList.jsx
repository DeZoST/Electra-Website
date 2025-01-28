"use client";

import { useEffect, useState } from "react";
import ProjectVideoCard from "@/components/ProjectVideoCard/ProjectVideoCard";
import VideoModal from "@/components/VideoModal/VideoModal";

const ProjectList = ({ projects }) => {
    const [loadedIndexes, setLoadedIndexes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPlaybackId, setCurrentPlaybackId] = useState(null);

    useEffect(() => {
        // Mark new projects as "loaded" for transitions
        setLoadedIndexes((prevIndexes) => [
            ...prevIndexes,
            ...Array.from(
                { length: projects.length - prevIndexes.length },
                (_, i) => prevIndexes.length + i
            ),
        ]);
    }, [projects]);

    const handleOpenModal = (muxID) => {
        setCurrentPlaybackId(muxID);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentPlaybackId(null);
        setModalOpen(false);
    };

    // Dynamically determine grid layout classes
    const gridClass =
        projects.length === 1
            ? "grid-cols-1" // Single card takes full width
            : "grid-cols-1 lg:grid-cols-2"; // Two columns for multiple cards

    return (
        <>
            <ul className={`grid gap-8 mt-4 md:mt-6 ${gridClass}`}>
                {projects.map((project, index) => (
                    <li
                        key={index}
                        className={`transition-opacity duration-500 ${
                            loadedIndexes.includes(index)
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        <ProjectVideoCard
                            title={project.title}
                            client={project.client}
                            director={project.director || null}
                            image={project.image}
                            muxID={project.muxAssetId}
                            onClick={() => handleOpenModal(project.muxAssetId)}
                        />
                    </li>
                ))}
            </ul>
            <VideoModal
                isOpen={modalOpen}
                playbackId={currentPlaybackId}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default ProjectList;
