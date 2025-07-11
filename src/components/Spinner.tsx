import { type SpinnerProps } from '../types/SpinnerProps'

const Spinner = ({ loader, itemsToShow, hasMore }: SpinnerProps) => {

    return (
        <section ref={loader} className={`flex justify-center py-12 text-center bg-primary`} style={{ minHeight: '40px' }}>
            {(itemsToShow < 1025 && hasMore) ? <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /> : ''}
        </section>
    )
}

export default Spinner