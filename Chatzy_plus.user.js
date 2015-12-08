// ==UserScript==
// @name        Chatzy+
// @namespace   https://rakutiki.tv/
// @author      Raku
// @description Adds extra functionality to chatzy
// @include     /https?://us1[1-9]|2[1-9]\.chatzy\.(com|org)/*/
// @include     http://us*.chatzy.*/*
// @version     1.2.2.1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
// dust
//Vars for stuff
var framelink = document.getElementById('X457').href.replace('default', 'frame');
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ChatzySkin\s*\=\s*([^;]*).*$)|^.*$/, '$1');
var lastHtml = $('#X294').text();
//First run init
if (GM_getValue('firstrun', '0') == '0') {
  if (confirm('Welcome to chatzy+ version ' + GM_info.script.version + '!\nThis script adds several new functions to chatzy in the form of input line commands, click OK to learn more about the available commands and features, otherwise you can run !help to bring up the menu later.\nBy continuing to use this script you agree that the author and any contributors are not responsible for anything that may happen.')) {
    helpdialog();
    GM_setValue('firstrun', '1');
  } else {
    GM_setValue('firstrun', '1');
  }
}
//Command hooks

$('#X91').on('keydown', function (e) {
  var input = $('#X91').val();
  if (e.keyCode == 13) {
    if (input.substr(0, 5) === '!ref ') {
      $('#X91').val(GM_getValue('ref' + input.split(' ') [1]));
    }
    if (input.substr(0, 9) === '!ref add ') {
      GM_setValue('ref' + input.split(' ') [2], input.split(' ') [3]);
      $('#X91').val(' ');
      alert('Ref URL added, post with !ref ' + input.split(' ') [2]);
    }
    if (input == '!help') {
      $('#X91').val(' ');
      helpdialog();
    }
    if (input == '!help font') {
      alert('To set a custom font(outside of the websafe ones you are limited normally), run !font set <url> and substitute <url> for a url to a google font from here https://www.google.com/fonts for example if you wanted this font https://fonts.googleapis.com/css?family=Oswald you would run !font set https://fonts.googleapis.com/css?family=Oswald\nThe next step is to go in to your account settings and set your font to a custom one(last radial button, should have a text field next to it) and clear whatever is there, and replace it with your font name in single quotes, using the same example as earlier, you would type \'Oswald\' and then click OK and save your prefrences');
      $('#X91').val(' ');
    }
    if (input.substr(0, 7) == '!short ') {
      if (input.split(' ') [1] == 'on') {
        GM_setValue('short', 'on');
      }
      if (input.split(' ') [1] == 'off') {
        GM_setValue('short', 'off');
      }
      $('#X91').val(' ');
    }
    if (input.substr(0, 8) == '!unaway ') {
      if (input.substr(8) == 'on') {
        GM_setValue('away', 'on');
      }
      if (input.substr(8) == 'off') {
        GM_setValue('away', 'off');
      }
      $('#X91').val(' ');
    }
    if (input.substr(0, 7) == '!frame ') {
      if (input.substr(7) == 'on') {
        GM_setValue('frame', 'on');
      }
      if (input.substr(7) == 'off') {
        GM_setValue('frame', 'off');
      }
      $('#X91').val(' ');
    }
    if (input.substr(0, 6) == '!skin ') {
      if (input.substr(6) == 'on') {
        GM_setValue('skin', 'on');
      }
      if (input.substr(6) == 'off') {
        GM_setValue('skin', 'off');
      }
      $('#X91').val(' ');
    }
    if (input.substr(0, 6) == '!skin ') {
      if (input.substr(6) == 'on') {
        GM_setValue('skin', 'on');
      }
      if (input.substr(6) == 'off') {
        GM_setValue('skin', 'off');
      }
      $('#X91').val(' ');
    }
    if (input.substr(0, 6) == '!font ') {
      if (input.split(' ') [1] == 'set') {
        GM_setValue('font', input.split(' ') [2]);
      }
      if (input.split(' ') [1] == 'off') {
        GM_deleteValue('font');
      }
      $('#X91').val(' ');
    }
    if (input == '!history') {
      if (GM_getValue('history') !== undefined) {
      alert(GM_getValue('history'));
      } else {
        alert('None yet :<');
        $('#X91').val(' ');
      }
      $('#X91').val(' ');
    }
    if (input.substr(0, 9) == '!history ') {
      if (input.substr(9) == 'on') {
        GM_setValue('msg', 'on');
      }
      if (input.substr(9) == 'off') {
        GM_setValue('msg', 'off')
      }
      if (input.substr(9) == 'clear') {
        if (confirm('Are you sure you want to clear local PM storage? (IRREVERSIBLE)')) {
          GM_deleteValue('history');
          alert('Local PM storage cleared.');
        } else {
          alert('Local PM storage not cleared.');
          $('#X91').val(' ');
        }
        $('#X91').val(' ');
      }
      $('#X91').val(' ');
    }
    if (GM_getValue('short') == 'on') {
      this.value = this.value.replace(/\*([^*]+?)\*/g, '[b]$1[/b]');
      this.value = this.value.replace(/\_([^*]+?)\_/g, '[u]$1[/u]');
      this.value = this.value.replace(/\^([^*]+?)\^/g, '[i]$1[/i]');
    }
  }
});
//Function to show help dialog
function helpdialog() {
  alert('Command listing, things wrapped in <> should not be typed with the <> surrounding them\n!ref add <name> <url> - Stores the specified url under the specified name.\n!ref <name> - Posts the stored ref with that name.\n!short on/off - Turns shorthands on or off, shorthands are as follows:\nWrap text in ^("^the quick brown fox^") for italics, wrap text in * for bold, and wrap text in _ for underline\n!unaway on/off - Turns auto-unsetting of your away on or off\n!skin on/off - Makes your skin you set in account setting apply globaly(all rooms), it will override any rooms with their own skin set as well however\n!frame on/off - Makes chatzy use the stylesheet they use when the chat is embedded in an iframe, might not look pretty\n!font set <url>/off - refer to !help font\n!history on/off/clear - Turns PM logging locally on or off, or clears your local PM storage, run without any arguments to get your local PM logs');
}
//Other various functions I'm too lazy to mark

window.setInterval(function () {
  if (GM_getValue('away') == 'on') {
    if ($('input[value="I am here!"]').is(':visible')) {
      $('input[value="I am here!"]').trigger('click');
      $('form#X114').submit();
    }
  }
  if (GM_getValue('frame') == 'on') {
    if (document.getElementById('X457').href != framelink) {
      document.getElementById('X457').href = document.getElementById('X457').href.replace('default', 'frame');
    }
  }
  if (GM_getValue('skin') == 'on') {
    if (document.getElementById('X457').href.split(':') [4] != cookieValue) {
      document.getElementById('X457').href = document.getElementById('X457').href.replace(document.getElementById('X457').href.split(':') [4], cookieValue);
    }
  }
  if ($('#X294').is(':visible')) {
    var time = $('#X93 .X724').html();
    var newHtml = $('#X294').text();
    var name = $('#X93 em').html();
    if (GM_getValue('msg') == 'on') {
      if (newHtml != lastHtml) {
        lastHtml = newHtml;
        if (GM_getValue('history') !== undefined) {
          GM_setValue('history', GM_getValue('history') + '\n' + name + ' ' + newHtml + ' ' + time);
        } else {
          GM_setValue('history', '\n' + name + ' ' + newHtml + ' ' + time);
        }
      }
    }
  }
}, 150);
if (GM_getValue('font')) {
  $('head').append('<link href="' + GM_getValue('font') + '" rel="stylesheet" type="text/css">');
}
console.log(GM_getValue('msg'));
