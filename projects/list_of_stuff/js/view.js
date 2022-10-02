/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
"use strict";

var CountryList = ["Japan", "United States", "Korea", "China"];
var StatusList = ["Ongoing", "Completed"];

/**
 * Populate a selector with options
 *
 * @param {String} selectorID id of the `select` to populate with options
 * @param {String} optionName name of the option
 */

function populateSelectorOptions(selectorID, optionList) {
  let selectorElement = document.querySelector(`#${selectorID}`);
  for (let stuff of optionList) {
    let optElement = document.createElement("option");
    optElement.value = stuff.toString();
    optElement.innerText = stuff;
    selectorElement.appendChild(optElement);
  }
}

class LibraryView {
  constructor(model) {
    this.redrawTable(model._collection);
    model.subscribe(this.redrawTable.bind(this));
  }

  redrawTable(listOfComics) {
    let tblBody = document.querySelector("#myComics > tbody");
    tblBody.innerHTML = "";
    if (listOfComics) {
      for (let comic of listOfComics) {
        let row = document.createElement("tr");

        let cellChecked = document.createElement("td");
        let cb = document.createElement("input");
        cb.setAttribute("type", "checkbox");
        cb.setAttribute("scope", "row");
        cellChecked.appendChild(cb);
        row.appendChild(cellChecked);

        let cellTitle = document.createElement("td");
        cellTitle.innerText = comic.title;
        row.appendChild(cellTitle);

        let cellAuthor = document.createElement("td");
        cellAuthor.innerText = comic.author;
        row.appendChild(cellAuthor);

        let cellCountry = document.createElement("td");
        cellCountry.innerText = comic.country;
        row.appendChild(cellCountry);

        let cellRelease = document.createElement("td");
        cellRelease.innerText = new Date(comic.release).toDateString();
        row.appendChild(cellRelease);

        let cellStatus = document.createElement("td");
        cellStatus.innerText = comic.status;
        row.appendChild(cellStatus);

        tblBody.appendChild(row);
      }
    }
  }
}

window.onload = function () {
  populateSelectorOptions("selCountry", CountryList);
  populateSelectorOptions("selStatus", StatusList);
};
