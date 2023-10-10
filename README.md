# be-elevating [TODO]

## Example 1a [TODO]

```html
<host-element>
    #shadow
        <input be-elevating='to host prop.'>
</host-element>
```

which is shorthand for:

## Example 1b [TODO]

```html
<host-element>
    #shadow
        <input be-elevating='of value to / host prop on change event.'>
</host-element>
```

## Example 2

```html
<host-element>
    #shadow
        <peer-element -my-prop></peer-element>
        <input be-elevating='to -my-prop.'>
</host-element>
```
