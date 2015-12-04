# react-keybinding-component
A React keybinding component, usable with es6, no mixin

### Description

react-keybinding-component is a component that will help you set up keybindings in your app. For the moment, only simple key events are supported (one key only, `keyup`, `keydown`). It's just a less dirty way of using key events instead of having care of them with `componentDidMount()` in multiple components.

### Examples

Import it in your project:
``` javascript
import KeyBinding from 'react-keybinding-component'; // ES6
var KeyBinding = require('react-keybinding-component'); // ES5
```

Get the eventKey keyCode and log it
``` JSX
<KeyBinding onKey={ (e) => { console.log(e.keyCode) } } />
```

Get the eventKey keyCode and log it on `keyUp` on the window element
``` JSX
<KeyBinding onKey={ (e) => { console.log(e.keyCode) } } type='keyup' elem={ window } />
```

Have a look at options.

### Options

All properties are optional.

| Property           | Description                                 | Default value |
|--------------------|---------------------------------------------|---------------|
| onKey              | the function executed after a key event     | () => {}      |
| type               | keyup or keydown                            | `'keydown'`   |
| defaultValue       | the element you want to attach the event to | document      |
