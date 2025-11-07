import React from 'react';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../components/Pagination';

/**
 * 排序和分页工具栏
 * 
 * 将排序和分页功能集成在同一行
 * - 左侧：排序下拉框
 * - 右侧：分页控件
 */
const SortAndPaginationBar = ({ 
  sortBy, 
  onSortChange, 
  currentPage, 
  totalPages, 
  totalItems, 
  onPageChange 
}) => {
  return (
    <div className="px-4 py-3 border-b border-border bg-background flex items-center justify-between gap-4">
      <div className="flex-shrink-0">
        <SortDropdown value={sortBy} onChange={onSortChange} />
      </div>
      <div className="flex-1 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default SortAndPaginationBar;
