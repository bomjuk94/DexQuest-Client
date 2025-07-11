import { useEffect, useState, useRef } from 'react'
import TeamCard from './TeamCard'
import { useTeamStore } from '../stores/teamStore'
import type { Team } from '../types/models'

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToParentElement } from '@dnd-kit/modifiers'

const SortableCard = ({ card }: { card: Team }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id: card.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
    }

    const handleRef = (node: HTMLDivElement | null) => {
        if (node) {
            setActivatorNodeRef(node)
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <TeamCard
                card={card}
                dragHandleCallbackRef={handleRef}
                dragHandleListeners={listeners}
            />
        </div>
    )
}

const TeamList = () => {
    const teamCount = 6
    const { team, setTeam } = useTeamStore()
    const [teamToAdd, setTeamToAdd] = useState<(Team | null)[]>([])
    const teamListRef = useRef<HTMLDivElement | null>(null)

    const sensors = useSensors(useSensor(PointerSensor))

    useEffect(() => {
        const paddedTeam: (Team | null)[] = [...team]
        const emptySlots = teamCount - team.length
        for (let i = 0; i < emptySlots; i++) {
            paddedTeam.push(null)
        }
        setTeamToAdd(paddedTeam)
    }, [team])

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = team.findIndex((p) => p.id === active.id)
        const newIndex = team.findIndex((p) => p.id === over.id)

        const newTeam = arrayMove(team, oldIndex, newIndex)
        setTeam(newTeam)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
        >
            <SortableContext items={team.map((p) => p.id)} strategy={rectSortingStrategy}>
                <div
                    ref={teamListRef}
                    className="w-full max-w-[800px] mx-auto overflow-hidden"
                >
                    <div className="flex flex-wrap gap-8 justify-center">
                        {teamToAdd.map((card, i) =>
                            card ? (
                                <SortableCard card={card} key={card.id} />
                            ) : (
                                <TeamCard card={null} key={`empty-${i}`} />
                            )
                        )}
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    )
}

export default TeamList
