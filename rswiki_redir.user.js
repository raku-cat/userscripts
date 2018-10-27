// ==UserScript==
// @name         Redirect RS Wiki
// @namespace    https://github.com/raku-cat/
// @version      1.3
// @description  Redirects old wikia pages to the new wiki, and replaces google links with new wiki links.
// @author       Raku <raku(at)raku(dot)party>
// @license      GPL version 3; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL  https://github.com/raku-cat/userscripts
// @updateURL    https://github.com/raku-cat/userscripts/raw/master/rswiki_redir.user.js 
// @downloadURL  https://github.com/raku-cat/userscripts/raw/master/rswiki_redir.user.js
// @include      /^https?:\/\/((oldschool)?runescape\.(wikia|fandom)\.com|(www.)?google\.+?)\/(wiki\/.+?\/?|search\?(q|client)\=.+?)/
// @grant        none
// @run-at       document-end
// ==/UserScript==


var hostname = location.hostname;
var pathname = location.pathname;

var new_os_wiki = "https://oldschool.runescape.wiki";
var old_os_wiki = "oldschoolrunescape.wikia.com";
var old_os_wikif = "oldschoolrunescape.fandom.com";

var new_rs_wiki = "https://runesacpe.wiki";
var old_rs_wiki = "runescape.wikia.com";
var old_rs_wikif = "runescape.fandom.com";


if (pathname.startsWith("/wiki/")) {
  var converted_path = convert_wiki(pathname);
  var converted_host = get_rs_version(hostname);
  var new_url = converted_host + converted_path;
  window.location.replace(new_url);
}

else if (hostname.includes("google")) {
  var old_wiki_result = get_result();
  for (var i=0; i<old_wiki_result.length; i++) {
    old_wiki_result[i].removeAttribute("onmousedown");
    var old_wiki_host = get_old_host(old_wiki_result[i].href);
    var old_wiki_path = old_wiki_result[i].href.split(old_wiki_host)[1];
    var new_wiki_path = convert_wiki(old_wiki_path);
    var new_wiki_href = get_rs_version(old_wiki_host) + new_wiki_path;
    old_wiki_result[i].href = new_wiki_href;
    old_wiki_result[i].querySelector(".iUh30").textContent=new_wiki_href;
  }
}


function convert_wiki(old_wiki_path) {
  var new_suffix = old_wiki_path.replace("/wiki/", "/w/");
  return new_suffix;
}

function get_old_host(old_wiki_host) {
  if (old_wiki_host.includes(old_os_wiki)) {
    return old_os_wiki;
  }
  else if (old_wiki_host.includes(old_os_wikif)) {
    return old_os_wikif;
  }
  else if (old_wiki_host.includes(old_rs_wiki)) {
    return old_rs_wiki;
  }
  else if (old_wiki_host.includes(old_rs_wikif)) {
    return old_rs_wikif;
  }
}
function get_result() {
  var old_wiki_result = document.queryselectorall("a[href^='http://" + old_os_wiki + "'], a[href^='http://" + old_os_wikif + "']");
  if (!old_wiki_result) {
    var old_wiki_result = document.queryselectorall("a[href^='http://" + old_rs_wiki + "'], a[href^='http://" + old_rs_wikif + "']");
  }
  if (old_wiki_result) {
    return old_wiki_result;
  }
}

function get_rs_version(old_host) {
  if (old_host.includes("oldschool")) {
    return new_os_wiki;
  }
  else if (old_host.includes("runescape")) {
    return new_rs_wiki;
  }
}
