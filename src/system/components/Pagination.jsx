import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  itemLabel = "items"
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Force visually at least 5 pages, but cap clickable logic
  const effectiveTotalPages = Math.max(totalPages, 5);

  const renderPageNumbers = () => {
    const pages = [];
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(effectiveTotalPages, currentPage + 2);
    
    if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage >= effectiveTotalPages - 2) {
      startPage = effectiveTotalPages - 4;
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < effectiveTotalPages) {
      if (endPage < effectiveTotalPages - 1) pages.push('...');
      pages.push(effectiveTotalPages);
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            ...
          </span>
        );
      }
      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page > totalPages}
          className={`min-w-[36px] h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ${
            currentPage === page
              ? "bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white border-none shadow-md shadow-[#8B4513]/20"
              : "bg-white text-gray-600 border border-gray-200 hover: hover:text-[#FF4D00] hover:border-orange-200 hover:shadow-sm disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
          }`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-4 px-2 w-full mt-2">
      <div className="text-sm text-gray-600 font-medium">
        Mostrando <span className="font-semibold text-[#8B4513]">{totalItems > 0 ? startItem : 0}</span> - <span className="font-semibold text-[#8B4513]">{endItem}</span> de <span className="font-semibold text-[#8B4513]">{totalItems}</span> {itemLabel}
      </div>
      
      <nav className="flex items-center gap-1.5 mx-auto" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalItems === 0}
          className="px-3 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover: hover:text-[#FF4D00] hover:border-orange-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-colors"
          aria-label="Anterior"
        >
          <i className="fa-solid fa-angles-left text-xs"></i>
        </button>

        <div className="flex items-center gap-1.5">
          {renderPageNumbers()}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || totalItems === 0}
          className="px-3 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover: hover:text-[#FF4D00] hover:border-orange-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-colors"
          aria-label="Siguiente"
        >
          <i className="fa-solid fa-angles-right text-xs"></i>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;





