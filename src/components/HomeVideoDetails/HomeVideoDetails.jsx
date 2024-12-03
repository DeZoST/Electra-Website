import Image from "next/image";
import { useEffect, useState } from "react";

function HomeVideoDetails({
    videos,
    activeVideoIndex,
    handleHover,
    progressRefs,
    revealClass,
}) {
    const [isFadedIn, setIsFadedIn] = useState(false);
    const [isTranslated, setIsTranslated] = useState(false);

    useEffect(() => {
        setIsFadedIn(true);

        const translationTimeout = setTimeout(() => {
            setIsTranslated(true);
        }, 1000);

        return () => clearTimeout(translationTimeout);
    }, []);

    return (
        <div className="flex items-end justify-end w-full h-full">
            <ul className="relative grid grid-cols-3 grid-rows-2 p-12 text-sm">
                <li
                    className={`relative flex items-center justify-center z-50`}
                    style={{
                        transform: isTranslated
                            ? "translateY(0)"
                            : "translateY(0)",
                        position: "relative",
                        opacity: isFadedIn ? 1 : 0,
                        transition: `
                            opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), 
                            transform 1s cubic-bezier(0.22, 1, 0.36, 1)`,
                    }}
                >
                    <Image
                        src="/images/Electra_White.svg"
                        alt="Electra logo"
                        width={320}
                        height={85}
                        loading="eager"
                        priority
                        className="z-50"
                    />
                </li>

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
