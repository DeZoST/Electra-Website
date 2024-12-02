function Loader({ fadeOut }) {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center text-white transition-opacity duration-500 bg-black ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        ></div>
    );
}

export default Loader;
