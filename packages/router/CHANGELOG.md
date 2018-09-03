## Next

* Rename `router.replaceRoutes()` to `router.refresh()`. If called with no arguments, just re-emits a response.

## 1.0.0-beta.40

* Switch from `route.match` to `route.resolve`.

## 1.0.0-beta.39

* Fix for optional initial path segments.

## 1.0.0-beta.38

* Switch script builds from IIFE to UMD
* Updates exported types.
* Emit a new response after calling `replaceRoutes()`.

## 1.0.0-beta.37

* Default export is moved to the `curi` named export.
* Added `once` named export for match functions that should re-use their initial result.
* Added `pathname` named export to create a `pathname` route interaction.
* Remove `on.initial` and `on.every`. Add `match` object for async functions. Keys are the values that are set on the `resolved` object passed to `response()`.

## 1.0.0-beta.36

* Warns when route `path`s begin with a forward slash.
* Side effects are now only called after observers registered with `router.respond()`. Instead of registering them with an object, only the side effect observer function is passed.

## 1.0.0-beta.35

* Add `cancelled` and `finished` properties to `router.navigate()`, which are functions to be called if the navigation is cancelled/when the navigation is finished.

## 1.0.0-beta.34

* Bug fix: actually pass arguments object to `on.initial()`.

## 1.0.0-beta.33

* Export `Resolved` type

## 1.0.0-beta.32

* Remove `response.key` (still available as `response.location.key`).
* Remove the `cache` option from the router.

## 1.0.0-beta.31

* Only routes with `on.initial()` or `on.every()` are async. A router with a mix of synchronous and asynchronous routes will match sync routes synchronously.
* Update to use Hickory's `history.navigate()` for navigation.
* Only the matched route properties (`name`, `params`, `partials`, `location`, and `key`) are guaranteed to exist on a response. The other properties only exist if provided on a `route.response()` return object.
* `on.initial()` receives full matched route properties object.
* `on.every()` receives full matched route properties object.
* remove `route` interactions from `route.response()`
* re-group `name`, `params`, and `location` with other matched route properties under `match` property passed to `route.response()`.

## 1.0.0-beta.30

* Side effect response handlers are registered with `effect` instead of `fn`.

## 1.0.0-beta.29

* `route.response()` returns object with properties to update and removes `set` from the properties passed to the function. `redirectTo` will auto-generate the location from the provided `name` and `params` while all of the other properties will be copied directly.
* Do no emit a response if no routes match. The user should add a catch-all route (`{ path: "(.*)" }`) to handle these themselves.
* Move `match.response` to top level and group `match.every` and `match.initial` under `on` object (`on.initial` and `on.every`).
* Group `initial` and `every` resolved values with `error` under `resolved` object.
* Rename `router.refresh` to `router.replaceRoutes`.

## 1.0.0-beta.28

* If no route has a `match.initial` or `match.every` function, the router will emit in synchronous mode. In synchronous mode, `router.respond` is not necessary for delaying the initial render.

## 1.0.0-beta.27

* Update `set.redirect` to take an options object.

## 1.0.0-beta.26

* Replace `once` option with `observe`, which is `false` by default (reverses previous default behavior).
* Pass an `Emitted` object to response handlers. This object has `response`, `navigation`, and `router` properties.

## 1.0.0-beta.25

* Add `initial` property to response handler options (default is `true`). When `false`, the response handler will not be called until a new response is emitted.

## 1.0.0-beta.24

* Response handlers are provided a `Navigation` object instead of an `Action` string. The `Navigation` contains properties related to a navigation but that aren't directly associated with the new `Response`. These are `action` (the navigation type) and `previous` (the previous `Response`).
* Expose the last generated `response` and `action` through `current` function.
* Add `options.emitRedirects` (default `true`). When `false`, a response with a `redirectTo` property will not be emitted to subscribers. Instead, the automatic redirect will occur and the result of that navigation will emitted.

## 1.0.0-beta.23

* Refer to Curi as a router, not just "config" (`CuriConfig` is now `CuriRouter`, etc.).

## 1.0.0-beta.22

* Pass the configuration option to response handlers.
* Removed source maps from `dist`
* Add `set.title`, remove `route.title`.

## 1.0.0-beta.21

* `match.response` instead of `match.finish`.

## 1.0.0-beta.20

* Added a `body` function to response modifiers, removed the `route.body` property. This change allows the user to just reference the resolved value instead of keeping a store.
* Change response modifiers property name to `set` and renamed response modifier functions: `setData` to `data`, `setStatus` to `status`, and `fail` to `error`
* Group route load functions under the `match` property. The old `preload` function is now `match.initial` (since it is run the initial time that route matches) and `load` is now a mix between `match.every` (since it is run every time that route matches) and `match.finish`.

## 1.0.0-beta.19

* Rename `config.subscribe` to `config.respond`. This is mostly an aesthetic change, but it also makes more sense to `respond` once (`config.respond(fn, { once: true })`) than it does to `subscribe` once. `Subscriber` and `UnsubscribeFn` types are now `ResponseHandler` and `RemoveResponseHandler`.

## 1.0.0-beta.18

* Call one time subscribers (`config.subscribe(fn, { once: true })`) **after** regular subscribers. This allows for subscribers to be setup prior to registering the one time function. This also means that a subscriber registered after the one time function will be called before it. This should be fine because one time functions essentially serve as a ready check. If a subscriber shouldn't be called before the one time function, it should be registered _in_ the one time function.

## 1.0.0-beta.17

* Make the second argument to `config.subscribe` an options object. There is now a `once` option. When `once` is `true`, the "subscriber" will only be called one time. Calling `config.subscribe` when `{ once: true }` will **not** return an unsubscribe function. The `initial` argument has been removed.

## 1.0.0-beta.16

* The type of the second argument to subscriber functions is now`Action` (instead of a `string`).
* When `route.load` or `route.preload` has an uncaught error, the error will be set as the response's `error` property. Previously, Curi wouldn't emit a response. The user should still make sure to catch errors themselves, but at least now it should be more obvious what is happening.
* ~~Add `initial` argument to `subscribe`. When `false` (default), the subscriber will not be called initially; when `true`, the subscriber will be immediately called. The default allows us to remove `ready` since the subscriber will not be called until a response has been resolved.~~
* Remove `ready` function.

## 1.0.0-beta.15

* Update to using Hickory's response handler model. Instead of subscribing to the history object, we pass it a response handler function which will be called whenever the location changes. This allows for better control of how navigation changes are emitted (the Curi router is now the only source of "truth"). Now, if a new navigation occurs while a previous navigation is still resolving, the previous navigation will be properly cancelled (it won't be added to the history array).

## 1.0.0-beta.14

* Route object returned by `createRoute` now has a `public` property, which contains the route properties that are available to addons.
* Only export a single `Response` type for TypeScript instead of `AnyResponse`, `Response`, and `RedirectResponse`.

## 1.0.0-beta.13

* Modify the `route.load` params. The new signature is `load(route, mods, addons)` where `route` contains `params`, `location`, and `name` properties.
* Remove `AddonFactory` type.

## 1.0.0-beta.12

* Routes can have a `params` object, which is an object whose keys are params (from the `path`) and whose values are functions that will parse the parsed value. This can be used if any of the parsed values should not be strings. Any params that are not included in the `params` object will be kept as strings. Likewise, any params whose parsing function throws an error will be kept as strings.

## 1.0.0-beta.11

* Pass addons to `createConfig` instead of addon factories. This allows addons to be configurable. The `options` passed to `createConfig` can now accept a `pathnameOptions` object. This can be used to change how the `pathname` addon encodes the generated pathname. If this is not provided, the default function (`encodeURIComponent`) will be used to encode pathnames. Addons now also expect a `reset` property, which is a function that should reset the addon to its initial state.

## 1.0.0-beta.10

* Export `PreloadFn` and `LoadFn` types.
* Automatically redirect after emitting response.

## 1.0.0-beta.9

* Fix `Params` type.

## 1.0.0-beta.8

* Undo the `route.redirect` in favor of keeping everything in `load`. However, `load` now receives a fourth argument: `addons`. `addons` can be used to use any of your addons, but for redirects `addons.pathname` is particularly useful.

## 1.0.0-beta.7

* Rework how redirect works. <del>Routes can now have a `redirect` function. This function should return an object with two properties: `to` which is the string/location object to redirect to and `status` (optional) which is the status code number for the redirect type. `redirect` has been removed from the `LoadModifiers` so that redirecting is only done with `route.redirect`.</del> When a `RedirectResponse` is created, Curi will automatically call `history.replace` with the string/location returned by calling `route.redirect`. Subscribers will still be called, so render functions should detect when the response has a `redirectTo` property and respond properly. Redirect responses now support the `body` property, so while a redirect render should be very short, you _can_ render a redirect.
* Rewrite `SideEffect` as an interface with two properties: `fn` which is a subscriber function and `after` which is a boolean. When `after` is `false`, the subscriber function will be run before any functions subscribed with `config.subscribe`. When `after` is `true`, the function will be called after any `config.subscribe` functions.

```js
createConfig(history, routes, {
  sideEffects: [
    // run before any subscribers
    { fn: PreSideEffect },
    // run after any subscribers
    { fn: PostSideEffect, after: true }
  ]
});
```

* Don't emit response when there is an error generating a response. The error will be logged (using `console.error`). It is up to the user to make sure that their `load`/`preload` functions catch any errors.
* Fix bug where route with no children and path option `end=false` would match non-exact paths.

## 1.0.0-beta.6

* Switch to TypeScript

## 1.0.0-beta.5

* Update to `path-to-regexp` v2. The changes can be seen [here](https://github.com/pillarjs/path-to-regexp/blob/master/History.md#200--2017-08-23). Most significantly, instead of using `*` as a wildcard, you now need to use `(.*)`.
* Pass the last `action` type as second argument to subscriber function calls. This makes it so that subscribers and side effects both receive the same arguments.

## 1.0.0-beta.4

* Pass the `location` object to `route.load` calls. This allows us to use the `query` and `hash` (or any other location properties) in our load function.

## 1.0.0-beta.3

* Switched to scoped package: `@curi/core`.

## 1.0.0-beta.1

* Getting close to where this should be ready for release, so switching to beta version.

## 0.11.0

* Drop `middleware`, add `sideEffects`. The main reason for middleware was because history doesn't
  support query parsing, but now that Curi uses Hickory, it is unnecessary. Most of the remaining use
  cases seemed to be side effects, so just making that explicit. If there is a need for modifying the response, then that can be looked at, but for the time being there doesn't appear to be a good reason to add this.

* Only pass a subset of the `ResponseCreator` methods to route `load` functions. These are the only ones that a developer should be using, so only pass these. The other ones could break the response, so don't give access to those.

## 0.10.1

* Add support for `route.title` (either a string or a function).

## 0.10.0

* Switch to the [`hickory`](https://github.com/pshrmn/hickory) package for history.
* Remove `path-to-regexp` from the ES/CommonJS builds.

## 0.9.0

* New build (uses Rollup to output a single file for each build type).

## 0.8.3

* Change `config.ready` function to always return the `Promise` that is generating (or generated) the most recent response.

## 0.8.2

* Updated to `history@4.6.2` (no more automatic `pathname` encoding).

## 0.8.1

* Fixed bug with setting `response.body` too early, which broke async body loading.
* Fixed bug with the cache returning a `ResponseCreator` and not a `response`.

## 0.8.0

* Drop the route's `value`/`call` properties in favor of just one: `body`. This **must** be a function (whose return value will be set as a response's `body` property).

## 0.7.5

* Fixed route matching for routes with children when no child routes match.

## 0.7.3

* The configuration object begins making a response object when its `setup` method is called.
* When a subscriber function subscribes, it is always called immediately. If the initial response object has not resolved, the subscriber function will be passed `undefined`.

## 0.7.1

* Renamed `Response` to `ResponseCreator` (makes it easier to differentiate it from response objects).
* Add `ResponseCreator.setData`, which will set the `data` property on the response object it creates.