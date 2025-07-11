import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    const goToNextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const goToPreviousPage = () =>
        setCurrentPage((prev) => Math.max(prev - 1, 1));

    const setPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        currentPage,
        totalPages,
        currentItems,
        goToNextPage,
        goToPreviousPage,
        setPage,
    };
}
