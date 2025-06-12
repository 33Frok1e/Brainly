import { z } from 'zod'

export const createTag = z.object({
    body: z.object({
        name: z.string().min(1, 'Tag is required')
    }),
});