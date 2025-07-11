import { useNavigate } from "react-router";
import { showToast } from "../utilities/toast";
import { useAuthStore } from "../stores/authStore";

export const useLoginUser = () => {

    const { login } = useAuthStore()
    const navigate = useNavigate()

    const loginUser = async (username: string, password: string) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
            }),
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
            console.log("Received token:", data.token);
            login(data.token)
        } else {
            console.error("No token received");
        }

        if (res.status === 200) {
            const prevPath = localStorage.getItem('prevPath')
            if (prevPath) {
                navigate(prevPath)
                localStorage.removeItem('prevPath')
            } else {
                navigate('/dashboard')
            }
        }
    }



    return { loginUser }
}