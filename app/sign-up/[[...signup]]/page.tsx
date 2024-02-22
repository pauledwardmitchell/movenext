import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <SignUp afterSignUpUrl="/new-user" redirect="/new-user" />
  )
}

export default SignUpPage

