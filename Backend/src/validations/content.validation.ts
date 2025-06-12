import { z } from 'zod'

const sourceType = z.enum(['twitter', 'youtube', 'note'])

export const createContent = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        sourceType: sourceType,
        url: z.string().url('Invalid URL').optional(),
        contentText: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const updateContent = z.object({
    body: z.object({
      title: z.string().min(1, 'Title is required').optional(),
      sourceType: sourceType.optional(),
      url: z.string().url('Invalid URL').optional(),
      contentText: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const getContents = z.object({
    query: z.object({
      limit: z.preprocess(Number, z.number().min(1).max(100).default(10)),
      cursor: z.string().optional(),
    }),
});