export const handleValueError = (value) => {
  if (!value) return 'This field is required.';
  if (value.length !== 17) return 'this field must have exactly 17 characters.';
  return '';
};

export const handlePriceError = (monhtyPrice) => {
  if (!monhtyPrice) return 'This field is required.';
  if (isNaN(monhtyPrice)) return 'This field must be a number.';
  if (monhtyPrice.length > 6)
    return 'this field should be no longer than 6 characters.';
  return '';
};

export const handleCurrencyError = (currency) => {
  if (!currency) return 'This field is required.';
  if (currency.length > 3)
    return 'this field should be no longer than 3 characters.';
  return '';
};
