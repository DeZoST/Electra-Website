import DesktopView from "@/components/HomeVideo/DesktopView";
import MobileView from "@/components/HomeVideo/MobileView";
import useIsMobile from "@/hooks/useIsMobile";

function VideoList({
    videos,
    activeVideoIndex,
    handleVideoChange,
    progressRefs,
    openModal,
}) {
    const isMobile = useIsMobile();

    return isMobile ? (
        <MobileView
            videos={videos}
            activeVideoIndex={activeVideoIndex}
            handleVideoChange={handleVideoChange}
            openModal={openModal}
        />
    ) : (
        <DesktopView
            videos={videos}
            activeVideoIndex={activeVideoIndex}
            progressRefs={progressRefs}
            handleVideoChange={handleVideoChange}
            openModal={openModal}
        />
    );
}

export default VideoList;
