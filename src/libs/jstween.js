/*!
 * VERSION: 0.7.0
 * DATE: 2016-8-17
 * GIT:https://github.com/shrekshrek/jstween
 *
 * @author: Shrek.wang, shrekshrek@gmail.com
 **/

!function(t){var n="object"==typeof self&&self.self==self&&self||"object"==typeof global&&global.global==global&&global;"function"==typeof define&&define.amd?define(["exports"],function(e){n.JT=t(n,e)}):"undefined"!=typeof exports?t(n,exports):n.JT=t(n,{})}(function(t,n){function e(t,n){for(var e in n)t[e]=n[e]}function i(t,n){if(t.length&&t.length>0)for(var e=0;e<t.length;e++)n.call(t[e],e,t[e]);else n.call(t,0,t)}function r(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function a(t){return t.replace(/\b(\w)|\s(\w)/g,function(t){return t.toUpperCase()})}function o(t){return Math.round(1e3*t)/1e3}function s(t){return t?D+a(t):D}function u(t){if(!t)throw"target is undefined, can't tween!!!";return"string"==typeof t?"undefined"==typeof document?t:document.querySelectorAll?document.querySelectorAll(t):document.getElementById("#"===t.charAt(0)?t.substr(1):t):t}function c(t,n){return"rotation"==n||"scale"==n?n:void 0!==t._jt_obj[n]?n:void 0!==t.style[n]?n:(n=s(n),void 0!==t.style[n]?n:void 0)}function h(t,n,e,i){var r={};if(n instanceof Array){r.num=[];for(var a in n){var o=l(t,n[a]);r.num[a]=o.num,r.unit=o.unit}void 0!=e&&(i?r.num.push(e.num):r.num.unshift(e.num))}else r=l(t,n);return r}function l(t,n){var e=p(n);"rem"==t.unit&&"rem"!=e.unit?(w(),t.num=o(t.num*V),t.unit="px"):"rem"!=t.unit&&"rem"==e.unit&&(w(),t.num=o(t.num/V),t.unit="rem");var i;switch(e.ext){case"+=":i=t.num+e.num;break;case"-=":i=t.num-e.num;break;default:i=e.num}return{num:i,unit:e.unit||t.unit}}function f(t){void 0==t._jt_obj&&(t._jt_obj={perspective:0,x:0,y:0,z:0,rotationX:0,rotationY:0,rotationZ:0,scaleX:1,scaleY:1,scaleZ:1,skewX:0,skewY:0})}function p(t){var n=/(\+=|-=|)(-|)(\d+\.\d+|\d+)(e[+-]?[0-9]{0,2}|)(rem|px|%|)/i,e=n.exec(t);return e?{num:o(e[2]+e[3]+e[4]),unit:e[5],ext:e[1]}:{num:0,unit:"px",ext:""}}function d(t){return/\S\s+\S/g.test(t)||!/\d/g.test(t)}function v(t,n){switch(n){case"perspective":case"x":case"y":case"z":case"rotationX":case"rotationY":case"rotationZ":case"scaleX":case"scaleY":case"scaleZ":case"skewX":case"skewY":return t._jt_obj[n];case"rotation":return t._jt_obj.rotationZ;case"scale":return t._jt_obj.scaleX;default:return m(t,n)}}function m(t,n){if(t.style[n])return t.style[n];if(document.defaultView&&document.defaultView.getComputedStyle){var e=r(n),i=document.defaultView.getComputedStyle(t,"");return i&&i.getPropertyValue(e)}return t.currentStyle?t.currentStyle[n]:null}function _(t,n,e){switch(n){case"perspective":case"x":case"y":case"z":case"rotationX":case"rotationY":case"rotationZ":case"scaleX":case"scaleY":case"scaleZ":case"skewX":case"skewY":return t._jt_obj[n]=e,!0;case"rotation":return t._jt_obj.rotationZ=e,!0;case"scale":return t._jt_obj.scaleX=e,t._jt_obj.scaleY=e,!0;default:return y(t,n,e),!1}}function y(t,n,e){t.style[n]=e}function g(t){return"object"==typeof t&&1===t.nodeType}function j(t){var n="";t._jt_obj.perspective&&(n+="perspective("+t._jt_obj.perspective+") "),(t._jt_obj.x||t._jt_obj.y||t._jt_obj.z)&&(n+="translate3d("+b(t._jt_obj.x)+","+b(t._jt_obj.y)+","+b(t._jt_obj.z)+") "),t._jt_obj.rotationX&&(n+="rotateX("+t._jt_obj.rotationX%360+"deg) "),t._jt_obj.rotationY&&(n+="rotateY("+t._jt_obj.rotationY%360+"deg) "),t._jt_obj.rotationZ&&(n+="rotateZ("+t._jt_obj.rotationZ%360+"deg) "),(1!=t._jt_obj.scaleX||1!=t._jt_obj.scaleY||1!=t._jt_obj.scaleZ)&&(n+="scale3d("+t._jt_obj.scaleX+", "+t._jt_obj.scaleY+", "+t._jt_obj.scaleZ+") "),(t._jt_obj.skewX||t._jt_obj.skewY)&&(n+="skew("+t._jt_obj.skewX+"deg,"+t._jt_obj.skewY+"deg) "),t.style[s("transform")]=n}function b(t){return t+("number"==typeof t?"px":"")}function w(){C||(C=document.createElement("div"),C.style.cssText="border:0 solid; position:absolute; line-height:0px;"),z||(z=document.getElementsByTagName("body")[0]),z.appendChild(C),C.style.borderLeftWidth="1rem",V=parseFloat(C.offsetWidth),z.removeChild(C)}function M(){B=!0;var t=q.length,n=L.length;if(0===t&&0===n)return void(B=!1);var e=Y(),i=e-F;F=e;for(var r=0;t>r;r++){var a=q[r];a&&!a._update(i)&&(a.isActive&&(a.isActive=!1,q.splice(r,1),a.onEnd&&a.onEnd.apply(a,a.onEndParams)),r--,t--)}for(var o=0;n>o;o++){var s=L[o];s&&!s._update(i)&&(L.splice(o,1),s.onEnd&&s.onEnd.apply(s,s.onEndParams),o--,n--)}Z(M)}function P(){this.initialize.apply(this,arguments)}function T(t,n){var e=u(t),r=q.length;i(e,function(t,e){for(var i=r-1;i>=0;i--){var a=q[i];a.target===e&&a[n]()}})}function E(t){for(var n=q.length,e=n-1;e>=0;e--){var i=q[e];i[t]()}}function I(){this.initialize.apply(this,arguments)}function S(t,n){var e=t,r=L.length;i(e,function(t,e){for(var i=r-1;i>=0;i--){var a=L[i];a.onEnd===e&&a[n]()}})}function k(t){for(var n=L.length,e=n-1;e>=0;e--){var i=L[e];i[t]()}}function x(t){t.bezier&&(A(t,t.bezier),t.interpolation=R,delete t.bezier),t.through&&(A(t,t.through),t.interpolation=X,delete t.through),t.linear&&(A(t,t.linear),t.interpolation=O,delete t.linear)}function A(t,n){for(var e in n)for(var i in n[e])0==e?t[i]=[n[e][i]]:t[i].push(n[e][i])}function O(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),a=N.Linear;return 0>n?a(t[0],t[1],i):n>1?a(t[e],t[e-1],e-i):a(t[r],t[r+1>e?e:r+1],i-r)}function R(t,n){var e,i=0,r=t.length-1,a=Math.pow,o=N.Bernstein;for(e=0;r>=e;e++)i+=a(1-n,r-e)*a(n,e)*t[e]*o(r,e);return i}function X(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),a=N.Through;return t[0]===t[e]?(0>n&&(r=Math.floor(i=e*(1+n))),a(t[(r-1+e)%e],t[r],t[(r+1)%e],t[(r+2)%e],i-r)):0>n?t[0]-(a(t[0],t[0],t[1],t[1],-i)-t[0]):n>1?t[e]-(a(t[e],t[e],t[e-1],t[e-1],i-e)-t[e]):a(t[r?r-1:0],t[r],t[r+1>e?e:r+1],t[r+2>e?e:r+2],i-r)}Date.now=Date.now||function(){return(new Date).getTime()};var U=Date.now(),Y=function(){return Date.now()-U},D="";!function(){var t=document.createElement("div"),n=["Webkit","Moz","Ms","O"];for(var e in n)if(n[e]+"Transform"in t.style){D=n[e];break}}();var z,C,V,Z=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},q=[],B=!1,F=0;e(P.prototype,{initialize:function(t,e,i,r,a){this.fromVars=i,this.curVars={},this.toVars=r,this.target=t,this.duration=1e3*Math.max(e,0),this.ease=r.ease||n.Linear.None,this.delay=1e3*Math.max(r.delay||0,0),this.yoyo=r.yoyo||!1,this.repeat=this.curRepeat=Math.floor(r.repeat||0),this.repeatDelay=1e3*Math.max(r.repeatDelay||0,0),this.onStart=r.onStart||null,this.onStartParams=r.onStartParams||[],this.onRepeat=r.onRepeat||null,this.onRepeatParams=r.onRepeatParams||[],this.onEnd=r.onEnd||null,this.onEndParams=r.onEndParams||[],this.onUpdate=r.onUpdate||null,this.onUpdateParams=r.onUpdateParams||[],this.isPlaying=r.isPlaying||!0,this.interpolation=r.interpolation||null,this.isActive=r.isActive||!0,this.isReverse=!1,this.isDom=a,this.curTime=0,this.isStart=!1,this.startTime=this.delay,this.endTime=this.startTime+this.repeatDelay+this.duration,0!=this.delay&&(this._updateProp(),this.onUpdate&&this.onUpdate.apply(this,this.onUpdateParams)),this.isActive&&this._addSelf()},_update:function(t){if(!this.isPlaying)return!0;if(this.curTime+=t,this.curTime<this.startTime)return!0;if(this.isStart||(this.curTime+=this.repeatDelay),this.curTime<this.startTime+this.repeatDelay)return!0;if(this.curTime<this.endTime)this._updateProp(),this.onUpdate&&this.onUpdate.apply(this,this.onUpdateParams);else{if(0==this.curRepeat)return this._updateProp(),this.onUpdate&&this.onUpdate.apply(this,this.onUpdateParams),this._checkStart(),!1;this.yoyo&&(this.isReverse=!this.isReverse);var n=(this.curTime-this.endTime)%(this.duration+this.repeatDelay);0==this.repeatDelay?(this.curTime=this.startTime+n,this._updateProp()):(this._updateProp(),this.curTime=this.startTime+n),this.onUpdate&&this.onUpdate.apply(this,this.onUpdateParams),this.onRepeat&&this.onRepeat.apply(this,this.onRepeatParams),this.curRepeat>0&&this.curRepeat--}return this._checkStart(),!0},_checkStart:function(){this.isStart||(this.isStart=!0,this.onStart&&this.onStart.apply(this,this.onStartParams))},_updateProp:function(){var t=0==this.duration?1:(this.curTime-this.startTime-this.repeatDelay)/this.duration;t=Math.max(0,Math.min(1,t)),this.isReverse&&(t=1-t);var n=this.ease(t),e=!1;for(var i in this.fromVars){var r,a=this.fromVars[i],s=this.toVars[i];r=s.num instanceof Array?this.interpolation(s.num,n):a.num+(s.num-a.num)*n,r=o(r),this.curVars[i]={num:r,unit:s.unit},this.isDom?(Math.abs(s.num-a.num)>20&&(r=Math.round(r)),_(this.target,i,r+(s.unit||0))&&(e=!0)):this.target[i]=r+(s.unit||0)}e&&j(this.target)},_toEnd:function(){var t=!1;for(var n in this.fromVars){var e=this.toVars[n],i=o(e.num);this.curVars[n]={num:i,unit:e.unit},this.isDom?_(this.target,n,i+(e.unit||0))&&(t=!0):this.target[n]=i+(e.unit||0)}t&&j(this.target)},_addSelf:function(){this.isActive=!0,q.push(this),B||(F=n.now(),M())},_removeSelf:function(){this.isActive=!1;var t=q.indexOf(this);-1!==t&&q.splice(t,1)},active:function(){this._addSelf()},play:function(){this.isPlaying=!0},pause:function(){this.isPlaying=!1},kill:function(t){this._removeSelf(),t&&(this._toEnd(),this.onEnd&&this.onEnd.apply(this,this.onEndParams))}}),e(n,{get:function(t,n){var e=u(t);if(void 0!==e.length&&(e=e[0]),g(e)){f(e);var i=c(e,n);return i?v(e,i):null}return e[n]},set:function(t,n){var e=u(t);i(e,function(t,e){if(g(e)){f(e);var i=!1;for(var r in n){var a=c(e,r);if(a)if(d(n[r]))_(e,a,n[r]);else{var o=h(p(v(e,a)),n[r]);_(e,a,o.num+(o.unit||0))&&(i=!0)}}i&&j(e)}else for(var s in n){var o=h(p(e[s]),n[s]);e[s]=o.num+(o.unit||0)}})},fromTo:function(t,n,e,r){x(r);var a=u(t),o=[];return i(a,function(t,i){var a={},s={},u=g(i);if(u){f(i);for(var l in r){var d=c(i,l);if(d){var m=p(v(i,d));a[d]=h(m,e[l]),s[d]=h(m,r[l],a[d],!1)}else s[l]=r[l]}}else for(var l in r)if(void 0!==i[l]){var m=p(i[l]);a[l]=h(m,e[l]),s[l]=h(m,r[l],a[l],!1)}else s[l]=r[l];var _=new P(i,n,a,s,u);o.push(_)}),1==o.length?o[0]:o},from:function(t,n,e){x(e);var r=u(t),a=[];return i(r,function(t,i){var r={},o={},s=g(i);if(s){f(i);for(var u in e){var l=c(i,u);if(l){var d=p(v(i,l));r[l]=h(d,e[u],d,!0),o[l]=d}else o[u]=e[u]}}else for(var u in e)if(void 0!==i[u]){var d=p(i[u]);r[u]=h(d,e[u],d,!0),o[u]=d}else o[u]=e[u];var m=new P(i,n,r,o,s);a.push(m)}),1==a.length?a[0]:a},to:function(t,n,e){x(e);var r=u(t),a=[];return i(r,function(t,i){var r={},o={},s=g(i);if(s){f(i);for(var u in e){var l=c(i,u);if(l){var d=p(v(i,l));r[l]=d,o[l]=h(d,e[u],d,!1)}else o[u]=e[u]}}else for(var u in e)if(void 0!==i[u]){var d=p(i[u]);r[u]=d,o[u]=h(d,e[u],d,!1)}else o[u]=e[u];var m=new P(i,n,r,o,s);a.push(m)}),1==a.length?a[0]:a},kill:function(t,n){var e=u(t);i(e,function(t,e){for(var i=q.length,r=i-1;r>=0;r--){var a=q[r];a.target===e&&a.kill(n)}})},killAll:function(t){for(var n=q.length,e=n-1;e>=0;e--){var i=q[e];i.kill(t)}},play:function(t){T(t,"play")},playAll:function(){E("play")},pause:function(t){T(t,"pause")},pauseAll:function(){E("pause")},isTweening:function(t){var n=u(t);n=n[0]||n;for(var e=q.length,i=e-1;i>=0;i--){var r=q[i];if(r.target===n)return!0}return!1}});var L=[];e(I.prototype,{initialize:function(t,n,e,i){this.delay=1e3*t,this.onEnd=n||null,this.onEndParams=e||[],this.curTime=0,this.endTime=this.delay,this.isPlaying=i||!0,0!=this.delay?this._addSelf():this.onEnd&&this.onEnd.apply(this,this.onEndParams)},_update:function(t){return this.isPlaying?(this.curTime+=t,this.curTime<this.endTime?!0:!1):!0},_addSelf:function(){L.push(this),B||(F=n.now(),M())},_removeSelf:function(){var t=L.indexOf(this);-1!==t&&L.splice(t,1)},play:function(){this.isPlaying=!0},pause:function(){this.isPlaying=!1},kill:function(t){this._removeSelf(),t&&(this._toEnd(),this.onEnd&&this.onEnd.apply(this,this.onEndParams))}}),e(n,{call:function(t,n,e,i){return new I(t,n,e,i)},killCall:function(t,n){var e=t,r=L.length;i(e,function(t,e){for(var i=r-1;i>=0;i--){var a=L[i];a.onEnd===e&&a.kill(n)}})},killAllCalls:function(t){for(var n=L.length,e=n-1;e>=0;e--){var i=L[e];i.kill(t)}},playCall:function(t){S(t,"play")},playAllCalls:function(){k("play")},pauseCall:function(t){S(t,"pause")},pauseAllCalls:function(){k("pause")}}),e(n,{path:function(t){x(t);for(var e,i=t.ease||n.Linear.None,r=t.step||1,a=[],o=0;r>=o;o++){e=i(o/r);var s={};for(var u in t)t[u]instanceof Array&&(s[u]=t.interpolation(t[u],e));a.push(s)}return a}});var N={Linear:function(t,n,e){return(n-t)*e+t},Bernstein:function(t,n){var e=N.Factorial;return e(t)/e(n)/e(t-n)},Factorial:function(){var t=[1];return function(n){var e,i=1;if(t[n])return t[n];for(e=n;e>1;e--)i*=e;return t[n]=i}}(),Through:function(t,n,e,i,r){var a=.5*(e-t),o=.5*(i-n),s=r*r,u=r*s;return(2*n-2*e+a+o)*u+(-3*n+3*e-2*a-o)*s+a*r+n}};return e(n,{Linear:{None:function(t){return t}},Quad:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quart:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quint:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sine:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Expo:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}},Circ:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){var n,e=.1,i=.4;return 0===t?0:1===t?1:(!e||1>e?(e=1,n=i/4):n=i*Math.asin(1/e)/(2*Math.PI),-(e*Math.pow(2,10*(t-=1))*Math.sin(2*(t-n)*Math.PI/i)))},Out:function(t){var n,e=.1,i=.4;return 0===t?0:1===t?1:(!e||1>e?(e=1,n=i/4):n=i*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin(2*(t-n)*Math.PI/i)+1)},InOut:function(t){var n,e=.1,i=.4;return 0===t?0:1===t?1:(!e||1>e?(e=1,n=i/4):n=i*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?-.5*e*Math.pow(2,10*(t-=1))*Math.sin(2*(t-n)*Math.PI/i):e*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-n)*Math.PI/i)*.5+1)}},Back:{In:function(t){var n=1.70158;return t*t*((n+1)*t-n)},Out:function(t){var n=1.70158;return--t*t*((n+1)*t+n)+1},InOut:function(t){var n=2.5949095;return(t*=2)<1?.5*t*t*((n+1)*t-n):.5*((t-=2)*t*((n+1)*t+n)+2)}},Bounce:{In:function(t){return 1-n.Bounce.Out(1-t)},Out:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return.5>t?.5*n.Bounce.In(2*t):.5*n.Bounce.Out(2*t-1)+.5}}}),n.now=Y,n});