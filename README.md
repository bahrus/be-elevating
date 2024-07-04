# be-elevating (🛗) [WIP]

Elevate local property value to host or upstream peer element when user initiates event.

[![NPM version](https://badge.fury.io/js/be-elevating.png)](http://badge.fury.io/js/be-elevating)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-elevating?style=for-the-badge)](https://bundlephobia.com/result?p=be-elevating)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-elevating?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-elevating/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-elevating/actions/workflows/CI.yml)

## Example 1a

```html
<mood-stone>
    #shadow
        <input disabled type=checkbox name=isHappy be-elevating>
</mood-stone>
```

What this does:

1.  After finishing attaching and hydrating, it removes the disabled attribute, so that no enabled clicks were missed.
2.  It passes the checked property value of the input element up to the *mood-stone*'s isHappy property any time (and only when) the input element's "input" event fires.

This is shorthand for:

## Example 1b

```html
<mood-stone>
    #shadow
        <input disabled type=checkbox be-elevating='to isHappy.'>
</mood-stone>
```

which is shorthand for: [TODO]

```html
<mood-stone>
    #shadow
        <input disabled type=checkbox be-elevating='of checked to isHappy on input.'>
</mood-stone>
```

Speaking of shorthand, the name "be-elevating" is a bit long for something that will likely be sprinkled throughout the HTML/template.

That is the canonical name.  The developer can, in less formal settings, especially where the be-elevating enhancement/behavior is widely used, define a "nickname" more to their own liking.  This package does in fact provide a sample of how that is done, aliasing be-elevating with the elevator emoji:  🛗.  That is what we will use in the following examples.  Please make the mental map from 🛗 to "be-elevating".

## Example 1c

```html
<mood-stone>
    #shadow
        <input disabled
            data-msg='Hello darkness my old friend'  
            🛗='of :dataset:msg to songLyricOfTheDay.'
        >
</mood-stone>
```

The default event, as before, is "input".  But we can specify any other event:

## Example 1d

```html
<mood-stone>
    #shadow
        <input disabled  
            🛗='to songLyricOfTheDay on change.'
        >
</mood-stone>
```

Since there is no "of" clause, it will by default elevate the "value" of the input element (since type isn't checkbox).

Same thing is done for button element, which also supports the value attribute/property:

## Example 1e [TODO]

```html
<mood-stone>
    #shadow
        <button disabled
            value='Hello darkness my old friend'  
            🛗='to songLyricOfTheDay.'
        >
</mood-stone>
```

The default event type for buttons is "click".

## Example 2a [TODO]

```html
<host-element>
    #shadow
        <my-peer-element -my-string-prop></my-peer-element>
        ...
        <input 🛗='to -my-string-prop.'>
</host-element>
```

This sets:

```JavaScript
oMyPeerElement.myStringProp = oInput.value
```

whenever the input element emits event "input".

## Example 2b [TODO]

```html
<host-element>
    #shadow
        <my-peer-element -my-string-prop></my-peer-element>
        ...
        <input 🛗='to -my-string-prop on change.'>
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


