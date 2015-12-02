// ==UserScript==
// @name        Chatzy global skin
// @namespace   Raku
// @include     http://*.chatzy.com/*
// @version     1.0
// @description Makes chatzy use the skin you set in your preferences globally(in all rooms) 
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @run-at      document-start
// ==/UserScript==
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ChatzySkin\s*\=\s*([^;]*).*$)|^.*$/, '$1');
var url = document.getElementById('X457').href;
var urlmatch = url.split(':') [4];
window.setInterval(function () {
  document.getElementById('X457').href = document.getElementById('X457').href.replace(urlmatch, cookieValue);
}, 1000);
