"use client";

import { useState, useEffect } from "react";
import ProjectVideoCard from "@/components/ProjectVideoCard/ProjectVideoCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const ProjectList = ({ jsonUrl }) => {
    const {
        data: projects,
        isLoading,
        lastElementRef,
    } = useInfiniteScroll(jsonUrl);
    const [loadedIndexes, setLoadedIndexes] = useState([]);

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

    return (
        <ul className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
            {projects.map((project, index) => {
                const isLastElement = index === projects.length - 1;

                return (
                    <li
                        key={index}
                        ref={isLastElement ? lastElementRef : null}
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
                        />
                    </li>
                );
            })}
            {isLoading && <p>Loading more projects...</p>}
        </ul>
    );
};

export default ProjectList;
