/**
 * @class AnchorTo
 * @description
 * A comprehensive smooth scrolling library that provides precise, jitter-free scrolling
 * with advanced features for handling dynamic content and layout changes.
 * 
 * Features:
 * - Smooth scroll animations with customizable easing
 * - Automatic micro-adjustments to compensate for browser rounding and layout shifts
 * - Post-scroll settlement adjustment for dynamic content that loads after scrolling
 * - URL management (hash or query parameter based)
 * - Support for browser back/forward navigation
 * - Integration with height-modifying libraries (lazy loading, accordions, etc.)
 * - Custom event emission for lifecycle hooks
 * - Support for both click triggers and select dropdowns
 * 
 * @example
 * // Basic usage
 * const anchor = new AnchorTo({
 *   trigger: document.querySelector('.scroll-btn'),
 *   destination: document.querySelector('#section-2'),
 *   offset: 100,
 *   speed: 1000
 * });
 * 
 * @example
 * // Advanced usage with dynamic offset and callbacks
 * const anchor = new AnchorTo({
 *   trigger: document.querySelector('.scroll-btn'),
 *   destination: document.querySelector('#section-2'),
 *   offset: (destination, trigger) => {
 *     const header = document.querySelector('header');
 *     return header.offsetHeight + 20;
 *   },
 *   speed: 1500,
 *   beforeScroll: async () => {
 *     console.log('Starting scroll...');
 *   },
 *   onComplete: () => {
 *     console.log('Scroll complete!');
 *   },
 *   emitEvents: true,
 *   microAdjust: true,
 *   postSettleAdjust: true
 * });
 */
class AnchorTo {
    /**
     * Creates an instance of AnchorTo
     * 
     * @constructor
     * @param {Object} config - Configuration object for the AnchorTo instance
     * 
     * @param {HTMLElement} config.trigger - The DOM element that triggers the scroll action (button, link, etc.)
     * @param {HTMLElement} config.destination - The target DOM element to scroll to
     * @param {string} [config.destinationSelector=""] - Alternative way to specify destination via ID selector
     * @param {number|function} [config.offset=0] - Distance in pixels from the target element. Can be a static number or a function that returns a number. Function receives (destination, trigger) as parameters
     * @param {string} [config.url="hash"] - URL update behavior: "hash" (updates hash), "query" (updates query param), or "none" (no URL update)
     * @param {number} [config.speed=1500] - Duration of the scroll animation in milliseconds
     * @param {boolean} [config.emitEvents=true] - Whether to emit custom events (AnchorToStart, AnchorToEnd)
     * @param {boolean} [config.popstate=true] - Enable browser back/forward navigation support
     * @param {boolean} [config.debug=false] - Enable debug logging to console
     * @param {function} [config.onComplete=null] - Callback function executed when scroll animation completes
     * @param {function} [config.beforeScroll=null] - Async callback function executed before scroll starts. Useful for starting loaders or preparing the UI
     * @param {Array<string>} [config.heightModifyingLibraries=[]] - Array of library names that modify page height (e.g., lazy loaders). Used with Manager for coordination
     * @param {Object} [config.Manager=null] - Reference to a library manager object that tracks loaded libraries. Used in combination with heightModifyingLibraries
     * 
     * @param {boolean} [config.microAdjust=true] - Enable micro-adjustment after main scroll to correct browser rounding errors and small layout shifts
     * @param {number} [config.microAdjustThreshold=6] - Minimum pixel difference to trigger a micro-adjustment
     * @param {number} [config.microAdjustDuration=150] - Duration of micro-adjustment animation in milliseconds
     * @param {boolean} [config.disableCssSmoothDuringScroll=true] - Temporarily disable CSS scroll-behavior:smooth during programmatic scroll to prevent interference
     * 
     * @param {boolean} [config.postSettleAdjust=true] - Enable post-scroll adjustment that monitors for layout changes after scroll completes (e.g., lazy-loaded images expanding)
     * @param {number} [config.postSettleMaxWait=1000] - Maximum time in milliseconds to wait for layout to settle
     * @param {number} [config.postSettleQuietWindow=150] - Time in milliseconds without layout changes to consider layout "settled"
     * @param {number} [config.postSettleInitialDelay=250] - Initial delay in milliseconds before starting to monitor for layout changes
     */
    constructor({
        trigger,
        destination,
        destinationSelector = "",
        offset = 0,
        url = "hash",
        speed = 1500,
        emitEvents = true,
        popstate = true,
        debug = false,
        onComplete = null,
        beforeScroll = null,
        heightModifyingLibraries = [],
        Manager = null,

        // New options (all backward compatible)
        microAdjust = true,
        microAdjustThreshold = 6,     // px
        microAdjustDuration = 150,    // ms
        disableCssSmoothDuringScroll = true,

        // Post-scroll layout settlement adjustment
        postSettleAdjust = true,
        postSettleMaxWait = 1000,     // ms: maximum time listening for changes
        postSettleQuietWindow = 150,  // ms: quiet time to consider layout stable
        postSettleInitialDelay = 250, // ms: small initial delay
    }) {
        /**
         * @type {Object}
         * @property {HTMLElement} trigger - The trigger element
         * @property {HTMLElement} destination - The destination element
         */
        this.DOM = { trigger, destination };
        
        /** @type {function} Function that returns the offset value */
        this.offset = typeof offset === "function" ? offset : () => offset;
        
        /** @type {string} URL update mode: "hash", "query", or "none" */
        this.url = url;
        
        /** @type {number} Scroll animation duration in milliseconds */
        this.speed = speed;
        
        /** @type {boolean} Whether to emit custom events */
        this.emitEvents = emitEvents;
        
        /** @type {boolean} Whether to handle popstate events */
        this.popstate = popstate;
        
        /** @type {boolean} Debug mode flag */
        this.debug = debug;
        
        /** @type {function|null} Callback executed after scroll completes */
        this.onComplete = onComplete;
        
        /** @type {function|null} Async callback executed before scroll starts */
        this.beforeScroll = beforeScroll;
        
        /** @type {string} ID selector for the destination element */
        this.destinationSelector = destinationSelector;
        
        /** @type {Array<string>} Names of libraries that modify page height */
        this.heightModifyingLibraries = heightModifyingLibraries;
        
        /** @type {Object|null} Reference to library manager */
        this.Manager = Manager;

        /** @type {boolean} Enable micro-adjustment feature */
        this.microAdjust = microAdjust;
        
        /** @type {number} Threshold in pixels for micro-adjustment */
        this.microAdjustThreshold = microAdjustThreshold;
        
        /** @type {number} Duration of micro-adjustment in milliseconds */
        this.microAdjustDuration = microAdjustDuration;
        
        /** @type {boolean} Whether to disable CSS smooth scroll during animation */
        this.disableCssSmoothDuringScroll = disableCssSmoothDuringScroll;

        /** @type {boolean} Enable post-scroll settlement adjustment */
        this.postSettleAdjust = postSettleAdjust;
        
        /** @type {number} Maximum wait time for layout settlement in milliseconds */
        this.postSettleMaxWait = postSettleMaxWait;
        
        /** @type {number} Quiet window duration to detect settlement in milliseconds */
        this.postSettleQuietWindow = postSettleQuietWindow;
        
        /** @type {number} Initial delay before monitoring layout changes in milliseconds */
        this.postSettleInitialDelay = postSettleInitialDelay;

        this.init();
        this.events();

        if (this.debug) {
            console.log("AnchorTo Initialized:", {
                trigger: this.DOM.trigger,
                destination: this.DOM.destination,
                offset: this.offset(this.DOM.destination, this.DOM.trigger),
                url: this.url,
                speed: this.speed,
                emitEvents: this.emitEvents,
                popstate: this.popstate,
                microAdjust: this.microAdjust,
                disableCssSmoothDuringScroll: this.disableCssSmoothDuringScroll,
                postSettleAdjust: this.postSettleAdjust,
            });
        }
    }

    /**
     * Initialize the AnchorTo instance
     * @private
     * @returns {void}
     */
    init() {}

    /**
     * Set up event listeners for triggers and browser navigation
     * Handles both standard click events and select dropdown changes
     * @private
     * @returns {void}
     */
    events() {
        if (this.DOM.trigger) {
            if (this.DOM.trigger.tagName === "SELECT") {
                this.DOM.trigger.addEventListener("change", (event) => this.handleSelectChange(event));
            } else {
                this.DOM.trigger.addEventListener("click", (event) => this.handleClick(event));
            }
        }

        if (this.popstate) {
            window.addEventListener("popstate", (event) => this.handlePopstate(event));
        }
    }

    /**
     * Core scroll handler that orchestrates the entire scroll process
     * 
     * Process flow:
     * 1. Execute beforeScroll callback (if provided)
     * 2. Wait for height-modifying libraries to load
     * 3. Re-query destination element (if using selector)
     * 4. Emit start event
     * 5. Perform scroll animation
     * 6. Update URL
     * 
     * @async
     * @private
     * @returns {Promise<void>}
     */
    async handleScroll() {
        // 1) beforeScroll callback (can start spinners, etc.)
        if (typeof this.beforeScroll === "function") {
            await this.beforeScroll();
        }

        // 2) Wait for height-modifying libraries (always wait, previously this could be skipped)
        await this.waitForHeightModifyingLibraries();

        // 3) Re-query destination if we have a selector (in case the DOM changed)
        if (this.destinationSelector) {
            this.DOM.destination = document.getElementById(this.destinationSelector);
        }

        // 4) Emit event and start scroll
        if (this.emitEvents) this.emitEvent("AnchorToStart");
        this.scrollTo(this.DOM.destination);

        // 5) Update URL
        if (this.url !== "none") {
            const targetID = this.DOM.destination?.id || "section";
            if (this.url === "hash") {
                history.pushState(null, null, `#${targetID}`);
            } else if (this.url === "query") {
                const params = new URLSearchParams(window.location.search);
                params.set("scrollto", targetID);
                history.pushState(null, null, `${window.location.pathname}?${params}`);
            }
        }
    }

    /**
     * Handle click events on trigger element
     * Prevents default behavior and initiates scroll
     * 
     * @async
     * @param {Event} event - The click event object
     * @returns {Promise<void>}
     */
    async handleClick(event) {
        event.preventDefault();
        this.handleScroll();
    }

    /**
     * Handle change events on select dropdown triggers
     * Updates destination based on selected value and initiates scroll
     * 
     * @async
     * @param {Event} event - The change event object
     * @returns {Promise<void>}
     */
    async handleSelectChange(event) {
        const value = event.target.value;
        this.destinationSelector = value;
        this.DOM.destination = document.getElementById(this.destinationSelector);
        this.handleScroll();
    }

    /**
     * Handle browser popstate events (back/forward navigation)
     * Extracts destination from URL (hash or query param) and scrolls to it
     * 
     * @returns {void}
     */
    handlePopstate() {
        const destinationID =
            this.url === "query"
                ? new URLSearchParams(window.location.search).get("scrollto")
                : window.location.hash.substring(1);
        const destinationElement = document.getElementById(destinationID);
        if (destinationElement) {
            this.scrollTo(destinationElement);
        }
    }

    /**
     * Perform smooth scroll animation to target element
     * 
     * Features:
     * - Uses requestAnimationFrame for smooth 60fps animation
     * - Applies easing function for natural motion
     * - Optionally disables CSS scroll-behavior during animation
     * - Performs micro-adjustment after main animation
     * - Monitors for post-scroll layout changes
     * - Emits lifecycle events
     * 
     * @param {HTMLElement} element - The target element to scroll to
     * @returns {void}
     */
    scrollTo(element) {
        if (!element) return;

        const startPosition = window.pageYOffset;
        const targetPosition =
            element.getBoundingClientRect().top + window.pageYOffset - this.offset(element, this.DOM.trigger);
        const distance = targetPosition - startPosition;
        const duration = this.speed;
        let startTime = null;

        const restoreScrollBehavior = this.disableCssSmoothDuringScroll
            ? this._temporarilyDisableCssSmoothScroll()
            : () => {};

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Force exact final position
                window.scrollTo(0, targetPosition);

                // Immediate micro-adjustment for rounding/residual layout
                if (this.microAdjust) {
                    const currentY = window.pageYOffset;
                    const delta = targetPosition - currentY;
                    if (Math.abs(delta) > this.microAdjustThreshold) {
                        this._smoothMicroAdjust(targetPosition, this.microAdjustDuration);
                    }
                }

                if (this.emitEvents) this.emitEvent("AnchorToEnd");

                // Restore CSS scroll behavior
                restoreScrollBehavior();

                // User callback
                if (typeof this.onComplete === "function") this.onComplete();

                // NEW: Adjustment after layout settlement if height changed after animation
                if (this.postSettleAdjust && this.destinationSelector) {
                    this._postScrollSettleAdjust();
                }
            }
        };

        requestAnimationFrame(animation);
    }

    /**
     * Monitor and adjust scroll position after layout has settled
     * 
     * This method observes layout changes (via ResizeObserver) after the initial scroll
     * completes. It's essential for handling scenarios where content loads or expands
     * after scrolling (lazy images, dynamic content, etc.).
     * 
     * The process:
     * 1. Waits for an initial delay to let immediate changes happen
     * 2. Monitors document.body for size changes using ResizeObserver
     * 3. Tracks when the last change occurred
     * 4. Once layout is "quiet" for the specified window, recalculates target position
     * 5. Applies micro-adjustment if position has drifted
     * 
     * Stops monitoring when:
     * - Maximum wait time is exceeded
     * - Layout has been stable for the quiet window duration
     * 
     * @private
     * @returns {void}
     */
    _postScrollSettleAdjust() {
        const startTs = performance.now();
        let lastChangeTs = startTs;
        let ro;
        let timeoutId;

        const computeAndAdjust = () => {
            const el = document.getElementById(this.destinationSelector);
            if (!el) return;
            const desiredY =
                window.pageYOffset +
                el.getBoundingClientRect().top -
                this.offset(el, this.DOM.trigger);
            const delta = desiredY - window.pageYOffset;
            if (Math.abs(delta) > this.microAdjustThreshold) {
                this._smoothMicroAdjust(desiredY, this.microAdjustDuration);
            }
        };

        const stop = () => {
            if (ro) ro.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };

        const maybeFinish = () => {
            const now = performance.now();
            const waitedTooLong = now - startTs >= this.postSettleMaxWait;
            const quietEnough = now - lastChangeTs >= this.postSettleQuietWindow;
            if (waitedTooLong || quietEnough) {
                stop();
                computeAndAdjust();
            } else {
                timeoutId = setTimeout(maybeFinish, this.postSettleQuietWindow / 2);
            }
        };

        // Small initial delay
        setTimeout(() => {
            if ("ResizeObserver" in window) {
                ro = new ResizeObserver(() => {
                    lastChangeTs = performance.now();
                });
                ro.observe(document.body);
            } else {
                // Simple fallback: mark "change" periodically to extend the window
                const tick = () => {
                    lastChangeTs = performance.now();
                    if (performance.now() - startTs < this.postSettleMaxWait) {
                        setTimeout(tick, 100);
                    }
                };
                tick();
            }
            maybeFinish();
        }, this.postSettleInitialDelay);
    }

    /**
     * Wait for specified height-modifying libraries to load and initialize
     * 
     * This ensures that libraries that affect page layout (like lazy loaders,
     * accordions, or dynamic content loaders) are ready before scrolling begins,
     * preventing incorrect scroll position calculations.
     * 
     * @async
     * @returns {Promise<void>} Resolves when all specified libraries are loaded or timeout occurs
     */
    waitForHeightModifyingLibraries() {
        return new Promise((resolve) => {
            if (this.heightModifyingLibraries.length === 0 || !this.Manager) {
                resolve();
                return;
            }

            let checkCount = 0;
            const maxChecks = 20; // 1s (20 * 50ms)

            const checkLibrariesLoaded = () => {
                checkCount++;
                const available = this.heightModifyingLibraries.filter(
                    (libName) => this.Manager.libraries[libName]
                );
                if (available.length === 0) {
                    resolve();
                    return;
                }

                const allLoaded = available.every(
                    (libName) => this.Manager.instances[libName] && this.Manager.instances[libName].length > 0
                );

                if (allLoaded) {
                    resolve();
                } else if (checkCount >= maxChecks) {
                    resolve();
                } else {
                    setTimeout(checkLibrariesLoaded, 50);
                }
            };

            setTimeout(checkLibrariesLoaded, 100);
        });
    }

    /**
     * Easing function for smooth scroll animation
     * Uses ease-in-out quad easing for natural-feeling motion
     * 
     * @param {number} t - Current time/elapsed time
     * @param {number} b - Beginning value
     * @param {number} c - Change in value (distance)
     * @param {number} d - Duration
     * @returns {number} Calculated position at time t
     */
    ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    /**
     * Emit a custom event from the trigger element
     * 
     * @param {string} name - The name of the event to emit (e.g., "AnchorToStart", "AnchorToEnd")
     * @returns {void}
     */
    emitEvent(name) {
        const event = new CustomEvent(name, { detail: { element: this.DOM.trigger } });
        this.DOM.trigger.dispatchEvent(event);
    }

    /**
     * Perform a smooth micro-adjustment to correct small scroll position errors
     * 
     * Used to fix:
     * - Browser sub-pixel rounding errors
     * - Small layout shifts after main scroll animation
     * - Position drift due to lazy-loaded content
     * 
     * @private
     * @param {number} targetY - Target scroll position in pixels
     * @param {number} [duration=150] - Animation duration in milliseconds
     * @returns {void}
     */
    _smoothMicroAdjust(targetY, duration = 150) {
        const doc = document.documentElement;
        const body = document.body;
        const maxY = Math.max(0, (doc.scrollHeight || body.scrollHeight) - window.innerHeight);
        const startY = window.pageYOffset;
        const clampedTarget = Math.min(maxY, Math.max(0, targetY));
        const distance = clampedTarget - startY;
        if (Math.abs(distance) < 1) return;

        let startTime = null;

        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        const step = (ts) => {
            if (startTime == null) startTime = ts;
            const elapsed = ts - startTime;
            const y = easeInOutQuad(elapsed, startY, distance, duration);
            window.scrollTo(0, y);
            if (elapsed < duration) {
                requestAnimationFrame(step);
            } else {
                window.scrollTo(0, clampedTarget);
            }
        };

        requestAnimationFrame(step);
    }

    /**
     * Temporarily disable CSS scroll-behavior: smooth
     * 
     * Prevents conflicts between CSS-based smooth scrolling and JavaScript-based
     * animations. Returns a function to restore the original behavior.
     * 
     * @private
     * @returns {function} Cleanup function that restores the original scroll-behavior
     */
    _temporarilyDisableCssSmoothScroll() {
        const html = document.documentElement;
        const prev = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        return () => {
            html.style.scrollBehavior = prev || "";
        };
    }

    /**
     * Clean up event listeners and destroy the instance
     * Call this when you no longer need the AnchorTo instance to prevent memory leaks
     * 
     * @public
     * @returns {void}
     */
    destroy() {
        if (this.DOM.trigger) {
            this.DOM.trigger.removeEventListener("click", (event) => this.handleClick(event));
        }
        if (this.popstate) {
            window.removeEventListener("popstate", (event) => this.handlePopstate(event));
        }
    }
}

export default AnchorTo;
