# react-keybinding-component
A React keybinding component, usable with es6, no mixin

### Description

react-keybinding-component is a component that will help you set up keybindings in your app. For the moment, only simple key events are supported (one key only, `keyup`, `keydown`). It's just a less dirty way of using key events instead of having care of them with `componentDidMount()` in multiple components.

### Examples

Import it in your project:
``` javascript
import KeyBinding from 'react-keybinding-component';
```

Get the eventKey keyCode and log it
``` JSX
<KeyBinding onKey={ (e) => { console.log(e.keyCode) } } />
```

Get the eventKey keyCode and log it on `keyUp` on the window element
``` JSX
<KeyBinding onKey={ (e) => { console.log(e.keyCode) } } type='keyup' target={ window } />
```

Have a look at options.

### Options

All properties except `onKey` are optional.

| Property                         | Description                                                                                                          | Default value |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------|
| `onKey` (required)               | the function executed after a key event                                                                              | n/a           |
| `type`                           | keyup or keydown                                                                                                     | `'keydown'`   |
| `target`                         | the element you want to attach the event to, it can be an **existing** DOM element or a CSS selector (in that case, you will need to add a `tabIndex='0'` to your element, otherwise the event won't be caught) | `document`    |
| `preventInputConflict`           | prevent onKey from firing if you have an onChange on an input, a textarea or a select                                | `false`       |
| `preventContentEditableConflict` | prevent onKey from firing if the user is editing the DOM via contenteditable="true", usually used by WYSIWYG editors | `false`       |
| `preventDefault`                 | prevent event default                                                                                                | `false`       |
| `preventPropagation`             | prevent event propagation                                                                                            | `false`       |
