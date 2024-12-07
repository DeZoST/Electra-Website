import { Suspense } from "react";
import ProjectVideoCard from "@/components/ProjectVideoCard/ProjectVideoCard";

export async function generateStaticParams() {
    const res = await fetch(
        "https://electra-website-dusky.vercel.app/data/directors.json"
    );
    const directors = await res.json();
    return Object.keys(directors).map((name) => ({
        name: encodeURIComponent(name),
    }));
}

export async function generateMetadata({ params }) {
    const { name } = params;
    const decodedName = decodeURIComponent(name);
    return {
        title: `${decodedName} - Director`,
        description: `Discover projects by ${decodedName}.`,
    };
}

export default async function DirectorPage({ params }) {
    const { name } = params;
    const decodedName = decodeURIComponent(name);

    // Fetch the directors data
    const res = await fetch(
        "https://electra-website-dusky.vercel.app/data/directors.json"
    );
    const directors = await res.json();

    const director = directors[decodedName];

    if (!director) {
        return (
            <div className="flex items-center justify-center text-white h-dvh">
                <p>Director not found</p>
            </div>
        );
    }

    return (
        <div className="p-8 mt-60 min-h-dvh">
            <h1 className="text-3xl font-bold text-orange-400 uppercase">
                {director.name}
            </h1>
            <p className="mt-2 text-lg text-gray-400">{director.role}</p>

            <Suspense fallback={<div>Loading projects...</div>}>
                <ul className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
                    {director.projects && director.projects.length > 0 ? (
                        director.projects.map((project, index) => (
                            <li key={index}>
                                <ProjectVideoCard
                                    title={project.title}
                                    client={project.client}
                                    image={project.image}
                                    videoUrl={project.videoUrl}
                                />
                            </li>
                        ))
                    ) : (
                        <p className="text-white">
                            No projects available for this director.
                        </p>
                    )}
                </ul>
            </Suspense>
        </div>
    );
}
