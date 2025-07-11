import { useRef } from 'react'
import { capitalizeName } from '../utilities/capitalizeName'
import { Link } from 'react-router'
import { useProtectedProfile } from '../hooks/useProtectedProfile'
import { removeTeam } from '../utilities/removeTeam'
import { type TeamsListProps } from '../types/TeamListProps'
import { useTeamRenameHandler } from '../hooks/useTeamRenameHandler'

const TeamsList = ({ team, teams, nameInputs, setNameInputs, setTeams }: TeamsListProps) => {

    const { token } = useProtectedProfile()

    const formRef = useRef(null)
    const teamNameRef = useRef<null | string>(null)
    const { handleTeamRename } = useTeamRenameHandler()

    const handleTeamRemove = async (team) => {
        if (teams) {
            const updated = await removeTeam(team, token, teams)
            setTeams(updated || [])
        }
    }

    return (
        <div>
            <li className='flex flex-col gap-4 items-center'>
                <p>{team.name}</p>
                <ul className='grid grid-cols-2 justify-items-center gap-y-4 gap-x-15'>
                    {
                        team.team.map((poke) => (
                            <li
                                className='flex flex-col items-center'
                                key={poke.id}
                            >
                                <img
                                    src={poke.image}
                                    alt={capitalizeName(poke.name)}
                                    className='w-24 object-contain'
                                />

                                <Link
                                    to={`/pokemon/${poke.id}`}
                                    className='hover:underline'
                                >
                                    {capitalizeName(poke.name)}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className='flex flex-col gap-2'>
                    <form
                        onSubmit={(e) => handleTeamRename({
                            e,
                            nameInputs,
                            token,
                            team,
                            setTeams
                        })}
                        ref={formRef}
                        className='flex flex-col gap-2.5 w-full'
                    >

                        <input
                            ref={teamNameRef}
                            className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary'
                            placeholder='Team name...'
                            type="text"
                            value={nameInputs[team._id] || ''}
                            onChange={(e) =>
                                setNameInputs({
                                    ...nameInputs,
                                    [team._id]: e.target.value,
                                })
                            }
                        />

                        <input
                            type='submit'
                            value="Rename Team Name"
                            className='text-xs btn-text btn-bkgd-secondary cursor-pointer border-none rounded-sm py-1.5 px-2.5 hover:opacity-80'
                        />

                    </form>
                    <button onClick={() => handleTeamRemove(team)}
                        className='text-xs btn-bkgd-secondary btn-text py-1 px-2 rounded-sm hover:opacity-80 cursor-pointer mt-1 w-full'>
                        Delete
                    </button>
                </div>

            </li>
        </div>
    )
}

export default TeamsList