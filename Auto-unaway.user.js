// ==UserScript==
// @name        Auto-unaway
// @namespace   Raku
// @description Automatically unsets your away
// @include     http://*.chatzy.*/*
// @version     2.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
window.setInterval(function () {
  if ($('input[value="I am here!"]').is(':visible')) {
    $('input[value="I am here!"]').trigger('click');
    $('form#X114').submit();
  }
}, 150);
if ($('a#X403').is(':visible')) {
  $('a#X403').trigger('click');
}
