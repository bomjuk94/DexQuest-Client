import { showToast } from "../utilities/toast"
import { type SaveProfileInfoProps } from "../types/SaveProfileInfoProps"

export const useUpdateProfileInfo = () => {
    const saveProfileInfo = async ({
        e,
        usernameRef,
        passwordRef,
        emailRef,
        setErrors,
        token,
        refreshProfile,
        formRef,
    }: SaveProfileInfoProps) => {
        e.preventDefault()
        const newUsername = usernameRef?.current?.value.trim()
        const newPassword = passwordRef?.current?.value.trim()
        const newEmail = emailRef?.current?.value.trim()
        const newErrors: string[] = []
        const updatePayload: Record<string, string> = {}

        if (newUsername) {
            if (newUsername.length < 3) {
                newErrors.push("Username must be at least 3 characters.")
            } else {
                updatePayload.username = newUsername
            }
        }

        if (newEmail) {
            const emailRegex = /^\S+@\S+\.\S+$/
            if (!emailRegex.test(newEmail)) {
                newErrors.push("A valid email is required.")
            } else {
                updatePayload.email = newEmail
            }
        }

        if (newPassword) {
            if (newPassword.length < 6) {
                newErrors.push("Password must be at least 6 characters.")
            } else {
                updatePayload.password = newPassword
            }
        }

        setErrors(newErrors)

        if (newErrors.length === 0 && Object.keys(updatePayload).length > 0) {
            const res = await fetch('/api/profile/auth', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatePayload),
            })

            const data = await res.json()

            if (data.error) {
                showToast('error', `${data.error}`)
            }

            if (res.status === 200) {
                refreshProfile()
                formRef.current?.reset()
            }
        }
    }

    return { saveProfileInfo }
}
