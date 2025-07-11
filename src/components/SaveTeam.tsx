import { useRef } from 'react'
import { useTeamStore } from '../stores/teamStore'
import { useProtectedProfile } from '../hooks/useProtectedProfile'
import { useSaveTeam } from '../hooks/useSaveTeam'

const SaveTeam = () => {

    const { team } = useTeamStore()
    const teamLength = team.length
    const { token } = useProtectedProfile()
    const formRef = useRef(null)
    const teamNameRef = useRef<null | string>(null)
    const { saveTeam } = useSaveTeam()

    const handleSaveTeam = async (e: React.FormEvent) => {
        saveTeam({
            e,
            token,
            teamLength,
            team,
            teamNameRef,
            formRef
        })
    }

    return (
        <>
            <form
                onSubmit={handleSaveTeam}
                ref={formRef}
                className='flex flex-col gap-2.5 w-full px-2.5'
            >
                <input
                    ref={teamNameRef}
                    className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary'
                    placeholder='Team name...'
                    type="text"
                />

                <input
                    type='submit'
                    value="Save Team"
                    className='btn-text btn-bkgd-secondary cursor-pointer border-none rounded-sm py-1.5 px-2.5 hover:opacity-80'
                />
            </form>
        </>
    )
}

export default SaveTeam