import { useLoginUser } from "./useLoginUser"
import { type SubmitLoginProps } from "../types/SubmitLoginProps"

export const useLoginSubmit = () => {

    const { loginUser } = useLoginUser()

    const submitLogin = async ({
        e,
        userNameRef,
        passwordRef,
        setErrors,
        formRef
    }: SubmitLoginProps) => {
        e.preventDefault()
        const username = userNameRef?.current?.value.trim()
        const password = passwordRef?.current?.value.trim()
        const newErrors = []

        if (!username) {
            newErrors.push("Please input a valid username");
        }

        if (!password) {
            newErrors.push("Please input a valid password");
        }

        setErrors(newErrors)

        if (newErrors.length === 0 && username && password) {
            await loginUser(username, password);
            formRef.current?.reset();
        } else {
            return
        }
    }

    return { submitLogin }
}