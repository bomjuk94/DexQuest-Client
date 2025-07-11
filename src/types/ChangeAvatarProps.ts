export interface ChangeAvatarProps {
    file: File
    token: string | null
    refreshProfile: () => Promise<void>
}