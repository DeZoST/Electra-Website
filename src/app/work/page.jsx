import ProjectList from "@/components/ProjectList/ProjectList";
import fetchPaginatedData from "@/utils/fetchPaginatedData";

export default async function Work() {
    const jsonUrl =
        "https://electra-website-dusky.vercel.app/data/directors.json";
    let projects = [];

    try {
        projects = await fetchPaginatedData(jsonUrl);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <section className="container mt-32 lg:mt-60">
            <h1 className="text-xl font-bold text-white uppercase md:text-3xl">
                Our Work
            </h1>
            <ProjectList projects={projects} />
        </section>
    );
}
