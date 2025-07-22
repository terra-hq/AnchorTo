class f {
  constructor({
    trigger: t,
    destination: e,
    destinationSelector: n = "",
    offset: i = 0,
    url: o = "hash",
    speed: r = 1500,
    emitEvents: s = !0,
    popstate: a = !0,
    debug: h = !1,
    onComplete: l = null,
    // New callback for scroll completion
    beforeScroll: c = null,
    // Callback to execute before scrolling
    heightModifyingLibraries: d = [],
    Manager: g = null
  }) {
    this.DOM = {
      trigger: t,
      destination: e
    }, this.offset = typeof i == "function" ? i : () => i, this.url = o, this.speed = r, this.emitEvents = s, this.popstate = a, this.debug = h, this.onComplete = l, this.beforeScroll = c, this.destinationSelector = n, this.heightModifyingLibraries = d, this.Manager = g, this.init(), this.events(), this.debug && console.log("AnchorTo Initialized:", {
      trigger: this.DOM.trigger,
      destination: this.DOM.destination,
      offset: this.offset(this.DOM.destination, this.DOM.trigger),
      url: this.url,
      speed: this.speed,
      emitEvents: this.emitEvents,
      popstate: this.popstate
    });
  }
  init() {
  }
  events() {
    this.DOM.trigger && (this.DOM.trigger.tagName === "SELECT" ? this.DOM.trigger.addEventListener("change", (t) => this.handleSelectChange(t)) : this.DOM.trigger.addEventListener("click", (t) => this.handleClick(t))), this.popstate && window.addEventListener("popstate", (t) => this.handlePopstate(t));
  }
  async handleScroll() {
    if (typeof this.beforeScroll == "function" && (await this.beforeScroll(), await this.waitForHeightModifyingLibraries(), this.DOM.destination = document.getElementById(this.destinationSelector)), this.emitEvents && this.emitEvent("AnchorToStart"), this.scrollTo(this.DOM.destination), this.url !== "none") {
      const t = this.DOM.destination.id || "section";
      if (this.url === "hash")
        history.pushState(null, null, `#${t}`);
      else if (this.url === "query") {
        const e = new URLSearchParams(window.location.search);
        e.set("scrollto", t), history.pushState(null, null, `${window.location.pathname}?${e}`);
      }
    }
  }
  async handleClick(t) {
    t.preventDefault(), this.handleScroll();
  }
  async handleSelectChange(t) {
    const e = t.target.value;
    this.destinationSelector = e, this.DOM.destination = document.getElementById(this.destinationSelector), this.handleScroll();
  }
  handlePopstate() {
    const t = this.url === "query" ? new URLSearchParams(window.location.search).get("scrollto") : window.location.hash.substring(1), e = document.getElementById(t);
    e && this.scrollTo(e);
  }
  scrollTo(t) {
    const e = window.pageYOffset, i = t.getBoundingClientRect().top + window.pageYOffset - this.offset(t, this.DOM.trigger) - e, o = this.speed;
    let r = null;
    const s = (a) => {
      r || (r = a);
      const h = a - r, l = this.ease(h, e, i, o);
      window.scrollTo(0, l), h < o ? requestAnimationFrame(s) : (this.emitEvents && this.emitEvent("AnchorToEnd"), typeof this.onComplete == "function" && this.onComplete());
    };
    requestAnimationFrame(s);
  }
  /**
   * Waits for all height-modifying libraries to be loaded before proceeding with scroll
   * @returns {Promise} Promise that resolves when all libraries are loaded or timeout is reached
   */
  waitForHeightModifyingLibraries() {
    return new Promise((t) => {
      if (this.heightModifyingLibraries.length === 0) {
        this.debug && console.log("No height-modifying libraries registered"), t();
        return;
      }
      if (!this.Manager) {
        this.debug && console.log("No Manager instance provided, proceeding with scroll"), t();
        return;
      }
      let e = 0;
      const n = 20, i = () => {
        e++;
        const o = this.heightModifyingLibraries.filter(
          (s) => this.Manager.libraries[s]
        );
        if (o.length === 0) {
          this.debug && console.log(
            "No height-modifying libraries available in Manager.libraries, proceeding with scroll"
          ), t();
          return;
        }
        o.every(
          (s) => this.Manager.instances[s] && this.Manager.instances[s].length > 0
        ) ? t() : e >= n ? (this.debug && console.warn("Timeout waiting for height-modifying libraries, proceeding with scroll"), t()) : setTimeout(i, 50);
      };
      setTimeout(i, 100);
    });
  }
  ease(t, e, n, i) {
    return t /= i / 2, t < 1 ? n / 2 * t * t + e : (t--, -n / 2 * (t * (t - 2) - 1) + e);
  }
  emitEvent(t) {
    const e = new CustomEvent(t, { detail: { element: this.DOM.trigger } });
    this.DOM.trigger.dispatchEvent(e);
  }
  destroy() {
    this.DOM.trigger && this.DOM.trigger.removeEventListener("click", (t) => this.handleClick(t)), this.popstate && window.removeEventListener("popstate", (t) => this.handlePopstate(t));
  }
}
export {
  f as default
};
