import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  SET_DID_ITEMS,
  SET_EDIT_DID_ITEM_ID,
} from '../../../../core/redux/types';
import { toast } from 'react-toastify';

export default function ListItem(props) {
  const [trClassName, setTrClassName] = useState('');

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    setTrClassName('tr-disabled');
    fetch(`/api/did-items-list/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else {
          toast.success('item successfully removed.');
        }

        setTrClassName(null);
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
    <tr key={props.index} className={trClassName}>
      <td>{props.didItem.value}</td>
      <td>{props.didItem.monthyPrice}</td>
      <td>{props.didItem.setupPrice}</td>
      <td>{props.didItem.currency}</td>
      <td>
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
