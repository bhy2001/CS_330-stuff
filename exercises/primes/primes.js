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
function getNPrimes() {}

/**
 * Print a table of prime numbers
 *
 * @param {number} number number of primes to display
 * @param {string} selector element to use for display
 */
function printNPrimes(number, selector) {}

/**
 * Display warning about missing URL query parameters
 *
 * @param {Object} urlParams URL parameters
 * @param {string} selector element to use for display
 */
function displayWarnings(urlParams, selector) {
  const qString = window.location.search;
  urlParams = new URLSearchParams(qString);
  if (urlParams.has("name") == false) {
    greet("student", "#greeting");
  }
  if (urlParams.has("number") == false) {
    printNumberInfo("330", "#numberInfo");
  }
}

window.onload = function () {
  // TODO: Initialize the following variables
  let urlParams = "";
  let name = "";
  let number = "";
  this.displayWarnings(urlParams, "#warnings");
  greet(name, "#greeting");
  printNumberInfo(number, "#numberInfo");
  printNPrimes(number, "table#nPrimes");
};
