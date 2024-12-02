import { useEffect, useState } from "react";

/**
 * Custom hook to add reveal animations based on the `isPageReady` state.
 * @param {boolean} isPageReady - When true, triggers the animation.
 * @param {string} direction - Direction of the reveal: 'top' or 'bottom'.
 * @returns {string} - The CSS class to be applied for the animation.
 */
function useRevealAnimation(isPageReady, direction = "top") {
    const [animationClass, setAnimationClass] = useState("reveal-hidden");

    useEffect(() => {
        if (isPageReady) {
            const revealClass =
                direction === "top"
                    ? "reveal-top-to-bottom"
                    : "reveal-bottom-to-top";
            setAnimationClass(revealClass);
        }
    }, [isPageReady, direction]);

    return animationClass;
}

export default useRevealAnimation;
