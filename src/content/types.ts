import translations from '@utils/i18n/translations.json';
import { defaultLang, type TranslationKey } from '@utils/i18n/utils';
import { z } from 'astro:content';

export const experienceSchema = z.object({
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date().or(z.literal('today')),
  img: z.string(),
  imgAlt: z.string(),
  title: z.string(),
  contentTranslationKey: z.custom<TranslationKey>(
    (value) => typeof value === 'string' && value in translations[defaultLang]
  ),
  technologies: z.array(z.object({ icon: z.string(), name: z.string() })).optional(),
  links: z.array(z.object({ icon: z.string(), href: z.string() })).optional(),
});
export type Experience = z.infer<typeof experienceSchema>;

export const labSchema = z.object({
  date: z.coerce.date(),
  title: z.string(),
  descriptionTranslationKey: z.custom<TranslationKey>(
    (value) => typeof value === 'string' && value in translations[defaultLang]
  ),
});
export type Lab = z.infer<typeof labSchema>;

export const projectSchema = z.object({
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date().or(z.literal('today')),
  img: z.string(),
  imgAlt: z.string(),
  title: z.string(),
  contentTranslationKey: z.custom<TranslationKey>(
    (value) => typeof value === 'string' && value in translations[defaultLang]
  ),
  technologies: z.array(z.object({ icon: z.string(), name: z.string() })).optional(),
  links: z.array(z.object({ icon: z.string(), href: z.string() })).optional(),
});
export type Project = z.infer<typeof projectSchema>;
