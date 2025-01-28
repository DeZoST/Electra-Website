import ProjectList from "@/components/ProjectList/ProjectList";
import fetchPaginatedData from "@/utils/fetchPaginatedData";

export default async function Narrative() {
    const jsonUrl =
        "https://electra-website-dusky.vercel.app/data/narrative.json";
    let projects = [];

    try {
        projects = await fetchPaginatedData(jsonUrl);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <div className="p-4 mt-32 lg:p-8 lg:mt-60">
            <h1 className="text-xl font-bold text-orange-400 uppercase md:text-3xl">
                Narrative
            </h1>
            <ProjectList projects={projects} />
        </div>
    );
}
