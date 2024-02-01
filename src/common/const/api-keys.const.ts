const AUTH = {
  INDEX: 'auth',
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in-jwt',
  REFRESH: 'refresh',
} as const

const BIKES = {
  INDEX: 'bikes',
} as const

export const API = {
  URL: 'http://localhost:3121/',
  AUTH,
  BIKES,
} as const
