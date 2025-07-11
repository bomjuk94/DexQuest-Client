import { showToast } from "../utilities/toast"
import { type ColourSchemeKey } from "../types/models"
import { colorSchemes } from "../utilities/colours"
import { type ChangeThemeProps } from "../types/ChangeThemeProps"

export const useUpdateTheme = () => {
    const changeTheme = async ({
        e,
        setColourScheme,
        token,
        refreshProfile,
    }: ChangeThemeProps) => {
        let value = e.target.value

        if (value === '') {
            value = 'default'
            setColourScheme('default')
        } else {
            setColourScheme(value)
        }

        const selectedScheme = colorSchemes[value as ColourSchemeKey];
        Object.entries(selectedScheme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--color-${key}`, value);
        });

        const res = await fetch('/api/profile/theme', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                colorScheme: value
            }),
        });

        const data = await res.json()

        if (data.error) {
            showToast('error', `${data.error}`)
        }

        if (res.status === 200) {
            refreshProfile()
        }
    }

    return { changeTheme }
}