import React from "react";

function Currencytext(props) {
  const {
    currencyCountry,
    selectedcurrency,
    OnChangeCurrency,
    amount,
    OnAmountChange
  } = props;

  return (
    <>
      <input 
        type="number" 
        value={amount}
        onChange={OnAmountChange}
      />

      <select value={selectedcurrency} onChange={OnChangeCurrency}>
        {currencyCountry.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </>
  );
}

export default Currencytext;
