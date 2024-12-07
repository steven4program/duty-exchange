import type { NextConfig } from "next";
import { LANGUAGES } from "@/constant/languages";

const nextConfig: NextConfig = {
  locales: LANGUAGES,
  defaultLocale: LANGUAGES.TC,
};

export default nextConfig;
