# be-elevating [TODO]

Elevate local property value to host or upstream peer element when user initiates event.

## Example 1a [TODO]

```html
<host-element>
    #shadow
        <input disabled be-elevating='to host prop.'>
</host-element>
```

What this does:

It passes the value of the input element to the host element's hostProp property anytime (and only when) the input element's "input" event fires.

which is shorthand for:

## Example 1b [TODO]

```html
<host-element>
    #shadow
        <input be-elevating='of value to / host prop on change event.'>
</host-element>
```

Same thing is done for button element, which supports value attribute.

## Example 2 [TODO]

```html
<host-element>
    #shadow
        <peer-element -my-prop></peer-element>
        ...
        <input be-elevating='to -my-prop.'>
</host-element>
```
