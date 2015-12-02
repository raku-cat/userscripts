// ==UserScript==
// @name        Chatzy commands
// @namespace   Raku
// @description Adds extra commands(prefixed with !)
// @include     http://*.chatzy.*/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require     http://www.rakutiki.tv/userscripts/jquery.cookie.js
// ==/UserScript==
var ref = $.cookie('ref')
$('#X91').on('keydown', function (e) {
  if (e.keyCode == 13) {
    if ($('#X91').val() == '!ref') {
      $('#X91').val(ref);
      $('form#X114').submit();
    }
    if ($('#X91')).val = '!ref add https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpg|gif|png)$') {
      $.cookie('ref', this.value())
    }
  }
});
