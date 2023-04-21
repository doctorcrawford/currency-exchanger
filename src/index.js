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
        ${currencyResponse.message}`;
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

function printCurrencies(response) {
  console.log(response);
}

function printError(error) {
  console.log(error);
}


window.addEventListener("load", function () {
  getCurrencies();
});