import { z } from 'zod'
import { signInSchema } from '../schemas/sign-in.schema'
import { signUpSchema } from '../schemas/sign-up.schema'
import { User } from './user.types'

export type SignUp = z.infer<typeof signUpSchema>
export type SignUpToServer = Omit<SignUp, 'confirmPassword'>

export type SignIn = z.infer<typeof signInSchema>

export type SignInResponse = {
  user: User
  accessToken: string
}
