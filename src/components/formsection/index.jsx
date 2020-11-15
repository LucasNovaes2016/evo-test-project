import React, { useState } from 'react';
import {
  handleCurrencyError,
  handlePriceError,
  handleValueError,
} from '../../core/utils';

export default function FormSection() {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const [monthyPrice, setMonthyPrice] = useState('');
  const [monthyPriceError, setMonthyPriceError] = useState('');
  const [setupPrice, setSetupPrice] = useState('');
  const [setupPriceError, setSetupPriceError] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencyError, setCurrencyError] = useState('');

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
      resetAllFields();
      resetAllErrors();
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
    <form className="mt-3">
      <div className="container">
        <div className="form-row">
          <div className="form-group col-md-6">
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
          <div className="form-group col-md-6">
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
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
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
          <div className="form-group col-md-6">
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
