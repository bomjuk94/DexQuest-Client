import { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { showToast } from '../utilities/toast'
import { Helmet } from 'react-helmet'

const Login = () => {

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const error = params.get('error')
    if (error === 'sessionExpired') {
      showToast('error', 'Your session has expired. Please log in.')
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Login - DexQuest</title>
        <meta name="description" content="Log in to your account to access all of DexQuest's features." />
      </Helmet>

      <div className='bg-primary'>
        <div className='flex flex-col gap-10 max-w-desktop mx-auto py-20 px-4'>
          <h2 className='text-center text-4xl text-primary'>Login</h2>

          <LoginForm />
        </div>
      </div>
    </>

  )
}

export default Login