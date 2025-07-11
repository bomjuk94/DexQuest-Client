import { useState, useEffect } from 'react'
import TeamCard from './TeamCard'
import { useTeamStore } from '../stores/teamStore'
import { type Team } from '../types/models'

const TeamList = () => {
    const teamCount = 6
    const { team } = useTeamStore()
    const [teamToAdd, setTeamToAdd] = useState<(Team | null)[]>([])

    useEffect(() => {
        const paddedTeam: (Team | null)[] = [...team]
        const emptySlots = teamCount - team.length

        for (let i = 0; i < emptySlots; i++) {
            paddedTeam.push(null)
        }

        setTeamToAdd(paddedTeam)
    }, [team])

    return (
        <div className='flex flex-wrap gap-8 justify-center'>
            {teamToAdd.map((card, i) => (
                <TeamCard card={card} key={i} />
            ))}
        </div>
    )
}

export default TeamList
