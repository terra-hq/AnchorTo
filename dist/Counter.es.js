import Vn from "gsap";
function xi(o, e) {
  for (var n = 0; n < e.length; n++) {
    var t = e[n];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(o, t.key, t);
  }
}
function yi(o, e, n) {
  return e && xi(o.prototype, e), o;
}
/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var me, Gr, Ue, Et, Mt, rr, qn, zt, vr, Kn, vt, it, Zn, Jn = function() {
  return me || typeof window < "u" && (me = window.gsap) && me.registerPlugin && me;
}, Qn = 1, tr = [], E = [], ft = [], xr = Date.now, fn = function(e, n) {
  return n;
}, wi = function() {
  var e = vr.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, E), r.push.apply(r, ft), E = t, ft = r, fn = function(l, a) {
    return n[l](a);
  };
}, Dt = function(e, n) {
  return ~ft.indexOf(e) && ft[ft.indexOf(e) + 1][n];
}, yr = function(e) {
  return !!~Kn.indexOf(e);
}, Re = function(e, n, t, r, i) {
  return e.addEventListener(n, t, {
    passive: r !== !1,
    capture: !!i
  });
}, De = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Or = "scrollLeft", Ar = "scrollTop", pn = function() {
  return vt && vt.isPressed || E.cache++;
}, Zr = function(e, n) {
  var t = function r(i) {
    if (i || i === 0) {
      Qn && (Ue.history.scrollRestoration = "manual");
      var l = vt && vt.isPressed;
      i = r.v = Math.round(i) || (vt && vt.iOS ? 1 : 0), e(i), r.cacheID = E.cache, l && fn("ss", i);
    } else (n || E.cache !== r.cacheID || fn("ref")) && (r.cacheID = E.cache, r.v = e());
    return r.v + r.offset;
  };
  return t.offset = 0, e && t;
}, Ye = {
  s: Or,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Zr(function(o) {
    return arguments.length ? Ue.scrollTo(o, le.sc()) : Ue.pageXOffset || Et[Or] || Mt[Or] || rr[Or] || 0;
  })
}, le = {
  s: Ar,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Ye,
  sc: Zr(function(o) {
    return arguments.length ? Ue.scrollTo(Ye.sc(), o) : Ue.pageYOffset || Et[Ar] || Mt[Ar] || rr[Ar] || 0;
  })
}, Ne = function(e, n) {
  return (n && n._ctx && n._ctx.selector || me.utils.toArray)(e)[0] || (typeof e == "string" && me.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Rt = function(e, n) {
  var t = n.s, r = n.sc;
  yr(e) && (e = Et.scrollingElement || Mt);
  var i = E.indexOf(e), l = r === le.sc ? 1 : 2;
  !~i && (i = E.push(e) - 1), E[i + l] || Re(e, "scroll", pn);
  var a = E[i + l], f = a || (E[i + l] = Zr(Dt(e, t), !0) || (yr(e) ? r : Zr(function(x) {
    return arguments.length ? e[t] = x : e[t];
  })));
  return f.target = e, a || (f.smooth = me.getProperty(e, "scrollBehavior") === "smooth"), f;
}, dn = function(e, n, t) {
  var r = e, i = e, l = xr(), a = l, f = n || 50, x = Math.max(500, f * 3), F = function(_, U) {
    var z = xr();
    U || z - l > f ? (i = r, r = _, a = l, l = z) : t ? r += _ : r = i + (_ - i) / (z - a) * (l - a);
  }, O = function() {
    i = r = t ? 0 : r, a = l = 0;
  }, h = function(_) {
    var U = a, z = i, ne = xr();
    return (_ || _ === 0) && _ !== r && F(_), l === a || ne - a > x ? 0 : (r + (t ? z : -z)) / ((t ? ne : l) - U) * 1e3;
  };
  return {
    update: F,
    reset: O,
    getVelocity: h
  };
}, fr = function(e, n) {
  return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, Mn = function(e) {
  var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(n) >= Math.abs(t) ? n : t;
}, jn = function() {
  vr = me.core.globals().ScrollTrigger, vr && vr.core && wi();
}, ei = function(e) {
  return me = e || Jn(), !Gr && me && typeof document < "u" && document.body && (Ue = window, Et = document, Mt = Et.documentElement, rr = Et.body, Kn = [Ue, Et, Mt, rr], me.utils.clamp, Zn = me.core.context || function() {
  }, zt = "onpointerenter" in rr ? "pointer" : "mouse", qn = Z.isTouch = Ue.matchMedia && Ue.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Ue || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, it = Z.eventTypes = ("ontouchstart" in Mt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Mt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Qn = 0;
  }, 500), jn(), Gr = 1), Gr;
};
Ye.op = le;
E.cache = 0;
var Z = /* @__PURE__ */ function() {
  function o(n) {
    this.init(n);
  }
  var e = o.prototype;
  return e.init = function(t) {
    Gr || ei(me) || console.warn("Please gsap.registerPlugin(Observer)"), vr || jn();
    var r = t.tolerance, i = t.dragMinimum, l = t.type, a = t.target, f = t.lineHeight, x = t.debounce, F = t.preventDefault, O = t.onStop, h = t.onStopDelay, c = t.ignore, _ = t.wheelSpeed, U = t.event, z = t.onDragStart, ne = t.onDragEnd, H = t.onDrag, de = t.onPress, T = t.onRelease, $e = t.onRight, X = t.onLeft, w = t.onUp, Se = t.onDown, Le = t.onChangeX, g = t.onChangeY, ge = t.onChange, y = t.onToggleX, pt = t.onToggleY, ie = t.onHover, Te = t.onHoverEnd, ke = t.onMove, I = t.ignoreCheck, J = t.isNormalizer, Q = t.onGestureStart, s = t.onGestureEnd, oe = t.onWheel, Ot = t.onEnable, yt = t.onDisable, Ve = t.onClick, dt = t.scrollSpeed, Pe = t.capture, j = t.allowClicks, Ee = t.lockAxis, ve = t.onLockAxis;
    this.target = a = Ne(a) || Mt, this.vars = t, c && (c = me.utils.toArray(c)), r = r || 1e-9, i = i || 0, _ = _ || 1, dt = dt || 1, l = l || "wheel,touch,pointer", x = x !== !1, f || (f = parseFloat(Ue.getComputedStyle(rr).lineHeight) || 22);
    var wt, Me, Qe, A, V, ze, Xe, u = this, Be = 0, gt = 0, bt = t.passive || !F, ee = Rt(a, Ye), Ct = Rt(a, le), At = ee(), Vt = Ct(), ue = ~l.indexOf("touch") && !~l.indexOf("pointer") && it[0] === "pointerdown", St = yr(a), q = a.ownerDocument || Et, je = [0, 0, 0], qe = [0, 0, 0], ht = 0, sr = function() {
      return ht = xr();
    }, te = function(v, Y) {
      return (u.event = v) && c && ~c.indexOf(v.target) || Y && ue && v.pointerType !== "touch" || I && I(v, Y);
    }, Mr = function() {
      u._vx.reset(), u._vy.reset(), Me.pause(), O && O(u);
    }, Tt = function() {
      var v = u.deltaX = Mn(je), Y = u.deltaY = Mn(qe), p = Math.abs(v) >= r, S = Math.abs(Y) >= r;
      ge && (p || S) && ge(u, v, Y, je, qe), p && ($e && u.deltaX > 0 && $e(u), X && u.deltaX < 0 && X(u), Le && Le(u), y && u.deltaX < 0 != Be < 0 && y(u), Be = u.deltaX, je[0] = je[1] = je[2] = 0), S && (Se && u.deltaY > 0 && Se(u), w && u.deltaY < 0 && w(u), g && g(u), pt && u.deltaY < 0 != gt < 0 && pt(u), gt = u.deltaY, qe[0] = qe[1] = qe[2] = 0), (A || Qe) && (ke && ke(u), Qe && (H(u), Qe = !1), A = !1), ze && !(ze = !1) && ve && ve(u), V && (oe(u), V = !1), wt = 0;
    }, qt = function(v, Y, p) {
      je[p] += v, qe[p] += Y, u._vx.update(v), u._vy.update(Y), x ? wt || (wt = requestAnimationFrame(Tt)) : Tt();
    }, Kt = function(v, Y) {
      Ee && !Xe && (u.axis = Xe = Math.abs(v) > Math.abs(Y) ? "x" : "y", ze = !0), Xe !== "y" && (je[2] += v, u._vx.update(v, !0)), Xe !== "x" && (qe[2] += Y, u._vy.update(Y, !0)), x ? wt || (wt = requestAnimationFrame(Tt)) : Tt();
    }, kt = function(v) {
      if (!te(v, 1)) {
        v = fr(v, F);
        var Y = v.clientX, p = v.clientY, S = Y - u.x, m = p - u.y, b = u.isDragging;
        u.x = Y, u.y = p, (b || Math.abs(u.startX - Y) >= i || Math.abs(u.startY - p) >= i) && (H && (Qe = !0), b || (u.isDragging = !0), Kt(S, m), b || z && z(u));
      }
    }, Ft = u.onPress = function(C) {
      te(C, 1) || C && C.button || (u.axis = Xe = null, Me.pause(), u.isPressed = !0, C = fr(C), Be = gt = 0, u.startX = u.x = C.clientX, u.startY = u.y = C.clientY, u._vx.reset(), u._vy.reset(), Re(J ? a : q, it[1], kt, bt, !0), u.deltaX = u.deltaY = 0, de && de(u));
    }, P = u.onRelease = function(C) {
      if (!te(C, 1)) {
        De(J ? a : q, it[1], kt, !0);
        var v = !isNaN(u.y - u.startY), Y = u.isDragging, p = Y && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), S = fr(C);
        !p && v && (u._vx.reset(), u._vy.reset(), F && j && me.delayedCall(0.08, function() {
          if (xr() - ht > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (q.createEvent) {
              var m = q.createEvent("MouseEvents");
              m.initMouseEvent("click", !0, !0, Ue, 1, S.screenX, S.screenY, S.clientX, S.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(m);
            }
          }
        })), u.isDragging = u.isGesturing = u.isPressed = !1, O && Y && !J && Me.restart(!0), ne && Y && ne(u), T && T(u, p);
      }
    }, Yt = function(v) {
      return v.touches && v.touches.length > 1 && (u.isGesturing = !0) && Q(v, u.isDragging);
    }, et = function() {
      return (u.isGesturing = !1) || s(u);
    }, tt = function(v) {
      if (!te(v)) {
        var Y = ee(), p = Ct();
        qt((Y - At) * dt, (p - Vt) * dt, 1), At = Y, Vt = p, O && Me.restart(!0);
      }
    }, rt = function(v) {
      if (!te(v)) {
        v = fr(v, F), oe && (V = !0);
        var Y = (v.deltaMode === 1 ? f : v.deltaMode === 2 ? Ue.innerHeight : 1) * _;
        qt(v.deltaX * Y, v.deltaY * Y, 0), O && !J && Me.restart(!0);
      }
    }, It = function(v) {
      if (!te(v)) {
        var Y = v.clientX, p = v.clientY, S = Y - u.x, m = p - u.y;
        u.x = Y, u.y = p, A = !0, O && Me.restart(!0), (S || m) && Kt(S, m);
      }
    }, Zt = function(v) {
      u.event = v, ie(u);
    }, _t = function(v) {
      u.event = v, Te(u);
    }, ar = function(v) {
      return te(v) || fr(v, F) && Ve(u);
    };
    Me = u._dc = me.delayedCall(h || 0.25, Mr).pause(), u.deltaX = u.deltaY = 0, u._vx = dn(0, 50, !0), u._vy = dn(0, 50, !0), u.scrollX = ee, u.scrollY = Ct, u.isDragging = u.isGesturing = u.isPressed = !1, Zn(this), u.enable = function(C) {
      return u.isEnabled || (Re(St ? q : a, "scroll", pn), l.indexOf("scroll") >= 0 && Re(St ? q : a, "scroll", tt, bt, Pe), l.indexOf("wheel") >= 0 && Re(a, "wheel", rt, bt, Pe), (l.indexOf("touch") >= 0 && qn || l.indexOf("pointer") >= 0) && (Re(a, it[0], Ft, bt, Pe), Re(q, it[2], P), Re(q, it[3], P), j && Re(a, "click", sr, !0, !0), Ve && Re(a, "click", ar), Q && Re(q, "gesturestart", Yt), s && Re(q, "gestureend", et), ie && Re(a, zt + "enter", Zt), Te && Re(a, zt + "leave", _t), ke && Re(a, zt + "move", It)), u.isEnabled = !0, C && C.type && Ft(C), Ot && Ot(u)), u;
    }, u.disable = function() {
      u.isEnabled && (tr.filter(function(C) {
        return C !== u && yr(C.target);
      }).length || De(St ? q : a, "scroll", pn), u.isPressed && (u._vx.reset(), u._vy.reset(), De(J ? a : q, it[1], kt, !0)), De(St ? q : a, "scroll", tt, Pe), De(a, "wheel", rt, Pe), De(a, it[0], Ft, Pe), De(q, it[2], P), De(q, it[3], P), De(a, "click", sr, !0), De(a, "click", ar), De(q, "gesturestart", Yt), De(q, "gestureend", et), De(a, zt + "enter", Zt), De(a, zt + "leave", _t), De(a, zt + "move", It), u.isEnabled = u.isPressed = u.isDragging = !1, yt && yt(u));
    }, u.kill = u.revert = function() {
      u.disable();
      var C = tr.indexOf(u);
      C >= 0 && tr.splice(C, 1), vt === u && (vt = 0);
    }, tr.push(u), J && yr(a) && (vt = u), u.enable(U);
  }, yi(o, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), o;
}();
Z.version = "3.12.5";
Z.create = function(o) {
  return new Z(o);
};
Z.register = ei;
Z.getAll = function() {
  return tr.slice();
};
Z.getById = function(o) {
  return tr.filter(function(e) {
    return e.vars.id === o;
  })[0];
};
Jn() && me.registerPlugin(Z);
/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var d, jt, R, G, ot, N, ti, Jr, Pr, wr, dr, Fr, be, tn, gn, Ae, Dn, Rn, er, ri, nn, ni, Oe, hn, ii, oi, Pt, _n, wn, nr, bn, Qr, mn, on, Yr = 1, Ce = Date.now, sn = Ce(), Je = 0, gr = 0, On = function(e, n, t) {
  var r = Ge(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return t["_" + n + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, An = function(e, n) {
  return n && (!Ge(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, bi = function o() {
  return gr && requestAnimationFrame(o);
}, Fn = function() {
  return tn = 1;
}, Yn = function() {
  return tn = 0;
}, ut = function(e) {
  return e;
}, hr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, si = function() {
  return typeof window < "u";
}, ai = function() {
  return d || si() && (d = window.gsap) && d.registerPlugin && d;
}, Gt = function(e) {
  return !!~ti.indexOf(e);
}, li = function(e) {
  return (e === "Height" ? bn : R["inner" + e]) || ot["client" + e] || N["client" + e];
}, ui = function(e) {
  return Dt(e, "getBoundingClientRect") || (Gt(e) ? function() {
    return Kr.width = R.innerWidth, Kr.height = bn, Kr;
  } : function() {
    return mt(e);
  });
}, Ci = function(e, n, t) {
  var r = t.d, i = t.d2, l = t.a;
  return (l = Dt(e, "getBoundingClientRect")) ? function() {
    return l()[r];
  } : function() {
    return (n ? li(i) : e["client" + i]) || 0;
  };
}, Si = function(e, n) {
  return !n || ~ft.indexOf(e) ? ui(e) : function() {
    return Kr;
  };
}, ct = function(e, n) {
  var t = n.s, r = n.d2, i = n.d, l = n.a;
  return Math.max(0, (t = "scroll" + r) && (l = Dt(e, t)) ? l() - ui(e)()[i] : Gt(e) ? (ot[t] || N[t]) - li(r) : e[t] - e["offset" + r]);
}, Ir = function(e, n) {
  for (var t = 0; t < er.length; t += 3)
    (!n || ~n.indexOf(er[t + 1])) && e(er[t], er[t + 1], er[t + 2]);
}, Ge = function(e) {
  return typeof e == "string";
}, Ie = function(e) {
  return typeof e == "function";
}, _r = function(e) {
  return typeof e == "number";
}, Nt = function(e) {
  return typeof e == "object";
}, pr = function(e, n, t) {
  return e && e.progress(n ? 0 : 1) && t && e.pause();
}, an = function(e, n) {
  if (e.enabled) {
    var t = e._ctx ? e._ctx.add(function() {
      return n(e);
    }) : n(e);
    t && t.totalTime && (e.callbackAnimation = t);
  }
}, Jt = Math.abs, ci = "left", fi = "top", Cn = "right", Sn = "bottom", Bt = "width", Ht = "height", br = "Right", Cr = "Left", Sr = "Top", Tr = "Bottom", re = "padding", Ke = "margin", or = "Width", Tn = "Height", ae = "px", Ze = function(e) {
  return R.getComputedStyle(e);
}, Ti = function(e) {
  var n = Ze(e).position;
  e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
}, In = function(e, n) {
  for (var t in n)
    t in e || (e[t] = n[t]);
  return e;
}, mt = function(e, n) {
  var t = n && Ze(e)[gn] !== "matrix(1, 0, 0, 1, 0, 0)" && d.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = e.getBoundingClientRect();
  return t && t.progress(0).kill(), r;
}, jr = function(e, n) {
  var t = n.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, pi = function(e) {
  var n = [], t = e.labels, r = e.duration(), i;
  for (i in t)
    n.push(t[i] / r);
  return n;
}, ki = function(e) {
  return function(n) {
    return d.utils.snap(pi(e), n);
  };
}, kn = function(e) {
  var n = d.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, i) {
    return r - i;
  });
  return t ? function(r, i, l) {
    l === void 0 && (l = 1e-3);
    var a;
    if (!i)
      return n(r);
    if (i > 0) {
      for (r -= l, a = 0; a < t.length; a++)
        if (t[a] >= r)
          return t[a];
      return t[a - 1];
    } else
      for (a = t.length, r += l; a--; )
        if (t[a] <= r)
          return t[a];
    return t[0];
  } : function(r, i, l) {
    l === void 0 && (l = 1e-3);
    var a = n(r);
    return !i || Math.abs(a - r) < l || a - r < 0 == i < 0 ? a : n(i < 0 ? r - e : r + e);
  };
}, Pi = function(e) {
  return function(n, t) {
    return kn(pi(e))(n, t.direction);
  };
}, Lr = function(e, n, t, r) {
  return t.split(",").forEach(function(i) {
    return e(n, i, r);
  });
}, pe = function(e, n, t, r, i) {
  return e.addEventListener(n, t, {
    passive: !r,
    capture: !!i
  });
}, fe = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, zr = function(e, n, t) {
  t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
}, Ln = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Nr = {
  toggleActions: "play",
  anticipatePin: 0
}, en = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Ur = function(e, n) {
  if (Ge(e)) {
    var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in en ? en[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
  }
  return e;
}, Xr = function(e, n, t, r, i, l, a, f) {
  var x = i.startColor, F = i.endColor, O = i.fontSize, h = i.indent, c = i.fontWeight, _ = G.createElement("div"), U = Gt(t) || Dt(t, "pinType") === "fixed", z = e.indexOf("scroller") !== -1, ne = U ? N : t, H = e.indexOf("start") !== -1, de = H ? x : F, T = "border-color:" + de + ";font-size:" + O + ";color:" + de + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return T += "position:" + ((z || f) && U ? "fixed;" : "absolute;"), (z || f || !U) && (T += (r === le ? Cn : Sn) + ":" + (l + parseFloat(h)) + "px;"), a && (T += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), _._isStart = H, _.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), _.style.cssText = T, _.innerText = n || n === 0 ? e + "-" + n : e, ne.children[0] ? ne.insertBefore(_, ne.children[0]) : ne.appendChild(_), _._offset = _["offset" + r.op.d2], $r(_, 0, r, H), _;
}, $r = function(e, n, t, r) {
  var i = {
    display: "block"
  }, l = t[r ? "os2" : "p2"], a = t[r ? "p2" : "os2"];
  e._isFlipped = r, i[t.a + "Percent"] = r ? -100 : 0, i[t.a] = r ? "1px" : 0, i["border" + l + or] = 1, i["border" + a + or] = 0, i[t.p] = n + "px", d.set(e, i);
}, k = [], vn = {}, Er, zn = function() {
  return Ce() - Je > 34 && (Er || (Er = requestAnimationFrame(xt)));
}, Qt = function() {
  (!Oe || !Oe.isPressed || Oe.startX > N.clientWidth) && (E.cache++, Oe ? Er || (Er = requestAnimationFrame(xt)) : xt(), Je || $t("scrollStart"), Je = Ce());
}, ln = function() {
  oi = R.innerWidth, ii = R.innerHeight;
}, mr = function() {
  E.cache++, !be && !ni && !G.fullscreenElement && !G.webkitFullscreenElement && (!hn || oi !== R.innerWidth || Math.abs(R.innerHeight - ii) > R.innerHeight * 0.25) && Jr.restart(!0);
}, Ut = {}, Ei = [], di = function o() {
  return fe(M, "scrollEnd", o) || Xt(!0);
}, $t = function(e) {
  return Ut[e] && Ut[e].map(function(n) {
    return n();
  }) || Ei;
}, We = [], gi = function(e) {
  for (var n = 0; n < We.length; n += 5)
    (!e || We[n + 4] && We[n + 4].query === e) && (We[n].style.cssText = We[n + 1], We[n].getBBox && We[n].setAttribute("transform", We[n + 2] || ""), We[n + 3].uncache = 1);
}, Pn = function(e, n) {
  var t;
  for (Ae = 0; Ae < k.length; Ae++)
    t = k[Ae], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
  Qr = !0, n && gi(n), n || $t("revert");
}, hi = function(e, n) {
  E.cache++, (n || !Fe) && E.forEach(function(t) {
    return Ie(t) && t.cacheID++ && (t.rec = 0);
  }), Ge(e) && (R.history.scrollRestoration = wn = e);
}, Fe, Wt = 0, Nn, Mi = function() {
  if (Nn !== Wt) {
    var e = Nn = Wt;
    requestAnimationFrame(function() {
      return e === Wt && Xt(!0);
    });
  }
}, _i = function() {
  N.appendChild(nr), bn = !Oe && nr.offsetHeight || R.innerHeight, N.removeChild(nr);
}, Xn = function(e) {
  return Pr(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n) {
    return n.style.display = e ? "none" : "block";
  });
}, Xt = function(e, n) {
  if (Je && !e && !Qr) {
    pe(M, "scrollEnd", di);
    return;
  }
  _i(), Fe = M.isRefreshing = !0, E.forEach(function(r) {
    return Ie(r) && ++r.cacheID && (r.rec = r());
  });
  var t = $t("refreshInit");
  ri && M.sort(), n || Pn(), E.forEach(function(r) {
    Ie(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), k.slice(0).forEach(function(r) {
    return r.refresh();
  }), Qr = !1, k.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var i = r.vars.horizontal ? "offsetWidth" : "offsetHeight", l = r.pin[i];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[i] - l), r.refresh();
    }
  }), mn = 1, Xn(!0), k.forEach(function(r) {
    var i = ct(r.scroller, r._dir), l = r.vars.end === "max" || r._endClamp && r.end > i, a = r._startClamp && r.start >= i;
    (l || a) && r.setPositions(a ? i - 1 : r.start, l ? Math.max(a ? i : r.start + 1, i) : r.end, !0);
  }), Xn(!1), mn = 0, t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), E.forEach(function(r) {
    Ie(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), hi(wn, 1), Jr.pause(), Wt++, Fe = 2, xt(2), k.forEach(function(r) {
    return Ie(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Fe = M.isRefreshing = !1, $t("refresh");
}, xn = 0, Vr = 1, kr, xt = function(e) {
  if (e === 2 || !Fe && !Qr) {
    M.isUpdating = !0, kr && kr.update(0);
    var n = k.length, t = Ce(), r = t - sn >= 50, i = n && k[0].scroll();
    if (Vr = xn > i ? -1 : 1, Fe || (xn = i), r && (Je && !tn && t - Je > 200 && (Je = 0, $t("scrollEnd")), dr = sn, sn = t), Vr < 0) {
      for (Ae = n; Ae-- > 0; )
        k[Ae] && k[Ae].update(0, r);
      Vr = 1;
    } else
      for (Ae = 0; Ae < n; Ae++)
        k[Ae] && k[Ae].update(0, r);
    M.isUpdating = !1;
  }
  Er = 0;
}, yn = [ci, fi, Sn, Cn, Ke + Tr, Ke + br, Ke + Sr, Ke + Cr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], qr = yn.concat([Bt, Ht, "boxSizing", "max" + or, "max" + Tn, "position", Ke, re, re + Sr, re + br, re + Tr, re + Cr]), Di = function(e, n, t) {
  ir(t);
  var r = e._gsap;
  if (r.spacerIsNative)
    ir(r.spacerState);
  else if (e._gsap.swappedIn) {
    var i = n.parentNode;
    i && (i.insertBefore(e, n), i.removeChild(n));
  }
  e._gsap.swappedIn = !1;
}, un = function(e, n, t, r) {
  if (!e._gsap.swappedIn) {
    for (var i = yn.length, l = n.style, a = e.style, f; i--; )
      f = yn[i], l[f] = t[f];
    l.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (l.display = "inline-block"), a[Sn] = a[Cn] = "auto", l.flexBasis = t.flexBasis || "auto", l.overflow = "visible", l.boxSizing = "border-box", l[Bt] = jr(e, Ye) + ae, l[Ht] = jr(e, le) + ae, l[re] = a[Ke] = a[fi] = a[ci] = "0", ir(r), a[Bt] = a["max" + or] = t[Bt], a[Ht] = a["max" + Tn] = t[Ht], a[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Ri = /([A-Z])/g, ir = function(e) {
  if (e) {
    var n = e.t.style, t = e.length, r = 0, i, l;
    for ((e.t._gsap || d.core.getCache(e.t)).uncache = 1; r < t; r += 2)
      l = e[r + 1], i = e[r], l ? n[i] = l : n[i] && n.removeProperty(i.replace(Ri, "-$1").toLowerCase());
  }
}, Br = function(e) {
  for (var n = qr.length, t = e.style, r = [], i = 0; i < n; i++)
    r.push(qr[i], t[qr[i]]);
  return r.t = e, r;
}, Oi = function(e, n, t) {
  for (var r = [], i = e.length, l = t ? 8 : 0, a; l < i; l += 2)
    a = e[l], r.push(a, a in n ? n[a] : e[l + 1]);
  return r.t = e.t, r;
}, Kr = {
  left: 0,
  top: 0
}, Bn = function(e, n, t, r, i, l, a, f, x, F, O, h, c, _) {
  Ie(e) && (e = e(f)), Ge(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Ur("0" + e.substr(3), t) : 0));
  var U = c ? c.time() : 0, z, ne, H;
  if (c && c.seek(0), isNaN(e) || (e = +e), _r(e))
    c && (e = d.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, h, e)), a && $r(a, t, r, !0);
  else {
    Ie(n) && (n = n(f));
    var de = (e || "0").split(" "), T, $e, X, w;
    H = Ne(n, f) || N, T = mt(H) || {}, (!T || !T.left && !T.top) && Ze(H).display === "none" && (w = H.style.display, H.style.display = "block", T = mt(H), w ? H.style.display = w : H.style.removeProperty("display")), $e = Ur(de[0], T[r.d]), X = Ur(de[1] || "0", t), e = T[r.p] - x[r.p] - F + $e + i - X, a && $r(a, X, r, t - X < 20 || a._isStart && X > 20), t -= t - X;
  }
  if (_ && (f[_] = e || -1e-3, e < 0 && (e = 0)), l) {
    var Se = e + t, Le = l._isStart;
    z = "scroll" + r.d2, $r(l, Se, r, Le && Se > 20 || !Le && (O ? Math.max(N[z], ot[z]) : l.parentNode[z]) <= Se + 1), O && (x = mt(a), O && (l.style[r.op.p] = x[r.op.p] - r.op.m - l._offset + ae));
  }
  return c && H && (z = mt(H), c.seek(h), ne = mt(H), c._caScrollDist = z[r.p] - ne[r.p], e = e / c._caScrollDist * h), c && c.seek(U), c ? e : Math.round(e);
}, Ai = /(webkit|moz|length|cssText|inset)/i, Hn = function(e, n, t, r) {
  if (e.parentNode !== n) {
    var i = e.style, l, a;
    if (n === N) {
      e._stOrig = i.cssText, a = Ze(e);
      for (l in a)
        !+l && !Ai.test(l) && a[l] && typeof i[l] == "string" && l !== "0" && (i[l] = a[l]);
      i.top = t, i.left = r;
    } else
      i.cssText = e._stOrig;
    d.core.getCache(e).uncache = 1, n.appendChild(e);
  }
}, mi = function(e, n, t) {
  var r = n, i = r;
  return function(l) {
    var a = Math.round(e());
    return a !== r && a !== i && Math.abs(a - r) > 3 && Math.abs(a - i) > 3 && (l = a, t && t()), i = r, r = l, l;
  };
}, Hr = function(e, n, t) {
  var r = {};
  r[n.p] = "+=" + t, d.set(e, r);
}, Wn = function(e, n) {
  var t = Rt(e, n), r = "_scroll" + n.p2, i = function l(a, f, x, F, O) {
    var h = l.tween, c = f.onComplete, _ = {};
    x = x || t();
    var U = mi(t, x, function() {
      h.kill(), l.tween = 0;
    });
    return O = F && O || 0, F = F || a - x, h && h.kill(), f[r] = a, f.inherit = !1, f.modifiers = _, _[r] = function() {
      return U(x + F * h.ratio + O * h.ratio * h.ratio);
    }, f.onUpdate = function() {
      E.cache++, l.tween && xt();
    }, f.onComplete = function() {
      l.tween = 0, c && c.call(h);
    }, h = l.tween = d.to(e, f), h;
  };
  return e[r] = t, t.wheelHandler = function() {
    return i.tween && i.tween.kill() && (i.tween = 0);
  }, pe(e, "wheel", t.wheelHandler), M.isTouch && pe(e, "touchmove", t.wheelHandler), i;
}, M = /* @__PURE__ */ function() {
  function o(n, t) {
    jt || o.register(d) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), _n(this), this.init(n, t);
  }
  var e = o.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !gr) {
      this.update = this.refresh = this.kill = ut;
      return;
    }
    t = In(Ge(t) || _r(t) || t.nodeType ? {
      trigger: t
    } : t, Nr);
    var i = t, l = i.onUpdate, a = i.toggleClass, f = i.id, x = i.onToggle, F = i.onRefresh, O = i.scrub, h = i.trigger, c = i.pin, _ = i.pinSpacing, U = i.invalidateOnRefresh, z = i.anticipatePin, ne = i.onScrubComplete, H = i.onSnapComplete, de = i.once, T = i.snap, $e = i.pinReparent, X = i.pinSpacer, w = i.containerAnimation, Se = i.fastScrollEnd, Le = i.preventOverlaps, g = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ye : le, ge = !O && O !== 0, y = Ne(t.scroller || R), pt = d.core.getCache(y), ie = Gt(y), Te = ("pinType" in t ? t.pinType : Dt(y, "pinType") || ie && "fixed") === "fixed", ke = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], I = ge && t.toggleActions.split(" "), J = "markers" in t ? t.markers : Nr.markers, Q = ie ? 0 : parseFloat(Ze(y)["border" + g.p2 + or]) || 0, s = this, oe = t.onRefreshInit && function() {
      return t.onRefreshInit(s);
    }, Ot = Ci(y, ie, g), yt = Si(y, ie), Ve = 0, dt = 0, Pe = 0, j = Rt(y, g), Ee, ve, wt, Me, Qe, A, V, ze, Xe, u, Be, gt, bt, ee, Ct, At, Vt, ue, St, q, je, qe, ht, sr, te, Mr, Tt, qt, Kt, kt, Ft, P, Yt, et, tt, rt, It, Zt, _t;
    if (s._startClamp = s._endClamp = !1, s._dir = g, z *= 45, s.scroller = y, s.scroll = w ? w.time.bind(w) : j, Me = j(), s.vars = t, r = r || t.animation, "refreshPriority" in t && (ri = 1, t.refreshPriority === -9999 && (kr = s)), pt.tweenScroll = pt.tweenScroll || {
      top: Wn(y, le),
      left: Wn(y, Ye)
    }, s.tweenTo = Ee = pt.tweenScroll[g.p], s.scrubDuration = function(p) {
      Yt = _r(p) && p, Yt ? P ? P.duration(p) : P = d.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Yt,
        paused: !0,
        onComplete: function() {
          return ne && ne(s);
        }
      }) : (P && P.progress(1).kill(), P = 0);
    }, r && (r.vars.lazy = !1, r._initted && !s.isReverted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), s.animation = r.pause(), r.scrollTrigger = s, s.scrubDuration(O), kt = 0, f || (f = r.vars.id)), T && ((!Nt(T) || T.push) && (T = {
      snapTo: T
    }), "scrollBehavior" in N.style && d.set(ie ? [N, ot] : y, {
      scrollBehavior: "auto"
    }), E.forEach(function(p) {
      return Ie(p) && p.target === (ie ? G.scrollingElement || ot : y) && (p.smooth = !1);
    }), wt = Ie(T.snapTo) ? T.snapTo : T.snapTo === "labels" ? ki(r) : T.snapTo === "labelsDirectional" ? Pi(r) : T.directional !== !1 ? function(p, S) {
      return kn(T.snapTo)(p, Ce() - dt < 500 ? 0 : S.direction);
    } : d.utils.snap(T.snapTo), et = T.duration || {
      min: 0.1,
      max: 2
    }, et = Nt(et) ? wr(et.min, et.max) : wr(et, et), tt = d.delayedCall(T.delay || Yt / 2 || 0.1, function() {
      var p = j(), S = Ce() - dt < 500, m = Ee.tween;
      if ((S || Math.abs(s.getVelocity()) < 10) && !m && !tn && Ve !== p) {
        var b = (p - A) / ee, ce = r && !ge ? r.totalProgress() : b, D = S ? 0 : (ce - Ft) / (Ce() - dr) * 1e3 || 0, K = d.utils.clamp(-b, 1 - b, Jt(D / 2) * D / 0.185), xe = b + (T.inertia === !1 ? 0 : K), $, B, L = T, nt = L.onStart, W = L.onInterrupt, He = L.onComplete;
        if ($ = wt(xe, s), _r($) || ($ = xe), B = Math.round(A + $ * ee), p <= V && p >= A && B !== p) {
          if (m && !m._initted && m.data <= Jt(B - p))
            return;
          T.inertia === !1 && (K = $ - b), Ee(B, {
            duration: et(Jt(Math.max(Jt(xe - ce), Jt($ - ce)) * 0.185 / D / 0.05 || 0)),
            ease: T.ease || "power3",
            data: Jt(B - p),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return tt.restart(!0) && W && W(s);
            },
            onComplete: function() {
              s.update(), Ve = j(), r && (P ? P.resetTo("totalProgress", $, r._tTime / r._tDur) : r.progress($)), kt = Ft = r && !ge ? r.totalProgress() : s.progress, H && H(s), He && He(s);
            }
          }, p, K * ee, B - p - K * ee), nt && nt(s, Ee.tween);
        }
      } else s.isActive && Ve !== p && tt.restart(!0);
    }).pause()), f && (vn[f] = s), h = s.trigger = Ne(h || c !== !0 && c), _t = h && h._gsap && h._gsap.stRevert, _t && (_t = _t(s)), c = c === !0 ? h : Ne(c), Ge(a) && (a = {
      targets: h,
      className: a
    }), c && (_ === !1 || _ === Ke || (_ = !_ && c.parentNode && c.parentNode.style && Ze(c.parentNode).display === "flex" ? !1 : re), s.pin = c, ve = d.core.getCache(c), ve.spacer ? Ct = ve.pinState : (X && (X = Ne(X), X && !X.nodeType && (X = X.current || X.nativeElement), ve.spacerIsNative = !!X, X && (ve.spacerState = Br(X))), ve.spacer = ue = X || G.createElement("div"), ue.classList.add("pin-spacer"), f && ue.classList.add("pin-spacer-" + f), ve.pinState = Ct = Br(c)), t.force3D !== !1 && d.set(c, {
      force3D: !0
    }), s.spacer = ue = ve.spacer, Kt = Ze(c), sr = Kt[_ + g.os2], q = d.getProperty(c), je = d.quickSetter(c, g.a, ae), un(c, ue, Kt), Vt = Br(c)), J) {
      gt = Nt(J) ? In(J, Ln) : Ln, u = Xr("scroller-start", f, y, g, gt, 0), Be = Xr("scroller-end", f, y, g, gt, 0, u), St = u["offset" + g.op.d2];
      var ar = Ne(Dt(y, "content") || y);
      ze = this.markerStart = Xr("start", f, ar, g, gt, St, 0, w), Xe = this.markerEnd = Xr("end", f, ar, g, gt, St, 0, w), w && (Zt = d.quickSetter([ze, Xe], g.a, ae)), !Te && !(ft.length && Dt(y, "fixedMarkers") === !0) && (Ti(ie ? N : y), d.set([u, Be], {
        force3D: !0
      }), Mr = d.quickSetter(u, g.a, ae), qt = d.quickSetter(Be, g.a, ae));
    }
    if (w) {
      var C = w.vars.onUpdate, v = w.vars.onUpdateParams;
      w.eventCallback("onUpdate", function() {
        s.update(0, 0, 1), C && C.apply(w, v || []);
      });
    }
    if (s.previous = function() {
      return k[k.indexOf(s) - 1];
    }, s.next = function() {
      return k[k.indexOf(s) + 1];
    }, s.revert = function(p, S) {
      if (!S)
        return s.kill(!0);
      var m = p !== !1 || !s.enabled, b = be;
      m !== s.isReverted && (m && (rt = Math.max(j(), s.scroll.rec || 0), Pe = s.progress, It = r && r.progress()), ze && [ze, Xe, u, Be].forEach(function(ce) {
        return ce.style.display = m ? "none" : "block";
      }), m && (be = s, s.update(m)), c && (!$e || !s.isActive) && (m ? Di(c, ue, Ct) : un(c, ue, Ze(c), te)), m || s.update(m), be = b, s.isReverted = m);
    }, s.refresh = function(p, S, m, b) {
      if (!((be || !s.enabled) && !S)) {
        if (c && p && Je) {
          pe(o, "scrollEnd", di);
          return;
        }
        !Fe && oe && oe(s), be = s, Ee.tween && !m && (Ee.tween.kill(), Ee.tween = 0), P && P.pause(), U && r && r.revert({
          kill: !1
        }).invalidate(), s.isReverted || s.revert(!0, !0), s._subPinOffset = !1;
        var ce = Ot(), D = yt(), K = w ? w.duration() : ct(y, g), xe = ee <= 0.01, $ = 0, B = b || 0, L = Nt(m) ? m.end : t.end, nt = t.endTrigger || h, W = Nt(m) ? m.start : t.start || (t.start === 0 || !h ? 0 : c ? "0 0" : "0 100%"), He = s.pinnedContainer = t.pinnedContainer && Ne(t.pinnedContainer, s), st = h && Math.max(0, k.indexOf(s)) || 0, he = st, _e, ye, Lt, Dr, we, se, at, rn, En, lr, lt, ur, Rr;
        for (J && Nt(m) && (ur = d.getProperty(u, g.p), Rr = d.getProperty(Be, g.p)); he--; )
          se = k[he], se.end || se.refresh(0, 1) || (be = s), at = se.pin, at && (at === h || at === c || at === He) && !se.isReverted && (lr || (lr = []), lr.unshift(se), se.revert(!0, !0)), se !== k[he] && (st--, he--);
        for (Ie(W) && (W = W(s)), W = On(W, "start", s), A = Bn(W, h, ce, g, j(), ze, u, s, D, Q, Te, K, w, s._startClamp && "_startClamp") || (c ? -1e-3 : 0), Ie(L) && (L = L(s)), Ge(L) && !L.indexOf("+=") && (~L.indexOf(" ") ? L = (Ge(W) ? W.split(" ")[0] : "") + L : ($ = Ur(L.substr(2), ce), L = Ge(W) ? W : (w ? d.utils.mapRange(0, w.duration(), w.scrollTrigger.start, w.scrollTrigger.end, A) : A) + $, nt = h)), L = On(L, "end", s), V = Math.max(A, Bn(L || (nt ? "100% 0" : K), nt, ce, g, j() + $, Xe, Be, s, D, Q, Te, K, w, s._endClamp && "_endClamp")) || -1e-3, $ = 0, he = st; he--; )
          se = k[he], at = se.pin, at && se.start - se._pinPush <= A && !w && se.end > 0 && (_e = se.end - (s._startClamp ? Math.max(0, se.start) : se.start), (at === h && se.start - se._pinPush < A || at === He) && isNaN(W) && ($ += _e * (1 - se.progress)), at === c && (B += _e));
        if (A += $, V += $, s._startClamp && (s._startClamp += $), s._endClamp && !Fe && (s._endClamp = V || -1e-3, V = Math.min(V, ct(y, g))), ee = V - A || (A -= 0.01) && 1e-3, xe && (Pe = d.utils.clamp(0, 1, d.utils.normalize(A, V, rt))), s._pinPush = B, ze && $ && (_e = {}, _e[g.a] = "+=" + $, He && (_e[g.p] = "-=" + j()), d.set([ze, Xe], _e)), c && !(mn && s.end >= ct(y, g)))
          _e = Ze(c), Dr = g === le, Lt = j(), qe = parseFloat(q(g.a)) + B, !K && V > 1 && (lt = (ie ? G.scrollingElement || ot : y).style, lt = {
            style: lt,
            value: lt["overflow" + g.a.toUpperCase()]
          }, ie && Ze(N)["overflow" + g.a.toUpperCase()] !== "scroll" && (lt.style["overflow" + g.a.toUpperCase()] = "scroll")), un(c, ue, _e), Vt = Br(c), ye = mt(c, !0), rn = Te && Rt(y, Dr ? Ye : le)(), _ ? (te = [_ + g.os2, ee + B + ae], te.t = ue, he = _ === re ? jr(c, g) + ee + B : 0, he && (te.push(g.d, he + ae), ue.style.flexBasis !== "auto" && (ue.style.flexBasis = he + ae)), ir(te), He && k.forEach(function(cr) {
            cr.pin === He && cr.vars.pinSpacing !== !1 && (cr._subPinOffset = !0);
          }), Te && j(rt)) : (he = jr(c, g), he && ue.style.flexBasis !== "auto" && (ue.style.flexBasis = he + ae)), Te && (we = {
            top: ye.top + (Dr ? Lt - A : rn) + ae,
            left: ye.left + (Dr ? rn : Lt - A) + ae,
            boxSizing: "border-box",
            position: "fixed"
          }, we[Bt] = we["max" + or] = Math.ceil(ye.width) + ae, we[Ht] = we["max" + Tn] = Math.ceil(ye.height) + ae, we[Ke] = we[Ke + Sr] = we[Ke + br] = we[Ke + Tr] = we[Ke + Cr] = "0", we[re] = _e[re], we[re + Sr] = _e[re + Sr], we[re + br] = _e[re + br], we[re + Tr] = _e[re + Tr], we[re + Cr] = _e[re + Cr], At = Oi(Ct, we, $e), Fe && j(0)), r ? (En = r._initted, nn(1), r.render(r.duration(), !0, !0), ht = q(g.a) - qe + ee + B, Tt = Math.abs(ee - ht) > 1, Te && Tt && At.splice(At.length - 2, 2), r.render(0, !0, !0), En || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), nn(0)) : ht = ee, lt && (lt.value ? lt.style["overflow" + g.a.toUpperCase()] = lt.value : lt.style.removeProperty("overflow-" + g.a));
        else if (h && j() && !w)
          for (ye = h.parentNode; ye && ye !== N; )
            ye._pinOffset && (A -= ye._pinOffset, V -= ye._pinOffset), ye = ye.parentNode;
        lr && lr.forEach(function(cr) {
          return cr.revert(!1, !0);
        }), s.start = A, s.end = V, Me = Qe = Fe ? rt : j(), !w && !Fe && (Me < rt && j(rt), s.scroll.rec = 0), s.revert(!1, !0), dt = Ce(), tt && (Ve = -1, tt.restart(!0)), be = 0, r && ge && (r._initted || It) && r.progress() !== It && r.progress(It || 0, !0).render(r.time(), !0, !0), (xe || Pe !== s.progress || w || U) && (r && !ge && r.totalProgress(w && A < -1e-3 && !Pe ? d.utils.normalize(A, V, 0) : Pe, !0), s.progress = xe || (Me - A) / ee === Pe ? 0 : Pe), c && _ && (ue._pinOffset = Math.round(s.progress * ht)), P && P.invalidate(), isNaN(ur) || (ur -= d.getProperty(u, g.p), Rr -= d.getProperty(Be, g.p), Hr(u, g, ur), Hr(ze, g, ur - (b || 0)), Hr(Be, g, Rr), Hr(Xe, g, Rr - (b || 0))), xe && !Fe && s.update(), F && !Fe && !bt && (bt = !0, F(s), bt = !1);
      }
    }, s.getVelocity = function() {
      return (j() - Qe) / (Ce() - dr) * 1e3 || 0;
    }, s.endAnimation = function() {
      pr(s.callbackAnimation), r && (P ? P.progress(1) : r.paused() ? ge || pr(r, s.direction < 0, 1) : pr(r, r.reversed()));
    }, s.labelToScroll = function(p) {
      return r && r.labels && (A || s.refresh() || A) + r.labels[p] / r.duration() * ee || 0;
    }, s.getTrailing = function(p) {
      var S = k.indexOf(s), m = s.direction > 0 ? k.slice(0, S).reverse() : k.slice(S + 1);
      return (Ge(p) ? m.filter(function(b) {
        return b.vars.preventOverlaps === p;
      }) : m).filter(function(b) {
        return s.direction > 0 ? b.end <= A : b.start >= V;
      });
    }, s.update = function(p, S, m) {
      if (!(w && !m && !p)) {
        var b = Fe === !0 ? rt : s.scroll(), ce = p ? 0 : (b - A) / ee, D = ce < 0 ? 0 : ce > 1 ? 1 : ce || 0, K = s.progress, xe, $, B, L, nt, W, He, st;
        if (S && (Qe = Me, Me = w ? j() : b, T && (Ft = kt, kt = r && !ge ? r.totalProgress() : D)), z && c && !be && !Yr && Je && (!D && A < b + (b - Qe) / (Ce() - dr) * z ? D = 1e-4 : D === 1 && V > b + (b - Qe) / (Ce() - dr) * z && (D = 0.9999)), D !== K && s.enabled) {
          if (xe = s.isActive = !!D && D < 1, $ = !!K && K < 1, W = xe !== $, nt = W || !!D != !!K, s.direction = D > K ? 1 : -1, s.progress = D, nt && !be && (B = D && !K ? 0 : D === 1 ? 1 : K === 1 ? 2 : 3, ge && (L = !W && I[B + 1] !== "none" && I[B + 1] || I[B], st = r && (L === "complete" || L === "reset" || L in r))), Le && (W || st) && (st || O || !r) && (Ie(Le) ? Le(s) : s.getTrailing(Le).forEach(function(Lt) {
            return Lt.endAnimation();
          })), ge || (P && !be && !Yr ? (P._dp._time - P._start !== P._time && P.render(P._dp._time - P._start), P.resetTo ? P.resetTo("totalProgress", D, r._tTime / r._tDur) : (P.vars.totalProgress = D, P.invalidate().restart())) : r && r.totalProgress(D, !!(be && (dt || p)))), c) {
            if (p && _ && (ue.style[_ + g.os2] = sr), !Te)
              je(hr(qe + ht * D));
            else if (nt) {
              if (He = !p && D > K && V + 1 > b && b + 1 >= ct(y, g), $e)
                if (!p && (xe || He)) {
                  var he = mt(c, !0), _e = b - A;
                  Hn(c, N, he.top + (g === le ? _e : 0) + ae, he.left + (g === le ? 0 : _e) + ae);
                } else
                  Hn(c, ue);
              ir(xe || He ? At : Vt), Tt && D < 1 && xe || je(qe + (D === 1 && !He ? ht : 0));
            }
          }
          T && !Ee.tween && !be && !Yr && tt.restart(!0), a && (W || de && D && (D < 1 || !on)) && Pr(a.targets).forEach(function(Lt) {
            return Lt.classList[xe || de ? "add" : "remove"](a.className);
          }), l && !ge && !p && l(s), nt && !be ? (ge && (st && (L === "complete" ? r.pause().totalProgress(1) : L === "reset" ? r.restart(!0).pause() : L === "restart" ? r.restart(!0) : r[L]()), l && l(s)), (W || !on) && (x && W && an(s, x), ke[B] && an(s, ke[B]), de && (D === 1 ? s.kill(!1, 1) : ke[B] = 0), W || (B = D === 1 ? 1 : 3, ke[B] && an(s, ke[B]))), Se && !xe && Math.abs(s.getVelocity()) > (_r(Se) ? Se : 2500) && (pr(s.callbackAnimation), P ? P.progress(1) : pr(r, L === "reverse" ? 1 : !D, 1))) : ge && l && !be && l(s);
        }
        if (qt) {
          var ye = w ? b / w.duration() * (w._caScrollDist || 0) : b;
          Mr(ye + (u._isFlipped ? 1 : 0)), qt(ye);
        }
        Zt && Zt(-b / w.duration() * (w._caScrollDist || 0));
      }
    }, s.enable = function(p, S) {
      s.enabled || (s.enabled = !0, pe(y, "resize", mr), ie || pe(y, "scroll", Qt), oe && pe(o, "refreshInit", oe), p !== !1 && (s.progress = Pe = 0, Me = Qe = Ve = j()), S !== !1 && s.refresh());
    }, s.getTween = function(p) {
      return p && Ee ? Ee.tween : P;
    }, s.setPositions = function(p, S, m, b) {
      if (w) {
        var ce = w.scrollTrigger, D = w.duration(), K = ce.end - ce.start;
        p = ce.start + K * p / D, S = ce.start + K * S / D;
      }
      s.refresh(!1, !1, {
        start: An(p, m && !!s._startClamp),
        end: An(S, m && !!s._endClamp)
      }, b), s.update();
    }, s.adjustPinSpacing = function(p) {
      if (te && p) {
        var S = te.indexOf(g.d) + 1;
        te[S] = parseFloat(te[S]) + p + ae, te[1] = parseFloat(te[1]) + p + ae, ir(te);
      }
    }, s.disable = function(p, S) {
      if (s.enabled && (p !== !1 && s.revert(!0, !0), s.enabled = s.isActive = !1, S || P && P.pause(), rt = 0, ve && (ve.uncache = 1), oe && fe(o, "refreshInit", oe), tt && (tt.pause(), Ee.tween && Ee.tween.kill() && (Ee.tween = 0)), !ie)) {
        for (var m = k.length; m--; )
          if (k[m].scroller === y && k[m] !== s)
            return;
        fe(y, "resize", mr), ie || fe(y, "scroll", Qt);
      }
    }, s.kill = function(p, S) {
      s.disable(p, S), P && !S && P.kill(), f && delete vn[f];
      var m = k.indexOf(s);
      m >= 0 && k.splice(m, 1), m === Ae && Vr > 0 && Ae--, m = 0, k.forEach(function(b) {
        return b.scroller === s.scroller && (m = 1);
      }), m || Fe || (s.scroll.rec = 0), r && (r.scrollTrigger = null, p && r.revert({
        kill: !1
      }), S || r.kill()), ze && [ze, Xe, u, Be].forEach(function(b) {
        return b.parentNode && b.parentNode.removeChild(b);
      }), kr === s && (kr = 0), c && (ve && (ve.uncache = 1), m = 0, k.forEach(function(b) {
        return b.pin === c && m++;
      }), m || (ve.spacer = 0)), t.onKill && t.onKill(s);
    }, k.push(s), s.enable(!1, !1), _t && _t(s), r && r.add && !ee) {
      var Y = s.update;
      s.update = function() {
        s.update = Y, A || V || s.refresh();
      }, d.delayedCall(0.01, s.update), ee = 0.01, A = V = 0;
    } else
      s.refresh();
    c && Mi();
  }, o.register = function(t) {
    return jt || (d = t || ai(), si() && window.document && o.enable(), jt = gr), jt;
  }, o.defaults = function(t) {
    if (t)
      for (var r in t)
        Nr[r] = t[r];
    return Nr;
  }, o.disable = function(t, r) {
    gr = 0, k.forEach(function(l) {
      return l[r ? "kill" : "disable"](t);
    }), fe(R, "wheel", Qt), fe(G, "scroll", Qt), clearInterval(Fr), fe(G, "touchcancel", ut), fe(N, "touchstart", ut), Lr(fe, G, "pointerdown,touchstart,mousedown", Fn), Lr(fe, G, "pointerup,touchend,mouseup", Yn), Jr.kill(), Ir(fe);
    for (var i = 0; i < E.length; i += 3)
      zr(fe, E[i], E[i + 1]), zr(fe, E[i], E[i + 2]);
  }, o.enable = function() {
    if (R = window, G = document, ot = G.documentElement, N = G.body, d && (Pr = d.utils.toArray, wr = d.utils.clamp, _n = d.core.context || ut, nn = d.core.suppressOverwrites || ut, wn = R.history.scrollRestoration || "auto", xn = R.pageYOffset, d.core.globals("ScrollTrigger", o), N)) {
      gr = 1, nr = document.createElement("div"), nr.style.height = "100vh", nr.style.position = "absolute", _i(), bi(), Z.register(d), o.isTouch = Z.isTouch, Pt = Z.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), hn = Z.isTouch === 1, pe(R, "wheel", Qt), ti = [R, G, ot, N], d.matchMedia ? (o.matchMedia = function(f) {
        var x = d.matchMedia(), F;
        for (F in f)
          x.add(F, f[F]);
        return x;
      }, d.addEventListener("matchMediaInit", function() {
        return Pn();
      }), d.addEventListener("matchMediaRevert", function() {
        return gi();
      }), d.addEventListener("matchMedia", function() {
        Xt(0, 1), $t("matchMedia");
      }), d.matchMedia("(orientation: portrait)", function() {
        return ln(), ln;
      })) : console.warn("Requires GSAP 3.11.0 or later"), ln(), pe(G, "scroll", Qt);
      var t = N.style, r = t.borderTopStyle, i = d.core.Animation.prototype, l, a;
      for (i.revert || Object.defineProperty(i, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), t.borderTopStyle = "solid", l = mt(N), le.m = Math.round(l.top + le.sc()) || 0, Ye.m = Math.round(l.left + Ye.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), Fr = setInterval(zn, 250), d.delayedCall(0.5, function() {
        return Yr = 0;
      }), pe(G, "touchcancel", ut), pe(N, "touchstart", ut), Lr(pe, G, "pointerdown,touchstart,mousedown", Fn), Lr(pe, G, "pointerup,touchend,mouseup", Yn), gn = d.utils.checkPrefix("transform"), qr.push(gn), jt = Ce(), Jr = d.delayedCall(0.2, Xt).pause(), er = [G, "visibilitychange", function() {
        var f = R.innerWidth, x = R.innerHeight;
        G.hidden ? (Dn = f, Rn = x) : (Dn !== f || Rn !== x) && mr();
      }, G, "DOMContentLoaded", Xt, R, "load", Xt, R, "resize", mr], Ir(pe), k.forEach(function(f) {
        return f.enable(0, 1);
      }), a = 0; a < E.length; a += 3)
        zr(fe, E[a], E[a + 1]), zr(fe, E[a], E[a + 2]);
    }
  }, o.config = function(t) {
    "limitCallbacks" in t && (on = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(Fr) || (Fr = r) && setInterval(zn, r), "ignoreMobileResize" in t && (hn = o.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Ir(fe) || Ir(pe, t.autoRefreshEvents || "none"), ni = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, o.scrollerProxy = function(t, r) {
    var i = Ne(t), l = E.indexOf(i), a = Gt(i);
    ~l && E.splice(l, a ? 6 : 2), r && (a ? ft.unshift(R, r, N, r, ot, r) : ft.unshift(i, r));
  }, o.clearMatchMedia = function(t) {
    k.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, o.isInViewport = function(t, r, i) {
    var l = (Ge(t) ? Ne(t) : t).getBoundingClientRect(), a = l[i ? Bt : Ht] * r || 0;
    return i ? l.right - a > 0 && l.left + a < R.innerWidth : l.bottom - a > 0 && l.top + a < R.innerHeight;
  }, o.positionInViewport = function(t, r, i) {
    Ge(t) && (t = Ne(t));
    var l = t.getBoundingClientRect(), a = l[i ? Bt : Ht], f = r == null ? a / 2 : r in en ? en[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
    return i ? (l.left + f) / R.innerWidth : (l.top + f) / R.innerHeight;
  }, o.killAll = function(t) {
    if (k.slice(0).forEach(function(i) {
      return i.vars.id !== "ScrollSmoother" && i.kill();
    }), t !== !0) {
      var r = Ut.killAll || [];
      Ut = {}, r.forEach(function(i) {
        return i();
      });
    }
  }, o;
}();
M.version = "3.12.5";
M.saveStyles = function(o) {
  return o ? Pr(o).forEach(function(e) {
    if (e && e.style) {
      var n = We.indexOf(e);
      n >= 0 && We.splice(n, 5), We.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), d.core.getCache(e), _n());
    }
  }) : We;
};
M.revert = function(o, e) {
  return Pn(!o, e);
};
M.create = function(o, e) {
  return new M(o, e);
};
M.refresh = function(o) {
  return o ? mr() : (jt || M.register()) && Xt(!0);
};
M.update = function(o) {
  return ++E.cache && xt(o === !0 ? 2 : 0);
};
M.clearScrollMemory = hi;
M.maxScroll = function(o, e) {
  return ct(o, e ? Ye : le);
};
M.getScrollFunc = function(o, e) {
  return Rt(Ne(o), e ? Ye : le);
};
M.getById = function(o) {
  return vn[o];
};
M.getAll = function() {
  return k.filter(function(o) {
    return o.vars.id !== "ScrollSmoother";
  });
};
M.isScrolling = function() {
  return !!Je;
};
M.snapDirectional = kn;
M.addEventListener = function(o, e) {
  var n = Ut[o] || (Ut[o] = []);
  ~n.indexOf(e) || n.push(e);
};
M.removeEventListener = function(o, e) {
  var n = Ut[o], t = n && n.indexOf(e);
  t >= 0 && n.splice(t, 1);
};
M.batch = function(o, e) {
  var n = [], t = {}, r = e.interval || 0.016, i = e.batchMax || 1e9, l = function(x, F) {
    var O = [], h = [], c = d.delayedCall(r, function() {
      F(O, h), O = [], h = [];
    }).pause();
    return function(_) {
      O.length || c.restart(!0), O.push(_.trigger), h.push(_), i <= O.length && c.progress(1);
    };
  }, a;
  for (a in e)
    t[a] = a.substr(0, 2) === "on" && Ie(e[a]) && a !== "onRefreshInit" ? l(a, e[a]) : e[a];
  return Ie(i) && (i = i(), pe(M, "refresh", function() {
    return i = e.batchMax();
  })), Pr(o).forEach(function(f) {
    var x = {};
    for (a in t)
      x[a] = t[a];
    x.trigger = f, n.push(M.create(x));
  }), n;
};
var Gn = function(e, n, t, r) {
  return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
}, cn = function o(e, n) {
  n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (Z.isTouch ? " pinch-zoom" : "") : "none", e === ot && o(N, n);
}, Wr = {
  auto: 1,
  scroll: 1
}, Fi = function(e) {
  var n = e.event, t = e.target, r = e.axis, i = (n.changedTouches ? n.changedTouches[0] : n).target, l = i._gsap || d.core.getCache(i), a = Ce(), f;
  if (!l._isScrollT || a - l._isScrollT > 2e3) {
    for (; i && i !== N && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(Wr[(f = Ze(i)).overflowY] || Wr[f.overflowX])); )
      i = i.parentNode;
    l._isScroll = i && i !== t && !Gt(i) && (Wr[(f = Ze(i)).overflowY] || Wr[f.overflowX]), l._isScrollT = a;
  }
  (l._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
}, vi = function(e, n, t, r) {
  return Z.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: n,
    onWheel: r = r && Fi,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return t && pe(G, Z.eventTypes[0], $n, !1, !0);
    },
    onDisable: function() {
      return fe(G, Z.eventTypes[0], $n, !0);
    }
  });
}, Yi = /(input|label|select|textarea)/i, Un, $n = function(e) {
  var n = Yi.test(e.target.tagName);
  (n || Un) && (e._gsapAllow = !0, Un = n);
}, Ii = function(e) {
  Nt(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var n = e, t = n.normalizeScrollX, r = n.momentum, i = n.allowNestedScroll, l = n.onRelease, a, f, x = Ne(e.target) || ot, F = d.core.globals().ScrollSmoother, O = F && F.get(), h = Pt && (e.content && Ne(e.content) || O && e.content !== !1 && !O.smooth() && O.content()), c = Rt(x, le), _ = Rt(x, Ye), U = 1, z = (Z.isTouch && R.visualViewport ? R.visualViewport.scale * R.visualViewport.width : R.outerWidth) / R.innerWidth, ne = 0, H = Ie(r) ? function() {
    return r(a);
  } : function() {
    return r || 2.8;
  }, de, T, $e = vi(x, e.type, !0, i), X = function() {
    return T = !1;
  }, w = ut, Se = ut, Le = function() {
    f = ct(x, le), Se = wr(Pt ? 1 : 0, f), t && (w = wr(0, ct(x, Ye))), de = Wt;
  }, g = function() {
    h._gsap.y = hr(parseFloat(h._gsap.y) + c.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, ge = function() {
    if (T) {
      requestAnimationFrame(X);
      var J = hr(a.deltaY / 2), Q = Se(c.v - J);
      if (h && Q !== c.v + c.offset) {
        c.offset = Q - c.v;
        var s = hr((parseFloat(h && h._gsap.y) || 0) - c.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + s + ", 0, 1)", h._gsap.y = s + "px", c.cacheID = E.cache, xt();
      }
      return !0;
    }
    c.offset && g(), T = !0;
  }, y, pt, ie, Te, ke = function() {
    Le(), y.isActive() && y.vars.scrollY > f && (c() > f ? y.progress(1) && c(f) : y.resetTo("scrollY", f));
  };
  return h && d.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(I) {
    return Pt && I.type === "touchmove" && ge() || U > 1.05 && I.type !== "touchstart" || a.isGesturing || I.touches && I.touches.length > 1;
  }, e.onPress = function() {
    T = !1;
    var I = U;
    U = hr((R.visualViewport && R.visualViewport.scale || 1) / z), y.pause(), I !== U && cn(x, U > 1.01 ? !0 : t ? !1 : "x"), pt = _(), ie = c(), Le(), de = Wt;
  }, e.onRelease = e.onGestureStart = function(I, J) {
    if (c.offset && g(), !J)
      Te.restart(!0);
    else {
      E.cache++;
      var Q = H(), s, oe;
      t && (s = _(), oe = s + Q * 0.05 * -I.velocityX / 0.227, Q *= Gn(_, s, oe, ct(x, Ye)), y.vars.scrollX = w(oe)), s = c(), oe = s + Q * 0.05 * -I.velocityY / 0.227, Q *= Gn(c, s, oe, ct(x, le)), y.vars.scrollY = Se(oe), y.invalidate().duration(Q).play(0.01), (Pt && y.vars.scrollY >= f || s >= f - 1) && d.to({}, {
        onUpdate: ke,
        duration: Q
      });
    }
    l && l(I);
  }, e.onWheel = function() {
    y._ts && y.pause(), Ce() - ne > 1e3 && (de = 0, ne = Ce());
  }, e.onChange = function(I, J, Q, s, oe) {
    if (Wt !== de && Le(), J && t && _(w(s[2] === J ? pt + (I.startX - I.x) : _() + J - s[1])), Q) {
      c.offset && g();
      var Ot = oe[2] === Q, yt = Ot ? ie + I.startY - I.y : c() + Q - oe[1], Ve = Se(yt);
      Ot && yt !== Ve && (ie += Ve - yt), c(Ve);
    }
    (Q || J) && xt();
  }, e.onEnable = function() {
    cn(x, t ? !1 : "x"), M.addEventListener("refresh", ke), pe(R, "resize", ke), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = _.smooth = !1), $e.enable();
  }, e.onDisable = function() {
    cn(x, !0), fe(R, "resize", ke), M.removeEventListener("refresh", ke), $e.kill();
  }, e.lockAxis = e.lockAxis !== !1, a = new Z(e), a.iOS = Pt, Pt && !c() && c(1), Pt && d.ticker.add(ut), Te = a._dc, y = d.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: mi(c, c(), function() {
        return y.pause();
      })
    },
    onUpdate: xt,
    onComplete: Te.vars.onComplete
  }), a;
};
M.sort = function(o) {
  return k.sort(o || function(e, n) {
    return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
  });
};
M.observe = function(o) {
  return new Z(o);
};
M.normalizeScroll = function(o) {
  if (typeof o > "u")
    return Oe;
  if (o === !0 && Oe)
    return Oe.enable();
  if (o === !1) {
    Oe && Oe.kill(), Oe = o;
    return;
  }
  var e = o instanceof Z ? o : Ii(o);
  return Oe && Oe.target === e.target && Oe.kill(), Gt(e.target) && (Oe = e), e;
};
M.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: dn,
  _inputObserver: vi,
  _scrollers: E,
  _proxies: ft,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Je || $t("scrollStart"), Je = Ce();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return be;
    }
  }
};
ai() && d.registerPlugin(M);
Vn.registerPlugin(M);
class zi {
  constructor({
    element: e,
    endValue: n = 1e3,
    duration: t = 2,
    regionFormat: r = "en-US",
    separator: i = ",",
    start: l = "top top",
    markers: a = !1,
    easing: f = "power1.out",
    autoPlay: x = !1,
    playOnce: F = !1
    // Nuevo parámetro para activar solo una vez
  }) {
    if (!e) throw new Error("El 'element' es obligatorio.");
    this.element = e, this.endValue = n, this.duration = t, this.regionFormat = r, this.separator = i, this.start = l, this.markers = a, this.easing = f, this.autoPlay = x, this.playOnce = F, this.counterStarted = !1, this.scrollTrigger = null, this.init();
  }
  init() {
    this.autoPlay && (this.scrollTrigger = M.create({
      trigger: this.element,
      start: this.start,
      onEnter: () => this.handlePlay(),
      markers: this.markers
    }));
  }
  handlePlay() {
    (!this.counterStarted || !this.playOnce) && this.startCounter();
  }
  play() {
    this.handlePlay();
  }
  startCounter() {
    this.counterStarted = !0;
    const e = 0, n = this;
    Vn.to({ value: e }, {
      value: this.endValue,
      duration: this.duration,
      ease: this.easing,
      onUpdate: function() {
        n.element.textContent = n.formatNumber(this.targets()[0].value);
      },
      onComplete: () => {
        this.playOnce && this.scrollTrigger && (this.scrollTrigger.kill(), this.scrollTrigger = null), this.counterStarted = !1;
      }
    });
  }
  formatNumber(e) {
    return new Intl.NumberFormat(this.regionFormat, {
      useGrouping: !0,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(e).replace(/,/g, this.separator);
  }
}
export {
  zi as default
};
