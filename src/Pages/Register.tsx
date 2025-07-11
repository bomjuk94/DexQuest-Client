import RegisterForm from '../components/RegisterForm'
import { Helmet } from 'react-helmet'

const Register = () => {
    return (
        <>
            <Helmet>
                <title>Register - DexQuest</title>
                <meta name="description" content="Create an account to unlock all features and start your DexQuest journey." />
            </Helmet>

            <div className='bg-primary'>
                <div className='flex flex-col gap-10 max-w-desktop mx-auto py-20 px-4 bg-primary'>
                    <h2 className='text-center text-4xl text-primary'>Register</h2>

                    <RegisterForm />
                </div>
            </div>
        </>
    )
}

export default Register