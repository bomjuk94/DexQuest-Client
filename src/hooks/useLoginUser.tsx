import { useNavigate } from "react-router";
import { showToast } from "../utilities/toast";
import { useAuthStore } from "../stores/authStore";
import { apiFetch } from "../utilities/api";

export const useLoginUser = () => {

    const { login } = useAuthStore()
    const navigate = useNavigate()

    const loginUser = async (username: string, password: string) => {
        const res = await apiFetch('/api/login', {
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
                data.errors ? (
                    <div>
                        {data.errors.map((error: string, index: number) => (
                            <div key={index}>{index + 1}. {error}</div>
                        ))}
                    </div>
                ) : `${data.error}`
            );
            return;
        }

        if (data.token) {
            login(data.token);

            const prevPath = localStorage.getItem("prevPath");
            if (prevPath) {
                localStorage.removeItem("prevPath");
                navigate(prevPath);
            } else {
                navigate("/dashboard");
            }
        } else {
            console.error("No token received");
        }
    }



    return { loginUser }
}