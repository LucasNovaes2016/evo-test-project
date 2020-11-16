import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { SET_DID_ITEMS } from '../../../../core/redux/types';
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
        setTrClassName(null);
        toast.success('item successfully removed.');
        dispatch({ type: SET_DID_ITEMS, payload: data });
      });
  };

  return (
    <tr key={props.index} className={trClassName}>
      <td>{props.didItem.value}</td>
      <td>{props.didItem.monthyPrice}</td>
      <td>{props.didItem.setupPrice}</td>
      <td>{props.didItem.currency}</td>
      <td>
        <a href="#editEmployeeModal" className="edit">
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
