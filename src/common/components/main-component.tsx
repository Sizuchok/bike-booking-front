import { UpdateIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import { useRefreshToken } from '../../auth/hooks/refresh-token.hook'
import { useAuthStore } from '../../auth/store/auth-store'

type Props = {
  children: ReactNode
}

const Main = ({ children }: Props) => {
  const { data, isFetching, isSuccess } = useRefreshToken()

  if (isSuccess) {
    const { accessToken, user } = data
    useAuthStore.setState({ accessToken, user })
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
