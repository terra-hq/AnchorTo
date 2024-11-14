class d {
  constructor({
    trigger: t,
    destination: e,
    offset: i = 0,
    url: s = "hash",
    speed: o = 1500,
    emitEvents: n = !0,
    popstate: r = !0,
    debug: h = !1,
    // New debug option
    onComplete: a = null
    // New callback for scroll completion
  }) {
    this.DOM = {
      trigger: t,
      destination: e
    }, this.offset = typeof i == "function" ? i : () => i, this.url = s, this.speed = o, this.emitEvents = n, this.popstate = r, this.debug = h, this.onComplete = a, this.init(), this.events(), this.debug && console.log("AnchorTo Initialized:", {
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
    this.DOM.trigger && this.DOM.trigger.addEventListener("click", (t) => this.handleClick(t)), this.popstate && window.addEventListener("popstate", (t) => this.handlePopstate(t));
  }
  handleClick(t) {
    if (t.preventDefault(), this.scrollTo(this.DOM.destination), this.url !== "none") {
      const e = this.DOM.destination.id || "section";
      if (this.url === "hash")
        history.pushState(null, null, `#${e}`);
      else if (this.url === "query") {
        const i = new URLSearchParams(window.location.search);
        i.set("scrollto", e), history.pushState(null, null, `${window.location.pathname}?${i}`);
      }
    }
    this.emitEvents && this.emitEvent("AnchorToStart");
  }
  handlePopstate() {
    const t = this.url === "query" ? new URLSearchParams(window.location.search).get("scrollto") : window.location.hash.substring(1), e = document.getElementById(t);
    e && this.scrollTo(e);
  }
  scrollTo(t) {
    const e = window.pageYOffset, s = t.getBoundingClientRect().top + window.pageYOffset - this.offset(t, this.DOM.trigger) - e, o = this.speed;
    let n = null;
    const r = (h) => {
      n || (n = h);
      const a = h - n, l = this.ease(a, e, s, o);
      window.scrollTo(0, l), a < o ? requestAnimationFrame(r) : (this.emitEvents && this.emitEvent("AnchorToEnd"), typeof this.onComplete == "function" && this.onComplete());
    };
    requestAnimationFrame(r);
  }
  ease(t, e, i, s) {
    return t /= s / 2, t < 1 ? i / 2 * t * t + e : (t--, -i / 2 * (t * (t - 2) - 1) + e);
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
  d as default
};
