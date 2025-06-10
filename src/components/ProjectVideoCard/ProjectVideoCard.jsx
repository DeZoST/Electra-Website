"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectVideoCard({
    title,
    client,
    director,
    image,
    onClick,
    priority,
    isSingle,
}) {
    const [isGifLoaded, setIsGifLoaded] = useState(false);
    const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);

    const handleThumbnailLoad = () => {
        setIsThumbnailLoaded(true);
    };

    return (
        <div
            className={`relative overflow-hidden cursor-pointer group ${
                isSingle ? "max-w-screen-xl mx-auto" : ""
            } ${isThumbnailLoaded ? "reveal-thumbnails" : "opacity-0"}`}
            onClick={onClick}
        >
            <div className="relative h-full">
                <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={562}
                    priority={priority}
                    className={`object-cover w-full transition-transform duration-300 group-hover:scale-110`}
                    onLoad={handleThumbnailLoad}
                />
            </div>

            <div className="absolute bottom-0 left-0 flex items-center gap-2 p-2 lg:p-4 text-[0.5rem] md:text-xs">
                <h3 className="text-gray-200 uppercase">{title}</h3>
                {client && " | "}
                <p className="font-bold text-white">
                    {client} {director && `| ${director}`}
                </p>
            </div>
        </div>
    );
}
