// ==UserScript==
// @name        Chatzy commands
// @namespace   Raku
// @description Adds extra commands(prefixed with !)
// @include     http://*.chatzy.*/*
// @version     .0
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
// dust
$('#X91').on('keydown', function (e) {
  var refUrl = GM_getValue('ref');
  var input = $('#X91').val();
  if (e.keyCode == 13) {
    if (input.substr(0, 5) === '!ref ') {
      $('#X91').val(GM_getValue('ref' + input.split(' ') [1]));
    }
    if (input.substr(0, 9) === '!ref add ') {
      e.preventDefault();
      GM_setValue('ref' + input.split(' ') [2], input.split(' ') [3]);
      $('#X91').val('');
      alert('Ref URL added, post with !ref ' + input.split(' ') [2]);
    }
  }
});
