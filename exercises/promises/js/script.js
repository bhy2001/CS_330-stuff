/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
"use strict";

async function get_individual(num, all_numbers) {
  let smol_num = num - 1;
  let big_num = num + 1;
  const num_list = [smol_num, num, big_num];
  const numberlink = "http://numbersapi.com/";
  for (let num in num_list) {
    let num_link = numberlink + num_list[num].toString();
    let fetch_res = await fetch(num_link);
    let num_text = await fetch_res.text();
    let contain_div = document.createElement("div");
    contain_div.classList.add("row", "text-center");
    contain_div.setAttribute("id", "container-" + num_list[num].toString());
    let num_div = document.createElement("div");
    num_div.classList.add("number", "w-25", "p-2", "col-sm");
    num_div.setAttribute("id", "Result-Number");
    num_div.innerText = num_list[num].toString();
    let text_div = document.createElement("div");
    text_div.classList.add("w-25", "p-2", "col-sm");
    text_div.innerText = num_text;
    contain_div.appendChild(num_div);
    contain_div.appendChild(text_div);
    all_numbers.appendChild(contain_div);
  }
  // let big_num_link = numberlink + big_num.toString();
  // const big_num_fetch = await fetch(big_num_link);
  // let big_num_text = await big_num_fetch.text();
  // let big_div = document.createElement("div");
  // big_div.setAttribute("id", "bignum-mainDiv");
}

async function get_batch(num, all_numbers) {
  let smol_num = num - 1;
  let big_num = num + 1;
  const num_list = [smol_num, num, big_num];
  const numberlink = "http://numbersapi.com/";
  let batch_link = numberlink + smol_num.toString() + ".." + big_num.toString();
  let fetch_res = await fetch(batch_link);
  let num_batch = await fetch_res.json();
  for (let num in num_list) {
    let num_text = num_batch[num_list[num].toString()];
    let contain_div = document.createElement("div");
    contain_div.classList.add("row", "text-center");
    contain_div.setAttribute("id", "container-" + num_list[num].toString());
    let num_div = document.createElement("div");
    num_div.setAttribute("id", "Result-Number");
    num_div.classList.add("number", "w-25", "p-2", "col-sm");
    num_div.innerText = num_list[num].toString();
    let text_div = document.createElement("div");
    text_div.classList.add("w-25", "p-2", "col-sm");
    text_div.innerText = num_text;
    contain_div.appendChild(num_div);
    contain_div.appendChild(text_div);
    all_numbers.appendChild(contain_div);
  }
}

async function clickedon() {
  let num = parseInt(document.querySelector("#number").value);
  let all_numbers = document.querySelector("#number_info");
  if (document.querySelector("#batch").checked) {
    get_batch(num, all_numbers);
  } else {
    get_individual(num, all_numbers);
  }
}
