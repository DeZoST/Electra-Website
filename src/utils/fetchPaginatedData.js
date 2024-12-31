export default async function fetchPaginatedData(jsonUrl, page, limit) {
    const res = await fetch(jsonUrl, { cache: "no-store" });
    const data = await res.json();

    let projects = [];
    if (jsonUrl.includes("directors")) {
        for (const director in data) {
            projects = [
                ...projects,
                ...data[director].projects.map((project) => ({
                    ...project,
                    director: data[director].name || null,
                })),
            ];
        }
    } else {
        projects = Object.values(data).map((project) => ({
            ...project,
            director: null,
        }));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProjects = projects.slice(startIndex, endIndex);

    return paginatedProjects;
}
