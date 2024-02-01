import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const FormBox = ({ children }: Props) => {
  return <div className="w-96 px-12 py-7 border rounded-[0.5rem]">{children}</div>
}
export default FormBox
