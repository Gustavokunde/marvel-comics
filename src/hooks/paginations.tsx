import { Pagination } from '@mui/material';
import React, { useState } from 'react';

interface PaginationProps {
  count: number;
  disabled?: boolean;
}

const usePagination = ({ count, disabled }: PaginationProps) => {
  const [pageNumber, setPageNumber] = useState(1);

  const onChangePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page);
  };

  const PaginationItem = () => {
    return (
      <Pagination
        id="pagination"
        data-testid="pagination"
        count={count}
        page={pageNumber}
        onChange={onChangePagination}
        disabled={disabled}
      />
    );
  };

  return {
    Pagination: PaginationItem,
    pageNumber,
  };
};

export default usePagination;
