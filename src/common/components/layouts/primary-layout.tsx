import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { Link, Outlet } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '../../../auth/store/auth-store'
import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import { ROUTER } from '../../const/router-keys.const'

const PrimaryLayout = () => {
  const { user } = useAuthStore(useShallow(({ user }) => ({ user })))

  return (
    <div className="w-screen h-screen">
      <div className="h-14 border-b flex items-center px-5 justify-between">
        <div>
          <Link to={`/${ROUTER.DASHBOARD.INDEX}`} className="flex items-center text-lg underline">
            <BookmarkFilledIcon className="size-5" />
            BikesB
          </Link>
        </div>

        <div>
          <Avatar>
            <AvatarFallback>{user?.name.substring(0, 2) ?? '?'}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="px-10 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
export default PrimaryLayout
