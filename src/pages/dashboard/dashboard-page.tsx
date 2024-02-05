import { UpdateIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import { useSignOut } from '../../auth/hooks/sign-out.book'
import { ROUTER } from '../../common/const/router-keys.const'
import { Button } from '../../components/ui/button'

const DashboardPage = () => {
  const { mutate, isPending } = useSignOut()

  if (isPending) {
    return (
      <div className="w-screen h-screen flex">
        <UpdateIcon className="m-auto animate-spin w-8 h-9" />
      </div>
    )
  }

  return (
    <div className="space-x-4">
      <Button asChild>
        <Link to={ROUTER.DASHBOARD.BIKES}>Bikes</Link>
      </Button>
      <Button onClick={() => mutate()}>Log out</Button>
    </div>
  )
}
export default DashboardPage
