# be-elevating [WIP]

Elevate local property value to host or upstream peer element when user initiates event.

## Example 1a 

```html
<host-element>
    #shadow
        <input disabled be-elevating='to host prop.'>
</host-element>
```

What this does:

It passes the value of the input element to the host element's hostProp property any time (and only when) the input element's "input" event fires.

which is shorthand for: [TODO]

```html
<host-element>
    #shadow
        <input be-elevating='of value to host prop on input.'>
</host-element>
```

## Example 1b

```html
<host-element>
    #shadow
        <input 
            data-test='this text should appear on input.' disabled 
            be-elevating='of dataset:test to some string prop.'
        >
</host-element>
```

## Example 1c

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
