/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["image.mux.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.mux.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
