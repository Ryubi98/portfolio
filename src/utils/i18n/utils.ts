import { translations } from "@utils/i18n/translations";
import { prefixBase } from "@utils/global";

export type LangParams = {
  lang: keyof typeof translations | undefined;
};

export const defaultLang = "fr" as keyof typeof translations;
export const languages = ["fr", "en"] as (keyof typeof translations)[];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.replace(prefixBase, "").split("/");
  if (lang in translations) return lang as keyof typeof translations;
  return undefined;
}

export function getUrlFromDestinationAndLang(
  destination: string,
  lang?: keyof typeof translations
) {
  const paths = [prefixBase, ...(lang ? [lang] : []), destination];
  return paths.join("/");
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    //@ts-ignore
    return translations[lang][key] || translations[defaultLang][key];
  };
}

export async function getLangStaticPaths() {
  return languages.map((lang) => ({
    params: { lang },
  }));
}
