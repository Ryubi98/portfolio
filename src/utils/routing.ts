import { prefixBase } from '@utils/global';
import { defaultLang, type Lang } from '@utils/i18n/utils';

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
