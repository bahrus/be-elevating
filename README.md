# be-elevating

Elevate local property value to host or upstream peer element when user initiates event.

[![NPM version](https://badge.fury.io/js/be-elevating.png)](http://badge.fury.io/js/be-elevating)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-elevating?style=for-the-badge)](https://bundlephobia.com/result?p=be-elevating)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-elevating?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-elevating/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-elevating/actions/workflows/CI.yml)

## Example 1a

```html
<my-custom-element>
    #shadow
        <input disabed name=hostProp be-elevating>
</my-custom-element>
```

What this does:

It passes the value of the input element to the host element's hostProp property any time (and only when) the input element's "input" event fires.

This is shorthand for:

## Example 1b 

```html
<host-element>
    #shadow
        <input disabled be-elevating='to host prop.'>
</host-element>
```



which is shorthand for: [Untested]

```html
<host-element>
    #shadow
        <input be-elevating='of value to host prop on input.'>
</host-element>
```

## Example 1e

```html
<host-element>
    #shadow
        <input 
            data-test='this text should appear on input.' disabled 
            be-elevating='of dataset:test to some string prop.'
        >
</host-element>
```

## Example 1f

```html
<host-element>
    #shadow
        <input 
            data-test='this text should appear on input.' disabled 
            be-elevating='of dataset:test to some string prop on change.'
        >
</host-element>
```

Same thing is done for button element, which supports value attribute.

## Example 2a

```html
<host-element>
    #shadow
        <my-peer-element -my-string-prop></my-peer-element>
        ...
        <input be-elevating='to -my-string-prop.'>
</host-element>
```

This sets:

```JavaScript
oMyPeerElement.myStringProp = oInput.value
```

whenever the input element emits event "input".

## Example 2b

```html
<host-element>
    #shadow
        <my-peer-element -my-string-prop></my-peer-element>
        ...
        <input be-elevating='to -my-string-prop on change.'>
</host-element>
```

## Viewing Demos Locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/ in a modern browser.

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'be-elevating/be-elevating.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-elevating';
</script>
```


