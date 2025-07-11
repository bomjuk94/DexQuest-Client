import { Link } from 'react-router'
import { useLoginUser } from '../hooks/useLoginUser'

const RegisterCTA = () => {

    const { loginUser } = useLoginUser()

    const handleDemoSubmit = () => {
        loginUser('Demo', '123456')
    }

    return (
        <div className='flex flex-col gap-1'>
            <p className='text-primary'>
                <Link
                    to={'/register'}
                    className='text-link font-medium hover:underline'
                >Register</Link> for an account.
            </p>
            <p className='text-primary'>
                Use a <button
                    type="button"
                    onClick={handleDemoSubmit}
                    className='text-link font-medium hover:underline cursor-pointer'
                >Demo</button> account
            </p>
        </div>
    )
}

export default RegisterCTA