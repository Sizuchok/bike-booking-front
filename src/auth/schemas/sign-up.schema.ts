import { z } from 'zod'

export const signUpSchemaForReference = z.object({
  name: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
})

export const signUpSchema = signUpSchemaForReference.refine(
  data => data.password === data.confirmPassword,
  {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  },
)
