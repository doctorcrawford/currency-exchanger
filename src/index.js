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
    })
    .catch(function (error) {
      printError(error);
    });
}



// UI Logic

function printCurrencies(currencies) {
  console.log(currencies);
  const dropDown = document.getElementById("currencies");
  const currencyArray = Object.keys(currencies);
  currencyArray.forEach((currency) => {
    const option = document.createElement("option");
    option.setAttribute("value", currency);
    option.innerText = currency;
    dropDown.append(option);
  });

}

function printError(error, errorResponse) {
  console.log(error, errorResponse);
}


window.addEventListener("load", function () {
  getCurrencies();
});