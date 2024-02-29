/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreBuildErrors: true,
		ignoreDuringBuilds: true,
	},
	images: {
    	domains: ['res.cloudinary.com'],
  	},
}

module.exports = nextConfig
