# be-elevating (🛗) [WIP]

Elevate local property value to host or upstream peer element when user initiates event.

[![NPM version](https://badge.fury.io/js/be-elevating.png)](http://badge.fury.io/js/be-elevating)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-elevating?style=for-the-badge)](https://bundlephobia.com/result?p=be-elevating)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-elevating?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-elevating/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-elevating/actions/workflows/CI.yml)

# Part I - Elevating local values to the custom element host.

## Example 1a  - total mind reading

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

## Example 1b - specifying target property of host

```html
<mood-stone>
    #shadow
        <input disabled type=checkbox be-elevating='to isHappy.'>
</mood-stone>
```

The name "be-elevating" is a bit long for something that will likely be sprinkled throughout the HTML/template.

That is the canonical name.  The developer can, in less formal settings, especially where the be-elevating enhancement/behavior is widely used, define a "nickname" more to their own liking.  This package does in fact provide a sample of how that is done, aliasing be-elevating with the elevator emoji:  🛗.  That is what we will use in the following examples.  Please make the mental map from 🛗 to "be-elevating" in the examples that follow.

## Example 1c -- use of 🛗

```html
<mood-stone itemscope>
    <div itemprop=songLyricOfTheDay></div>
    <input  disabled 🛗="to songLyricOfTheDay">
    <xtal-element
        prop-defaults='{"songLyricOfTheDay": ""}'
        xform='{
            "| songLyricOfTheDay": 0
        }'
    ></xtal-element>
</mood-stone>
```

## Example 1d -- Passing local value

```html
<mood-stone itemscope>
    <div itemprop=songLyricOfTheDay></div>
    <button 
        value="Hello darkness my old friend"  
        disabled 🛗="to songLyricOfTheDay">
        Select Me
    </button>
    <xtal-element
        prop-defaults='{"songLyricOfTheDay": ""}'
        xform='{
            "| songLyricOfTheDay": 0
        }'
    ></xtal-element>
</mood-stone>
```

This passes the "value" property of the button to "songLyricOfTheDay" property of mood-stone.

## Example 1e - specifying local property to pass with nested path, and target property

```html
<mood-stone>
    #shadow
        <button disabled
            data-msg='Hello darkness my old friend'  
            🛗='?.dataset?.msg to songLyricOfTheDay.'
        >
</mood-stone>
```

## Example 1f -- specifying the event [TODO]

```html
<mood-stone>
    #shadow
        <button disabled
            data-msg='Hello darkness my old friend'  
            🛗='?.dataset?.msg to songLyricOfTheDay on mouseover.'
        >
</mood-stone>
```

Since there is no "of" clause, it will by default elevate the "value" of the input element (since type isn't checkbox).

Same thing is done for button element, which also supports the value attribute/property:


# Part II Passing to (upstream) peer elements.

*be-elevating* adopts the philosophy that a viable design pattern for a web component is one that is modeled after a "democratic organism" -- the web component host may only provide a thin "skin" layer that allows in a limited amount of stimuli from outside.

Within the web component sits one or more non visual "brain" web components that do the deep thinking.  The role of *be-elevating*, then, is to dispatch events from internal "organ" components "up" to the brain.  

Other enhancements, like [*be-observant*](https://github.com/bahrus/be-observant), [*be-calculating*](https://github.com/bahrus/be-calculating) focus on the other direction -- passing updates from the brain "down" to the visual components.  

The words "up" and "down" here are *likely*, but **not** *guaranteed*, to match the preferred markup layout/order of where the components are likely to sit on the page.

A more accurate way of thinking about "up" or "down" is that the "down" components are the ones closer to the user's finger tips / mouse pointers.  The "up components" are likely to be "closer" conceptually to the cloud from which data comes and goes.


## Example 2a Specify property to target via marker.

```html
<mood-stone>
    #shadow
        <soul-searcher -second-thoughts></soul-searcher>
        ...
        <input 🛗='to -second-thoughts.'>
</mood-stone>
```

This sets:

```JavaScript
oSoulSearcherElement.secondThoughts = oInput.value
```

whenever the input element emits event "input".

The search for an element with attribute is done via the nearest element adorned with the "itemscope" attribute.  If no such closest container is found, it searches within the root node.  If the web component is not using ShadowDOM, that can be quite dangerous, as the root node will actually be the top level document object of the page.

## Example 2b - Set initial value from server rendered content

If we want the (server-rendered) initial value of the input element to get passed straight-away to the *soul-searcher* element, we can do so:

```html
<mood-stone>
    #shadow
        <soul-searcher -second-thoughts></soul-searcher>
        ...
        <input 🛗='to -second-thoughts.' value="Did I vote for the right person?" 🛗-pass-srv>
</mood-stone>
```

"srv" stands for "server-rendered-value" (and also works with server-generated values).

## Example 2c

```html
<mood-stone>
    #shadow
        <soul-searcher -second-thoughts></soul-searcher>
        ...
        <input 🛗='to -second-thoughts on change.'>
</mood-stone>
```

## Example 2d

```html
<mood-stone>
    #shadow
        <soul-searcher></soul-searcher>
        ...
        <input 🛗='to ~soulSearcher:secondThoughts on change.'>
</mood-stone>
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


