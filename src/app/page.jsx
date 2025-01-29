import HomeVideo from "@/components/HomeVideo/HomeVideo";

export const revalidate = 3600;

export default async function Home() {
    const videos = await fetch(
        `https://electra-website-dusky.vercel.app/data/home_video.json`,
        { next: { revalidate: 3600 } }
    ).then((res) => res.json());

    return <HomeVideo videos={videos} />;
}
