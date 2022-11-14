/* jshint esversion: 8 */
"use strict";

const BASE_URL =
  "http://bachhy2001.pythonanywhere.com/http://localhost:5000/api/v1";

async function get_jokes() {
  try {
    let language = document.querySelector("#selLang-01").value;
    let category = document.querySelector("#selCat-01").value;
    let number = document.querySelector("#inpNum").value;
    return fetch(`${BASE_URL}/${language}/${category}/${number}`)
      .then((response) => response.json())
      .then((json) => printData(json))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("something is wrong");
  }
}

async function get_jokes_ID(language, category, id) {
  try {
    let language = document.querySelector("#selLang-02").value;
    let category = document.querySelector("#selCat-02").value;
    let id = document.querySelector("#inpID-02").value;
    return fetch(`${BASE_URL}/${language}/${category}/1/${id}`)
      .then((response) => response.json())
      .then((json) => printData(json))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("something is wrong");
  }
}

function printData(json) {
  let joke_div = document.querySelector("#jokes");
  joke_div.innerHTML = "";
  for (index in json) {
    let para = document.createElement("p");
    para.innerHTML = json[index];
    joke_div.appendChild(para);
  }
}
