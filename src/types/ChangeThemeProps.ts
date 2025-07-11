export interface ChangeThemeProps {
    e: React.ChangeEvent<HTMLSelectElement>,
    setColourScheme: (val: string) => void,
    token: string | null,
    refreshProfile: () => Promise<void>,
}