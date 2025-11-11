class v {
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
    trigger: t,
    destination: e,
    destinationSelector: i = "",
    offset: o = 0,
    url: l = "hash",
    speed: h = 1500,
    emitEvents: n = !0,
    popstate: s = !0,
    debug: a = !1,
    onComplete: c = null,
    beforeScroll: u = null,
    heightModifyingLibraries: r = [],
    Manager: d = null,
    // New options (all backward compatible)
    microAdjust: m = !0,
    microAdjustThreshold: g = 6,
    // px
    microAdjustDuration: f = 150,
    // ms
    disableCssSmoothDuringScroll: p = !0,
    // Post-scroll layout settlement adjustment
    postSettleAdjust: w = !0,
    postSettleMaxWait: S = 1e3,
    // ms: maximum time listening for changes
    postSettleQuietWindow: M = 150,
    // ms: quiet time to consider layout stable
    postSettleInitialDelay: y = 250
    // ms: small initial delay
  }) {
    this.DOM = { trigger: t, destination: e }, this.offset = typeof o == "function" ? o : () => o, this.url = l, this.speed = h, this.emitEvents = n, this.popstate = s, this.debug = a, this.onComplete = c, this.beforeScroll = u, this.destinationSelector = i, this.heightModifyingLibraries = r, this.Manager = d, this.microAdjust = m, this.microAdjustThreshold = g, this.microAdjustDuration = f, this.disableCssSmoothDuringScroll = p, this.postSettleAdjust = w, this.postSettleMaxWait = S, this.postSettleQuietWindow = M, this.postSettleInitialDelay = y, this.init(), this.events(), this.debug && console.log("AnchorTo Initialized:", {
      trigger: this.DOM.trigger,
      destination: this.DOM.destination,
      offset: this.offset(this.DOM.destination, this.DOM.trigger),
      url: this.url,
      speed: this.speed,
      emitEvents: this.emitEvents,
      popstate: this.popstate,
      microAdjust: this.microAdjust,
      disableCssSmoothDuringScroll: this.disableCssSmoothDuringScroll,
      postSettleAdjust: this.postSettleAdjust
    });
  }
  /**
   * Initialize the AnchorTo instance
   * @private
   * @returns {void}
   */
  init() {
  }
  /**
   * Set up event listeners for triggers and browser navigation
   * Handles both standard click events and select dropdown changes
   * @private
   * @returns {void}
   */
  events() {
    this.DOM.trigger && (this.DOM.trigger.tagName === "SELECT" ? this.DOM.trigger.addEventListener("change", (t) => this.handleSelectChange(t)) : this.DOM.trigger.addEventListener("click", (t) => this.handleClick(t))), this.popstate && window.addEventListener("popstate", (t) => this.handlePopstate(t));
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
    var t;
    if (typeof this.beforeScroll == "function" && await this.beforeScroll(), await this.waitForHeightModifyingLibraries(), this.destinationSelector && (this.DOM.destination = document.getElementById(this.destinationSelector)), this.emitEvents && this.emitEvent("AnchorToStart"), this.scrollTo(this.DOM.destination), this.url !== "none") {
      const e = ((t = this.DOM.destination) == null ? void 0 : t.id) || "section";
      if (this.url === "hash")
        history.pushState(null, null, `#${e}`);
      else if (this.url === "query") {
        const i = new URLSearchParams(window.location.search);
        i.set("scrollto", e), history.pushState(null, null, `${window.location.pathname}?${i}`);
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
  async handleClick(t) {
    t.preventDefault(), this.handleScroll();
  }
  /**
   * Handle change events on select dropdown triggers
   * Updates destination based on selected value and initiates scroll
   * 
   * @async
   * @param {Event} event - The change event object
   * @returns {Promise<void>}
   */
  async handleSelectChange(t) {
    const e = t.target.value;
    this.destinationSelector = e, this.DOM.destination = document.getElementById(this.destinationSelector), this.handleScroll();
  }
  /**
   * Handle browser popstate events (back/forward navigation)
   * Extracts destination from URL (hash or query param) and scrolls to it
   * 
   * @returns {void}
   */
  handlePopstate() {
    const t = this.url === "query" ? new URLSearchParams(window.location.search).get("scrollto") : window.location.hash.substring(1), e = document.getElementById(t);
    e && this.scrollTo(e);
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
  scrollTo(t) {
    if (!t) return;
    const e = window.pageYOffset, i = t.getBoundingClientRect().top + window.pageYOffset - this.offset(t, this.DOM.trigger), o = i - e, l = this.speed;
    let h = null;
    const n = this.disableCssSmoothDuringScroll ? this._temporarilyDisableCssSmoothScroll() : () => {
    }, s = (a) => {
      h || (h = a);
      const c = a - h, u = this.ease(c, e, o, l);
      if (window.scrollTo(0, u), c < l)
        requestAnimationFrame(s);
      else {
        if (window.scrollTo(0, i), this.microAdjust) {
          const r = window.pageYOffset, d = i - r;
          Math.abs(d) > this.microAdjustThreshold && this._smoothMicroAdjust(i, this.microAdjustDuration);
        }
        this.emitEvents && this.emitEvent("AnchorToEnd"), n(), typeof this.onComplete == "function" && this.onComplete(), this.postSettleAdjust && this.destinationSelector && this._postScrollSettleAdjust();
      }
    };
    requestAnimationFrame(s);
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
    const t = performance.now();
    let e = t, i, o;
    const l = () => {
      const s = document.getElementById(this.destinationSelector);
      if (!s) return;
      const a = window.pageYOffset + s.getBoundingClientRect().top - this.offset(s, this.DOM.trigger), c = a - window.pageYOffset;
      Math.abs(c) > this.microAdjustThreshold && this._smoothMicroAdjust(a, this.microAdjustDuration);
    }, h = () => {
      i && i.disconnect(), o && clearTimeout(o);
    }, n = () => {
      const s = performance.now(), a = s - t >= this.postSettleMaxWait, c = s - e >= this.postSettleQuietWindow;
      a || c ? (h(), l()) : o = setTimeout(n, this.postSettleQuietWindow / 2);
    };
    setTimeout(() => {
      if ("ResizeObserver" in window)
        i = new ResizeObserver(() => {
          e = performance.now();
        }), i.observe(document.body);
      else {
        const s = () => {
          e = performance.now(), performance.now() - t < this.postSettleMaxWait && setTimeout(s, 100);
        };
        s();
      }
      n();
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
    return new Promise((t) => {
      if (this.heightModifyingLibraries.length === 0 || !this.Manager) {
        t();
        return;
      }
      let e = 0;
      const i = 20, o = () => {
        e++;
        const l = this.heightModifyingLibraries.filter(
          (n) => this.Manager.libraries[n]
        );
        if (l.length === 0) {
          t();
          return;
        }
        l.every(
          (n) => this.Manager.instances[n] && this.Manager.instances[n].length > 0
        ) || e >= i ? t() : setTimeout(o, 50);
      };
      setTimeout(o, 100);
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
  ease(t, e, i, o) {
    return t /= o / 2, t < 1 ? i / 2 * t * t + e : (t--, -i / 2 * (t * (t - 2) - 1) + e);
  }
  /**
   * Emit a custom event from the trigger element
   * 
   * @param {string} name - The name of the event to emit (e.g., "AnchorToStart", "AnchorToEnd")
   * @returns {void}
   */
  emitEvent(t) {
    const e = new CustomEvent(t, { detail: { element: this.DOM.trigger } });
    this.DOM.trigger.dispatchEvent(e);
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
  _smoothMicroAdjust(t, e = 150) {
    const i = document.documentElement, o = document.body, l = Math.max(0, (i.scrollHeight || o.scrollHeight) - window.innerHeight), h = window.pageYOffset, n = Math.min(l, Math.max(0, t)), s = n - h;
    if (Math.abs(s) < 1) return;
    let a = null;
    const c = (r, d, m, g) => (r /= g / 2, r < 1 ? m / 2 * r * r + d : (r--, -m / 2 * (r * (r - 2) - 1) + d)), u = (r) => {
      a == null && (a = r);
      const d = r - a, m = c(d, h, s, e);
      window.scrollTo(0, m), d < e ? requestAnimationFrame(u) : window.scrollTo(0, n);
    };
    requestAnimationFrame(u);
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
    const t = document.documentElement, e = t.style.scrollBehavior;
    return t.style.scrollBehavior = "auto", () => {
      t.style.scrollBehavior = e || "";
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
    this.DOM.trigger && this.DOM.trigger.removeEventListener("click", (t) => this.handleClick(t)), this.popstate && window.removeEventListener("popstate", (t) => this.handlePopstate(t));
  }
}
export {
  v as default
};
