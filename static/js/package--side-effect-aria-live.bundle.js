(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return y});var r=n(0),a=n.n(r),o=n(96),i=n(97),l=n(8),c=n(94),u=n(5),s=n(9);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),b(this,h(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,a.a.PureComponent),function(e,t,n){t&&p(e.prototype,t),n&&p(e,n)}(t,[{key:"render",value:function(){var e=this.props;e.name,e.version,e.globalName;return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.a,null,a.a.createElement(u.b,null,a.a.createElement("p",null,"When you navigate in a non-single-page application, users who rely on a screen reader will get an announcement about the navigation. Unfortunately, this behavior does not natively exist with single-page applications and the History API."),a.a.createElement("p",null,"This side-effect usea"," ",a.a.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"},"ARIA live regions")," ","to announce navigations to users who use screen readers."))),a.a.createElement(o.a,null,a.a.createElement(c.a,{tag:"h3",title:"ariaLiveEffect",id:"ariaLiveEffect"},a.a.createElement(u.b,null,a.a.createElement("p",null,"When you create an ARIA live side effect, an element with a"," ",a.a.createElement(l.b,null,"aria-live")," attribute will be added to the DOM. This element will be styled to not be displayed on screen (but not actually hidden) so that only screen readers detect it."),a.a.createElement(s.b,null,"This side-effect should only be used in the browser."),a.a.createElement("p",null,"The side-effect factory takes a function, which will receives the same arguments as an observer (",a.a.createElement(l.b,null,"response"),","," ",a.a.createElement(l.b,null,"navigation"),", and ",a.a.createElement(l.b,null,"router"),"). Using the objects, the function returns a string, which is the message about the navigation that will be read by the screen reader."),a.a.createElement("p",null,"The DOM element's ",a.a.createElement(l.b,null,"aria-live")," attribute will be"," ",a.a.createElement(l.b,null,'"assertive"')," by default, but you can use the side-effect factory's second argument to pass an alternative (i.e. ",a.a.createElement(l.b,null,'>"polite"'),").")),a.a.createElement(u.a,null,"import { curi } from '@curi/router';\nimport ariaLive from '@curi/side-effect-aria-live';\n\nconst announcer = ariaLive(\n  ({ response }) => `Navigated to ${response.title}`\n);\n\nconst politeAnnouncer = ariaLive(\n  ({ response }) => `Navigated to ${response.title}`,\n  \"polite\"\n);\n\nconst router = curi(history, routes, {\n  sideEffects: [announcer]\n});"))))}}]),t}()}}]);