import { useTranslations, type Lang } from './i18n/utils';

export function dateToShortMonthYear(date: Date | 'today', currentLang: Lang) {
  const t = useTranslations(currentLang);
  if (date === 'today') {
    return t('utils.date.today');
  }

  const formatter = new Intl.DateTimeFormat(currentLang, {
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(date);
}
