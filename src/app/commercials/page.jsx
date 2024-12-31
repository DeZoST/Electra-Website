"use client";

import ProjectList from "@/components/ProjectList/ProjectList";

export default function Commercials() {
    const jsonUrl =
        "https://electra-website-dusky.vercel.app/data/directors.json";

    return (
        <div className="p-8 mt-60">
            <h1 className="text-3xl font-bold text-orange-400 uppercase">
                Commercials
            </h1>
            <ProjectList jsonUrl={jsonUrl} />
        </div>
    );
}
