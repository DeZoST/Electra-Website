import Image from "next/image";
import { useEffect, useState } from "react";

function HomeVideoDetails({
    videos,
    activeVideoIndex,
    handleHover,
    progressRefs,
    revealClass,
}) {
    const [isLogoAnimating, setIsLogoAnimating] = useState(false);

    useEffect(() => {
        const handlePageReady = () => {
            setIsLogoAnimating(true); // Trigger animation when page is ready
        };

        // Listen for the "pageReady" event
        window.addEventListener("pageReady", handlePageReady);

        return () => {
            window.removeEventListener("pageReady", handlePageReady);
        };
    }, []);

    return (
        <div className="flex items-end justify-end w-full h-full">
            <ul className="grid grid-cols-3 grid-rows-2 p-12 text-sm">
                {/* Logo */}
                <li className="flex items-center justify-center">
                    <Image
                        className={`relative z-50 p-4 transition-all duration-1000 ease-in-out 
                            ${
                                isLogoAnimating
                                    ? "translate-y-0 top-0"
                                    : "translate-y-[100%] top-[-479px]"
                            }`}
                        src="/images/Electra_White.svg"
                        alt="Electra logo"
                        width={320}
                        height={85}
                        style={{
                            position: "relative",
                        }}
                    />
                </li>

                {/* Video List */}
                {videos.map((video, index) => (
                    <li
                        key={index}
                        className={`relative cursor-pointer transition-transform duration-300 min-w-80 p-4 ${revealClass} ${
                            index === activeVideoIndex ? "hover:scale-105" : ""
                        }`}
                        onMouseEnter={() => handleHover(index)}
                    >
                        <div className="relative">
                            <h2 className="text-gray-300">
                                {video.title}
                                {" | "}
                                <span className="text-gray-100">
                                    {video.brand}
                                </span>
                            </h2>

                            <h3 className="text-gray-400">{video.director}</h3>

                            <div className="relative w-full h-[1px] bg-white/20">
                                <div
                                    ref={(el) =>
                                        (progressRefs.current[index] = el)
                                    }
                                    className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
                                ></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomeVideoDetails;
