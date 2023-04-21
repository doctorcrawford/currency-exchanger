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
      const inputDropDown = "input-currency";
      const outputDropDown = "output-currency";
      buildDropdown(currencies, inputDropDown);
      buildDropdown(currencies, outputDropDown);
      for (const currency in currencies) {
        sessionStorage.setItem(currency, currencies[currency]);
      }
    })
    .catch(function (error) {
      printError(error);
    });
}

function runExchange(inputAmt, inputCurrencyRate, outputCurrencyRate) {
  let usdAmt = inputAmt / inputCurrencyRate;
  let exchangedAmt = (usdAmt * outputCurrencyRate).toFixed(2);
  return exchangedAmt;
}


// UI Logic

function buildDropdown(values, whichDropdown) {
  const dropdown = document.getElementById(whichDropdown);
  const valuesList = Object.keys(values);
  valuesList.forEach((value) => {
    const inputOption = document.createElement("option");
    inputOption.setAttribute("value", value);
    inputOption.innerText = value;
    dropdown.append(inputOption);
  });
}

function printError(error) {
  const exchangeDiv = document.getElementById("exchange-div");
  exchangeDiv.innerText = error;
}

function printExchange(amt, finalCurrency, startCurrency) {
  const result = document.getElementById("result");
  result.innerHTML = null;
  const p = document.createElement("p");
  p.innerText = `Dame figures you can get $${amt} ${finalCurrency} for your ${startCurrency}`;
  result.append(p);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const inputAmt = document.getElementById("input-amt").value;
  const inputCurrency = document.getElementById("input-currency").value;
  const outputCurrency = document.getElementById("output-currency").value;
  const inputCurrencyRate = parseFloat(sessionStorage[inputCurrency]);
  const outputCurrencyRate = parseFloat(sessionStorage[outputCurrency]);
  const finalAmt = runExchange(inputAmt, inputCurrencyRate, outputCurrencyRate);
  printExchange(finalAmt, outputCurrency, inputCurrency);
}



window.addEventListener("load", function () {
  getCurrencies();
  this.document.getElementById("exchange-form").addEventListener("submit", handleFormSubmission);
});