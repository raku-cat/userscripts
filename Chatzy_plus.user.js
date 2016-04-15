// ==UserScript==
// @name        Chatzy+
// @namespace   https://rakutiki.tv/
// @author      Raku
// @description Adds extra functionality to chatzy
// @include     /https?://us1[1-9]|2[1-9]\.chatzy\.(com|org)/*/
// @include     http://us*.chatzy.*/*
// @version     1.3.2.3
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
// @require     https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.js
// ==/UserScript==
// dust
// Vars
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
  'Short': {
    'label': 'Shorthands for styled text(bold, italics, underline)',
    'type': 'radio',
    'options': [
      'On',
      'Off'
    ],
    'default': 'Off'
  },
  'Align': {
    'label': 'Align timestamps to the right or left',
    'type': 'radio',
    'options': [
      'Right',
      'Left'
    ],
    'default': 'Right'
  },
  'History': {
    'label': 'Log all incoming PMs',
    'type': 'radio',
    'options': [
      'On',
      'Off'
    ],
    'default': 'Off'
  },
  'history':
  {
    'label': 'Save logged PMs',
    'type': 'button',
    'size': 100,
    'click': function () {
      if (GM_getValue('history') !== undefined) {
        var log = new Blob([GM_getValue('history')], {
          type: 'text/plain;charset=utf-8'
        });
        saveAs(log, 'Chatzy_PM_logs.txt');
      } else {
        alert('None yet :<');
      }
    }
  },
  'clearhistory':
  {
    'label': 'Clear all logged PMs',
    'type': 'button',
    'size': 100,
    'click': function () {
      if (GM_getValue('history') !== undefined) {
        if (confirm('Are you sure you want to clear local PM storage? (IRREVERSIBLE)')) {
          GM_deleteValue('history');
          alert('Local PM storage cleared.');
        } else {
          alert('Local PM storage not cleared.');
        }
      } else {
        alert('None to clear :O');
      }
    }
  },
  'Font':
  {
    'label': 'Google font',
    'type': 'text',
    'title': 'Put the link to the google font you want',
    'size': 200,
  }
};
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ChatzySkin\s*\=\s*([^;]*).*$)|^.*$/, '$1');
var lastHtml = $('div#X94 #X296').text();
// GM_config stuff
var frame = document.createElement('div');
document.body.appendChild(frame);
GM_config.init({
  'id': 'chatzy-config',
  'title': 'Chatzy+ config',
  'fields': fieldvar,
  'css': '#chatzy-config { background: inherit !important; display: inline-block !important; overflow: hidden !important; width: 16% !important; height: unset !important; max-width: none !important; max-height: none !important; border: inherit !important;}',
  'frame': frame
});
GM_registerMenuCommand('Chatzy+ - Configure', function () {
  GM_config.open();
});
//First run init
if (GM_getValue('firstrun', '0') == '0') {
  if (confirm('Welcome to chatzy+ version ' + GM_info.script.version + '!\nThis script adds several new functions to chatzy.\nBy continuing to use this script you agree that the author and any contributors are not responsible for anything that may happen including consequences or technical issues, if you do not agree to these terms please close this dialog and uninstall this script.')) {
    GM_setValue('firstrun', '1');
  }
  if (window.chrome) {
    alert('This script is known to have issues working right on chrome. Don\'t say I didn\'t warn you, mmkay?');
  }
} //Setting functions

if (GM_config.get('Font') !== '') {
  $('head').append('<link href="' + GM_config.get('Font') + '" rel="stylesheet" type="text/css">');
}
if (GM_config.get('Frame') == 'On') {
  $('head').append('<style type="text/css">DIV#X171 {width: 100% !important; height: 92.14vh !important;} #X211 DIV {display: none !important;} INPUT#X92 {width: 85.8vw !important;} DIV#X185 DIV{top:unset !important; padding-left:unset !important;}</style>');
}
$('input#X92').keypress(function (e) {
  if (e.which == 13) {
    if (GM_config.get('Short') == 'On') {
      this.value = this.value.replace(/\*([^*]+?)\*/g, '[b]$1[/b]');
      this.value = this.value.replace(/\_([^*]+?)\_/g, '[u]$1[/u]');
      this.value = this.value.replace(/\^([^*]+?)\^/g, '[i]$1[/i]');
    }
  }
});
window.setInterval(function () {
  if (GM_config.get('Unaway') == 'On') {
    if ($('input[value="I am here!"]').is(':visible')) {
      $('input[value="I am here!"]').trigger('click');
      $('form#X116').submit();
      $('form#X116').submit();
      $('form#X116').submit();
    }
  }
  var framelink = $('head link:first').attr('href').replace('default', 'frame');
  if (GM_config.get('Frame') == 'On') {
    if ($('head link:first').attr('href') != framelink) {
      $('head link:first').attr('href', framelink);
    }
  }
  var skinlink = $('head link:first').attr('href');
  if (GM_config.get('Skin') == 'On') {
    if (skinlink.split(':') [3] != cookieValue) {
      $('head link:first').attr('href', skinlink.replace(skinlink.split(':') [3], cookieValue));
    }
  }
  if ($('#X94').is(':visible')) {
    var time = $('div#X94').find('.X741').text();
    var newHtml = $('div#X94 #X296').text();
    var name = $('div#X94').find('em').text();
    if (GM_config.get('History') == 'On') {
      if (newHtml != lastHtml) {
        lastHtml = newHtml;
        if (GM_getValue('history') !== undefined) {
          GM_setValue('history', GM_getValue('history') + '\n' + name + '\n' + newHtml + '\n' + time + '\n');
        } else {
          GM_setValue('history', name + '\n' + newHtml + '\n' + time + '\n');
        }
      }
    }
  }
}, 150);
window.setInterval(function () {
  if (GM_config.get('Align') == 'Left') {
    $('.X741').not(':first-child').each(function () {
      $(this).prependTo($(this).parent());
      $(this).attr('style', 'float:left;');
    });
  }
}, 1);
