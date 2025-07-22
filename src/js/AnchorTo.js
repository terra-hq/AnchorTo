/**
 * AnchorTo Class
 *
 * The `AnchorTo` class enables smooth scrolling from a trigger element to a target destination within a webpage.
 * It offers customizable settings such as scroll speed, offset, URL updates, emits custom events during the scroll process,
 * and provides debugging information when enabled.
 *
 * @example
 * // Usage Example:
 * const anchor = new AnchorTo({
 *     trigger: document.querySelector('.my-button'),
 *     destination: document.querySelector('#section4'),
 *     offset: 50,
 *     url: 'hash',
 *     speed: 500,
 *     emitEvents: true,
 *     popstate: true,
 *     debug: true,
 *     onComplete: () => console.log('Scroll complete!')
 * });
 *
 * @param {Object} options - Configuration options for AnchorTo.
 * @param {HTMLElement} options.trigger - The element that triggers the scroll when clicked.
 * @param {HTMLElement} options.destination - The target element to scroll to.
 * @param {number|function} [options.offset=0] - The distance in pixels from the target destination or a function returning a number.
 *                                               If a function is provided, it receives `element` (destination) and `toggle` (trigger) as parameters.
 * @param {string} [options.url='hash'] - Determines how the URL is updated during the scroll. Possible values:
 *                                        - 'hash': Adds the target `id` as a hash in the URL (e.g., `#section`).
 *                                        - 'query': Adds the target `id` as a query parameter in the URL (e.g., `?scrollto=section`).
 *                                        - 'none': Does not update the URL.
 * @param {number} [options.speed=1500] - The scroll speed in milliseconds.
 * @param {boolean} [options.emitEvents=true] - If `true`, emits custom events at the start and end of the scroll.
 *                                              Specifically, `AnchorToStart` is emitted when the scroll begins, and `AnchorToEnd` is emitted when the scroll completes.
 *                                              These events are dispatched from the `trigger` element, allowing other scripts or listeners
 *                                              to respond to the start and end of the scroll animation.
 * @param {boolean} [options.popstate=true] - If `true`, enables smooth scrolling when the browser's forward and back navigation buttons are used.
 * @param {boolean} [options.debug=false] - If `true`, outputs debug information to the console, including the initialized properties.
 * @param {function} [options.beforeScroll=null] - A callback function executed before the scroll animation starts.
 * @param {function} [options.onComplete=null] - A callback function executed after the scroll animation completes.
 * @param {function} [options.heightModifyingLibraries] - TERRA EXCLUSIVE - Used to manage libraries that modify page height
 * @param {function} [options.Manager] - TERRA EXCLUSIVE - Library Manager from the Terra Framework
 *
 * Methods:
 * - init(): Initializes the class and assigns necessary event listeners.
 * - events(): Adds event listeners for `click` on `trigger` and `popstate` on `window`.
 * - handleClick(event): Handles the `click` event to perform the scroll and update the URL.
 * - handlePopstate(): Handles the `popstate` event to scroll to the target based on the URL.
 * - scrollTo(element): Executes the scroll animation to the destination element. Public method for external use.
 * - ease(t, b, c, d): Easing function to smoothen the scroll animation.
 * - emitEvent(name): Emits a custom event on `trigger` at the beginning and end of the scroll.
 * - waitForHeightModifyingLibraries(): Returns a promise that checks if the libraries that modify page height are instanced yet.
 * - destroy(): Removes the `click` and `popstate` event listeners. Public method for external cleanup.
 */

class AnchorTo {
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
        onComplete = null, // New callback for scroll completion
        beforeScroll = null, // Callback to execute before scrolling
        heightModifyingLibraries = [],
        Manager = null,
    }) {
        this.DOM = {
            trigger: trigger,
            destination: destination,
        };
        this.offset = typeof offset === "function" ? offset : () => offset;
        this.url = url;
        this.speed = speed;
        this.emitEvents = emitEvents;
        this.popstate = popstate;
        this.debug = debug;
        this.onComplete = onComplete;
        this.beforeScroll = beforeScroll;
        this.destinationSelector = destinationSelector;
        this.heightModifyingLibraries = heightModifyingLibraries;
        this.Manager = Manager;

        // Initialization
        this.init();
        this.events();

        // Debugging information if debug is true
        if (this.debug) {
            console.log("AnchorTo Initialized:", {
                trigger: this.DOM.trigger,
                destination: this.DOM.destination,
                offset: this.offset(this.DOM.destination, this.DOM.trigger),
                url: this.url,
                speed: this.speed,
                emitEvents: this.emitEvents,
                popstate: this.popstate,
            });
        }
    }

    init() {}

    events() {
        if (this.DOM.trigger) {
            if(this.DOM.trigger.tagName === 'SELECT') {
                this.DOM.trigger.addEventListener('change', (event) => this.handleSelectChange(event))
            } else {
                this.DOM.trigger.addEventListener("click", (event) => this.handleClick(event));
            }
        }

        if (this.popstate) {
            window.addEventListener("popstate", (event) => this.handlePopstate(event));
        }
    }


    async handleScroll() {
        if (typeof this.beforeScroll === "function") {

            // Wait for any async operation in beforeScroll to end
            await this.beforeScroll();

            // Wait for height-modifying libraries to be loaded
            await this.waitForHeightModifyingLibraries();

            // Re-query the destination element after libraries are loaded
            this.DOM.destination = document.getElementById(this.destinationSelector);
        }

        // Emit start event before scrolling
        if (this.emitEvents) {
            this.emitEvent("AnchorToStart");
        }

        // Now scroll to the updated destination
        this.scrollTo(this.DOM.destination);

        // Update URL after starting the scroll
        if (this.url !== "none") {
            const targetID = this.DOM.destination.id || "section";
            if (this.url === "hash") {
                history.pushState(null, null, `#${targetID}`);
            } else if (this.url === "query") {
                const params = new URLSearchParams(window.location.search);
                params.set("scrollto", targetID);
                history.pushState(null, null, `${window.location.pathname}?${params}`);
            }
        }
    }

    async handleClick(event) {
        event.preventDefault();

        this.handleScroll();
    }

    async handleSelectChange(event) {
        const value = event.target.value;

        this.destinationSelector = value;
        this.DOM.destination = document.getElementById(this.destinationSelector);
        this.handleScroll();
    }

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

    scrollTo(element) {
        const startPosition = window.pageYOffset;
        const targetPosition =
            element.getBoundingClientRect().top + window.pageYOffset - this.offset(element, this.DOM.trigger);
        const distance = targetPosition - startPosition;
        const duration = this.speed;

        let startTime = null;

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.ease(timeElapsed, startPosition, distance, duration);

            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                if (this.emitEvents) {
                    this.emitEvent("AnchorToEnd");
                }
                // Execute the onComplete callback, if provided
                if (typeof this.onComplete === "function") {
                    this.onComplete();
                }
            }
        };

        requestAnimationFrame(animation);
    }

    /**
     * Waits for all height-modifying libraries to be loaded before proceeding with scroll
     * @returns {Promise} Promise that resolves when all libraries are loaded or timeout is reached
     */
    waitForHeightModifyingLibraries() {
        return new Promise((resolve) => {
            // If no height-modifying libraries are registered, resolve immediately
            if (this.heightModifyingLibraries.length === 0) {
                this.debug && console.log("No height-modifying libraries registered");
                resolve();
                return;
            }

            // If no Manager instance provided, resolve immediately
            if (!this.Manager) {
                this.debug && console.log("No Manager instance provided, proceeding with scroll");
                resolve();
                return;
            }

            let checkCount = 0;
            const maxChecks = 20; // Maximum 1 second wait (20 * 50ms)

            const checkLibrariesLoaded = () => {
                checkCount++;

                // Filter libraries that are actually loaded in Manager.libraries
                const availableLibraries = this.heightModifyingLibraries.filter(
                    (libName) => this.Manager.libraries[libName]
                );

                // If no libraries are available in Manager.libraries, resolve immediately
                if (availableLibraries.length === 0) {
                    this.debug &&
                        console.log(
                            "No height-modifying libraries available in Manager.libraries, proceeding with scroll"
                        );
                    resolve();
                    return;
                }

                // Check if all available height-modifying libraries have instances
                const allLoaded = availableLibraries.every(
                    (libName) => this.Manager.instances[libName] && this.Manager.instances[libName].length > 0
                );

                if (allLoaded) {
                    resolve();
                } else if (checkCount >= maxChecks) {
                    this.debug &&
                        console.warn("Timeout waiting for height-modifying libraries, proceeding with scroll");
                    resolve();
                } else {
                    // Check again after a short delay
                    setTimeout(checkLibrariesLoaded, 50);
                }
            };

            // Start checking for library completion
            setTimeout(checkLibrariesLoaded, 100);
        });
    }

    ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    emitEvent(name) {
        const event = new CustomEvent(name, { detail: { element: this.DOM.trigger } });
        this.DOM.trigger.dispatchEvent(event);
    }

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
