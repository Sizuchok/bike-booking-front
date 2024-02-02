import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '../../auth/store/auth-store'
import { ROUTER } from '../../common/const/router-keys.const'

const ProtectedRoute = () => {
  const location = useLocation()

  const { accessToken, user } = useAuthStore(
    useShallow(({ user, accessToken }) => ({ accessToken, user })),
  )

  return (
    <>
      {accessToken && user ? (
        <Outlet />
      ) : (
        <Navigate
          to={`/${ROUTER.AUTH.INDEX}/${ROUTER.AUTH.SIGN_IN}`}
          state={{ from: location }}
          replace
        />
      )}
    </>
  )
}

export default ProtectedRoute
