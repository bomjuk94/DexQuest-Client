import { type RegisterUserProps } from "../types/RegisterUserProps";
import { showToast } from "../utilities/toast";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router";

export const useRegisterUser = () => {

    const { login } = useAuthStore()
    const navigate = useNavigate()

    const registerUser = async ({
        username,
        email,
        password,
        selectedFile,
    }: RegisterUserProps) => {
        const formData = new FormData()
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        if (selectedFile) {
            formData.append("profileImage", selectedFile);
        }


        const res = await fetch('/api/register', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (data.errors || data.error) {
            showToast(
                'error',
                data.errors ?
                    <div>
                        {
                            data.errors.map((error: string, index: number) => (
                                <div key={index} >
                                    {index + 1}. {error}
                                </div>
                            ))
                        }
                    </div>
                    : `${data.error}`
            )
        }

        if (data.token) {
            login(data.token)
        } else {
            console.error("No token received");
        }

        if (res.status === 200) {
            navigate("/profile")
        }
    }

    return { registerUser }
}