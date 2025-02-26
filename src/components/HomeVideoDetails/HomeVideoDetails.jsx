import Image from "next/image";

function HomeVideoDetails({
    videos,
    activeVideoIndex,
    handleHover,
    progressRefs,
    revealClass,
    isLogoVisible,
    isLogoTranslated,
    openModal,
}) {
    return (
        <div className="container flex items-end justify-end w-full h-full">
            <ul className="grid grid-cols-3 grid-rows-2 pb-12 text-sm">
                <li>
                    <div
                        className={`overflow-hidden relative flex items-center justify-center w-full h-full transition-all ease-in-out ${
                            isLogoTranslated ? "top-0" : "-top-[500%]"
                        } `}
                        style={{
                            transition: `top 0.75s ease-in-out`,
                        }}
                    >
                        <Image
                            className={`z-50 p-4 pl-8 ${
                                isLogoVisible ? "opacity-100" : "opacity-0"
                            } transition-opacity duration-1000`}
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
                        className={`cursor-pointer py-4 pl-8 ${revealClass} ${
                            index === activeVideoIndex ? "hover:scale-105" : ""
                        }`}
                        onMouseEnter={() => handleHover(index)}
                        onClick={() => openModal(video.muxPlaybackId)}
                    >
                        <div>
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
                                    ref={(el) => {
                                        if (el)
                                            progressRefs.current[index] = el;
                                    }}
                                    className="absolute top-0 left-0 h-full bg-white"
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
