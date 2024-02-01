const AUTH = {
  INDEX: 'auth',
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in',
} as const

const DASHBOARD = {
  INDEX: 'dashboard',
  BIKES: 'bikes',
} as const

export const ROUTER = {
  AUTH,
  DASHBOARD,
} as const
