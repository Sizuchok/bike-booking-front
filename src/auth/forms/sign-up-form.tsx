import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { API } from '../../common/const/api-keys.const'
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
import { useSignUp } from '../hooks/sign-up.hook'
import { signUpSchema } from '../schemas/sign-up.schema'
import { SignUp } from '../types/auth.types'

const SignUpForm = () => {
  const { mutate, isSuccess, isPending } = useSignUp()

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    reValidateMode: 'onChange',
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = ({ confirmPassword, ...data }: SignUp) => {
    mutate({ ...data })
  }

  const { control, handleSubmit } = form

  if (isSuccess) {
    return <Navigate to={`../${API.AUTH.SIGN_IN}`} />
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input type="password" placeholder="Enter strong password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" disabled={isPending}>
            {isPending ? <ReloadIcon className="animate-spin" /> : 'Sign up'}
          </Button>
          <Button type="button" disabled={isPending} variant="outline" asChild>
            <Link to={`../${API.AUTH.SIGN_IN}`}>I have an account</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm
