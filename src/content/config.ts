import { defineCollection } from 'astro:content';
import { experienceSchema, labSchema, projectSchema, skillSchema } from './types';

const experienceCollection = defineCollection({
  type: 'data',
  schema: experienceSchema,
});

const labCollection = defineCollection({
  type: 'content',
  schema: labSchema,
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
  lab: labCollection,
  projects: projectCollection,
  skills: skillCollection,
};
