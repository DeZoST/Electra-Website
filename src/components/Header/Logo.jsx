import Image from "next/image";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";

function Logo({ handleNavigation }) {
    return (
        <TransitionLink href="/" onClick={() => handleNavigation("/")}>
            <Image
                src={`/images/Bolt_Star_White.svg`}
                alt={`Bolt Star White Logo`}
                width={32}
                height={53}
                style={{ width: "32px", height: "53px" }}
                priority
            />
        </TransitionLink>
    );
}

export default Logo;
