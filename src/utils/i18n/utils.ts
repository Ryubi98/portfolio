import { prefixBase } from '@utils/global';
import TranslationsHandler from '@utils/i18n/TranslationsHandler';
import translations from '@utils/i18n/translations.json';

export type Lang = keyof typeof translations;
export type LangParams = {
  lang: Lang;
};
export type TranslatedMessage = Object[];

export const defaultLang: Lang = 'fr';
export const slugLangs: Lang[] = ['fr', 'en'];

const translationsHandler = new TranslationsHandler(translations, defaultLang);
export const useTranslations = translationsHandler.useTranslations;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.replace(prefixBase, '').split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getDestinationFromUrl(url: URL) {
  const [, , ...destination] = url.pathname.replace(prefixBase, '').split('/');
  return `/${destination.join('/')}`;
}

export function getUrlFromDestinationAndLang(destination: string, lang: Lang = defaultLang) {
  const destinationWithNoStartingSlash = destination.replace(/^\//, '');
  if (destinationWithNoStartingSlash.length === 0 || destinationWithNoStartingSlash.startsWith('#')) {
    return `${prefixBase}/${lang}${destinationWithNoStartingSlash}`;
  }
  return `${prefixBase}/${lang}/${destinationWithNoStartingSlash}`;
}

export async function getLangStaticPaths() {
  return slugLangs.map((lang) => ({
    params: { lang },
  }));
}
