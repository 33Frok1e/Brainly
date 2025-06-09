import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const contentSchema = z.object({
  title: z.string().min(1).max(100),
  sourceType: z.enum(['twitter', 'youtube', 'gdocs', 'note']),
  url: z.string().url().optional(),
  contentText: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const shareSchema = z.object({
  contentIds: z.array(z.string()),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ContentInput = z.infer<typeof contentSchema>;
export type ShareInput = z.infer<typeof shareSchema>;