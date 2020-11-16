import React from 'react';
import { useSelector } from 'react-redux';
import { items_count_per_page } from '../../../core/data';
import logo from '../../../core/assets/giphy.webp';
import PropTypes from 'prop-types';
import ListItem from './listitem';

export default function ListItems(props) {
  const did_items = useSelector(
    (state) => state.did_management_reducer.did_items
  );

  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Value</th>
              <th>Monthy Price</th>
              <th>Setup Price</th>
              <th>Currency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {did_items.length ? (
              did_items
                .slice(
                  props.currentPage * items_count_per_page -
                    items_count_per_page,
                  props.currentPage * items_count_per_page - 1
                )
                .map((did_item, index) => (
                  <ListItem index={index} didItem={did_item} />
                ))
            ) : (
              <tr className="text-center">
                <td colSpan={5}>
                  <img src={logo} alt="loading..." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ListItems.propTypes = {
  currentPage: PropTypes.number.isRequired,
};
