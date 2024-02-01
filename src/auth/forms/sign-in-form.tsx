/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { API } from '../../common/const/api-keys.const'
import { ROUTER } from '../../common/const/router-keys.const'
import { Button } from '../../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { useSignIn } from '../hooks/sign-in.hook'
import { signInSchema } from '../schemas/sign-in.schema'
import { useAuthStore } from '../store/auth-store'
import { SignIn } from '../types/auth.types'

const SignInForm = () => {
  const { mutate, isSuccess, isPending, data } = useSignIn()

  const { setAccessToken, setUser } = useAuthStore(
    useShallow(({ setAccessToken, setUser }) => ({ setAccessToken, setUser })),
  )

  const navigate = useNavigate()

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: SignIn) => {
    mutate(data)
  }

  const { control, handleSubmit } = form

  useEffect(() => {
    if (isSuccess) {
      setUser(data.user)
      setAccessToken(data.accessToken)

      navigate(`/${ROUTER.DASHBOARD.INDEX}`)
    }
  }, [isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                wait up
              </>
            ) : (
              'Sign in'
            )}
          </Button>
          <Button type="button" disabled={isPending} variant="outline" asChild>
            <Link to={`../${API.AUTH.SIGN_UP}`}>I don't have an account</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm
