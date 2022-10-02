/* jshint esversion: 8 */
/* jshint browser: true */
"use strict;";

var team = [
  "Aardvark",
  "Beaver",
  "Cheetah",
  "Dolphin",
  "Elephant",
  "Flamingo",
  "Giraffe",
  "Hippo",
];
var priority = ["Low", "Normal", "Important", "Critical"];

/**
 * Add a new task to the list
 *
 * Validate form, collect input values, and add call `addRow` to add a new row to the table
 */
function addTask() {
  // TODO: Implement this function
  let vals = [];
  let rowcolids = ["title", "assignedTo", "priority", "dueDate"];
  for (let row of rowcolids) {
    let info = document.getElementById(row).value;
    if (info == "") {
      let warn_msg = document.querySelector("#feedbackMessage");
      
      warn_msg.innerHTML = "Fill out title and due date";
      break;
    } else {
      let warn_msg = document.querySelector("#feedbackMessage");
      warn_msg.innerHTML = "";
      warn_msg.classList.add("invisible");
    }
    vals.push(info);
  }
  let warn_msg = document.querySelector("#feedbackMessage");
  if (warn_msg.innerHTML == "") {
    addRow(vals, document.getElementById("taskList"));
  }

  // let warn_msg = document.querySelector("#feedbackMessage");
  // warn_msg.innerHTML = "Fill out title and due date";
}

/**
 * Add a new row to the table
 *
 * @param {string[]} valueList list of task attributes
 * @param {Object} parent DOM node to append to
 */
function addRow(valueList, parent) {
  // TODO: Implement this function
  let row = document.createElement("tr");
  row.classList.add(valueList[2].toLowerCase());
  let cb = document.createElement("input");
  cb.setAttribute("type", "checkbox");
  cb.setAttribute("scope", "row");
  row.appendChild(cb);
  for (let value in valueList) {
    let td = document.createElement("td");
    row.appendChild(td);
    td.innerText = valueList[value].toString();
  }
  parent.appendChild(row);
}

/**
 * Remove a table row corresponding to the selected checkbox
 *
 * https://stackoverflow.com/questions/26512386/remove-current-row-tr-when-checkbox-is-checked
 */
function removeRow() {
  // TODO: Implement this function
  $("input").on("changed", function () {
    $("input:checked").not(".all").parents("tr").remove();
  });
}

/**
 * Remove all table rows
 *
 */
function selectAll() {}

/**
 * Add options to the specified element
 *
 * @param {string} selectId `select` element to populate
 * @param {string[]} sList array of options
 */
function populateSelect(selectId, sList) {
  // TODO: Implement this function
  let sel = document.getElementById(selectId, sList);
  for (let opt of sList) {
    let Option = document.createElement("option");
    // console.log(opt);
    Option.setAttribute("value", opt);
    Option.innerHTML = opt;
    sel.appendChild(Option);
  }
}

window.onload = function () {
  populateSelect("assignedTo", team);
  populateSelect("priority", priority);
  removeRow();
};
