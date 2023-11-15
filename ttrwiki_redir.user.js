// ==UserScript==
// @name         Redirect TTR Wiki
// @namespace    https://github.com/raku-cat/
// @version      1.1
// @description  Attemps to redirect old TTR fandom pages to the new wiki, and replaces google links with new wiki links.
// @author       Raku <raku(at)raku(dot)party>
// @license      GPL version 3; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL  https://github.com/raku-cat/userscripts
// @updateURL    https://github.com/raku-cat/userscripts/raw/master/ttrwiki_redir.user.js
// @downloadURL  https://github.com/raku-cat/userscripts/raw/master/ttrwiki_redir.user.js
// @include      /^https?:\/\/(toontownrewritten\.(fandom)\.com|(www.)?google\..+?)\/(wiki\/.+?\/?|search\?(q|client)\=.+?)/
// @grant        none
// @run-at       document-end
// ==/UserScript==


const hostname = location.hostname;
const pathname = location.pathname;
const newWiki = "https://toontownrewritten.wiki";
const oldWiki = "toontownrewritten.fandom.com";


if (hostname === oldWiki || hostname.startsWith("www.google")) {
  if (pathname.startsWith("/wiki/") && hostname === oldWiki) {
    let convertedPath = convertWiki(pathname);
    let newURL = constructNewURL(convertedPath);
    window.location.replace(newURL);
  }

  else if (hostname.startsWith("www.google")) {
    let oldWikiResult = getResult();
    oldWikiResult.forEach(result => {
      result.removeAttribute("onmousedown");
      let oldWikiPath = result.href.split(oldWiki)[1];
      let newWikiPath = convertWiki(oldWikiPath);
      result.href = constructNewURL(newWikiPath);
      console.log(result)
      if (result.querySelector("cite")) {
        result.querySelector("cite").textContent = constructNewURL(newWikiPath);
      }
    });
  }
}

function convertWiki(oldWikiPath) {
  return oldWikiPath.replace("/wiki/", "/");
}

function getResult() {
  let oldWikiResult = document.querySelectorAll("a[href*='" + oldWiki + "']");
  return oldWikiResult.length ? oldWikiResult : null;
}

function constructNewURL(path) {
  return newWiki + path;
}
