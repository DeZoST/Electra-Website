"use client";

import { useEffect, useState } from "react";
import ProjectVideoCard from "@/components/ProjectVideoCard/ProjectVideoCard";
import dynamic from "next/dynamic";

const VideoModal = dynamic(() => import("@/components/VideoModal/VideoModal"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const ProjectList = ({ projects }) => {
    const [loadedIndexes, setLoadedIndexes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setLoadedIndexes((prevIndexes) => [
            ...prevIndexes,
            ...Array.from(
                { length: projects.length - prevIndexes.length },
                (_, i) => prevIndexes.length + i
            ),
        ]);
    }, [projects]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const gridClass =
        projects.length === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2";

    return (
        <>
            <ul className={`grid gap-3 mt-4 md:mt-6 ${gridClass}`}>
                {projects.map((project, index) => (
                    <li
                        key={index}
                        className={`transition-opacity w-full duration-500 ${
                            loadedIndexes.includes(index)
                                ? "opacity-100"
                                : "opacity-0"
                        })`}
                    >
                        <ProjectVideoCard
                            title={project.title}
                            client={project.client}
                            director={project.director || null}
                            image={project.image}
                            onClick={() => handleOpenModal()}
                            priority={index === 0}
                            isSingle={projects.length === 1}
                        />
                    </li>
                ))}
            </ul>
            <VideoModal isOpen={modalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default ProjectList;
