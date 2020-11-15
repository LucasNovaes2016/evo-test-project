import React, { useState } from 'react';
import ListItems from './listitems';
import PaginationSection from './paginationsection';

export default function GridSection() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="grid-section container mt-3">
      <ListItems currentPage={currentPage} />
      <PaginationSection
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
