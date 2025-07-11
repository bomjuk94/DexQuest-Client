import { useLoginSubmit } from "./useLoginSubmit";
import { type SubmitLoginProps } from "../types/SubmitLoginProps";

export const useLoginSubmitHandler = () => {

    const { submitLogin } = useLoginSubmit()

    const handleLoginSubmit = ({
        e,
        userNameRef,
        passwordRef,
        setErrors,
        formRef
    }: SubmitLoginProps) => {
        submitLogin({
            e,
            userNameRef,
            passwordRef,
            setErrors,
            formRef
        })
    }

    return { handleLoginSubmit }
}