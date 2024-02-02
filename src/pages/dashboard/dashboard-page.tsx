import { Link } from 'react-router-dom'
import { useAuthStore } from '../../auth/store/auth-store'
import { ROUTER } from '../../common/const/router-keys.const'
import { Button } from '../../components/ui/button'

const DashboardPage = () => {
  return (
    <div className="space-x-4">
      <Button asChild>
        <Link to={ROUTER.DASHBOARD.BIKES}>Bikes</Link>
      </Button>
      <Button
        onClick={() => {
          useAuthStore.setState({ accessToken: undefined, user: undefined })
        }}
      >
        Log out
      </Button>
    </div>
  )
}
export default DashboardPage
