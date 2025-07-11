import { capitalizeName } from '../utilities/capitalizeName'
import { useTeamStore } from '../stores/teamStore'
import { type CardProps } from '../types/CardProps'

const TeamCard = ({ card, dragHandleCallbackRef, dragHandleListeners }: CardProps) => {
    const { removeFromTeam } = useTeamStore()

    if (!card) {
        return (
            <div className='flex flex-col gap-2.5'>
                <div className='bg-card rounded-xl p-3'>
                    <div className='bg-brand-antique-white w-sprite h-sprite flex justify-center items-center rounded-sm'>
                        <p className='text-3xl'>+</p>
                    </div>
                </div>
            </div>
        )
    }

    const handleRemoveClick = (id: number) => {
        removeFromTeam(id)
    }

    return (
        <div className='flex flex-col gap-2.5'>
            <div className='bg-card rounded-md p-3'>
                <div
                    ref={dragHandleCallbackRef}
                    {...dragHandleListeners}
                    className='bg-brand-antique-white w-sprite h-sprite flex justify-center items-center rounded-sm cursor-grab'
                >
                    <img
                        src={card.image}
                        alt={capitalizeName(card.name)}
                        className='w-full'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2.5'>
                <p className='text-lg text-center text-primary'>
                    {capitalizeName(card.name)}
                </p>
                <button
                    onClick={() => handleRemoveClick(card.id)}
                    className='cursor-pointer border-none rounded-sm py-1 px-1.5 btn-text btn-bkgd-secondary hover:opacity-80  transition-all duration-200'
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default TeamCard
