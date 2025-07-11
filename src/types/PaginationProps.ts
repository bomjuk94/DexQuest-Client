export interface PaginationProps {
    totalPages: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number
}