/* jshint esversion: 8 */
/* jshint browser: true */
"use strict";

var outputScreen;
var clearOnEntry;
var equtn;

/**
 * Display a digit on the `outputScreen`
 *
 * @param {number} digit digit to add or display on the `outputScreen`
 */
function enterDigit(digit) {
  if (outputScreen.innerHTML == "Infinity") {
    equtn = "";
  }
  let screen = document.querySelector("#result");
  if (screen.innerHTML == "0") {
    screen.innerHTML = `${digit}`;
    equtn = digit.toString();
  } else {
    screen.innerHTML += `${digit}`;
    equtn += digit;
  }
}

/**
 * Clear `outputScreen` and set value to 0
 */
function clear_screen() {
  if (clearOnEntry == true) {
    outputScreen.innerHTML = "0";
  }
  equtn = "0";
}

/**
 * Evaluate the expression and display its result or *ERROR*
 */
function eval_expr() {
  try {
    if (outputScreen.innerHTML == "&nbsp;") {
      outputScreen.innerHTML = "0";
      equtn = "0";
    } else {
      let result = eval(equtn);
      outputScreen.innerHTML = `${result}`;
      if (result == "Infinity") {
        equtn = "";
      }
    }
  } catch (error) {
    outputScreen.innerHTML = "ERROR";
    equtn = "";
  }
}

/**
 * Display an operation on the `outputScreen`
 *
 * @param {string} operation to add to the expression
 */
function enterOp(operation) {
  if (outputScreen.innerHTML == "Infinity") {
    equtn = "";
  }
  let screen = document.querySelector("#result");
  if (screen.innerHTML == "0") {
    screen.innerHTML = `${operation}`;
  } else {
    screen.innerHTML += `${operation}`;
  }
  equtn += operation;
}

window.onload = function () {
  outputScreen = document.querySelector("#result");
  clearOnEntry = true;
  equtn = "";
};
