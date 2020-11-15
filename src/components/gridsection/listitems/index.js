import React from 'react';
import { useSelector } from 'react-redux';
import { items_count_per_page } from '../../../core/data';
import logo from '../../../core/assets/giphy.webp';
import PropTypes from 'prop-types';

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
                  <tr key={index}>
                    <td>{did_item.value}</td>
                    <td>{did_item.monthyPrice}</td>
                    <td>{did_item.setupPrice}</td>
                    <td>{did_item.currency}</td>
                    <td>
                      <a href="#editEmployeeModal" className="edit">
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a href="#deleteEmployeeModal" className="delete">
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          &#xE872;
                        </i>
                      </a>
                    </td>
                  </tr>
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
