// ==UserScript==
// @name        Chatzy+
// @namespace   Raku
// @description Adds extra functionality to chatzy
// @include     http://*.chatzy.*/*
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
// dust
if !(GM_getValue('firstrun') == 'false') {
  if (confirm('Welcome to chatzy+!\nThis script adds several new functions to chatzy in the form of input line commands, click OK to learn more about the available commands and features, otherwise you can run !help to bring up the menu later.\nBy continuing to use this script you agree that the author and any contributors are not responsible for anything that may happen.')) {
    helpdialog();
    GM_setValue('firstrun', 'false');
  } else {
    GM_setValue('firstrun', 'false');
  }
}
$('#X91').on('keydown', function (e) {
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
    if (input == '!help') {
      e.preventDefault();
      $('#X91').val('');
      function helpdialog() {
      alert('Command listing, things wrapped in <> should not be typed with the <> surrounding them\n!ref add <name> <url> - Stores the specified url under the specified name.\n!ref <name> - Posts the stored ref with that name.\n!short on/off - Turns shorthands on or off, shorthands are as follows:\nWrap text in ^(\"^the quick brown fox^")\ for italics, wrap text in * for bold, and wrap text in _ for underline\n!unaway on/off - Turns auto-unsetting of your away on or off');
    }
    }
    if (input.substr(0, 7) == '!short ') {
      e.preventDefault();
      if (input.substr(7) == 'on') {
        GM_setValue('short', 'on');
      }
      if (input.substr(7) == 'off') {
        GM_setValue('short', 'off');
      }
      $('#X91').val(' ');
    }
    if (input.substr(0, 8) == '!unaway ') {
      e.preventDefault();
      if (input.substr(8) == 'on') {
        GM_setValue('away', 'on');
      }
      if (input.substr(8) == 'off') {
        GM_setValue('away', 'off');
      }
      $('#X91').val(' ');
    }
    if (GM_getValue('short') == 'on') {
      $('#X91').on('keydown', function (f) {
        if (f.keyCode == 13) {
          if (GM_getValue('short') == 'on') {
            this.value = this.value.replace(/\*([^*]+?)\*/g, '[b]$1[/b]');
            this.value = this.value.replace(/\_([^*]+?)\_/g, '[u]$1[/u]');
            this.value = this.value.replace(/\^([^*]+?)\^/g, '[i]$1[/i]');
          }
        }
      });
    }
    if (GM_getValue('away') == 'on') {
      setInterval(function () {
        if (GM_getValue('away') == 'on') {
          if ($('input[value="I am here!"]').is(':visible')) {
            $('input[value="I am here!"]').trigger('click');
            $('form#X114').submit();
          }
        }
      }, 150);
    }
  }
});
