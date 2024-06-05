// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      v0.1 2024-06-05
// @description  episode observer для animenime.ru
// @author       https://github.com/3ricwebdev
// @match        https://animenime.ru/*
// @icon         https://img.icons8.com/?size=100&id=egk1r2ub33ve&format=png&color=000000
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  console.log("Наблюдатель активирован");
  const svb = document.querySelectorAll(".svb");
  let observer = new MutationObserver((mutationRecords) => {
    var currentEp = mutationRecords[1].target.innerText;
    localStorage.setItem("currentEpisode", currentEp);
    localStorage.setItem(
      "currentTitle",
      document.querySelector("h1").innerText
    );
    localStorage.setItem("currentURL", document.URL);
    render();
  });
  svb.forEach((el) => {
    observer.observe(el, {
      childList: true,
      subtree: true,
      attributes: true,
    });
    console.log("ok!");
  });
  if (localStorage.getItem("currentEpisode")) {
    const rcbLeft = document.querySelector(".rcb_left");
    rcbLeft.insertAdjacentHTML(
      "beforeend",
      `  <div id="currentEp"></div>
      `
    );
    render();
  }

  function render() {
    const dataEpisode = localStorage.getItem("currentEpisode");
    const dataTitle = localStorage.getItem("currentTitle");
    const currentURL = localStorage.getItem("currentURL");
    document.querySelector("#currentEp").innerHTML = `
          <a href=${currentURL} target="_blank">
            ${dataEpisode} [ ▸ ] ${dataTitle}
  
          </a>
          `;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <style>
          #currentEp {
            font-size: 20px;
            background-color: rgba(34, 38, 42, .65);
            color: white;
            padding: 10px;
            margin-top: 5px;
            border-radius: 15px;
            transition: all 350ms ease-in-out;
          }
          #currentEp:hover {
            background-color: rgba(34, 38, 42, .85);
          }
        </style>
      `
    );
  }
})();
