"use client";

import { useState, useEffect } from "react";
import ProjectVideoCard from "@/components/ProjectVideoCard/ProjectVideoCard";
import VideoModal from "@/components/VideoModal/VideoModal";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const ProjectList = ({ projects, jsonUrl }) => {
    const [loadedIndexes, setLoadedIndexes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPlaybackId, setCurrentPlaybackId] = useState(null);
    const [fetchedProjects, setFetchedProjects] = useState([]);

    // Fetch the projects from the URL if jsonUrl is provided
    useEffect(() => {
        if (jsonUrl && !projects) {
            console.log("Fetching projects from:", jsonUrl);
            fetch(jsonUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Fetched data:", data);

                    // If the data has a structure with projects inside a "director" object
                    if (data[Object.keys(data)[0]].projects) {
                        // Flatten the projects from each director object
                        const allProjects = Object.values(data).flatMap(director => director.projects);
                        setFetchedProjects(allProjects);
                    } else {
                        // If it's a director without "projects" field (like Ze'ev Waismann), we treat it differently
                        const allProjects = Object.keys(data).map(directorKey => {
                            const director = data[directorKey];
                            return {
                                title: director.title,
                                client: director.title, // Assuming the title is the client name as well
                                image: director.image,
                                muxPlaybackId: director.muxPlaybackId
                            };
                        });
                        setFetchedProjects(allProjects);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching projects:", error);
                });
        } else if (projects) {
            setFetchedProjects(projects); // Use passed projects directly
        }
    }, [jsonUrl, projects]);

    useEffect(() => {
        setLoadedIndexes((prevIndexes) => [
            ...prevIndexes,
            ...Array.from(
                { length: fetchedProjects.length - prevIndexes.length },
                (_, i) => prevIndexes.length + i
            ),
        ]);
    }, [fetchedProjects]);

    const handleOpenModal = (muxID) => {
        setCurrentPlaybackId(muxID);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentPlaybackId(null);
        setModalOpen(false);
    };

    const gridClass =
        fetchedProjects.length === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2";

    return (
        <>
            <ul className={`grid gap-8 mt-4 md:mt-6 ${gridClass}`}>
                {fetchedProjects.length > 0 ? (
                    fetchedProjects.map((project, index) => (
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
                                muxID={project.muxPlaybackId}
                                onClick={() => handleOpenModal(project.muxPlaybackId)}
                            />
                        </li>
                    ))
                ) : (
                    <p>No projects available.</p>
                )}
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
