import { useState } from 'react';
import { useProtectedProfile } from '../hooks/useProtectedProfile';
import { capitalizeName } from '../utilities/capitalizeName';
import type { Teams } from '../types/models';
import { removeTeam } from '../utilities/removeTeam';
import PokeballSpinner from './PokeballSpinner';
import { useFetchTeams } from '../hooks/useFetchTeams';
import { useTeamRename } from '../hooks/useTeamRename';

const Teams = () => {

    const { token } = useProtectedProfile()
    const [nameInputs, setNameInputs] = useState<Record<string, string>>({});
    const [teams, setTeams] = useState<Teams | null>(null);
    const { error, loading } = useFetchTeams(setTeams, setNameInputs)
    const { renameTeam } = useTeamRename()

    const handleRemoveTeam = async (teamToRemove: Teams[number]) => {
        if (teams) {
            const updated = await removeTeam(teamToRemove, token, teams);
            setTeams(updated || []);
        }
    };

    const handleTeamRename = async (e, team) => {
        renameTeam({ e, nameInputs, token, team, setTeams })
    };

    if (loading) return <PokeballSpinner />
    if (!teams) return <p>No teams...</p>;
    if (!token) return <p>Loading authentication...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {teams.length !== 0 ? (
                <ul className="flex flex-col gap-5 items-center">
                    {teams.map((team) => (
                        <li key={team._id} className="flex flex-col gap-3.5">
                            <h3 className="text-primary">{team.name}</h3>
                            <ul className="bg-secondary py-8 px-4 grid grid-cols-2 rounded-xl gap-4">
                                {team.team.map((poke) => (
                                    <li
                                        key={poke.name}
                                        className="bg-brand-antique-white rounded-xl py-2 px-2"
                                    >
                                        <img src={poke.image} alt={poke.name} />
                                        <p>{capitalizeName(poke.name)}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col gap-2.5">
                                <form
                                    onSubmit={(e) => handleTeamRename(e, team)}
                                    className="flex flex-col gap-2.5 w-full"
                                >
                                    <input
                                        className="border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary"
                                        placeholder="Team name..."
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
                                        type="submit"
                                        value="Update Team Name"
                                        className="btn-text btn-bkgd cursor-pointer border-none rounded-sm py-1.5 px-2.5 hover:opacity-80"
                                    />
                                </form>

                                <button
                                    onClick={() => handleRemoveTeam(team)}
                                    className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80"
                                >
                                    Remove Team
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There are no teams...</p>
            )}
        </>
    );
};

export default Teams;









// import React, { useEffect, useState, useRef } from 'react'
// import { useProtectedProfile } from '../hooks/useProtectedProfile'
// import { capitalizeName } from '../utilities/capitalizeName'
// import type { Teams } from '../models'
// import { removeTeam } from '../utilities/removeTeam'
// import { showToast } from '../utilities/toast'

// const Teams = () => {

//     const { token } = useProtectedProfile()
//     const [teams, setTeams] = useState<Teams | null>(null)
//     const [error, setError] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const formRef = useRef(null)
//     const teamNameRef = useRef<null | string>(null)

//     useEffect(() => {

//         if (!token) {
//             // Optionally, you can log or set error here
//             console.log("Token not yet available—skipping fetch");
//             return;
//         }

//         const fetchTeams = async () => {
//             try {
//                 const res = await fetch('/api/profile/teams', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 if (!res.ok) {
//                     const data = await res.json();
//                     throw new Error(data.error || 'Unknown error')
//                 }
//                 const data = await res.json();

//                 setTeams(data.teams);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false)
//             }
//         };

//         fetchTeams();
//     }, [token]);

//     const handleRemoveTeam = async (teamToRemove: Teams[number]) => {
//         if (teams) {
//             const updated = await removeTeam(teamToRemove, token, teams);
//             setTeams(updated || []);
//         }
//     };

//     const handleTeamRename = async (e, team) => {
//         e.preventDefault()
//         console.log(team);


//         if (!teamNameRef?.current.value) {
//             showToast('error', 'Need a team name')
//         }

//         const res = await fetch('api/profile/teams/name/update', {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 teamId: team._id,
//                 name: teamNameRef?.current.value
//             })
//         })

//         const data = await res.json()

//         if (data.error) {
//             showToast('error', `${data.error}`)
//         }

//         if (res.status === 200) {
//             showToast('success', 'Team name Successfully updated!')
//             localStorage.removeItem('team-storage')
//             formRef.current.reset()
//         }
//     }

//     if (!teams) return <p>No teams...</p>
//     if (!token) return <p>Loading authentication...</p>
//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error: {error}</p>

//     return (
//         <>
//             {
//                 teams.length !== 0 ?
//                     <ul className='flex flex-col gap-5 items-center'>
//                         {teams?.map((team) => (
//                             <li
//                                 key={team._id}
//                                 className='flex flex-col gap-3.5'
//                             >
//                                 <h3 className='text-primary'>{team.name}</h3>
//                                 <ul className='bg-secondary py-8 px-4 grid grid-cols-2 rounded-sm gap-4'>
//                                     {team.team.map((poke) => (
//                                         <li
//                                             key={poke.name}
//                                             className='bg-brand-antique-white rounded-sm p-1'
//                                         >
//                                             <img src={poke.image} alt={poke.name} />
//                                             <p>{capitalizeName(poke.name)}</p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <div className='flex flex-col gap-2.5'>
//                                     <form
//                                         onSubmit={(e) => handleTeamRename(e, team)}
//                                         ref={formRef}
//                                         className='flex flex-col gap-2.5 w-full'
//                                     >
//                                         <input
//                                             ref={teamNameRef}
//                                             className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary'
//                                             placeholder='Team name...'
//                                             type="text"
//                                         />

//                                         <input
//                                             type='submit'
//                                             value="Update Team Name"
//                                             className='btn-text btn-bkgd cursor-pointer border-none rounded-sm py-1.5 px-2.5 hover:opacity-80'
//                                         />
//                                     </form>

//                                     <button
//                                         onClick={() => handleRemoveTeam(team)}
//                                         className='cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80'
//                                     >
//                                         Remove Team
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     :
//                     <p>There are no teams...</p>
//             }
//         </>
//     )
// }

// export default Teams