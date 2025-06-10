import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import useRevealAnimation from "@/hooks/useRevealAnimation";
import useIsMobile from "@/hooks/useIsMobile";

function HomeVideoDetails({
    videos,
    activeVideoIndex,
    handleHover,
    progressRefs,
    openModal,
}) {
    const isMobile = useIsMobile();
    const [isLogoVisible, setIsLogoVisible] = useState(false);
    const [isLogoTranslated, setIsLogoTranslated] = useState(false);
    const [isLoaderGone, setIsLoaderGone] = useState(false);
    const [hasVisited, setHasVisited] = useState(false);

    const revealClass = useRevealAnimation(isLoaderGone, "bottom");

    const fadeOutLogoLoader = useCallback(() => {
        setTimeout(() => {
            setIsLoaderGone(true);
            window.dispatchEvent(new CustomEvent("logoTranslated"));
        }, 1000);
    }, []);

    const triggerLogoRevealSequence = useCallback(() => {
        setTimeout(() => {
            setIsLogoVisible(true);
            console.log("isLogoVisible is now true");
            setTimeout(() => {
                setIsLogoTranslated(true);
                console.log("isLogoTranslated is now true");
                setTimeout(() => fadeOutLogoLoader(), 500);
                console.log("fadeOutLogoLoader is now set");
            }, 1000);
        }, 500);
    }, [fadeOutLogoLoader]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasVisited = sessionStorage.getItem("hasVisited");
            setHasVisited(!!hasVisited);

            if (hasVisited) {
                setIsLogoVisible(true);
                setIsLogoTranslated(true);
                setIsLoaderGone(true);
            } else {
                if (!isMobile) {
                    triggerLogoRevealSequence();
                } else {
                    setIsLoaderGone(true);
                }
            }
        }
    }, [triggerLogoRevealSequence, isMobile]);

    return (
        <>
            <div
                className={`container flex items-end justify-end w-full h-full `}
            >
                <ul className="grid grid-cols-3 grid-rows-2 pb-12 text-sm">
                    <li>
                        <div
                            className={`overflow-hidden relative z-50 flex items-center justify-center w-full h-full ${
                                hasVisited
                                    ? `${revealClass}`
                                    : "transition-all duration-1000 ease-in-out"
                            } ${isLogoTranslated ? "top-0" : "-top-[30dvh]"} ${
                                isLogoVisible ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <Image
                                className={`z-50 p-4 pl-8`}
                                src="/images/Electra_White.svg"
                                alt="Electra logo"
                                width={320}
                                height={85}
                                priority
                            />
                        </div>
                    </li>

                    {videos.map((video, index) => (
                        <li
                            key={video.id || index}
                            className={`cursor-pointer py-4 pl-8 transition-transform translate-y-0 ${revealClass}`}
                            onMouseEnter={() => handleHover(index)}
                            onClick={() => openModal()}
                        >
                            <div>
                                <h2 className="text-gray-300">
                                    {video.title}
                                    {" | "}
                                    <span className="text-gray-100">
                                        {video.brand}
                                    </span>
                                </h2>

                                <h3 className="text-gray-400">
                                    {video.director}
                                </h3>

                                <div className="relative w-full h-[1px] bg-white/20">
                                    <div
                                        ref={(el) => {
                                            if (el)
                                                progressRefs.current[index] =
                                                    el;
                                        }}
                                        className="absolute top-0 left-0 h-full translate-y-0 bg-white opacity-100"
                                    ></div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default HomeVideoDetails;
