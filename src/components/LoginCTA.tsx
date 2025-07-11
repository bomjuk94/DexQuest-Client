import { Link } from 'react-router'

const LoginCTA = () => {
    return (
        <div>
            <p>
                <Link
                    to={'/login'}
                    className='text-link font-medium hover:underline'
                >Login</Link> using your account.
            </p>
        </div>
    )
}

export default LoginCTA