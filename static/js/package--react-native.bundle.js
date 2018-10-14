(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{116:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return v});var a=n(0),l=n.n(a),r=n(1),i=n(96),o=n(97),c=n(8),u=n(9),s=n(94),m=n(5);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function d(e,t){return!t||"object"!==h(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),d(this,E(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,l.a.PureComponent),function(e,t,n){t&&p(e.prototype,t),n&&p(e,n)}(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(o.a,null,l.a.createElement(m.b,null,l.a.createElement("p",null,"The ",l.a.createElement(c.b,null,"@curi/react-native")," package provides components to use Curi routing in a React Native application."),l.a.createElement("p",null,"For more information on using Curi with React Native, please check out the"," ",l.a.createElement(r.b,{to:"Guide",params:{slug:"react-native"}},"React Native guide"),"."))),l.a.createElement(i.a,null,l.a.createElement(s.a,{title:l.a.createElement(c.b,null,"curiProvider()"),id:"curiProvider"},l.a.createElement(m.b,null,l.a.createElement("p",null,"The application needs a component at its root to re-render the application when new responses are emitted and to make routing related available through React's context. This component is created by passing the Curi ",l.a.createElement(c.b,null,"router")," to the"," ",l.a.createElement(c.b,null,"curiProvider()")," function."),l.a.createElement(u.a,null,l.a.createElement("p",null,"Why does ",l.a.createElement(c.b,null,"@curi/react-native")," export a function to create a component and not just a component? Props signify values that can change, but an application should only ever have one router. By hard-coding the ",l.a.createElement(c.b,null,"router")," into a component, we avoid having to handle the possibility of switching routers (which should not happen).")),l.a.createElement(u.a,null,"All of the other components provided by"," ",l.a.createElement(c.b,null,"@curi/react-native")," must be descendants of the component created by ",l.a.createElement(c.b,null,"curiProvider()"),".")),l.a.createElement(m.a,{lang:"jsx"},"import { curiProvider } from '@curi/react-native';\n\nconst router = curi(history, routes);\nconst Router = curiProvider(router);\n\nconst App = () => (\n  <Router>\n    {({ response, navigation, router }) => {\n      const { body:Body } = response;\n      return <Body response={response} />;\n    }}\n  </Router>\n);"),l.a.createElement(s.a,{tag:"h3",title:"Arguments",id:"curiProvider-arguments"},l.a.createElement(s.b,{tag:"h4",title:"router",id:"curiProvider-router"},l.a.createElement(m.b,null,l.a.createElement("p",null,"A Curi router.")),l.a.createElement(m.a,null,'import { curiProvider } from "@curi/react-native";\n\nconst router = curi(history, routes);\nconst Router = curiProvider(router);'))),l.a.createElement(s.a,{tag:"h3",title:"Props",id:"curiProvider-props"},l.a.createElement(s.b,{tag:"h4",title:"children",id:"curiProvider-render"},l.a.createElement(m.b,null,l.a.createElement("p",null,l.a.createElement(c.b,null,"children")," is a render-invoked function. When it is called, it will be passed an object with three properties:"),l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"property"),l.a.createElement("th",null,"description"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"response"),l.a.createElement("td",null,"the response object generated for the current location")),l.a.createElement("tr",null,l.a.createElement("td",null,"navigation"),l.a.createElement("td",null,"the ",l.a.createElement(c.b,null,"action")," of the navigation and the"," ",l.a.createElement(c.b,null,"previous")," response object")),l.a.createElement("tr",null,l.a.createElement("td",null,"router"),l.a.createElement("td",null,"the Curi router")))))))),l.a.createElement(s.a,{title:l.a.createElement(c.a,null,"Link"),id:"Link"},l.a.createElement(m.b,null,l.a.createElement("p",null,"A ",l.a.createElement(c.a,null,"Link")," is used for navigating within your application. By default, this will render a"," ",l.a.createElement(c.a,null,"TouchableHighlight"),", but you can also provide another component. When the rendered element is touched, it will use the router's ",l.a.createElement(c.b,null,"history")," object to change locations, which will trigger a re-render."),l.a.createElement("p",null,"With the ",l.a.createElement(c.a,null,"Link"),", instead of providing a URI to navigate to, you specify the name of the route that you want to link to. Then, the pathname of the URI you want the component to link to will be automatically generated for you.")),l.a.createElement(m.a,{lang:"jsx"},"import { Link } from '@curi/react-native';\n          \n<Link to='User' params={{ id: 16 }}>\n  <Text>User 16</Text>\n</Link>\n// <TouchableHighlight>\n//   <Text>User 16</Text>\n// </TouchableHighlight>"),l.a.createElement(s.a,{tag:"h3",title:"Props",id:"Link-props"},l.a.createElement(s.b,{tag:"h4",title:"to",id:"Link-to"},l.a.createElement(m.b,null,l.a.createElement("p",null,"The name of the route that you want to navigate to."),l.a.createElement("p",null,"If ",l.a.createElement(c.b,null,"to")," is not provided, the ",l.a.createElement(c.a,null,"Link")," will re-use the current location's ",l.a.createElement(c.b,null,"pathname"),". This is useful for linking to hashes within the current page.")),l.a.createElement(m.a,{lang:"jsx"},'// Home route is { name: "Home", path: "" }\n<Link to="Home">Home</Link>')),l.a.createElement(s.b,{tag:"h4",title:"params",id:"Link-params"},l.a.createElement(m.b,null,l.a.createElement("p",null,"If the route that you want to navigate to (or any of its parents) include path parameters, you can specify them using the params prop.")),l.a.createElement(m.a,{lang:"jsx"},"// User route is { name: 'User', path: '/user/:id' }\n<Link to='User' params={{ id: 16 }}>User 16</Link>")),l.a.createElement(s.b,{tag:"h4",title:"hash, query & state",id:"Link-hash-query-state"},l.a.createElement(m.b,null,l.a.createElement("p",null,"While the pathname of the location to navigate to will be generated for you, this does not cover over location properties (query, hash, and state). The ",l.a.createElement(c.b,null,"query"),","," ",l.a.createElement(c.b,null,"hash"),", and ",l.a.createElement(c.b,null,"state")," props are used to pass these values.")),l.a.createElement(m.a,{lang:"jsx"},'<Link\n  to=\'Products\'\n  params={{ type: \'vacuums\' }}\n  hash="iroomba"\n  query="volume=loud"\n  state={{ owner: "Tom Haverford" }}\n>\n  DJ Roomba\n</Link>')),l.a.createElement(s.b,{tag:"h4",title:"children",id:"Link-children"},l.a.createElement(m.b,null,l.a.createElement("p",null,"The ",l.a.createElement(c.b,null,"children")," prop can take two forms: either a valid React Node (e.g. a React element, a string, or"," ",l.a.createElement(c.b,null,"null"),") or a render-invoked ",l.a.createElement(c.b,null,"children")," ","function."),l.a.createElement("p",null,"The render-invoked ",l.a.createElement(c.b,null,"children")," function will be called with the ",l.a.createElement(c.a,null,"Link"),"'s navigation state. The navigation state is ",l.a.createElement(c.b,null,"false")," to start,"," ",l.a.createElement(c.b,null,"true")," when the ",l.a.createElement(c.a,null,"Link")," is clicked, and"," ",l.a.createElement(c.b,null,"false")," when the the navigation finishes/is cancelled.")),l.a.createElement(m.a,{lang:"jsx"},'// a React node\n<Link to="Home">\n  <Text>Home</Text>\n</Link>\n\n// a render-invoked function\n<Link to="User" params={{ id: 1 }}>\n  {navigating => (\n    <React.Fragment>\n      <Text>User 1</Text>\n      {navigating ? <Spinner /> : null}\n    </React.Fragment>\n  )}\n</Link>')),l.a.createElement(s.b,{tag:"h4",title:"anchor",id:"Link-anchor"},l.a.createElement(m.b,null,l.a.createElement("p",null,"By default, when you render a ",l.a.createElement(c.a,null,"Link"),", a"," ",l.a.createElement(c.a,null,"TouchableHighlight")," element will be rendered (",l.a.createElement(c.b,null,"React.createElement(TouchableHighlight, ...)"),"). ",l.a.createElement(c.b,null,"anchor")," lets you provide your own component to be rendered instead.")),l.a.createElement(m.a,{lang:"jsx"},"<Link\n  to='User'\n  params={{ id: 16 }}\n  anchor={TouchableOpacity}\n>\n  <Text>User 16</Text>\n</Link>\n// <TouchableOpacity>\n//   <Text>User 16</Text>\n// </TouchableOpacity>")))),l.a.createElement(s.a,{title:l.a.createElement(c.a,null,"Curious"),id:"Curious"},l.a.createElement(m.b,null,l.a.createElement("p",null,"A context consumer component for injecting router values into components.")),l.a.createElement(m.a,{lang:"jsx"},"import { Curious } from '@curi/react-native';\n\nconst  MyComponent = () => (\n  <Curious>\n    {({ router, response, navigation }) => {\n      // pass these props to any components that need them\n      return (\n        <ThingThatNeedsResponse response={response} />\n      );\n    }}\n  </Curious>\n);"),l.a.createElement(s.a,{tag:"h3",title:"Props",id:"curious-props"},l.a.createElement(s.b,{tag:"h4",title:"children",id:"curious-children"},l.a.createElement(m.b,null,l.a.createElement("p",null,"A render-invoked function that returns a React element. This function will receive an object with ",l.a.createElement(c.b,null,"router"),","," ",l.a.createElement(c.b,null,"response")," and ",l.a.createElement(c.b,null,"navigation")," properties."))))),l.a.createElement(s.a,{title:l.a.createElement(c.a,null,"Active"),id:"Active"},l.a.createElement(m.b,null,l.a.createElement("p",null,"The ",l.a.createElement(c.a,null,"Active"),' component is used to render based on whether or not a route is "active" (its name and params match the current response\'s name and params) using a render-invoked'," ",l.a.createElement(c.b,null,"children")," function.")),l.a.createElement(m.a,{lang:"jsx"},'import { Active } from \'@curi/react-native\';\n\nconst ActiveLink = ({ to, params, partial, ...rest}) => (\n  <Active name={to} params={params} partial={partial}>\n    {active => (\n      <Link\n        to={to}\n        params={params}\n        {...rest}\n        className={active ? "active" : ""}\n      />\n    )}\n  </Active>\n);\n\n<ActiveLink to="Home">Home</ActiveLink>'),l.a.createElement(u.a,null,l.a.createElement(m.b,null,l.a.createElement("p",null,"This relies on the active route interaction from"," ",l.a.createElement(r.b,{to:"Package",params:{package:"route-active"}},"@curi/route-active")," ","being added to your router.")),l.a.createElement(m.a,null,"import active from '@curi/route-active';\n\nconst router = curi(history, routes, {\n  route: [active()]\n});")),l.a.createElement(s.a,{tag:"h3",title:"Props",id:"Active-props"},l.a.createElement(s.b,{tag:"h4",title:"name",id:"Active-name"},l.a.createElement(m.b,null,l.a.createElement("p",null,"The name of the route to compare against the response object."))),l.a.createElement(s.b,{tag:"h4",title:"params",id:"Active-params"},l.a.createElement(m.b,null,l.a.createElement("p",null,"An object containing route parameters. These will be compared against the route params of the response object."))),l.a.createElement(s.b,{tag:"h4",title:"children",id:"Active-children"},l.a.createElement(m.b,null,l.a.createElement("p",null,"A render-invoked function whose first argument is whether the route (determined using the ",l.a.createElement(c.b,null,"name")," and"," ",l.a.createElement(c.b,null,"params"),") is active.")),l.a.createElement(m.a,{lang:"jsx"},'// response = { name: "Photo", params: { id: "abcde" }}\n\n<Active name="Photo" params={{ id: "abcde" }}>\n  {active => ( // if active === true\n    <Photo className={active ? "active" : "inactive"} />\n  )}\n</Active>\n// <Photo className="active" />\n\n<Active name="Photo" params={{ id: "qwerty" }}>\n  {active => ( // if active === false\n    <Photo className={active ? "active" : "inactive"} />\n  )}\n</Active>\n// <Photo className="inactive" />'),l.a.createElement(m.b,null,l.a.createElement("p",null,"The second argument passed to the render-invoked function is the current ",l.a.createElement(c.b,null,"response"),". ",l.a.createElement(c.a,null,"Active")," only checks if the route is active (i.e. matches the current location's ",l.a.createElement(c.b,null,"pathname"),"). If you want to check if the"," ",l.a.createElement(c.b,null,"query")," or ",l.a.createElement(c.b,null,"hash"),", you should do this yourself inside of the render-invoked function. You can compare the ",l.a.createElement(c.b,null,"query"),"/",l.a.createElement(c.b,null,"hash")," against the response's ",l.a.createElement(c.b,null,"location"),".")),l.a.createElement(m.a,{lang:"jsx"},'<Active name="Home">\n  {(active, response) => {\n    const activeHash = response.hash === "ahoy"\n    // ...\n  }}\n</Active>')),l.a.createElement(s.b,{tag:"h4",title:"partial",id:"Active-partial"},l.a.createElement(m.b,null,l.a.createElement("p",null,"When ",l.a.createElement(c.b,null,"true"),", ",l.a.createElement(c.b,null,"partial")," allows ancestor routes to be considered active. Defaults to ",l.a.createElement(c.b,null,"false"),".")),l.a.createElement(m.a,{lang:"jsx"},'// response = { name: "Photo", params: { id: "abcde" }}\n// where "Photo" is a child route of "Album"\n\n<Active name="Album">\n  {active => ( // if active === false\n    <Album className={active ? "active" : "inactive"} />\n  )}\n</Active>\n// <Album className="inactive" />\n\n<Active name="Album" partial={true}>\n  {active => ( // if active === true\n    <Album className={active ? "active" : "inactive"} />\n  )}\n</Active>\n// <Album className="active" />')))),l.a.createElement(s.a,{title:l.a.createElement(c.a,null,"Block"),id:"Block"},l.a.createElement(m.b,null,l.a.createElement("p",null,"The ",l.a.createElement(c.a,null,"Block")," component lets you prevent navigation until a user has confirmed that they want to navigate. This can be useful when the user attempts to navigate away from a partially filled form.")),l.a.createElement(m.a,null,"import { Block } from '@curi/react-native';"),l.a.createElement(s.a,{tag:"h3",title:"Props",id:"Block-props"},l.a.createElement(s.b,{tag:"h4",title:"active",id:"Block-active"},l.a.createElement(m.b,null,l.a.createElement("p",null,"A boolean, which is ",l.a.createElement(c.b,null,"true")," by default. When it is"," ",l.a.createElement(c.b,null,"true"),", the navigation will be blocked. When it is"," ",l.a.createElement(c.b,null,"false"),", navigation will not be blocked.")),l.a.createElement(m.a,{lang:"jsx"},"// will block navigation\n<Block active={true} confirm={confirm} />\n\n// will not block navigation\n<Block active={false} confirm={confirm} />")),l.a.createElement(s.b,{tag:"h4",title:"confirm",id:"Block-confirm"},l.a.createElement(m.b,null,l.a.createElement("p",null,"The confirm prop is a function that will be called whenever there is navigation."),l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"argument"),l.a.createElement("th",null,"description"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"location"),l.a.createElement("td",null,"the location that is being navigated to")),l.a.createElement("tr",null,l.a.createElement("td",null,"action"),l.a.createElement("td",null,"the type of navigation")),l.a.createElement("tr",null,l.a.createElement("td",null,"success"),l.a.createElement("td",null,"a function to call when navigation should happen")),l.a.createElement("tr",null,l.a.createElement("td",null,"failure"),l.a.createElement("td",null,"a function to call when navigation should be cancelled."))))),l.a.createElement(m.a,{lang:"jsx"},'<Block\n  confirm={({ location, action }, success, failure) => {\n    const response = window.confirm("Shall we?");\n    if (response) {\n      success();\n    } else {\n      failure();\n    }\n  }}\n/>'))))))}}]),t}()}}]);