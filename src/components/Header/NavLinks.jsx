import { TransitionLink } from "@/components/TransitionLink/TransitionLink";

const navLinks = [
    {
        name: "Work",
        href: "/work",
    },
    {
        name: "Contact",
        href: "/contact",
    },
];

function NavLinks({ handleNavigation, getLinkClass }) {
    return (
        <nav className="items-center hidden text-xs font-bold tracking-tight uppercase md:flex">
            <ul className="flex items-center uppercase group">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <TransitionLink
                            href={link.href}
                            className={`py-6 pl-6 transition-opacity duration-300 ${getLinkClass(
                                link.href
                            )}`}
                            onClick={() => handleNavigation(link.href)}
                        >
                            {link.name}
                        </TransitionLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavLinks;
