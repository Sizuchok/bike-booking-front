const AUTH = {
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in',
  REFRESH: 'refresh-token',
} as const

const BIKES = {
  GET_ALL: 'get-all-bikes',
} as const

export const QUERY = {
  AUTH,
  BIKES,
} as const
