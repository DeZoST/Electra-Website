import { useEffect, useState } from "react";

function useRevealAnimation(isPageReady, direction = "top") {
    const [animationClass, setAnimationClass] = useState("reveal-hidden");

    useEffect(() => {
        if (isPageReady) {
            setAnimationClass(
                direction === "top"
                    ? "reveal-top-to-bottom"
                    : "reveal-bottom-to-top"
            );
        }
    }, [isPageReady, direction]);

    return animationClass;
}

export default useRevealAnimation;
