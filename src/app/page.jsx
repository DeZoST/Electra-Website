import fs from "fs";
import path from "path";
import HomeVideo from "../components/HomeVideo/HomeVideo.jsx";

export default async function Home() {
    const filePath = path.join(
        process.cwd(),
        "public",
        "data",
        "home_video.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const videos = JSON.parse(fileContents);

    return (
        <>
            <HomeVideo videos={videos} />
        </>
    );
}
