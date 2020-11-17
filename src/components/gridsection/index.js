import React, { useState, useEffect } from 'react';
import ListItems from './listitems';
import { useSelector, useDispatch } from 'react-redux';
import PaginationSection from './paginationsection';
import { SET_WAS_DID_ITEM_ADDED } from '../../core/redux/types';

export default function GridSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const was_did_item_added = useSelector(
    (state) => state.did_management_reducer.was_did_item_added
  );

  useEffect(() => {
    if (was_did_item_added) {
      setCurrentPage(1);
      dispatch({
        type: SET_WAS_DID_ITEM_ADDED,
        payload: false,
      });
    }
  }, [was_did_item_added, dispatch]);

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
