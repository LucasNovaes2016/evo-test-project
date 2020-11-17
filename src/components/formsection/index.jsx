import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_DID_ITEMS,
  SET_WAS_DID_ITEM_ADDED,
  SET_EDIT_DID_ITEM_ID,
  SET_BLOCK_CRITICAL_LAYOUT_PARTS,
} from '../../core/redux/types';
import {
  handleCurrencyError,
  handlePriceError,
  handleValueError,
} from '../../core/utils';
import { toast } from 'react-toastify';

export default function FormSection() {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const [monthyPrice, setMonthyPrice] = useState('');
  const [monthyPriceError, setMonthyPriceError] = useState('');
  const [setupPrice, setSetupPrice] = useState('');
  const [setupPriceError, setSetupPriceError] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  const dispatch = useDispatch();

  const edit_did_item_id = useSelector(
    (state) => state.did_management_reducer.edit_did_item_id
  );

  const did_items = useSelector(
    (state) => state.did_management_reducer.did_items
  );

  const block_critical_layout_parts = useSelector(
    (state) => state.did_management_reducer.block_critical_layout_parts
  );

  useEffect(() => {
    if (edit_did_item_id) {
      const edit_did_item = did_items.find(
        (item) => item.id === edit_did_item_id
      );
      setValue(edit_did_item.value);
      setMonthyPrice(edit_did_item.monthyPrice);
      setSetupPrice(edit_did_item.setupPrice);
      setCurrency(edit_did_item.currency);
    } else {
      resetAllFields();
      resetAllErrors();
    }
  }, [edit_did_item_id]);

  const resetAllFields = () => {
    setValue('');
    setMonthyPrice('');
    setSetupPrice('');
    setCurrency('');
  };

  const resetAllErrors = () => {
    setValueError('');
    setMonthyPriceError('');
    setSetupPriceError('');
    setCurrencyError('');
  };

  const resetAllFieldsAndErrors = () => {
    resetAllFields();
    resetAllErrors();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const value_error = handleValueError(value);
    const monthy_price_error = handlePriceError(monthyPrice);
    const setup_price_error = handlePriceError(setupPrice);
    const currency_error = handleCurrencyError(currency);

    if (
      !value_error &&
      !monthy_price_error &&
      !setup_price_error &&
      !currency_error
    ) {
      dispatch({
        type: SET_BLOCK_CRITICAL_LAYOUT_PARTS,
        payload: true,
      });

      const new_or_updated_item = JSON.stringify({
        value,
        monthyPrice,
        setupPrice,
        currency: currency.toUpperCase(),
      });

      if (edit_did_item_id) {
        fetch(`/api/did-items-list/${edit_did_item_id}`, {
          method: 'PUT',
          body: new_or_updated_item,
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch({
              type: SET_BLOCK_CRITICAL_LAYOUT_PARTS,
              payload: false,
            });

            if (data.errorMessage) {
              console.log('data = ', data);
              toast.error(data.errorMessage);

              dispatch({
                type: SET_DID_ITEMS,
                payload: data.new_did_items_list,
              });

              console.log('data = ', data);
              if (data.errorCode === 1) resetAllFieldsAndErrors();
            } else {
              toast.success('Item successfully updated.');
              dispatch({
                type: SET_DID_ITEMS,
                payload: JSON.parse(data.new_did_items_list),
              });
              dispatch({
                type: SET_EDIT_DID_ITEM_ID,
                payload: 0,
              });
              resetAllFieldsAndErrors();
            }
          });
      } else {
        fetch('/api/did-items-list', {
          method: 'POST',
          body: new_or_updated_item,
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
              toast.success('Item successfully added.');
              dispatch({
                type: SET_DID_ITEMS,
                payload: data.new_did_items_list,
              });
              dispatch({
                type: SET_WAS_DID_ITEM_ADDED,
                payload: true,
              });
              resetAllFieldsAndErrors();
            }
          });
      }
    } else {
      setValueError(value_error);
      setMonthyPriceError(monthy_price_error);
      setSetupPriceError(setup_price_error);
      setCurrencyError(currency_error);
    }
  };

  const handleValueChange = (e) => {
    if (value.slice(-1) === ' ') setValue(e.target.value);
    else
      setValue(
        e.target.value
          ? `+${e.target.value
              .replace(/\D/g, '')
              .replace(/(\d{2})(\d{2})/, '$1 $2 ')
              .replace(/(\d{5})(\d{4})/, '$1-$2')}`
          : ''
      );
  };

  return (
    <form
      className={`mt-3 ${block_critical_layout_parts ? 'user-disabled' : null}`}
    >
      <div className="container">
        <div className="form-row">
          <div className="form-group col-md-3">
            <label id="value-input">Value</label>{' '}
            <span className="required">*</span>
            <input
              aria-labelledby="value-input"
              value={value}
              onChange={handleValueChange}
              type="text"
              maxLength={16}
              className="form-control"
              required
            />
            <div className="invalid-feedback d-block">{valueError}</div>
          </div>
          <div className="form-group col-md-3">
            <label id="monthy-price">Monthy Price</label>{' '}
            <span className="required">*</span>
            <input
              type="number"
              aria-labelledby="monthy-price"
              value={monthyPrice}
              onChange={(e) => setMonthyPrice(e.target.value)}
              className="form-control"
              step=".01"
              required
            />
            <div className="invalid-feedback d-block">{monthyPriceError}</div>
          </div>
          <div className="form-group col-md-3">
            <label id="setup-price">Setup Price</label>{' '}
            <span className="required">*</span>
            <input
              aria-labelledby="setup-price"
              value={setupPrice}
              onChange={(e) => setSetupPrice(e.target.value)}
              type="number"
              className="form-control"
              step=".01"
              required
            />
            <div className="invalid-feedback d-block">{setupPriceError}</div>
          </div>
          <div className="form-group col-md-3">
            <label id="currency">Currency</label>{' '}
            <span className="required">*</span>
            <input
              aria-labelledby="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              maxLength={3}
              type="text"
              className="form-control"
              required
            />
            <div className="invalid-feedback d-block">{currencyError}</div>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="btn btn-block rounded-0 btn-success"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
