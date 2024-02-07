import { BookmarkFilledIcon, UpdateIcon } from '@radix-ui/react-icons'
import { Link, Outlet } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useSignOut } from '../../../auth/hooks/sign-out.book'
import { useAuthStore } from '../../../auth/store/auth-store'
import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { ROUTER } from '../../const/router-keys.const'

const PrimaryLayout = () => {
  const { user } = useAuthStore(useShallow(({ user }) => ({ user })))
  const { mutate, isPending } = useSignOut()

  if (isPending) {
    return (
      <div className="w-screen h-screen flex">
        <UpdateIcon className="m-auto animate-spin w-8 h-9" />
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-14 border-b flex items-center px-5 justify-between">
        <div>
          <Link to={`/${ROUTER.DASHBOARD.INDEX}`} className="flex items-center text-lg underline">
            <BookmarkFilledIcon className="size-5" />
            BikesB
          </Link>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>{user?.name.substring(0, 2) ?? '?'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.name ?? 'Acccount'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => mutate()}>LogOut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4 grow" style={{ height: `calc(100vh - ${56}px)` }}>
        <Outlet />
      </div>
    </div>
  )
}
export default PrimaryLayout
