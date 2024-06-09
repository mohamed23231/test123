/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_API_BASE_URL: "https://goride.e-diamond.pro/api",
	},
};

export default nextConfig;
