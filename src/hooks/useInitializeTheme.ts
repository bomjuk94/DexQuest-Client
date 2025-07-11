import { useEffect } from "react";
import { colorSchemes } from "../utilities/colours";
import { useColourSchemeStore } from "../stores/colourSchemeStore";
import type { ColourSchemeKey } from "../types/models";
import { apiFetch } from "../utilities/api";

export function useInitializeTheme(token: string | null, refreshProfile: () => void) {
    const getColourScheme = useColourSchemeStore((state) => state.getColourScheme);

    useEffect(() => {
        const colourScheme = getColourScheme();
        const validSchemes = ['red', 'blue', 'green', 'default', 'dark'];

        if (colourScheme && validSchemes.includes(colourScheme)) {
            const selectedScheme = colorSchemes[colourScheme as ColourSchemeKey];
            Object.entries(selectedScheme).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--color-${key}`, value);
            });
            refreshProfile();
            return;
        }

        if (token) {
            const fetchColorScheme = async () => {
                try {
                    const res = await apiFetch('/api/profile/colorScheme', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = await res.json();

                    if (res.ok && validSchemes.includes(data?.colorScheme)) {
                        localStorage.setItem("colorScheme", data.colorScheme);
                        const selectedScheme = colorSchemes[data.colorScheme as ColourSchemeKey];
                        Object.entries(selectedScheme).forEach(([key, value]) => {
                            document.documentElement.style.setProperty(`--color-${key}`, value);
                        });
                    } else {
                        const selectedScheme = colorSchemes["default"];
                        Object.entries(selectedScheme).forEach(([key, value]) => {
                            document.documentElement.style.setProperty(`--color-${key}`, value);
                        });
                    }
                } catch (error) {
                    console.error("Error fetching color scheme:", error);
                    const selectedScheme = colorSchemes["default"];
                    Object.entries(selectedScheme).forEach(([key, value]) => {
                        document.documentElement.style.setProperty(`--color-${key}`, value);
                    });
                }
            };

            fetchColorScheme();
        } else {
            const selectedScheme = colorSchemes["default"];
            Object.entries(selectedScheme).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--color-${key}`, value);
            });
        }
    }, [token, refreshProfile, getColourScheme]);
}
