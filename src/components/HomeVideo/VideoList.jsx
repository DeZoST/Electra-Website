import DesktopView from "@/components/HomeVideo/DesktopView";
import MobileView from "@/components/HomeVideo/MobileView";
import useIsMobile from "@/hooks/useIsMobile";

function VideoList({
    videos,
    activeVideoIndex,
    handleVideoChange,
    progressRefs,
    revealClass,
    isLogoVisible,
    isLogoTranslated,
    openModal,
    isLoaderGone,
}) {
    const isMobile = useIsMobile();

    return isMobile ? (
        <MobileView
            videos={videos}
            activeVideoIndex={activeVideoIndex}
            handleVideoChange={handleVideoChange}
            openModal={openModal}
            isLoaderGone={isLoaderGone}
            revealClass={revealClass}
        />
    ) : (
        <DesktopView
            videos={videos}
            activeVideoIndex={activeVideoIndex}
            progressRefs={progressRefs}
            handleVideoChange={handleVideoChange}
            revealClass={revealClass}
            isLogoVisible={isLogoVisible}
            isLogoTranslated={isLogoTranslated}
            openModal={openModal}
            isLoaderGone={isLoaderGone}
        />
    );
}

export default VideoList;
