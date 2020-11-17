import React from 'react';
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import { items_count_per_page, page_range_displayed } from '../../../core/data';
import PropTypes from 'prop-types';

export default function PaginationSection(props) {
  const did_items = useSelector(
    (state) => state.did_management_reducer.did_items
  );

  console.log('length = ', did_items.length);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <Pagination
          prevPageText="prev"
          nextPageText="next"
          itemClass="page-item"
          linkClass="page-link"
          activePage={props.currentPage}
          itemsCountPerPage={items_count_per_page}
          totalItemsCount={did_items.length}
          pageRangeDisplayed={page_range_displayed}
          onChange={(e) => props.setCurrentPage(e)}
        />
      </div>
    </div>
  );
}

PaginationSection.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
