/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
"use strict";

/**
 * Greet user by name
 *
 * @param {string} name visitor's name
 * @param {string} selector element to use for display
 */
function greet(name, selector) {
  const qString = window.location.search;
  const Param = new URLSearchParams(qString);
  if (Param.has("name") == true) {
    name = Param.get("name");
  } else {
    name = "student";
  }
  document.querySelector(selector).innerHTML = `Hello, ${name}`;
}

/**
 * Check if a number is prime
 *
 * @param {number} number number to check
 * @return {boolean} result of the check
 */
function isPrime(number) {
  var number = Number(number);
  let PrimeChecker = 1;
  if (number <= 0) {
    PrimeChecker = 0;
    return false;
  }
  if (number == 1) {
    return true;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i == 0) {
      PrimeChecker = 0;
    }
  }
  if (PrimeChecker == 1) {
    return true;
  } else {
    return false;
  }
}

/**
 * Print whether a number is prime
 *
 * @param {number} number number to check
 * @param {string} selector element to use for display
 */
function printNumberInfo(number, selector) {
  const qString = window.location.search;
  const Param = new URLSearchParams(qString);
  if (Param.has("number") == true) {
    number = Param.get("number");
  } else {
    number = "330";
  }
  number = Number(number);
  var PrimeChecker = isPrime(number);
  if (PrimeChecker == true) {
    document.querySelector(selector).innerHTML = `${number} is a prime number`;
  }
  if (PrimeChecker == false) {
    document.querySelector(
      selector
    ).innerHTML = `${number} is not a prime number`;
  }
}

/**
 * Generate an array of prime numbers
 *
 * @param {number} number number of primes to generate
 * @return {number[]} an array of `number` prime numbers
 */
function getNPrimes(number = 330) {
  const result = [];
  let count = 2;
  while (result.length < number) {
    if (isPrime(count)) {
      result.push(count);
    }
    count++;
  }
  return result;
}

/**
 * Helper function
 */

function createRow(tR = "tr", tD = "td", tText = "") {
  const tRow = document.createElement(tR);
  const tData = document.createElement(tD);
  tRow.appendChild(tData);
  tData.innerText = tText.toString();
  return tRow;
}

/**
 * Print a table of prime numbers
 *
 * @param {number} number number of primes to display
 * @param {string} selector element to use for display
 */
function printNPrimes(number = 330, selector) {
  const qString = window.location.search;
  const Param = new URLSearchParams(qString);
  if (Param.has("number") == true) {
    number = Param.get("number");
  } else {
    number = "330";
  }
  number = Number(number);
  let PrimeArray = getNPrimes(number);
  const TableHead = document.querySelector(`${selector} thead`);
  const TableHeadRow = createRow("tr", "th", `First ${number} prime(s)`);
  TableHead.appendChild(TableHeadRow);

  const TableBody = document.querySelector(`${selector} tbody`);
  for (let i = 0; i < PrimeArray.length; i++) {
    const TableBodyRow = createRow("tr", "td", PrimeArray[i]);
    TableBody.appendChild(TableBodyRow);
  }
}

/**
 * Display warning about missing URL query parameters
 *
 * @param {Object} urlParams URL parameters
 * @param {string} selector element to use for display
 */
function displayWarnings(urlParams, selector) {
  // const qString = window.location.search;
  // const Param = new URLSearchParams(qString);
  // let WarnDiv = document.querySelector(selector);
  // if (Param.has("name") == null) {
  //   let MsgContainerName = document.createElement("div");
  //   MsgContainerName.innerText = "You did not provide any name";
  //   MsgContainerName.classList.add("alert", "alert-danger");
  //   WarnDiv.appendChild(MsgContainerName);
  // }
  // if (Param.has("number") == null) {
  //   let MsgContainerNumber = document.createElement("div");
  //   MsgContainerNumber.innerText = "You did not provide any number";
  //   MsgContainerNumber.classList.add("alert", "alert-warning");
  //   WarnDiv.appendChild(MsgContainerNumber);
  // }

  let name = urlParams["name"];
  let number = urlParams["number"];
  const WarnContainer = document.querySelector(selector);
  if (!urlParams.has("name")) {
    let MsgContainerName = document.createElement("div");
    MsgContainerName.innerHTML = "You did not provide any name";
    MsgContainerName.classList.add("alert", "alert-danger");
    WarnContainer.appendChild(MsgContainerName);
  }
  if (!urlParams.has("number")) {
    let MsgContainerNumber = document.createElement("div");
    MsgContainerNumber.innerHTML = "You did not provide any number";
    MsgContainerNumber.classList.add("alert", "alert-warning");
    WarnContainer.appendChild(MsgContainerNumber);
  }
}

window.onload = function () {
  // TODO: Initialize the following variables
  let urlParams = new URLSearchParams(window.location.search);
  let name = urlParams["name"] || "student";
  let number = urlParams["number"] || 330;
  this.displayWarnings(urlParams, "#warnings");
  greet(name, "#greeting");
  printNumberInfo(number, "#numberInfo");
  printNPrimes(number, "table#nPrimes");
};
