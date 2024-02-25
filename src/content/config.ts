import { defineCollection } from 'astro:content';
import { experienceSchema, projectSchema, skillSchema } from './types';

const experienceCollection = defineCollection({
  type: 'data',
  schema: experienceSchema,
});

const projectCollection = defineCollection({
  type: 'data',
  schema: projectSchema,
});

const skillCollection = defineCollection({
  type: 'data',
  schema: skillSchema,
});

export const collections = {
  experiences: experienceCollection,
  projects: projectCollection,
  skills: skillCollection,
};
