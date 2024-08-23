import Pagination from '@mui/material/Pagination';
import React from 'react';

interface PaginationProps {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  disabled?: boolean;
}

const PaginationList = ({ count, onChange, disabled }: PaginationProps) => {
  return <Pagination count={count} onChange={onChange} disabled={disabled} />;
};

export default PaginationList;
