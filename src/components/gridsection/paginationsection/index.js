import React from 'react';
import Pagination from 'react-js-pagination';
import { items_count_per_page, page_range_displayed } from '../../../core/data';
import PropTypes from 'prop-types';

export default function PaginationSection(props) {
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
          totalItemsCount={800}
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
