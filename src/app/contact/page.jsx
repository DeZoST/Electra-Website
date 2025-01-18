import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";

async function Contact() {
    const filePath = path.join(process.cwd(), "public/data/staff_list.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return (
        <section className="flex flex-col items-center justify-center gap-8 px-8 text-xs lg:justify-evenly lg:flex-row min-h-dvh">
            <ul className="flex flex-col gap-4 text-center">
                <h2 className="font-bold text-white uppercase ">Staff.</h2>
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
                <h2 className="font-bold text-white uppercase ">Reps.</h2>
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

export default Contact;
