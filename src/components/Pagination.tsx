import { type PaginationProps } from '../types/PaginationProps';

const Pagination = ({ totalPages, setCurrentPage, currentPage }: PaginationProps) => {
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className='flex items-start gap-1.5'>
            {currentPage > 1 && (
                <button className='rounded-sm border-none py-1 px-2.5 cursor-pointer text-white bg-brand-gray duration-100 ease-in-out hover:opacity-80' onClick={handlePrev}>
                    Prev
                </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    disabled={currentPage === i + 1}
                    className={currentPage === i + 1 ? 'bg-brand-green text-white rounded-sm border-none py-1 px-2.5' : 'bg-brand-light-gray text-unset rounded-sm border-none py-1 px-2.5 cursor-pointer'}
                >
                    {i + 1}
                </button>
            ))}

            {currentPage < totalPages && (
                <button className='rounded-sm border-none py-1 px-2.5 cursor-pointer text-white bg-brand-gray duration-100 ease-in-out hover:opacity-80' onClick={handleNext}>
                    Next
                </button>
            )}
        </div>
    );
}

export default Pagination