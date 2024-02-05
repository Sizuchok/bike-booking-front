const AUTH = {
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in',
  REFRESH: 'refresh-token',
  SIGN_OUT: 'sign-out',
} as const

const BIKES = {
  GET_ALL: 'get-all-bikes',
  CREATE_ONE: 'create-one-bike',
  UPDATE_ONE: 'update-one-bike',
} as const

export const QUERY = {
  AUTH,
  BIKES,
} as const
