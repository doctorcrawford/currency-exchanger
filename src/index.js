import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

// Business Logic

function getCurrencies() {
  CurrencyService.getCurrencies()
    .then(function (currencyResponse) {
      if (currencyResponse instanceof Error) {
        const errorMessage = `There was a problem accessing the currency data from ExchangeRate API:
         ${currencyResponse}`;
        throw new Error(errorMessage);
      }
      const currencies = currencyResponse.conversion_rates;
      printCurrencies(currencies);
      for (const currency in currencies) {
        sessionStorage.setItem(currency, currencies[currency]);
      }
    })
    .catch(function (error) {
      printError(error);
    });
}

function runExchange(inputAmt, exchangeRate) {
  let exchangedAmt = inputAmt * exchangeRate;
  return exchangedAmt;
}


// UI Logic

function printCurrencies(currencies) {
  const dropDown = document.getElementById("currencies");
  const currencyArray = Object.keys(currencies);
  currencyArray.forEach((currency) => {
    const option = document.createElement("option");
    option.setAttribute("value", currency);
    option.innerText = currency;
    dropDown.append(option);
  });
}

function printError(error) {
  const exchangeDiv = document.getElementById("exchange-div");
  exchangeDiv.innerText = error;
}

function printExchange(amt, currency) {
  const result = document.getElementById("result");
  result.innerHTML = null;
  const p = document.createElement("p");
  p.innerText = `Dame figures you can get $${amt} ${currency}`;
  result.append(p);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const inputAmt = document.getElementById("input-amt").value;
  const exchangeCurrency = document.getElementById(
    "currencies").value;
  const exchangeRate = parseFloat(sessionStorage[exchangeCurrency]);
  const exchangeAmt = runExchange(inputAmt, exchangeRate);
  printExchange(exchangeAmt, exchangeCurrency);
}



window.addEventListener("load", function () {
  getCurrencies();
  this.document.getElementById("exchange-form").addEventListener("submit", handleFormSubmission);
});