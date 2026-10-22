import type { NextConfig } from "next";
const modo = process.env.NEXT_PUBLIC_MODO || "estatico";

const nextConfig: NextConfig = {
  output: modo === "estatico" ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
