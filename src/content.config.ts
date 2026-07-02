import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Associated Insurance Agency'),
    draft: z.boolean().default(false),
  }),
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
    rating: z.number().min(1).max(5).default(5),
  }),
});

export const collections = {
  blog: blogCollection,
  testimonials: testimonialsCollection,
};
