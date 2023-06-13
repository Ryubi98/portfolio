import { translations } from '@utils/i18n/translations';
import { isObjKey, prefixBase } from '@utils/global';

export const defaultLang = 'fr';
export const slugLang = ['fr', 'en'];

export type Lang = keyof typeof translations;
export type LangKey = keyof (typeof translations)[typeof defaultLang];
export type LangParams = {
  lang: Lang;
};

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.replace(prefixBase, '').split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getUrlFromDestinationAndLang(destination: string, lang: Lang = defaultLang) {
  const paths = [prefixBase, lang, ...(destination ? [destination] : [])];
  console.log(paths.join('/'));
  return paths.join('/');
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof translations)[typeof defaultLang], replace: { [key: string]: Object } = {}) {
    const result: Object[] = isObjKey(key, translations[lang])
      ? [translations[lang][key]]
      : [translations[defaultLang][key]];

    Object.entries(replace).forEach(([replaceKey, replaceValue]: [string, Object]) => {
      result.forEach((value: Object, index: number) => {
        // even values in result are string litterals
        // odd values in result are injected from replace object parameter
        // only iterate on even values, we do not want to touch replaced values
        if (index % 2 !== 0) return;

        const arrayWithoutReplaceKey = value.toString().split(`{${replaceKey}}`);
        const arrayWithReplaceValue = arrayWithoutReplaceKey.reduce(
          (accumulator: Object[], value: string, index: number) => [
            ...accumulator,
            value,
            ...(arrayWithoutReplaceKey.length - 1 === index ? [] : [replaceValue]),
          ],
          []
        );
        result.splice(index, 1, ...arrayWithReplaceValue);
      });
    });

    return result;
  };
}

export async function getLangStaticPaths() {
  return slugLang.map((lang) => ({
    params: { lang },
  }));
}
