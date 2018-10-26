// ==UserScript==
// @name         Redirect OSRS Wiki
// @namespace    https://github.com/raku-cat/
// @version      1
// @description  Redirects old wikia pages to the new wiki, and replaces google links with new wiki links.
// @author       Raku <raku(at)raku(dot)party>
// @license      GPL version 3; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL  https://github.com/raku-cat/userscripts
// @updateURL    https://github.com/raku-cat/userscripts/raw/master/osrswiki_redir.user.js 
// @downloadURL  https://github.com/raku-cat/userscripts/raw/master/osrswiki_redir.user.js
// @include      /^https?:\/\/(oldschoolrunescape\.wikia\.com|(www.)?google\.com)\/(wiki\/.+?\/?|search\?(q|client)\=.+?)/
// @grant        none
// @run-at       document-end
// ==/UserScript==


var hostname = location.hostname;
var pathname = location.pathname;
var new_wiki = "https://oldschool.runescape.wiki";
var google = "www.google.com";
var old_wiki = "oldschoolrunescape.wikia.com";

if (hostname == old_wiki) {
  var converted_url = convert_wiki(pathname);
  if (converted_url) {
    window.location.replace(converted_url);
  }
}

else if (hostname == google) {
  var old_wiki_result = document.querySelectorAll("a[href^='http://oldschoolrunescape.wikia.com']");
  for (var i=0; i<old_wiki_result.length; i++) {
    old_wiki_result[i].removeAttribute("onmousedown");
    var old_wiki_href = old_wiki_result[i].href;
    var old_wiki_path = old_wiki_href.split("oldschoolrunescape.wikia.com")[1];
    var new_wiki_href = convert_wiki(old_wiki_path);
    if (new_wiki_href) {
      old_wiki_result[i].href = new_wiki_href;
    }
  }
}

function convert_wiki(old_wiki_url) {
  var new_suffix = old_wiki_url.replace("\/wiki\/", "\/w\/");
  var new_wiki_url = new_wiki + new_suffix;
  return new_wiki_url;
}
