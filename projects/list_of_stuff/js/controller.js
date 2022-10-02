/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
"use strict";

var myLibraryModel = new Library();
var myLibraryView = new LibraryView(myLibraryModel);

/**
 * Add a new comic to the list
 *
 */
function addComic() {
  let message = document.querySelector("#message");
  message.innerText = "Fill in Title and Author, or Release Date";
  let title = document.querySelector("#title").value;
  if (title == "") {
    message.classList.remove("invisible");
    return;
  } else {
    message.classList.add("invisible");
  }
  let author = document.querySelector("#author").value;
  if (author == "") {
    message.classList.remove("invisible");
    return;
  } else {
    message.classList.add("invisible");
  }
  let country = document.querySelector("#SelCountry").value;
  let release = document.querySelector("#release").value;
  if (release == "") {
    message.classList.remove("invisible");
    return;
  } else {
    message.classList.add("invisible");
  }
  let status = document.querySelector("#SelStatus").value;

  let newComic = new Comic(title, author, country, release, status);
  myLibraryModel.add(newComic);
}

function DeleteAll() {
  myLibraryModel.del_all();
  myLibraryView.redrawTable();
}

function DeleteRow() {
  return;
}
