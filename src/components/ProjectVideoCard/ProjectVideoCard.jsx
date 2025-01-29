"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectVideoCard({
    title,
    client,
    director,
    image,
    muxID,
    onClick,
    priority,
    isSingle,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const gifUrl = `https://image.mux.com/${muxID}/animated.webp?width=640&start=15`;

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsLoading(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsLoading(false);
    };

    const handleGifLoad = () => {
        setIsLoading(false);
    };

    return (
        <div
            className={`relative overflow-hidden cursor-pointer group ${
                isSingle ? "max-w-screen-xl mx-auto" : ""
            }`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-mux-id={muxID}
        >
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={400}
                    priority={priority}
                    className={`object-cover w-full transition-transform duration-300 group-hover:scale-110 ${
                        isHovered ? "opacity-0" : "opacity-100"
                    }`}
                />
                {isHovered && (
                    <>
                        {isLoading && (
                            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                                <div className="w-12 h-12 border-4 border-t-4 border-white rounded-full border-t-transparent animate-spin"></div>
                            </div>
                        )}
                        <Image
                            src={gifUrl}
                            alt={`${title} GIF`}
                            width={600}
                            height={400}
                            className="absolute top-0 left-0 object-cover w-full h-full"
                            onLoad={handleGifLoad}
                        />
                    </>
                )}
            </div>

            <div className="absolute bottom-0 left-0 flex items-center w-full gap-2 p-2 lg:p-4 text-[0.5rem] md:text-xs">
                <h3 className="text-gray-200 uppercase">{title}</h3>
                {client && " | "}
                <p className="font-bold text-white">
                    {client} {director && `| ${director}`}
                </p>
            </div>
        </div>
    );
}
