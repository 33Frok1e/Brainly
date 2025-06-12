import { z } from 'zod'

export const createShareLink = z.object({
    body: z.object({
        contentId: z.array(z.string()).min(1, 'At least one content ID is required')
    }),
});