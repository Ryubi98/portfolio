import translations from '@utils/i18n/translations.json';
import TranslationsHandler from '@utils/i18n/TranslationsHandler';
import { prefixBase } from '@utils/global';

export type Lang = keyof typeof translations;
export type LangParams = {
  lang: Lang;
};

export const defaultLang: Lang = 'fr';
export const slugLang: Lang[] = ['fr', 'en'];

const translationsHandler = new TranslationsHandler(translations, defaultLang);
export const useTranslations = translationsHandler.useTranslations;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.replace(prefixBase, '').split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getUrlFromDestinationAndLang(destination: string, lang: Lang = defaultLang) {
  const destinationWithNoStartingSlash = destination.replace(/^\//, '');
  const paths = [prefixBase, lang, ...(destination ? [destinationWithNoStartingSlash] : [])];
  return paths.join('/');
}

export async function getLangStaticPaths() {
  return slugLang.map((lang) => ({
    params: { lang },
  }));
}
