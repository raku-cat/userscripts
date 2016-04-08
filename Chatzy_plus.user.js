// ==UserScript==
// @name        Chatzy+
// @namespace   https://rakutiki.tv/
// @author      Raku
// @description Adds extra functionality to chatzy
// @include     /https?://us1[1-9]|2[1-9]\.chatzy\.(com|org)/*/
// @include     http://us*.chatzy.*/*
// @version     1.3
// @icon        http://puu.sh/oakvy/51a99cf006.png
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require     https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==
// dust
var fieldvar = {
  'Unaway': {
    'label': 'Auto unaway',
    'type': 'radio',
    'options': [
      'On',
      'Off'
    ],
    'default': 'Off'
  },
  'Frame': {
    'label': 'Iframe style mode',
    'type': 'radio',
    'options': [
      'On',
      'Off'
    ],
    'default': 'Off'
  },
  'Skin': {
    'label': 'Persistent chatzy skin',
    'type': 'radio',
    'options': [
      'On',
      'Off'
    ],
    'default': 'Off'
  },
  'Font':
    {
      'label': 'Google font', 
      'type': 'text', 
      'title': 'Put the link to the google font you want',
      'size': 20000, 
    }
};
GM_config.init({
  'id': 'Chatzy+_config',
  'title': 'Chatzy+ config',
  'fields': fieldvar
});
GM_registerMenuCommand('Chatzy+ - Configure', function () {
  GM_config.open();
});
//Vars for stuff
var framelink = document.getElementById('X460').href.replace('default', 'frame');
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ChatzySkin\s*\=\s*([^;]*).*$)|^.*$/, '$1');
//var lastHtml = $('#X294').text();
//First run init
if (GM_getValue('firstrun', '0') == '0') {
  if (confirm('Welcome to chatzy+ version ' + GM_info.script.version + '!\nThis script adds several new functions to chatzy.\nBy continuing to use this script you agree that the author and any contributors are not responsible for anything that may happen including consequences or technical issues, if you do not agree to these terms please close this dialog and uninstall this script.')) {
    GM_setValue('firstrun', '1');
  }
  if (window.chrome) {
    alert('This script is known to have issues working right on chrome. Don\'t say I didn\'t warn you, mmkay?');
  }
} //Configs
/*if (input == '!history') {
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
if (GM_getValue('short') == 'on') {*/
//this.value = this.value.replace(/\*([^*]+?)\*/g, '[b]$1[/b]');
// this.value = this.value.replace(/\_([^*]+?)\_/g, '[u]$1[/u]');
//this.value = this.value.replace(/\^([^*]+?)\^/g, '[i]$1[/i]');
//}
//Other various functions I'm too lazy to mark
window.setInterval(function () {
  if (GM_config.get('Unaway') == 'On') {
    if ($('input[value="I am here!"]').is(':visible')) {
      $('input[value="I am here!"]').trigger('click');
      $('form#X116').submit();
    }
  }
  if (GM_config.get('Frame') == 'On') {
    if (document.getElementById('X460').href != framelink) {
      document.getElementById('X460').href = document.getElementById('X460').href.replace('default', 'frame');
    }
  }
  if (GM_config.get('Skin') == 'On') {
    if (document.getElementById('X460').href.split(':') [4] != cookieValue) {
      document.getElementById('X460').href = document.getElementById('X460').href.replace(document.getElementById('X460').href.split(':') [4], cookieValue);
    }
  }  /*if ($('#X294').is(':visible')) {
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
   }*/

}, 150);
if (GM_config.get('Font') !== '') {
  $('head').append('<link href="' + GM_config.get('Font') + '" rel="stylesheet" type="text/css">');
}
