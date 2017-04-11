# curi

`curi` is a simple route configuration package for creating single page apps. Navigation is powered by [`history`](https://github.com/ReactTraining/history).

### Routes

Each route is described using an object. Each route **must** have a unique `name` and `path`.

A route's `name` must be unique because it is used to register the route for different functionality. For example, link pathnames are generated by specifying the name of the route you want to navigate to.

A route's `path` property is an object created using the `path` function exported by `curi`. Internally, the `path` function uses [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) to parse the string (using the provided options) and create a regular expression that can be used for matching locations.

There are a number of other route properties, which are described in more detail in the [route documentation](./docs/route.md)

### Configs

A configuration object is created using the `history` instance and the routes. You can learn more about it in the [`createConfig` documentation](./docs/creatConfig.md).

```js
import { createConfig, path } from 'curi';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const routes = [...];
const config = createConfig(history, routes)
```