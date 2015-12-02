// ==UserScript==
// @name        Chatzy time align
// @namespace   Raku
// @description Fixes time align
// @include     http://*.chatzy.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant       none
// ==/UserScript==
window.setInterval(function () {
  $('.a').each(function () {
    $('.X724', $(this)).prependTo($(this));
  });
}, 64);
// Thanks dust ;3c
window.setInterval(function () {
  $('img[src^="/elements/icon16/visitor2/"][src$="3.gif"]').replaceWith('<nobr>&</nobr>');
  $('img[src^="/elements/icon16/visitor2/"][src$="2.gif"]').replaceWith('<nobr>%</nobr>');
}, 64);
$('head').append('<link href=\'https://fonts.googleapis.com/css?family=Jura:500\' rel=\'stylesheet\' type=\'text/css\'>');
