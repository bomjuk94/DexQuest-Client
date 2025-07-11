import { useRef, useState, useEffect } from 'react'
import RegisterCTA from './RegisterCTA'
import { showToast } from '../utilities/toast'
import { useLoginSubmitHandler } from '../hooks/useLoginSubmitHandler'

const LoginForm = () => {

    const userNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [errors, setErrors] = useState<string[]>([])
    const { handleLoginSubmit } = useLoginSubmitHandler()

    useEffect(() => {
        if (errors.length > 0) {
            showToast(
                'error',
                <div>
                    {errors.map((error, index) => (
                        <div key={index}>
                            {index + 1}. {error}
                        </div>
                    ))}
                </div>
            );
        }
    }, [errors])

    return (
        <form
            onSubmit={(e) => handleLoginSubmit({
                e,
                userNameRef,
                passwordRef,
                setErrors,
                formRef
            })}
            ref={formRef}
            action="submit"
            className='flex flex-col gap-2 sm:max-w-form mx-auto w-full'
        >
            <div className='flex flex-col gap-2.5'>
                <input
                    ref={userNameRef}
                    type="text"
                    placeholder='Username'
                    className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary w-full placeholder:text-gray-500'
                />
                <input
                    ref={passwordRef}
                    type="text"
                    placeholder='Password'
                    className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary w-full'
                />
            </div>
            <RegisterCTA userNameRef={userNameRef} passwordRef={passwordRef} />

            <input
                type="submit"
                value="Submit"
                className='cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-bkgd btn-text hover:opacity-80 col-start-1 col-end-3  mt-3.5 sm:mt-6 w-fit ml-auto'
            />
        </form>
    )
}

export default LoginForm