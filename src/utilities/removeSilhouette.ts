import type { Silhouette } from "../types/models/Silhouette"
import { apiFetch } from "./api"

export const removeSilhouette = async (silhouetteToRemove: Silhouette, token: string, silhouettes: Silhouette[]) => {
    const filtered = silhouettes?.filter((s) => s._id !== silhouetteToRemove._id)

    try {
        console.log('starting fetch')
        await apiFetch('/api/profile/silhouettes/remove', {
            'method': 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                silhouettes: filtered,
            })
        })
    } catch (error) {
        console.log(error);
    }
    return filtered
}