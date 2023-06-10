import { translations } from "@utils/i18n/translations";
import { isObjKey, prefixBase } from "@utils/global";

export type Lang = keyof typeof translations;
export type LangParams = {
  lang?: Lang;
};

export const defaultLang = "fr";
export const slugLang = [undefined, "fr", "en"];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.replace(prefixBase, "").split("/");
  if (lang in translations) return lang as Lang;
  return undefined;
}

export function getUrlFromDestinationAndLang(destination: string, lang?: Lang) {
  const paths = [prefixBase, ...(lang ? [lang] : []), destination];
  return paths.join("/");
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    if (isObjKey(key, translations[lang])) {
      return translations[lang][key];
    }
    return translations[defaultLang][key];
  };
}

export async function getLangStaticPaths() {
  return slugLang.map((lang) => ({
    params: { lang },
  }));
}
