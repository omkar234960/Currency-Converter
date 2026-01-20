import './App.css'
import Currencytext from './Components/Currencytext'
import { useState, useEffect } from 'react';

const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

function App() {

  const [currencyCountry , setCurrencyCountry] = useState([])
  const [fromcurrency , setFromcurrency]  = useState("")
  const [tocurrency , setTocurrency] = useState("")
  const [amount , setAmount] = useState(1)
  const [amountfromcurrency , setAmountfromcurrency]= useState(true)
  const [exchangerate , setExchangerate] = useState(1)

  let toAmount, FromAmount;

  if(amountfromcurrency){
    FromAmount = amount;
    toAmount = amount * exchangerate;
  } else {
    toAmount = amount;
    FromAmount = amount / exchangerate;
  }

  useEffect(() => {
    async function loadData() {
      const response = await fetch(`${BASE_URL}USD`);
      const data = await response.json();

      setCurrencyCountry([
        ...new Set([data.base, ...Object.keys(data.rates)])
      ]);

      const first = Object.keys(data.rates)[0];
      setFromcurrency(data.base);
      setTocurrency(first);
      setExchangerate(data.rates[first]);
    }

    loadData();
  }, []);


  useEffect(() => {
    if (fromcurrency && tocurrency) {
      async function updateRate() {
        const response = await fetch(`${BASE_URL}${fromcurrency}`);
        const data = await response.json();
        setExchangerate(data.rates[tocurrency]);
      }
      updateRate();
    }
  }, [fromcurrency, tocurrency]);

  return (
    <>
      <h1>Convert-Currency</h1>

      <Currencytext
        currencyCountry={currencyCountry}
        selectedcurrency={fromcurrency}
        OnChangeCurrency={e => setFromcurrency(e.target.value)}
        amount={FromAmount}
        OnAmountChange={e => {
          setAmount(e.target.value);
          setAmountfromcurrency(true);
        }}
      />

      <br />
      <div className='equals'>=</div>
      <br />

      <Currencytext
        currencyCountry={currencyCountry}
        selectedcurrency={tocurrency}
        OnChangeCurrency={e => setTocurrency(e.target.value)}
        amount={toAmount}
        OnAmountChange={e => {
          setAmount(e.target.value);
          setAmountfromcurrency(false);
        }}
      />
    </>
  );
}

export default App;
