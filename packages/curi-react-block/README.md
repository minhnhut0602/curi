# curi-react-block

## Installation

```js
npm install --save curi-react-block
```

## `<Block>`

Render a `<Block>` component when you want to have a user confirm navigation.

When navigation occurs (and the `when` prop is `true`), your `history` object's `getUserConfirmation` function will be called (this is just `window.prompt` by default). The `history` instance will use the result of the `getUserConfirmation` function to determine if the navigation should occur.

**Note:** Navigation done using the browser's forward/back buttons is not caught until _after_ the navigation occurs. This means that the URI in the address bar will be the next location, but if the user cancels navigation, the URI will revert to the current location.

```js
<Block message='Are you sure you want to leave?' />
```

### props

#### `when`

A boolean, which is `true` by default. When it is `true`, the navigation block is active. When `when` is `false`, navigation will not be blocked.

#### `message`

This is either a string or a function that returns a string.

When it is a string, the string will be the message passed to the `getUserConfirmation` function.

```js
<Block message='Shall we?' />
```

When it is a function, the function will be passed the new `location` object and the `action` string (`POP`, `PUSH`, `REPLACE`). These values can be used to help generate the confirmation message.

```js
<Block message={(location, action) => {
  return `Are you sure you want to go to ${location.pathname}?`;
}} />
```