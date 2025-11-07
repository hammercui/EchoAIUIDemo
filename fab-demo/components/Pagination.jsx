import React from 'react';

/**
 * 分页组件 - HeroUI 风格
 * 
 * 规范要求:
 * - 圆形按钮设计
 * - 渐变色激活状态
 * - 显示总数量
 * - 使用 Chevron 图标
 */

const ChevronIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

const PaginationItemType = {
  PREV: 'prev',
  NEXT: 'next',
  DOTS: 'dots',
  PAGE: 'page'
};

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  // 生成分页项数组
  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 5; // 最多显示5个页码

    // 上一页
    items.push({ type: PaginationItemType.PREV, value: currentPage - 1 });

    if (totalPages <= maxVisible + 2) {
      // 总页数少，显示全部
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: PaginationItemType.PAGE, value: i });
      }
    } else {
      // 总页数多，智能省略
      if (currentPage <= 3) {
        // 当前页靠前: 1 2 3 4 5 ... 10
        for (let i = 1; i <= 5; i++) {
          items.push({ type: PaginationItemType.PAGE, value: i });
        }
        items.push({ type: PaginationItemType.DOTS });
        items.push({ type: PaginationItemType.PAGE, value: totalPages });
      } else if (currentPage >= totalPages - 2) {
        // 当前页靠后: 1 ... 6 7 8 9 10
        items.push({ type: PaginationItemType.PAGE, value: 1 });
        items.push({ type: PaginationItemType.DOTS });
        for (let i = totalPages - 4; i <= totalPages; i++) {
          items.push({ type: PaginationItemType.PAGE, value: i });
        }
      } else {
        // 当前页在中间: 1 ... 4 5 6 ... 10
        items.push({ type: PaginationItemType.PAGE, value: 1 });
        items.push({ type: PaginationItemType.DOTS });
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push({ type: PaginationItemType.PAGE, value: i });
        }
        items.push({ type: PaginationItemType.DOTS });
        items.push({ type: PaginationItemType.PAGE, value: totalPages });
      }
    }

    // 下一页
    items.push({ type: PaginationItemType.NEXT, value: currentPage + 1 });

    return items;
  };

  const renderItem = (item, index) => {
    const baseClass = "min-w-8 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150";
    
    if (item.type === PaginationItemType.NEXT) {
      return (
        <button
          key={`next-${index}`}
          className={`${baseClass} bg-muted/50 hover:bg-muted text-foreground disabled:opacity-30 disabled:cursor-not-allowed`}
          onClick={() => onPageChange(item.value)}
          disabled={currentPage === totalPages}
        >
          <ChevronIcon className="rotate-180 w-4 h-4" />
        </button>
      );
    }

    if (item.type === PaginationItemType.PREV) {
      return (
        <button
          key={`prev-${index}`}
          className={`${baseClass} bg-muted/50 hover:bg-muted text-foreground disabled:opacity-30 disabled:cursor-not-allowed`}
          onClick={() => onPageChange(item.value)}
          disabled={currentPage === 1}
        >
          <ChevronIcon className="w-4 h-4" />
        </button>
      );
    }

    if (item.type === PaginationItemType.DOTS) {
      return (
        <button key={`dots-${index}`} className={`${baseClass} cursor-default text-muted-foreground`} disabled>
          ...
        </button>
      );
    }

    // PAGE type
    const isActive = item.value === currentPage;
    return (
      <button
        key={`page-${item.value}`}
        className={`${baseClass} text-xs font-medium ${
          isActive 
            ? 'text-white font-bold shadow-md' 
            : 'bg-transparent hover:bg-muted/50 text-foreground'
        }`}
        style={isActive ? {
          background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
        } : {}}
        onClick={() => onPageChange(item.value)}
      >
        {item.value}
      </button>
    );
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
      {/* 左侧：总数统计 */}
      <div className="text-xs text-muted-foreground">
        共 <span className="font-semibold text-foreground">{totalItems}</span> 条
      </div>

      {/* 右侧：分页控件 */}
      <div className="flex items-center gap-2">
        {paginationItems.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
};

export default Pagination;
