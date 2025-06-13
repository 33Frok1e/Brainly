import { z } from 'zod'

export const createTagValidation = z.object({
    body: z.object({
        name: z.string().min(1, 'Tag is required')
    }),
});