import { Navigate, createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../auth/components/layout/auth-layout'
import PrimaryLayout from '../common/components/layouts/primary-layout'
import { ROUTER } from '../common/const/router-keys.const'
import SignInPage from './auth/sign-in-page'
import SignUpPage from './auth/sign-up-page'
import BikesPage from './dashboard/bikes-page'
import DashboardPage from './dashboard/dashboard-page'
import ProtectedRoute from './hocs/protected-route'
import PublicRoute from './hocs/public-route'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${ROUTER.DASHBOARD.INDEX}`} />,
      },
      {
        path: ROUTER.AUTH.INDEX,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTER.AUTH.SIGN_UP,
            element: <SignUpPage />,
          },
          {
            path: ROUTER.AUTH.SIGN_IN,
            element: <SignInPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTER.DASHBOARD.INDEX,
        element: <PrimaryLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: ROUTER.DASHBOARD.BIKES,
            element: <BikesPage />,
          },
        ],
      },
    ],
  },
])
