import type { AstroI18nextConfig } from "astro-i18next";

export default {
  defaultLocale: "fr",
  locales: ["fr", "en"],
  showDefaultLocale: false,
  defaultNamespace: "index",
  namespaces: ["index", "about"],
} as AstroI18nextConfig;
