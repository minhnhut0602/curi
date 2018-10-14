(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{90:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return u});var a=n(0),r=n.n(a),s=n(8),o=n(5),c=n(94),i=n(95),l={title:"Side Effects"};function u(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,l.title),r.a.createElement(c.a,{title:"Explanation",id:"explanation"},r.a.createElement("p",null,"Once a response has completed (the route's ",r.a.createElement(s.b,null,"resolve")," ","functions have resolved), the response's properties are used to create a JavaScript object. Then, any response handler functions are called and passed that JavaScript object . Side effects are permanent observers (they cannot be removed). Side effects after other response handlers (observers that were set using ",r.a.createElement(s.b,null,"router.observe()")," ","and one time functions that were set using ",r.a.createElement(s.b,null,"router.once()"),"). They receive the new response and an object with information about the navigation."),r.a.createElement("p",null,"A side effect function can do anything you want. Unlike observers assigned using ",r.a.createElement(s.b,null,"router.observe()"),", side effects cannot be removed."),r.a.createElement("p",null,"You pass any side effect functions that you want to use to the"," ",r.a.createElement(s.b,null,"curi")," call, using the ",r.a.createElement(s.b,null,"sideEffects")," property of the options object."),r.a.createElement(o.a,{lang:"javascript"},"import { curi } from '@curi/router';\n  import mySideEffect from './mySideEffect';\n\n  const router = curi(history, routes, {\n    sideEffects: [mySideEffect]\n  });")),r.a.createElement(c.a,{title:"Live Demo",id:"demo"},r.a.createElement(i.a,{id:"github/pshrmn/curi/tree/master/examples/misc/side-effect"})),r.a.createElement(c.a,{title:"On GitHub",id:"source"},"If you want to run this code locally, the source code is available on GitHub"," ",r.a.createElement("a",{href:"https://github.com/pshrmn/curi/tree/master/examples/misc/side-effect"},"here"),"."))}}}]);