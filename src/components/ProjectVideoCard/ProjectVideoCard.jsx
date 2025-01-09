"use client";

import Image from "next/image";

export default function ProjectVideoCard({
    title,
    client,
    director,
    image,
    muxID,
}) {
    return (
        <div
            className="relative overflow-hidden group"
            key={muxID}
            data-mux-id={muxID}
        >
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    height={400}
                    width={600}
                    priority
                    className="object-cover w-full transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            <div className="absolute bottom-0 left-0 flex items-center w-full gap-2 p-4 text-xs ">
                <h3 className="text-gray-400 uppercase ">{title}</h3>
                {client && " | "}
                <p className="font-bold text-white ">
                    {client} {director && `| Directed by ${director}`}
                </p>
            </div>
        </div>
    );
}
