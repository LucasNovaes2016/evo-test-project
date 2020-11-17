import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_DID_ITEMS,
  SET_EDIT_DID_ITEM_ID,
  SET_BLOCK_CRITICAL_LAYOUT_PARTS,
} from '../../../../core/redux/types';
import { toast } from 'react-toastify';

export default function ListItem(props) {
  const dispatch = useDispatch();

  const block_critical_layout_parts = useSelector(
    (state) => state.did_management_reducer.block_critical_layout_parts
  );

  const handleDelete = (id) => {
    dispatch({
      type: SET_BLOCK_CRITICAL_LAYOUT_PARTS,
      payload: true,
    });

    fetch(`/api/did-items-list/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_BLOCK_CRITICAL_LAYOUT_PARTS,
          payload: false,
        });

        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else {
          toast.success('item successfully removed.');
        }
        dispatch({
          type: SET_DID_ITEMS,
          payload: JSON.parse(data.new_did_items_list),
        });
      });
  };

  const handleEdit = (id) => {
    dispatch({
      type: SET_EDIT_DID_ITEM_ID,
      payload: id,
    });
  };

  return (
    <tr key={props.index}>
      <td>{props.didItem.value}</td>
      <td>{props.didItem.monthyPrice}</td>
      <td>{props.didItem.setupPrice}</td>
      <td>{props.didItem.currency}</td>
      <td className={block_critical_layout_parts ? 'user-disabled' : null}>
        <a
          href="#editEmployeeModal"
          className="edit"
          onClick={() => handleEdit(props.didItem.id)}
        >
          <i className="material-icons" data-toggle="tooltip" title="Edit">
            &#xE254;
          </i>
        </a>
        <a
          href="#deleteEmployeeModal"
          className="delete"
          onClick={() => handleDelete(props.didItem.id)}
        >
          <i className="material-icons" data-toggle="tooltip" title="Delete">
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  );
}

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  didItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    monthyPrice: PropTypes.string.isRequired,
    setupPrice: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  }),
};
