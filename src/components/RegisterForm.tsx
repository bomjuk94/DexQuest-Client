import React, { useRef, useState, useEffect } from 'react'
import LoginCTA from './LoginCTA'
import { showToast } from '../utilities/toast';
import { useRegisterSubmitHandler } from '../hooks/useRegisterSubmitHandler';

const RegisterForm = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const userNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [errors, setErrors] = useState<string[]>([])

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file ?? null);
    };

    const { handleRegisterSubmit } = useRegisterSubmitHandler()

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
            onSubmit={(e) => handleRegisterSubmit({
                e,
                userNameRef,
                emailRef,
                passwordRef,
                selectedFile,
                setErrors,
                formRef,
                setSelectedFile,
            })}
            ref={formRef}
            action="submit"
            className='flex flex-col gap-2 sm:max-w-form mx-auto w-full'
        >
            <div className='flex flex-col sm:grid gap-2.5'>
                <input
                    ref={userNameRef}
                    type="text"
                    placeholder='Username'
                    className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary w-full'
                />
                <input
                    ref={emailRef}
                    type="text"
                    placeholder='Email'
                    className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary w-full'
                />
                <input
                    ref={passwordRef}
                    type="text"
                    placeholder='Password'
                    className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary w-full'
                />
                <div>
                    <button
                        type="button"
                        onClick={handleFileButtonClick}
                        className='cursor-pointer border-none rounded-sm py-1.5 px-2.5 text-white hover:opacity-80 col-start-1 col-end-3 bg-brand-dark-psychic'
                    >
                        Upload Profile Image
                    </button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept='image/*'
                    />
                </div>
            </div>

            <LoginCTA />

            <input
                type="submit"
                value="Submit"
                className='cursor-pointer border-none rounded-sm py-1.5 px-2.5 text-white hover:opacity-80 col-start-1 col-end-3 btn-bkgd mt-3.5 sm:mt-6 w-fit ml-auto'
            />
        </form>
    )
}

export default RegisterForm