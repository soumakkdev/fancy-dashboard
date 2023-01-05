import { z } from 'zod'

export const ZLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})
export type ILoginSchema = z.infer<typeof ZLoginSchema>

export const ZSignupSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	happy: z.boolean().optional(),
})
export type ISignupSchema = z.infer<typeof ZSignupSchema>
