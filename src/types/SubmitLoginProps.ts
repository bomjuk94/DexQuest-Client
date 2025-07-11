export interface SubmitLoginProps {
    e: React.FormEvent<HTMLFormElement>
    userNameRef: React.RefObject<HTMLInputElement | null>
    passwordRef: React.RefObject<HTMLInputElement | null>
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
    formRef: React.RefObject<HTMLFormElement | null>
}