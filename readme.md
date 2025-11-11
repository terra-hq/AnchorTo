# AnchorTo

A comprehensive smooth scrolling library that provides precise, jitter-free scrolling with advanced features for handling dynamic content and layout changes.

[![npm version](https://img.shields.io/npm/v/@terrahq/anchor-to.svg)](https://www.npmjs.com/package/@terrahq/anchor-to)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Smooth Scroll Animations** - Customizable easing and speed control
- 🔧 **Micro-Adjustments** - Automatic correction for browser rounding errors and layout shifts
- 📐 **Post-Scroll Settlement** - Monitors and adjusts for dynamic content loading after scroll
- 🔗 **URL Management** - Hash or query parameter based URL updates
- ⏮️ **Browser Navigation** - Full support for back/forward buttons
- 📚 **Library Integration** - Coordinates with height-modifying libraries (lazy loading, accordions, etc.)
- 🎪 **Event System** - Custom events for lifecycle hooks
- 🎛️ **Flexible Triggers** - Support for buttons, links, and select dropdowns
- 🚫 **CSS Conflict Prevention** - Automatically handles CSS scroll-behavior conflicts

## Installation

```bash
npm install @terrahq/anchor-to
```

## Quick Start

### Basic Usage

```javascript
import AnchorTo from "@terrahq/anchor-to";

const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#section-2"),
    offset: 100,
    speed: 1000
});
```

### Advanced Configuration

```javascript
import AnchorTo from "@terrahq/anchor-to";

const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#section-2"),
    
    // Dynamic offset based on header height
    offset: (destination, trigger) => {
        const header = document.querySelector("header");
        return header.offsetHeight + 20;
    },
    
    // Scroll speed
    speed: 1500,
    
    // Lifecycle callbacks
    beforeScroll: async () => {
        console.log("Starting scroll...");
        // Show loading spinner, etc.
    },
    onComplete: () => {
        console.log("Scroll complete!");
    },
    
    // URL management
    url: "hash", // or "query" or "none"
    
    // Enable advanced features
    emitEvents: true,
    microAdjust: true,
    postSettleAdjust: true,
    
    // Debug mode
    debug: false
});
```

## Configuration Options

### Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `trigger` | `HTMLElement` | - | **Required.** Element that triggers the scroll (button, link, etc.) |
| `destination` | `HTMLElement` | - | **Required.** Target element to scroll to |
| `destinationSelector` | `string` | `""` | Alternative way to specify destination via ID selector |
| `offset` | `number\|function` | `0` | Distance in pixels from target. Can be static number or function `(destination, trigger) => number` |
| `speed` | `number` | `1500` | Scroll animation duration in milliseconds |
| `url` | `string` | `"hash"` | URL update behavior: `"hash"`, `"query"`, or `"none"` |
| `emitEvents` | `boolean` | `true` | Emit custom `AnchorToStart` and `AnchorToEnd` events |
| `popstate` | `boolean` | `true` | Enable browser back/forward navigation support |
| `debug` | `boolean` | `false` | Enable console debug logging |

### Callbacks

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `beforeScroll` | `function` | `null` | Async callback executed before scroll starts. Useful for showing loaders |
| `onComplete` | `function` | `null` | Callback executed when scroll animation completes |

### Micro-Adjustment Options (v0.0.5+)

These options help correct small positioning errors caused by browser rounding and immediate layout changes:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `microAdjust` | `boolean` | `true` | Enable micro-adjustment after main scroll |
| `microAdjustThreshold` | `number` | `6` | Minimum pixel difference to trigger adjustment |
| `microAdjustDuration` | `number` | `150` | Micro-adjustment animation duration (ms) |
| `disableCssSmoothDuringScroll` | `boolean` | `true` | Temporarily disable CSS `scroll-behavior: smooth` during animation |

### Post-Scroll Settlement Options (v0.0.5+)

These options handle content that loads or expands after the initial scroll (lazy images, dynamic content, etc.):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `postSettleAdjust` | `boolean` | `true` | Monitor and adjust for layout changes after scroll |
| `postSettleMaxWait` | `number` | `1000` | Maximum time (ms) to wait for layout to settle |
| `postSettleQuietWindow` | `number` | `150` | Time (ms) without changes to consider layout "settled" |
| `postSettleInitialDelay` | `number` | `250` | Initial delay (ms) before monitoring layout changes |

### Library Integration (Terra Framework)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `heightModifyingLibraries` | `Array<string>` | `[]` | Names of libraries that modify page height |
| `Manager` | `Object` | `null` | Reference to Terra library manager |

## Usage Examples

### With Select Dropdown

```javascript
const selectAnchor = new AnchorTo({
    trigger: document.querySelector("select#section-selector"),
    destinationSelector: "", // Will be set by select value
    offset: 80,
    speed: 1000
});
```

The library automatically detects `<select>` elements and uses the `change` event instead of `click`.

### Dynamic Offset Function

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#content"),
    offset: (destination, trigger) => {
        // Calculate offset based on sticky header
        const header = document.querySelector(".sticky-header");
        const isMobile = window.innerWidth < 768;
        return header.offsetHeight + (isMobile ? 10 : 20);
    }
});
```

### With Event Listeners

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#section"),
    emitEvents: true
});

// Listen for scroll start
anchor.DOM.trigger.addEventListener("AnchorToStart", (event) => {
    console.log("Scroll started!", event.detail.element);
    document.body.classList.add("scrolling");
});

// Listen for scroll end
anchor.DOM.trigger.addEventListener("AnchorToEnd", (event) => {
    console.log("Scroll ended!", event.detail.element);
    document.body.classList.remove("scrolling");
});
```

### With Lazy Loading Integration

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#gallery"),
    offset: 100,
    speed: 1200,
    
    // Enable post-scroll adjustment for lazy-loaded images
    postSettleAdjust: true,
    postSettleMaxWait: 2000, // Wait up to 2 seconds
    postSettleQuietWindow: 200, // Consider settled after 200ms of no changes
    
    beforeScroll: async () => {
        // Pre-load images if needed
        console.log("Preparing to scroll...");
    }
});
```

### Query Parameter URL Mode

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#section-3"),
    url: "query" // Updates URL to ?scrollto=section-3
});
```

## Methods

### `scrollTo(element)`

Manually trigger a scroll to the specified element.

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#section")
});

// Manually trigger scroll to destination
anchor.scrollTo(anchor.DOM.destination);

// Scroll to a different element
anchor.scrollTo(document.querySelector("#other-section"));
```

### `destroy()`

Remove event listeners and clean up the instance. Call this when you no longer need the AnchorTo instance to prevent memory leaks.

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#section")
});

// Later, when no longer needed
anchor.destroy();
```

## Event Handlers

The library handles scroll events through three main handlers:

### `handleClick(event)`

Manages standard click events on trigger elements (buttons, links, etc.).

```javascript
// Automatically handles click events
const anchor = new AnchorTo({
    trigger: document.querySelector("a.scroll-link"),
    destination: document.querySelector("#target")
});
```

### `handleSelectChange(event)`

Manages `change` events on `<select>` elements, using the selected option value as the destination ID.

```javascript
const selectAnchor = new AnchorTo({
    trigger: document.querySelector("select"),
    destinationSelector: "" // Set by select value
});
```

### `handlePopstate(event)`

Manages browser back/forward navigation, extracting the destination from URL (hash or query parameter).

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".scroll-btn"),
    destination: document.querySelector("#section"),
    popstate: true, // Enable popstate handling
    url: "hash" // or "query"
});
```

## Custom Events

When `emitEvents` is enabled, AnchorTo dispatches custom events from the trigger element:

### `AnchorToStart`

Emitted when the scroll animation begins.

```javascript
trigger.addEventListener("AnchorToStart", (event) => {
    console.log("Scrolling started!", event.detail.element);
});
```

### `AnchorToEnd`

Emitted when the scroll animation completes.

```javascript
trigger.addEventListener("AnchorToEnd", (event) => {
    console.log("Scrolling ended!", event.detail.element);
});
```

## Advanced Features

### Micro-Adjustment System (v0.0.5+)

The micro-adjustment system corrects small positioning errors that occur due to:
- Browser sub-pixel rounding
- Layout shifts during animation
- CSS optimizations

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".btn"),
    destination: document.querySelector("#section"),
    microAdjust: true,
    microAdjustThreshold: 6, // Adjust if off by more than 6px
    microAdjustDuration: 150 // Smooth 150ms correction
});
```

### Post-Scroll Settlement (v0.0.5+)

Monitors layout changes after scrolling and automatically corrects position drift caused by:
- Lazy-loaded images expanding
- Dynamic content loading
- Third-party widgets initializing
- CSS animations completing

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".btn"),
    destination: document.querySelector("#section"),
    postSettleAdjust: true,
    postSettleMaxWait: 1000, // Monitor for up to 1 second
    postSettleQuietWindow: 150, // Settle after 150ms of stability
    postSettleInitialDelay: 250 // Wait 250ms before monitoring
});
```

The system uses `ResizeObserver` when available, with a fallback for older browsers.

### CSS Scroll Behavior Conflict Prevention

The library automatically disables CSS `scroll-behavior: smooth` during programmatic scrolling to prevent conflicts:

```javascript
const anchor = new AnchorTo({
    trigger: document.querySelector(".btn"),
    destination: document.querySelector("#section"),
    disableCssSmoothDuringScroll: true // Prevents CSS/JS scroll conflicts
});
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- `ResizeObserver` used when available (with fallback for older browsers)
- IE11 not supported (use polyfills if needed)

## Changelog

### Version 0.0.5 (Latest)

**New Features:**
- ✨ Added micro-adjustment system for precise scroll positioning
  - New `microAdjust` option (default: `true`)
  - New `microAdjustThreshold` option to control sensitivity
  - New `microAdjustDuration` option for smooth corrections
- ✨ Added post-scroll settlement adjustment for dynamic content
  - New `postSettleAdjust` option (default: `true`)
  - New `postSettleMaxWait` option to limit monitoring time
  - New `postSettleQuietWindow` option to detect stability
  - New `postSettleInitialDelay` option for timing control
  - Uses `ResizeObserver` API for efficient layout monitoring
- ✨ Added CSS scroll-behavior conflict prevention
  - New `disableCssSmoothDuringScroll` option (default: `true`)
  - Automatically manages CSS `scroll-behavior` during animations

**Improvements:**
- 📚 Comprehensive JSDoc documentation for all methods and parameters
- 🔧 Enhanced scroll precision to eliminate jitter in Chrome and other browsers
- 🎯 Better handling of lazy-loaded images and dynamic content
- ⚡ Optimized performance for smooth 60fps animations

**Bug Fixes:**
- 🐛 Fixed positioning errors caused by browser rounding
- 🐛 Fixed scroll drift when content loads after scrolling
- 🐛 Fixed conflicts with CSS smooth scroll behavior

### Version 0.0.4

- Initial stable release
- Core smooth scrolling functionality
- URL management (hash/query modes)
- Event system
- Browser navigation support

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/terra-hq/AnchorTo).
