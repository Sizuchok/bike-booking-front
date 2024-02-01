import { Navigate, Outlet } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '../../auth/store/auth-store'
import { ROUTER } from '../../common/const/router-keys.const'

const PublicRoute = () => {
  const { accessToken, user } = useAuthStore(
    useShallow(({ user, accessToken }) => ({ accessToken, user })),
  )

  if (accessToken && user) {
    return <Navigate to={`/${ROUTER.DASHBOARD.INDEX}`} replace />
  }

  return <Outlet />
}
export default PublicRoute
