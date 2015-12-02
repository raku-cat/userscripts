// ==UserScript==
// @name        Chatzy frame style
// @namespace   Raku
// @description uses frame stylesheet
// @include     http://*.chatzy.com/*
// @version     1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @run-at      document-start
// ==/UserScript==
window.setInterval(function () {
  document.getElementById('X457').href = document.getElementById('X457').href.replace('default', 'frame');
}, 1000);
