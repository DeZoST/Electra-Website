"use client";

import Image from "next/image";

export default function ProjectVideoCard({
    title,
    client,
    director,
    image,
    muxID,
    onClick,
}) {
    return (
        <div
            className="relative overflow-hidden group cursor-pointer"
            onClick={onClick}
            data-mux-id={muxID}
        >
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    width={1280}
                    height={720}
                    className="object-cover w-full transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            <div className="absolute bottom-0 left-0 flex items-center w-full gap-2 p-2 lg:p-4 text-[0.5rem] md:text-xs ">
                <h3 className="text-gray-200 uppercase ">{title}</h3>
                {client && " | "}
                <p className="font-bold text-white ">
                    {client} {director && `| ${director}`}
                </p>
            </div>
        </div>
    );
}
