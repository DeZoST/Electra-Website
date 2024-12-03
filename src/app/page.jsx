import HomeVideo from "@/components/HomeVideo/HomeVideo";

export const revalidate = 3600;

export default async function Home() {
    const res = await fetch(`http://localhost:3000/data/home_video.json`);
    const videos = await res.json();

    return <HomeVideo videos={videos} />;
}
