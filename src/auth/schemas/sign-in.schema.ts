import { signUpSchemaForReference } from './sign-up.schema'

export const signInSchema = signUpSchemaForReference.omit({ confirmPassword: true, name: true })
