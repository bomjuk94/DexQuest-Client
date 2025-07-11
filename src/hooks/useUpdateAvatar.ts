import { type ChangeAvatarProps } from "../types/ChangeAvatarProps";

export const useUpdateAvatar = () => {
    const changeAvatar = async ({ file, token, refreshProfile }: ChangeAvatarProps) => {
        const formData = new FormData();
        formData.append("profileImage", file);

        const res = await fetch("/api/profile/avatar", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
            throw new Error(data.error || "Failed to update avatar");
        }

        if (res.status === 200) {
            refreshProfile()
        }
    }

    return { changeAvatar }
}