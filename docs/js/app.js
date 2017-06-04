"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function dropdown(a,b){"string"==typeof a&&(a=document.querySelectorAll(a)),a.forEach(function(a){var c=void 0;if(a.hasAttribute(DROPDOWN_DATA_KEY)&&(c=a.getAttribute(DROPDOWN_DATA_KEY)),c||(c=new Dropdown(a),a.setAttribute(DROPDOWN_DATA_KEY,c)),"string"==typeof b){if(void 0===c[b])throw new Error('No method named "'+b+'"');c[b].call(a)}})}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function dropdownHover(a,b){"string"==typeof a&&(a=document.querySelectorAll(a)),a.forEach(function(a){var c=void 0;if(a.hasAttribute(DROPDOWN_HOVER_DATA_KEY)&&(c=a.getAttribute(DROPDOWN_HOVER_DATA_KEY)),c||(c=new DropdownHover(a),a.setAttribute(DROPDOWN_HOVER_DATA_KEY,c)),"string"==typeof b){if(void 0===c[b])throw new Error('No method named "'+b+'"');c[b].call(a)}})}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(a){a.closest=a.closest||function(a){for(var b=this;b;){if(b.matches(a))return b;b=b.parentElement}return null}}(Element.prototype);var ESCAPE_KEYCODE=27,Util=function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:"createEvent",value:function(a,b){var c=void 0;return window.CustomEvent?c=new CustomEvent(a,{detail:b}):(c=document.createEvent("CustomEvent"),c.initCustomEvent(a,!0,!0,b)),c}},{key:"getSelector",value:function(a){var b=void 0;return a.hasAttribute("data-target")&&(b=a.getAttribute("data-target")),!b&&a.hasAttribute("href")&&(b=a.getAttribute("href")),b&&"#"!==b?b:null}}]),a}(),_createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),DROPDOWN_DATA_KEY="bs.dropdown",DROPDOWN_EVENT_KEY="."+DROPDOWN_DATA_KEY,SPACE_KEYCODE=32,TAB_KEYCODE=9,ARROW_UP_KEYCODE=38,ARROW_DOWN_KEYCODE=40,RIGHT_MOUSE_BUTTON_WHICH=3,DROPDOWN_REGEXP_KEYDOWN=new RegExp(ARROW_UP_KEYCODE+"|"+ARROW_DOWN_KEYCODE+"|"+ESCAPE_KEYCODE),DropdownClassName={DISABLED:"disabled",SHOW:"show"},DropdownSelector={DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:".dropdown form",MENU:".dropdown-menu",NAVBAR_NAV:".navbar-nav",VISIBLE_ITEMS:".dropdown-menu .dropdown-item:not(.disabled)"},DropdownEvent={HIDE:"hide"+DROPDOWN_EVENT_KEY,HIDDEN:"hidden"+DROPDOWN_EVENT_KEY,SHOW:"show"+DROPDOWN_EVENT_KEY,SHOWN:"shown"+DROPDOWN_EVENT_KEY},Dropdown=function(){function a(b){_classCallCheck(this,a),b.addEventListener("click",this.toggle)}return _createClass(a,[{key:"toggle",value:function(b){if(b.preventDefault(),this.disabled||this.classList.contains(DropdownClassName.DISABLED))return!1;var c=a.getParent(this),d=c.classList.contains(DropdownClassName.SHOW);if(a.clearMenus(b),d)return!1;var e={relatedTarget:this},f=Util.createEvent(DropdownEvent.SHOW,e);if(c.dispatchEvent(f),f.defaultPrevented)return!1;"ontouchstart"in document.documentElement&&!c.closest(DropdownSelector.NAVBAR_NAV)&&document.body.children.addEventListener("mouseover",function(){}),this.focus(),this.setAttribute("aria-expanded",!0),c.classList.toggle(DropdownClassName.SHOW);var g=Util.createEvent(DropdownEvent.SHOWN,e);c.dispatchEvent(g)}}],[{key:"hideMenus",value:function(b,c){if(!b||b.which!==RIGHT_MOUSE_BUTTON_WHICH&&("keyup"!==b.type||b.which===TAB_KEYCODE)){var d=document.querySelectorAll(c);d.length&&d.forEach(function(c){var d=a.getParent(c),e={relatedTarget:c};if(!d.classList.contains(DropdownClassName.SHOW))return!0;if(b.target!==c&&d.contains(b.target))return!0;if(b&&("click"===b.type&&/input|textarea/i.test(b.target.tagName)||"keyup"===b.type&&b.which===TAB_KEYCODE)&&d.contains(b.target))return!0;var f=Util.createEvent(DropdownEvent.HIDE,e);if(d.dispatchEvent(f),f.defaultPrevented)return!0;"ontouchstart"in document.documentElement&&document.body.children.removeEventListener("mouseover",function(){}),c.setAttribute("aria-expanded","false"),d.classList.remove(DropdownClassName.SHOW);var g=Util.createEvent(DropdownEvent.HIDDEN,e);d.dispatchEvent(g)})}}},{key:"clearMenus",value:function(b){a.hideMenus(b,DropdownSelector.DATA_TOGGLE)}},{key:"getParent",value:function(a){var b=Util.getSelector(a);return b?document.querySelector(b):a.parentNode}},{key:"keydown",value:function(b){if(!(!DROPDOWN_REGEXP_KEYDOWN.test(b.which)||/button/i.test(b.target.tagName)&&b.which===SPACE_KEYCODE||/input|textarea/i.test(b.target.tagName)||(b.preventDefault(),b.stopPropagation(),this.disabled||this.classList.contains(DropdownClassName.DISABLED)))){var c=a.getParent(this),d=c.classList.contains(DropdownClassName.SHOW);if(!d&&(b.which!==ESCAPE_KEYCODE||b.which!==SPACE_KEYCODE)||d&&(b.which===ESCAPE_KEYCODE||b.which===SPACE_KEYCODE))return b.which===ESCAPE_KEYCODE&&c.querySelector(DropdownSelector.DATA_TOGGLE).dispatchEvent(new FocusEvent("focus")),void this.dispatchEvent(new MouseEvent("click"));var e=Array.prototype.slice.call(c.querySelectorAll(DropdownSelector.VISIBLE_ITEMS));if(e.length){var f=e.indexOf(b.target);b.which===ARROW_UP_KEYCODE&&f>0&&f--,b.which===ARROW_DOWN_KEYCODE&&f<e.length-1&&f++,f<0&&(f=0),e[f].focus()}}}}]),a}();document.addEventListener("DOMContentLoaded",function(){var a=document.querySelectorAll(DropdownSelector.DATA_TOGGLE);a.length&&a.forEach(function(a){a.addEventListener("keydown",Dropdown.keydown),a.addEventListener("click",Dropdown.prototype.toggle)});var b=document.querySelectorAll(DropdownSelector.MENU);b.length&&b.forEach(function(a){a.addEventListener("keydown",Dropdown.keydown)});var c=document.querySelectorAll(DropdownSelector.FORM_CHILD);c.length&&c.forEach(function(a){a.addEventListener("click",function(a){a.stopPropagation()})})});var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),DROPDOWN_HOVER_DATA_KEY=DROPDOWN_DATA_KEY+".hover",DropdownHoverSelector={HOVER:".dropdown-hover",DATA_HOVER:'[data-hover="dropdown"]',TOGGLE:".dropdown-toggle"},DropdownHover=function(){function a(b){_classCallCheck(this,a);var c=Dropdown.getParent(b);b.addEventListener("mouseenter",this.show),c.addEventListener("mouseleave",this.hide)}return _createClass(a,[{key:"show",value:function(){if(this.disabled||this.classList.contains(DropdownClassName.DISABLED))return!1;var b=Dropdown.getParent(this),c=b.classList.contains(DropdownClassName.SHOW);if(a.clearMenus(),c)return!1;var d={relatedTarget:this},e=Util.createEvent(DropdownEvent.SHOW,d);if(b.dispatchEvent(e),e.defaultPrevented)return!1;this.setAttribute("aria-expanded",!0),b.classList.add(DropdownClassName.SHOW);var f=Util.createEvent(DropdownEvent.SHOWN,d);b.dispatchEvent(f)}},{key:"hide",value:function(){if(!this.classList.contains(DropdownClassName.SHOW))return!1;var a=this.querySelector(DropdownHoverSelector.DATA_HOVER);a||(a=this.querySelector(DropdownHoverSelector.TOGGLE));var b={relatedTarget:a},c=Util.createEvent(DropdownEvent.HIDE,b);if(this.dispatchEvent(c),c.defaultPrevented)return!1;a.setAttribute("aria-expanded","false"),this.classList.remove(DropdownClassName.SHOW);var d=Util.createEvent(DropdownEvent.HIDDEN,b);this.dispatchEvent(d)}}],[{key:"clearMenus",value:function(a){Dropdown.hideMenus(a,DropdownHoverSelector.DATA_HOVER)}}]),a}();document.addEventListener("DOMContentLoaded",function(){var a=document.querySelectorAll(DropdownHoverSelector.DATA_HOVER);a.length&&a.forEach(function(a){a.addEventListener("mouseenter",DropdownHover.prototype.show)});var b=document.querySelectorAll(""+DropdownHoverSelector.HOVER);b.length&&b.forEach(function(a){a.addEventListener("mouseleave",DropdownHover.prototype.hide)})}),document.addEventListener("DOMContentLoaded",function(){var a=document.querySelectorAll(".dropdown-fluid .dropdown-menu");a.length&&a.forEach(function(a){a.addEventListener("click",function(a){a.stopPropagation()})})});var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var a=/\blang(?:uage)?-(\w+)\b/i,b=0,c=_self.Prism={manual:_self.Prism&&_self.Prism.manual,util:{encode:function(a){return a instanceof d?new d(a.type,c.util.encode(a.content),a.alias):"Array"===c.util.type(a)?a.map(c.util.encode):a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]},objId:function(a){return a.__id||Object.defineProperty(a,"__id",{value:++b}),a.__id},clone:function(a){switch(c.util.type(a)){case"Object":var b={};for(var d in a)a.hasOwnProperty(d)&&(b[d]=c.util.clone(a[d]));return b;case"Array":return a.map&&a.map(function(a){return c.util.clone(a)})}return a}},languages:{extend:function(a,b){var d=c.util.clone(c.languages[a]);for(var e in b)d[e]=b[e];return d},insertBefore:function(a,b,d,e){e=e||c.languages;var f=e[a];if(2==arguments.length){d=arguments[1];for(var g in d)d.hasOwnProperty(g)&&(f[g]=d[g]);return f}var h={};for(var i in f)if(f.hasOwnProperty(i)){if(i==b)for(var g in d)d.hasOwnProperty(g)&&(h[g]=d[g]);h[i]=f[i]}return c.languages.DFS(c.languages,function(b,c){c===e[a]&&b!=a&&(this[b]=h)}),e[a]=h},DFS:function(a,b,d,e){e=e||{};for(var f in a)a.hasOwnProperty(f)&&(b.call(a,f,a[f],d||f),"Object"!==c.util.type(a[f])||e[c.util.objId(a[f])]?"Array"!==c.util.type(a[f])||e[c.util.objId(a[f])]||(e[c.util.objId(a[f])]=!0,c.languages.DFS(a[f],b,f,e)):(e[c.util.objId(a[f])]=!0,c.languages.DFS(a[f],b,null,e)))}},plugins:{},highlightAll:function(a,b){var d={callback:b,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};c.hooks.run("before-highlightall",d);for(var e,f=d.elements||document.querySelectorAll(d.selector),g=0;e=f[g++];)c.highlightElement(e,!0===a,d.callback)},highlightElement:function(b,d,e){for(var f,g,h=b;h&&!a.test(h.className);)h=h.parentNode;h&&(f=(h.className.match(a)||[,""])[1].toLowerCase(),g=c.languages[f]),b.className=b.className.replace(a,"").replace(/\s+/g," ")+" language-"+f,h=b.parentNode,/pre/i.test(h.nodeName)&&(h.className=h.className.replace(a,"").replace(/\s+/g," ")+" language-"+f);var i=b.textContent,j={element:b,language:f,grammar:g,code:i};if(c.hooks.run("before-sanity-check",j),!j.code||!j.grammar)return j.code&&(c.hooks.run("before-highlight",j),j.element.textContent=j.code,c.hooks.run("after-highlight",j)),void c.hooks.run("complete",j);if(c.hooks.run("before-highlight",j),d&&_self.Worker){var k=new Worker(c.filename);k.onmessage=function(a){j.highlightedCode=a.data,c.hooks.run("before-insert",j),j.element.innerHTML=j.highlightedCode,e&&e.call(j.element),c.hooks.run("after-highlight",j),c.hooks.run("complete",j)},k.postMessage(JSON.stringify({language:j.language,code:j.code,immediateClose:!0}))}else j.highlightedCode=c.highlight(j.code,j.grammar,j.language),c.hooks.run("before-insert",j),j.element.innerHTML=j.highlightedCode,e&&e.call(b),c.hooks.run("after-highlight",j),c.hooks.run("complete",j)},highlight:function(a,b,e){var f=c.tokenize(a,b);return d.stringify(c.util.encode(f),e)},matchGrammar:function(a,b,d,e,f,g,h){var i=c.Token;for(var j in d)if(d.hasOwnProperty(j)&&d[j]){if(j==h)return;var k=d[j];k="Array"===c.util.type(k)?k:[k];for(var l=0;l<k.length;++l){var m=k[l],n=m.inside,o=!!m.lookbehind,p=!!m.greedy,q=0,r=m.alias;if(p&&!m.pattern.global){var s=m.pattern.toString().match(/[imuy]*$/)[0];m.pattern=RegExp(m.pattern.source,s+"g")}m=m.pattern||m;for(var t=e,u=f;t<b.length;u+=b[t].length,++t){var v=b[t];if(b.length>a.length)return;if(!(v instanceof i)){m.lastIndex=0;var w=m.exec(v),x=1;if(!w&&p&&t!=b.length-1){if(m.lastIndex=u,!(w=m.exec(a)))break;for(var y=w.index+(o?w[1].length:0),z=w.index+w[0].length,A=t,B=u,C=b.length;C>A&&(z>B||!b[A].type&&!b[A-1].greedy);++A)B+=b[A].length,y>=B&&(++t,u=B);if(b[t]instanceof i||b[A-1].greedy)continue;x=A-t,v=a.slice(u,B),w.index-=u}if(w){o&&(q=w[1].length);var y=w.index+q,w=w[0].slice(q),z=y+w.length,D=v.slice(0,y),E=v.slice(z),F=[t,x];D&&(++t,u+=D.length,F.push(D));var G=new i(j,n?c.tokenize(w,n):w,r,w,p);if(F.push(G),E&&F.push(E),Array.prototype.splice.apply(b,F),1!=x&&c.matchGrammar(a,b,d,t,u,!0,j),g)break}else if(g)break}}}}},tokenize:function(a,b){var d=[a],e=b.rest;if(e){for(var f in e)b[f]=e[f];delete b.rest}return c.matchGrammar(a,d,b,0,0,!1),d},hooks:{all:{},add:function(a,b){var d=c.hooks.all;d[a]=d[a]||[],d[a].push(b)},run:function(a,b){var d=c.hooks.all[a];if(d&&d.length)for(var e,f=0;e=d[f++];)e(b)}}},d=c.Token=function(a,b,c,d,e){this.type=a,this.content=b,this.alias=c,this.length=0|(d||"").length,this.greedy=!!e};if(d.stringify=function(a,b,e){if("string"==typeof a)return a;if("Array"===c.util.type(a))return a.map(function(c){return d.stringify(c,b,a)}).join("");var f={type:a.type,content:d.stringify(a.content,b,e),tag:"span",classes:["token",a.type],attributes:{},language:b,parent:e};if("comment"==f.type&&(f.attributes.spellcheck="true"),a.alias){var g="Array"===c.util.type(a.alias)?a.alias:[a.alias];Array.prototype.push.apply(f.classes,g)}c.hooks.run("wrap",f);var h=Object.keys(f.attributes).map(function(a){return a+'="'+(f.attributes[a]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+f.tag+' class="'+f.classes.join(" ")+'"'+(h?" "+h:"")+">"+f.content+"</"+f.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(a){var b=JSON.parse(a.data),d=b.language,e=b.code,f=b.immediateClose;_self.postMessage(c.highlight(e,c.languages[d],d)),f&&_self.close()},!1),_self.Prism):_self.Prism;var e=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return e&&(c.filename=e.src,!document.addEventListener||c.manual||e.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(c.highlightAll):window.setTimeout(c.highlightAll,16):document.addEventListener("DOMContentLoaded",c.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:{pattern:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag)),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,function:/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript,function(a){a.languages.sass=a.languages.extend("css",{comment:{pattern:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,lookbehind:!0}}),a.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,inside:{atrule:/(?:@[\w-]+|[+=])/m}}}),delete a.languages.sass.atrule;var b=/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i,c=[/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,{pattern:/(\s+)-(?=\s)/,lookbehind:!0}];a.languages.insertBefore("sass","property",{"variable-line":{pattern:/^[ \t]*\$.+/m,inside:{punctuation:/:/,variable:b,operator:c}},"property-line":{pattern:/^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:b,operator:c,important:a.languages.sass.important}}}),delete a.languages.sass.property,delete a.languages.sass.important,delete a.languages.sass.selector,a.languages.insertBefore("sass","punctuation",{selector:{pattern:/([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,lookbehind:!0}})}(Prism),Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)*url(?=\()/i,selector:{pattern:/(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,inside:{parent:{pattern:/&/,alias:"important"},placeholder:/%[-_\w]+/,variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,{pattern:/( +)(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.scss.property={pattern:/(?:[\w-]|\$[-_\w]+|#\{\$[-_\w]+\})+(?=\s*:)/i,inside:{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}},Prism.languages.insertBefore("scss","important",{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}),Prism.languages.insertBefore("scss","function",{placeholder:{pattern:/%[-_\w]+/,alias:"selector"},statement:{pattern:/\B!(?:default|optional)\b/i,alias:"keyword"},boolean:/\b(?:true|false)\b/,null:/\bnull\b/,operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.util.clone(Prism.languages.scss);