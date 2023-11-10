// ==UserScript==
// @name         Redirect TTR Wiki
// @namespace    https://github.com/raku-cat/
// @version      1.0
// @description  Attemps to redirect old TTR fandom pages to the new wiki, and replaces google links with new wiki links.
// @author       Raku <raku(at)raku(dot)party>
// @license      GPL version 3; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL  https://github.com/raku-cat/userscripts
// @updateURL    https://github.com/raku-cat/userscripts/raw/master/rswiki_redir.user.js
// @downloadURL  https://github.com/raku-cat/userscripts/raw/master/rswiki_redir.user.js
// @include      /^https?:\/\/(toontownrewritten\.(fandom)\.com|(www.)?google\..+?)\/(wiki\/.+?\/?|search\?(q|client)\=.+?)/
// @grant        none
// @run-at       document-end
// ==/UserScript==


var hostname = location.hostname;
var pathname = location.pathname;

var new_wiki = "https://toontownrewritten.wiki";
var old_wiki = "toontownrewritten.fandom.com";


if (pathname.startsWith("/wiki/")) {
  var converted_path = convert_wiki(pathname);
  var new_url = new_wiki + converted_path;
  window.location.replace(new_url);
}

else if (hostname.includes("google")) {
  var old_wiki_result = get_result();
  for (var i=0; i<old_wiki_result.length; i++) {
    old_wiki_result[i].removeAttribute("onmousedown");
    var old_wiki_path = old_wiki_result[i].href.split(old_wiki)[1];
    var new_wiki_path = convert_wiki(old_wiki_path);
    var new_wiki_href = new_wiki + new_wiki_path;
    old_wiki_result[i].href = new_wiki_href;
    console.log(old_wiki_result[i])
    if (old_wiki_result[i].querySelector("cite")) {
      old_wiki_result[i].querySelector("cite").textContent = new_wiki_href;
    }
  }
}

function convert_wiki(old_wiki_path) {
  var new_suffix = old_wiki_path.replace("/wiki/", "/");
  return new_suffix;
}


function get_result() {
  var old_wiki_result = document.querySelectorAll("a[href^='http://" + old_wiki + "'], a[href^='https://" + old_wiki + "']")
  if (old_wiki_result) {
    return old_wiki_result;
  }
}
