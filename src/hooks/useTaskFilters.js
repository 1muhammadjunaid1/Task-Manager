import { useState } from 'react';

function useTaskFilters() {
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });

  return [filters, setFilters];
}

export default useTaskFilters;
