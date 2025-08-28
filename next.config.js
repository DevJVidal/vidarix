/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/vidarix", 
  assetPrefix: "/vidarix/",
};

module.exports = nextConfig;
