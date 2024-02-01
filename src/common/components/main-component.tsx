import { ReactNode } from 'react'
import { useAuthStore } from '../../auth/store/auth-store'
import { UpdateIcon } from '@radix-ui/react-icons'
import { useRefreshToken } from '../../auth/hooks/refresh-token.hook'

type Props = {
  children: ReactNode
}

const Main = ({ children }: Props) => {
  const { data, isFetching, isSuccess } = useRefreshToken()

  if (isSuccess) {
    useAuthStore.setState({ accessToken: data.accessToken, user: data.user })
  }

  return isFetching ? (
    <div className="w-screen h-screen flex">
      <UpdateIcon className="m-auto animate-spin w-8 h-9" />
    </div>
  ) : (
    <>{children}</>
  )
}

export default Main
