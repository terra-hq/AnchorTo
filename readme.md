# AnchorTo Class

The `AnchorTo` class enables smooth scrolling between elements on a webpage. It provides options for configuring scroll speed, offset, URL updates, debugging, and custom event emissions. Ideal for Single Page Applications (SPAs) and sites requiring a smooth scrolling experience.

## Installation

```bash
npm install terrahq/anchor-to
```

## Usage Example

```javascript
import AnchorTo from 'terrahq/anchor-to';

const anchor = new AnchorTo({
    trigger: document.querySelector('.my-button'),      // The button that triggers scrolling
    destination: document.querySelector('#section4'),   // The target element to scroll to
    offset: 50,                                         // Offset in pixels or a function for dynamic offset
    url: 'hash',                                        // URL behavior: 'hash', 'query', or 'none'
    speed: 500,                                         // Scroll speed in milliseconds
    emitEvents: true,                                   // Emits start and end events for custom listeners
    popstate: true,                                     // Supports browser back/forward navigation
    debug: true,                                        // Enables console debug output
    onComplete: () => console.log('Scroll complete!')   // Callback executed after scroll ends
});
```


###  Options
- trigger `{HTMLElement}` - The element that triggers the scroll when clicked.
- destination `{HTMLElement}` - The target element to scroll to.
- offset `{number | function}` - Distance from the target. Can be a static number or a function that receives destination and trigger as parameters.
- url `{string}` - Determines URL behavior:
   - : Adds the destination's id as a hash in the URL.
  - 'query': Adds the destination's id as a query parameter.
  - 'none': No URL update.

- speed `{number}` - Duration of scroll animation in milliseconds (default is 1500).
- emitEvents `{boolean}` - Emits custom events anchorToStart and anchorToEnd during scroll.
- popstate `{boolean}` - Enables scroll behavior for back/forward navigation.
- debug `{boolean}` - If true, logs configuration and instance properties to the console.
- onComplete `{function}` - A callback function executed when the scroll animation completes.



# Methods

## scrollTo(element)
Triggers a scroll animation to the specified element.



```js
// Manually trigger the scroll to the destination element
anchor.scrollTo(anchor.DOM.destination);
```

## destroy
Removes event listeners on the trigger and window, cleaning up the instance.


```js
// Removes the click and popstate event listeners
anchor.destroy();
```

## emitEvents

With emitEvents enabled, AnchorTo dispatches custom events:

- AnchorToStart - Emitted when the scroll animation begins.
- AnchorToEnd - Emitted when the scroll animation completes.
- These events allow additional customization through external listeners.

```js
const anchor = new AnchorTo({
    trigger: document.querySelector('.my-button'),
    destination: document.querySelector('#section4'),
    emitEvents: true
});

anchor.DOM.trigger.addEventListener('AnchorToStart', (event) => {
    console.log('Scrolling has started!', event.detail.element);
});

anchor.DOM.trigger.addEventListener('AnchorToEnd', (event) => {
    console.log('Scrolling has ended!', event.detail.element);
});
```