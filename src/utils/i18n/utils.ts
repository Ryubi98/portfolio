import { isObjKey } from '@utils/global';
import translations from './translations.json';

export type Lang = keyof typeof translations;
export type LangParams = {
  lang: Lang;
};

export const defaultLang = 'fr';
export const slugLangs = Object.keys(translations) as Lang[];

export async function getLangStaticPaths() {
  return slugLangs.map((lang) => ({
    params: { lang },
  }));
}
export type TranslatedMessagePart = string | object;
export type TranslatedMessage = TranslatedMessagePart[];

export function useTranslations(lang: Lang) {
  return function t(
    key: keyof (typeof translations)[typeof defaultLang],
    replace: Record<string, TranslatedMessagePart> = {}
  ) {
    const result: TranslatedMessage = [
      isObjKey(key, translations[lang]) ? translations[lang][key] : translations[defaultLang][key],
    ];

    Object.entries(replace).forEach(([replaceKey, replaceValue]: [string, TranslatedMessagePart]) => {
      result.forEach((value: TranslatedMessagePart, index: number) => {
        // even values in result are string literals
        // odd values in result are injected from replace object parameter
        // only iterate on even values (should always be a string), we do not want to touch replaced values
        if (index % 2 === 1 || typeof value !== 'string') return;

        const arrayWithoutReplaceKey = value.split(`{${replaceKey}}`);
        const arrayWithReplaceValue = arrayWithoutReplaceKey.reduce(
          (accumulator: TranslatedMessage, value: TranslatedMessagePart, index: number) => [
            ...accumulator,
            value,
            ...(index < arrayWithoutReplaceKey.length - 1 ? [replaceValue] : []),
          ],
          []
        );
        result.splice(index, 1, ...arrayWithReplaceValue);
      });
    });
    return result;
  };
}
