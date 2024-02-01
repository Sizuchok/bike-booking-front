import { Id } from '../../common/types/Id.type'
import { SignUpToServer } from './auth.types'

export type User = Id & Omit<SignUpToServer, 'password'>
