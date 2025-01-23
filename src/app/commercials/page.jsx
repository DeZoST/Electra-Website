"use client";

import ProjectList from "@/components/ProjectList/ProjectList";

export default function Commercials() {
    const jsonUrl =
        "https://electra-website-dusky.vercel.app/data/directors.json";

    return (
        <div className="p-4 mt-32 lg:p-8 lg:mt-60">
            <h1 className="text-xl font-bold text-orange-400 uppercase md:text-3xl">
                Commercials
            </h1>
            <ProjectList jsonUrl={jsonUrl} />
        </div>
    );
}
