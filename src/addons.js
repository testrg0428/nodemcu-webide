/* CodeMirror - Minified & Bundled
   Generated on 2016/7/21 with http://codemirror.net/doc/compress.html
   Version: HEAD

   Add-ons:
   - active-line.js
   - closebrackets.js
   - closetag.js
   - match-highlighter.js
   - matchbrackets.js
   - matchtags.js
   - trailingspace.js
   - xml-fold.js
 */

!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";function e(a){for(var e=0;e<a.state.activeLines.length;e++)a.removeLineClass(a.state.activeLines[e],"wrap",b),a.removeLineClass(a.state.activeLines[e],"background",c),a.removeLineClass(a.state.activeLines[e],"gutter",d)}function f(a,b){if(a.length!=b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!=b[c])return!1;return!0}function g(a,g){for(var h=[],i=0;i<g.length;i++){var j=g[i];if(j.empty()){var k=a.getLineHandleVisualStart(j.head.line);h[h.length-1]!=k&&h.push(k)}}f(a.state.activeLines,h)||a.operation(function(){e(a);for(var f=0;f<h.length;f++)a.addLineClass(h[f],"wrap",b),a.addLineClass(h[f],"background",c),a.addLineClass(h[f],"gutter",d);a.state.activeLines=h})}function h(a,b){g(a,b.ranges)}var b="CodeMirror-activeline",c="CodeMirror-activeline-background",d="CodeMirror-activeline-gutter";a.defineOption("styleActiveLine",!1,function(b,c,d){var f=d&&d!=a.Init;c&&!f?(b.state.activeLines=[],g(b,b.listSelections()),b.on("beforeSelectionChange",h)):!c&&f&&(b.off("beforeSelectionChange",h),e(b),delete b.state.activeLines)})}),function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){function d(a,c){return"pairs"==c&&"string"==typeof a?a:"object"==typeof a&&null!=a[c]?a[c]:b[c]}function h(a){return function(b){return m(b,a)}}function i(a){var b=a.state.closeBrackets;if(!b)return null;var c=a.getModeAt(a.getCursor());return c.closeBrackets||b}function j(b){var e=i(b);if(!e||b.getOption("disableInput"))return a.Pass;for(var f=d(e,"pairs"),g=b.listSelections(),h=0;h<g.length;h++){if(!g[h].empty())return a.Pass;var j=o(b,g[h].head);if(!j||f.indexOf(j)%2!=0)return a.Pass}for(var h=g.length-1;h>=0;h--){var k=g[h].head;b.replaceRange("",c(k.line,k.ch-1),c(k.line,k.ch+1),"+delete")}}function k(b){var c=i(b),e=c&&d(c,"explode");if(!e||b.getOption("disableInput"))return a.Pass;for(var f=b.listSelections(),g=0;g<f.length;g++){if(!f[g].empty())return a.Pass;var h=o(b,f[g].head);if(!h||e.indexOf(h)%2!=0)return a.Pass}b.operation(function(){b.replaceSelection("\n\n",null),b.execCommand("goCharLeft"),f=b.listSelections();for(var a=0;a<f.length;a++){var c=f[a].head.line;b.indentLine(c,null,!0),b.indentLine(c+1,null,!0)}})}function l(b){var d=a.cmpPos(b.anchor,b.head)>0;return{anchor:new c(b.anchor.line,b.anchor.ch+(d?-1:1)),head:new c(b.head.line,b.head.ch+(d?1:-1))}}function m(b,e){var f=i(b);if(!f||b.getOption("disableInput"))return a.Pass;var g=d(f,"pairs"),h=g.indexOf(e);if(-1==h)return a.Pass;for(var q,j=d(f,"triples"),k=g.charAt(h+1)==e,m=b.listSelections(),o=h%2==0,r=0;r<m.length;r++){var u,s=m[r],t=s.head,v=b.getRange(t,c(t.line,t.ch+1));if(o&&!s.empty())u="surround";else if(!k&&o||v!=e)if(k&&t.ch>1&&j.indexOf(e)>=0&&b.getRange(c(t.line,t.ch-2),t)==e+e&&(t.ch<=2||b.getRange(c(t.line,t.ch-3),c(t.line,t.ch-2))!=e))u="addFour";else if(k){if(a.isWordChar(v)||!p(b,t,e))return a.Pass;u="both"}else{if(!o||b.getLine(t.line).length!=t.ch&&!n(v,g)&&!/\s/.test(v))return a.Pass;u="both"}else u=j.indexOf(e)>=0&&b.getRange(t,c(t.line,t.ch+3))==e+e+e?"skipThree":"skip";if(q){if(q!=u)return a.Pass}else q=u}var w=h%2?g.charAt(h-1):e,x=h%2?e:g.charAt(h+1);b.operation(function(){if("skip"==q)b.execCommand("goCharRight");else if("skipThree"==q)for(var a=0;3>a;a++)b.execCommand("goCharRight");else if("surround"==q){for(var c=b.getSelections(),a=0;a<c.length;a++)c[a]=w+c[a]+x;b.replaceSelections(c,"around"),c=b.listSelections().slice();for(var a=0;a<c.length;a++)c[a]=l(c[a]);b.setSelections(c)}else"both"==q?(b.replaceSelection(w+x,null),b.triggerElectric(w+x),b.execCommand("goCharLeft")):"addFour"==q&&(b.replaceSelection(w+w+w+w,"before"),b.execCommand("goCharRight"))})}function n(a,b){var c=b.lastIndexOf(a);return c>-1&&c%2==1}function o(a,b){var d=a.getRange(c(b.line,b.ch-1),c(b.line,b.ch+1));return 2==d.length?d:null}function p(b,c,d){var e=b.getLine(c.line),f=b.getTokenAt(c);if(/\bstring2?\b/.test(f.type))return!1;var g=new a.StringStream(e.slice(0,c.ch)+d+e.slice(c.ch),4);for(g.pos=g.start=f.start;;){var h=b.getMode().token(g,f.state);if(g.pos>=c.ch+1)return/\bstring2?\b/.test(h);g.start=g.pos}}var b={pairs:"()[]{}''\"\"",triples:"",explode:"[]{}"},c=a.Pos;a.defineOption("autoCloseBrackets",!1,function(b,c,d){d&&d!=a.Init&&(b.removeKeyMap(f),b.state.closeBrackets=null),c&&(b.state.closeBrackets=c,b.addKeyMap(f))});for(var e=b.pairs+"`",f={Backspace:j,Enter:k},g=0;g<e.length;g++)f["'"+e.charAt(g)+"'"]=h(e.charAt(g))}),function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror"),require("../fold/xml-fold")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../fold/xml-fold"],a):a(CodeMirror)}(function(a){function d(d){if(d.getOption("disableInput"))return a.Pass;for(var e=d.listSelections(),f=[],i=0;i<e.length;i++){if(!e[i].empty())return a.Pass;var j=e[i].head,k=d.getTokenAt(j),l=a.innerMode(d.getMode(),k.state),m=l.state;if("xml"!=l.mode.name||!m.tagName)return a.Pass;var n=d.getOption("autoCloseTags"),o="html"==l.mode.configuration,p="object"==typeof n&&n.dontCloseTags||o&&b,q="object"==typeof n&&n.indentTags||o&&c,r=m.tagName;k.end>j.ch&&(r=r.slice(0,r.length-k.end+j.ch));var s=r.toLowerCase();if(!r||"string"==k.type&&(k.end!=j.ch||!/[\"\']/.test(k.string.charAt(k.string.length-1))||1==k.string.length)||"tag"==k.type&&"closeTag"==m.type||k.string.indexOf("/")==k.string.length-1||p&&g(p,s)>-1||h(d,r,j,m,!0))return a.Pass;var t=q&&g(q,s)>-1;f[i]={indent:t,text:">"+(t?"\n\n":"")+"</"+r+">",newPos:t?a.Pos(j.line+1,0):a.Pos(j.line,j.ch+1)}}for(var i=e.length-1;i>=0;i--){var u=f[i];d.replaceRange(u.text,e[i].head,e[i].anchor,"+insert");var v=d.listSelections().slice(0);v[i]={head:u.newPos,anchor:u.newPos},d.setSelections(v),u.indent&&(d.indentLine(u.newPos.line,null,!0),d.indentLine(u.newPos.line+1,null,!0))}}function e(b,c){for(var d=b.listSelections(),e=[],f=c?"/":"</",g=0;g<d.length;g++){if(!d[g].empty())return a.Pass;var i=d[g].head,j=b.getTokenAt(i),k=a.innerMode(b.getMode(),j.state),l=k.state;if(c&&("string"==j.type||"<"!=j.string.charAt(0)||j.start!=i.ch-1))return a.Pass;var m;if("xml"!=k.mode.name)if("htmlmixed"==b.getMode().name&&"javascript"==k.mode.name)m=f+"script";else{if("htmlmixed"!=b.getMode().name||"css"!=k.mode.name)return a.Pass;m=f+"style"}else{if(!l.context||!l.context.tagName||h(b,l.context.tagName,i,l))return a.Pass;m=f+l.context.tagName}">"!=b.getLine(i.line).charAt(j.end)&&(m+=">"),e[g]=m}b.replaceSelections(e),d=b.listSelections();for(var g=0;g<d.length;g++)(g==d.length-1||d[g].head.line<d[g+1].head.line)&&b.indentLine(d[g].head.line)}function f(b){return b.getOption("disableInput")?a.Pass:e(b,!0)}function g(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0,d=a.length;d>c;++c)if(a[c]==b)return c;return-1}function h(b,c,d,e,f){if(!a.scanForClosingTag)return!1;var g=Math.min(b.lastLine()+1,d.line+500),h=a.scanForClosingTag(b,d,null,g);if(!h||h.tag!=c)return!1;for(var i=e.context,j=f?1:0;i&&i.tagName==c;i=i.prev)++j;d=h.to;for(var k=1;j>k;k++){var l=a.scanForClosingTag(b,d,null,g);if(!l||l.tag!=c)return!1;d=l.to}return!0}a.defineOption("autoCloseTags",!1,function(b,c,e){if(e!=a.Init&&e&&b.removeKeyMap("autoCloseTags"),c){var g={name:"autoCloseTags"};("object"!=typeof c||c.whenClosing)&&(g["'/'"]=function(a){return f(a)}),("object"!=typeof c||c.whenOpening)&&(g["'>'"]=function(a){return d(a)}),b.addKeyMap(g)}});var b=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],c=["applet","blockquote","body","button","div","dl","fieldset","form","frameset","h1","h2","h3","h4","h5","h6","head","html","iframe","layer","legend","object","ol","p","select","table","ul"];a.commands.closeTag=function(a){return e(a)}}),function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror"),require("./matchesonscrollbar")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./matchesonscrollbar"],a):a(CodeMirror)}(function(a){"use strict";function c(a){this.options={};for(var c in b)this.options[c]=(a&&a.hasOwnProperty(c)?a:b)[c];this.overlay=this.timeout=null,this.matchesonscroll=null}function d(a){var b=a.state.matchHighlighter;clearTimeout(b.timeout),b.timeout=setTimeout(function(){g(a)},b.options.delay)}function e(a,b,c,d){var e=a.state.matchHighlighter;if(a.addOverlay(e.overlay=j(b,c,d)),e.options.annotateScrollbar&&a.showMatchesOnScrollbar){var f=c?new RegExp("\\b"+b+"\\b"):b;e.matchesonscroll=a.showMatchesOnScrollbar(f,!1,{className:"CodeMirror-selection-highlight-scrollbar"})}}function f(a){var b=a.state.matchHighlighter;b.overlay&&(a.removeOverlay(b.overlay),b.overlay=null,b.matchesonscroll&&(b.matchesonscroll.clear(),b.matchesonscroll=null))}function g(a){a.operation(function(){var b=a.state.matchHighlighter;if(f(a),!a.somethingSelected()&&b.options.showToken){for(var c=b.options.showToken===!0?/[\w$]/:b.options.showToken,d=a.getCursor(),g=a.getLine(d.line),i=d.ch,j=i;i&&c.test(g.charAt(i-1));)--i;for(;j<g.length&&c.test(g.charAt(j));)++j;return void(j>i&&e(a,g.slice(i,j),c,b.options.style))}var k=a.getCursor("from"),l=a.getCursor("to");if(k.line==l.line&&(!b.options.wordsOnly||h(a,k,l))){var m=a.getRange(k,l);b.options.trim&&(m=m.replace(/^\s+|\s+$/g,"")),m.length>=b.options.minChars&&e(a,m,!1,b.options.style)}})}function h(a,b,c){var d=a.getRange(b,c);if(null!==d.match(/^\w+$/)){if(b.ch>0){var e={line:b.line,ch:b.ch-1},f=a.getRange(e,b);if(null===f.match(/\W/))return!1}if(c.ch<a.getLine(b.line).length){var e={line:c.line,ch:c.ch+1},f=a.getRange(c,e);if(null===f.match(/\W/))return!1}return!0}return!1}function i(a,b){return!(a.start&&b.test(a.string.charAt(a.start-1))||a.pos!=a.string.length&&b.test(a.string.charAt(a.pos)))}function j(a,b,c){return{token:function(d){return!d.match(a)||b&&!i(d,b)?(d.next(),void(d.skipTo(a.charAt(0))||d.skipToEnd())):c}}}var b={style:"matchhighlight",minChars:2,delay:100,wordsOnly:!1,annotateScrollbar:!1,showToken:!1,trim:!0};a.defineOption("highlightSelectionMatches",!1,function(b,e,h){h&&h!=a.Init&&(f(b),clearTimeout(b.state.matchHighlighter.timeout),b.state.matchHighlighter=null,b.off("cursorActivity",d)),e&&(b.state.matchHighlighter=new c(e),g(b),b.on("cursorActivity",d))})}),function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){function e(a,b,e,g){var h=a.getLineHandle(b.line),i=b.ch-1,j=i>=0&&d[h.text.charAt(i)]||d[h.text.charAt(++i)];if(!j)return null;var k=">"==j.charAt(1)?1:-1;if(e&&k>0!=(i==b.ch))return null;var l=a.getTokenTypeAt(c(b.line,i+1)),m=f(a,c(b.line,i+(k>0?1:0)),k,l||null,g);return null==m?null:{from:c(b.line,i),to:m&&m.pos,match:m&&m.ch==j.charAt(0),forward:k>0}}function f(a,b,e,f,g){for(var h=g&&g.maxScanLineLength||1e4,i=g&&g.maxScanLines||1e3,j=[],k=g&&g.bracketRegex?g.bracketRegex:/[(){}[\]]/,l=e>0?Math.min(b.line+i,a.lastLine()+1):Math.max(a.firstLine()-1,b.line-i),m=b.line;m!=l;m+=e){var n=a.getLine(m);if(n){var o=e>0?0:n.length-1,p=e>0?n.length:-1;if(!(n.length>h))for(m==b.line&&(o=b.ch-(0>e?1:0));o!=p;o+=e){var q=n.charAt(o);if(k.test(q)&&(void 0===f||a.getTokenTypeAt(c(m,o+1))==f)){var r=d[q];if(">"==r.charAt(1)==e>0)j.push(q);else{if(!j.length)return{pos:c(m,o),ch:q};j.pop()}}}}}return m-e==(e>0?a.lastLine():a.firstLine())?!1:null}function g(a,d,f){for(var g=a.state.matchBrackets.maxHighlightLineLength||1e3,h=[],i=a.listSelections(),j=0;j<i.length;j++){var k=i[j].empty()&&e(a,i[j].head,!1,f);if(k&&a.getLine(k.from.line).length<=g){var l=k.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket";h.push(a.markText(k.from,c(k.from.line,k.from.ch+1),{className:l})),k.to&&a.getLine(k.to.line).length<=g&&h.push(a.markText(k.to,c(k.to.line,k.to.ch+1),{className:l}))}}if(h.length){b&&a.state.focused&&a.focus();var m=function(){a.operation(function(){for(var a=0;a<h.length;a++)h[a].clear()})};if(!d)return m;setTimeout(m,800)}}function i(a){a.operation(function(){h&&(h(),h=null),h=g(a,!1,a.state.matchBrackets)})}var b=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||document.documentMode<8),c=a.Pos,d={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"},h=null;a.defineOption("matchBrackets",!1,function(b,c,d){d&&d!=a.Init&&b.off("cursorActivity",i),c&&(b.state.matchBrackets="object"==typeof c?c:{},b.on("cursorActivity",i))}),a.defineExtension("matchBrackets",function(){g(this,!0)}),a.defineExtension("findMatchingBracket",function(a,b,c){return e(this,a,b,c)}),a.defineExtension("scanForBracket",function(a,b,c,d){return f(this,a,b,c,d)})}),function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror"),require("../fold/xml-fold")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../fold/xml-fold"],a):a(CodeMirror)}(function(a){"use strict";function b(a){a.state.tagHit&&a.state.tagHit.clear(),a.state.tagOther&&a.state.tagOther.clear(),a.state.tagHit=a.state.tagOther=null}function c(c){c.state.failedTagMatch=!1,c.operation(function(){if(b(c),!c.somethingSelected()){var d=c.getCursor(),e=c.getViewport();e.from=Math.min(e.from,d.line),e.to=Math.max(d.line+1,e.to);var f=a.findMatchingTag(c,d,e);if(f){if(c.state.matchBothTags){var g="open"==f.at?f.open:f.close;g&&(c.state.tagHit=c.markText(g.from,g.to,{className:"CodeMirror-matchingtag"}))}var h="close"==f.at?f.open:f.close;h?c.state.tagOther=c.markText(h.from,h.to,{className:"CodeMirror-matchingtag"}):c.state.failedTagMatch=!0}}})}function d(a){a.state.failedTagMatch&&c(a)}a.defineOption("matchTags",!1,function(e,f,g){g&&g!=a.Init&&(e.off("cursorActivity",c),e.off("viewportChange",d),b(e)),f&&(e.state.matchBothTags="object"==typeof f&&f.bothTags,e.on("cursorActivity",c),e.on("viewportChange",d),c(e))}),a.commands.toMatchingTag=function(b){var c=a.findMatchingTag(b,b.getCursor());if(c){var d="close"==c.at?c.open:c.close;d&&b.extendSelection(d.to,d.from)}}}),function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){a.defineOption("showTrailingSpace",!1,function(b,c,d){d==a.Init&&(d=!1),d&&!c?b.removeOverlay("trailingspace"):!d&&c&&b.addOverlay({token:function(a){for(var b=a.string.length,c=b;c&&/\s/.test(a.string.charAt(c-1));--c);return c>a.pos?(a.pos=c,null):(a.pos=b,"trailingspace")},name:"trailingspace"})})}),function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";function c(a,b){return a.line-b.line||a.ch-b.ch}function g(a,b,c,d){this.line=b,this.ch=c,this.cm=a,this.text=a.getLine(b),this.min=d?d.from:a.firstLine(),this.max=d?d.to-1:a.lastLine()}function h(a,c){var d=a.cm.getTokenTypeAt(b(a.line,c));return d&&/\btag\b/.test(d)}function i(a){return a.line>=a.max?void 0:(a.ch=0,a.text=a.cm.getLine(++a.line),!0)}function j(a){return a.line<=a.min?void 0:(a.text=a.cm.getLine(--a.line),a.ch=a.text.length,!0)}function k(a){for(;;){var b=a.text.indexOf(">",a.ch);if(-1==b){if(i(a))continue;return}{if(h(a,b+1)){var c=a.text.lastIndexOf("/",b),d=c>-1&&!/\S/.test(a.text.slice(c+1,b));return a.ch=b+1,d?"selfClose":"regular"}a.ch=b+1}}}function l(a){for(;;){var b=a.ch?a.text.lastIndexOf("<",a.ch-1):-1;if(-1==b){if(j(a))continue;return}if(h(a,b+1)){f.lastIndex=b,a.ch=b;var c=f.exec(a.text);if(c&&c.index==b)return c}else a.ch=b}}function m(a){for(;;){f.lastIndex=a.ch;var b=f.exec(a.text);if(!b){if(i(a))continue;return}{if(h(a,b.index+1))return a.ch=b.index+b[0].length,b;a.ch=b.index+1}}}function n(a){for(;;){var b=a.ch?a.text.lastIndexOf(">",a.ch-1):-1;if(-1==b){if(j(a))continue;return}{if(h(a,b+1)){var c=a.text.lastIndexOf("/",b),d=c>-1&&!/\S/.test(a.text.slice(c+1,b));return a.ch=b+1,d?"selfClose":"regular"}a.ch=b}}}function o(a,c){for(var d=[];;){var f,e=m(a),g=a.line,h=a.ch-(e?e[0].length:0);if(!e||!(f=k(a)))return;if("selfClose"!=f)if(e[1]){for(var i=d.length-1;i>=0;--i)if(d[i]==e[2]){d.length=i;break}if(0>i&&(!c||c==e[2]))return{tag:e[2],from:b(g,h),to:b(a.line,a.ch)}}else d.push(e[2])}}function p(a,c){for(var d=[];;){var e=n(a);if(!e)return;if("selfClose"!=e){var f=a.line,g=a.ch,h=l(a);if(!h)return;if(h[1])d.push(h[2]);else{for(var i=d.length-1;i>=0;--i)if(d[i]==h[2]){d.length=i;break}if(0>i&&(!c||c==h[2]))return{tag:h[2],from:b(a.line,a.ch),to:b(f,g)}}}else l(a)}}var b=a.Pos,d="A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",e=d+"-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",f=new RegExp("<(/?)(["+d+"]["+e+"]*)","g");a.registerHelper("fold","xml",function(a,c){for(var d=new g(a,c.line,0);;){var f,e=m(d);if(!e||d.line!=c.line||!(f=k(d)))return;if(!e[1]&&"selfClose"!=f){var h=b(d.line,d.ch),i=o(d,e[2]);return i&&{from:h,to:i.from}}}}),a.findMatchingTag=function(a,d,e){var f=new g(a,d.line,d.ch,e);if(-1!=f.text.indexOf(">")||-1!=f.text.indexOf("<")){var h=k(f),i=h&&b(f.line,f.ch),j=h&&l(f);if(h&&j&&!(c(f,d)>0)){var m={from:b(f.line,f.ch),to:i,tag:j[2]};return"selfClose"==h?{open:m,close:null,at:"open"}:j[1]?{open:p(f,j[2]),close:m,at:"close"}:(f=new g(a,i.line,i.ch,e),{open:m,close:o(f,j[2]),at:"open"})}}},a.findEnclosingTag=function(a,b,c){for(var d=new g(a,b.line,b.ch,c);;){var e=p(d);if(!e)break;var f=new g(a,b.line,b.ch,c),h=o(f,e.tag);if(h)return{open:e,close:h}}},a.scanForClosingTag=function(a,b,c,d){var e=new g(a,b.line,b.ch,d?{from:0,to:d}:null);return o(e,c)}});