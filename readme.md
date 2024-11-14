# Counter

`Counter` is a JavaScript class for animating a numeric counter that starts when scrolled into view. It uses GSAP and ScrollTrigger to animate a number from an initial to a final value with customizable options.

## Usage Example

```javascript
import Counter from '@terrahq/counter';

const counter = new Counter({
    element: document.querySelector(".counter-element"),
    endValue: 5000,               // The final value of the counter
    duration: 2,                  // Duration of the animation in seconds
    separator: ".",               // Thousands separator (optional)
    start: "top center",          // ScrollTrigger start position (optional)
    debug: true,                  // Display ScrollTrigger markers (optional, now called debug)
    easing: "power1.out",         // Easing of the animation (optional)
    autoPlay: true,               // Start animation on scroll (optional)
    playOnce: true,               // Run animation only once (optional)
    onComplete: () => console.log("Counter animation complete!") // Callback on animation complete
});

// Additional methods
counter.play();      // Start the animation manually
counter.update();    // Update the ScrollTrigger position
counter.destroy();   // Clean up the instance and stop animations
```


###  Constructor Parameters
- element (HTMLElement, required): The HTML element that will display the animated number.
- endValue (Number, optional): The end value for the counter animation. Default is 1000.
- duration (Number, optional): Duration of the animation in seconds. Default is 2.
- separator (String, optional): Thousands separator in the number animation. Default is ",".
- start (String, optional): ScrollTrigger start position. Default is "top top".
- debug (Boolean, optional): Show ScrollTrigger markers for debugging. Default is false.
- easing (String, optional): Type of GSAP easing for the animation. Default is "power1.out".
- autoPlay (Boolean, optional): If true, the animation starts on reaching the start ScrollTrigger point. Default is false.
- playOnce (Boolean, optional): If true, the animation runs only once. Default is false.
- onComplete (Function, optional): Callback function executed when the counter animation completes.

# Methods
- play(): Manually starts the counter animation.
- destroy(): Cleans up ScrollTrigger and stops the animation, freeing resources.
- update(): Updates the ScrollTrigger position by recalculating its starting point.

<br>
<br>
<br>

# Examples

## html
```html
<div class="counter counter-element">
    1
</div>
```
## Javascript
```js
const counter = new Counter({
    element: document.querySelector(".counter-element"),
    endValue: 5000,   // The final value of the counter
    duration: 2,      // Duration of the animation in seconds
    separator: ".",   // Thousands separator (optional)
    start: "top center",  // ScrollTrigger start position (optional)
    debug: true,   // Display ScrollTrigger markers (optional, now called debug)
    easing: "power1.out", // Easing of the animation (optional)
    autoPlay: true,  // Start animation on scroll (optional)
    playOnce: true,  // Run animation only once (optional)
    onComplete: () => console.log("Counter animation complete!") // Callback on animation complete
});
```
