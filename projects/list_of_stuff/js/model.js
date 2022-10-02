/* jshint esversion: 8 */
/* jshint strict: true */
/* jshint node: true */
"use strict";

class Comic {
  constructor(title, author, country, release, status) {
    this._title = title;
    this._author = author;
    this._country = country;
    this._release = release;
    this._status = status;
  }

  get title() {
    return this._title;
  }
  get author() {
    return this._author;
  }
  get country() {
    return this._country;
  }
  get release() {
    return this._release;
  }
  get status() {
    return this._status;
  }

  toString() {
    return `${this._title} by ${this._author}`;
  }
}

class Subject {
  constructor() {
    this.handlers = [];
  }

  subscribe(func) {
    this.handlers.push(func);
  }

  publish(msg, obj) {
    let scope = obj || window;
    for (let func of this.handlers) {
      func(scope, msg);
    }
  }
}

class Library extends Subject {
  constructor() {
    super();
    this._collection = [];

    this.localLibrary = window.localStorage.getItem("myComicLibrary");
    if (this.localLibrary) {
      this.localLibrary = JSON.parse(this.localLibrary);
      for (let comic of this.localLibrary) {
        let newComic = new Comic(
          comic["_title"],
          comic["_author"],
          comic["_country"],
          comic["_released"],
          comic["_status"]
        );
        this._collection.push(newComic);
      }
    } else {
      this.localLibrary = [];
    }
  }

  add(newComic) {
    this._collection.push(newComic);
    this.localLibrary.push(newComic);
    window.localStorage.setItem(
      "myComicLibrary",
      JSON.stringify(this.localLibrary)
    );
  }

  [Symbol.iterator]() {
    let index = -1;
    return {
      next: () => ({
        value: this._collection[++index],
        done: !(index in this._collection),
      }),
    };
  }

  get length() {
    return this._collection.length;
  }

  del_all() {
    this._collection = [];
    this.localLibrary = [];
    window.localStorage.setItem(
      "myComicLibrary",
      JSON.stringify(this.localLibrary)
    );
  }

  del_row() {
    return;
  }
}
