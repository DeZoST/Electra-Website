function Loader({ fadeOut }) {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${
                fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        ></div>
    );
}

export default Loader;
