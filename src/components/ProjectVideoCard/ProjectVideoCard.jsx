import Image from "next/image";

export default function ProjectVideoCard({ title, client, image, muxID }) {
    return (
        <div
            className="relative overflow-hidden group"
            key={muxID}
            data-mux-id={muxID}
        >
            <div className="relative w-full min-h-96">
                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            <div className="absolute bottom-0 left-0 flex items-center w-full gap-2 p-4 text-xs bg-black/30">
                <h3 className="text-gray-400 uppercase ">{title}</h3>
                {" | "}
                <p className="font-bold text-white ">{client}</p>
            </div>
        </div>
    );
}
