import { Link } from 'react-router-dom'
import { ROUTER } from '../../common/const/router-keys.const'
import { Button } from '../../components/ui/button'

const DashboardPage = () => {
  return (
    <div className="space-x-4">
      <Button asChild>
        <Link to={ROUTER.DASHBOARD.BIKES}>Bikes</Link>
      </Button>
    </div>
  )
}
export default DashboardPage
