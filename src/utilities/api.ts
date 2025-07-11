const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (path: string, options = {}) => {
    console.trace('apiFetch called:', path);
    const res = await fetch(`${BASE_URL}${path}`, { ...options });
    return res.json();
};

// export const apiFetch = async (
//     path: string,
//     options: RequestInit = {}
// ) => {
//     const res = await apiFetch(`${BASE_URL}${path}`, {
//         credentials: 'include',
//         ...options
//     });

//     if (!res.ok) {
//         const error = await res.text();
//         throw new Error(error || 'API error');
//     }

//     return res.json();
// };
