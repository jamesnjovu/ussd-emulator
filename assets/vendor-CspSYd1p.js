var e,t,r=Object.defineProperty,n=(e,t,n)=>((e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n);function o(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var i,s,a={exports:{}},c={};function u(){if(i)return c;i=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),a=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),d=Symbol.iterator;var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h=Object.assign,m={};function g(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||y}function b(){}function v(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||y}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=g.prototype;var T=v.prototype=new b;T.constructor=v,h(T,g.prototype),T.isPureReactComponent=!0;var O=Array.isArray,S={H:null,A:null,T:null,S:null},_=Object.prototype.hasOwnProperty;function A(t,r,n,o,i,s){return n=s.ref,{$$typeof:e,type:t,key:r,ref:void 0!==n?n:null,props:s}}function E(t){return"object"==typeof t&&null!==t&&t.$$typeof===e}var w=/\/+/g;function C(e,t){return"object"==typeof e&&null!==e&&null!=e.key?(r=""+e.key,n={"=":"=0",":":"=2"},"$"+r.replace(/[=:]/g,(function(e){return n[e]}))):t.toString(36);var r,n}function x(){}function j(r,n,o,i,s){var a=typeof r;"undefined"!==a&&"boolean"!==a||(r=null);var c,u,l=!1;if(null===r)l=!0;else switch(a){case"bigint":case"string":case"number":l=!0;break;case"object":switch(r.$$typeof){case e:case t:l=!0;break;case p:return j((l=r._init)(r._payload),n,o,i,s)}}if(l)return s=s(r),l=""===i?"."+C(r,0):i,O(s)?(o="",null!=l&&(o=l.replace(w,"$&/")+"/"),j(s,n,o,"",(function(e){return e}))):null!=s&&(E(s)&&(c=s,u=o+(null==s.key||r&&r.key===s.key?"":(""+s.key).replace(w,"$&/")+"/")+l,s=A(c.type,u,void 0,0,0,c.props)),n.push(s)),1;l=0;var f,y=""===i?".":i+":";if(O(r))for(var h=0;h<r.length;h++)l+=j(i=r[h],n,o,a=y+C(i,h),s);else if("function"==typeof(h=null===(f=r)||"object"!=typeof f?null:"function"==typeof(f=d&&f[d]||f["@@iterator"])?f:null))for(r=h.call(r),h=0;!(i=r.next()).done;)l+=j(i=i.value,n,o,a=y+C(i,h++),s);else if("object"===a){if("function"==typeof r.then)return j(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"==typeof e.status?e.then(x,x):(e.status="pending",e.then((function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)}),(function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)}))),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(r),n,o,i,s);throw n=String(r),Error("Objects are not valid as a React child (found: "+("[object Object]"===n?"object with keys {"+Object.keys(r).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}return l}function k(e,t,r){if(null==e)return e;var n=[],o=0;return j(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function $(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var H="function"==typeof reportError?reportError:function(e){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof e&&null!==e&&"string"==typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"==typeof process&&"function"==typeof process.emit)return void process.emit("uncaughtException",e)};function R(){}return c.Children={map:k,forEach:function(e,t,r){k(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return k(e,(function(){t++})),t},toArray:function(e){return k(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},c.Component=g,c.Fragment=r,c.Profiler=o,c.PureComponent=v,c.StrictMode=n,c.Suspense=l,c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,c.act=function(){throw Error("act(...) is not supported in production builds of React.")},c.cache=function(e){return function(){return e.apply(null,arguments)}},c.cloneElement=function(e,t,r){if(null==e)throw Error("The argument must be a React element, but you passed "+e+".");var n=h({},e.props),o=e.key;if(null!=t)for(i in void 0!==t.ref&&void 0,void 0!==t.key&&(o=""+t.key),t)!_.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(n[i]=t[i]);var i=arguments.length-2;if(1===i)n.children=r;else if(1<i){for(var s=Array(i),a=0;a<i;a++)s[a]=arguments[a+2];n.children=s}return A(e.type,o,void 0,0,0,n)},c.createContext=function(e){return(e={$$typeof:a,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},c.createElement=function(e,t,r){var n,o={},i=null;if(null!=t)for(n in void 0!==t.key&&(i=""+t.key),t)_.call(t,n)&&"key"!==n&&"__self"!==n&&"__source"!==n&&(o[n]=t[n]);var s=arguments.length-2;if(1===s)o.children=r;else if(1<s){for(var a=Array(s),c=0;c<s;c++)a[c]=arguments[c+2];o.children=a}if(e&&e.defaultProps)for(n in s=e.defaultProps)void 0===o[n]&&(o[n]=s[n]);return A(e,i,void 0,0,0,o)},c.createRef=function(){return{current:null}},c.forwardRef=function(e){return{$$typeof:u,render:e}},c.isValidElement=E,c.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:$}},c.memo=function(e,t){return{$$typeof:f,type:e,compare:void 0===t?null:t}},c.startTransition=function(e){var t=S.T,r={};S.T=r;try{var n=e(),o=S.S;null!==o&&o(r,n),"object"==typeof n&&null!==n&&"function"==typeof n.then&&n.then(R,H)}catch(i){H(i)}finally{S.T=t}},c.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},c.use=function(e){return S.H.use(e)},c.useActionState=function(e,t,r){return S.H.useActionState(e,t,r)},c.useCallback=function(e,t){return S.H.useCallback(e,t)},c.useContext=function(e){return S.H.useContext(e)},c.useDebugValue=function(){},c.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},c.useEffect=function(e,t){return S.H.useEffect(e,t)},c.useId=function(){return S.H.useId()},c.useImperativeHandle=function(e,t,r){return S.H.useImperativeHandle(e,t,r)},c.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},c.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},c.useMemo=function(e,t){return S.H.useMemo(e,t)},c.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},c.useReducer=function(e,t,r){return S.H.useReducer(e,t,r)},c.useRef=function(e){return S.H.useRef(e)},c.useState=function(e){return S.H.useState(e)},c.useSyncExternalStore=function(e,t,r){return S.H.useSyncExternalStore(e,t,r)},c.useTransition=function(){return S.H.useTransition()},c.version="19.0.0",c}function l(){return s||(s=1,a.exports=u()),a.exports}var f=l();const p=o(f);var d,y,h,m,g={exports:{}},b={};function v(){if(d)return b;d=1;var e=l();function t(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(){}var n={d:{f:r,r:function(){throw Error(t(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},o=Symbol.for("react.portal");var i=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function s(e,t){return"font"===e?"":"string"==typeof t?"use-credentials"===t?t:"":void 0}return b.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=n,b.createPortal=function(e,r){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!r||1!==r.nodeType&&9!==r.nodeType&&11!==r.nodeType)throw Error(t(299));return function(e,t,r){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:o,key:null==n?null:""+n,children:e,containerInfo:t,implementation:r}}(e,r,null,n)},b.flushSync=function(e){var t=i.T,r=n.p;try{if(i.T=null,n.p=2,e)return e()}finally{i.T=t,n.p=r,n.d.f()}},b.preconnect=function(e,t){"string"==typeof e&&(t?t="string"==typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,n.d.C(e,t))},b.prefetchDNS=function(e){"string"==typeof e&&n.d.D(e)},b.preinit=function(e,t){if("string"==typeof e&&t&&"string"==typeof t.as){var r=t.as,o=s(r,t.crossOrigin),i="string"==typeof t.integrity?t.integrity:void 0,a="string"==typeof t.fetchPriority?t.fetchPriority:void 0;"style"===r?n.d.S(e,"string"==typeof t.precedence?t.precedence:void 0,{crossOrigin:o,integrity:i,fetchPriority:a}):"script"===r&&n.d.X(e,{crossOrigin:o,integrity:i,fetchPriority:a,nonce:"string"==typeof t.nonce?t.nonce:void 0})}},b.preinitModule=function(e,t){if("string"==typeof e)if("object"==typeof t&&null!==t){if(null==t.as||"script"===t.as){var r=s(t.as,t.crossOrigin);n.d.M(e,{crossOrigin:r,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0})}}else null==t&&n.d.M(e)},b.preload=function(e,t){if("string"==typeof e&&"object"==typeof t&&null!==t&&"string"==typeof t.as){var r=t.as,o=s(r,t.crossOrigin);n.d.L(e,r,{crossOrigin:o,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0,type:"string"==typeof t.type?t.type:void 0,fetchPriority:"string"==typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"==typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"==typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"==typeof t.imageSizes?t.imageSizes:void 0,media:"string"==typeof t.media?t.media:void 0})}},b.preloadModule=function(e,t){if("string"==typeof e)if(t){var r=s(t.as,t.crossOrigin);n.d.m(e,{as:"string"==typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:r,integrity:"string"==typeof t.integrity?t.integrity:void 0})}else n.d.m(e)},b.requestFormReset=function(e){n.d.r(e)},b.unstable_batchedUpdates=function(e,t){return e(t)},b.useFormState=function(e,t,r){return i.H.useFormState(e,t,r)},b.useFormStatus=function(){return i.H.useHostTransitionStatus()},b.version="19.0.0",b}function T(){if(y)return g.exports;return y=1,function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){}}(),g.exports=v(),g.exports}const O=o(function(){if(m)return h;m=1;var e="undefined"!=typeof Element,t="function"==typeof Map,r="function"==typeof Set,n="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function o(i,s){if(i===s)return!0;if(i&&s&&"object"==typeof i&&"object"==typeof s){if(i.constructor!==s.constructor)return!1;var a,c,u,l;if(Array.isArray(i)){if((a=i.length)!=s.length)return!1;for(c=a;0!=c--;)if(!o(i[c],s[c]))return!1;return!0}if(t&&i instanceof Map&&s instanceof Map){if(i.size!==s.size)return!1;for(l=i.entries();!(c=l.next()).done;)if(!s.has(c.value[0]))return!1;for(l=i.entries();!(c=l.next()).done;)if(!o(c.value[1],s.get(c.value[0])))return!1;return!0}if(r&&i instanceof Set&&s instanceof Set){if(i.size!==s.size)return!1;for(l=i.entries();!(c=l.next()).done;)if(!s.has(c.value[0]))return!1;return!0}if(n&&ArrayBuffer.isView(i)&&ArrayBuffer.isView(s)){if((a=i.length)!=s.length)return!1;for(c=a;0!=c--;)if(i[c]!==s[c])return!1;return!0}if(i.constructor===RegExp)return i.source===s.source&&i.flags===s.flags;if(i.valueOf!==Object.prototype.valueOf&&"function"==typeof i.valueOf&&"function"==typeof s.valueOf)return i.valueOf()===s.valueOf();if(i.toString!==Object.prototype.toString&&"function"==typeof i.toString&&"function"==typeof s.toString)return i.toString()===s.toString();if((a=(u=Object.keys(i)).length)!==Object.keys(s).length)return!1;for(c=a;0!=c--;)if(!Object.prototype.hasOwnProperty.call(s,u[c]))return!1;if(e&&i instanceof Element)return!1;for(c=a;0!=c--;)if(("_owner"!==u[c]&&"__v"!==u[c]&&"__o"!==u[c]||!i.$$typeof)&&!o(i[u[c]],s[u[c]]))return!1;return!0}return i!=i&&s!=s}return h=function(e,t){try{return o(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return!1;throw r}}}());var S,_;const A=o(_?S:(_=1,S=function(e,t,r,n,o,i,s,a){if(!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[r,n,o,i,s,a],l=0;(c=new Error(t.replace(/%s/g,(function(){return u[l++]})))).name="Invariant Violation"}throw c.framesToPop=1,c}}));var E,w;const C=o(w?E:(w=1,E=function(e,t,r,n){var o=r?r.call(n,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var i=Object.keys(e),s=Object.keys(t);if(i.length!==s.length)return!1;for(var a=Object.prototype.hasOwnProperty.bind(t),c=0;c<i.length;c++){var u=i[c];if(!a(u))return!1;var l=e[u],f=t[u];if(!1===(o=r?r.call(n,l,f,u):void 0)||void 0===o&&l!==f)return!1}return!0}));var x=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(x||{}),j={rel:["amphtml","canonical","alternate"]},k={type:["application/ld+json"]},$={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},H=Object.values(x),R={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},P=Object.entries(R).reduce(((e,[t,r])=>(e[r]=t,e)),{}),M="data-rh",D="defaultTitle",L="defer",I="encodeSpecialCharacters",N="onChangeClientState",U="titleTemplate",q="prioritizeSeoTags",z=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){const n=e[r];if(Object.prototype.hasOwnProperty.call(n,t))return n[t]}return null},V=e=>{let t=z(e,"title");const r=z(e,U);if(Array.isArray(t)&&(t=t.join("")),r&&t)return r.replace(/%s/g,(()=>t));const n=z(e,D);return t||n||void 0},B=e=>z(e,N)||(()=>{}),F=(e,t)=>t.filter((t=>void 0!==t[e])).map((t=>t[e])).reduce(((e,t)=>({...e,...t})),{}),G=(e,t)=>t.filter((e=>void 0!==e.base)).map((e=>e.base)).reverse().reduce(((t,r)=>{if(!t.length){const n=Object.keys(r);for(let o=0;o<n.length;o+=1){const i=n[o].toLowerCase();if(-1!==e.indexOf(i)&&r[i])return t.concat(r)}}return t}),[]),Y=(e,t,r)=>{const n={};return r.filter((t=>!!Array.isArray(t[e])||(void 0!==t[e]&&(t[e],console&&console.warn),!1))).map((t=>t[e])).reverse().reduce(((e,r)=>{const o={};r.filter((e=>{let r;const i=Object.keys(e);for(let n=0;n<i.length;n+=1){const o=i[n],s=o.toLowerCase();-1===t.indexOf(s)||"rel"===r&&"canonical"===e[r].toLowerCase()||"rel"===s&&"stylesheet"===e[s].toLowerCase()||(r=s),-1===t.indexOf(o)||"innerHTML"!==o&&"cssText"!==o&&"itemprop"!==o||(r=o)}if(!r||!e[r])return!1;const s=e[r].toLowerCase();return n[r]||(n[r]={}),o[r]||(o[r]={}),!n[r][s]&&(o[r][s]=!0,!0)})).reverse().forEach((t=>e.push(t)));const i=Object.keys(o);for(let t=0;t<i.length;t+=1){const e=i[t],r={...n[e],...o[e]};n[e]=r}return e}),[]).reverse()},K=(e,t)=>{if(Array.isArray(e)&&e.length)for(let r=0;r<e.length;r+=1){if(e[r][t])return!0}return!1},W=e=>Array.isArray(e)?e.join(""):e,X=(e,t)=>Array.isArray(e)?e.reduce(((e,r)=>(((e,t)=>{const r=Object.keys(e);for(let n=0;n<r.length;n+=1)if(t[r[n]]&&t[r[n]].includes(e[r[n]]))return!0;return!1})(r,t)?e.priority.push(r):e.default.push(r),e)),{priority:[],default:[]}):{default:e,priority:[]},J=(e,t)=>({...e,[t]:void 0}),Q=["noscript","script","style"],Z=(e,t=!0)=>!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),ee=e=>Object.keys(e).reduce(((t,r)=>{const n=void 0!==e[r]?`${r}="${e[r]}"`:`${r}`;return t?`${t} ${n}`:n}),""),te=(e,t={})=>Object.keys(e).reduce(((t,r)=>(t[R[r]||r]=e[r],t)),t),re=(e,t)=>t.map(((t,r)=>{const n={key:r,[M]:!0};return Object.keys(t).forEach((e=>{const r=R[e]||e;if("innerHTML"===r||"cssText"===r){const e=t.innerHTML||t.cssText;n.dangerouslySetInnerHTML={__html:e}}else n[r]=t[e]})),p.createElement(e,n)})),ne=(e,t,r=!0)=>{switch(e){case"title":return{toComponent:()=>((e,t,r)=>{const n=te(r,{key:t,[M]:!0});return[p.createElement("title",n,t)]})(0,t.title,t.titleAttributes),toString:()=>((e,t,r,n)=>{const o=ee(r),i=W(t);return o?`<${e} ${M}="true" ${o}>${Z(i,n)}</${e}>`:`<${e} ${M}="true">${Z(i,n)}</${e}>`})(e,t.title,t.titleAttributes,r)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>te(t),toString:()=>ee(t)};default:return{toComponent:()=>re(e,t),toString:()=>((e,t,r=!0)=>t.reduce(((t,n)=>{const o=n,i=Object.keys(o).filter((e=>!("innerHTML"===e||"cssText"===e))).reduce(((e,t)=>{const n=void 0===o[t]?t:`${t}="${Z(o[t],r)}"`;return e?`${e} ${n}`:n}),""),s=o.innerHTML||o.cssText||"",a=-1===Q.indexOf(e);return`${t}<${e} ${M}="true" ${i}${a?"/>":`>${s}</${e}>`}`}),""))(e,t,r)}}},oe=e=>{const{baseTag:t,bodyAttributes:r,encode:n=!0,htmlAttributes:o,noscriptTags:i,styleTags:s,title:a="",titleAttributes:c,prioritizeSeoTags:u}=e;let{linkTags:l,metaTags:f,scriptTags:p}=e,d={toComponent:()=>{},toString:()=>""};return u&&({priorityMethods:d,linkTags:l,metaTags:f,scriptTags:p}=(({metaTags:e,linkTags:t,scriptTags:r,encode:n})=>{const o=X(e,$),i=X(t,j),s=X(r,k);return{priorityMethods:{toComponent:()=>[...re("meta",o.priority),...re("link",i.priority),...re("script",s.priority)],toString:()=>`${ne("meta",o.priority,n)} ${ne("link",i.priority,n)} ${ne("script",s.priority,n)}`},metaTags:o.default,linkTags:i.default,scriptTags:s.default}})(e)),{priority:d,base:ne("base",t,n),bodyAttributes:ne("bodyAttributes",r,n),htmlAttributes:ne("htmlAttributes",o,n),link:ne("link",l,n),meta:ne("meta",f,n),noscript:ne("noscript",i,n),script:ne("script",p,n),style:ne("style",s,n),title:ne("title",{title:a,titleAttributes:c},n)}},ie=[],se=!("undefined"==typeof window||!window.document||!window.document.createElement),ae=class{constructor(e,t){n(this,"instances",[]),n(this,"canUseDOM",se),n(this,"context"),n(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?ie:this.instances,add:e=>{(this.canUseDOM?ie:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?ie:this.instances).indexOf(e);(this.canUseDOM?ie:this.instances).splice(t,1)}}}),this.context=e,this.canUseDOM=t||!1,t||(e.helmet=oe({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},ce=p.createContext({}),ue=(e=class extends f.Component{constructor(t){super(t),n(this,"helmetData"),this.helmetData=new ae(this.props.context||{},e.canUseDOM)}render(){return p.createElement(ce.Provider,{value:this.helmetData.value},this.props.children)}},n(e,"canUseDOM",se),e),le=(e,t)=>{const r=document.head||document.querySelector("head"),n=r.querySelectorAll(`${e}[${M}]`),o=[].slice.call(n),i=[];let s;return t&&t.length&&t.forEach((t=>{const r=document.createElement(e);for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))if("innerHTML"===e)r.innerHTML=t.innerHTML;else if("cssText"===e)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{const n=e,o=void 0===t[n]?"":t[n];r.setAttribute(e,o)}r.setAttribute(M,"true"),o.some(((e,t)=>(s=t,r.isEqualNode(e))))?o.splice(s,1):i.push(r)})),o.forEach((e=>{var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)})),i.forEach((e=>r.appendChild(e))),{oldTags:o,newTags:i}},fe=(e,t)=>{const r=document.getElementsByTagName(e)[0];if(!r)return;const n=r.getAttribute(M),o=n?n.split(","):[],i=[...o],s=Object.keys(t);for(const a of s){const e=t[a]||"";r.getAttribute(a)!==e&&r.setAttribute(a,e),-1===o.indexOf(a)&&o.push(a);const n=i.indexOf(a);-1!==n&&i.splice(n,1)}for(let a=i.length-1;a>=0;a-=1)r.removeAttribute(i[a]);o.length===i.length?r.removeAttribute(M):r.getAttribute(M)!==s.join(",")&&r.setAttribute(M,s.join(","))},pe=(e,t)=>{const{baseTag:r,bodyAttributes:n,htmlAttributes:o,linkTags:i,metaTags:s,noscriptTags:a,onChangeClientState:c,scriptTags:u,styleTags:l,title:f,titleAttributes:p}=e;fe("body",n),fe("html",o),((e,t)=>{void 0!==e&&document.title!==e&&(document.title=W(e)),fe("title",t)})(f,p);const d={baseTag:le("base",r),linkTags:le("link",i),metaTags:le("meta",s),noscriptTags:le("noscript",a),scriptTags:le("script",u),styleTags:le("style",l)},y={},h={};Object.keys(d).forEach((e=>{const{newTags:t,oldTags:r}=d[e];t.length&&(y[e]=t),r.length&&(h[e]=d[e].oldTags)})),t&&t(),c(e,y,h)},de=null,ye=e=>{de&&cancelAnimationFrame(de),e.defer?de=requestAnimationFrame((()=>{pe(e,(()=>{de=null}))})):(pe(e),de=null)},he=class extends f.Component{constructor(){super(...arguments),n(this,"rendered",!1)}shouldComponentUpdate(e){return!C(e,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:e}=this.props.context;e.remove(this),this.emitChange()}emitChange(){const{helmetInstances:e,setHelmet:t}=this.props.context;let r=null;const n=(o=e.get().map((e=>{const t={...e.props};return delete t.context,t})),{baseTag:G(["href"],o),bodyAttributes:F("bodyAttributes",o),defer:z(o,L),encode:z(o,I),htmlAttributes:F("htmlAttributes",o),linkTags:Y("link",["rel","href"],o),metaTags:Y("meta",["name","charset","http-equiv","property","itemprop"],o),noscriptTags:Y("noscript",["innerHTML"],o),onChangeClientState:B(o),scriptTags:Y("script",["src","innerHTML"],o),styleTags:Y("style",["cssText"],o),title:V(o),titleAttributes:F("titleAttributes",o),prioritizeSeoTags:K(o,q)});var o;ue.canUseDOM?ye(n):oe&&(r=oe(n)),t(r)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:e}=this.props.context;e.add(this),this.emitChange()}render(){return this.init(),null}},me=(t=class extends f.Component{shouldComponentUpdate(e){return!O(J(this.props,"helmetData"),J(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,r,n){return{...t,[e.type]:[...t[e.type]||[],{...r,...this.mapNestedChildrenToProps(e,n)}]}}mapObjectTypeChildren(e,t,r,n){switch(e.type){case"title":return{...t,[e.type]:n,titleAttributes:{...r}};case"body":return{...t,bodyAttributes:{...r}};case"html":return{...t,htmlAttributes:{...r}};default:return{...t,[e.type]:{...r}}}}mapArrayTypeChildrenToProps(e,t){let r={...t};return Object.keys(e).forEach((t=>{r={...r,[t]:e[t]}})),r}warnOnInvalidChildren(e,t){return A(H.some((t=>e.type===t)),"function"==typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${H.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),A(!t||"string"==typeof t||Array.isArray(t)&&!t.some((e=>"string"!=typeof e)),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let r={};return p.Children.forEach(e,(e=>{if(!e||!e.props)return;const{children:n,...o}=e.props,i=Object.keys(o).reduce(((e,t)=>(e[P[t]||t]=o[t],e)),{});let{type:s}=e;switch("symbol"==typeof s?s=s.toString():this.warnOnInvalidChildren(e,n),s){case"Symbol(react.fragment)":t=this.mapChildrenToProps(n,t);break;case"link":case"meta":case"noscript":case"script":case"style":r=this.flattenArrayTypeChildren(e,r,i,n);break;default:t=this.mapObjectTypeChildren(e,t,i,n)}})),this.mapArrayTypeChildrenToProps(r,t)}render(){const{children:e,...t}=this.props;let r={...t},{helmetData:n}=t;if(e&&(r=this.mapChildrenToProps(e,r)),n&&!(n instanceof ae)){n=new ae(n.context,!0),delete r.helmetData}return n?p.createElement(he,{...r,context:n.value}):p.createElement(ce.Consumer,null,(e=>p.createElement(he,{...r,context:e})))}},n(t,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),t);export{me as H,T as a,f as b,ue as c,l as r};
