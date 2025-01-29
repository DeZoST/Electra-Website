import ProjectList from "@/components/ProjectList/ProjectList";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("@/components/Lightbox/Lightbox"), {
    ssr: true,
    loading: () => <div>Loading...</div>,
});

export async function generateStaticParams() {
    const res = await fetch(
        "https://electra-website-dusky.vercel.app/data/directors.json"
    );
    const directors = await res.json();
    return Object.keys(directors).map((name) => ({
        name: encodeURIComponent(name).toLowerCase(),
    }));
}

export async function generateMetadata({ params }) {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);
    return {
        title: `${decodedName} - Director`,
        description: `Discover projects by ${decodedName}.`,
    };
}

export default async function DirectorPage({ params }) {
    const { name } = await params;
    const decodedName = decodeURIComponent(name).toLowerCase();

    const res = await fetch(
        "https://electra-website-dusky.vercel.app/data/directors.json",
        { cache: "no-store" }
    );
    const directors = await res.json();

    const directorsNormalized = {};
    Object.keys(directors).forEach((key) => {
        directorsNormalized[key.toLowerCase()] = directors[key];
    });

    const director = directorsNormalized[decodedName];

    if (!director) {
        return (
            <div className="flex items-center justify-center text-white h-dvh">
                <p>Director not found</p>
            </div>
        );
    }

    const projects = director.projects.map((project) => ({
        ...project,
        director: director.name,
    }));

    return (
        <div className="p-4 mt-32 lg:p-8 lg:mt-60">
            <h1 className="flex items-center gap-4 text-xl font-bold text-orange-400 uppercase md:text-3xl">
                {director.name}
                <Lightbox
                    title={`${director.name} - Biography`}
                    trigger={
                        <svg
                            fill="#fb923c"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="inline transition-all cursor-pointer w-fit hover:fill-white "
                            width={32}
                            height={32}
                        >
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path d="M17.962,24.725l1.806,0.096v2.531h-7.534v-2.406l1.045-0.094c0.568-0.063,0.916-0.254,0.916-1.014v-8.801 c0-0.699-0.188-0.92-0.791-0.92l-1.106-0.062v-2.626h5.666L17.962,24.725L17.962,24.725z M15.747,4.648 c1.394,0,2.405,1.047,2.405,2.374c0,1.331-1.014,2.313-2.438,2.313c-1.454,0-2.404-0.982-2.404-2.313 C13.31,5.695,14.26,4.648,15.747,4.648z M16,32C7.178,32,0,24.822,0,16S7.178,0,16,0c8.82,0,16,7.178,16,16S24.82,32,16,32z M16,3 C8.832,3,3,8.832,3,16s5.832,13,13,13s13-5.832,13-13S23.168,3,16,3z"></path>
                                </g>
                            </g>
                        </svg>
                    }
                >
                    <p>{director.bio}</p>
                </Lightbox>
            </h1>
            <ProjectList projects={projects} />
        </div>
    );
}
