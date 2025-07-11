export interface SaveProfileInfoProps {
    e: React.FormEvent<HTMLFormElement>,
    usernameRef: React.RefObject<HTMLInputElement | null>,
    passwordRef: React.RefObject<HTMLInputElement | null>,
    emailRef: React.RefObject<HTMLInputElement | null>,
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    token: string | null,
    refreshProfile: () => Promise<void>,
    formRef: React.RefObject<HTMLFormElement | null>,
}