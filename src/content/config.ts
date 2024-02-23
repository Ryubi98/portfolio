import { defineCollection, z } from 'astro:content';

const experiencesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().or(z.literal('today')),
    img: z.string(),
    imgAlt: z.string(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().or(z.literal('today')),
    img: z.string(),
    imgAlt: z.string(),
  }),
});

const skillsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    list: z.array(
      z.object({
        icon: z.string(),
        name: z.string(),
      })
    ),
  }),
});

export const collections = {
  experiences: experiencesCollection,
  projects: projectsCollection,
  skills: skillsCollection,
};
