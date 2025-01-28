export default async function fetchPaginatedData(jsonUrl) {
    const res = await fetch(jsonUrl, { next: { revalidate: 3600 } });
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

    return projects;
}
