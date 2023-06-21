import { isObjKey } from '@utils/global';

type Translations = { [lang: string]: { [langKey: string]: string } };
type Lang<Translations> = keyof Translations;

export default class TranslationsHandler<T extends Translations> {
  private translations: T;
  private defaultLang: Lang<T>;

  constructor(translations: T, defaultLang: Lang<T>) {
    this.translations = translations;
    this.defaultLang = defaultLang;
  }

  useTranslations = (lang: Lang<T>) => {
    const translations = this.translations;
    const defaultLang = this.defaultLang;

    return function t(key: string, replace: { [key: string]: Object } = {}) {
      const result: Object[] | null = isObjKey(key, translations[lang])
        ? [translations[lang][key]]
        : isObjKey(key, translations[defaultLang])
        ? [translations[defaultLang][key]]
        : null;

      if (!result) {
        throw new Error(`${key} is not a valid key.`);
      }

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
  };
}
