"use client";

import ProjectList from "@/components/ProjectList/ProjectList";

export default function Narrative() {
    const jsonUrl =
        "https://electra-website-dusky.vercel.app/data/narrative.json";

    return (
        <div className="p-8 mt-60">
            <h1 className="text-3xl font-bold text-orange-400 uppercase">
                Narrative
            </h1>
            <ProjectList jsonUrl={jsonUrl} />
        </div>
    );
}
