// ==UserScript==
// @name        Chatzy shorthands
// @namespace   Raku
// @description Makes the formatting shorthanded
// @include     http://*chatzy.*/*
// @version     1.01
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==  
$('#X91').on('keydown', function (e) {
  if (e.keyCode == 13) {
    this.value = this.value.replace(/\*([^*]+?)\*/g, '[b]$1[/b]');
    this.value = this.value.replace(/\_([^*]+?)\_/g, '[u]$1[/u]');
    this.value = this.value.replace(/\^([^*]+?)\^/g, '[i]$1[/i]');
  }
});
// Thanks dust ;3c
