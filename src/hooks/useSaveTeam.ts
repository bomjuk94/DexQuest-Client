import { type SaveTeamProps } from "../types/SaveTeamProps"
import { showToast } from "../utilities/toast"

export const useSaveTeam = () => {
    const saveTeam = async ({
        e,
        token,
        teamLength,
        team,
        teamNameRef,
        formRef
    }: SaveTeamProps) => {
        e.preventDefault()

        if (!token) {
            showToast('error', 'You need to log in to save a team.')
            return
        }
        console.log(teamLength);


        if (teamLength !== 6) {
            showToast('error', 'Need at least 6 creatures in your team.')
            return
        }

        if (!teamNameRef?.current.value) {
            showToast('error', 'Need a team name')
        }

        const res = await fetch('api/profile/teams/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                teamToAdd: team,
                teamName: teamNameRef?.current.value
            })
        })

        const data = await res.json()

        if (data.error) {
            showToast('error', `${data.error}`)
        }

        if (res.status === 200) {
            showToast('success', 'Team Successfully added!')
            localStorage.removeItem('team-storage')
            formRef?.current.reset()
        }
    }

    return { saveTeam }
}