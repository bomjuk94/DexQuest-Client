export interface RegisterSubmitProps {
    e: React.FormEvent<HTMLFormElement>
    userNameRef: React.RefObject<HTMLInputElement | null>
    emailRef: React.RefObject<HTMLInputElement | null>
    passwordRef: React.RefObject<HTMLInputElement | null>
    selectedFile: File | null
    setErrors: (value: React.SetStateAction<string[]>) => void
    formRef: React.RefObject<HTMLFormElement | null>
    setSelectedFile: (value: React.SetStateAction<File | null>) => void
}