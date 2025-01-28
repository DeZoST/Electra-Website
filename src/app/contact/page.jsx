import Image from "next/image";

export default async function Contact() {
    const jsonUrl =
        "https://electra-website-dusky.vercel.app/data/staff_list.json";
    let data = { Staff: [], Reps: [] };

    try {
        const res = await fetch(jsonUrl, { cache: "no-store" });
        data = await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <section className="flex flex-col items-center justify-center gap-8 px-8 text-xs lg:justify-evenly lg:flex-row min-h-dvh">
            <ul className="flex flex-col gap-4 text-center">
                <h2 className="font-bold text-white uppercase">Staff.</h2>
                {data.Staff.map((staff, index) => (
                    <li key={index}>
                        <ul className="text-gray-400">
                            <li className="uppercase">{staff.role}</li>
                            <li className="text-white">{staff.name}</li>
                            <li>
                                <a href={`mailto:${staff.email}`}>
                                    {staff.email}
                                </a>
                            </li>
                            <li>{staff.phone}</li>
                        </ul>
                    </li>
                ))}
            </ul>
            <div className="w-full max-w-md">
                <Image
                    className="object-contain w-full"
                    width={100}
                    height={100}
                    src={"/images/Electra_White.svg"}
                    alt="Electra logo"
                />
            </div>

            <ul className="flex flex-col gap-4 text-center">
                <h2 className="font-bold text-white uppercase">Reps.</h2>
                {data.Reps.map((rep, index) => (
                    <li key={index}>
                        <ul className="text-gray-400">
                            <li className="uppercase">{rep.location}</li>
                            <li className="text-white">{rep.name}</li>
                            <li>
                                <a href={`mailto:${rep.email}`}>{rep.email}</a>
                            </li>
                            <li>{rep.phone}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}
