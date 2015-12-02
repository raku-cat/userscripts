// ==UserScript==
// @name        Chatzy commands
// @namespace   Raku
// @description Adds extra commands(prefixed with !)
// @include     http://*.chatzy.*/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
var ref = GM_getValue('ref');
var input = $('#X91').val();
$('#X91').on('keydown', function (e) {
  if (e.keyCode == 13) {
    if (input == '!ref') {
      $('#X91').val('test');
    }
    //   if (input.substring(0, 9) === '!ref add ') {
    //GM_setValue('ref', input.substring(9));
    //   console.log('test');
    //}

  }
});
