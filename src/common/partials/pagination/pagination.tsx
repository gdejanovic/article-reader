import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    maxPageNumbersToShow: number;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxPageNumbersToShow,
}) => {
    const middlePageNumber = Math.ceil(maxPageNumbersToShow / 2);

    const startPage =
        currentPage <= middlePageNumber
            ? 1
            : currentPage >= totalPages - middlePageNumber
                ? totalPages - maxPageNumbersToShow + 1
                : currentPage - middlePageNumber + 1;

    const endPage =
        currentPage <= middlePageNumber
            ? Math.min(totalPages, maxPageNumbersToShow)
            : currentPage >= totalPages - middlePageNumber
                ? totalPages
                : currentPage + middlePageNumber - 1;

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) =>
        startPage + i
    );

    const renderPageItem = (number: number) => (
        <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
        >
            <button className="page-link" onClick={() => onPageChange(number)}>
                {number}
            </button>
        </li>
    );

    return (
        <nav>
            <ul className={`pagination`}>
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((number) => renderPageItem(number))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};
