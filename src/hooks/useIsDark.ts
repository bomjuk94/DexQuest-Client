import { useThemeStore } from "../stores/themeStore";

export const useIsDark = () => {
    const { theme } = useThemeStore()
    const isDark = theme === 'dark'
    return isDark
}