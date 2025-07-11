import { useRegisterUser } from "./useRegisterUser";
import { type RegisterSubmitProps } from "../types/RegisterSubmitProps";

export const useRegisterSubmitHandler = () => {

    const { registerUser } = useRegisterUser()

    const handleRegisterSubmit = async ({
        e,
        userNameRef,
        emailRef,
        passwordRef,
        selectedFile,
        setErrors,
        formRef,
        setSelectedFile,
    }: RegisterSubmitProps) => {
        e.preventDefault();
        const username = userNameRef?.current?.value;
        const email = emailRef?.current?.value.trim();
        const password = passwordRef?.current?.value;
        const newErrors = [];

        if (!username) {
            newErrors.push("Invalid username");
        }

        if (!email) {
            newErrors.push("Invalid email");
        }

        if (!password) {
            newErrors.push("Invalid password");
        }

        if (!selectedFile) {
            newErrors.push("Invalid file");
        }

        setErrors(newErrors);

        if (newErrors.length === 0 && username && email && password) {
            await registerUser({ username, email, password, selectedFile });
            formRef.current?.reset();
            setSelectedFile(null);
        } else {
            return
        }
    }

    return { handleRegisterSubmit }
}