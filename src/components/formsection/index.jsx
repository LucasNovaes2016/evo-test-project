import React, { useState, useEffect } from 'react';

export default function FormSection() {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const [monthyPrice, setMonthyPrice] = useState('');
  const [monthyPriceError, setMonthyPriceError] = useState('');
  const [setupPrice, setSetupPrice] = useState('');
  const [setupPriceError, setSetupPriceError] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencyError, setCurrencyErrror] = useState('');

  const handleSubmit = () => {};

  return (
    <form className="mt-2">
      <div className="container">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label id="value-input">Value</label>
            <input
              type="text"
              aria-labelledby="value-input"
              className="form-control"
            />
            <div className="invalid-feedback d-block">{valueError}</div>
          </div>
          <div className="form-group col-md-6">
            <label id="monthy-price">Monthy Price</label>
            <input
              type="text"
              aria-labelledby="monthy-price"
              className="form-control"
            />
            <div className="invalid-feedback d-block">{monthyPriceError}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label id="setup-price">Setup Price</label>
            <input
              aria-labelledby="setup-price"
              type="text"
              className="form-control"
            />
            <div className="invalid-feedback d-block">{setupPriceError}</div>
          </div>
          <div className="form-group col-md-6">
            <label id="currency">Currency</label>
            <input
              aria-labelledby="currency"
              type="text"
              className="form-control"
            />
            <div className="invalid-feedback d-block">{currencyError}</div>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="btn btn-block btn-success"
            onSubmit={handleSubmit}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
}
