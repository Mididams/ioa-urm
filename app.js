(() => {
  var qm = Object.create;
  var Xc = Object.defineProperty;
  var Cm = Object.getOwnPropertyDescriptor;
  var Bm = Object.getOwnPropertyNames;
  var Ym = Object.getPrototypeOf,
    Gm = Object.prototype.hasOwnProperty;
  var Dt = (l, t) => () => (
    t || l((t = { exports: {} }).exports, t),
    t.exports
  );
  var Xm = (l, t, u, a) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Bm(t))
        !Gm.call(l, n) &&
          n !== u &&
          Xc(l, n, {
            get: () => t[n],
            enumerable: !(a = Cm(t, n)) || a.enumerable,
          });
    return l;
  };
  var bn = (l, t, u) => (
    (u = l != null ? qm(Ym(l)) : {}),
    Xm(
      t || !l || !l.__esModule
        ? Xc(u, "default", { value: l, enumerable: !0 })
        : u,
      l,
    )
  );
  var Wc = Dt((U) => {
    "use strict";
    var ke = Symbol.for("react.transitional.element"),
      Qm = Symbol.for("react.portal"),
      Rm = Symbol.for("react.fragment"),
      jm = Symbol.for("react.strict_mode"),
      Zm = Symbol.for("react.profiler"),
      Vm = Symbol.for("react.consumer"),
      xm = Symbol.for("react.context"),
      Lm = Symbol.for("react.forward_ref"),
      Km = Symbol.for("react.suspense"),
      Jm = Symbol.for("react.memo"),
      Vc = Symbol.for("react.lazy"),
      wm = Symbol.for("react.activity"),
      Qc = Symbol.iterator;
    function Wm(l) {
      return l === null || typeof l != "object"
        ? null
        : ((l = (Qc && l[Qc]) || l["@@iterator"]),
          typeof l == "function" ? l : null);
    }
    var xc = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      Lc = Object.assign,
      Kc = {};
    function Ou(l, t, u) {
      ((this.props = l),
        (this.context = t),
        (this.refs = Kc),
        (this.updater = u || xc));
    }
    Ou.prototype.isReactComponent = {};
    Ou.prototype.setState = function (l, t) {
      if (typeof l != "object" && typeof l != "function" && l != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, l, t, "setState");
    };
    Ou.prototype.forceUpdate = function (l) {
      this.updater.enqueueForceUpdate(this, l, "forceUpdate");
    };
    function Jc() {}
    Jc.prototype = Ou.prototype;
    function Ie(l, t, u) {
      ((this.props = l),
        (this.context = t),
        (this.refs = Kc),
        (this.updater = u || xc));
    }
    var Pe = (Ie.prototype = new Jc());
    Pe.constructor = Ie;
    Lc(Pe, Ou.prototype);
    Pe.isPureReactComponent = !0;
    var Rc = Array.isArray;
    function Fe() {}
    var K = { H: null, A: null, T: null, S: null },
      wc = Object.prototype.hasOwnProperty;
    function lf(l, t, u) {
      var a = u.ref;
      return {
        $$typeof: ke,
        type: l,
        key: t,
        ref: a !== void 0 ? a : null,
        props: u,
      };
    }
    function $m(l, t) {
      return lf(l.type, t, l.props);
    }
    function tf(l) {
      return typeof l == "object" && l !== null && l.$$typeof === ke;
    }
    function Fm(l) {
      var t = { "=": "=0", ":": "=2" };
      return (
        "$" +
        l.replace(/[=:]/g, function (u) {
          return t[u];
        })
      );
    }
    var jc = /\/+/g;
    function $e(l, t) {
      return typeof l == "object" && l !== null && l.key != null
        ? Fm("" + l.key)
        : t.toString(36);
    }
    function km(l) {
      switch (l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw l.reason;
        default:
          switch (
            (typeof l.status == "string"
              ? l.then(Fe, Fe)
              : ((l.status = "pending"),
                l.then(
                  function (t) {
                    l.status === "pending" &&
                      ((l.status = "fulfilled"), (l.value = t));
                  },
                  function (t) {
                    l.status === "pending" &&
                      ((l.status = "rejected"), (l.reason = t));
                  },
                )),
            l.status)
          ) {
            case "fulfilled":
              return l.value;
            case "rejected":
              throw l.reason;
          }
      }
      throw l;
    }
    function Au(l, t, u, a, n) {
      var e = typeof l;
      (e === "undefined" || e === "boolean") && (l = null);
      var f = !1;
      if (l === null) f = !0;
      else
        switch (e) {
          case "bigint":
          case "string":
          case "number":
            f = !0;
            break;
          case "object":
            switch (l.$$typeof) {
              case ke:
              case Qm:
                f = !0;
                break;
              case Vc:
                return ((f = l._init), Au(f(l._payload), t, u, a, n));
            }
        }
      if (f)
        return (
          (n = n(l)),
          (f = a === "" ? "." + $e(l, 0) : a),
          Rc(n)
            ? ((u = ""),
              f != null && (u = f.replace(jc, "$&/") + "/"),
              Au(n, t, u, "", function (m) {
                return m;
              }))
            : n != null &&
              (tf(n) &&
                (n = $m(
                  n,
                  u +
                    (n.key == null || (l && l.key === n.key)
                      ? ""
                      : ("" + n.key).replace(jc, "$&/") + "/") +
                    f,
                )),
              t.push(n)),
          1
        );
      f = 0;
      var i = a === "" ? "." : a + ":";
      if (Rc(l))
        for (var c = 0; c < l.length; c++)
          ((a = l[c]), (e = i + $e(a, c)), (f += Au(a, t, u, e, n)));
      else if (((c = Wm(l)), typeof c == "function"))
        for (l = c.call(l), c = 0; !(a = l.next()).done; )
          ((a = a.value), (e = i + $e(a, c++)), (f += Au(a, t, u, e, n)));
      else if (e === "object") {
        if (typeof l.then == "function") return Au(km(l), t, u, a, n);
        throw (
          (t = String(l)),
          Error(
            "Objects are not valid as a React child (found: " +
              (t === "[object Object]"
                ? "object with keys {" + Object.keys(l).join(", ") + "}"
                : t) +
              "). If you meant to render a collection of children, use an array instead.",
          )
        );
      }
      return f;
    }
    function zn(l, t, u) {
      if (l == null) return l;
      var a = [],
        n = 0;
      return (
        Au(l, a, "", "", function (e) {
          return t.call(u, e, n++);
        }),
        a
      );
    }
    function Im(l) {
      if (l._status === -1) {
        var t = l._result;
        ((t = t()),
          t.then(
            function (u) {
              (l._status === 0 || l._status === -1) &&
                ((l._status = 1), (l._result = u));
            },
            function (u) {
              (l._status === 0 || l._status === -1) &&
                ((l._status = 2), (l._result = u));
            },
          ),
          l._status === -1 && ((l._status = 0), (l._result = t)));
      }
      if (l._status === 1) return l._result.default;
      throw l._result;
    }
    var Zc =
        typeof reportError == "function"
          ? reportError
          : function (l) {
              if (
                typeof window == "object" &&
                typeof window.ErrorEvent == "function"
              ) {
                var t = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof l == "object" &&
                    l !== null &&
                    typeof l.message == "string"
                      ? String(l.message)
                      : String(l),
                  error: l,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (
                typeof process == "object" &&
                typeof process.emit == "function"
              ) {
                process.emit("uncaughtException", l);
                return;
              }
              console.error(l);
            },
      Pm = {
        map: zn,
        forEach: function (l, t, u) {
          zn(
            l,
            function () {
              t.apply(this, arguments);
            },
            u,
          );
        },
        count: function (l) {
          var t = 0;
          return (
            zn(l, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (l) {
          return (
            zn(l, function (t) {
              return t;
            }) || []
          );
        },
        only: function (l) {
          if (!tf(l))
            throw Error(
              "React.Children.only expected to receive a single React element child.",
            );
          return l;
        },
      };
    U.Activity = wm;
    U.Children = Pm;
    U.Component = Ou;
    U.Fragment = Rm;
    U.Profiler = Zm;
    U.PureComponent = Ie;
    U.StrictMode = jm;
    U.Suspense = Km;
    U.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K;
    U.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (l) {
        return K.H.useMemoCache(l);
      },
    };
    U.cache = function (l) {
      return function () {
        return l.apply(null, arguments);
      };
    };
    U.cacheSignal = function () {
      return null;
    };
    U.cloneElement = function (l, t, u) {
      if (l == null)
        throw Error(
          "The argument must be a React element, but you passed " + l + ".",
        );
      var a = Lc({}, l.props),
        n = l.key;
      if (t != null)
        for (e in (t.key !== void 0 && (n = "" + t.key), t))
          !wc.call(t, e) ||
            e === "key" ||
            e === "__self" ||
            e === "__source" ||
            (e === "ref" && t.ref === void 0) ||
            (a[e] = t[e]);
      var e = arguments.length - 2;
      if (e === 1) a.children = u;
      else if (1 < e) {
        for (var f = Array(e), i = 0; i < e; i++) f[i] = arguments[i + 2];
        a.children = f;
      }
      return lf(l.type, n, a);
    };
    U.createContext = function (l) {
      return (
        (l = {
          $$typeof: xm,
          _currentValue: l,
          _currentValue2: l,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (l.Provider = l),
        (l.Consumer = { $$typeof: Vm, _context: l }),
        l
      );
    };
    U.createElement = function (l, t, u) {
      var a,
        n = {},
        e = null;
      if (t != null)
        for (a in (t.key !== void 0 && (e = "" + t.key), t))
          wc.call(t, a) &&
            a !== "key" &&
            a !== "__self" &&
            a !== "__source" &&
            (n[a] = t[a]);
      var f = arguments.length - 2;
      if (f === 1) n.children = u;
      else if (1 < f) {
        for (var i = Array(f), c = 0; c < f; c++) i[c] = arguments[c + 2];
        n.children = i;
      }
      if (l && l.defaultProps)
        for (a in ((f = l.defaultProps), f)) n[a] === void 0 && (n[a] = f[a]);
      return lf(l, e, n);
    };
    U.createRef = function () {
      return { current: null };
    };
    U.forwardRef = function (l) {
      return { $$typeof: Lm, render: l };
    };
    U.isValidElement = tf;
    U.lazy = function (l) {
      return { $$typeof: Vc, _payload: { _status: -1, _result: l }, _init: Im };
    };
    U.memo = function (l, t) {
      return { $$typeof: Jm, type: l, compare: t === void 0 ? null : t };
    };
    U.startTransition = function (l) {
      var t = K.T,
        u = {};
      K.T = u;
      try {
        var a = l(),
          n = K.S;
        (n !== null && n(u, a),
          typeof a == "object" &&
            a !== null &&
            typeof a.then == "function" &&
            a.then(Fe, Zc));
      } catch (e) {
        Zc(e);
      } finally {
        (t !== null && u.types !== null && (t.types = u.types), (K.T = t));
      }
    };
    U.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    };
    U.use = function (l) {
      return K.H.use(l);
    };
    U.useActionState = function (l, t, u) {
      return K.H.useActionState(l, t, u);
    };
    U.useCallback = function (l, t) {
      return K.H.useCallback(l, t);
    };
    U.useContext = function (l) {
      return K.H.useContext(l);
    };
    U.useDebugValue = function () {};
    U.useDeferredValue = function (l, t) {
      return K.H.useDeferredValue(l, t);
    };
    U.useEffect = function (l, t) {
      return K.H.useEffect(l, t);
    };
    U.useEffectEvent = function (l) {
      return K.H.useEffectEvent(l);
    };
    U.useId = function () {
      return K.H.useId();
    };
    U.useImperativeHandle = function (l, t, u) {
      return K.H.useImperativeHandle(l, t, u);
    };
    U.useInsertionEffect = function (l, t) {
      return K.H.useInsertionEffect(l, t);
    };
    U.useLayoutEffect = function (l, t) {
      return K.H.useLayoutEffect(l, t);
    };
    U.useMemo = function (l, t) {
      return K.H.useMemo(l, t);
    };
    U.useOptimistic = function (l, t) {
      return K.H.useOptimistic(l, t);
    };
    U.useReducer = function (l, t, u) {
      return K.H.useReducer(l, t, u);
    };
    U.useRef = function (l) {
      return K.H.useRef(l);
    };
    U.useState = function (l) {
      return K.H.useState(l);
    };
    U.useSyncExternalStore = function (l, t, u) {
      return K.H.useSyncExternalStore(l, t, u);
    };
    U.useTransition = function () {
      return K.H.useTransition();
    };
    U.version = "19.2.6";
  });
  var _u = Dt((rh, $c) => {
    "use strict";
    $c.exports = Wc();
  });
  var e0 = Dt(($) => {
    "use strict";
    function ef(l, t) {
      var u = l.length;
      l.push(t);
      l: for (; 0 < u; ) {
        var a = (u - 1) >>> 1,
          n = l[a];
        if (0 < En(n, t)) ((l[a] = t), (l[u] = n), (u = a));
        else break l;
      }
    }
    function Pl(l) {
      return l.length === 0 ? null : l[0];
    }
    function An(l) {
      if (l.length === 0) return null;
      var t = l[0],
        u = l.pop();
      if (u !== t) {
        l[0] = u;
        l: for (var a = 0, n = l.length, e = n >>> 1; a < e; ) {
          var f = 2 * (a + 1) - 1,
            i = l[f],
            c = f + 1,
            m = l[c];
          if (0 > En(i, u))
            c < n && 0 > En(m, i)
              ? ((l[a] = m), (l[c] = u), (a = c))
              : ((l[a] = i), (l[f] = u), (a = f));
          else if (c < n && 0 > En(m, u)) ((l[a] = m), (l[c] = u), (a = c));
          else break l;
        }
      }
      return t;
    }
    function En(l, t) {
      var u = l.sortIndex - t.sortIndex;
      return u !== 0 ? u : l.id - t.id;
    }
    $.unstable_now = void 0;
    typeof performance == "object" && typeof performance.now == "function"
      ? ((Fc = performance),
        ($.unstable_now = function () {
          return Fc.now();
        }))
      : ((uf = Date),
        (kc = uf.now()),
        ($.unstable_now = function () {
          return uf.now() - kc;
        }));
    var Fc,
      uf,
      kc,
      ft = [],
      Ut = [],
      ld = 1,
      Rl = null,
      Sl = 3,
      ff = !1,
      oa = !1,
      Sa = !1,
      cf = !1,
      l0 = typeof setTimeout == "function" ? setTimeout : null,
      t0 = typeof clearTimeout == "function" ? clearTimeout : null,
      Ic = typeof setImmediate < "u" ? setImmediate : null;
    function Tn(l) {
      for (var t = Pl(Ut); t !== null; ) {
        if (t.callback === null) An(Ut);
        else if (t.startTime <= l)
          (An(Ut), (t.sortIndex = t.expirationTime), ef(ft, t));
        else break;
        t = Pl(Ut);
      }
    }
    function yf(l) {
      if (((Sa = !1), Tn(l), !oa))
        if (Pl(ft) !== null) ((oa = !0), Du || ((Du = !0), Mu()));
        else {
          var t = Pl(Ut);
          t !== null && vf(yf, t.startTime - l);
        }
    }
    var Du = !1,
      ga = -1,
      u0 = 5,
      a0 = -1;
    function n0() {
      return cf ? !0 : !($.unstable_now() - a0 < u0);
    }
    function af() {
      if (((cf = !1), Du)) {
        var l = $.unstable_now();
        a0 = l;
        var t = !0;
        try {
          l: {
            ((oa = !1), Sa && ((Sa = !1), t0(ga), (ga = -1)), (ff = !0));
            var u = Sl;
            try {
              t: {
                for (
                  Tn(l), Rl = Pl(ft);
                  Rl !== null && !(Rl.expirationTime > l && n0());
                ) {
                  var a = Rl.callback;
                  if (typeof a == "function") {
                    ((Rl.callback = null), (Sl = Rl.priorityLevel));
                    var n = a(Rl.expirationTime <= l);
                    if (((l = $.unstable_now()), typeof n == "function")) {
                      ((Rl.callback = n), Tn(l), (t = !0));
                      break t;
                    }
                    (Rl === Pl(ft) && An(ft), Tn(l));
                  } else An(ft);
                  Rl = Pl(ft);
                }
                if (Rl !== null) t = !0;
                else {
                  var e = Pl(Ut);
                  (e !== null && vf(yf, e.startTime - l), (t = !1));
                }
              }
              break l;
            } finally {
              ((Rl = null), (Sl = u), (ff = !1));
            }
            t = void 0;
          }
        } finally {
          t ? Mu() : (Du = !1);
        }
      }
    }
    var Mu;
    typeof Ic == "function"
      ? (Mu = function () {
          Ic(af);
        })
      : typeof MessageChannel < "u"
        ? ((nf = new MessageChannel()),
          (Pc = nf.port2),
          (nf.port1.onmessage = af),
          (Mu = function () {
            Pc.postMessage(null);
          }))
        : (Mu = function () {
            l0(af, 0);
          });
    var nf, Pc;
    function vf(l, t) {
      ga = l0(function () {
        l($.unstable_now());
      }, t);
    }
    $.unstable_IdlePriority = 5;
    $.unstable_ImmediatePriority = 1;
    $.unstable_LowPriority = 4;
    $.unstable_NormalPriority = 3;
    $.unstable_Profiling = null;
    $.unstable_UserBlockingPriority = 2;
    $.unstable_cancelCallback = function (l) {
      l.callback = null;
    };
    $.unstable_forceFrameRate = function (l) {
      0 > l || 125 < l
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (u0 = 0 < l ? Math.floor(1e3 / l) : 5);
    };
    $.unstable_getCurrentPriorityLevel = function () {
      return Sl;
    };
    $.unstable_next = function (l) {
      switch (Sl) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = Sl;
      }
      var u = Sl;
      Sl = t;
      try {
        return l();
      } finally {
        Sl = u;
      }
    };
    $.unstable_requestPaint = function () {
      cf = !0;
    };
    $.unstable_runWithPriority = function (l, t) {
      switch (l) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          l = 3;
      }
      var u = Sl;
      Sl = l;
      try {
        return t();
      } finally {
        Sl = u;
      }
    };
    $.unstable_scheduleCallback = function (l, t, u) {
      var a = $.unstable_now();
      switch (
        (typeof u == "object" && u !== null
          ? ((u = u.delay), (u = typeof u == "number" && 0 < u ? a + u : a))
          : (u = a),
        l)
      ) {
        case 1:
          var n = -1;
          break;
        case 2:
          n = 250;
          break;
        case 5:
          n = 1073741823;
          break;
        case 4:
          n = 1e4;
          break;
        default:
          n = 5e3;
      }
      return (
        (n = u + n),
        (l = {
          id: ld++,
          callback: t,
          priorityLevel: l,
          startTime: u,
          expirationTime: n,
          sortIndex: -1,
        }),
        u > a
          ? ((l.sortIndex = u),
            ef(Ut, l),
            Pl(ft) === null &&
              l === Pl(Ut) &&
              (Sa ? (t0(ga), (ga = -1)) : (Sa = !0), vf(yf, u - a)))
          : ((l.sortIndex = n),
            ef(ft, l),
            oa || ff || ((oa = !0), Du || ((Du = !0), Mu()))),
        l
      );
    };
    $.unstable_shouldYield = n0;
    $.unstable_wrapCallback = function (l) {
      var t = Sl;
      return function () {
        var u = Sl;
        Sl = t;
        try {
          return l.apply(this, arguments);
        } finally {
          Sl = u;
        }
      };
    };
  });
  var i0 = Dt((Ch, f0) => {
    "use strict";
    f0.exports = e0();
  });
  var y0 = Dt((bl) => {
    "use strict";
    var td = _u();
    function c0(l) {
      var t = "https://react.dev/errors/" + l;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var u = 2; u < arguments.length; u++)
          t += "&args[]=" + encodeURIComponent(arguments[u]);
      }
      return (
        "Minified React error #" +
        l +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function pt() {}
    var gl = {
        d: {
          f: pt,
          r: function () {
            throw Error(c0(522));
          },
          D: pt,
          C: pt,
          L: pt,
          m: pt,
          X: pt,
          S: pt,
          M: pt,
        },
        p: 0,
        findDOMNode: null,
      },
      ud = Symbol.for("react.portal");
    function ad(l, t, u) {
      var a =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: ud,
        key: a == null ? null : "" + a,
        children: l,
        containerInfo: t,
        implementation: u,
      };
    }
    var ba = td.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function On(l, t) {
      if (l === "font") return "";
      if (typeof t == "string") return t === "use-credentials" ? t : "";
    }
    bl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = gl;
    bl.createPortal = function (l, t) {
      var u =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
        throw Error(c0(299));
      return ad(l, t, null, u);
    };
    bl.flushSync = function (l) {
      var t = ba.T,
        u = gl.p;
      try {
        if (((ba.T = null), (gl.p = 2), l)) return l();
      } finally {
        ((ba.T = t), (gl.p = u), gl.d.f());
      }
    };
    bl.preconnect = function (l, t) {
      typeof l == "string" &&
        (t
          ? ((t = t.crossOrigin),
            (t =
              typeof t == "string"
                ? t === "use-credentials"
                  ? t
                  : ""
                : void 0))
          : (t = null),
        gl.d.C(l, t));
    };
    bl.prefetchDNS = function (l) {
      typeof l == "string" && gl.d.D(l);
    };
    bl.preinit = function (l, t) {
      if (typeof l == "string" && t && typeof t.as == "string") {
        var u = t.as,
          a = On(u, t.crossOrigin),
          n = typeof t.integrity == "string" ? t.integrity : void 0,
          e = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
        u === "style"
          ? gl.d.S(l, typeof t.precedence == "string" ? t.precedence : void 0, {
              crossOrigin: a,
              integrity: n,
              fetchPriority: e,
            })
          : u === "script" &&
            gl.d.X(l, {
              crossOrigin: a,
              integrity: n,
              fetchPriority: e,
              nonce: typeof t.nonce == "string" ? t.nonce : void 0,
            });
      }
    };
    bl.preinitModule = function (l, t) {
      if (typeof l == "string")
        if (typeof t == "object" && t !== null) {
          if (t.as == null || t.as === "script") {
            var u = On(t.as, t.crossOrigin);
            gl.d.M(l, {
              crossOrigin: u,
              integrity: typeof t.integrity == "string" ? t.integrity : void 0,
              nonce: typeof t.nonce == "string" ? t.nonce : void 0,
            });
          }
        } else t == null && gl.d.M(l);
    };
    bl.preload = function (l, t) {
      if (
        typeof l == "string" &&
        typeof t == "object" &&
        t !== null &&
        typeof t.as == "string"
      ) {
        var u = t.as,
          a = On(u, t.crossOrigin);
        gl.d.L(l, u, {
          crossOrigin: a,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
          type: typeof t.type == "string" ? t.type : void 0,
          fetchPriority:
            typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
          referrerPolicy:
            typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
          imageSrcSet:
            typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
          imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
          media: typeof t.media == "string" ? t.media : void 0,
        });
      }
    };
    bl.preloadModule = function (l, t) {
      if (typeof l == "string")
        if (t) {
          var u = On(t.as, t.crossOrigin);
          gl.d.m(l, {
            as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
            crossOrigin: u,
            integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          });
        } else gl.d.m(l);
    };
    bl.requestFormReset = function (l) {
      gl.d.r(l);
    };
    bl.unstable_batchedUpdates = function (l, t) {
      return l(t);
    };
    bl.useFormState = function (l, t, u) {
      return ba.H.useFormState(l, t, u);
    };
    bl.useFormStatus = function () {
      return ba.H.useHostTransitionStatus();
    };
    bl.version = "19.2.6";
  });
  var d0 = Dt((Yh, m0) => {
    "use strict";
    function v0() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v0);
        } catch (l) {
          console.error(l);
        }
    }
    (v0(), (m0.exports = y0()));
  });
  var _m = Dt((We) => {
    "use strict";
    var il = i0(),
      Q1 = _u(),
      nd = d0();
    function b(l) {
      var t = "https://react.dev/errors/" + l;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var u = 2; u < arguments.length; u++)
          t += "&args[]=" + encodeURIComponent(arguments[u]);
      }
      return (
        "Minified React error #" +
        l +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function R1(l) {
      return !(
        !l ||
        (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11)
      );
    }
    function nn(l) {
      var t = l,
        u = l;
      if (l.alternate) for (; t.return; ) t = t.return;
      else {
        l = t;
        do ((t = l), (t.flags & 4098) !== 0 && (u = t.return), (l = t.return));
        while (l);
      }
      return t.tag === 3 ? u : null;
    }
    function j1(l) {
      if (l.tag === 13) {
        var t = l.memoizedState;
        if (
          (t === null &&
            ((l = l.alternate), l !== null && (t = l.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function Z1(l) {
      if (l.tag === 31) {
        var t = l.memoizedState;
        if (
          (t === null &&
            ((l = l.alternate), l !== null && (t = l.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function s0(l) {
      if (nn(l) !== l) throw Error(b(188));
    }
    function ed(l) {
      var t = l.alternate;
      if (!t) {
        if (((t = nn(l)), t === null)) throw Error(b(188));
        return t !== l ? null : l;
      }
      for (var u = l, a = t; ; ) {
        var n = u.return;
        if (n === null) break;
        var e = n.alternate;
        if (e === null) {
          if (((a = n.return), a !== null)) {
            u = a;
            continue;
          }
          break;
        }
        if (n.child === e.child) {
          for (e = n.child; e; ) {
            if (e === u) return (s0(n), l);
            if (e === a) return (s0(n), t);
            e = e.sibling;
          }
          throw Error(b(188));
        }
        if (u.return !== a.return) ((u = n), (a = e));
        else {
          for (var f = !1, i = n.child; i; ) {
            if (i === u) {
              ((f = !0), (u = n), (a = e));
              break;
            }
            if (i === a) {
              ((f = !0), (a = n), (u = e));
              break;
            }
            i = i.sibling;
          }
          if (!f) {
            for (i = e.child; i; ) {
              if (i === u) {
                ((f = !0), (u = e), (a = n));
                break;
              }
              if (i === a) {
                ((f = !0), (a = e), (u = n));
                break;
              }
              i = i.sibling;
            }
            if (!f) throw Error(b(189));
          }
        }
        if (u.alternate !== a) throw Error(b(190));
      }
      if (u.tag !== 3) throw Error(b(188));
      return u.stateNode.current === u ? l : t;
    }
    function V1(l) {
      var t = l.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return l;
      for (l = l.child; l !== null; ) {
        if (((t = V1(l)), t !== null)) return t;
        l = l.sibling;
      }
      return null;
    }
    var W = Object.assign,
      fd = Symbol.for("react.element"),
      _n = Symbol.for("react.transitional.element"),
      Da = Symbol.for("react.portal"),
      qu = Symbol.for("react.fragment"),
      x1 = Symbol.for("react.strict_mode"),
      Lf = Symbol.for("react.profiler"),
      L1 = Symbol.for("react.consumer"),
      ht = Symbol.for("react.context"),
      Ri = Symbol.for("react.forward_ref"),
      Kf = Symbol.for("react.suspense"),
      Jf = Symbol.for("react.suspense_list"),
      ji = Symbol.for("react.memo"),
      Nt = Symbol.for("react.lazy"),
      wf = Symbol.for("react.activity"),
      id = Symbol.for("react.memo_cache_sentinel"),
      h0 = Symbol.iterator;
    function za(l) {
      return l === null || typeof l != "object"
        ? null
        : ((l = (h0 && l[h0]) || l["@@iterator"]),
          typeof l == "function" ? l : null);
    }
    var cd = Symbol.for("react.client.reference");
    function Wf(l) {
      if (l == null) return null;
      if (typeof l == "function")
        return l.$$typeof === cd ? null : l.displayName || l.name || null;
      if (typeof l == "string") return l;
      switch (l) {
        case qu:
          return "Fragment";
        case Lf:
          return "Profiler";
        case x1:
          return "StrictMode";
        case Kf:
          return "Suspense";
        case Jf:
          return "SuspenseList";
        case wf:
          return "Activity";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case Da:
            return "Portal";
          case ht:
            return l.displayName || "Context";
          case L1:
            return (l._context.displayName || "Context") + ".Consumer";
          case Ri:
            var t = l.render;
            return (
              (l = l.displayName),
              l ||
                ((l = t.displayName || t.name || ""),
                (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
              l
            );
          case ji:
            return (
              (t = l.displayName || null),
              t !== null ? t : Wf(l.type) || "Memo"
            );
          case Nt:
            ((t = l._payload), (l = l._init));
            try {
              return Wf(l(t));
            } catch {}
        }
      return null;
    }
    var Ua = Array.isArray,
      _ = Q1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      Q = nd.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      fu = { pending: !1, data: null, method: null, action: null },
      $f = [],
      Cu = -1;
    function nt(l) {
      return { current: l };
    }
    function vl(l) {
      0 > Cu || ((l.current = $f[Cu]), ($f[Cu] = null), Cu--);
    }
    function L(l, t) {
      (Cu++, ($f[Cu] = l.current), (l.current = t));
    }
    var at = nt(null),
      La = nt(null),
      jt = nt(null),
      ae = nt(null);
    function ne(l, t) {
      switch ((L(jt, t), L(La, l), L(at, null), t.nodeType)) {
        case 9:
        case 11:
          l = (l = t.documentElement) && (l = l.namespaceURI) ? T1(l) : 0;
          break;
        default:
          if (((l = t.tagName), (t = t.namespaceURI)))
            ((t = T1(t)), (l = vm(t, l)));
          else
            switch (l) {
              case "svg":
                l = 1;
                break;
              case "math":
                l = 2;
                break;
              default:
                l = 0;
            }
      }
      (vl(at), L(at, l));
    }
    function ku() {
      (vl(at), vl(La), vl(jt));
    }
    function Ff(l) {
      l.memoizedState !== null && L(ae, l);
      var t = at.current,
        u = vm(t, l.type);
      t !== u && (L(La, l), L(at, u));
    }
    function ee(l) {
      (La.current === l && (vl(at), vl(La)),
        ae.current === l && (vl(ae), (tn._currentValue = fu)));
    }
    var mf, o0;
    function uu(l) {
      if (mf === void 0)
        try {
          throw Error();
        } catch (u) {
          var t = u.stack.trim().match(/\n( *(at )?)/);
          ((mf = (t && t[1]) || ""),
            (o0 =
              -1 <
              u.stack.indexOf(`
    at`)
                ? " (<anonymous>)"
                : -1 < u.stack.indexOf("@")
                  ? "@unknown:0:0"
                  : ""));
        }
      return (
        `
` +
        mf +
        l +
        o0
      );
    }
    var df = !1;
    function sf(l, t) {
      if (!l || df) return "";
      df = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var a = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var g = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(g.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(g, []);
                  } catch (h) {
                    var s = h;
                  }
                  Reflect.construct(l, [], g);
                } else {
                  try {
                    g.call();
                  } catch (h) {
                    s = h;
                  }
                  l.call(g.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (h) {
                  s = h;
                }
                (g = l()) &&
                  typeof g.catch == "function" &&
                  g.catch(function () {});
              }
            } catch (h) {
              if (h && s && typeof h.stack == "string")
                return [h.stack, s.stack];
            }
            return [null, null];
          },
        };
        a.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var n = Object.getOwnPropertyDescriptor(
          a.DetermineComponentFrameRoot,
          "name",
        );
        n &&
          n.configurable &&
          Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot",
          });
        var e = a.DetermineComponentFrameRoot(),
          f = e[0],
          i = e[1];
        if (f && i) {
          var c = f.split(`
`),
            m = i.split(`
`);
          for (
            n = a = 0;
            a < c.length && !c[a].includes("DetermineComponentFrameRoot");
          )
            a++;
          for (
            ;
            n < m.length && !m[n].includes("DetermineComponentFrameRoot");
          )
            n++;
          if (a === c.length || n === m.length)
            for (
              a = c.length - 1, n = m.length - 1;
              1 <= a && 0 <= n && c[a] !== m[n];
            )
              n--;
          for (; 1 <= a && 0 <= n; a--, n--)
            if (c[a] !== m[n]) {
              if (a !== 1 || n !== 1)
                do
                  if ((a--, n--, 0 > n || c[a] !== m[n])) {
                    var o =
                      `
` + c[a].replace(" at new ", " at ");
                    return (
                      l.displayName &&
                        o.includes("<anonymous>") &&
                        (o = o.replace("<anonymous>", l.displayName)),
                      o
                    );
                  }
                while (1 <= a && 0 <= n);
              break;
            }
        }
      } finally {
        ((df = !1), (Error.prepareStackTrace = u));
      }
      return (u = l ? l.displayName || l.name : "") ? uu(u) : "";
    }
    function yd(l, t) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          return uu(l.type);
        case 16:
          return uu("Lazy");
        case 13:
          return l.child !== t && t !== null
            ? uu("Suspense Fallback")
            : uu("Suspense");
        case 19:
          return uu("SuspenseList");
        case 0:
        case 15:
          return sf(l.type, !1);
        case 11:
          return sf(l.type.render, !1);
        case 1:
          return sf(l.type, !0);
        case 31:
          return uu("Activity");
        default:
          return "";
      }
    }
    function S0(l) {
      try {
        var t = "",
          u = null;
        do ((t += yd(l, u)), (u = l), (l = l.return));
        while (l);
        return t;
      } catch (a) {
        return (
          `
Error generating stack: ` +
          a.message +
          `
` +
          a.stack
        );
      }
    }
    var kf = Object.prototype.hasOwnProperty,
      Zi = il.unstable_scheduleCallback,
      hf = il.unstable_cancelCallback,
      vd = il.unstable_shouldYield,
      md = il.unstable_requestPaint,
      Cl = il.unstable_now,
      dd = il.unstable_getCurrentPriorityLevel,
      K1 = il.unstable_ImmediatePriority,
      J1 = il.unstable_UserBlockingPriority,
      fe = il.unstable_NormalPriority,
      sd = il.unstable_LowPriority,
      w1 = il.unstable_IdlePriority,
      hd = il.log,
      od = il.unstable_setDisableYieldValue,
      en = null,
      Bl = null;
    function Yt(l) {
      if (
        (typeof hd == "function" && od(l),
        Bl && typeof Bl.setStrictMode == "function")
      )
        try {
          Bl.setStrictMode(en, l);
        } catch {}
    }
    var Yl = Math.clz32 ? Math.clz32 : bd,
      Sd = Math.log,
      gd = Math.LN2;
    function bd(l) {
      return ((l >>>= 0), l === 0 ? 32 : (31 - ((Sd(l) / gd) | 0)) | 0);
    }
    var Mn = 256,
      Dn = 262144,
      Un = 4194304;
    function au(l) {
      var t = l & 42;
      if (t !== 0) return t;
      switch (l & -l) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return l & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return l & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return l & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return l;
      }
    }
    function qe(l, t, u) {
      var a = l.pendingLanes;
      if (a === 0) return 0;
      var n = 0,
        e = l.suspendedLanes,
        f = l.pingedLanes;
      l = l.warmLanes;
      var i = a & 134217727;
      return (
        i !== 0
          ? ((a = i & ~e),
            a !== 0
              ? (n = au(a))
              : ((f &= i),
                f !== 0
                  ? (n = au(f))
                  : u || ((u = i & ~l), u !== 0 && (n = au(u)))))
          : ((i = a & ~e),
            i !== 0
              ? (n = au(i))
              : f !== 0
                ? (n = au(f))
                : u || ((u = a & ~l), u !== 0 && (n = au(u)))),
        n === 0
          ? 0
          : t !== 0 &&
              t !== n &&
              (t & e) === 0 &&
              ((e = n & -n),
              (u = t & -t),
              e >= u || (e === 32 && (u & 4194048) !== 0))
            ? t
            : n
      );
    }
    function fn(l, t) {
      return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
    }
    function zd(l, t) {
      switch (l) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function W1() {
      var l = Un;
      return ((Un <<= 1), (Un & 62914560) === 0 && (Un = 4194304), l);
    }
    function of(l) {
      for (var t = [], u = 0; 31 > u; u++) t.push(l);
      return t;
    }
    function cn(l, t) {
      ((l.pendingLanes |= t),
        t !== 268435456 &&
          ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
    }
    function Ed(l, t, u, a, n, e) {
      var f = l.pendingLanes;
      ((l.pendingLanes = u),
        (l.suspendedLanes = 0),
        (l.pingedLanes = 0),
        (l.warmLanes = 0),
        (l.expiredLanes &= u),
        (l.entangledLanes &= u),
        (l.errorRecoveryDisabledLanes &= u),
        (l.shellSuspendCounter = 0));
      var i = l.entanglements,
        c = l.expirationTimes,
        m = l.hiddenUpdates;
      for (u = f & ~u; 0 < u; ) {
        var o = 31 - Yl(u),
          g = 1 << o;
        ((i[o] = 0), (c[o] = -1));
        var s = m[o];
        if (s !== null)
          for (m[o] = null, o = 0; o < s.length; o++) {
            var h = s[o];
            h !== null && (h.lane &= -536870913);
          }
        u &= ~g;
      }
      (a !== 0 && $1(l, a, 0),
        e !== 0 &&
          n === 0 &&
          l.tag !== 0 &&
          (l.suspendedLanes |= e & ~(f & ~t)));
    }
    function $1(l, t, u) {
      ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
      var a = 31 - Yl(t);
      ((l.entangledLanes |= t),
        (l.entanglements[a] = l.entanglements[a] | 1073741824 | (u & 261930)));
    }
    function F1(l, t) {
      var u = (l.entangledLanes |= t);
      for (l = l.entanglements; u; ) {
        var a = 31 - Yl(u),
          n = 1 << a;
        ((n & t) | (l[a] & t) && (l[a] |= t), (u &= ~n));
      }
    }
    function k1(l, t) {
      var u = t & -t;
      return (
        (u = (u & 42) !== 0 ? 1 : Vi(u)),
        (u & (l.suspendedLanes | t)) !== 0 ? 0 : u
      );
    }
    function Vi(l) {
      switch (l) {
        case 2:
          l = 1;
          break;
        case 8:
          l = 4;
          break;
        case 32:
          l = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          l = 128;
          break;
        case 268435456:
          l = 134217728;
          break;
        default:
          l = 0;
      }
      return l;
    }
    function xi(l) {
      return (
        (l &= -l),
        2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function I1() {
      var l = Q.p;
      return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : Tm(l.type));
    }
    function g0(l, t) {
      var u = Q.p;
      try {
        return ((Q.p = l), t());
      } finally {
        Q.p = u;
      }
    }
    var Pt = Math.random().toString(36).slice(2),
      dl = "__reactFiber$" + Pt,
      Ul = "__reactProps$" + Pt,
      ca = "__reactContainer$" + Pt,
      If = "__reactEvents$" + Pt,
      Td = "__reactListeners$" + Pt,
      Ad = "__reactHandles$" + Pt,
      b0 = "__reactResources$" + Pt,
      yn = "__reactMarker$" + Pt;
    function Li(l) {
      (delete l[dl], delete l[Ul], delete l[If], delete l[Td], delete l[Ad]);
    }
    function Bu(l) {
      var t = l[dl];
      if (t) return t;
      for (var u = l.parentNode; u; ) {
        if ((t = u[ca] || u[dl])) {
          if (
            ((u = t.alternate),
            t.child !== null || (u !== null && u.child !== null))
          )
            for (l = D1(l); l !== null; ) {
              if ((u = l[dl])) return u;
              l = D1(l);
            }
          return t;
        }
        ((l = u), (u = l.parentNode));
      }
      return null;
    }
    function ya(l) {
      if ((l = l[dl] || l[ca])) {
        var t = l.tag;
        if (
          t === 5 ||
          t === 6 ||
          t === 13 ||
          t === 31 ||
          t === 26 ||
          t === 27 ||
          t === 3
        )
          return l;
      }
      return null;
    }
    function pa(l) {
      var t = l.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
      throw Error(b(33));
    }
    function Lu(l) {
      var t = l[b0];
      return (
        t ||
          (t = l[b0] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        t
      );
    }
    function yl(l) {
      l[yn] = !0;
    }
    var P1 = new Set(),
      ly = {};
    function Su(l, t) {
      (Iu(l, t), Iu(l + "Capture", t));
    }
    function Iu(l, t) {
      for (ly[l] = t, l = 0; l < t.length; l++) P1.add(t[l]);
    }
    var Od = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
      ),
      z0 = {},
      E0 = {};
    function _d(l) {
      return kf.call(E0, l)
        ? !0
        : kf.call(z0, l)
          ? !1
          : Od.test(l)
            ? (E0[l] = !0)
            : ((z0[l] = !0), !1);
    }
    function Vn(l, t, u) {
      if (_d(t))
        if (u === null) l.removeAttribute(t);
        else {
          switch (typeof u) {
            case "undefined":
            case "function":
            case "symbol":
              l.removeAttribute(t);
              return;
            case "boolean":
              var a = t.toLowerCase().slice(0, 5);
              if (a !== "data-" && a !== "aria-") {
                l.removeAttribute(t);
                return;
              }
          }
          l.setAttribute(t, "" + u);
        }
    }
    function pn(l, t, u) {
      if (u === null) l.removeAttribute(t);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            l.removeAttribute(t);
            return;
        }
        l.setAttribute(t, "" + u);
      }
    }
    function it(l, t, u, a) {
      if (a === null) l.removeAttribute(u);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            l.removeAttribute(u);
            return;
        }
        l.setAttributeNS(t, u, "" + a);
      }
    }
    function Zl(l) {
      switch (typeof l) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return l;
        case "object":
          return l;
        default:
          return "";
      }
    }
    function ty(l) {
      var t = l.type;
      return (
        (l = l.nodeName) &&
        l.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
      );
    }
    function Md(l, t, u) {
      var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
      if (
        !l.hasOwnProperty(t) &&
        typeof a < "u" &&
        typeof a.get == "function" &&
        typeof a.set == "function"
      ) {
        var n = a.get,
          e = a.set;
        return (
          Object.defineProperty(l, t, {
            configurable: !0,
            get: function () {
              return n.call(this);
            },
            set: function (f) {
              ((u = "" + f), e.call(this, f));
            },
          }),
          Object.defineProperty(l, t, { enumerable: a.enumerable }),
          {
            getValue: function () {
              return u;
            },
            setValue: function (f) {
              u = "" + f;
            },
            stopTracking: function () {
              ((l._valueTracker = null), delete l[t]);
            },
          }
        );
      }
    }
    function Pf(l) {
      if (!l._valueTracker) {
        var t = ty(l) ? "checked" : "value";
        l._valueTracker = Md(l, t, "" + l[t]);
      }
    }
    function uy(l) {
      if (!l) return !1;
      var t = l._valueTracker;
      if (!t) return !0;
      var u = t.getValue(),
        a = "";
      return (
        l && (a = ty(l) ? (l.checked ? "true" : "false") : l.value),
        (l = a),
        l !== u ? (t.setValue(l), !0) : !1
      );
    }
    function ie(l) {
      if (
        ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
      )
        return null;
      try {
        return l.activeElement || l.body;
      } catch {
        return l.body;
      }
    }
    var Dd = /[\n"\\]/g;
    function Ll(l) {
      return l.replace(Dd, function (t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function li(l, t, u, a, n, e, f, i) {
      ((l.name = ""),
        f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean"
          ? (l.type = f)
          : l.removeAttribute("type"),
        t != null
          ? f === "number"
            ? ((t === 0 && l.value === "") || l.value != t) &&
              (l.value = "" + Zl(t))
            : l.value !== "" + Zl(t) && (l.value = "" + Zl(t))
          : (f !== "submit" && f !== "reset") || l.removeAttribute("value"),
        t != null
          ? ti(l, f, Zl(t))
          : u != null
            ? ti(l, f, Zl(u))
            : a != null && l.removeAttribute("value"),
        n == null && e != null && (l.defaultChecked = !!e),
        n != null &&
          (l.checked = n && typeof n != "function" && typeof n != "symbol"),
        i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean"
          ? (l.name = "" + Zl(i))
          : l.removeAttribute("name"));
    }
    function ay(l, t, u, a, n, e, f, i) {
      if (
        (e != null &&
          typeof e != "function" &&
          typeof e != "symbol" &&
          typeof e != "boolean" &&
          (l.type = e),
        t != null || u != null)
      ) {
        if (!((e !== "submit" && e !== "reset") || t != null)) {
          Pf(l);
          return;
        }
        ((u = u != null ? "" + Zl(u) : ""),
          (t = t != null ? "" + Zl(t) : u),
          i || t === l.value || (l.value = t),
          (l.defaultValue = t));
      }
      ((a = a ?? n),
        (a = typeof a != "function" && typeof a != "symbol" && !!a),
        (l.checked = i ? l.checked : !!a),
        (l.defaultChecked = !!a),
        f != null &&
          typeof f != "function" &&
          typeof f != "symbol" &&
          typeof f != "boolean" &&
          (l.name = f),
        Pf(l));
    }
    function ti(l, t, u) {
      (t === "number" && ie(l.ownerDocument) === l) ||
        l.defaultValue === "" + u ||
        (l.defaultValue = "" + u);
    }
    function Ku(l, t, u, a) {
      if (((l = l.options), t)) {
        t = {};
        for (var n = 0; n < u.length; n++) t["$" + u[n]] = !0;
        for (u = 0; u < l.length; u++)
          ((n = t.hasOwnProperty("$" + l[u].value)),
            l[u].selected !== n && (l[u].selected = n),
            n && a && (l[u].defaultSelected = !0));
      } else {
        for (u = "" + Zl(u), t = null, n = 0; n < l.length; n++) {
          if (l[n].value === u) {
            ((l[n].selected = !0), a && (l[n].defaultSelected = !0));
            return;
          }
          t !== null || l[n].disabled || (t = l[n]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function ny(l, t, u) {
      if (
        t != null &&
        ((t = "" + Zl(t)), t !== l.value && (l.value = t), u == null)
      ) {
        l.defaultValue !== t && (l.defaultValue = t);
        return;
      }
      l.defaultValue = u != null ? "" + Zl(u) : "";
    }
    function ey(l, t, u, a) {
      if (t == null) {
        if (a != null) {
          if (u != null) throw Error(b(92));
          if (Ua(a)) {
            if (1 < a.length) throw Error(b(93));
            a = a[0];
          }
          u = a;
        }
        (u == null && (u = ""), (t = u));
      }
      ((u = Zl(t)),
        (l.defaultValue = u),
        (a = l.textContent),
        a === u && a !== "" && a !== null && (l.value = a),
        Pf(l));
    }
    function Pu(l, t) {
      if (t) {
        var u = l.firstChild;
        if (u && u === l.lastChild && u.nodeType === 3) {
          u.nodeValue = t;
          return;
        }
      }
      l.textContent = t;
    }
    var Ud = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " ",
      ),
    );
    function T0(l, t, u) {
      var a = t.indexOf("--") === 0;
      u == null || typeof u == "boolean" || u === ""
        ? a
          ? l.setProperty(t, "")
          : t === "float"
            ? (l.cssFloat = "")
            : (l[t] = "")
        : a
          ? l.setProperty(t, u)
          : typeof u != "number" || u === 0 || Ud.has(t)
            ? t === "float"
              ? (l.cssFloat = u)
              : (l[t] = ("" + u).trim())
            : (l[t] = u + "px");
    }
    function fy(l, t, u) {
      if (t != null && typeof t != "object") throw Error(b(62));
      if (((l = l.style), u != null)) {
        for (var a in u)
          !u.hasOwnProperty(a) ||
            (t != null && t.hasOwnProperty(a)) ||
            (a.indexOf("--") === 0
              ? l.setProperty(a, "")
              : a === "float"
                ? (l.cssFloat = "")
                : (l[a] = ""));
        for (var n in t)
          ((a = t[n]), t.hasOwnProperty(n) && u[n] !== a && T0(l, n, a));
      } else for (var e in t) t.hasOwnProperty(e) && T0(l, e, t[e]);
    }
    function Ki(l) {
      if (l.indexOf("-") === -1) return !1;
      switch (l) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var pd = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"],
      ]),
      Nd =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function xn(l) {
      return Nd.test("" + l)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : l;
    }
    function ot() {}
    var ui = null;
    function Ji(l) {
      return (
        (l = l.target || l.srcElement || window),
        l.correspondingUseElement && (l = l.correspondingUseElement),
        l.nodeType === 3 ? l.parentNode : l
      );
    }
    var Yu = null,
      Ju = null;
    function A0(l) {
      var t = ya(l);
      if (t && (l = t.stateNode)) {
        var u = l[Ul] || null;
        l: switch (((l = t.stateNode), t.type)) {
          case "input":
            if (
              (li(
                l,
                u.value,
                u.defaultValue,
                u.defaultValue,
                u.checked,
                u.defaultChecked,
                u.type,
                u.name,
              ),
              (t = u.name),
              u.type === "radio" && t != null)
            ) {
              for (u = l; u.parentNode; ) u = u.parentNode;
              for (
                u = u.querySelectorAll(
                  'input[name="' + Ll("" + t) + '"][type="radio"]',
                ),
                  t = 0;
                t < u.length;
                t++
              ) {
                var a = u[t];
                if (a !== l && a.form === l.form) {
                  var n = a[Ul] || null;
                  if (!n) throw Error(b(90));
                  li(
                    a,
                    n.value,
                    n.defaultValue,
                    n.defaultValue,
                    n.checked,
                    n.defaultChecked,
                    n.type,
                    n.name,
                  );
                }
              }
              for (t = 0; t < u.length; t++)
                ((a = u[t]), a.form === l.form && uy(a));
            }
            break l;
          case "textarea":
            ny(l, u.value, u.defaultValue);
            break l;
          case "select":
            ((t = u.value), t != null && Ku(l, !!u.multiple, t, !1));
        }
      }
    }
    var Sf = !1;
    function iy(l, t, u) {
      if (Sf) return l(t, u);
      Sf = !0;
      try {
        var a = l(t);
        return a;
      } finally {
        if (
          ((Sf = !1),
          (Yu !== null || Ju !== null) &&
            (Le(), Yu && ((t = Yu), (l = Ju), (Ju = Yu = null), A0(t), l)))
        )
          for (t = 0; t < l.length; t++) A0(l[t]);
      }
    }
    function Ka(l, t) {
      var u = l.stateNode;
      if (u === null) return null;
      var a = u[Ul] || null;
      if (a === null) return null;
      u = a[t];
      l: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          ((a = !a.disabled) ||
            ((l = l.type),
            (a = !(
              l === "button" ||
              l === "input" ||
              l === "select" ||
              l === "textarea"
            ))),
            (l = !a));
          break l;
        default:
          l = !1;
      }
      if (l) return null;
      if (u && typeof u != "function") throw Error(b(231, t, typeof u));
      return u;
    }
    var Et = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      ai = !1;
    if (Et)
      try {
        ((Uu = {}),
          Object.defineProperty(Uu, "passive", {
            get: function () {
              ai = !0;
            },
          }),
          window.addEventListener("test", Uu, Uu),
          window.removeEventListener("test", Uu, Uu));
      } catch {
        ai = !1;
      }
    var Uu,
      Gt = null,
      wi = null,
      Ln = null;
    function cy() {
      if (Ln) return Ln;
      var l,
        t = wi,
        u = t.length,
        a,
        n = "value" in Gt ? Gt.value : Gt.textContent,
        e = n.length;
      for (l = 0; l < u && t[l] === n[l]; l++);
      var f = u - l;
      for (a = 1; a <= f && t[u - a] === n[e - a]; a++);
      return (Ln = n.slice(l, 1 < a ? 1 - a : void 0));
    }
    function Kn(l) {
      var t = l.keyCode;
      return (
        "charCode" in l
          ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
          : (l = t),
        l === 10 && (l = 13),
        32 <= l || l === 13 ? l : 0
      );
    }
    function Nn() {
      return !0;
    }
    function O0() {
      return !1;
    }
    function pl(l) {
      function t(u, a, n, e, f) {
        ((this._reactName = u),
          (this._targetInst = n),
          (this.type = a),
          (this.nativeEvent = e),
          (this.target = f),
          (this.currentTarget = null));
        for (var i in l)
          l.hasOwnProperty(i) && ((u = l[i]), (this[i] = u ? u(e) : e[i]));
        return (
          (this.isDefaultPrevented = (
            e.defaultPrevented != null
              ? e.defaultPrevented
              : e.returnValue === !1
          )
            ? Nn
            : O0),
          (this.isPropagationStopped = O0),
          this
        );
      }
      return (
        W(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var u = this.nativeEvent;
            u &&
              (u.preventDefault
                ? u.preventDefault()
                : typeof u.returnValue != "unknown" && (u.returnValue = !1),
              (this.isDefaultPrevented = Nn));
          },
          stopPropagation: function () {
            var u = this.nativeEvent;
            u &&
              (u.stopPropagation
                ? u.stopPropagation()
                : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0),
              (this.isPropagationStopped = Nn));
          },
          persist: function () {},
          isPersistent: Nn,
        }),
        t
      );
    }
    var gu = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (l) {
          return l.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Ce = pl(gu),
      vn = W({}, gu, { view: 0, detail: 0 }),
      Hd = pl(vn),
      gf,
      bf,
      Ea,
      Be = W({}, vn, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Wi,
        button: 0,
        buttons: 0,
        relatedTarget: function (l) {
          return l.relatedTarget === void 0
            ? l.fromElement === l.srcElement
              ? l.toElement
              : l.fromElement
            : l.relatedTarget;
        },
        movementX: function (l) {
          return "movementX" in l
            ? l.movementX
            : (l !== Ea &&
                (Ea && l.type === "mousemove"
                  ? ((gf = l.screenX - Ea.screenX),
                    (bf = l.screenY - Ea.screenY))
                  : (bf = gf = 0),
                (Ea = l)),
              gf);
        },
        movementY: function (l) {
          return "movementY" in l ? l.movementY : bf;
        },
      }),
      _0 = pl(Be),
      rd = W({}, Be, { dataTransfer: 0 }),
      qd = pl(rd),
      Cd = W({}, vn, { relatedTarget: 0 }),
      zf = pl(Cd),
      Bd = W({}, gu, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      Yd = pl(Bd),
      Gd = W({}, gu, {
        clipboardData: function (l) {
          return "clipboardData" in l ? l.clipboardData : window.clipboardData;
        },
      }),
      Xd = pl(Gd),
      Qd = W({}, gu, { data: 0 }),
      M0 = pl(Qd),
      Rd = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      jd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      Zd = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function Vd(l) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(l)
        : (l = Zd[l])
          ? !!t[l]
          : !1;
    }
    function Wi() {
      return Vd;
    }
    var xd = W({}, vn, {
        key: function (l) {
          if (l.key) {
            var t = Rd[l.key] || l.key;
            if (t !== "Unidentified") return t;
          }
          return l.type === "keypress"
            ? ((l = Kn(l)), l === 13 ? "Enter" : String.fromCharCode(l))
            : l.type === "keydown" || l.type === "keyup"
              ? jd[l.keyCode] || "Unidentified"
              : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Wi,
        charCode: function (l) {
          return l.type === "keypress" ? Kn(l) : 0;
        },
        keyCode: function (l) {
          return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
        },
        which: function (l) {
          return l.type === "keypress"
            ? Kn(l)
            : l.type === "keydown" || l.type === "keyup"
              ? l.keyCode
              : 0;
        },
      }),
      Ld = pl(xd),
      Kd = W({}, Be, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      D0 = pl(Kd),
      Jd = W({}, vn, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Wi,
      }),
      wd = pl(Jd),
      Wd = W({}, gu, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      $d = pl(Wd),
      Fd = W({}, Be, {
        deltaX: function (l) {
          return "deltaX" in l
            ? l.deltaX
            : "wheelDeltaX" in l
              ? -l.wheelDeltaX
              : 0;
        },
        deltaY: function (l) {
          return "deltaY" in l
            ? l.deltaY
            : "wheelDeltaY" in l
              ? -l.wheelDeltaY
              : "wheelDelta" in l
                ? -l.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      kd = pl(Fd),
      Id = W({}, gu, { newState: 0, oldState: 0 }),
      Pd = pl(Id),
      ls = [9, 13, 27, 32],
      $i = Et && "CompositionEvent" in window,
      ra = null;
    Et && "documentMode" in document && (ra = document.documentMode);
    var ts = Et && "TextEvent" in window && !ra,
      yy = Et && (!$i || (ra && 8 < ra && 11 >= ra)),
      U0 = " ",
      p0 = !1;
    function vy(l, t) {
      switch (l) {
        case "keyup":
          return ls.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function my(l) {
      return (
        (l = l.detail),
        typeof l == "object" && "data" in l ? l.data : null
      );
    }
    var Gu = !1;
    function us(l, t) {
      switch (l) {
        case "compositionend":
          return my(t);
        case "keypress":
          return t.which !== 32 ? null : ((p0 = !0), U0);
        case "textInput":
          return ((l = t.data), l === U0 && p0 ? null : l);
        default:
          return null;
      }
    }
    function as(l, t) {
      if (Gu)
        return l === "compositionend" || (!$i && vy(l, t))
          ? ((l = cy()), (Ln = wi = Gt = null), (Gu = !1), l)
          : null;
      switch (l) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return yy && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var ns = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function N0(l) {
      var t = l && l.nodeName && l.nodeName.toLowerCase();
      return t === "input" ? !!ns[l.type] : t === "textarea";
    }
    function dy(l, t, u, a) {
      (Yu ? (Ju ? Ju.push(a) : (Ju = [a])) : (Yu = a),
        (t = Me(t, "onChange")),
        0 < t.length &&
          ((u = new Ce("onChange", "change", null, u, a)),
          l.push({ event: u, listeners: t })));
    }
    var qa = null,
      Ja = null;
    function es(l) {
      im(l, 0);
    }
    function Ye(l) {
      var t = pa(l);
      if (uy(t)) return l;
    }
    function H0(l, t) {
      if (l === "change") return t;
    }
    var sy = !1;
    Et &&
      (Et
        ? ((rn = "oninput" in document),
          rn ||
            ((Ef = document.createElement("div")),
            Ef.setAttribute("oninput", "return;"),
            (rn = typeof Ef.oninput == "function")),
          (Hn = rn))
        : (Hn = !1),
      (sy = Hn && (!document.documentMode || 9 < document.documentMode)));
    var Hn, rn, Ef;
    function r0() {
      qa && (qa.detachEvent("onpropertychange", hy), (Ja = qa = null));
    }
    function hy(l) {
      if (l.propertyName === "value" && Ye(Ja)) {
        var t = [];
        (dy(t, Ja, l, Ji(l)), iy(es, t));
      }
    }
    function fs(l, t, u) {
      l === "focusin"
        ? (r0(), (qa = t), (Ja = u), qa.attachEvent("onpropertychange", hy))
        : l === "focusout" && r0();
    }
    function is(l) {
      if (l === "selectionchange" || l === "keyup" || l === "keydown")
        return Ye(Ja);
    }
    function cs(l, t) {
      if (l === "click") return Ye(t);
    }
    function ys(l, t) {
      if (l === "input" || l === "change") return Ye(t);
    }
    function vs(l, t) {
      return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
    }
    var Xl = typeof Object.is == "function" ? Object.is : vs;
    function wa(l, t) {
      if (Xl(l, t)) return !0;
      if (
        typeof l != "object" ||
        l === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      var u = Object.keys(l),
        a = Object.keys(t);
      if (u.length !== a.length) return !1;
      for (a = 0; a < u.length; a++) {
        var n = u[a];
        if (!kf.call(t, n) || !Xl(l[n], t[n])) return !1;
      }
      return !0;
    }
    function q0(l) {
      for (; l && l.firstChild; ) l = l.firstChild;
      return l;
    }
    function C0(l, t) {
      var u = q0(l);
      l = 0;
      for (var a; u; ) {
        if (u.nodeType === 3) {
          if (((a = l + u.textContent.length), l <= t && a >= t))
            return { node: u, offset: t - l };
          l = a;
        }
        l: {
          for (; u; ) {
            if (u.nextSibling) {
              u = u.nextSibling;
              break l;
            }
            u = u.parentNode;
          }
          u = void 0;
        }
        u = q0(u);
      }
    }
    function oy(l, t) {
      return l && t
        ? l === t
          ? !0
          : l && l.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? oy(l, t.parentNode)
              : "contains" in l
                ? l.contains(t)
                : l.compareDocumentPosition
                  ? !!(l.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Sy(l) {
      l =
        l != null &&
        l.ownerDocument != null &&
        l.ownerDocument.defaultView != null
          ? l.ownerDocument.defaultView
          : window;
      for (var t = ie(l.document); t instanceof l.HTMLIFrameElement; ) {
        try {
          var u = typeof t.contentWindow.location.href == "string";
        } catch {
          u = !1;
        }
        if (u) l = t.contentWindow;
        else break;
        t = ie(l.document);
      }
      return t;
    }
    function Fi(l) {
      var t = l && l.nodeName && l.nodeName.toLowerCase();
      return (
        t &&
        ((t === "input" &&
          (l.type === "text" ||
            l.type === "search" ||
            l.type === "tel" ||
            l.type === "url" ||
            l.type === "password")) ||
          t === "textarea" ||
          l.contentEditable === "true")
      );
    }
    var ms = Et && "documentMode" in document && 11 >= document.documentMode,
      Xu = null,
      ni = null,
      Ca = null,
      ei = !1;
    function B0(l, t, u) {
      var a =
        u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
      ei ||
        Xu == null ||
        Xu !== ie(a) ||
        ((a = Xu),
        "selectionStart" in a && Fi(a)
          ? (a = { start: a.selectionStart, end: a.selectionEnd })
          : ((a = (
              (a.ownerDocument && a.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (a = {
              anchorNode: a.anchorNode,
              anchorOffset: a.anchorOffset,
              focusNode: a.focusNode,
              focusOffset: a.focusOffset,
            })),
        (Ca && wa(Ca, a)) ||
          ((Ca = a),
          (a = Me(ni, "onSelect")),
          0 < a.length &&
            ((t = new Ce("onSelect", "select", null, t, u)),
            l.push({ event: t, listeners: a }),
            (t.target = Xu))));
    }
    function tu(l, t) {
      var u = {};
      return (
        (u[l.toLowerCase()] = t.toLowerCase()),
        (u["Webkit" + l] = "webkit" + t),
        (u["Moz" + l] = "moz" + t),
        u
      );
    }
    var Qu = {
        animationend: tu("Animation", "AnimationEnd"),
        animationiteration: tu("Animation", "AnimationIteration"),
        animationstart: tu("Animation", "AnimationStart"),
        transitionrun: tu("Transition", "TransitionRun"),
        transitionstart: tu("Transition", "TransitionStart"),
        transitioncancel: tu("Transition", "TransitionCancel"),
        transitionend: tu("Transition", "TransitionEnd"),
      },
      Tf = {},
      gy = {};
    Et &&
      ((gy = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete Qu.animationend.animation,
        delete Qu.animationiteration.animation,
        delete Qu.animationstart.animation),
      "TransitionEvent" in window || delete Qu.transitionend.transition);
    function bu(l) {
      if (Tf[l]) return Tf[l];
      if (!Qu[l]) return l;
      var t = Qu[l],
        u;
      for (u in t) if (t.hasOwnProperty(u) && u in gy) return (Tf[l] = t[u]);
      return l;
    }
    var by = bu("animationend"),
      zy = bu("animationiteration"),
      Ey = bu("animationstart"),
      ds = bu("transitionrun"),
      ss = bu("transitionstart"),
      hs = bu("transitioncancel"),
      Ty = bu("transitionend"),
      Ay = new Map(),
      fi =
        "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " ",
        );
    fi.push("scrollEnd");
    function Il(l, t) {
      (Ay.set(l, t), Su(t, [l]));
    }
    var ce =
        typeof reportError == "function"
          ? reportError
          : function (l) {
              if (
                typeof window == "object" &&
                typeof window.ErrorEvent == "function"
              ) {
                var t = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof l == "object" &&
                    l !== null &&
                    typeof l.message == "string"
                      ? String(l.message)
                      : String(l),
                  error: l,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (
                typeof process == "object" &&
                typeof process.emit == "function"
              ) {
                process.emit("uncaughtException", l);
                return;
              }
              console.error(l);
            },
      jl = [],
      Ru = 0,
      ki = 0;
    function Ge() {
      for (var l = Ru, t = (ki = Ru = 0); t < l; ) {
        var u = jl[t];
        jl[t++] = null;
        var a = jl[t];
        jl[t++] = null;
        var n = jl[t];
        jl[t++] = null;
        var e = jl[t];
        if (((jl[t++] = null), a !== null && n !== null)) {
          var f = a.pending;
          (f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
            (a.pending = n));
        }
        e !== 0 && Oy(u, n, e);
      }
    }
    function Xe(l, t, u, a) {
      ((jl[Ru++] = l),
        (jl[Ru++] = t),
        (jl[Ru++] = u),
        (jl[Ru++] = a),
        (ki |= a),
        (l.lanes |= a),
        (l = l.alternate),
        l !== null && (l.lanes |= a));
    }
    function Ii(l, t, u, a) {
      return (Xe(l, t, u, a), ye(l));
    }
    function zu(l, t) {
      return (Xe(l, null, null, t), ye(l));
    }
    function Oy(l, t, u) {
      l.lanes |= u;
      var a = l.alternate;
      a !== null && (a.lanes |= u);
      for (var n = !1, e = l.return; e !== null; )
        ((e.childLanes |= u),
          (a = e.alternate),
          a !== null && (a.childLanes |= u),
          e.tag === 22 &&
            ((l = e.stateNode), l === null || l._visibility & 1 || (n = !0)),
          (l = e),
          (e = e.return));
      return l.tag === 3
        ? ((e = l.stateNode),
          n &&
            t !== null &&
            ((n = 31 - Yl(u)),
            (l = e.hiddenUpdates),
            (a = l[n]),
            a === null ? (l[n] = [t]) : a.push(t),
            (t.lane = u | 536870912)),
          e)
        : null;
    }
    function ye(l) {
      if (50 < Va) throw ((Va = 0), (Ui = null), Error(b(185)));
      for (var t = l.return; t !== null; ) ((l = t), (t = l.return));
      return l.tag === 3 ? l.stateNode : null;
    }
    var ju = {};
    function os(l, t, u, a) {
      ((this.tag = l),
        (this.key = u),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = a),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function rl(l, t, u, a) {
      return new os(l, t, u, a);
    }
    function Pi(l) {
      return ((l = l.prototype), !(!l || !l.isReactComponent));
    }
    function gt(l, t) {
      var u = l.alternate;
      return (
        u === null
          ? ((u = rl(l.tag, t, l.key, l.mode)),
            (u.elementType = l.elementType),
            (u.type = l.type),
            (u.stateNode = l.stateNode),
            (u.alternate = l),
            (l.alternate = u))
          : ((u.pendingProps = t),
            (u.type = l.type),
            (u.flags = 0),
            (u.subtreeFlags = 0),
            (u.deletions = null)),
        (u.flags = l.flags & 65011712),
        (u.childLanes = l.childLanes),
        (u.lanes = l.lanes),
        (u.child = l.child),
        (u.memoizedProps = l.memoizedProps),
        (u.memoizedState = l.memoizedState),
        (u.updateQueue = l.updateQueue),
        (t = l.dependencies),
        (u.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (u.sibling = l.sibling),
        (u.index = l.index),
        (u.ref = l.ref),
        (u.refCleanup = l.refCleanup),
        u
      );
    }
    function _y(l, t) {
      l.flags &= 65011714;
      var u = l.alternate;
      return (
        u === null
          ? ((l.childLanes = 0),
            (l.lanes = t),
            (l.child = null),
            (l.subtreeFlags = 0),
            (l.memoizedProps = null),
            (l.memoizedState = null),
            (l.updateQueue = null),
            (l.dependencies = null),
            (l.stateNode = null))
          : ((l.childLanes = u.childLanes),
            (l.lanes = u.lanes),
            (l.child = u.child),
            (l.subtreeFlags = 0),
            (l.deletions = null),
            (l.memoizedProps = u.memoizedProps),
            (l.memoizedState = u.memoizedState),
            (l.updateQueue = u.updateQueue),
            (l.type = u.type),
            (t = u.dependencies),
            (l.dependencies =
              t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext })),
        l
      );
    }
    function Jn(l, t, u, a, n, e) {
      var f = 0;
      if (((a = l), typeof l == "function")) Pi(l) && (f = 1);
      else if (typeof l == "string")
        f = bh(l, u, at.current)
          ? 26
          : l === "html" || l === "head" || l === "body"
            ? 27
            : 5;
      else
        l: switch (l) {
          case wf:
            return (
              (l = rl(31, u, t, n)),
              (l.elementType = wf),
              (l.lanes = e),
              l
            );
          case qu:
            return iu(u.children, n, e, t);
          case x1:
            ((f = 8), (n |= 24));
            break;
          case Lf:
            return (
              (l = rl(12, u, t, n | 2)),
              (l.elementType = Lf),
              (l.lanes = e),
              l
            );
          case Kf:
            return (
              (l = rl(13, u, t, n)),
              (l.elementType = Kf),
              (l.lanes = e),
              l
            );
          case Jf:
            return (
              (l = rl(19, u, t, n)),
              (l.elementType = Jf),
              (l.lanes = e),
              l
            );
          default:
            if (typeof l == "object" && l !== null)
              switch (l.$$typeof) {
                case ht:
                  f = 10;
                  break l;
                case L1:
                  f = 9;
                  break l;
                case Ri:
                  f = 11;
                  break l;
                case ji:
                  f = 14;
                  break l;
                case Nt:
                  ((f = 16), (a = null));
                  break l;
              }
            ((f = 29),
              (u = Error(b(130, l === null ? "null" : typeof l, ""))),
              (a = null));
        }
      return (
        (t = rl(f, u, t, n)),
        (t.elementType = l),
        (t.type = a),
        (t.lanes = e),
        t
      );
    }
    function iu(l, t, u, a) {
      return ((l = rl(7, l, a, t)), (l.lanes = u), l);
    }
    function Af(l, t, u) {
      return ((l = rl(6, l, null, t)), (l.lanes = u), l);
    }
    function My(l) {
      var t = rl(18, null, null, 0);
      return ((t.stateNode = l), t);
    }
    function Of(l, t, u) {
      return (
        (t = rl(4, l.children !== null ? l.children : [], l.key, t)),
        (t.lanes = u),
        (t.stateNode = {
          containerInfo: l.containerInfo,
          pendingChildren: null,
          implementation: l.implementation,
        }),
        t
      );
    }
    var Y0 = new WeakMap();
    function Kl(l, t) {
      if (typeof l == "object" && l !== null) {
        var u = Y0.get(l);
        return u !== void 0
          ? u
          : ((t = { value: l, source: t, stack: S0(t) }), Y0.set(l, t), t);
      }
      return { value: l, source: t, stack: S0(t) };
    }
    var Zu = [],
      Vu = 0,
      ve = null,
      Wa = 0,
      Vl = [],
      xl = 0,
      $t = null,
      lt = 1,
      tt = "";
    function dt(l, t) {
      ((Zu[Vu++] = Wa), (Zu[Vu++] = ve), (ve = l), (Wa = t));
    }
    function Dy(l, t, u) {
      ((Vl[xl++] = lt), (Vl[xl++] = tt), (Vl[xl++] = $t), ($t = l));
      var a = lt;
      l = tt;
      var n = 32 - Yl(a) - 1;
      ((a &= ~(1 << n)), (u += 1));
      var e = 32 - Yl(t) + n;
      if (30 < e) {
        var f = n - (n % 5);
        ((e = (a & ((1 << f) - 1)).toString(32)),
          (a >>= f),
          (n -= f),
          (lt = (1 << (32 - Yl(t) + n)) | (u << n) | a),
          (tt = e + l));
      } else ((lt = (1 << e) | (u << n) | a), (tt = l));
    }
    function lc(l) {
      l.return !== null && (dt(l, 1), Dy(l, 1, 0));
    }
    function tc(l) {
      for (; l === ve; )
        ((ve = Zu[--Vu]), (Zu[Vu] = null), (Wa = Zu[--Vu]), (Zu[Vu] = null));
      for (; l === $t; )
        (($t = Vl[--xl]),
          (Vl[xl] = null),
          (tt = Vl[--xl]),
          (Vl[xl] = null),
          (lt = Vl[--xl]),
          (Vl[xl] = null));
    }
    function Uy(l, t) {
      ((Vl[xl++] = lt),
        (Vl[xl++] = tt),
        (Vl[xl++] = $t),
        (lt = t.id),
        (tt = t.overflow),
        ($t = l));
    }
    var sl = null,
      w = null,
      B = !1,
      Zt = null,
      Jl = !1,
      ii = Error(b(519));
    function Ft(l) {
      var t = Error(
        b(
          418,
          1 < arguments.length && arguments[1] !== void 0 && arguments[1]
            ? "text"
            : "HTML",
          "",
        ),
      );
      throw ($a(Kl(t, l)), ii);
    }
    function G0(l) {
      var t = l.stateNode,
        u = l.type,
        a = l.memoizedProps;
      switch (((t[dl] = l), (t[Ul] = a), u)) {
        case "dialog":
          (H("cancel", t), H("close", t));
          break;
        case "iframe":
        case "object":
        case "embed":
          H("load", t);
          break;
        case "video":
        case "audio":
          for (u = 0; u < Pa.length; u++) H(Pa[u], t);
          break;
        case "source":
          H("error", t);
          break;
        case "img":
        case "image":
        case "link":
          (H("error", t), H("load", t));
          break;
        case "details":
          H("toggle", t);
          break;
        case "input":
          (H("invalid", t),
            ay(
              t,
              a.value,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
              !0,
            ));
          break;
        case "select":
          H("invalid", t);
          break;
        case "textarea":
          (H("invalid", t), ey(t, a.value, a.defaultValue, a.children));
      }
      ((u = a.children),
        (typeof u != "string" &&
          typeof u != "number" &&
          typeof u != "bigint") ||
        t.textContent === "" + u ||
        a.suppressHydrationWarning === !0 ||
        ym(t.textContent, u)
          ? (a.popover != null && (H("beforetoggle", t), H("toggle", t)),
            a.onScroll != null && H("scroll", t),
            a.onScrollEnd != null && H("scrollend", t),
            a.onClick != null && (t.onclick = ot),
            (t = !0))
          : (t = !1),
        t || Ft(l, !0));
    }
    function X0(l) {
      for (sl = l.return; sl; )
        switch (sl.tag) {
          case 5:
          case 31:
          case 13:
            Jl = !1;
            return;
          case 27:
          case 3:
            Jl = !0;
            return;
          default:
            sl = sl.return;
        }
    }
    function pu(l) {
      if (l !== sl) return !1;
      if (!B) return (X0(l), (B = !0), !1);
      var t = l.tag,
        u;
      if (
        ((u = t !== 3 && t !== 27) &&
          ((u = t === 5) &&
            ((u = l.type),
            (u =
              !(u !== "form" && u !== "button") ||
              qi(l.type, l.memoizedProps))),
          (u = !u)),
        u && w && Ft(l),
        X0(l),
        t === 13)
      ) {
        if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
          throw Error(b(317));
        w = M1(l);
      } else if (t === 31) {
        if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
          throw Error(b(317));
        w = M1(l);
      } else
        t === 27
          ? ((t = w), lu(l.type) ? ((l = Gi), (Gi = null), (w = l)) : (w = t))
          : (w = sl ? Wl(l.stateNode.nextSibling) : null);
      return !0;
    }
    function mu() {
      ((w = sl = null), (B = !1));
    }
    function _f() {
      var l = Zt;
      return (
        l !== null &&
          (Ml === null ? (Ml = l) : Ml.push.apply(Ml, l), (Zt = null)),
        l
      );
    }
    function $a(l) {
      Zt === null ? (Zt = [l]) : Zt.push(l);
    }
    var ci = nt(null),
      Eu = null,
      St = null;
    function rt(l, t, u) {
      (L(ci, t._currentValue), (t._currentValue = u));
    }
    function bt(l) {
      ((l._currentValue = ci.current), vl(ci));
    }
    function yi(l, t, u) {
      for (; l !== null; ) {
        var a = l.alternate;
        if (
          ((l.childLanes & t) !== t
            ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
            : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
          l === u)
        )
          break;
        l = l.return;
      }
    }
    function vi(l, t, u, a) {
      var n = l.child;
      for (n !== null && (n.return = l); n !== null; ) {
        var e = n.dependencies;
        if (e !== null) {
          var f = n.child;
          e = e.firstContext;
          l: for (; e !== null; ) {
            var i = e;
            e = n;
            for (var c = 0; c < t.length; c++)
              if (i.context === t[c]) {
                ((e.lanes |= u),
                  (i = e.alternate),
                  i !== null && (i.lanes |= u),
                  yi(e.return, u, l),
                  a || (f = null));
                break l;
              }
            e = i.next;
          }
        } else if (n.tag === 18) {
          if (((f = n.return), f === null)) throw Error(b(341));
          ((f.lanes |= u),
            (e = f.alternate),
            e !== null && (e.lanes |= u),
            yi(f, u, l),
            (f = null));
        } else f = n.child;
        if (f !== null) f.return = n;
        else
          for (f = n; f !== null; ) {
            if (f === l) {
              f = null;
              break;
            }
            if (((n = f.sibling), n !== null)) {
              ((n.return = f.return), (f = n));
              break;
            }
            f = f.return;
          }
        n = f;
      }
    }
    function va(l, t, u, a) {
      l = null;
      for (var n = t, e = !1; n !== null; ) {
        if (!e) {
          if ((n.flags & 524288) !== 0) e = !0;
          else if ((n.flags & 262144) !== 0) break;
        }
        if (n.tag === 10) {
          var f = n.alternate;
          if (f === null) throw Error(b(387));
          if (((f = f.memoizedProps), f !== null)) {
            var i = n.type;
            Xl(n.pendingProps.value, f.value) ||
              (l !== null ? l.push(i) : (l = [i]));
          }
        } else if (n === ae.current) {
          if (((f = n.alternate), f === null)) throw Error(b(387));
          f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
            (l !== null ? l.push(tn) : (l = [tn]));
        }
        n = n.return;
      }
      (l !== null && vi(t, l, u, a), (t.flags |= 262144));
    }
    function me(l) {
      for (l = l.firstContext; l !== null; ) {
        if (!Xl(l.context._currentValue, l.memoizedValue)) return !0;
        l = l.next;
      }
      return !1;
    }
    function du(l) {
      ((Eu = l),
        (St = null),
        (l = l.dependencies),
        l !== null && (l.firstContext = null));
    }
    function hl(l) {
      return py(Eu, l);
    }
    function qn(l, t) {
      return (Eu === null && du(l), py(l, t));
    }
    function py(l, t) {
      var u = t._currentValue;
      if (((t = { context: t, memoizedValue: u, next: null }), St === null)) {
        if (l === null) throw Error(b(308));
        ((St = t),
          (l.dependencies = { lanes: 0, firstContext: t }),
          (l.flags |= 524288));
      } else St = St.next = t;
      return u;
    }
    var Ss =
        typeof AbortController < "u"
          ? AbortController
          : function () {
              var l = [],
                t = (this.signal = {
                  aborted: !1,
                  addEventListener: function (u, a) {
                    l.push(a);
                  },
                });
              this.abort = function () {
                ((t.aborted = !0),
                  l.forEach(function (u) {
                    return u();
                  }));
              };
            },
      gs = il.unstable_scheduleCallback,
      bs = il.unstable_NormalPriority,
      nl = {
        $$typeof: ht,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function uc() {
      return { controller: new Ss(), data: new Map(), refCount: 0 };
    }
    function mn(l) {
      (l.refCount--,
        l.refCount === 0 &&
          gs(bs, function () {
            l.controller.abort();
          }));
    }
    var Ba = null,
      mi = 0,
      la = 0,
      wu = null;
    function zs(l, t) {
      if (Ba === null) {
        var u = (Ba = []);
        ((mi = 0),
          (la = Uc()),
          (wu = {
            status: "pending",
            value: void 0,
            then: function (a) {
              u.push(a);
            },
          }));
      }
      return (mi++, t.then(Q0, Q0), t);
    }
    function Q0() {
      if (--mi === 0 && Ba !== null) {
        wu !== null && (wu.status = "fulfilled");
        var l = Ba;
        ((Ba = null), (la = 0), (wu = null));
        for (var t = 0; t < l.length; t++) (0, l[t])();
      }
    }
    function Es(l, t) {
      var u = [],
        a = {
          status: "pending",
          value: null,
          reason: null,
          then: function (n) {
            u.push(n);
          },
        };
      return (
        l.then(
          function () {
            ((a.status = "fulfilled"), (a.value = t));
            for (var n = 0; n < u.length; n++) (0, u[n])(t);
          },
          function (n) {
            for (a.status = "rejected", a.reason = n, n = 0; n < u.length; n++)
              (0, u[n])(void 0);
          },
        ),
        a
      );
    }
    var R0 = _.S;
    _.S = function (l, t) {
      ((Vv = Cl()),
        typeof t == "object" &&
          t !== null &&
          typeof t.then == "function" &&
          zs(l, t),
        R0 !== null && R0(l, t));
    };
    var cu = nt(null);
    function ac() {
      var l = cu.current;
      return l !== null ? l : x.pooledCache;
    }
    function wn(l, t) {
      t === null ? L(cu, cu.current) : L(cu, t.pool);
    }
    function Ny() {
      var l = ac();
      return l === null ? null : { parent: nl._currentValue, pool: l };
    }
    var ma = Error(b(460)),
      nc = Error(b(474)),
      Qe = Error(b(542)),
      de = { then: function () {} };
    function j0(l) {
      return ((l = l.status), l === "fulfilled" || l === "rejected");
    }
    function Hy(l, t, u) {
      switch (
        ((u = l[u]),
        u === void 0 ? l.push(t) : u !== t && (t.then(ot, ot), (t = u)),
        t.status)
      ) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw ((l = t.reason), V0(l), l);
        default:
          if (typeof t.status == "string") t.then(ot, ot);
          else {
            if (((l = x), l !== null && 100 < l.shellSuspendCounter))
              throw Error(b(482));
            ((l = t),
              (l.status = "pending"),
              l.then(
                function (a) {
                  if (t.status === "pending") {
                    var n = t;
                    ((n.status = "fulfilled"), (n.value = a));
                  }
                },
                function (a) {
                  if (t.status === "pending") {
                    var n = t;
                    ((n.status = "rejected"), (n.reason = a));
                  }
                },
              ));
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw ((l = t.reason), V0(l), l);
          }
          throw ((yu = t), ma);
      }
    }
    function nu(l) {
      try {
        var t = l._init;
        return t(l._payload);
      } catch (u) {
        throw u !== null && typeof u == "object" && typeof u.then == "function"
          ? ((yu = u), ma)
          : u;
      }
    }
    var yu = null;
    function Z0() {
      if (yu === null) throw Error(b(459));
      var l = yu;
      return ((yu = null), l);
    }
    function V0(l) {
      if (l === ma || l === Qe) throw Error(b(483));
    }
    var Wu = null,
      Fa = 0;
    function Cn(l) {
      var t = Fa;
      return ((Fa += 1), Wu === null && (Wu = []), Hy(Wu, l, t));
    }
    function Ta(l, t) {
      ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
    }
    function Bn(l, t) {
      throw t.$$typeof === fd
        ? Error(b(525))
        : ((l = Object.prototype.toString.call(t)),
          Error(
            b(
              31,
              l === "[object Object]"
                ? "object with keys {" + Object.keys(t).join(", ") + "}"
                : l,
            ),
          ));
    }
    function ry(l) {
      function t(v, y) {
        if (l) {
          var d = v.deletions;
          d === null ? ((v.deletions = [y]), (v.flags |= 16)) : d.push(y);
        }
      }
      function u(v, y) {
        if (!l) return null;
        for (; y !== null; ) (t(v, y), (y = y.sibling));
        return null;
      }
      function a(v) {
        for (var y = new Map(); v !== null; )
          (v.key !== null ? y.set(v.key, v) : y.set(v.index, v),
            (v = v.sibling));
        return y;
      }
      function n(v, y) {
        return ((v = gt(v, y)), (v.index = 0), (v.sibling = null), v);
      }
      function e(v, y, d) {
        return (
          (v.index = d),
          l
            ? ((d = v.alternate),
              d !== null
                ? ((d = d.index), d < y ? ((v.flags |= 67108866), y) : d)
                : ((v.flags |= 67108866), y))
            : ((v.flags |= 1048576), y)
        );
      }
      function f(v) {
        return (l && v.alternate === null && (v.flags |= 67108866), v);
      }
      function i(v, y, d, S) {
        return y === null || y.tag !== 6
          ? ((y = Af(d, v.mode, S)), (y.return = v), y)
          : ((y = n(y, d)), (y.return = v), y);
      }
      function c(v, y, d, S) {
        var A = d.type;
        return A === qu
          ? o(v, y, d.props.children, S, d.key)
          : y !== null &&
              (y.elementType === A ||
                (typeof A == "object" &&
                  A !== null &&
                  A.$$typeof === Nt &&
                  nu(A) === y.type))
            ? ((y = n(y, d.props)), Ta(y, d), (y.return = v), y)
            : ((y = Jn(d.type, d.key, d.props, null, v.mode, S)),
              Ta(y, d),
              (y.return = v),
              y);
      }
      function m(v, y, d, S) {
        return y === null ||
          y.tag !== 4 ||
          y.stateNode.containerInfo !== d.containerInfo ||
          y.stateNode.implementation !== d.implementation
          ? ((y = Of(d, v.mode, S)), (y.return = v), y)
          : ((y = n(y, d.children || [])), (y.return = v), y);
      }
      function o(v, y, d, S, A) {
        return y === null || y.tag !== 7
          ? ((y = iu(d, v.mode, S, A)), (y.return = v), y)
          : ((y = n(y, d)), (y.return = v), y);
      }
      function g(v, y, d) {
        if (
          (typeof y == "string" && y !== "") ||
          typeof y == "number" ||
          typeof y == "bigint"
        )
          return ((y = Af("" + y, v.mode, d)), (y.return = v), y);
        if (typeof y == "object" && y !== null) {
          switch (y.$$typeof) {
            case _n:
              return (
                (d = Jn(y.type, y.key, y.props, null, v.mode, d)),
                Ta(d, y),
                (d.return = v),
                d
              );
            case Da:
              return ((y = Of(y, v.mode, d)), (y.return = v), y);
            case Nt:
              return ((y = nu(y)), g(v, y, d));
          }
          if (Ua(y) || za(y))
            return ((y = iu(y, v.mode, d, null)), (y.return = v), y);
          if (typeof y.then == "function") return g(v, Cn(y), d);
          if (y.$$typeof === ht) return g(v, qn(v, y), d);
          Bn(v, y);
        }
        return null;
      }
      function s(v, y, d, S) {
        var A = y !== null ? y.key : null;
        if (
          (typeof d == "string" && d !== "") ||
          typeof d == "number" ||
          typeof d == "bigint"
        )
          return A !== null ? null : i(v, y, "" + d, S);
        if (typeof d == "object" && d !== null) {
          switch (d.$$typeof) {
            case _n:
              return d.key === A ? c(v, y, d, S) : null;
            case Da:
              return d.key === A ? m(v, y, d, S) : null;
            case Nt:
              return ((d = nu(d)), s(v, y, d, S));
          }
          if (Ua(d) || za(d)) return A !== null ? null : o(v, y, d, S, null);
          if (typeof d.then == "function") return s(v, y, Cn(d), S);
          if (d.$$typeof === ht) return s(v, y, qn(v, d), S);
          Bn(v, d);
        }
        return null;
      }
      function h(v, y, d, S, A) {
        if (
          (typeof S == "string" && S !== "") ||
          typeof S == "number" ||
          typeof S == "bigint"
        )
          return ((v = v.get(d) || null), i(y, v, "" + S, A));
        if (typeof S == "object" && S !== null) {
          switch (S.$$typeof) {
            case _n:
              return (
                (v = v.get(S.key === null ? d : S.key) || null),
                c(y, v, S, A)
              );
            case Da:
              return (
                (v = v.get(S.key === null ? d : S.key) || null),
                m(y, v, S, A)
              );
            case Nt:
              return ((S = nu(S)), h(v, y, d, S, A));
          }
          if (Ua(S) || za(S))
            return ((v = v.get(d) || null), o(y, v, S, A, null));
          if (typeof S.then == "function") return h(v, y, d, Cn(S), A);
          if (S.$$typeof === ht) return h(v, y, d, qn(y, S), A);
          Bn(y, S);
        }
        return null;
      }
      function E(v, y, d, S) {
        for (
          var A = null, C = null, T = y, D = (y = 0), N = null;
          T !== null && D < d.length;
          D++
        ) {
          T.index > D ? ((N = T), (T = null)) : (N = T.sibling);
          var G = s(v, T, d[D], S);
          if (G === null) {
            T === null && (T = N);
            break;
          }
          (l && T && G.alternate === null && t(v, T),
            (y = e(G, y, D)),
            C === null ? (A = G) : (C.sibling = G),
            (C = G),
            (T = N));
        }
        if (D === d.length) return (u(v, T), B && dt(v, D), A);
        if (T === null) {
          for (; D < d.length; D++)
            ((T = g(v, d[D], S)),
              T !== null &&
                ((y = e(T, y, D)),
                C === null ? (A = T) : (C.sibling = T),
                (C = T)));
          return (B && dt(v, D), A);
        }
        for (T = a(T); D < d.length; D++)
          ((N = h(T, v, D, d[D], S)),
            N !== null &&
              (l &&
                N.alternate !== null &&
                T.delete(N.key === null ? D : N.key),
              (y = e(N, y, D)),
              C === null ? (A = N) : (C.sibling = N),
              (C = N)));
        return (
          l &&
            T.forEach(function (M) {
              return t(v, M);
            }),
          B && dt(v, D),
          A
        );
      }
      function O(v, y, d, S) {
        if (d == null) throw Error(b(151));
        for (
          var A = null, C = null, T = y, D = (y = 0), N = null, G = d.next();
          T !== null && !G.done;
          D++, G = d.next()
        ) {
          T.index > D ? ((N = T), (T = null)) : (N = T.sibling);
          var M = s(v, T, G.value, S);
          if (M === null) {
            T === null && (T = N);
            break;
          }
          (l && T && M.alternate === null && t(v, T),
            (y = e(M, y, D)),
            C === null ? (A = M) : (C.sibling = M),
            (C = M),
            (T = N));
        }
        if (G.done) return (u(v, T), B && dt(v, D), A);
        if (T === null) {
          for (; !G.done; D++, G = d.next())
            ((G = g(v, G.value, S)),
              G !== null &&
                ((y = e(G, y, D)),
                C === null ? (A = G) : (C.sibling = G),
                (C = G)));
          return (B && dt(v, D), A);
        }
        for (T = a(T); !G.done; D++, G = d.next())
          ((G = h(T, v, D, G.value, S)),
            G !== null &&
              (l &&
                G.alternate !== null &&
                T.delete(G.key === null ? D : G.key),
              (y = e(G, y, D)),
              C === null ? (A = G) : (C.sibling = G),
              (C = G)));
        return (
          l &&
            T.forEach(function (k) {
              return t(v, k);
            }),
          B && dt(v, D),
          A
        );
      }
      function Y(v, y, d, S) {
        if (
          (typeof d == "object" &&
            d !== null &&
            d.type === qu &&
            d.key === null &&
            (d = d.props.children),
          typeof d == "object" && d !== null)
        ) {
          switch (d.$$typeof) {
            case _n:
              l: {
                for (var A = d.key; y !== null; ) {
                  if (y.key === A) {
                    if (((A = d.type), A === qu)) {
                      if (y.tag === 7) {
                        (u(v, y.sibling),
                          (S = n(y, d.props.children)),
                          (S.return = v),
                          (v = S));
                        break l;
                      }
                    } else if (
                      y.elementType === A ||
                      (typeof A == "object" &&
                        A !== null &&
                        A.$$typeof === Nt &&
                        nu(A) === y.type)
                    ) {
                      (u(v, y.sibling),
                        (S = n(y, d.props)),
                        Ta(S, d),
                        (S.return = v),
                        (v = S));
                      break l;
                    }
                    u(v, y);
                    break;
                  } else t(v, y);
                  y = y.sibling;
                }
                d.type === qu
                  ? ((S = iu(d.props.children, v.mode, S, d.key)),
                    (S.return = v),
                    (v = S))
                  : ((S = Jn(d.type, d.key, d.props, null, v.mode, S)),
                    Ta(S, d),
                    (S.return = v),
                    (v = S));
              }
              return f(v);
            case Da:
              l: {
                for (A = d.key; y !== null; ) {
                  if (y.key === A)
                    if (
                      y.tag === 4 &&
                      y.stateNode.containerInfo === d.containerInfo &&
                      y.stateNode.implementation === d.implementation
                    ) {
                      (u(v, y.sibling),
                        (S = n(y, d.children || [])),
                        (S.return = v),
                        (v = S));
                      break l;
                    } else {
                      u(v, y);
                      break;
                    }
                  else t(v, y);
                  y = y.sibling;
                }
                ((S = Of(d, v.mode, S)), (S.return = v), (v = S));
              }
              return f(v);
            case Nt:
              return ((d = nu(d)), Y(v, y, d, S));
          }
          if (Ua(d)) return E(v, y, d, S);
          if (za(d)) {
            if (((A = za(d)), typeof A != "function")) throw Error(b(150));
            return ((d = A.call(d)), O(v, y, d, S));
          }
          if (typeof d.then == "function") return Y(v, y, Cn(d), S);
          if (d.$$typeof === ht) return Y(v, y, qn(v, d), S);
          Bn(v, d);
        }
        return (typeof d == "string" && d !== "") ||
          typeof d == "number" ||
          typeof d == "bigint"
          ? ((d = "" + d),
            y !== null && y.tag === 6
              ? (u(v, y.sibling), (S = n(y, d)), (S.return = v), (v = S))
              : (u(v, y), (S = Af(d, v.mode, S)), (S.return = v), (v = S)),
            f(v))
          : u(v, y);
      }
      return function (v, y, d, S) {
        try {
          Fa = 0;
          var A = Y(v, y, d, S);
          return ((Wu = null), A);
        } catch (T) {
          if (T === ma || T === Qe) throw T;
          var C = rl(29, T, null, v.mode);
          return ((C.lanes = S), (C.return = v), C);
        }
      };
    }
    var su = ry(!0),
      qy = ry(!1),
      Ht = !1;
    function ec(l) {
      l.updateQueue = {
        baseState: l.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function di(l, t) {
      ((l = l.updateQueue),
        t.updateQueue === l &&
          (t.updateQueue = {
            baseState: l.baseState,
            firstBaseUpdate: l.firstBaseUpdate,
            lastBaseUpdate: l.lastBaseUpdate,
            shared: l.shared,
            callbacks: null,
          }));
    }
    function Vt(l) {
      return { lane: l, tag: 0, payload: null, callback: null, next: null };
    }
    function xt(l, t, u) {
      var a = l.updateQueue;
      if (a === null) return null;
      if (((a = a.shared), (X & 2) !== 0)) {
        var n = a.pending;
        return (
          n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
          (a.pending = t),
          (t = ye(l)),
          Oy(l, null, u),
          t
        );
      }
      return (Xe(l, a, t, u), ye(l));
    }
    function Ya(l, t, u) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (u & 4194048) !== 0))
      ) {
        var a = t.lanes;
        ((a &= l.pendingLanes), (u |= a), (t.lanes = u), F1(l, u));
      }
    }
    function Mf(l, t) {
      var u = l.updateQueue,
        a = l.alternate;
      if (a !== null && ((a = a.updateQueue), u === a)) {
        var n = null,
          e = null;
        if (((u = u.firstBaseUpdate), u !== null)) {
          do {
            var f = {
              lane: u.lane,
              tag: u.tag,
              payload: u.payload,
              callback: null,
              next: null,
            };
            (e === null ? (n = e = f) : (e = e.next = f), (u = u.next));
          } while (u !== null);
          e === null ? (n = e = t) : (e = e.next = t);
        } else n = e = t;
        ((u = {
          baseState: a.baseState,
          firstBaseUpdate: n,
          lastBaseUpdate: e,
          shared: a.shared,
          callbacks: a.callbacks,
        }),
          (l.updateQueue = u));
        return;
      }
      ((l = u.lastBaseUpdate),
        l === null ? (u.firstBaseUpdate = t) : (l.next = t),
        (u.lastBaseUpdate = t));
    }
    var si = !1;
    function Ga() {
      if (si) {
        var l = wu;
        if (l !== null) throw l;
      }
    }
    function Xa(l, t, u, a) {
      si = !1;
      var n = l.updateQueue;
      Ht = !1;
      var e = n.firstBaseUpdate,
        f = n.lastBaseUpdate,
        i = n.shared.pending;
      if (i !== null) {
        n.shared.pending = null;
        var c = i,
          m = c.next;
        ((c.next = null), f === null ? (e = m) : (f.next = m), (f = c));
        var o = l.alternate;
        o !== null &&
          ((o = o.updateQueue),
          (i = o.lastBaseUpdate),
          i !== f &&
            (i === null ? (o.firstBaseUpdate = m) : (i.next = m),
            (o.lastBaseUpdate = c)));
      }
      if (e !== null) {
        var g = n.baseState;
        ((f = 0), (o = m = c = null), (i = e));
        do {
          var s = i.lane & -536870913,
            h = s !== i.lane;
          if (h ? (q & s) === s : (a & s) === s) {
            (s !== 0 && s === la && (si = !0),
              o !== null &&
                (o = o.next =
                  {
                    lane: 0,
                    tag: i.tag,
                    payload: i.payload,
                    callback: null,
                    next: null,
                  }));
            l: {
              var E = l,
                O = i;
              s = t;
              var Y = u;
              switch (O.tag) {
                case 1:
                  if (((E = O.payload), typeof E == "function")) {
                    g = E.call(Y, g, s);
                    break l;
                  }
                  g = E;
                  break l;
                case 3:
                  E.flags = (E.flags & -65537) | 128;
                case 0:
                  if (
                    ((E = O.payload),
                    (s = typeof E == "function" ? E.call(Y, g, s) : E),
                    s == null)
                  )
                    break l;
                  g = W({}, g, s);
                  break l;
                case 2:
                  Ht = !0;
              }
            }
            ((s = i.callback),
              s !== null &&
                ((l.flags |= 64),
                h && (l.flags |= 8192),
                (h = n.callbacks),
                h === null ? (n.callbacks = [s]) : h.push(s)));
          } else
            ((h = {
              lane: s,
              tag: i.tag,
              payload: i.payload,
              callback: i.callback,
              next: null,
            }),
              o === null ? ((m = o = h), (c = g)) : (o = o.next = h),
              (f |= s));
          if (((i = i.next), i === null)) {
            if (((i = n.shared.pending), i === null)) break;
            ((h = i),
              (i = h.next),
              (h.next = null),
              (n.lastBaseUpdate = h),
              (n.shared.pending = null));
          }
        } while (!0);
        (o === null && (c = g),
          (n.baseState = c),
          (n.firstBaseUpdate = m),
          (n.lastBaseUpdate = o),
          e === null && (n.shared.lanes = 0),
          (It |= f),
          (l.lanes = f),
          (l.memoizedState = g));
      }
    }
    function Cy(l, t) {
      if (typeof l != "function") throw Error(b(191, l));
      l.call(t);
    }
    function By(l, t) {
      var u = l.callbacks;
      if (u !== null)
        for (l.callbacks = null, l = 0; l < u.length; l++) Cy(u[l], t);
    }
    var ta = nt(null),
      se = nt(0);
    function x0(l, t) {
      ((l = _t), L(se, l), L(ta, t), (_t = l | t.baseLanes));
    }
    function hi() {
      (L(se, _t), L(ta, ta.current));
    }
    function fc() {
      ((_t = se.current), vl(ta), vl(se));
    }
    var Ql = nt(null),
      wl = null;
    function qt(l) {
      var t = l.alternate;
      (L(ll, ll.current & 1),
        L(Ql, l),
        wl === null &&
          (t === null || ta.current !== null || t.memoizedState !== null) &&
          (wl = l));
    }
    function oi(l) {
      (L(ll, ll.current), L(Ql, l), wl === null && (wl = l));
    }
    function Yy(l) {
      l.tag === 22
        ? (L(ll, ll.current), L(Ql, l), wl === null && (wl = l))
        : Ct(l);
    }
    function Ct() {
      (L(ll, ll.current), L(Ql, Ql.current));
    }
    function Hl(l) {
      (vl(Ql), wl === l && (wl = null), vl(ll));
    }
    var ll = nt(0);
    function he(l) {
      for (var t = l; t !== null; ) {
        if (t.tag === 13) {
          var u = t.memoizedState;
          if (u !== null && ((u = u.dehydrated), u === null || Bi(u) || Yi(u)))
            return t;
        } else if (
          t.tag === 19 &&
          (t.memoizedProps.revealOrder === "forwards" ||
            t.memoizedProps.revealOrder === "backwards" ||
            t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
            t.memoizedProps.revealOrder === "together")
        ) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return null;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
      return null;
    }
    var Tt = 0,
      p = null,
      V = null,
      ul = null,
      oe = !1,
      $u = !1,
      hu = !1,
      Se = 0,
      ka = 0,
      Fu = null,
      Ts = 0;
    function I() {
      throw Error(b(321));
    }
    function ic(l, t) {
      if (t === null) return !1;
      for (var u = 0; u < t.length && u < l.length; u++)
        if (!Xl(l[u], t[u])) return !1;
      return !0;
    }
    function cc(l, t, u, a, n, e) {
      return (
        (Tt = e),
        (p = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (_.H = l === null || l.memoizedState === null ? dv : zc),
        (hu = !1),
        (e = u(a, n)),
        (hu = !1),
        $u && (e = Xy(t, u, a, n)),
        Gy(l),
        e
      );
    }
    function Gy(l) {
      _.H = Ia;
      var t = V !== null && V.next !== null;
      if (((Tt = 0), (ul = V = p = null), (oe = !1), (ka = 0), (Fu = null), t))
        throw Error(b(300));
      l === null ||
        el ||
        ((l = l.dependencies), l !== null && me(l) && (el = !0));
    }
    function Xy(l, t, u, a) {
      p = l;
      var n = 0;
      do {
        if (($u && (Fu = null), (ka = 0), ($u = !1), 25 <= n))
          throw Error(b(301));
        if (((n += 1), (ul = V = null), l.updateQueue != null)) {
          var e = l.updateQueue;
          ((e.lastEffect = null),
            (e.events = null),
            (e.stores = null),
            e.memoCache != null && (e.memoCache.index = 0));
        }
        ((_.H = sv), (e = t(u, a)));
      } while ($u);
      return e;
    }
    function As() {
      var l = _.H,
        t = l.useState()[0];
      return (
        (t = typeof t.then == "function" ? dn(t) : t),
        (l = l.useState()[0]),
        (V !== null ? V.memoizedState : null) !== l && (p.flags |= 1024),
        t
      );
    }
    function yc() {
      var l = Se !== 0;
      return ((Se = 0), l);
    }
    function vc(l, t, u) {
      ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~u));
    }
    function mc(l) {
      if (oe) {
        for (l = l.memoizedState; l !== null; ) {
          var t = l.queue;
          (t !== null && (t.pending = null), (l = l.next));
        }
        oe = !1;
      }
      ((Tt = 0), (ul = V = p = null), ($u = !1), (ka = Se = 0), (Fu = null));
    }
    function zl() {
      var l = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        ul === null ? (p.memoizedState = ul = l) : (ul = ul.next = l),
        ul
      );
    }
    function tl() {
      if (V === null) {
        var l = p.alternate;
        l = l !== null ? l.memoizedState : null;
      } else l = V.next;
      var t = ul === null ? p.memoizedState : ul.next;
      if (t !== null) ((ul = t), (V = l));
      else {
        if (l === null)
          throw p.alternate === null ? Error(b(467)) : Error(b(310));
        ((V = l),
          (l = {
            memoizedState: V.memoizedState,
            baseState: V.baseState,
            baseQueue: V.baseQueue,
            queue: V.queue,
            next: null,
          }),
          ul === null ? (p.memoizedState = ul = l) : (ul = ul.next = l));
      }
      return ul;
    }
    function Re() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function dn(l) {
      var t = ka;
      return (
        (ka += 1),
        Fu === null && (Fu = []),
        (l = Hy(Fu, l, t)),
        (t = p),
        (ul === null ? t.memoizedState : ul.next) === null &&
          ((t = t.alternate),
          (_.H = t === null || t.memoizedState === null ? dv : zc)),
        l
      );
    }
    function je(l) {
      if (l !== null && typeof l == "object") {
        if (typeof l.then == "function") return dn(l);
        if (l.$$typeof === ht) return hl(l);
      }
      throw Error(b(438, String(l)));
    }
    function dc(l) {
      var t = null,
        u = p.updateQueue;
      if ((u !== null && (t = u.memoCache), t == null)) {
        var a = p.alternate;
        a !== null &&
          ((a = a.updateQueue),
          a !== null &&
            ((a = a.memoCache),
            a != null &&
              (t = {
                data: a.data.map(function (n) {
                  return n.slice();
                }),
                index: 0,
              })));
      }
      if (
        (t == null && (t = { data: [], index: 0 }),
        u === null && ((u = Re()), (p.updateQueue = u)),
        (u.memoCache = t),
        (u = t.data[t.index]),
        u === void 0)
      )
        for (u = t.data[t.index] = Array(l), a = 0; a < l; a++) u[a] = id;
      return (t.index++, u);
    }
    function At(l, t) {
      return typeof t == "function" ? t(l) : t;
    }
    function Wn(l) {
      var t = tl();
      return sc(t, V, l);
    }
    function sc(l, t, u) {
      var a = l.queue;
      if (a === null) throw Error(b(311));
      a.lastRenderedReducer = u;
      var n = l.baseQueue,
        e = a.pending;
      if (e !== null) {
        if (n !== null) {
          var f = n.next;
          ((n.next = e.next), (e.next = f));
        }
        ((t.baseQueue = n = e), (a.pending = null));
      }
      if (((e = l.baseState), n === null)) l.memoizedState = e;
      else {
        t = n.next;
        var i = (f = null),
          c = null,
          m = t,
          o = !1;
        do {
          var g = m.lane & -536870913;
          if (g !== m.lane ? (q & g) === g : (Tt & g) === g) {
            var s = m.revertLane;
            if (s === 0)
              (c !== null &&
                (c = c.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: m.action,
                    hasEagerState: m.hasEagerState,
                    eagerState: m.eagerState,
                    next: null,
                  }),
                g === la && (o = !0));
            else if ((Tt & s) === s) {
              ((m = m.next), s === la && (o = !0));
              continue;
            } else
              ((g = {
                lane: 0,
                revertLane: m.revertLane,
                gesture: null,
                action: m.action,
                hasEagerState: m.hasEagerState,
                eagerState: m.eagerState,
                next: null,
              }),
                c === null ? ((i = c = g), (f = e)) : (c = c.next = g),
                (p.lanes |= s),
                (It |= s));
            ((g = m.action),
              hu && u(e, g),
              (e = m.hasEagerState ? m.eagerState : u(e, g)));
          } else
            ((s = {
              lane: g,
              revertLane: m.revertLane,
              gesture: m.gesture,
              action: m.action,
              hasEagerState: m.hasEagerState,
              eagerState: m.eagerState,
              next: null,
            }),
              c === null ? ((i = c = s), (f = e)) : (c = c.next = s),
              (p.lanes |= g),
              (It |= g));
          m = m.next;
        } while (m !== null && m !== t);
        if (
          (c === null ? (f = e) : (c.next = i),
          !Xl(e, l.memoizedState) && ((el = !0), o && ((u = wu), u !== null)))
        )
          throw u;
        ((l.memoizedState = e),
          (l.baseState = f),
          (l.baseQueue = c),
          (a.lastRenderedState = e));
      }
      return (n === null && (a.lanes = 0), [l.memoizedState, a.dispatch]);
    }
    function Df(l) {
      var t = tl(),
        u = t.queue;
      if (u === null) throw Error(b(311));
      u.lastRenderedReducer = l;
      var a = u.dispatch,
        n = u.pending,
        e = t.memoizedState;
      if (n !== null) {
        u.pending = null;
        var f = (n = n.next);
        do ((e = l(e, f.action)), (f = f.next));
        while (f !== n);
        (Xl(e, t.memoizedState) || (el = !0),
          (t.memoizedState = e),
          t.baseQueue === null && (t.baseState = e),
          (u.lastRenderedState = e));
      }
      return [e, a];
    }
    function Qy(l, t, u) {
      var a = p,
        n = tl(),
        e = B;
      if (e) {
        if (u === void 0) throw Error(b(407));
        u = u();
      } else u = t();
      var f = !Xl((V || n).memoizedState, u);
      if (
        (f && ((n.memoizedState = u), (el = !0)),
        (n = n.queue),
        hc(Zy.bind(null, a, n, l), [l]),
        n.getSnapshot !== t || f || (ul !== null && ul.memoizedState.tag & 1))
      ) {
        if (
          ((a.flags |= 2048),
          ua(9, { destroy: void 0 }, jy.bind(null, a, n, u, t), null),
          x === null)
        )
          throw Error(b(349));
        e || (Tt & 127) !== 0 || Ry(a, t, u);
      }
      return u;
    }
    function Ry(l, t, u) {
      ((l.flags |= 16384),
        (l = { getSnapshot: t, value: u }),
        (t = p.updateQueue),
        t === null
          ? ((t = Re()), (p.updateQueue = t), (t.stores = [l]))
          : ((u = t.stores), u === null ? (t.stores = [l]) : u.push(l)));
    }
    function jy(l, t, u, a) {
      ((t.value = u), (t.getSnapshot = a), Vy(t) && xy(l));
    }
    function Zy(l, t, u) {
      return u(function () {
        Vy(t) && xy(l);
      });
    }
    function Vy(l) {
      var t = l.getSnapshot;
      l = l.value;
      try {
        var u = t();
        return !Xl(l, u);
      } catch {
        return !0;
      }
    }
    function xy(l) {
      var t = zu(l, 2);
      t !== null && Dl(t, l, 2);
    }
    function Si(l) {
      var t = zl();
      if (typeof l == "function") {
        var u = l;
        if (((l = u()), hu)) {
          Yt(!0);
          try {
            u();
          } finally {
            Yt(!1);
          }
        }
      }
      return (
        (t.memoizedState = t.baseState = l),
        (t.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: At,
          lastRenderedState: l,
        }),
        t
      );
    }
    function Ly(l, t, u, a) {
      return ((l.baseState = u), sc(l, V, typeof a == "function" ? a : At));
    }
    function Os(l, t, u, a, n) {
      if (Ve(l)) throw Error(b(485));
      if (((l = t.action), l !== null)) {
        var e = {
          payload: n,
          action: l,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function (f) {
            e.listeners.push(f);
          },
        };
        (_.T !== null ? u(!0) : (e.isTransition = !1),
          a(e),
          (u = t.pending),
          u === null
            ? ((e.next = t.pending = e), Ky(t, e))
            : ((e.next = u.next), (t.pending = u.next = e)));
      }
    }
    function Ky(l, t) {
      var u = t.action,
        a = t.payload,
        n = l.state;
      if (t.isTransition) {
        var e = _.T,
          f = {};
        _.T = f;
        try {
          var i = u(n, a),
            c = _.S;
          (c !== null && c(f, i), L0(l, t, i));
        } catch (m) {
          gi(l, t, m);
        } finally {
          (e !== null && f.types !== null && (e.types = f.types), (_.T = e));
        }
      } else
        try {
          ((e = u(n, a)), L0(l, t, e));
        } catch (m) {
          gi(l, t, m);
        }
    }
    function L0(l, t, u) {
      u !== null && typeof u == "object" && typeof u.then == "function"
        ? u.then(
            function (a) {
              K0(l, t, a);
            },
            function (a) {
              return gi(l, t, a);
            },
          )
        : K0(l, t, u);
    }
    function K0(l, t, u) {
      ((t.status = "fulfilled"),
        (t.value = u),
        Jy(t),
        (l.state = u),
        (t = l.pending),
        t !== null &&
          ((u = t.next),
          u === t
            ? (l.pending = null)
            : ((u = u.next), (t.next = u), Ky(l, u))));
    }
    function gi(l, t, u) {
      var a = l.pending;
      if (((l.pending = null), a !== null)) {
        a = a.next;
        do ((t.status = "rejected"), (t.reason = u), Jy(t), (t = t.next));
        while (t !== a);
      }
      l.action = null;
    }
    function Jy(l) {
      l = l.listeners;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
    function wy(l, t) {
      return t;
    }
    function J0(l, t) {
      if (B) {
        var u = x.formState;
        if (u !== null) {
          l: {
            var a = p;
            if (B) {
              if (w) {
                t: {
                  for (var n = w, e = Jl; n.nodeType !== 8; ) {
                    if (!e) {
                      n = null;
                      break t;
                    }
                    if (((n = Wl(n.nextSibling)), n === null)) {
                      n = null;
                      break t;
                    }
                  }
                  ((e = n.data), (n = e === "F!" || e === "F" ? n : null));
                }
                if (n) {
                  ((w = Wl(n.nextSibling)), (a = n.data === "F!"));
                  break l;
                }
              }
              Ft(a);
            }
            a = !1;
          }
          a && (t = u[0]);
        }
      }
      return (
        (u = zl()),
        (u.memoizedState = u.baseState = t),
        (a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: wy,
          lastRenderedState: t,
        }),
        (u.queue = a),
        (u = yv.bind(null, p, a)),
        (a.dispatch = u),
        (a = Si(!1)),
        (e = bc.bind(null, p, !1, a.queue)),
        (a = zl()),
        (n = { state: t, dispatch: null, action: l, pending: null }),
        (a.queue = n),
        (u = Os.bind(null, p, n, e, u)),
        (n.dispatch = u),
        (a.memoizedState = l),
        [t, u, !1]
      );
    }
    function w0(l) {
      var t = tl();
      return Wy(t, V, l);
    }
    function Wy(l, t, u) {
      if (
        ((t = sc(l, t, wy)[0]),
        (l = Wn(At)[0]),
        typeof t == "object" && t !== null && typeof t.then == "function")
      )
        try {
          var a = dn(t);
        } catch (f) {
          throw f === ma ? Qe : f;
        }
      else a = t;
      t = tl();
      var n = t.queue,
        e = n.dispatch;
      return (
        u !== t.memoizedState &&
          ((p.flags |= 2048),
          ua(9, { destroy: void 0 }, _s.bind(null, n, u), null)),
        [a, e, l]
      );
    }
    function _s(l, t) {
      l.action = t;
    }
    function W0(l) {
      var t = tl(),
        u = V;
      if (u !== null) return Wy(t, u, l);
      (tl(), (t = t.memoizedState), (u = tl()));
      var a = u.queue.dispatch;
      return ((u.memoizedState = l), [t, a, !1]);
    }
    function ua(l, t, u, a) {
      return (
        (l = { tag: l, create: u, deps: a, inst: t, next: null }),
        (t = p.updateQueue),
        t === null && ((t = Re()), (p.updateQueue = t)),
        (u = t.lastEffect),
        u === null
          ? (t.lastEffect = l.next = l)
          : ((a = u.next), (u.next = l), (l.next = a), (t.lastEffect = l)),
        l
      );
    }
    function $y() {
      return tl().memoizedState;
    }
    function $n(l, t, u, a) {
      var n = zl();
      ((p.flags |= l),
        (n.memoizedState = ua(
          1 | t,
          { destroy: void 0 },
          u,
          a === void 0 ? null : a,
        )));
    }
    function Ze(l, t, u, a) {
      var n = tl();
      a = a === void 0 ? null : a;
      var e = n.memoizedState.inst;
      V !== null && a !== null && ic(a, V.memoizedState.deps)
        ? (n.memoizedState = ua(t, e, u, a))
        : ((p.flags |= l), (n.memoizedState = ua(1 | t, e, u, a)));
    }
    function $0(l, t) {
      $n(8390656, 8, l, t);
    }
    function hc(l, t) {
      Ze(2048, 8, l, t);
    }
    function Ms(l) {
      p.flags |= 4;
      var t = p.updateQueue;
      if (t === null) ((t = Re()), (p.updateQueue = t), (t.events = [l]));
      else {
        var u = t.events;
        u === null ? (t.events = [l]) : u.push(l);
      }
    }
    function Fy(l) {
      var t = tl().memoizedState;
      return (
        Ms({ ref: t, nextImpl: l }),
        function () {
          if ((X & 2) !== 0) throw Error(b(440));
          return t.impl.apply(void 0, arguments);
        }
      );
    }
    function ky(l, t) {
      return Ze(4, 2, l, t);
    }
    function Iy(l, t) {
      return Ze(4, 4, l, t);
    }
    function Py(l, t) {
      if (typeof t == "function") {
        l = l();
        var u = t(l);
        return function () {
          typeof u == "function" ? u() : t(null);
        };
      }
      if (t != null)
        return (
          (l = l()),
          (t.current = l),
          function () {
            t.current = null;
          }
        );
    }
    function lv(l, t, u) {
      ((u = u != null ? u.concat([l]) : null),
        Ze(4, 4, Py.bind(null, t, l), u));
    }
    function oc() {}
    function tv(l, t) {
      var u = tl();
      t = t === void 0 ? null : t;
      var a = u.memoizedState;
      return t !== null && ic(t, a[1]) ? a[0] : ((u.memoizedState = [l, t]), l);
    }
    function uv(l, t) {
      var u = tl();
      t = t === void 0 ? null : t;
      var a = u.memoizedState;
      if (t !== null && ic(t, a[1])) return a[0];
      if (((a = l()), hu)) {
        Yt(!0);
        try {
          l();
        } finally {
          Yt(!1);
        }
      }
      return ((u.memoizedState = [a, t]), a);
    }
    function Sc(l, t, u) {
      return u === void 0 || ((Tt & 1073741824) !== 0 && (q & 261930) === 0)
        ? (l.memoizedState = t)
        : ((l.memoizedState = u), (l = Lv()), (p.lanes |= l), (It |= l), u);
    }
    function av(l, t, u, a) {
      return Xl(u, t)
        ? u
        : ta.current !== null
          ? ((l = Sc(l, u, a)), Xl(l, t) || (el = !0), l)
          : (Tt & 42) === 0 || ((Tt & 1073741824) !== 0 && (q & 261930) === 0)
            ? ((el = !0), (l.memoizedState = u))
            : ((l = Lv()), (p.lanes |= l), (It |= l), t);
    }
    function nv(l, t, u, a, n) {
      var e = Q.p;
      Q.p = e !== 0 && 8 > e ? e : 8;
      var f = _.T,
        i = {};
      ((_.T = i), bc(l, !1, t, u));
      try {
        var c = n(),
          m = _.S;
        if (
          (m !== null && m(i, c),
          c !== null && typeof c == "object" && typeof c.then == "function")
        ) {
          var o = Es(c, a);
          Qa(l, t, o, Gl(l));
        } else Qa(l, t, a, Gl(l));
      } catch (g) {
        Qa(l, t, { then: function () {}, status: "rejected", reason: g }, Gl());
      } finally {
        ((Q.p = e),
          f !== null && i.types !== null && (f.types = i.types),
          (_.T = f));
      }
    }
    function Ds() {}
    function bi(l, t, u, a) {
      if (l.tag !== 5) throw Error(b(476));
      var n = ev(l).queue;
      nv(
        l,
        n,
        t,
        fu,
        u === null
          ? Ds
          : function () {
              return (fv(l), u(a));
            },
      );
    }
    function ev(l) {
      var t = l.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: fu,
        baseState: fu,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: At,
          lastRenderedState: fu,
        },
        next: null,
      };
      var u = {};
      return (
        (t.next = {
          memoizedState: u,
          baseState: u,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: At,
            lastRenderedState: u,
          },
          next: null,
        }),
        (l.memoizedState = t),
        (l = l.alternate),
        l !== null && (l.memoizedState = t),
        t
      );
    }
    function fv(l) {
      var t = ev(l);
      (t.next === null && (t = l.alternate.memoizedState),
        Qa(l, t.next.queue, {}, Gl()));
    }
    function gc() {
      return hl(tn);
    }
    function iv() {
      return tl().memoizedState;
    }
    function cv() {
      return tl().memoizedState;
    }
    function Us(l) {
      for (var t = l.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var u = Gl();
            l = Vt(u);
            var a = xt(t, l, u);
            (a !== null && (Dl(a, t, u), Ya(a, t, u)),
              (t = { cache: uc() }),
              (l.payload = t));
            return;
        }
        t = t.return;
      }
    }
    function ps(l, t, u) {
      var a = Gl();
      ((u = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: u,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        Ve(l)
          ? vv(t, u)
          : ((u = Ii(l, t, u, a)), u !== null && (Dl(u, l, a), mv(u, t, a))));
    }
    function yv(l, t, u) {
      var a = Gl();
      Qa(l, t, u, a);
    }
    function Qa(l, t, u, a) {
      var n = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: u,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (Ve(l)) vv(t, n);
      else {
        var e = l.alternate;
        if (
          l.lanes === 0 &&
          (e === null || e.lanes === 0) &&
          ((e = t.lastRenderedReducer), e !== null)
        )
          try {
            var f = t.lastRenderedState,
              i = e(f, u);
            if (((n.hasEagerState = !0), (n.eagerState = i), Xl(i, f)))
              return (Xe(l, t, n, 0), x === null && Ge(), !1);
          } catch {}
        if (((u = Ii(l, t, n, a)), u !== null))
          return (Dl(u, l, a), mv(u, t, a), !0);
      }
      return !1;
    }
    function bc(l, t, u, a) {
      if (
        ((a = {
          lane: 2,
          revertLane: Uc(),
          gesture: null,
          action: a,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Ve(l))
      ) {
        if (t) throw Error(b(479));
      } else ((t = Ii(l, u, a, 2)), t !== null && Dl(t, l, 2));
    }
    function Ve(l) {
      var t = l.alternate;
      return l === p || (t !== null && t === p);
    }
    function vv(l, t) {
      $u = oe = !0;
      var u = l.pending;
      (u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (l.pending = t));
    }
    function mv(l, t, u) {
      if ((u & 4194048) !== 0) {
        var a = t.lanes;
        ((a &= l.pendingLanes), (u |= a), (t.lanes = u), F1(l, u));
      }
    }
    var Ia = {
      readContext: hl,
      use: je,
      useCallback: I,
      useContext: I,
      useEffect: I,
      useImperativeHandle: I,
      useLayoutEffect: I,
      useInsertionEffect: I,
      useMemo: I,
      useReducer: I,
      useRef: I,
      useState: I,
      useDebugValue: I,
      useDeferredValue: I,
      useTransition: I,
      useSyncExternalStore: I,
      useId: I,
      useHostTransitionStatus: I,
      useFormState: I,
      useActionState: I,
      useOptimistic: I,
      useMemoCache: I,
      useCacheRefresh: I,
    };
    Ia.useEffectEvent = I;
    var dv = {
        readContext: hl,
        use: je,
        useCallback: function (l, t) {
          return ((zl().memoizedState = [l, t === void 0 ? null : t]), l);
        },
        useContext: hl,
        useEffect: $0,
        useImperativeHandle: function (l, t, u) {
          ((u = u != null ? u.concat([l]) : null),
            $n(4194308, 4, Py.bind(null, t, l), u));
        },
        useLayoutEffect: function (l, t) {
          return $n(4194308, 4, l, t);
        },
        useInsertionEffect: function (l, t) {
          $n(4, 2, l, t);
        },
        useMemo: function (l, t) {
          var u = zl();
          t = t === void 0 ? null : t;
          var a = l();
          if (hu) {
            Yt(!0);
            try {
              l();
            } finally {
              Yt(!1);
            }
          }
          return ((u.memoizedState = [a, t]), a);
        },
        useReducer: function (l, t, u) {
          var a = zl();
          if (u !== void 0) {
            var n = u(t);
            if (hu) {
              Yt(!0);
              try {
                u(t);
              } finally {
                Yt(!1);
              }
            }
          } else n = t;
          return (
            (a.memoizedState = a.baseState = n),
            (l = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: l,
              lastRenderedState: n,
            }),
            (a.queue = l),
            (l = l.dispatch = ps.bind(null, p, l)),
            [a.memoizedState, l]
          );
        },
        useRef: function (l) {
          var t = zl();
          return ((l = { current: l }), (t.memoizedState = l));
        },
        useState: function (l) {
          l = Si(l);
          var t = l.queue,
            u = yv.bind(null, p, t);
          return ((t.dispatch = u), [l.memoizedState, u]);
        },
        useDebugValue: oc,
        useDeferredValue: function (l, t) {
          var u = zl();
          return Sc(u, l, t);
        },
        useTransition: function () {
          var l = Si(!1);
          return (
            (l = nv.bind(null, p, l.queue, !0, !1)),
            (zl().memoizedState = l),
            [!1, l]
          );
        },
        useSyncExternalStore: function (l, t, u) {
          var a = p,
            n = zl();
          if (B) {
            if (u === void 0) throw Error(b(407));
            u = u();
          } else {
            if (((u = t()), x === null)) throw Error(b(349));
            (q & 127) !== 0 || Ry(a, t, u);
          }
          n.memoizedState = u;
          var e = { value: u, getSnapshot: t };
          return (
            (n.queue = e),
            $0(Zy.bind(null, a, e, l), [l]),
            (a.flags |= 2048),
            ua(9, { destroy: void 0 }, jy.bind(null, a, e, u, t), null),
            u
          );
        },
        useId: function () {
          var l = zl(),
            t = x.identifierPrefix;
          if (B) {
            var u = tt,
              a = lt;
            ((u = (a & ~(1 << (32 - Yl(a) - 1))).toString(32) + u),
              (t = "_" + t + "R_" + u),
              (u = Se++),
              0 < u && (t += "H" + u.toString(32)),
              (t += "_"));
          } else ((u = Ts++), (t = "_" + t + "r_" + u.toString(32) + "_"));
          return (l.memoizedState = t);
        },
        useHostTransitionStatus: gc,
        useFormState: J0,
        useActionState: J0,
        useOptimistic: function (l) {
          var t = zl();
          t.memoizedState = t.baseState = l;
          var u = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (
            (t.queue = u),
            (t = bc.bind(null, p, !0, u)),
            (u.dispatch = t),
            [l, t]
          );
        },
        useMemoCache: dc,
        useCacheRefresh: function () {
          return (zl().memoizedState = Us.bind(null, p));
        },
        useEffectEvent: function (l) {
          var t = zl(),
            u = { impl: l };
          return (
            (t.memoizedState = u),
            function () {
              if ((X & 2) !== 0) throw Error(b(440));
              return u.impl.apply(void 0, arguments);
            }
          );
        },
      },
      zc = {
        readContext: hl,
        use: je,
        useCallback: tv,
        useContext: hl,
        useEffect: hc,
        useImperativeHandle: lv,
        useInsertionEffect: ky,
        useLayoutEffect: Iy,
        useMemo: uv,
        useReducer: Wn,
        useRef: $y,
        useState: function () {
          return Wn(At);
        },
        useDebugValue: oc,
        useDeferredValue: function (l, t) {
          var u = tl();
          return av(u, V.memoizedState, l, t);
        },
        useTransition: function () {
          var l = Wn(At)[0],
            t = tl().memoizedState;
          return [typeof l == "boolean" ? l : dn(l), t];
        },
        useSyncExternalStore: Qy,
        useId: iv,
        useHostTransitionStatus: gc,
        useFormState: w0,
        useActionState: w0,
        useOptimistic: function (l, t) {
          var u = tl();
          return Ly(u, V, l, t);
        },
        useMemoCache: dc,
        useCacheRefresh: cv,
      };
    zc.useEffectEvent = Fy;
    var sv = {
      readContext: hl,
      use: je,
      useCallback: tv,
      useContext: hl,
      useEffect: hc,
      useImperativeHandle: lv,
      useInsertionEffect: ky,
      useLayoutEffect: Iy,
      useMemo: uv,
      useReducer: Df,
      useRef: $y,
      useState: function () {
        return Df(At);
      },
      useDebugValue: oc,
      useDeferredValue: function (l, t) {
        var u = tl();
        return V === null ? Sc(u, l, t) : av(u, V.memoizedState, l, t);
      },
      useTransition: function () {
        var l = Df(At)[0],
          t = tl().memoizedState;
        return [typeof l == "boolean" ? l : dn(l), t];
      },
      useSyncExternalStore: Qy,
      useId: iv,
      useHostTransitionStatus: gc,
      useFormState: W0,
      useActionState: W0,
      useOptimistic: function (l, t) {
        var u = tl();
        return V !== null
          ? Ly(u, V, l, t)
          : ((u.baseState = l), [l, u.queue.dispatch]);
      },
      useMemoCache: dc,
      useCacheRefresh: cv,
    };
    sv.useEffectEvent = Fy;
    function Uf(l, t, u, a) {
      ((t = l.memoizedState),
        (u = u(a, t)),
        (u = u == null ? t : W({}, t, u)),
        (l.memoizedState = u),
        l.lanes === 0 && (l.updateQueue.baseState = u));
    }
    var zi = {
      enqueueSetState: function (l, t, u) {
        l = l._reactInternals;
        var a = Gl(),
          n = Vt(a);
        ((n.payload = t),
          u != null && (n.callback = u),
          (t = xt(l, n, a)),
          t !== null && (Dl(t, l, a), Ya(t, l, a)));
      },
      enqueueReplaceState: function (l, t, u) {
        l = l._reactInternals;
        var a = Gl(),
          n = Vt(a);
        ((n.tag = 1),
          (n.payload = t),
          u != null && (n.callback = u),
          (t = xt(l, n, a)),
          t !== null && (Dl(t, l, a), Ya(t, l, a)));
      },
      enqueueForceUpdate: function (l, t) {
        l = l._reactInternals;
        var u = Gl(),
          a = Vt(u);
        ((a.tag = 2),
          t != null && (a.callback = t),
          (t = xt(l, a, u)),
          t !== null && (Dl(t, l, u), Ya(t, l, u)));
      },
    };
    function F0(l, t, u, a, n, e, f) {
      return (
        (l = l.stateNode),
        typeof l.shouldComponentUpdate == "function"
          ? l.shouldComponentUpdate(a, e, f)
          : t.prototype && t.prototype.isPureReactComponent
            ? !wa(u, a) || !wa(n, e)
            : !0
      );
    }
    function k0(l, t, u, a) {
      ((l = t.state),
        typeof t.componentWillReceiveProps == "function" &&
          t.componentWillReceiveProps(u, a),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
          t.UNSAFE_componentWillReceiveProps(u, a),
        t.state !== l && zi.enqueueReplaceState(t, t.state, null));
    }
    function ou(l, t) {
      var u = t;
      if ("ref" in t) {
        u = {};
        for (var a in t) a !== "ref" && (u[a] = t[a]);
      }
      if ((l = l.defaultProps)) {
        u === t && (u = W({}, u));
        for (var n in l) u[n] === void 0 && (u[n] = l[n]);
      }
      return u;
    }
    function hv(l) {
      ce(l);
    }
    function ov(l) {
      console.error(l);
    }
    function Sv(l) {
      ce(l);
    }
    function ge(l, t) {
      try {
        var u = l.onUncaughtError;
        u(t.value, { componentStack: t.stack });
      } catch (a) {
        setTimeout(function () {
          throw a;
        });
      }
    }
    function I0(l, t, u) {
      try {
        var a = l.onCaughtError;
        a(u.value, {
          componentStack: u.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null,
        });
      } catch (n) {
        setTimeout(function () {
          throw n;
        });
      }
    }
    function Ei(l, t, u) {
      return (
        (u = Vt(u)),
        (u.tag = 3),
        (u.payload = { element: null }),
        (u.callback = function () {
          ge(l, t);
        }),
        u
      );
    }
    function gv(l) {
      return ((l = Vt(l)), (l.tag = 3), l);
    }
    function bv(l, t, u, a) {
      var n = u.type.getDerivedStateFromError;
      if (typeof n == "function") {
        var e = a.value;
        ((l.payload = function () {
          return n(e);
        }),
          (l.callback = function () {
            I0(t, u, a);
          }));
      }
      var f = u.stateNode;
      f !== null &&
        typeof f.componentDidCatch == "function" &&
        (l.callback = function () {
          (I0(t, u, a),
            typeof n != "function" &&
              (Lt === null ? (Lt = new Set([this])) : Lt.add(this)));
          var i = a.stack;
          this.componentDidCatch(a.value, {
            componentStack: i !== null ? i : "",
          });
        });
    }
    function Ns(l, t, u, a, n) {
      if (
        ((u.flags |= 32768),
        a !== null && typeof a == "object" && typeof a.then == "function")
      ) {
        if (
          ((t = u.alternate),
          t !== null && va(t, u, n, !0),
          (u = Ql.current),
          u !== null)
        ) {
          switch (u.tag) {
            case 31:
            case 13:
              return (
                wl === null ? Ae() : u.alternate === null && P === 0 && (P = 3),
                (u.flags &= -257),
                (u.flags |= 65536),
                (u.lanes = n),
                a === de
                  ? (u.flags |= 16384)
                  : ((t = u.updateQueue),
                    t === null ? (u.updateQueue = new Set([a])) : t.add(a),
                    Qf(l, a, n)),
                !1
              );
            case 22:
              return (
                (u.flags |= 65536),
                a === de
                  ? (u.flags |= 16384)
                  : ((t = u.updateQueue),
                    t === null
                      ? ((t = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([a]),
                        }),
                        (u.updateQueue = t))
                      : ((u = t.retryQueue),
                        u === null ? (t.retryQueue = new Set([a])) : u.add(a)),
                    Qf(l, a, n)),
                !1
              );
          }
          throw Error(b(435, u.tag));
        }
        return (Qf(l, a, n), Ae(), !1);
      }
      if (B)
        return (
          (t = Ql.current),
          t !== null
            ? ((t.flags & 65536) === 0 && (t.flags |= 256),
              (t.flags |= 65536),
              (t.lanes = n),
              a !== ii && ((l = Error(b(422), { cause: a })), $a(Kl(l, u))))
            : (a !== ii && ((t = Error(b(423), { cause: a })), $a(Kl(t, u))),
              (l = l.current.alternate),
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (a = Kl(a, u)),
              (n = Ei(l.stateNode, a, n)),
              Mf(l, n),
              P !== 4 && (P = 2)),
          !1
        );
      var e = Error(b(520), { cause: a });
      if (
        ((e = Kl(e, u)),
        Za === null ? (Za = [e]) : Za.push(e),
        P !== 4 && (P = 2),
        t === null)
      )
        return !0;
      ((a = Kl(a, u)), (u = t));
      do {
        switch (u.tag) {
          case 3:
            return (
              (u.flags |= 65536),
              (l = n & -n),
              (u.lanes |= l),
              (l = Ei(u.stateNode, a, l)),
              Mf(u, l),
              !1
            );
          case 1:
            if (
              ((t = u.type),
              (e = u.stateNode),
              (u.flags & 128) === 0 &&
                (typeof t.getDerivedStateFromError == "function" ||
                  (e !== null &&
                    typeof e.componentDidCatch == "function" &&
                    (Lt === null || !Lt.has(e)))))
            )
              return (
                (u.flags |= 65536),
                (n &= -n),
                (u.lanes |= n),
                (n = gv(n)),
                bv(n, l, u, a),
                Mf(u, n),
                !1
              );
        }
        u = u.return;
      } while (u !== null);
      return !1;
    }
    var Ec = Error(b(461)),
      el = !1;
    function ml(l, t, u, a) {
      t.child = l === null ? qy(t, null, u, a) : su(t, l.child, u, a);
    }
    function P0(l, t, u, a, n) {
      u = u.render;
      var e = t.ref;
      if ("ref" in a) {
        var f = {};
        for (var i in a) i !== "ref" && (f[i] = a[i]);
      } else f = a;
      return (
        du(t),
        (a = cc(l, t, u, f, e, n)),
        (i = yc()),
        l !== null && !el
          ? (vc(l, t, n), Ot(l, t, n))
          : (B && i && lc(t), (t.flags |= 1), ml(l, t, a, n), t.child)
      );
    }
    function l1(l, t, u, a, n) {
      if (l === null) {
        var e = u.type;
        return typeof e == "function" &&
          !Pi(e) &&
          e.defaultProps === void 0 &&
          u.compare === null
          ? ((t.tag = 15), (t.type = e), zv(l, t, e, a, n))
          : ((l = Jn(u.type, null, a, t, t.mode, n)),
            (l.ref = t.ref),
            (l.return = t),
            (t.child = l));
      }
      if (((e = l.child), !Tc(l, n))) {
        var f = e.memoizedProps;
        if (
          ((u = u.compare),
          (u = u !== null ? u : wa),
          u(f, a) && l.ref === t.ref)
        )
          return Ot(l, t, n);
      }
      return (
        (t.flags |= 1),
        (l = gt(e, a)),
        (l.ref = t.ref),
        (l.return = t),
        (t.child = l)
      );
    }
    function zv(l, t, u, a, n) {
      if (l !== null) {
        var e = l.memoizedProps;
        if (wa(e, a) && l.ref === t.ref)
          if (((el = !1), (t.pendingProps = a = e), Tc(l, n)))
            (l.flags & 131072) !== 0 && (el = !0);
          else return ((t.lanes = l.lanes), Ot(l, t, n));
      }
      return Ti(l, t, u, a, n);
    }
    function Ev(l, t, u, a) {
      var n = a.children,
        e = l !== null ? l.memoizedState : null;
      if (
        (l === null &&
          t.stateNode === null &&
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        a.mode === "hidden")
      ) {
        if ((t.flags & 128) !== 0) {
          if (((e = e !== null ? e.baseLanes | u : u), l !== null)) {
            for (a = t.child = l.child, n = 0; a !== null; )
              ((n = n | a.lanes | a.childLanes), (a = a.sibling));
            a = n & ~e;
          } else ((a = 0), (t.child = null));
          return t1(l, t, e, u, a);
        }
        if ((u & 536870912) !== 0)
          ((t.memoizedState = { baseLanes: 0, cachePool: null }),
            l !== null && wn(t, e !== null ? e.cachePool : null),
            e !== null ? x0(t, e) : hi(),
            Yy(t));
        else
          return (
            (a = t.lanes = 536870912),
            t1(l, t, e !== null ? e.baseLanes | u : u, u, a)
          );
      } else
        e !== null
          ? (wn(t, e.cachePool), x0(t, e), Ct(t), (t.memoizedState = null))
          : (l !== null && wn(t, null), hi(), Ct(t));
      return (ml(l, t, n, u), t.child);
    }
    function Na(l, t) {
      return (
        (l !== null && l.tag === 22) ||
          t.stateNode !== null ||
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        t.sibling
      );
    }
    function t1(l, t, u, a, n) {
      var e = ac();
      return (
        (e = e === null ? null : { parent: nl._currentValue, pool: e }),
        (t.memoizedState = { baseLanes: u, cachePool: e }),
        l !== null && wn(t, null),
        hi(),
        Yy(t),
        l !== null && va(l, t, a, !0),
        (t.childLanes = n),
        null
      );
    }
    function Fn(l, t) {
      return (
        (t = be({ mode: t.mode, children: t.children }, l.mode)),
        (t.ref = l.ref),
        (l.child = t),
        (t.return = l),
        t
      );
    }
    function u1(l, t, u) {
      return (
        su(t, l.child, null, u),
        (l = Fn(t, t.pendingProps)),
        (l.flags |= 2),
        Hl(t),
        (t.memoizedState = null),
        l
      );
    }
    function Hs(l, t, u) {
      var a = t.pendingProps,
        n = (t.flags & 128) !== 0;
      if (((t.flags &= -129), l === null)) {
        if (B) {
          if (a.mode === "hidden")
            return ((l = Fn(t, a)), (t.lanes = 536870912), Na(null, l));
          if (
            (oi(t),
            (l = w)
              ? ((l = dm(l, Jl)),
                (l = l !== null && l.data === "&" ? l : null),
                l !== null &&
                  ((t.memoizedState = {
                    dehydrated: l,
                    treeContext: $t !== null ? { id: lt, overflow: tt } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (u = My(l)),
                  (u.return = t),
                  (t.child = u),
                  (sl = t),
                  (w = null)))
              : (l = null),
            l === null)
          )
            throw Ft(t);
          return ((t.lanes = 536870912), null);
        }
        return Fn(t, a);
      }
      var e = l.memoizedState;
      if (e !== null) {
        var f = e.dehydrated;
        if ((oi(t), n))
          if (t.flags & 256) ((t.flags &= -257), (t = u1(l, t, u)));
          else if (t.memoizedState !== null)
            ((t.child = l.child), (t.flags |= 128), (t = null));
          else throw Error(b(558));
        else if (
          (el || va(l, t, u, !1), (n = (u & l.childLanes) !== 0), el || n)
        ) {
          if (
            ((a = x),
            a !== null && ((f = k1(a, u)), f !== 0 && f !== e.retryLane))
          )
            throw ((e.retryLane = f), zu(l, f), Dl(a, l, f), Ec);
          (Ae(), (t = u1(l, t, u)));
        } else
          ((l = e.treeContext),
            (w = Wl(f.nextSibling)),
            (sl = t),
            (B = !0),
            (Zt = null),
            (Jl = !1),
            l !== null && Uy(t, l),
            (t = Fn(t, a)),
            (t.flags |= 4096));
        return t;
      }
      return (
        (l = gt(l.child, { mode: a.mode, children: a.children })),
        (l.ref = t.ref),
        (t.child = l),
        (l.return = t),
        l
      );
    }
    function kn(l, t) {
      var u = t.ref;
      if (u === null) l !== null && l.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof u != "function" && typeof u != "object") throw Error(b(284));
        (l === null || l.ref !== u) && (t.flags |= 4194816);
      }
    }
    function Ti(l, t, u, a, n) {
      return (
        du(t),
        (u = cc(l, t, u, a, void 0, n)),
        (a = yc()),
        l !== null && !el
          ? (vc(l, t, n), Ot(l, t, n))
          : (B && a && lc(t), (t.flags |= 1), ml(l, t, u, n), t.child)
      );
    }
    function a1(l, t, u, a, n, e) {
      return (
        du(t),
        (t.updateQueue = null),
        (u = Xy(t, a, u, n)),
        Gy(l),
        (a = yc()),
        l !== null && !el
          ? (vc(l, t, e), Ot(l, t, e))
          : (B && a && lc(t), (t.flags |= 1), ml(l, t, u, e), t.child)
      );
    }
    function n1(l, t, u, a, n) {
      if ((du(t), t.stateNode === null)) {
        var e = ju,
          f = u.contextType;
        (typeof f == "object" && f !== null && (e = hl(f)),
          (e = new u(a, e)),
          (t.memoizedState =
            e.state !== null && e.state !== void 0 ? e.state : null),
          (e.updater = zi),
          (t.stateNode = e),
          (e._reactInternals = t),
          (e = t.stateNode),
          (e.props = a),
          (e.state = t.memoizedState),
          (e.refs = {}),
          ec(t),
          (f = u.contextType),
          (e.context = typeof f == "object" && f !== null ? hl(f) : ju),
          (e.state = t.memoizedState),
          (f = u.getDerivedStateFromProps),
          typeof f == "function" &&
            (Uf(t, u, f, a), (e.state = t.memoizedState)),
          typeof u.getDerivedStateFromProps == "function" ||
            typeof e.getSnapshotBeforeUpdate == "function" ||
            (typeof e.UNSAFE_componentWillMount != "function" &&
              typeof e.componentWillMount != "function") ||
            ((f = e.state),
            typeof e.componentWillMount == "function" && e.componentWillMount(),
            typeof e.UNSAFE_componentWillMount == "function" &&
              e.UNSAFE_componentWillMount(),
            f !== e.state && zi.enqueueReplaceState(e, e.state, null),
            Xa(t, a, e, n),
            Ga(),
            (e.state = t.memoizedState)),
          typeof e.componentDidMount == "function" && (t.flags |= 4194308),
          (a = !0));
      } else if (l === null) {
        e = t.stateNode;
        var i = t.memoizedProps,
          c = ou(u, i);
        e.props = c;
        var m = e.context,
          o = u.contextType;
        ((f = ju), typeof o == "object" && o !== null && (f = hl(o)));
        var g = u.getDerivedStateFromProps;
        ((o =
          typeof g == "function" ||
          typeof e.getSnapshotBeforeUpdate == "function"),
          (i = t.pendingProps !== i),
          o ||
            (typeof e.UNSAFE_componentWillReceiveProps != "function" &&
              typeof e.componentWillReceiveProps != "function") ||
            ((i || m !== f) && k0(t, e, a, f)),
          (Ht = !1));
        var s = t.memoizedState;
        ((e.state = s),
          Xa(t, a, e, n),
          Ga(),
          (m = t.memoizedState),
          i || s !== m || Ht
            ? (typeof g == "function" &&
                (Uf(t, u, g, a), (m = t.memoizedState)),
              (c = Ht || F0(t, u, c, a, s, m, f))
                ? (o ||
                    (typeof e.UNSAFE_componentWillMount != "function" &&
                      typeof e.componentWillMount != "function") ||
                    (typeof e.componentWillMount == "function" &&
                      e.componentWillMount(),
                    typeof e.UNSAFE_componentWillMount == "function" &&
                      e.UNSAFE_componentWillMount()),
                  typeof e.componentDidMount == "function" &&
                    (t.flags |= 4194308))
                : (typeof e.componentDidMount == "function" &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = a),
                  (t.memoizedState = m)),
              (e.props = a),
              (e.state = m),
              (e.context = f),
              (a = c))
            : (typeof e.componentDidMount == "function" && (t.flags |= 4194308),
              (a = !1)));
      } else {
        ((e = t.stateNode),
          di(l, t),
          (f = t.memoizedProps),
          (o = ou(u, f)),
          (e.props = o),
          (g = t.pendingProps),
          (s = e.context),
          (m = u.contextType),
          (c = ju),
          typeof m == "object" && m !== null && (c = hl(m)),
          (i = u.getDerivedStateFromProps),
          (m =
            typeof i == "function" ||
            typeof e.getSnapshotBeforeUpdate == "function") ||
            (typeof e.UNSAFE_componentWillReceiveProps != "function" &&
              typeof e.componentWillReceiveProps != "function") ||
            ((f !== g || s !== c) && k0(t, e, a, c)),
          (Ht = !1),
          (s = t.memoizedState),
          (e.state = s),
          Xa(t, a, e, n),
          Ga());
        var h = t.memoizedState;
        f !== g ||
        s !== h ||
        Ht ||
        (l !== null && l.dependencies !== null && me(l.dependencies))
          ? (typeof i == "function" && (Uf(t, u, i, a), (h = t.memoizedState)),
            (o =
              Ht ||
              F0(t, u, o, a, s, h, c) ||
              (l !== null && l.dependencies !== null && me(l.dependencies)))
              ? (m ||
                  (typeof e.UNSAFE_componentWillUpdate != "function" &&
                    typeof e.componentWillUpdate != "function") ||
                  (typeof e.componentWillUpdate == "function" &&
                    e.componentWillUpdate(a, h, c),
                  typeof e.UNSAFE_componentWillUpdate == "function" &&
                    e.UNSAFE_componentWillUpdate(a, h, c)),
                typeof e.componentDidUpdate == "function" && (t.flags |= 4),
                typeof e.getSnapshotBeforeUpdate == "function" &&
                  (t.flags |= 1024))
              : (typeof e.componentDidUpdate != "function" ||
                  (f === l.memoizedProps && s === l.memoizedState) ||
                  (t.flags |= 4),
                typeof e.getSnapshotBeforeUpdate != "function" ||
                  (f === l.memoizedProps && s === l.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = a),
                (t.memoizedState = h)),
            (e.props = a),
            (e.state = h),
            (e.context = c),
            (a = o))
          : (typeof e.componentDidUpdate != "function" ||
              (f === l.memoizedProps && s === l.memoizedState) ||
              (t.flags |= 4),
            typeof e.getSnapshotBeforeUpdate != "function" ||
              (f === l.memoizedProps && s === l.memoizedState) ||
              (t.flags |= 1024),
            (a = !1));
      }
      return (
        (e = a),
        kn(l, t),
        (a = (t.flags & 128) !== 0),
        e || a
          ? ((e = t.stateNode),
            (u =
              a && typeof u.getDerivedStateFromError != "function"
                ? null
                : e.render()),
            (t.flags |= 1),
            l !== null && a
              ? ((t.child = su(t, l.child, null, n)),
                (t.child = su(t, null, u, n)))
              : ml(l, t, u, n),
            (t.memoizedState = e.state),
            (l = t.child))
          : (l = Ot(l, t, n)),
        l
      );
    }
    function e1(l, t, u, a) {
      return (mu(), (t.flags |= 256), ml(l, t, u, a), t.child);
    }
    var pf = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function Nf(l) {
      return { baseLanes: l, cachePool: Ny() };
    }
    function Hf(l, t, u) {
      return ((l = l !== null ? l.childLanes & ~u : 0), t && (l |= ql), l);
    }
    function Tv(l, t, u) {
      var a = t.pendingProps,
        n = !1,
        e = (t.flags & 128) !== 0,
        f;
      if (
        ((f = e) ||
          (f =
            l !== null && l.memoizedState === null
              ? !1
              : (ll.current & 2) !== 0),
        f && ((n = !0), (t.flags &= -129)),
        (f = (t.flags & 32) !== 0),
        (t.flags &= -33),
        l === null)
      ) {
        if (B) {
          if (
            (n ? qt(t) : Ct(t),
            (l = w)
              ? ((l = dm(l, Jl)),
                (l = l !== null && l.data !== "&" ? l : null),
                l !== null &&
                  ((t.memoizedState = {
                    dehydrated: l,
                    treeContext: $t !== null ? { id: lt, overflow: tt } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (u = My(l)),
                  (u.return = t),
                  (t.child = u),
                  (sl = t),
                  (w = null)))
              : (l = null),
            l === null)
          )
            throw Ft(t);
          return (Yi(l) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        }
        var i = a.children;
        return (
          (a = a.fallback),
          n
            ? (Ct(t),
              (n = t.mode),
              (i = be({ mode: "hidden", children: i }, n)),
              (a = iu(a, n, u, null)),
              (i.return = t),
              (a.return = t),
              (i.sibling = a),
              (t.child = i),
              (a = t.child),
              (a.memoizedState = Nf(u)),
              (a.childLanes = Hf(l, f, u)),
              (t.memoizedState = pf),
              Na(null, a))
            : (qt(t), Ai(t, i))
        );
      }
      var c = l.memoizedState;
      if (c !== null && ((i = c.dehydrated), i !== null)) {
        if (e)
          t.flags & 256
            ? (qt(t), (t.flags &= -257), (t = rf(l, t, u)))
            : t.memoizedState !== null
              ? (Ct(t), (t.child = l.child), (t.flags |= 128), (t = null))
              : (Ct(t),
                (i = a.fallback),
                (n = t.mode),
                (a = be({ mode: "visible", children: a.children }, n)),
                (i = iu(i, n, u, null)),
                (i.flags |= 2),
                (a.return = t),
                (i.return = t),
                (a.sibling = i),
                (t.child = a),
                su(t, l.child, null, u),
                (a = t.child),
                (a.memoizedState = Nf(u)),
                (a.childLanes = Hf(l, f, u)),
                (t.memoizedState = pf),
                (t = Na(null, a)));
        else if ((qt(t), Yi(i))) {
          if (((f = i.nextSibling && i.nextSibling.dataset), f)) var m = f.dgst;
          ((f = m),
            (a = Error(b(419))),
            (a.stack = ""),
            (a.digest = f),
            $a({ value: a, source: null, stack: null }),
            (t = rf(l, t, u)));
        } else if (
          (el || va(l, t, u, !1), (f = (u & l.childLanes) !== 0), el || f)
        ) {
          if (
            ((f = x),
            f !== null && ((a = k1(f, u)), a !== 0 && a !== c.retryLane))
          )
            throw ((c.retryLane = a), zu(l, a), Dl(f, l, a), Ec);
          (Bi(i) || Ae(), (t = rf(l, t, u)));
        } else
          Bi(i)
            ? ((t.flags |= 192), (t.child = l.child), (t = null))
            : ((l = c.treeContext),
              (w = Wl(i.nextSibling)),
              (sl = t),
              (B = !0),
              (Zt = null),
              (Jl = !1),
              l !== null && Uy(t, l),
              (t = Ai(t, a.children)),
              (t.flags |= 4096));
        return t;
      }
      return n
        ? (Ct(t),
          (i = a.fallback),
          (n = t.mode),
          (c = l.child),
          (m = c.sibling),
          (a = gt(c, { mode: "hidden", children: a.children })),
          (a.subtreeFlags = c.subtreeFlags & 65011712),
          m !== null
            ? (i = gt(m, i))
            : ((i = iu(i, n, u, null)), (i.flags |= 2)),
          (i.return = t),
          (a.return = t),
          (a.sibling = i),
          (t.child = a),
          Na(null, a),
          (a = t.child),
          (i = l.child.memoizedState),
          i === null
            ? (i = Nf(u))
            : ((n = i.cachePool),
              n !== null
                ? ((c = nl._currentValue),
                  (n = n.parent !== c ? { parent: c, pool: c } : n))
                : (n = Ny()),
              (i = { baseLanes: i.baseLanes | u, cachePool: n })),
          (a.memoizedState = i),
          (a.childLanes = Hf(l, f, u)),
          (t.memoizedState = pf),
          Na(l.child, a))
        : (qt(t),
          (u = l.child),
          (l = u.sibling),
          (u = gt(u, { mode: "visible", children: a.children })),
          (u.return = t),
          (u.sibling = null),
          l !== null &&
            ((f = t.deletions),
            f === null ? ((t.deletions = [l]), (t.flags |= 16)) : f.push(l)),
          (t.child = u),
          (t.memoizedState = null),
          u);
    }
    function Ai(l, t) {
      return (
        (t = be({ mode: "visible", children: t }, l.mode)),
        (t.return = l),
        (l.child = t)
      );
    }
    function be(l, t) {
      return ((l = rl(22, l, null, t)), (l.lanes = 0), l);
    }
    function rf(l, t, u) {
      return (
        su(t, l.child, null, u),
        (l = Ai(t, t.pendingProps.children)),
        (l.flags |= 2),
        (t.memoizedState = null),
        l
      );
    }
    function f1(l, t, u) {
      l.lanes |= t;
      var a = l.alternate;
      (a !== null && (a.lanes |= t), yi(l.return, t, u));
    }
    function qf(l, t, u, a, n, e) {
      var f = l.memoizedState;
      f === null
        ? (l.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: a,
            tail: u,
            tailMode: n,
            treeForkCount: e,
          })
        : ((f.isBackwards = t),
          (f.rendering = null),
          (f.renderingStartTime = 0),
          (f.last = a),
          (f.tail = u),
          (f.tailMode = n),
          (f.treeForkCount = e));
    }
    function Av(l, t, u) {
      var a = t.pendingProps,
        n = a.revealOrder,
        e = a.tail;
      a = a.children;
      var f = ll.current,
        i = (f & 2) !== 0;
      if (
        (i ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
        L(ll, f),
        ml(l, t, a, u),
        (a = B ? Wa : 0),
        !i && l !== null && (l.flags & 128) !== 0)
      )
        l: for (l = t.child; l !== null; ) {
          if (l.tag === 13) l.memoizedState !== null && f1(l, u, t);
          else if (l.tag === 19) f1(l, u, t);
          else if (l.child !== null) {
            ((l.child.return = l), (l = l.child));
            continue;
          }
          if (l === t) break l;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === t) break l;
            l = l.return;
          }
          ((l.sibling.return = l.return), (l = l.sibling));
        }
      switch (n) {
        case "forwards":
          for (u = t.child, n = null; u !== null; )
            ((l = u.alternate),
              l !== null && he(l) === null && (n = u),
              (u = u.sibling));
          ((u = n),
            u === null
              ? ((n = t.child), (t.child = null))
              : ((n = u.sibling), (u.sibling = null)),
            qf(t, !1, n, u, e, a));
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (u = null, n = t.child, t.child = null; n !== null; ) {
            if (((l = n.alternate), l !== null && he(l) === null)) {
              t.child = n;
              break;
            }
            ((l = n.sibling), (n.sibling = u), (u = n), (n = l));
          }
          qf(t, !0, u, null, e, a);
          break;
        case "together":
          qf(t, !1, null, null, void 0, a);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Ot(l, t, u) {
      if (
        (l !== null && (t.dependencies = l.dependencies),
        (It |= t.lanes),
        (u & t.childLanes) === 0)
      )
        if (l !== null) {
          if ((va(l, t, u, !1), (u & t.childLanes) === 0)) return null;
        } else return null;
      if (l !== null && t.child !== l.child) throw Error(b(153));
      if (t.child !== null) {
        for (
          l = t.child, u = gt(l, l.pendingProps), t.child = u, u.return = t;
          l.sibling !== null;
        )
          ((l = l.sibling),
            (u = u.sibling = gt(l, l.pendingProps)),
            (u.return = t));
        u.sibling = null;
      }
      return t.child;
    }
    function Tc(l, t) {
      return (l.lanes & t) !== 0
        ? !0
        : ((l = l.dependencies), !!(l !== null && me(l)));
    }
    function rs(l, t, u) {
      switch (t.tag) {
        case 3:
          (ne(t, t.stateNode.containerInfo),
            rt(t, nl, l.memoizedState.cache),
            mu());
          break;
        case 27:
        case 5:
          Ff(t);
          break;
        case 4:
          ne(t, t.stateNode.containerInfo);
          break;
        case 10:
          rt(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return ((t.flags |= 128), oi(t), null);
          break;
        case 13:
          var a = t.memoizedState;
          if (a !== null)
            return a.dehydrated !== null
              ? (qt(t), (t.flags |= 128), null)
              : (u & t.child.childLanes) !== 0
                ? Tv(l, t, u)
                : (qt(t), (l = Ot(l, t, u)), l !== null ? l.sibling : null);
          qt(t);
          break;
        case 19:
          var n = (l.flags & 128) !== 0;
          if (
            ((a = (u & t.childLanes) !== 0),
            a || (va(l, t, u, !1), (a = (u & t.childLanes) !== 0)),
            n)
          ) {
            if (a) return Av(l, t, u);
            t.flags |= 128;
          }
          if (
            ((n = t.memoizedState),
            n !== null &&
              ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
            L(ll, ll.current),
            a)
          )
            break;
          return null;
        case 22:
          return ((t.lanes = 0), Ev(l, t, u, t.pendingProps));
        case 24:
          rt(t, nl, l.memoizedState.cache);
      }
      return Ot(l, t, u);
    }
    function Ov(l, t, u) {
      if (l !== null)
        if (l.memoizedProps !== t.pendingProps) el = !0;
        else {
          if (!Tc(l, u) && (t.flags & 128) === 0)
            return ((el = !1), rs(l, t, u));
          el = (l.flags & 131072) !== 0;
        }
      else ((el = !1), B && (t.flags & 1048576) !== 0 && Dy(t, Wa, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          l: {
            var a = t.pendingProps;
            if (((l = nu(t.elementType)), (t.type = l), typeof l == "function"))
              Pi(l)
                ? ((a = ou(l, a)), (t.tag = 1), (t = n1(null, t, l, a, u)))
                : ((t.tag = 0), (t = Ti(null, t, l, a, u)));
            else {
              if (l != null) {
                var n = l.$$typeof;
                if (n === Ri) {
                  ((t.tag = 11), (t = P0(null, t, l, a, u)));
                  break l;
                } else if (n === ji) {
                  ((t.tag = 14), (t = l1(null, t, l, a, u)));
                  break l;
                }
              }
              throw ((t = Wf(l) || l), Error(b(306, t, "")));
            }
          }
          return t;
        case 0:
          return Ti(l, t, t.type, t.pendingProps, u);
        case 1:
          return ((a = t.type), (n = ou(a, t.pendingProps)), n1(l, t, a, n, u));
        case 3:
          l: {
            if ((ne(t, t.stateNode.containerInfo), l === null))
              throw Error(b(387));
            a = t.pendingProps;
            var e = t.memoizedState;
            ((n = e.element), di(l, t), Xa(t, a, null, u));
            var f = t.memoizedState;
            if (
              ((a = f.cache),
              rt(t, nl, a),
              a !== e.cache && vi(t, [nl], u, !0),
              Ga(),
              (a = f.element),
              e.isDehydrated)
            )
              if (
                ((e = { element: a, isDehydrated: !1, cache: f.cache }),
                (t.updateQueue.baseState = e),
                (t.memoizedState = e),
                t.flags & 256)
              ) {
                t = e1(l, t, a, u);
                break l;
              } else if (a !== n) {
                ((n = Kl(Error(b(424)), t)), $a(n), (t = e1(l, t, a, u)));
                break l;
              } else
                for (
                  l = t.stateNode.containerInfo,
                    l.nodeType === 9
                      ? (l = l.body)
                      : (l = l.nodeName === "HTML" ? l.ownerDocument.body : l),
                    w = Wl(l.firstChild),
                    sl = t,
                    B = !0,
                    Zt = null,
                    Jl = !0,
                    u = qy(t, null, a, u),
                    t.child = u;
                  u;
                )
                  ((u.flags = (u.flags & -3) | 4096), (u = u.sibling));
            else {
              if ((mu(), a === n)) {
                t = Ot(l, t, u);
                break l;
              }
              ml(l, t, a, u);
            }
            t = t.child;
          }
          return t;
        case 26:
          return (
            kn(l, t),
            l === null
              ? (u = p1(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = u)
                : B ||
                  ((u = t.type),
                  (l = t.pendingProps),
                  (a = De(jt.current).createElement(u)),
                  (a[dl] = t),
                  (a[Ul] = l),
                  ol(a, u, l),
                  yl(a),
                  (t.stateNode = a))
              : (t.memoizedState = p1(
                  t.type,
                  l.memoizedProps,
                  t.pendingProps,
                  l.memoizedState,
                )),
            null
          );
        case 27:
          return (
            Ff(t),
            l === null &&
              B &&
              ((a = t.stateNode = sm(t.type, t.pendingProps, jt.current)),
              (sl = t),
              (Jl = !0),
              (n = w),
              lu(t.type) ? ((Gi = n), (w = Wl(a.firstChild))) : (w = n)),
            ml(l, t, t.pendingProps.children, u),
            kn(l, t),
            l === null && (t.flags |= 4194304),
            t.child
          );
        case 5:
          return (
            l === null &&
              B &&
              ((n = a = w) &&
                ((a = eh(a, t.type, t.pendingProps, Jl)),
                a !== null
                  ? ((t.stateNode = a),
                    (sl = t),
                    (w = Wl(a.firstChild)),
                    (Jl = !1),
                    (n = !0))
                  : (n = !1)),
              n || Ft(t)),
            Ff(t),
            (n = t.type),
            (e = t.pendingProps),
            (f = l !== null ? l.memoizedProps : null),
            (a = e.children),
            qi(n, e) ? (a = null) : f !== null && qi(n, f) && (t.flags |= 32),
            t.memoizedState !== null &&
              ((n = cc(l, t, As, null, null, u)), (tn._currentValue = n)),
            kn(l, t),
            ml(l, t, a, u),
            t.child
          );
        case 6:
          return (
            l === null &&
              B &&
              ((l = u = w) &&
                ((u = fh(u, t.pendingProps, Jl)),
                u !== null
                  ? ((t.stateNode = u), (sl = t), (w = null), (l = !0))
                  : (l = !1)),
              l || Ft(t)),
            null
          );
        case 13:
          return Tv(l, t, u);
        case 4:
          return (
            ne(t, t.stateNode.containerInfo),
            (a = t.pendingProps),
            l === null ? (t.child = su(t, null, a, u)) : ml(l, t, a, u),
            t.child
          );
        case 11:
          return P0(l, t, t.type, t.pendingProps, u);
        case 7:
          return (ml(l, t, t.pendingProps, u), t.child);
        case 8:
          return (ml(l, t, t.pendingProps.children, u), t.child);
        case 12:
          return (ml(l, t, t.pendingProps.children, u), t.child);
        case 10:
          return (
            (a = t.pendingProps),
            rt(t, t.type, a.value),
            ml(l, t, a.children, u),
            t.child
          );
        case 9:
          return (
            (n = t.type._context),
            (a = t.pendingProps.children),
            du(t),
            (n = hl(n)),
            (a = a(n)),
            (t.flags |= 1),
            ml(l, t, a, u),
            t.child
          );
        case 14:
          return l1(l, t, t.type, t.pendingProps, u);
        case 15:
          return zv(l, t, t.type, t.pendingProps, u);
        case 19:
          return Av(l, t, u);
        case 31:
          return Hs(l, t, u);
        case 22:
          return Ev(l, t, u, t.pendingProps);
        case 24:
          return (
            du(t),
            (a = hl(nl)),
            l === null
              ? ((n = ac()),
                n === null &&
                  ((n = x),
                  (e = uc()),
                  (n.pooledCache = e),
                  e.refCount++,
                  e !== null && (n.pooledCacheLanes |= u),
                  (n = e)),
                (t.memoizedState = { parent: a, cache: n }),
                ec(t),
                rt(t, nl, n))
              : ((l.lanes & u) !== 0 && (di(l, t), Xa(t, null, null, u), Ga()),
                (n = l.memoizedState),
                (e = t.memoizedState),
                n.parent !== a
                  ? ((n = { parent: a, cache: a }),
                    (t.memoizedState = n),
                    t.lanes === 0 &&
                      (t.memoizedState = t.updateQueue.baseState = n),
                    rt(t, nl, a))
                  : ((a = e.cache),
                    rt(t, nl, a),
                    a !== n.cache && vi(t, [nl], u, !0))),
            ml(l, t, t.pendingProps.children, u),
            t.child
          );
        case 29:
          throw t.pendingProps;
      }
      throw Error(b(156, t.tag));
    }
    function ct(l) {
      l.flags |= 4;
    }
    function Cf(l, t, u, a, n) {
      if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
        if (((l.flags |= 16777216), (n & 335544128) === n))
          if (l.stateNode.complete) l.flags |= 8192;
          else if (wv()) l.flags |= 8192;
          else throw ((yu = de), nc);
      } else l.flags &= -16777217;
    }
    function i1(l, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
        l.flags &= -16777217;
      else if (((l.flags |= 16777216), !Sm(t)))
        if (wv()) l.flags |= 8192;
        else throw ((yu = de), nc);
    }
    function Yn(l, t) {
      (t !== null && (l.flags |= 4),
        l.flags & 16384 &&
          ((t = l.tag !== 22 ? W1() : 536870912), (l.lanes |= t), (aa |= t)));
    }
    function Aa(l, t) {
      if (!B)
        switch (l.tailMode) {
          case "hidden":
            t = l.tail;
            for (var u = null; t !== null; )
              (t.alternate !== null && (u = t), (t = t.sibling));
            u === null ? (l.tail = null) : (u.sibling = null);
            break;
          case "collapsed":
            u = l.tail;
            for (var a = null; u !== null; )
              (u.alternate !== null && (a = u), (u = u.sibling));
            a === null
              ? t || l.tail === null
                ? (l.tail = null)
                : (l.tail.sibling = null)
              : (a.sibling = null);
        }
    }
    function J(l) {
      var t = l.alternate !== null && l.alternate.child === l.child,
        u = 0,
        a = 0;
      if (t)
        for (var n = l.child; n !== null; )
          ((u |= n.lanes | n.childLanes),
            (a |= n.subtreeFlags & 65011712),
            (a |= n.flags & 65011712),
            (n.return = l),
            (n = n.sibling));
      else
        for (n = l.child; n !== null; )
          ((u |= n.lanes | n.childLanes),
            (a |= n.subtreeFlags),
            (a |= n.flags),
            (n.return = l),
            (n = n.sibling));
      return ((l.subtreeFlags |= a), (l.childLanes = u), t);
    }
    function qs(l, t, u) {
      var a = t.pendingProps;
      switch ((tc(t), t.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (J(t), null);
        case 1:
          return (J(t), null);
        case 3:
          return (
            (u = t.stateNode),
            (a = null),
            l !== null && (a = l.memoizedState.cache),
            t.memoizedState.cache !== a && (t.flags |= 2048),
            bt(nl),
            ku(),
            u.pendingContext &&
              ((u.context = u.pendingContext), (u.pendingContext = null)),
            (l === null || l.child === null) &&
              (pu(t)
                ? ct(t)
                : l === null ||
                  (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                  ((t.flags |= 1024), _f())),
            J(t),
            null
          );
        case 26:
          var n = t.type,
            e = t.memoizedState;
          return (
            l === null
              ? (ct(t),
                e !== null ? (J(t), i1(t, e)) : (J(t), Cf(t, n, null, a, u)))
              : e
                ? e !== l.memoizedState
                  ? (ct(t), J(t), i1(t, e))
                  : (J(t), (t.flags &= -16777217))
                : ((l = l.memoizedProps),
                  l !== a && ct(t),
                  J(t),
                  Cf(t, n, l, a, u)),
            null
          );
        case 27:
          if (
            (ee(t),
            (u = jt.current),
            (n = t.type),
            l !== null && t.stateNode != null)
          )
            l.memoizedProps !== a && ct(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(b(166));
              return (J(t), null);
            }
            ((l = at.current),
              pu(t) ? G0(t, l) : ((l = sm(n, a, u)), (t.stateNode = l), ct(t)));
          }
          return (J(t), null);
        case 5:
          if ((ee(t), (n = t.type), l !== null && t.stateNode != null))
            l.memoizedProps !== a && ct(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(b(166));
              return (J(t), null);
            }
            if (((e = at.current), pu(t))) G0(t, e);
            else {
              var f = De(jt.current);
              switch (e) {
                case 1:
                  e = f.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case 2:
                  e = f.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    n,
                  );
                  break;
                default:
                  switch (n) {
                    case "svg":
                      e = f.createElementNS("http://www.w3.org/2000/svg", n);
                      break;
                    case "math":
                      e = f.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        n,
                      );
                      break;
                    case "script":
                      ((e = f.createElement("div")),
                        (e.innerHTML = "<script><\/script>"),
                        (e = e.removeChild(e.firstChild)));
                      break;
                    case "select":
                      ((e =
                        typeof a.is == "string"
                          ? f.createElement("select", { is: a.is })
                          : f.createElement("select")),
                        a.multiple
                          ? (e.multiple = !0)
                          : a.size && (e.size = a.size));
                      break;
                    default:
                      e =
                        typeof a.is == "string"
                          ? f.createElement(n, { is: a.is })
                          : f.createElement(n);
                  }
              }
              ((e[dl] = t), (e[Ul] = a));
              l: for (f = t.child; f !== null; ) {
                if (f.tag === 5 || f.tag === 6) e.appendChild(f.stateNode);
                else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                  ((f.child.return = f), (f = f.child));
                  continue;
                }
                if (f === t) break l;
                for (; f.sibling === null; ) {
                  if (f.return === null || f.return === t) break l;
                  f = f.return;
                }
                ((f.sibling.return = f.return), (f = f.sibling));
              }
              t.stateNode = e;
              l: switch ((ol(e, n, a), n)) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break l;
                case "img":
                  a = !0;
                  break l;
                default:
                  a = !1;
              }
              a && ct(t);
            }
          }
          return (
            J(t),
            Cf(
              t,
              t.type,
              l === null ? null : l.memoizedProps,
              t.pendingProps,
              u,
            ),
            null
          );
        case 6:
          if (l && t.stateNode != null) l.memoizedProps !== a && ct(t);
          else {
            if (typeof a != "string" && t.stateNode === null)
              throw Error(b(166));
            if (((l = jt.current), pu(t))) {
              if (
                ((l = t.stateNode),
                (u = t.memoizedProps),
                (a = null),
                (n = sl),
                n !== null)
              )
                switch (n.tag) {
                  case 27:
                  case 5:
                    a = n.memoizedProps;
                }
              ((l[dl] = t),
                (l = !!(
                  l.nodeValue === u ||
                  (a !== null && a.suppressHydrationWarning === !0) ||
                  ym(l.nodeValue, u)
                )),
                l || Ft(t, !0));
            } else
              ((l = De(l).createTextNode(a)), (l[dl] = t), (t.stateNode = l));
          }
          return (J(t), null);
        case 31:
          if (((u = t.memoizedState), l === null || l.memoizedState !== null)) {
            if (((a = pu(t)), u !== null)) {
              if (l === null) {
                if (!a) throw Error(b(318));
                if (
                  ((l = t.memoizedState),
                  (l = l !== null ? l.dehydrated : null),
                  !l)
                )
                  throw Error(b(557));
                l[dl] = t;
              } else
                (mu(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4));
              (J(t), (l = !1));
            } else
              ((u = _f()),
                l !== null &&
                  l.memoizedState !== null &&
                  (l.memoizedState.hydrationErrors = u),
                (l = !0));
            if (!l) return t.flags & 256 ? (Hl(t), t) : (Hl(t), null);
            if ((t.flags & 128) !== 0) throw Error(b(558));
          }
          return (J(t), null);
        case 13:
          if (
            ((a = t.memoizedState),
            l === null ||
              (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
          ) {
            if (((n = pu(t)), a !== null && a.dehydrated !== null)) {
              if (l === null) {
                if (!n) throw Error(b(318));
                if (
                  ((n = t.memoizedState),
                  (n = n !== null ? n.dehydrated : null),
                  !n)
                )
                  throw Error(b(317));
                n[dl] = t;
              } else
                (mu(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4));
              (J(t), (n = !1));
            } else
              ((n = _f()),
                l !== null &&
                  l.memoizedState !== null &&
                  (l.memoizedState.hydrationErrors = n),
                (n = !0));
            if (!n) return t.flags & 256 ? (Hl(t), t) : (Hl(t), null);
          }
          return (
            Hl(t),
            (t.flags & 128) !== 0
              ? ((t.lanes = u), t)
              : ((u = a !== null),
                (l = l !== null && l.memoizedState !== null),
                u &&
                  ((a = t.child),
                  (n = null),
                  a.alternate !== null &&
                    a.alternate.memoizedState !== null &&
                    a.alternate.memoizedState.cachePool !== null &&
                    (n = a.alternate.memoizedState.cachePool.pool),
                  (e = null),
                  a.memoizedState !== null &&
                    a.memoizedState.cachePool !== null &&
                    (e = a.memoizedState.cachePool.pool),
                  e !== n && (a.flags |= 2048)),
                u !== l && u && (t.child.flags |= 8192),
                Yn(t, t.updateQueue),
                J(t),
                null)
          );
        case 4:
          return (
            ku(),
            l === null && pc(t.stateNode.containerInfo),
            J(t),
            null
          );
        case 10:
          return (bt(t.type), J(t), null);
        case 19:
          if ((vl(ll), (a = t.memoizedState), a === null)) return (J(t), null);
          if (((n = (t.flags & 128) !== 0), (e = a.rendering), e === null))
            if (n) Aa(a, !1);
            else {
              if (P !== 0 || (l !== null && (l.flags & 128) !== 0))
                for (l = t.child; l !== null; ) {
                  if (((e = he(l)), e !== null)) {
                    for (
                      t.flags |= 128,
                        Aa(a, !1),
                        l = e.updateQueue,
                        t.updateQueue = l,
                        Yn(t, l),
                        t.subtreeFlags = 0,
                        l = u,
                        u = t.child;
                      u !== null;
                    )
                      (_y(u, l), (u = u.sibling));
                    return (
                      L(ll, (ll.current & 1) | 2),
                      B && dt(t, a.treeForkCount),
                      t.child
                    );
                  }
                  l = l.sibling;
                }
              a.tail !== null &&
                Cl() > Ee &&
                ((t.flags |= 128), (n = !0), Aa(a, !1), (t.lanes = 4194304));
            }
          else {
            if (!n)
              if (((l = he(e)), l !== null)) {
                if (
                  ((t.flags |= 128),
                  (n = !0),
                  (l = l.updateQueue),
                  (t.updateQueue = l),
                  Yn(t, l),
                  Aa(a, !0),
                  a.tail === null &&
                    a.tailMode === "hidden" &&
                    !e.alternate &&
                    !B)
                )
                  return (J(t), null);
              } else
                2 * Cl() - a.renderingStartTime > Ee &&
                  u !== 536870912 &&
                  ((t.flags |= 128), (n = !0), Aa(a, !1), (t.lanes = 4194304));
            a.isBackwards
              ? ((e.sibling = t.child), (t.child = e))
              : ((l = a.last),
                l !== null ? (l.sibling = e) : (t.child = e),
                (a.last = e));
          }
          return a.tail !== null
            ? ((l = a.tail),
              (a.rendering = l),
              (a.tail = l.sibling),
              (a.renderingStartTime = Cl()),
              (l.sibling = null),
              (u = ll.current),
              L(ll, n ? (u & 1) | 2 : u & 1),
              B && dt(t, a.treeForkCount),
              l)
            : (J(t), null);
        case 22:
        case 23:
          return (
            Hl(t),
            fc(),
            (a = t.memoizedState !== null),
            l !== null
              ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
              : a && (t.flags |= 8192),
            a
              ? (u & 536870912) !== 0 &&
                (t.flags & 128) === 0 &&
                (J(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : J(t),
            (u = t.updateQueue),
            u !== null && Yn(t, u.retryQueue),
            (u = null),
            l !== null &&
              l.memoizedState !== null &&
              l.memoizedState.cachePool !== null &&
              (u = l.memoizedState.cachePool.pool),
            (a = null),
            t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (a = t.memoizedState.cachePool.pool),
            a !== u && (t.flags |= 2048),
            l !== null && vl(cu),
            null
          );
        case 24:
          return (
            (u = null),
            l !== null && (u = l.memoizedState.cache),
            t.memoizedState.cache !== u && (t.flags |= 2048),
            bt(nl),
            J(t),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(b(156, t.tag));
    }
    function Cs(l, t) {
      switch ((tc(t), t.tag)) {
        case 1:
          return (
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 3:
          return (
            bt(nl),
            ku(),
            (l = t.flags),
            (l & 65536) !== 0 && (l & 128) === 0
              ? ((t.flags = (l & -65537) | 128), t)
              : null
          );
        case 26:
        case 27:
        case 5:
          return (ee(t), null);
        case 31:
          if (t.memoizedState !== null) {
            if ((Hl(t), t.alternate === null)) throw Error(b(340));
            mu();
          }
          return (
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 13:
          if (
            (Hl(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(b(340));
            mu();
          }
          return (
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 19:
          return (vl(ll), null);
        case 4:
          return (ku(), null);
        case 10:
          return (bt(t.type), null);
        case 22:
        case 23:
          return (
            Hl(t),
            fc(),
            l !== null && vl(cu),
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 24:
          return (bt(nl), null);
        case 25:
          return null;
        default:
          return null;
      }
    }
    function _v(l, t) {
      switch ((tc(t), t.tag)) {
        case 3:
          (bt(nl), ku());
          break;
        case 26:
        case 27:
        case 5:
          ee(t);
          break;
        case 4:
          ku();
          break;
        case 31:
          t.memoizedState !== null && Hl(t);
          break;
        case 13:
          Hl(t);
          break;
        case 19:
          vl(ll);
          break;
        case 10:
          bt(t.type);
          break;
        case 22:
        case 23:
          (Hl(t), fc(), l !== null && vl(cu));
          break;
        case 24:
          bt(nl);
      }
    }
    function sn(l, t) {
      try {
        var u = t.updateQueue,
          a = u !== null ? u.lastEffect : null;
        if (a !== null) {
          var n = a.next;
          u = n;
          do {
            if ((u.tag & l) === l) {
              a = void 0;
              var e = u.create,
                f = u.inst;
              ((a = e()), (f.destroy = a));
            }
            u = u.next;
          } while (u !== n);
        }
      } catch (i) {
        j(t, t.return, i);
      }
    }
    function kt(l, t, u) {
      try {
        var a = t.updateQueue,
          n = a !== null ? a.lastEffect : null;
        if (n !== null) {
          var e = n.next;
          a = e;
          do {
            if ((a.tag & l) === l) {
              var f = a.inst,
                i = f.destroy;
              if (i !== void 0) {
                ((f.destroy = void 0), (n = t));
                var c = u,
                  m = i;
                try {
                  m();
                } catch (o) {
                  j(n, c, o);
                }
              }
            }
            a = a.next;
          } while (a !== e);
        }
      } catch (o) {
        j(t, t.return, o);
      }
    }
    function Mv(l) {
      var t = l.updateQueue;
      if (t !== null) {
        var u = l.stateNode;
        try {
          By(t, u);
        } catch (a) {
          j(l, l.return, a);
        }
      }
    }
    function Dv(l, t, u) {
      ((u.props = ou(l.type, l.memoizedProps)), (u.state = l.memoizedState));
      try {
        u.componentWillUnmount();
      } catch (a) {
        j(l, t, a);
      }
    }
    function Ra(l, t) {
      try {
        var u = l.ref;
        if (u !== null) {
          switch (l.tag) {
            case 26:
            case 27:
            case 5:
              var a = l.stateNode;
              break;
            case 30:
              a = l.stateNode;
              break;
            default:
              a = l.stateNode;
          }
          typeof u == "function" ? (l.refCleanup = u(a)) : (u.current = a);
        }
      } catch (n) {
        j(l, t, n);
      }
    }
    function ut(l, t) {
      var u = l.ref,
        a = l.refCleanup;
      if (u !== null)
        if (typeof a == "function")
          try {
            a();
          } catch (n) {
            j(l, t, n);
          } finally {
            ((l.refCleanup = null),
              (l = l.alternate),
              l != null && (l.refCleanup = null));
          }
        else if (typeof u == "function")
          try {
            u(null);
          } catch (n) {
            j(l, t, n);
          }
        else u.current = null;
    }
    function Uv(l) {
      var t = l.type,
        u = l.memoizedProps,
        a = l.stateNode;
      try {
        l: switch (t) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            u.autoFocus && a.focus();
            break l;
          case "img":
            u.src ? (a.src = u.src) : u.srcSet && (a.srcset = u.srcSet);
        }
      } catch (n) {
        j(l, l.return, n);
      }
    }
    function Bf(l, t, u) {
      try {
        var a = l.stateNode;
        (Ps(a, l.type, u, t), (a[Ul] = t));
      } catch (n) {
        j(l, l.return, n);
      }
    }
    function pv(l) {
      return (
        l.tag === 5 ||
        l.tag === 3 ||
        l.tag === 26 ||
        (l.tag === 27 && lu(l.type)) ||
        l.tag === 4
      );
    }
    function Yf(l) {
      l: for (;;) {
        for (; l.sibling === null; ) {
          if (l.return === null || pv(l.return)) return null;
          l = l.return;
        }
        for (
          l.sibling.return = l.return, l = l.sibling;
          l.tag !== 5 && l.tag !== 6 && l.tag !== 18;
        ) {
          if (
            (l.tag === 27 && lu(l.type)) ||
            l.flags & 2 ||
            l.child === null ||
            l.tag === 4
          )
            continue l;
          ((l.child.return = l), (l = l.child));
        }
        if (!(l.flags & 2)) return l.stateNode;
      }
    }
    function Oi(l, t, u) {
      var a = l.tag;
      if (a === 5 || a === 6)
        ((l = l.stateNode),
          t
            ? (u.nodeType === 9
                ? u.body
                : u.nodeName === "HTML"
                  ? u.ownerDocument.body
                  : u
              ).insertBefore(l, t)
            : ((t =
                u.nodeType === 9
                  ? u.body
                  : u.nodeName === "HTML"
                    ? u.ownerDocument.body
                    : u),
              t.appendChild(l),
              (u = u._reactRootContainer),
              u != null || t.onclick !== null || (t.onclick = ot)));
      else if (
        a !== 4 &&
        (a === 27 && lu(l.type) && ((u = l.stateNode), (t = null)),
        (l = l.child),
        l !== null)
      )
        for (Oi(l, t, u), l = l.sibling; l !== null; )
          (Oi(l, t, u), (l = l.sibling));
    }
    function ze(l, t, u) {
      var a = l.tag;
      if (a === 5 || a === 6)
        ((l = l.stateNode), t ? u.insertBefore(l, t) : u.appendChild(l));
      else if (
        a !== 4 &&
        (a === 27 && lu(l.type) && (u = l.stateNode), (l = l.child), l !== null)
      )
        for (ze(l, t, u), l = l.sibling; l !== null; )
          (ze(l, t, u), (l = l.sibling));
    }
    function Nv(l) {
      var t = l.stateNode,
        u = l.memoizedProps;
      try {
        for (var a = l.type, n = t.attributes; n.length; )
          t.removeAttributeNode(n[0]);
        (ol(t, a, u), (t[dl] = l), (t[Ul] = u));
      } catch (e) {
        j(l, l.return, e);
      }
    }
    var st = !1,
      al = !1,
      Gf = !1,
      c1 = typeof WeakSet == "function" ? WeakSet : Set,
      cl = null;
    function Bs(l, t) {
      if (((l = l.containerInfo), (Hi = He), (l = Sy(l)), Fi(l))) {
        if ("selectionStart" in l)
          var u = { start: l.selectionStart, end: l.selectionEnd };
        else
          l: {
            u = ((u = l.ownerDocument) && u.defaultView) || window;
            var a = u.getSelection && u.getSelection();
            if (a && a.rangeCount !== 0) {
              u = a.anchorNode;
              var n = a.anchorOffset,
                e = a.focusNode;
              a = a.focusOffset;
              try {
                (u.nodeType, e.nodeType);
              } catch {
                u = null;
                break l;
              }
              var f = 0,
                i = -1,
                c = -1,
                m = 0,
                o = 0,
                g = l,
                s = null;
              t: for (;;) {
                for (
                  var h;
                  g !== u || (n !== 0 && g.nodeType !== 3) || (i = f + n),
                    g !== e || (a !== 0 && g.nodeType !== 3) || (c = f + a),
                    g.nodeType === 3 && (f += g.nodeValue.length),
                    (h = g.firstChild) !== null;
                )
                  ((s = g), (g = h));
                for (;;) {
                  if (g === l) break t;
                  if (
                    (s === u && ++m === n && (i = f),
                    s === e && ++o === a && (c = f),
                    (h = g.nextSibling) !== null)
                  )
                    break;
                  ((g = s), (s = g.parentNode));
                }
                g = h;
              }
              u = i === -1 || c === -1 ? null : { start: i, end: c };
            } else u = null;
          }
        u = u || { start: 0, end: 0 };
      } else u = null;
      for (
        ri = { focusedElem: l, selectionRange: u }, He = !1, cl = t;
        cl !== null;
      )
        if (
          ((t = cl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
        )
          ((l.return = t), (cl = l));
        else
          for (; cl !== null; ) {
            switch (((t = cl), (e = t.alternate), (l = t.flags), t.tag)) {
              case 0:
                if (
                  (l & 4) !== 0 &&
                  ((l = t.updateQueue),
                  (l = l !== null ? l.events : null),
                  l !== null)
                )
                  for (u = 0; u < l.length; u++)
                    ((n = l[u]), (n.ref.impl = n.nextImpl));
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((l & 1024) !== 0 && e !== null) {
                  ((l = void 0),
                    (u = t),
                    (n = e.memoizedProps),
                    (e = e.memoizedState),
                    (a = u.stateNode));
                  try {
                    var E = ou(u.type, n);
                    ((l = a.getSnapshotBeforeUpdate(E, e)),
                      (a.__reactInternalSnapshotBeforeUpdate = l));
                  } catch (O) {
                    j(u, u.return, O);
                  }
                }
                break;
              case 3:
                if ((l & 1024) !== 0) {
                  if (
                    ((l = t.stateNode.containerInfo), (u = l.nodeType), u === 9)
                  )
                    Ci(l);
                  else if (u === 1)
                    switch (l.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        Ci(l);
                        break;
                      default:
                        l.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((l & 1024) !== 0) throw Error(b(163));
            }
            if (((l = t.sibling), l !== null)) {
              ((l.return = t.return), (cl = l));
              break;
            }
            cl = t.return;
          }
    }
    function Hv(l, t, u) {
      var a = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (vt(l, u), a & 4 && sn(5, u));
          break;
        case 1:
          if ((vt(l, u), a & 4))
            if (((l = u.stateNode), t === null))
              try {
                l.componentDidMount();
              } catch (f) {
                j(u, u.return, f);
              }
            else {
              var n = ou(u.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                l.componentDidUpdate(
                  n,
                  t,
                  l.__reactInternalSnapshotBeforeUpdate,
                );
              } catch (f) {
                j(u, u.return, f);
              }
            }
          (a & 64 && Mv(u), a & 512 && Ra(u, u.return));
          break;
        case 3:
          if ((vt(l, u), a & 64 && ((l = u.updateQueue), l !== null))) {
            if (((t = null), u.child !== null))
              switch (u.child.tag) {
                case 27:
                case 5:
                  t = u.child.stateNode;
                  break;
                case 1:
                  t = u.child.stateNode;
              }
            try {
              By(l, t);
            } catch (f) {
              j(u, u.return, f);
            }
          }
          break;
        case 27:
          t === null && a & 4 && Nv(u);
        case 26:
        case 5:
          (vt(l, u), t === null && a & 4 && Uv(u), a & 512 && Ra(u, u.return));
          break;
        case 12:
          vt(l, u);
          break;
        case 31:
          (vt(l, u), a & 4 && Cv(l, u));
          break;
        case 13:
          (vt(l, u),
            a & 4 && Bv(l, u),
            a & 64 &&
              ((l = u.memoizedState),
              l !== null &&
                ((l = l.dehydrated),
                l !== null && ((u = xs.bind(null, u)), ih(l, u)))));
          break;
        case 22:
          if (((a = u.memoizedState !== null || st), !a)) {
            ((t = (t !== null && t.memoizedState !== null) || al), (n = st));
            var e = al;
            ((st = a),
              (al = t) && !e
                ? mt(l, u, (u.subtreeFlags & 8772) !== 0)
                : vt(l, u),
              (st = n),
              (al = e));
          }
          break;
        case 30:
          break;
        default:
          vt(l, u);
      }
    }
    function rv(l) {
      var t = l.alternate;
      (t !== null && ((l.alternate = null), rv(t)),
        (l.child = null),
        (l.deletions = null),
        (l.sibling = null),
        l.tag === 5 && ((t = l.stateNode), t !== null && Li(t)),
        (l.stateNode = null),
        (l.return = null),
        (l.dependencies = null),
        (l.memoizedProps = null),
        (l.memoizedState = null),
        (l.pendingProps = null),
        (l.stateNode = null),
        (l.updateQueue = null));
    }
    var F = null,
      _l = !1;
    function yt(l, t, u) {
      for (u = u.child; u !== null; ) (qv(l, t, u), (u = u.sibling));
    }
    function qv(l, t, u) {
      if (Bl && typeof Bl.onCommitFiberUnmount == "function")
        try {
          Bl.onCommitFiberUnmount(en, u);
        } catch {}
      switch (u.tag) {
        case 26:
          (al || ut(u, t),
            yt(l, t, u),
            u.memoizedState
              ? u.memoizedState.count--
              : u.stateNode &&
                ((u = u.stateNode), u.parentNode.removeChild(u)));
          break;
        case 27:
          al || ut(u, t);
          var a = F,
            n = _l;
          (lu(u.type) && ((F = u.stateNode), (_l = !1)),
            yt(l, t, u),
            xa(u.stateNode),
            (F = a),
            (_l = n));
          break;
        case 5:
          al || ut(u, t);
        case 6:
          if (
            ((a = F),
            (n = _l),
            (F = null),
            yt(l, t, u),
            (F = a),
            (_l = n),
            F !== null)
          )
            if (_l)
              try {
                (F.nodeType === 9
                  ? F.body
                  : F.nodeName === "HTML"
                    ? F.ownerDocument.body
                    : F
                ).removeChild(u.stateNode);
              } catch (e) {
                j(u, t, e);
              }
            else
              try {
                F.removeChild(u.stateNode);
              } catch (e) {
                j(u, t, e);
              }
          break;
        case 18:
          F !== null &&
            (_l
              ? ((l = F),
                O1(
                  l.nodeType === 9
                    ? l.body
                    : l.nodeName === "HTML"
                      ? l.ownerDocument.body
                      : l,
                  u.stateNode,
                ),
                ia(l))
              : O1(F, u.stateNode));
          break;
        case 4:
          ((a = F),
            (n = _l),
            (F = u.stateNode.containerInfo),
            (_l = !0),
            yt(l, t, u),
            (F = a),
            (_l = n));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          (kt(2, u, t), al || kt(4, u, t), yt(l, t, u));
          break;
        case 1:
          (al ||
            (ut(u, t),
            (a = u.stateNode),
            typeof a.componentWillUnmount == "function" && Dv(u, t, a)),
            yt(l, t, u));
          break;
        case 21:
          yt(l, t, u);
          break;
        case 22:
          ((al = (a = al) || u.memoizedState !== null), yt(l, t, u), (al = a));
          break;
        default:
          yt(l, t, u);
      }
    }
    function Cv(l, t) {
      if (
        t.memoizedState === null &&
        ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
      ) {
        l = l.dehydrated;
        try {
          ia(l);
        } catch (u) {
          j(t, t.return, u);
        }
      }
    }
    function Bv(l, t) {
      if (
        t.memoizedState === null &&
        ((l = t.alternate),
        l !== null &&
          ((l = l.memoizedState),
          l !== null && ((l = l.dehydrated), l !== null)))
      )
        try {
          ia(l);
        } catch (u) {
          j(t, t.return, u);
        }
    }
    function Ys(l) {
      switch (l.tag) {
        case 31:
        case 13:
        case 19:
          var t = l.stateNode;
          return (t === null && (t = l.stateNode = new c1()), t);
        case 22:
          return (
            (l = l.stateNode),
            (t = l._retryCache),
            t === null && (t = l._retryCache = new c1()),
            t
          );
        default:
          throw Error(b(435, l.tag));
      }
    }
    function Gn(l, t) {
      var u = Ys(l);
      t.forEach(function (a) {
        if (!u.has(a)) {
          u.add(a);
          var n = Ls.bind(null, l, a);
          a.then(n, n);
        }
      });
    }
    function Al(l, t) {
      var u = t.deletions;
      if (u !== null)
        for (var a = 0; a < u.length; a++) {
          var n = u[a],
            e = l,
            f = t,
            i = f;
          l: for (; i !== null; ) {
            switch (i.tag) {
              case 27:
                if (lu(i.type)) {
                  ((F = i.stateNode), (_l = !1));
                  break l;
                }
                break;
              case 5:
                ((F = i.stateNode), (_l = !1));
                break l;
              case 3:
              case 4:
                ((F = i.stateNode.containerInfo), (_l = !0));
                break l;
            }
            i = i.return;
          }
          if (F === null) throw Error(b(160));
          (qv(e, f, n),
            (F = null),
            (_l = !1),
            (e = n.alternate),
            e !== null && (e.return = null),
            (n.return = null));
        }
      if (t.subtreeFlags & 13886)
        for (t = t.child; t !== null; ) (Yv(t, l), (t = t.sibling));
    }
    var kl = null;
    function Yv(l, t) {
      var u = l.alternate,
        a = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Al(t, l),
            Ol(l),
            a & 4 && (kt(3, l, l.return), sn(3, l), kt(5, l, l.return)));
          break;
        case 1:
          (Al(t, l),
            Ol(l),
            a & 512 && (al || u === null || ut(u, u.return)),
            a & 64 &&
              st &&
              ((l = l.updateQueue),
              l !== null &&
                ((a = l.callbacks),
                a !== null &&
                  ((u = l.shared.hiddenCallbacks),
                  (l.shared.hiddenCallbacks = u === null ? a : u.concat(a))))));
          break;
        case 26:
          var n = kl;
          if (
            (Al(t, l),
            Ol(l),
            a & 512 && (al || u === null || ut(u, u.return)),
            a & 4)
          ) {
            var e = u !== null ? u.memoizedState : null;
            if (((a = l.memoizedState), u === null))
              if (a === null)
                if (l.stateNode === null) {
                  l: {
                    ((a = l.type),
                      (u = l.memoizedProps),
                      (n = n.ownerDocument || n));
                    t: switch (a) {
                      case "title":
                        ((e = n.getElementsByTagName("title")[0]),
                          (!e ||
                            e[yn] ||
                            e[dl] ||
                            e.namespaceURI === "http://www.w3.org/2000/svg" ||
                            e.hasAttribute("itemprop")) &&
                            ((e = n.createElement(a)),
                            n.head.insertBefore(
                              e,
                              n.querySelector("head > title"),
                            )),
                          ol(e, a, u),
                          (e[dl] = l),
                          yl(e),
                          (a = e));
                        break l;
                      case "link":
                        var f = H1("link", "href", n).get(a + (u.href || ""));
                        if (f) {
                          for (var i = 0; i < f.length; i++)
                            if (
                              ((e = f[i]),
                              e.getAttribute("href") ===
                                (u.href == null || u.href === ""
                                  ? null
                                  : u.href) &&
                                e.getAttribute("rel") ===
                                  (u.rel == null ? null : u.rel) &&
                                e.getAttribute("title") ===
                                  (u.title == null ? null : u.title) &&
                                e.getAttribute("crossorigin") ===
                                  (u.crossOrigin == null
                                    ? null
                                    : u.crossOrigin))
                            ) {
                              f.splice(i, 1);
                              break t;
                            }
                        }
                        ((e = n.createElement(a)),
                          ol(e, a, u),
                          n.head.appendChild(e));
                        break;
                      case "meta":
                        if (
                          (f = H1("meta", "content", n).get(
                            a + (u.content || ""),
                          ))
                        ) {
                          for (i = 0; i < f.length; i++)
                            if (
                              ((e = f[i]),
                              e.getAttribute("content") ===
                                (u.content == null ? null : "" + u.content) &&
                                e.getAttribute("name") ===
                                  (u.name == null ? null : u.name) &&
                                e.getAttribute("property") ===
                                  (u.property == null ? null : u.property) &&
                                e.getAttribute("http-equiv") ===
                                  (u.httpEquiv == null ? null : u.httpEquiv) &&
                                e.getAttribute("charset") ===
                                  (u.charSet == null ? null : u.charSet))
                            ) {
                              f.splice(i, 1);
                              break t;
                            }
                        }
                        ((e = n.createElement(a)),
                          ol(e, a, u),
                          n.head.appendChild(e));
                        break;
                      default:
                        throw Error(b(468, a));
                    }
                    ((e[dl] = l), yl(e), (a = e));
                  }
                  l.stateNode = a;
                } else r1(n, l.type, l.stateNode);
              else l.stateNode = N1(n, a, l.memoizedProps);
            else
              e !== a
                ? (e === null
                    ? u.stateNode !== null &&
                      ((u = u.stateNode), u.parentNode.removeChild(u))
                    : e.count--,
                  a === null
                    ? r1(n, l.type, l.stateNode)
                    : N1(n, a, l.memoizedProps))
                : a === null &&
                  l.stateNode !== null &&
                  Bf(l, l.memoizedProps, u.memoizedProps);
          }
          break;
        case 27:
          (Al(t, l),
            Ol(l),
            a & 512 && (al || u === null || ut(u, u.return)),
            u !== null && a & 4 && Bf(l, l.memoizedProps, u.memoizedProps));
          break;
        case 5:
          if (
            (Al(t, l),
            Ol(l),
            a & 512 && (al || u === null || ut(u, u.return)),
            l.flags & 32)
          ) {
            n = l.stateNode;
            try {
              Pu(n, "");
            } catch (E) {
              j(l, l.return, E);
            }
          }
          (a & 4 &&
            l.stateNode != null &&
            ((n = l.memoizedProps), Bf(l, n, u !== null ? u.memoizedProps : n)),
            a & 1024 && (Gf = !0));
          break;
        case 6:
          if ((Al(t, l), Ol(l), a & 4)) {
            if (l.stateNode === null) throw Error(b(162));
            ((a = l.memoizedProps), (u = l.stateNode));
            try {
              u.nodeValue = a;
            } catch (E) {
              j(l, l.return, E);
            }
          }
          break;
        case 3:
          if (
            ((le = null),
            (n = kl),
            (kl = Ue(t.containerInfo)),
            Al(t, l),
            (kl = n),
            Ol(l),
            a & 4 && u !== null && u.memoizedState.isDehydrated)
          )
            try {
              ia(t.containerInfo);
            } catch (E) {
              j(l, l.return, E);
            }
          Gf && ((Gf = !1), Gv(l));
          break;
        case 4:
          ((a = kl),
            (kl = Ue(l.stateNode.containerInfo)),
            Al(t, l),
            Ol(l),
            (kl = a));
          break;
        case 12:
          (Al(t, l), Ol(l));
          break;
        case 31:
          (Al(t, l),
            Ol(l),
            a & 4 &&
              ((a = l.updateQueue),
              a !== null && ((l.updateQueue = null), Gn(l, a))));
          break;
        case 13:
          (Al(t, l),
            Ol(l),
            l.child.flags & 8192 &&
              (l.memoizedState !== null) !=
                (u !== null && u.memoizedState !== null) &&
              (xe = Cl()),
            a & 4 &&
              ((a = l.updateQueue),
              a !== null && ((l.updateQueue = null), Gn(l, a))));
          break;
        case 22:
          n = l.memoizedState !== null;
          var c = u !== null && u.memoizedState !== null,
            m = st,
            o = al;
          if (
            ((st = m || n),
            (al = o || c),
            Al(t, l),
            (al = o),
            (st = m),
            Ol(l),
            a & 8192)
          )
            l: for (
              t = l.stateNode,
                t._visibility = n ? t._visibility & -2 : t._visibility | 1,
                n && (u === null || c || st || al || eu(l)),
                u = null,
                t = l;
              ;
            ) {
              if (t.tag === 5 || t.tag === 26) {
                if (u === null) {
                  c = u = t;
                  try {
                    if (((e = c.stateNode), n))
                      ((f = e.style),
                        typeof f.setProperty == "function"
                          ? f.setProperty("display", "none", "important")
                          : (f.display = "none"));
                    else {
                      i = c.stateNode;
                      var g = c.memoizedProps.style,
                        s =
                          g != null && g.hasOwnProperty("display")
                            ? g.display
                            : null;
                      i.style.display =
                        s == null || typeof s == "boolean"
                          ? ""
                          : ("" + s).trim();
                    }
                  } catch (E) {
                    j(c, c.return, E);
                  }
                }
              } else if (t.tag === 6) {
                if (u === null) {
                  c = t;
                  try {
                    c.stateNode.nodeValue = n ? "" : c.memoizedProps;
                  } catch (E) {
                    j(c, c.return, E);
                  }
                }
              } else if (t.tag === 18) {
                if (u === null) {
                  c = t;
                  try {
                    var h = c.stateNode;
                    n ? _1(h, !0) : _1(c.stateNode, !1);
                  } catch (E) {
                    j(c, c.return, E);
                  }
                }
              } else if (
                ((t.tag !== 22 && t.tag !== 23) ||
                  t.memoizedState === null ||
                  t === l) &&
                t.child !== null
              ) {
                ((t.child.return = t), (t = t.child));
                continue;
              }
              if (t === l) break l;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === l) break l;
                (u === t && (u = null), (t = t.return));
              }
              (u === t && (u = null),
                (t.sibling.return = t.return),
                (t = t.sibling));
            }
          a & 4 &&
            ((a = l.updateQueue),
            a !== null &&
              ((u = a.retryQueue),
              u !== null && ((a.retryQueue = null), Gn(l, u))));
          break;
        case 19:
          (Al(t, l),
            Ol(l),
            a & 4 &&
              ((a = l.updateQueue),
              a !== null && ((l.updateQueue = null), Gn(l, a))));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          (Al(t, l), Ol(l));
      }
    }
    function Ol(l) {
      var t = l.flags;
      if (t & 2) {
        try {
          for (var u, a = l.return; a !== null; ) {
            if (pv(a)) {
              u = a;
              break;
            }
            a = a.return;
          }
          if (u == null) throw Error(b(160));
          switch (u.tag) {
            case 27:
              var n = u.stateNode,
                e = Yf(l);
              ze(l, e, n);
              break;
            case 5:
              var f = u.stateNode;
              u.flags & 32 && (Pu(f, ""), (u.flags &= -33));
              var i = Yf(l);
              ze(l, i, f);
              break;
            case 3:
            case 4:
              var c = u.stateNode.containerInfo,
                m = Yf(l);
              Oi(l, m, c);
              break;
            default:
              throw Error(b(161));
          }
        } catch (o) {
          j(l, l.return, o);
        }
        l.flags &= -3;
      }
      t & 4096 && (l.flags &= -4097);
    }
    function Gv(l) {
      if (l.subtreeFlags & 1024)
        for (l = l.child; l !== null; ) {
          var t = l;
          (Gv(t),
            t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
            (l = l.sibling));
        }
    }
    function vt(l, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          (Hv(l, t.alternate, t), (t = t.sibling));
    }
    function eu(l) {
      for (l = l.child; l !== null; ) {
        var t = l;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (kt(4, t, t.return), eu(t));
            break;
          case 1:
            ut(t, t.return);
            var u = t.stateNode;
            (typeof u.componentWillUnmount == "function" && Dv(t, t.return, u),
              eu(t));
            break;
          case 27:
            xa(t.stateNode);
          case 26:
          case 5:
            (ut(t, t.return), eu(t));
            break;
          case 22:
            t.memoizedState === null && eu(t);
            break;
          case 30:
            eu(t);
            break;
          default:
            eu(t);
        }
        l = l.sibling;
      }
    }
    function mt(l, t, u) {
      for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var a = t.alternate,
          n = l,
          e = t,
          f = e.flags;
        switch (e.tag) {
          case 0:
          case 11:
          case 15:
            (mt(n, e, u), sn(4, e));
            break;
          case 1:
            if (
              (mt(n, e, u),
              (a = e),
              (n = a.stateNode),
              typeof n.componentDidMount == "function")
            )
              try {
                n.componentDidMount();
              } catch (m) {
                j(a, a.return, m);
              }
            if (((a = e), (n = a.updateQueue), n !== null)) {
              var i = a.stateNode;
              try {
                var c = n.shared.hiddenCallbacks;
                if (c !== null)
                  for (
                    n.shared.hiddenCallbacks = null, n = 0;
                    n < c.length;
                    n++
                  )
                    Cy(c[n], i);
              } catch (m) {
                j(a, a.return, m);
              }
            }
            (u && f & 64 && Mv(e), Ra(e, e.return));
            break;
          case 27:
            Nv(e);
          case 26:
          case 5:
            (mt(n, e, u), u && a === null && f & 4 && Uv(e), Ra(e, e.return));
            break;
          case 12:
            mt(n, e, u);
            break;
          case 31:
            (mt(n, e, u), u && f & 4 && Cv(n, e));
            break;
          case 13:
            (mt(n, e, u), u && f & 4 && Bv(n, e));
            break;
          case 22:
            (e.memoizedState === null && mt(n, e, u), Ra(e, e.return));
            break;
          case 30:
            break;
          default:
            mt(n, e, u);
        }
        t = t.sibling;
      }
    }
    function Ac(l, t) {
      var u = null;
      (l !== null &&
        l.memoizedState !== null &&
        l.memoizedState.cachePool !== null &&
        (u = l.memoizedState.cachePool.pool),
        (l = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (l = t.memoizedState.cachePool.pool),
        l !== u && (l != null && l.refCount++, u != null && mn(u)));
    }
    function Oc(l, t) {
      ((l = null),
        t.alternate !== null && (l = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache),
        t !== l && (t.refCount++, l != null && mn(l)));
    }
    function Fl(l, t, u, a) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) (Xv(l, t, u, a), (t = t.sibling));
    }
    function Xv(l, t, u, a) {
      var n = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (Fl(l, t, u, a), n & 2048 && sn(9, t));
          break;
        case 1:
          Fl(l, t, u, a);
          break;
        case 3:
          (Fl(l, t, u, a),
            n & 2048 &&
              ((l = null),
              t.alternate !== null && (l = t.alternate.memoizedState.cache),
              (t = t.memoizedState.cache),
              t !== l && (t.refCount++, l != null && mn(l))));
          break;
        case 12:
          if (n & 2048) {
            (Fl(l, t, u, a), (l = t.stateNode));
            try {
              var e = t.memoizedProps,
                f = e.id,
                i = e.onPostCommit;
              typeof i == "function" &&
                i(
                  f,
                  t.alternate === null ? "mount" : "update",
                  l.passiveEffectDuration,
                  -0,
                );
            } catch (c) {
              j(t, t.return, c);
            }
          } else Fl(l, t, u, a);
          break;
        case 31:
          Fl(l, t, u, a);
          break;
        case 13:
          Fl(l, t, u, a);
          break;
        case 23:
          break;
        case 22:
          ((e = t.stateNode),
            (f = t.alternate),
            t.memoizedState !== null
              ? e._visibility & 2
                ? Fl(l, t, u, a)
                : ja(l, t)
              : e._visibility & 2
                ? Fl(l, t, u, a)
                : ((e._visibility |= 2),
                  Hu(l, t, u, a, (t.subtreeFlags & 10256) !== 0 || !1)),
            n & 2048 && Ac(f, t));
          break;
        case 24:
          (Fl(l, t, u, a), n & 2048 && Oc(t.alternate, t));
          break;
        default:
          Fl(l, t, u, a);
      }
    }
    function Hu(l, t, u, a, n) {
      for (
        n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
        t !== null;
      ) {
        var e = l,
          f = t,
          i = u,
          c = a,
          m = f.flags;
        switch (f.tag) {
          case 0:
          case 11:
          case 15:
            (Hu(e, f, i, c, n), sn(8, f));
            break;
          case 23:
            break;
          case 22:
            var o = f.stateNode;
            (f.memoizedState !== null
              ? o._visibility & 2
                ? Hu(e, f, i, c, n)
                : ja(e, f)
              : ((o._visibility |= 2), Hu(e, f, i, c, n)),
              n && m & 2048 && Ac(f.alternate, f));
            break;
          case 24:
            (Hu(e, f, i, c, n), n && m & 2048 && Oc(f.alternate, f));
            break;
          default:
            Hu(e, f, i, c, n);
        }
        t = t.sibling;
      }
    }
    function ja(l, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var u = l,
            a = t,
            n = a.flags;
          switch (a.tag) {
            case 22:
              (ja(u, a), n & 2048 && Ac(a.alternate, a));
              break;
            case 24:
              (ja(u, a), n & 2048 && Oc(a.alternate, a));
              break;
            default:
              ja(u, a);
          }
          t = t.sibling;
        }
    }
    var Ha = 8192;
    function Nu(l, t, u) {
      if (l.subtreeFlags & Ha)
        for (l = l.child; l !== null; ) (Qv(l, t, u), (l = l.sibling));
    }
    function Qv(l, t, u) {
      switch (l.tag) {
        case 26:
          (Nu(l, t, u),
            l.flags & Ha &&
              l.memoizedState !== null &&
              zh(u, kl, l.memoizedState, l.memoizedProps));
          break;
        case 5:
          Nu(l, t, u);
          break;
        case 3:
        case 4:
          var a = kl;
          ((kl = Ue(l.stateNode.containerInfo)), Nu(l, t, u), (kl = a));
          break;
        case 22:
          l.memoizedState === null &&
            ((a = l.alternate),
            a !== null && a.memoizedState !== null
              ? ((a = Ha), (Ha = 16777216), Nu(l, t, u), (Ha = a))
              : Nu(l, t, u));
          break;
        default:
          Nu(l, t, u);
      }
    }
    function Rv(l) {
      var t = l.alternate;
      if (t !== null && ((l = t.child), l !== null)) {
        t.child = null;
        do ((t = l.sibling), (l.sibling = null), (l = t));
        while (l !== null);
      }
    }
    function Oa(l) {
      var t = l.deletions;
      if ((l.flags & 16) !== 0) {
        if (t !== null)
          for (var u = 0; u < t.length; u++) {
            var a = t[u];
            ((cl = a), Zv(a, l));
          }
        Rv(l);
      }
      if (l.subtreeFlags & 10256)
        for (l = l.child; l !== null; ) (jv(l), (l = l.sibling));
    }
    function jv(l) {
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          (Oa(l), l.flags & 2048 && kt(9, l, l.return));
          break;
        case 3:
          Oa(l);
          break;
        case 12:
          Oa(l);
          break;
        case 22:
          var t = l.stateNode;
          l.memoizedState !== null &&
          t._visibility & 2 &&
          (l.return === null || l.return.tag !== 13)
            ? ((t._visibility &= -3), In(l))
            : Oa(l);
          break;
        default:
          Oa(l);
      }
    }
    function In(l) {
      var t = l.deletions;
      if ((l.flags & 16) !== 0) {
        if (t !== null)
          for (var u = 0; u < t.length; u++) {
            var a = t[u];
            ((cl = a), Zv(a, l));
          }
        Rv(l);
      }
      for (l = l.child; l !== null; ) {
        switch (((t = l), t.tag)) {
          case 0:
          case 11:
          case 15:
            (kt(8, t, t.return), In(t));
            break;
          case 22:
            ((u = t.stateNode),
              u._visibility & 2 && ((u._visibility &= -3), In(t)));
            break;
          default:
            In(t);
        }
        l = l.sibling;
      }
    }
    function Zv(l, t) {
      for (; cl !== null; ) {
        var u = cl;
        switch (u.tag) {
          case 0:
          case 11:
          case 15:
            kt(8, u, t);
            break;
          case 23:
          case 22:
            if (
              u.memoizedState !== null &&
              u.memoizedState.cachePool !== null
            ) {
              var a = u.memoizedState.cachePool.pool;
              a != null && a.refCount++;
            }
            break;
          case 24:
            mn(u.memoizedState.cache);
        }
        if (((a = u.child), a !== null)) ((a.return = u), (cl = a));
        else
          l: for (u = l; cl !== null; ) {
            a = cl;
            var n = a.sibling,
              e = a.return;
            if ((rv(a), a === u)) {
              cl = null;
              break l;
            }
            if (n !== null) {
              ((n.return = e), (cl = n));
              break l;
            }
            cl = e;
          }
      }
    }
    var Gs = {
        getCacheForType: function (l) {
          var t = hl(nl),
            u = t.data.get(l);
          return (u === void 0 && ((u = l()), t.data.set(l, u)), u);
        },
        cacheSignal: function () {
          return hl(nl).controller.signal;
        },
      },
      Xs = typeof WeakMap == "function" ? WeakMap : Map,
      X = 0,
      x = null,
      r = null,
      q = 0,
      R = 0,
      Nl = null,
      Xt = !1,
      da = !1,
      _c = !1,
      _t = 0,
      P = 0,
      It = 0,
      vu = 0,
      Mc = 0,
      ql = 0,
      aa = 0,
      Za = null,
      Ml = null,
      _i = !1,
      xe = 0,
      Vv = 0,
      Ee = 1 / 0,
      Te = null,
      Lt = null,
      fl = 0,
      Kt = null,
      na = null,
      zt = 0,
      Mi = 0,
      Di = null,
      xv = null,
      Va = 0,
      Ui = null;
    function Gl() {
      return (X & 2) !== 0 && q !== 0 ? q & -q : _.T !== null ? Uc() : I1();
    }
    function Lv() {
      if (ql === 0)
        if ((q & 536870912) === 0 || B) {
          var l = Dn;
          ((Dn <<= 1), (Dn & 3932160) === 0 && (Dn = 262144), (ql = l));
        } else ql = 536870912;
      return ((l = Ql.current), l !== null && (l.flags |= 32), ql);
    }
    function Dl(l, t, u) {
      (((l === x && (R === 2 || R === 9)) || l.cancelPendingCommit !== null) &&
        (ea(l, 0), Qt(l, q, ql, !1)),
        cn(l, u),
        ((X & 2) === 0 || l !== x) &&
          (l === x && ((X & 2) === 0 && (vu |= u), P === 4 && Qt(l, q, ql, !1)),
          et(l)));
    }
    function Kv(l, t, u) {
      if ((X & 6) !== 0) throw Error(b(327));
      var a = (!u && (t & 127) === 0 && (t & l.expiredLanes) === 0) || fn(l, t),
        n = a ? js(l, t) : Xf(l, t, !0),
        e = a;
      do {
        if (n === 0) {
          da && !a && Qt(l, t, 0, !1);
          break;
        } else {
          if (((u = l.current.alternate), e && !Qs(u))) {
            ((n = Xf(l, t, !1)), (e = !1));
            continue;
          }
          if (n === 2) {
            if (((e = t), l.errorRecoveryDisabledLanes & e)) var f = 0;
            else
              ((f = l.pendingLanes & -536870913),
                (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
            if (f !== 0) {
              t = f;
              l: {
                var i = l;
                n = Za;
                var c = i.current.memoizedState.isDehydrated;
                if (
                  (c && (ea(i, f).flags |= 256), (f = Xf(i, f, !1)), f !== 2)
                ) {
                  if (_c && !c) {
                    ((i.errorRecoveryDisabledLanes |= e), (vu |= e), (n = 4));
                    break l;
                  }
                  ((e = Ml),
                    (Ml = n),
                    e !== null &&
                      (Ml === null ? (Ml = e) : Ml.push.apply(Ml, e)));
                }
                n = f;
              }
              if (((e = !1), n !== 2)) continue;
            }
          }
          if (n === 1) {
            (ea(l, 0), Qt(l, t, 0, !0));
            break;
          }
          l: {
            switch (((a = l), (e = n), e)) {
              case 0:
              case 1:
                throw Error(b(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                Qt(a, t, ql, !Xt);
                break l;
              case 2:
                Ml = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(b(329));
            }
            if ((t & 62914560) === t && ((n = xe + 300 - Cl()), 10 < n)) {
              if ((Qt(a, t, ql, !Xt), qe(a, 0, !0) !== 0)) break l;
              ((zt = t),
                (a.timeoutHandle = mm(
                  y1.bind(
                    null,
                    a,
                    u,
                    Ml,
                    Te,
                    _i,
                    t,
                    ql,
                    vu,
                    aa,
                    Xt,
                    e,
                    "Throttled",
                    -0,
                    0,
                  ),
                  n,
                )));
              break l;
            }
            y1(a, u, Ml, Te, _i, t, ql, vu, aa, Xt, e, null, -0, 0);
          }
        }
        break;
      } while (!0);
      et(l);
    }
    function y1(l, t, u, a, n, e, f, i, c, m, o, g, s, h) {
      if (
        ((l.timeoutHandle = -1),
        (g = t.subtreeFlags),
        g & 8192 || (g & 16785408) === 16785408)
      ) {
        ((g = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: ot,
        }),
          Qv(t, e, g));
        var E =
          (e & 62914560) === e
            ? xe - Cl()
            : (e & 4194048) === e
              ? Vv - Cl()
              : 0;
        if (((E = Eh(g, E)), E !== null)) {
          ((zt = e),
            (l.cancelPendingCommit = E(
              m1.bind(null, l, t, e, u, a, n, f, i, c, o, g, null, s, h),
            )),
            Qt(l, e, f, !m));
          return;
        }
      }
      m1(l, t, e, u, a, n, f, i, c);
    }
    function Qs(l) {
      for (var t = l; ; ) {
        var u = t.tag;
        if (
          (u === 0 || u === 11 || u === 15) &&
          t.flags & 16384 &&
          ((u = t.updateQueue), u !== null && ((u = u.stores), u !== null))
        )
          for (var a = 0; a < u.length; a++) {
            var n = u[a],
              e = n.getSnapshot;
            n = n.value;
            try {
              if (!Xl(e(), n)) return !1;
            } catch {
              return !1;
            }
          }
        if (((u = t.child), t.subtreeFlags & 16384 && u !== null))
          ((u.return = t), (t = u));
        else {
          if (t === l) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) return !0;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      }
      return !0;
    }
    function Qt(l, t, u, a) {
      ((t &= ~Mc),
        (t &= ~vu),
        (l.suspendedLanes |= t),
        (l.pingedLanes &= ~t),
        a && (l.warmLanes |= t),
        (a = l.expirationTimes));
      for (var n = t; 0 < n; ) {
        var e = 31 - Yl(n),
          f = 1 << e;
        ((a[e] = -1), (n &= ~f));
      }
      u !== 0 && $1(l, u, t);
    }
    function Le() {
      return (X & 6) === 0 ? (hn(0, !1), !1) : !0;
    }
    function Dc() {
      if (r !== null) {
        if (R === 0) var l = r.return;
        else ((l = r), (St = Eu = null), mc(l), (Wu = null), (Fa = 0), (l = r));
        for (; l !== null; ) (_v(l.alternate, l), (l = l.return));
        r = null;
      }
    }
    function ea(l, t) {
      var u = l.timeoutHandle;
      (u !== -1 && ((l.timeoutHandle = -1), uh(u)),
        (u = l.cancelPendingCommit),
        u !== null && ((l.cancelPendingCommit = null), u()),
        (zt = 0),
        Dc(),
        (x = l),
        (r = u = gt(l.current, null)),
        (q = t),
        (R = 0),
        (Nl = null),
        (Xt = !1),
        (da = fn(l, t)),
        (_c = !1),
        (aa = ql = Mc = vu = It = P = 0),
        (Ml = Za = null),
        (_i = !1),
        (t & 8) !== 0 && (t |= t & 32));
      var a = l.entangledLanes;
      if (a !== 0)
        for (l = l.entanglements, a &= t; 0 < a; ) {
          var n = 31 - Yl(a),
            e = 1 << n;
          ((t |= l[n]), (a &= ~e));
        }
      return ((_t = t), Ge(), u);
    }
    function Jv(l, t) {
      ((p = null),
        (_.H = Ia),
        t === ma || t === Qe
          ? ((t = Z0()), (R = 3))
          : t === nc
            ? ((t = Z0()), (R = 4))
            : (R =
                t === Ec
                  ? 8
                  : t !== null &&
                      typeof t == "object" &&
                      typeof t.then == "function"
                    ? 6
                    : 1),
        (Nl = t),
        r === null && ((P = 1), ge(l, Kl(t, l.current))));
    }
    function wv() {
      var l = Ql.current;
      return l === null
        ? !0
        : (q & 4194048) === q
          ? wl === null
          : (q & 62914560) === q || (q & 536870912) !== 0
            ? l === wl
            : !1;
    }
    function Wv() {
      var l = _.H;
      return ((_.H = Ia), l === null ? Ia : l);
    }
    function $v() {
      var l = _.A;
      return ((_.A = Gs), l);
    }
    function Ae() {
      ((P = 4),
        Xt || ((q & 4194048) !== q && Ql.current !== null) || (da = !0),
        ((It & 134217727) === 0 && (vu & 134217727) === 0) ||
          x === null ||
          Qt(x, q, ql, !1));
    }
    function Xf(l, t, u) {
      var a = X;
      X |= 2;
      var n = Wv(),
        e = $v();
      ((x !== l || q !== t) && ((Te = null), ea(l, t)), (t = !1));
      var f = P;
      l: do
        try {
          if (R !== 0 && r !== null) {
            var i = r,
              c = Nl;
            switch (R) {
              case 8:
                (Dc(), (f = 6));
                break l;
              case 3:
              case 2:
              case 9:
              case 6:
                Ql.current === null && (t = !0);
                var m = R;
                if (((R = 0), (Nl = null), xu(l, i, c, m), u && da)) {
                  f = 0;
                  break l;
                }
                break;
              default:
                ((m = R), (R = 0), (Nl = null), xu(l, i, c, m));
            }
          }
          (Rs(), (f = P));
          break;
        } catch (o) {
          Jv(l, o);
        }
      while (!0);
      return (
        t && l.shellSuspendCounter++,
        (St = Eu = null),
        (X = a),
        (_.H = n),
        (_.A = e),
        r === null && ((x = null), (q = 0), Ge()),
        f
      );
    }
    function Rs() {
      for (; r !== null; ) Fv(r);
    }
    function js(l, t) {
      var u = X;
      X |= 2;
      var a = Wv(),
        n = $v();
      x !== l || q !== t
        ? ((Te = null), (Ee = Cl() + 500), ea(l, t))
        : (da = fn(l, t));
      l: do
        try {
          if (R !== 0 && r !== null) {
            t = r;
            var e = Nl;
            t: switch (R) {
              case 1:
                ((R = 0), (Nl = null), xu(l, t, e, 1));
                break;
              case 2:
              case 9:
                if (j0(e)) {
                  ((R = 0), (Nl = null), v1(t));
                  break;
                }
                ((t = function () {
                  ((R !== 2 && R !== 9) || x !== l || (R = 7), et(l));
                }),
                  e.then(t, t));
                break l;
              case 3:
                R = 7;
                break l;
              case 4:
                R = 5;
                break l;
              case 7:
                j0(e)
                  ? ((R = 0), (Nl = null), v1(t))
                  : ((R = 0), (Nl = null), xu(l, t, e, 7));
                break;
              case 5:
                var f = null;
                switch (r.tag) {
                  case 26:
                    f = r.memoizedState;
                  case 5:
                  case 27:
                    var i = r;
                    if (f ? Sm(f) : i.stateNode.complete) {
                      ((R = 0), (Nl = null));
                      var c = i.sibling;
                      if (c !== null) r = c;
                      else {
                        var m = i.return;
                        m !== null ? ((r = m), Ke(m)) : (r = null);
                      }
                      break t;
                    }
                }
                ((R = 0), (Nl = null), xu(l, t, e, 5));
                break;
              case 6:
                ((R = 0), (Nl = null), xu(l, t, e, 6));
                break;
              case 8:
                (Dc(), (P = 6));
                break l;
              default:
                throw Error(b(462));
            }
          }
          Zs();
          break;
        } catch (o) {
          Jv(l, o);
        }
      while (!0);
      return (
        (St = Eu = null),
        (_.H = a),
        (_.A = n),
        (X = u),
        r !== null ? 0 : ((x = null), (q = 0), Ge(), P)
      );
    }
    function Zs() {
      for (; r !== null && !vd(); ) Fv(r);
    }
    function Fv(l) {
      var t = Ov(l.alternate, l, _t);
      ((l.memoizedProps = l.pendingProps), t === null ? Ke(l) : (r = t));
    }
    function v1(l) {
      var t = l,
        u = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = a1(u, t, t.pendingProps, t.type, void 0, q);
          break;
        case 11:
          t = a1(u, t, t.pendingProps, t.type.render, t.ref, q);
          break;
        case 5:
          mc(t);
        default:
          (_v(u, t), (t = r = _y(t, _t)), (t = Ov(u, t, _t)));
      }
      ((l.memoizedProps = l.pendingProps), t === null ? Ke(l) : (r = t));
    }
    function xu(l, t, u, a) {
      ((St = Eu = null), mc(t), (Wu = null), (Fa = 0));
      var n = t.return;
      try {
        if (Ns(l, n, t, u, q)) {
          ((P = 1), ge(l, Kl(u, l.current)), (r = null));
          return;
        }
      } catch (e) {
        if (n !== null) throw ((r = n), e);
        ((P = 1), ge(l, Kl(u, l.current)), (r = null));
        return;
      }
      t.flags & 32768
        ? (B || a === 1
            ? (l = !0)
            : da || (q & 536870912) !== 0
              ? (l = !1)
              : ((Xt = l = !0),
                (a === 2 || a === 9 || a === 3 || a === 6) &&
                  ((a = Ql.current),
                  a !== null && a.tag === 13 && (a.flags |= 16384))),
          kv(t, l))
        : Ke(t);
    }
    function Ke(l) {
      var t = l;
      do {
        if ((t.flags & 32768) !== 0) {
          kv(t, Xt);
          return;
        }
        l = t.return;
        var u = qs(t.alternate, t, _t);
        if (u !== null) {
          r = u;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          r = t;
          return;
        }
        r = t = l;
      } while (t !== null);
      P === 0 && (P = 5);
    }
    function kv(l, t) {
      do {
        var u = Cs(l.alternate, l);
        if (u !== null) {
          ((u.flags &= 32767), (r = u));
          return;
        }
        if (
          ((u = l.return),
          u !== null &&
            ((u.flags |= 32768), (u.subtreeFlags = 0), (u.deletions = null)),
          !t && ((l = l.sibling), l !== null))
        ) {
          r = l;
          return;
        }
        r = l = u;
      } while (l !== null);
      ((P = 6), (r = null));
    }
    function m1(l, t, u, a, n, e, f, i, c) {
      l.cancelPendingCommit = null;
      do Je();
      while (fl !== 0);
      if ((X & 6) !== 0) throw Error(b(327));
      if (t !== null) {
        if (t === l.current) throw Error(b(177));
        if (
          ((e = t.lanes | t.childLanes),
          (e |= ki),
          Ed(l, u, e, f, i, c),
          l === x && ((r = x = null), (q = 0)),
          (na = t),
          (Kt = l),
          (zt = u),
          (Mi = e),
          (Di = n),
          (xv = a),
          (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
            ? ((l.callbackNode = null),
              (l.callbackPriority = 0),
              Ks(fe, function () {
                return (um(), null);
              }))
            : ((l.callbackNode = null), (l.callbackPriority = 0)),
          (a = (t.flags & 13878) !== 0),
          (t.subtreeFlags & 13878) !== 0 || a)
        ) {
          ((a = _.T), (_.T = null), (n = Q.p), (Q.p = 2), (f = X), (X |= 4));
          try {
            Bs(l, t, u);
          } finally {
            ((X = f), (Q.p = n), (_.T = a));
          }
        }
        ((fl = 1), Iv(), Pv(), lm());
      }
    }
    function Iv() {
      if (fl === 1) {
        fl = 0;
        var l = Kt,
          t = na,
          u = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || u) {
          ((u = _.T), (_.T = null));
          var a = Q.p;
          Q.p = 2;
          var n = X;
          X |= 4;
          try {
            Yv(t, l);
            var e = ri,
              f = Sy(l.containerInfo),
              i = e.focusedElem,
              c = e.selectionRange;
            if (
              f !== i &&
              i &&
              i.ownerDocument &&
              oy(i.ownerDocument.documentElement, i)
            ) {
              if (c !== null && Fi(i)) {
                var m = c.start,
                  o = c.end;
                if ((o === void 0 && (o = m), "selectionStart" in i))
                  ((i.selectionStart = m),
                    (i.selectionEnd = Math.min(o, i.value.length)));
                else {
                  var g = i.ownerDocument || document,
                    s = (g && g.defaultView) || window;
                  if (s.getSelection) {
                    var h = s.getSelection(),
                      E = i.textContent.length,
                      O = Math.min(c.start, E),
                      Y = c.end === void 0 ? O : Math.min(c.end, E);
                    !h.extend && O > Y && ((f = Y), (Y = O), (O = f));
                    var v = C0(i, O),
                      y = C0(i, Y);
                    if (
                      v &&
                      y &&
                      (h.rangeCount !== 1 ||
                        h.anchorNode !== v.node ||
                        h.anchorOffset !== v.offset ||
                        h.focusNode !== y.node ||
                        h.focusOffset !== y.offset)
                    ) {
                      var d = g.createRange();
                      (d.setStart(v.node, v.offset),
                        h.removeAllRanges(),
                        O > Y
                          ? (h.addRange(d), h.extend(y.node, y.offset))
                          : (d.setEnd(y.node, y.offset), h.addRange(d)));
                    }
                  }
                }
              }
              for (g = [], h = i; (h = h.parentNode); )
                h.nodeType === 1 &&
                  g.push({ element: h, left: h.scrollLeft, top: h.scrollTop });
              for (
                typeof i.focus == "function" && i.focus(), i = 0;
                i < g.length;
                i++
              ) {
                var S = g[i];
                ((S.element.scrollLeft = S.left),
                  (S.element.scrollTop = S.top));
              }
            }
            ((He = !!Hi), (ri = Hi = null));
          } finally {
            ((X = n), (Q.p = a), (_.T = u));
          }
        }
        ((l.current = t), (fl = 2));
      }
    }
    function Pv() {
      if (fl === 2) {
        fl = 0;
        var l = Kt,
          t = na,
          u = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || u) {
          ((u = _.T), (_.T = null));
          var a = Q.p;
          Q.p = 2;
          var n = X;
          X |= 4;
          try {
            Hv(l, t.alternate, t);
          } finally {
            ((X = n), (Q.p = a), (_.T = u));
          }
        }
        fl = 3;
      }
    }
    function lm() {
      if (fl === 4 || fl === 3) {
        ((fl = 0), md());
        var l = Kt,
          t = na,
          u = zt,
          a = xv;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? (fl = 5)
          : ((fl = 0), (na = Kt = null), tm(l, l.pendingLanes));
        var n = l.pendingLanes;
        if (
          (n === 0 && (Lt = null),
          xi(u),
          (t = t.stateNode),
          Bl && typeof Bl.onCommitFiberRoot == "function")
        )
          try {
            Bl.onCommitFiberRoot(
              en,
              t,
              void 0,
              (t.current.flags & 128) === 128,
            );
          } catch {}
        if (a !== null) {
          ((t = _.T), (n = Q.p), (Q.p = 2), (_.T = null));
          try {
            for (var e = l.onRecoverableError, f = 0; f < a.length; f++) {
              var i = a[f];
              e(i.value, { componentStack: i.stack });
            }
          } finally {
            ((_.T = t), (Q.p = n));
          }
        }
        ((zt & 3) !== 0 && Je(),
          et(l),
          (n = l.pendingLanes),
          (u & 261930) !== 0 && (n & 42) !== 0
            ? l === Ui
              ? Va++
              : ((Va = 0), (Ui = l))
            : (Va = 0),
          hn(0, !1));
      }
    }
    function tm(l, t) {
      (l.pooledCacheLanes &= t) === 0 &&
        ((t = l.pooledCache), t != null && ((l.pooledCache = null), mn(t)));
    }
    function Je() {
      return (Iv(), Pv(), lm(), um());
    }
    function um() {
      if (fl !== 5) return !1;
      var l = Kt,
        t = Mi;
      Mi = 0;
      var u = xi(zt),
        a = _.T,
        n = Q.p;
      try {
        ((Q.p = 32 > u ? 32 : u), (_.T = null), (u = Di), (Di = null));
        var e = Kt,
          f = zt;
        if (((fl = 0), (na = Kt = null), (zt = 0), (X & 6) !== 0))
          throw Error(b(331));
        var i = X;
        if (
          ((X |= 4),
          jv(e.current),
          Xv(e, e.current, f, u),
          (X = i),
          hn(0, !1),
          Bl && typeof Bl.onPostCommitFiberRoot == "function")
        )
          try {
            Bl.onPostCommitFiberRoot(en, e);
          } catch {}
        return !0;
      } finally {
        ((Q.p = n), (_.T = a), tm(l, t));
      }
    }
    function d1(l, t, u) {
      ((t = Kl(u, t)),
        (t = Ei(l.stateNode, t, 2)),
        (l = xt(l, t, 2)),
        l !== null && (cn(l, 2), et(l)));
    }
    function j(l, t, u) {
      if (l.tag === 3) d1(l, l, u);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            d1(t, l, u);
            break;
          } else if (t.tag === 1) {
            var a = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == "function" ||
              (typeof a.componentDidCatch == "function" &&
                (Lt === null || !Lt.has(a)))
            ) {
              ((l = Kl(u, l)),
                (u = gv(2)),
                (a = xt(t, u, 2)),
                a !== null && (bv(u, a, t, l), cn(a, 2), et(a)));
              break;
            }
          }
          t = t.return;
        }
    }
    function Qf(l, t, u) {
      var a = l.pingCache;
      if (a === null) {
        a = l.pingCache = new Xs();
        var n = new Set();
        a.set(t, n);
      } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
      n.has(u) ||
        ((_c = !0), n.add(u), (l = Vs.bind(null, l, t, u)), t.then(l, l));
    }
    function Vs(l, t, u) {
      var a = l.pingCache;
      (a !== null && a.delete(t),
        (l.pingedLanes |= l.suspendedLanes & u),
        (l.warmLanes &= ~u),
        x === l &&
          (q & u) === u &&
          (P === 4 || (P === 3 && (q & 62914560) === q && 300 > Cl() - xe)
            ? (X & 2) === 0 && ea(l, 0)
            : (Mc |= u),
          aa === q && (aa = 0)),
        et(l));
    }
    function am(l, t) {
      (t === 0 && (t = W1()), (l = zu(l, t)), l !== null && (cn(l, t), et(l)));
    }
    function xs(l) {
      var t = l.memoizedState,
        u = 0;
      (t !== null && (u = t.retryLane), am(l, u));
    }
    function Ls(l, t) {
      var u = 0;
      switch (l.tag) {
        case 31:
        case 13:
          var a = l.stateNode,
            n = l.memoizedState;
          n !== null && (u = n.retryLane);
          break;
        case 19:
          a = l.stateNode;
          break;
        case 22:
          a = l.stateNode._retryCache;
          break;
        default:
          throw Error(b(314));
      }
      (a !== null && a.delete(t), am(l, u));
    }
    function Ks(l, t) {
      return Zi(l, t);
    }
    var Oe = null,
      ru = null,
      pi = !1,
      _e = !1,
      Rf = !1,
      Rt = 0;
    function et(l) {
      (l !== ru &&
        l.next === null &&
        (ru === null ? (Oe = ru = l) : (ru = ru.next = l)),
        (_e = !0),
        pi || ((pi = !0), ws()));
    }
    function hn(l, t) {
      if (!Rf && _e) {
        Rf = !0;
        do
          for (var u = !1, a = Oe; a !== null; ) {
            if (!t)
              if (l !== 0) {
                var n = a.pendingLanes;
                if (n === 0) var e = 0;
                else {
                  var f = a.suspendedLanes,
                    i = a.pingedLanes;
                  ((e = (1 << (31 - Yl(42 | l) + 1)) - 1),
                    (e &= n & ~(f & ~i)),
                    (e = e & 201326741 ? (e & 201326741) | 1 : e ? e | 2 : 0));
                }
                e !== 0 && ((u = !0), s1(a, e));
              } else
                ((e = q),
                  (e = qe(
                    a,
                    a === x ? e : 0,
                    a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
                  )),
                  (e & 3) === 0 || fn(a, e) || ((u = !0), s1(a, e)));
            a = a.next;
          }
        while (u);
        Rf = !1;
      }
    }
    function Js() {
      nm();
    }
    function nm() {
      _e = pi = !1;
      var l = 0;
      Rt !== 0 && th() && (l = Rt);
      for (var t = Cl(), u = null, a = Oe; a !== null; ) {
        var n = a.next,
          e = em(a, t);
        (e === 0
          ? ((a.next = null),
            u === null ? (Oe = n) : (u.next = n),
            n === null && (ru = u))
          : ((u = a), (l !== 0 || (e & 3) !== 0) && (_e = !0)),
          (a = n));
      }
      ((fl !== 0 && fl !== 5) || hn(l, !1), Rt !== 0 && (Rt = 0));
    }
    function em(l, t) {
      for (
        var u = l.suspendedLanes,
          a = l.pingedLanes,
          n = l.expirationTimes,
          e = l.pendingLanes & -62914561;
        0 < e;
      ) {
        var f = 31 - Yl(e),
          i = 1 << f,
          c = n[f];
        (c === -1
          ? ((i & u) === 0 || (i & a) !== 0) && (n[f] = zd(i, t))
          : c <= t && (l.expiredLanes |= i),
          (e &= ~i));
      }
      if (
        ((t = x),
        (u = q),
        (u = qe(
          l,
          l === t ? u : 0,
          l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
        )),
        (a = l.callbackNode),
        u === 0 ||
          (l === t && (R === 2 || R === 9)) ||
          l.cancelPendingCommit !== null)
      )
        return (
          a !== null && a !== null && hf(a),
          (l.callbackNode = null),
          (l.callbackPriority = 0)
        );
      if ((u & 3) === 0 || fn(l, u)) {
        if (((t = u & -u), t === l.callbackPriority)) return t;
        switch ((a !== null && hf(a), xi(u))) {
          case 2:
          case 8:
            u = J1;
            break;
          case 32:
            u = fe;
            break;
          case 268435456:
            u = w1;
            break;
          default:
            u = fe;
        }
        return (
          (a = fm.bind(null, l)),
          (u = Zi(u, a)),
          (l.callbackPriority = t),
          (l.callbackNode = u),
          t
        );
      }
      return (
        a !== null && a !== null && hf(a),
        (l.callbackPriority = 2),
        (l.callbackNode = null),
        2
      );
    }
    function fm(l, t) {
      if (fl !== 0 && fl !== 5)
        return ((l.callbackNode = null), (l.callbackPriority = 0), null);
      var u = l.callbackNode;
      if (Je() && l.callbackNode !== u) return null;
      var a = q;
      return (
        (a = qe(
          l,
          l === x ? a : 0,
          l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
        )),
        a === 0
          ? null
          : (Kv(l, a, t),
            em(l, Cl()),
            l.callbackNode != null && l.callbackNode === u
              ? fm.bind(null, l)
              : null)
      );
    }
    function s1(l, t) {
      if (Je()) return null;
      Kv(l, t, !0);
    }
    function ws() {
      ah(function () {
        (X & 6) !== 0 ? Zi(K1, Js) : nm();
      });
    }
    function Uc() {
      if (Rt === 0) {
        var l = la;
        (l === 0 && ((l = Mn), (Mn <<= 1), (Mn & 261888) === 0 && (Mn = 256)),
          (Rt = l));
      }
      return Rt;
    }
    function h1(l) {
      return l == null || typeof l == "symbol" || typeof l == "boolean"
        ? null
        : typeof l == "function"
          ? l
          : xn("" + l);
    }
    function o1(l, t) {
      var u = t.ownerDocument.createElement("input");
      return (
        (u.name = t.name),
        (u.value = t.value),
        l.id && u.setAttribute("form", l.id),
        t.parentNode.insertBefore(u, t),
        (l = new FormData(l)),
        u.parentNode.removeChild(u),
        l
      );
    }
    function Ws(l, t, u, a, n) {
      if (t === "submit" && u && u.stateNode === n) {
        var e = h1((n[Ul] || null).action),
          f = a.submitter;
        f &&
          ((t = (t = f[Ul] || null)
            ? h1(t.formAction)
            : f.getAttribute("formAction")),
          t !== null && ((e = t), (f = null)));
        var i = new Ce("action", "action", null, a, n);
        l.push({
          event: i,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (a.defaultPrevented) {
                  if (Rt !== 0) {
                    var c = f ? o1(n, f) : new FormData(n);
                    bi(
                      u,
                      { pending: !0, data: c, method: n.method, action: e },
                      null,
                      c,
                    );
                  }
                } else
                  typeof e == "function" &&
                    (i.preventDefault(),
                    (c = f ? o1(n, f) : new FormData(n)),
                    bi(
                      u,
                      { pending: !0, data: c, method: n.method, action: e },
                      e,
                      c,
                    ));
              },
              currentTarget: n,
            },
          ],
        });
      }
    }
    for (Xn = 0; Xn < fi.length; Xn++)
      ((Qn = fi[Xn]),
        (S1 = Qn.toLowerCase()),
        (g1 = Qn[0].toUpperCase() + Qn.slice(1)),
        Il(S1, "on" + g1));
    var Qn, S1, g1, Xn;
    Il(by, "onAnimationEnd");
    Il(zy, "onAnimationIteration");
    Il(Ey, "onAnimationStart");
    Il("dblclick", "onDoubleClick");
    Il("focusin", "onFocus");
    Il("focusout", "onBlur");
    Il(ds, "onTransitionRun");
    Il(ss, "onTransitionStart");
    Il(hs, "onTransitionCancel");
    Il(Ty, "onTransitionEnd");
    Iu("onMouseEnter", ["mouseout", "mouseover"]);
    Iu("onMouseLeave", ["mouseout", "mouseover"]);
    Iu("onPointerEnter", ["pointerout", "pointerover"]);
    Iu("onPointerLeave", ["pointerout", "pointerover"]);
    Su(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    );
    Su(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    );
    Su("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    Su(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    );
    Su(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    );
    Su(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
    var Pa =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " ",
        ),
      $s = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle"
          .split(" ")
          .concat(Pa),
      );
    function im(l, t) {
      t = (t & 4) !== 0;
      for (var u = 0; u < l.length; u++) {
        var a = l[u],
          n = a.event;
        a = a.listeners;
        l: {
          var e = void 0;
          if (t)
            for (var f = a.length - 1; 0 <= f; f--) {
              var i = a[f],
                c = i.instance,
                m = i.currentTarget;
              if (((i = i.listener), c !== e && n.isPropagationStopped()))
                break l;
              ((e = i), (n.currentTarget = m));
              try {
                e(n);
              } catch (o) {
                ce(o);
              }
              ((n.currentTarget = null), (e = c));
            }
          else
            for (f = 0; f < a.length; f++) {
              if (
                ((i = a[f]),
                (c = i.instance),
                (m = i.currentTarget),
                (i = i.listener),
                c !== e && n.isPropagationStopped())
              )
                break l;
              ((e = i), (n.currentTarget = m));
              try {
                e(n);
              } catch (o) {
                ce(o);
              }
              ((n.currentTarget = null), (e = c));
            }
        }
      }
    }
    function H(l, t) {
      var u = t[If];
      u === void 0 && (u = t[If] = new Set());
      var a = l + "__bubble";
      u.has(a) || (cm(t, l, 2, !1), u.add(a));
    }
    function jf(l, t, u) {
      var a = 0;
      (t && (a |= 4), cm(u, l, a, t));
    }
    var Rn = "_reactListening" + Math.random().toString(36).slice(2);
    function pc(l) {
      if (!l[Rn]) {
        ((l[Rn] = !0),
          P1.forEach(function (u) {
            u !== "selectionchange" &&
              ($s.has(u) || jf(u, !1, l), jf(u, !0, l));
          }));
        var t = l.nodeType === 9 ? l : l.ownerDocument;
        t === null || t[Rn] || ((t[Rn] = !0), jf("selectionchange", !1, t));
      }
    }
    function cm(l, t, u, a) {
      switch (Tm(t)) {
        case 2:
          var n = Oh;
          break;
        case 8:
          n = _h;
          break;
        default:
          n = qc;
      }
      ((u = n.bind(null, t, u, l)),
        (n = void 0),
        !ai ||
          (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
          (n = !0),
        a
          ? n !== void 0
            ? l.addEventListener(t, u, { capture: !0, passive: n })
            : l.addEventListener(t, u, !0)
          : n !== void 0
            ? l.addEventListener(t, u, { passive: n })
            : l.addEventListener(t, u, !1));
    }
    function Zf(l, t, u, a, n) {
      var e = a;
      if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
        l: for (;;) {
          if (a === null) return;
          var f = a.tag;
          if (f === 3 || f === 4) {
            var i = a.stateNode.containerInfo;
            if (i === n) break;
            if (f === 4)
              for (f = a.return; f !== null; ) {
                var c = f.tag;
                if ((c === 3 || c === 4) && f.stateNode.containerInfo === n)
                  return;
                f = f.return;
              }
            for (; i !== null; ) {
              if (((f = Bu(i)), f === null)) return;
              if (((c = f.tag), c === 5 || c === 6 || c === 26 || c === 27)) {
                a = e = f;
                continue l;
              }
              i = i.parentNode;
            }
          }
          a = a.return;
        }
      iy(function () {
        var m = e,
          o = Ji(u),
          g = [];
        l: {
          var s = Ay.get(l);
          if (s !== void 0) {
            var h = Ce,
              E = l;
            switch (l) {
              case "keypress":
                if (Kn(u) === 0) break l;
              case "keydown":
              case "keyup":
                h = Ld;
                break;
              case "focusin":
                ((E = "focus"), (h = zf));
                break;
              case "focusout":
                ((E = "blur"), (h = zf));
                break;
              case "beforeblur":
              case "afterblur":
                h = zf;
                break;
              case "click":
                if (u.button === 2) break l;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                h = _0;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                h = qd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                h = wd;
                break;
              case by:
              case zy:
              case Ey:
                h = Yd;
                break;
              case Ty:
                h = $d;
                break;
              case "scroll":
              case "scrollend":
                h = Hd;
                break;
              case "wheel":
                h = kd;
                break;
              case "copy":
              case "cut":
              case "paste":
                h = Xd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                h = D0;
                break;
              case "toggle":
              case "beforetoggle":
                h = Pd;
            }
            var O = (t & 4) !== 0,
              Y = !O && (l === "scroll" || l === "scrollend"),
              v = O ? (s !== null ? s + "Capture" : null) : s;
            O = [];
            for (var y = m, d; y !== null; ) {
              var S = y;
              if (
                ((d = S.stateNode),
                (S = S.tag),
                (S !== 5 && S !== 26 && S !== 27) ||
                  d === null ||
                  v === null ||
                  ((S = Ka(y, v)), S != null && O.push(ln(y, S, d))),
                Y)
              )
                break;
              y = y.return;
            }
            0 < O.length &&
              ((s = new h(s, E, null, u, o)),
              g.push({ event: s, listeners: O }));
          }
        }
        if ((t & 7) === 0) {
          l: {
            if (
              ((s = l === "mouseover" || l === "pointerover"),
              (h = l === "mouseout" || l === "pointerout"),
              s &&
                u !== ui &&
                (E = u.relatedTarget || u.fromElement) &&
                (Bu(E) || E[ca]))
            )
              break l;
            if (
              (h || s) &&
              ((s =
                o.window === o
                  ? o
                  : (s = o.ownerDocument)
                    ? s.defaultView || s.parentWindow
                    : window),
              h
                ? ((E = u.relatedTarget || u.toElement),
                  (h = m),
                  (E = E ? Bu(E) : null),
                  E !== null &&
                    ((Y = nn(E)),
                    (O = E.tag),
                    E !== Y || (O !== 5 && O !== 27 && O !== 6)) &&
                    (E = null))
                : ((h = null), (E = m)),
              h !== E)
            ) {
              if (
                ((O = _0),
                (S = "onMouseLeave"),
                (v = "onMouseEnter"),
                (y = "mouse"),
                (l === "pointerout" || l === "pointerover") &&
                  ((O = D0),
                  (S = "onPointerLeave"),
                  (v = "onPointerEnter"),
                  (y = "pointer")),
                (Y = h == null ? s : pa(h)),
                (d = E == null ? s : pa(E)),
                (s = new O(S, y + "leave", h, u, o)),
                (s.target = Y),
                (s.relatedTarget = d),
                (S = null),
                Bu(o) === m &&
                  ((O = new O(v, y + "enter", E, u, o)),
                  (O.target = d),
                  (O.relatedTarget = Y),
                  (S = O)),
                (Y = S),
                h && E)
              )
                t: {
                  for (O = Fs, v = h, y = E, d = 0, S = v; S; S = O(S)) d++;
                  S = 0;
                  for (var A = y; A; A = O(A)) S++;
                  for (; 0 < d - S; ) ((v = O(v)), d--);
                  for (; 0 < S - d; ) ((y = O(y)), S--);
                  for (; d--; ) {
                    if (v === y || (y !== null && v === y.alternate)) {
                      O = v;
                      break t;
                    }
                    ((v = O(v)), (y = O(y)));
                  }
                  O = null;
                }
              else O = null;
              (h !== null && b1(g, s, h, O, !1),
                E !== null && Y !== null && b1(g, Y, E, O, !0));
            }
          }
          l: {
            if (
              ((s = m ? pa(m) : window),
              (h = s.nodeName && s.nodeName.toLowerCase()),
              h === "select" || (h === "input" && s.type === "file"))
            )
              var C = H0;
            else if (N0(s))
              if (sy) C = ys;
              else {
                C = is;
                var T = fs;
              }
            else
              ((h = s.nodeName),
                !h ||
                h.toLowerCase() !== "input" ||
                (s.type !== "checkbox" && s.type !== "radio")
                  ? m && Ki(m.elementType) && (C = H0)
                  : (C = cs));
            if (C && (C = C(l, m))) {
              dy(g, C, u, o);
              break l;
            }
            (T && T(l, s, m),
              l === "focusout" &&
                m &&
                s.type === "number" &&
                m.memoizedProps.value != null &&
                ti(s, "number", s.value));
          }
          switch (((T = m ? pa(m) : window), l)) {
            case "focusin":
              (N0(T) || T.contentEditable === "true") &&
                ((Xu = T), (ni = m), (Ca = null));
              break;
            case "focusout":
              Ca = ni = Xu = null;
              break;
            case "mousedown":
              ei = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              ((ei = !1), B0(g, u, o));
              break;
            case "selectionchange":
              if (ms) break;
            case "keydown":
            case "keyup":
              B0(g, u, o);
          }
          var D;
          if ($i)
            l: {
              switch (l) {
                case "compositionstart":
                  var N = "onCompositionStart";
                  break l;
                case "compositionend":
                  N = "onCompositionEnd";
                  break l;
                case "compositionupdate":
                  N = "onCompositionUpdate";
                  break l;
              }
              N = void 0;
            }
          else
            Gu
              ? vy(l, u) && (N = "onCompositionEnd")
              : l === "keydown" &&
                u.keyCode === 229 &&
                (N = "onCompositionStart");
          (N &&
            (yy &&
              u.locale !== "ko" &&
              (Gu || N !== "onCompositionStart"
                ? N === "onCompositionEnd" && Gu && (D = cy())
                : ((Gt = o),
                  (wi = "value" in Gt ? Gt.value : Gt.textContent),
                  (Gu = !0))),
            (T = Me(m, N)),
            0 < T.length &&
              ((N = new M0(N, l, null, u, o)),
              g.push({ event: N, listeners: T }),
              D ? (N.data = D) : ((D = my(u)), D !== null && (N.data = D)))),
            (D = ts ? us(l, u) : as(l, u)) &&
              ((N = Me(m, "onBeforeInput")),
              0 < N.length &&
                ((T = new M0("onBeforeInput", "beforeinput", null, u, o)),
                g.push({ event: T, listeners: N }),
                (T.data = D))),
            Ws(g, l, m, u, o));
        }
        im(g, t);
      });
    }
    function ln(l, t, u) {
      return { instance: l, listener: t, currentTarget: u };
    }
    function Me(l, t) {
      for (var u = t + "Capture", a = []; l !== null; ) {
        var n = l,
          e = n.stateNode;
        if (
          ((n = n.tag),
          (n !== 5 && n !== 26 && n !== 27) ||
            e === null ||
            ((n = Ka(l, u)),
            n != null && a.unshift(ln(l, n, e)),
            (n = Ka(l, t)),
            n != null && a.push(ln(l, n, e))),
          l.tag === 3)
        )
          return a;
        l = l.return;
      }
      return [];
    }
    function Fs(l) {
      if (l === null) return null;
      do l = l.return;
      while (l && l.tag !== 5 && l.tag !== 27);
      return l || null;
    }
    function b1(l, t, u, a, n) {
      for (var e = t._reactName, f = []; u !== null && u !== a; ) {
        var i = u,
          c = i.alternate,
          m = i.stateNode;
        if (((i = i.tag), c !== null && c === a)) break;
        ((i !== 5 && i !== 26 && i !== 27) ||
          m === null ||
          ((c = m),
          n
            ? ((m = Ka(u, e)), m != null && f.unshift(ln(u, m, c)))
            : n || ((m = Ka(u, e)), m != null && f.push(ln(u, m, c)))),
          (u = u.return));
      }
      f.length !== 0 && l.push({ event: t, listeners: f });
    }
    var ks = /\r\n?/g,
      Is = /\u0000|\uFFFD/g;
    function z1(l) {
      return (typeof l == "string" ? l : "" + l)
        .replace(
          ks,
          `
`,
        )
        .replace(Is, "");
    }
    function ym(l, t) {
      return ((t = z1(t)), z1(l) === t);
    }
    function Z(l, t, u, a, n, e) {
      switch (u) {
        case "children":
          typeof a == "string"
            ? t === "body" || (t === "textarea" && a === "") || Pu(l, a)
            : (typeof a == "number" || typeof a == "bigint") &&
              t !== "body" &&
              Pu(l, "" + a);
          break;
        case "className":
          pn(l, "class", a);
          break;
        case "tabIndex":
          pn(l, "tabindex", a);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          pn(l, u, a);
          break;
        case "style":
          fy(l, a, e);
          break;
        case "data":
          if (t !== "object") {
            pn(l, "data", a);
            break;
          }
        case "src":
        case "href":
          if (a === "" && (t !== "a" || u !== "href")) {
            l.removeAttribute(u);
            break;
          }
          if (
            a == null ||
            typeof a == "function" ||
            typeof a == "symbol" ||
            typeof a == "boolean"
          ) {
            l.removeAttribute(u);
            break;
          }
          ((a = xn("" + a)), l.setAttribute(u, a));
          break;
        case "action":
        case "formAction":
          if (typeof a == "function") {
            l.setAttribute(
              u,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
            );
            break;
          } else
            typeof e == "function" &&
              (u === "formAction"
                ? (t !== "input" && Z(l, t, "name", n.name, n, null),
                  Z(l, t, "formEncType", n.formEncType, n, null),
                  Z(l, t, "formMethod", n.formMethod, n, null),
                  Z(l, t, "formTarget", n.formTarget, n, null))
                : (Z(l, t, "encType", n.encType, n, null),
                  Z(l, t, "method", n.method, n, null),
                  Z(l, t, "target", n.target, n, null)));
          if (a == null || typeof a == "symbol" || typeof a == "boolean") {
            l.removeAttribute(u);
            break;
          }
          ((a = xn("" + a)), l.setAttribute(u, a));
          break;
        case "onClick":
          a != null && (l.onclick = ot);
          break;
        case "onScroll":
          a != null && H("scroll", l);
          break;
        case "onScrollEnd":
          a != null && H("scrollend", l);
          break;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a)) throw Error(b(61));
            if (((u = a.__html), u != null)) {
              if (n.children != null) throw Error(b(60));
              l.innerHTML = u;
            }
          }
          break;
        case "multiple":
          l.multiple = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "muted":
          l.muted = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (
            a == null ||
            typeof a == "function" ||
            typeof a == "boolean" ||
            typeof a == "symbol"
          ) {
            l.removeAttribute("xlink:href");
            break;
          }
          ((u = xn("" + a)),
            l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", u));
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          a != null && typeof a != "function" && typeof a != "symbol"
            ? l.setAttribute(u, "" + a)
            : l.removeAttribute(u);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          a && typeof a != "function" && typeof a != "symbol"
            ? l.setAttribute(u, "")
            : l.removeAttribute(u);
          break;
        case "capture":
        case "download":
          a === !0
            ? l.setAttribute(u, "")
            : a !== !1 &&
                a != null &&
                typeof a != "function" &&
                typeof a != "symbol"
              ? l.setAttribute(u, a)
              : l.removeAttribute(u);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          a != null &&
          typeof a != "function" &&
          typeof a != "symbol" &&
          !isNaN(a) &&
          1 <= a
            ? l.setAttribute(u, a)
            : l.removeAttribute(u);
          break;
        case "rowSpan":
        case "start":
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          isNaN(a)
            ? l.removeAttribute(u)
            : l.setAttribute(u, a);
          break;
        case "popover":
          (H("beforetoggle", l), H("toggle", l), Vn(l, "popover", a));
          break;
        case "xlinkActuate":
          it(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
          break;
        case "xlinkArcrole":
          it(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
          break;
        case "xlinkRole":
          it(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
          break;
        case "xlinkShow":
          it(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
          break;
        case "xlinkTitle":
          it(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
          break;
        case "xlinkType":
          it(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
          break;
        case "xmlBase":
          it(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
          break;
        case "xmlLang":
          it(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
          break;
        case "xmlSpace":
          it(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
          break;
        case "is":
          Vn(l, "is", a);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < u.length) ||
            (u[0] !== "o" && u[0] !== "O") ||
            (u[1] !== "n" && u[1] !== "N")) &&
            ((u = pd.get(u) || u), Vn(l, u, a));
      }
    }
    function Ni(l, t, u, a, n, e) {
      switch (u) {
        case "style":
          fy(l, a, e);
          break;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a)) throw Error(b(61));
            if (((u = a.__html), u != null)) {
              if (n.children != null) throw Error(b(60));
              l.innerHTML = u;
            }
          }
          break;
        case "children":
          typeof a == "string"
            ? Pu(l, a)
            : (typeof a == "number" || typeof a == "bigint") && Pu(l, "" + a);
          break;
        case "onScroll":
          a != null && H("scroll", l);
          break;
        case "onScrollEnd":
          a != null && H("scrollend", l);
          break;
        case "onClick":
          a != null && (l.onclick = ot);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!ly.hasOwnProperty(u))
            l: {
              if (
                u[0] === "o" &&
                u[1] === "n" &&
                ((n = u.endsWith("Capture")),
                (t = u.slice(2, n ? u.length - 7 : void 0)),
                (e = l[Ul] || null),
                (e = e != null ? e[u] : null),
                typeof e == "function" && l.removeEventListener(t, e, n),
                typeof a == "function")
              ) {
                (typeof e != "function" &&
                  e !== null &&
                  (u in l
                    ? (l[u] = null)
                    : l.hasAttribute(u) && l.removeAttribute(u)),
                  l.addEventListener(t, a, n));
                break l;
              }
              u in l
                ? (l[u] = a)
                : a === !0
                  ? l.setAttribute(u, "")
                  : Vn(l, u, a);
            }
      }
    }
    function ol(l, t, u) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          (H("error", l), H("load", l));
          var a = !1,
            n = !1,
            e;
          for (e in u)
            if (u.hasOwnProperty(e)) {
              var f = u[e];
              if (f != null)
                switch (e) {
                  case "src":
                    a = !0;
                    break;
                  case "srcSet":
                    n = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(b(137, t));
                  default:
                    Z(l, t, e, f, u, null);
                }
            }
          (n && Z(l, t, "srcSet", u.srcSet, u, null),
            a && Z(l, t, "src", u.src, u, null));
          return;
        case "input":
          H("invalid", l);
          var i = (e = f = n = null),
            c = null,
            m = null;
          for (a in u)
            if (u.hasOwnProperty(a)) {
              var o = u[a];
              if (o != null)
                switch (a) {
                  case "name":
                    n = o;
                    break;
                  case "type":
                    f = o;
                    break;
                  case "checked":
                    c = o;
                    break;
                  case "defaultChecked":
                    m = o;
                    break;
                  case "value":
                    e = o;
                    break;
                  case "defaultValue":
                    i = o;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (o != null) throw Error(b(137, t));
                    break;
                  default:
                    Z(l, t, a, o, u, null);
                }
            }
          ay(l, e, i, c, m, f, n, !1);
          return;
        case "select":
          (H("invalid", l), (a = f = e = null));
          for (n in u)
            if (u.hasOwnProperty(n) && ((i = u[n]), i != null))
              switch (n) {
                case "value":
                  e = i;
                  break;
                case "defaultValue":
                  f = i;
                  break;
                case "multiple":
                  a = i;
                default:
                  Z(l, t, n, i, u, null);
              }
          ((t = e),
            (u = f),
            (l.multiple = !!a),
            t != null ? Ku(l, !!a, t, !1) : u != null && Ku(l, !!a, u, !0));
          return;
        case "textarea":
          (H("invalid", l), (e = n = a = null));
          for (f in u)
            if (u.hasOwnProperty(f) && ((i = u[f]), i != null))
              switch (f) {
                case "value":
                  a = i;
                  break;
                case "defaultValue":
                  n = i;
                  break;
                case "children":
                  e = i;
                  break;
                case "dangerouslySetInnerHTML":
                  if (i != null) throw Error(b(91));
                  break;
                default:
                  Z(l, t, f, i, u, null);
              }
          ey(l, a, n, e);
          return;
        case "option":
          for (c in u)
            u.hasOwnProperty(c) &&
              ((a = u[c]), a != null) &&
              (c === "selected"
                ? (l.selected =
                    a && typeof a != "function" && typeof a != "symbol")
                : Z(l, t, c, a, u, null));
          return;
        case "dialog":
          (H("beforetoggle", l), H("toggle", l), H("cancel", l), H("close", l));
          break;
        case "iframe":
        case "object":
          H("load", l);
          break;
        case "video":
        case "audio":
          for (a = 0; a < Pa.length; a++) H(Pa[a], l);
          break;
        case "image":
          (H("error", l), H("load", l));
          break;
        case "details":
          H("toggle", l);
          break;
        case "embed":
        case "source":
        case "link":
          (H("error", l), H("load", l));
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (m in u)
            if (u.hasOwnProperty(m) && ((a = u[m]), a != null))
              switch (m) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(b(137, t));
                default:
                  Z(l, t, m, a, u, null);
              }
          return;
        default:
          if (Ki(t)) {
            for (o in u)
              u.hasOwnProperty(o) &&
                ((a = u[o]), a !== void 0 && Ni(l, t, o, a, u, void 0));
            return;
          }
      }
      for (i in u)
        u.hasOwnProperty(i) &&
          ((a = u[i]), a != null && Z(l, t, i, a, u, null));
    }
    function Ps(l, t, u, a) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var n = null,
            e = null,
            f = null,
            i = null,
            c = null,
            m = null,
            o = null;
          for (h in u) {
            var g = u[h];
            if (u.hasOwnProperty(h) && g != null)
              switch (h) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  c = g;
                default:
                  a.hasOwnProperty(h) || Z(l, t, h, null, a, g);
              }
          }
          for (var s in a) {
            var h = a[s];
            if (((g = u[s]), a.hasOwnProperty(s) && (h != null || g != null)))
              switch (s) {
                case "type":
                  e = h;
                  break;
                case "name":
                  n = h;
                  break;
                case "checked":
                  m = h;
                  break;
                case "defaultChecked":
                  o = h;
                  break;
                case "value":
                  f = h;
                  break;
                case "defaultValue":
                  i = h;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (h != null) throw Error(b(137, t));
                  break;
                default:
                  h !== g && Z(l, t, s, h, a, g);
              }
          }
          li(l, f, i, c, m, o, e, n);
          return;
        case "select":
          h = f = i = s = null;
          for (e in u)
            if (((c = u[e]), u.hasOwnProperty(e) && c != null))
              switch (e) {
                case "value":
                  break;
                case "multiple":
                  h = c;
                default:
                  a.hasOwnProperty(e) || Z(l, t, e, null, a, c);
              }
          for (n in a)
            if (
              ((e = a[n]),
              (c = u[n]),
              a.hasOwnProperty(n) && (e != null || c != null))
            )
              switch (n) {
                case "value":
                  s = e;
                  break;
                case "defaultValue":
                  i = e;
                  break;
                case "multiple":
                  f = e;
                default:
                  e !== c && Z(l, t, n, e, a, c);
              }
          ((t = i),
            (u = f),
            (a = h),
            s != null
              ? Ku(l, !!u, s, !1)
              : !!a != !!u &&
                (t != null ? Ku(l, !!u, t, !0) : Ku(l, !!u, u ? [] : "", !1)));
          return;
        case "textarea":
          h = s = null;
          for (i in u)
            if (
              ((n = u[i]),
              u.hasOwnProperty(i) && n != null && !a.hasOwnProperty(i))
            )
              switch (i) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  Z(l, t, i, null, a, n);
              }
          for (f in a)
            if (
              ((n = a[f]),
              (e = u[f]),
              a.hasOwnProperty(f) && (n != null || e != null))
            )
              switch (f) {
                case "value":
                  s = n;
                  break;
                case "defaultValue":
                  h = n;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (n != null) throw Error(b(91));
                  break;
                default:
                  n !== e && Z(l, t, f, n, a, e);
              }
          ny(l, s, h);
          return;
        case "option":
          for (var E in u)
            ((s = u[E]),
              u.hasOwnProperty(E) &&
                s != null &&
                !a.hasOwnProperty(E) &&
                (E === "selected"
                  ? (l.selected = !1)
                  : Z(l, t, E, null, a, s)));
          for (c in a)
            ((s = a[c]),
              (h = u[c]),
              a.hasOwnProperty(c) &&
                s !== h &&
                (s != null || h != null) &&
                (c === "selected"
                  ? (l.selected =
                      s && typeof s != "function" && typeof s != "symbol")
                  : Z(l, t, c, s, a, h)));
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var O in u)
            ((s = u[O]),
              u.hasOwnProperty(O) &&
                s != null &&
                !a.hasOwnProperty(O) &&
                Z(l, t, O, null, a, s));
          for (m in a)
            if (
              ((s = a[m]),
              (h = u[m]),
              a.hasOwnProperty(m) && s !== h && (s != null || h != null))
            )
              switch (m) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (s != null) throw Error(b(137, t));
                  break;
                default:
                  Z(l, t, m, s, a, h);
              }
          return;
        default:
          if (Ki(t)) {
            for (var Y in u)
              ((s = u[Y]),
                u.hasOwnProperty(Y) &&
                  s !== void 0 &&
                  !a.hasOwnProperty(Y) &&
                  Ni(l, t, Y, void 0, a, s));
            for (o in a)
              ((s = a[o]),
                (h = u[o]),
                !a.hasOwnProperty(o) ||
                  s === h ||
                  (s === void 0 && h === void 0) ||
                  Ni(l, t, o, s, a, h));
            return;
          }
      }
      for (var v in u)
        ((s = u[v]),
          u.hasOwnProperty(v) &&
            s != null &&
            !a.hasOwnProperty(v) &&
            Z(l, t, v, null, a, s));
      for (g in a)
        ((s = a[g]),
          (h = u[g]),
          !a.hasOwnProperty(g) ||
            s === h ||
            (s == null && h == null) ||
            Z(l, t, g, s, a, h));
    }
    function E1(l) {
      switch (l) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return !0;
        default:
          return !1;
      }
    }
    function lh() {
      if (typeof performance.getEntriesByType == "function") {
        for (
          var l = 0, t = 0, u = performance.getEntriesByType("resource"), a = 0;
          a < u.length;
          a++
        ) {
          var n = u[a],
            e = n.transferSize,
            f = n.initiatorType,
            i = n.duration;
          if (e && i && E1(f)) {
            for (f = 0, i = n.responseEnd, a += 1; a < u.length; a++) {
              var c = u[a],
                m = c.startTime;
              if (m > i) break;
              var o = c.transferSize,
                g = c.initiatorType;
              o &&
                E1(g) &&
                ((c = c.responseEnd),
                (f += o * (c < i ? 1 : (i - m) / (c - m))));
            }
            if ((--a, (t += (8 * (e + f)) / (n.duration / 1e3)), l++, 10 < l))
              break;
          }
        }
        if (0 < l) return t / l / 1e6;
      }
      return navigator.connection &&
        ((l = navigator.connection.downlink), typeof l == "number")
        ? l
        : 5;
    }
    var Hi = null,
      ri = null;
    function De(l) {
      return l.nodeType === 9 ? l : l.ownerDocument;
    }
    function T1(l) {
      switch (l) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function vm(l, t) {
      if (l === 0)
        switch (t) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return l === 1 && t === "foreignObject" ? 0 : l;
    }
    function qi(l, t) {
      return (
        l === "textarea" ||
        l === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        typeof t.children == "bigint" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Vf = null;
    function th() {
      var l = window.event;
      return l && l.type === "popstate"
        ? l === Vf
          ? !1
          : ((Vf = l), !0)
        : ((Vf = null), !1);
    }
    var mm = typeof setTimeout == "function" ? setTimeout : void 0,
      uh = typeof clearTimeout == "function" ? clearTimeout : void 0,
      A1 = typeof Promise == "function" ? Promise : void 0,
      ah =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof A1 < "u"
            ? function (l) {
                return A1.resolve(null).then(l).catch(nh);
              }
            : mm;
    function nh(l) {
      setTimeout(function () {
        throw l;
      });
    }
    function lu(l) {
      return l === "head";
    }
    function O1(l, t) {
      var u = t,
        a = 0;
      do {
        var n = u.nextSibling;
        if ((l.removeChild(u), n && n.nodeType === 8))
          if (((u = n.data), u === "/$" || u === "/&")) {
            if (a === 0) {
              (l.removeChild(n), ia(t));
              return;
            }
            a--;
          } else if (
            u === "$" ||
            u === "$?" ||
            u === "$~" ||
            u === "$!" ||
            u === "&"
          )
            a++;
          else if (u === "html") xa(l.ownerDocument.documentElement);
          else if (u === "head") {
            ((u = l.ownerDocument.head), xa(u));
            for (var e = u.firstChild; e; ) {
              var f = e.nextSibling,
                i = e.nodeName;
              (e[yn] ||
                i === "SCRIPT" ||
                i === "STYLE" ||
                (i === "LINK" && e.rel.toLowerCase() === "stylesheet") ||
                u.removeChild(e),
                (e = f));
            }
          } else u === "body" && xa(l.ownerDocument.body);
        u = n;
      } while (u);
      ia(t);
    }
    function _1(l, t) {
      var u = l;
      l = 0;
      do {
        var a = u.nextSibling;
        if (
          (u.nodeType === 1
            ? t
              ? ((u._stashedDisplay = u.style.display),
                (u.style.display = "none"))
              : ((u.style.display = u._stashedDisplay || ""),
                u.getAttribute("style") === "" && u.removeAttribute("style"))
            : u.nodeType === 3 &&
              (t
                ? ((u._stashedText = u.nodeValue), (u.nodeValue = ""))
                : (u.nodeValue = u._stashedText || "")),
          a && a.nodeType === 8)
        )
          if (((u = a.data), u === "/$")) {
            if (l === 0) break;
            l--;
          } else (u !== "$" && u !== "$?" && u !== "$~" && u !== "$!") || l++;
        u = a;
      } while (u);
    }
    function Ci(l) {
      var t = l.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var u = t;
        switch (((t = t.nextSibling), u.nodeName)) {
          case "HTML":
          case "HEAD":
          case "BODY":
            (Ci(u), Li(u));
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (u.rel.toLowerCase() === "stylesheet") continue;
        }
        l.removeChild(u);
      }
    }
    function eh(l, t, u, a) {
      for (; l.nodeType === 1; ) {
        var n = u;
        if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
        } else if (a) {
          if (!l[yn])
            switch (t) {
              case "meta":
                if (!l.hasAttribute("itemprop")) break;
                return l;
              case "link":
                if (
                  ((e = l.getAttribute("rel")),
                  e === "stylesheet" && l.hasAttribute("data-precedence"))
                )
                  break;
                if (
                  e !== n.rel ||
                  l.getAttribute("href") !==
                    (n.href == null || n.href === "" ? null : n.href) ||
                  l.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin) ||
                  l.getAttribute("title") !== (n.title == null ? null : n.title)
                )
                  break;
                return l;
              case "style":
                if (l.hasAttribute("data-precedence")) break;
                return l;
              case "script":
                if (
                  ((e = l.getAttribute("src")),
                  (e !== (n.src == null ? null : n.src) ||
                    l.getAttribute("type") !==
                      (n.type == null ? null : n.type) ||
                    l.getAttribute("crossorigin") !==
                      (n.crossOrigin == null ? null : n.crossOrigin)) &&
                    e &&
                    l.hasAttribute("async") &&
                    !l.hasAttribute("itemprop"))
                )
                  break;
                return l;
              default:
                return l;
            }
        } else if (t === "input" && l.type === "hidden") {
          var e = n.name == null ? null : "" + n.name;
          if (n.type === "hidden" && l.getAttribute("name") === e) return l;
        } else return l;
        if (((l = Wl(l.nextSibling)), l === null)) break;
      }
      return null;
    }
    function fh(l, t, u) {
      if (t === "") return null;
      for (; l.nodeType !== 3; )
        if (
          ((l.nodeType !== 1 ||
            l.nodeName !== "INPUT" ||
            l.type !== "hidden") &&
            !u) ||
          ((l = Wl(l.nextSibling)), l === null)
        )
          return null;
      return l;
    }
    function dm(l, t) {
      for (; l.nodeType !== 8; )
        if (
          ((l.nodeType !== 1 ||
            l.nodeName !== "INPUT" ||
            l.type !== "hidden") &&
            !t) ||
          ((l = Wl(l.nextSibling)), l === null)
        )
          return null;
      return l;
    }
    function Bi(l) {
      return l.data === "$?" || l.data === "$~";
    }
    function Yi(l) {
      return (
        l.data === "$!" ||
        (l.data === "$?" && l.ownerDocument.readyState !== "loading")
      );
    }
    function ih(l, t) {
      var u = l.ownerDocument;
      if (l.data === "$~") l._reactRetry = t;
      else if (l.data !== "$?" || u.readyState !== "loading") t();
      else {
        var a = function () {
          (t(), u.removeEventListener("DOMContentLoaded", a));
        };
        (u.addEventListener("DOMContentLoaded", a), (l._reactRetry = a));
      }
    }
    function Wl(l) {
      for (; l != null; l = l.nextSibling) {
        var t = l.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (
            ((t = l.data),
            t === "$" ||
              t === "$!" ||
              t === "$?" ||
              t === "$~" ||
              t === "&" ||
              t === "F!" ||
              t === "F")
          )
            break;
          if (t === "/$" || t === "/&") return null;
        }
      }
      return l;
    }
    var Gi = null;
    function M1(l) {
      l = l.nextSibling;
      for (var t = 0; l; ) {
        if (l.nodeType === 8) {
          var u = l.data;
          if (u === "/$" || u === "/&") {
            if (t === 0) return Wl(l.nextSibling);
            t--;
          } else
            (u !== "$" &&
              u !== "$!" &&
              u !== "$?" &&
              u !== "$~" &&
              u !== "&") ||
              t++;
        }
        l = l.nextSibling;
      }
      return null;
    }
    function D1(l) {
      l = l.previousSibling;
      for (var t = 0; l; ) {
        if (l.nodeType === 8) {
          var u = l.data;
          if (
            u === "$" ||
            u === "$!" ||
            u === "$?" ||
            u === "$~" ||
            u === "&"
          ) {
            if (t === 0) return l;
            t--;
          } else (u !== "/$" && u !== "/&") || t++;
        }
        l = l.previousSibling;
      }
      return null;
    }
    function sm(l, t, u) {
      switch (((t = De(u)), l)) {
        case "html":
          if (((l = t.documentElement), !l)) throw Error(b(452));
          return l;
        case "head":
          if (((l = t.head), !l)) throw Error(b(453));
          return l;
        case "body":
          if (((l = t.body), !l)) throw Error(b(454));
          return l;
        default:
          throw Error(b(451));
      }
    }
    function xa(l) {
      for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
      Li(l);
    }
    var $l = new Map(),
      U1 = new Set();
    function Ue(l) {
      return typeof l.getRootNode == "function"
        ? l.getRootNode()
        : l.nodeType === 9
          ? l
          : l.ownerDocument;
    }
    var Mt = Q.d;
    Q.d = { f: ch, r: yh, D: vh, C: mh, L: dh, m: sh, X: oh, S: hh, M: Sh };
    function ch() {
      var l = Mt.f(),
        t = Le();
      return l || t;
    }
    function yh(l) {
      var t = ya(l);
      t !== null && t.tag === 5 && t.type === "form" ? fv(t) : Mt.r(l);
    }
    var sa = typeof document > "u" ? null : document;
    function hm(l, t, u) {
      var a = sa;
      if (a && typeof t == "string" && t) {
        var n = Ll(t);
        ((n = 'link[rel="' + l + '"][href="' + n + '"]'),
          typeof u == "string" && (n += '[crossorigin="' + u + '"]'),
          U1.has(n) ||
            (U1.add(n),
            (l = { rel: l, crossOrigin: u, href: t }),
            a.querySelector(n) === null &&
              ((t = a.createElement("link")),
              ol(t, "link", l),
              yl(t),
              a.head.appendChild(t))));
      }
    }
    function vh(l) {
      (Mt.D(l), hm("dns-prefetch", l, null));
    }
    function mh(l, t) {
      (Mt.C(l, t), hm("preconnect", l, t));
    }
    function dh(l, t, u) {
      Mt.L(l, t, u);
      var a = sa;
      if (a && l && t) {
        var n = 'link[rel="preload"][as="' + Ll(t) + '"]';
        t === "image" && u && u.imageSrcSet
          ? ((n += '[imagesrcset="' + Ll(u.imageSrcSet) + '"]'),
            typeof u.imageSizes == "string" &&
              (n += '[imagesizes="' + Ll(u.imageSizes) + '"]'))
          : (n += '[href="' + Ll(l) + '"]');
        var e = n;
        switch (t) {
          case "style":
            e = fa(l);
            break;
          case "script":
            e = ha(l);
        }
        $l.has(e) ||
          ((l = W(
            {
              rel: "preload",
              href: t === "image" && u && u.imageSrcSet ? void 0 : l,
              as: t,
            },
            u,
          )),
          $l.set(e, l),
          a.querySelector(n) !== null ||
            (t === "style" && a.querySelector(on(e))) ||
            (t === "script" && a.querySelector(Sn(e))) ||
            ((t = a.createElement("link")),
            ol(t, "link", l),
            yl(t),
            a.head.appendChild(t)));
      }
    }
    function sh(l, t) {
      Mt.m(l, t);
      var u = sa;
      if (u && l) {
        var a = t && typeof t.as == "string" ? t.as : "script",
          n =
            'link[rel="modulepreload"][as="' +
            Ll(a) +
            '"][href="' +
            Ll(l) +
            '"]',
          e = n;
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            e = ha(l);
        }
        if (
          !$l.has(e) &&
          ((l = W({ rel: "modulepreload", href: l }, t)),
          $l.set(e, l),
          u.querySelector(n) === null)
        ) {
          switch (a) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (u.querySelector(Sn(e))) return;
          }
          ((a = u.createElement("link")),
            ol(a, "link", l),
            yl(a),
            u.head.appendChild(a));
        }
      }
    }
    function hh(l, t, u) {
      Mt.S(l, t, u);
      var a = sa;
      if (a && l) {
        var n = Lu(a).hoistableStyles,
          e = fa(l);
        t = t || "default";
        var f = n.get(e);
        if (!f) {
          var i = { loading: 0, preload: null };
          if ((f = a.querySelector(on(e)))) i.loading = 5;
          else {
            ((l = W({ rel: "stylesheet", href: l, "data-precedence": t }, u)),
              (u = $l.get(e)) && Nc(l, u));
            var c = (f = a.createElement("link"));
            (yl(c),
              ol(c, "link", l),
              (c._p = new Promise(function (m, o) {
                ((c.onload = m), (c.onerror = o));
              })),
              c.addEventListener("load", function () {
                i.loading |= 1;
              }),
              c.addEventListener("error", function () {
                i.loading |= 2;
              }),
              (i.loading |= 4),
              Pn(f, t, a));
          }
          ((f = { type: "stylesheet", instance: f, count: 1, state: i }),
            n.set(e, f));
        }
      }
    }
    function oh(l, t) {
      Mt.X(l, t);
      var u = sa;
      if (u && l) {
        var a = Lu(u).hoistableScripts,
          n = ha(l),
          e = a.get(n);
        e ||
          ((e = u.querySelector(Sn(n))),
          e ||
            ((l = W({ src: l, async: !0 }, t)),
            (t = $l.get(n)) && Hc(l, t),
            (e = u.createElement("script")),
            yl(e),
            ol(e, "link", l),
            u.head.appendChild(e)),
          (e = { type: "script", instance: e, count: 1, state: null }),
          a.set(n, e));
      }
    }
    function Sh(l, t) {
      Mt.M(l, t);
      var u = sa;
      if (u && l) {
        var a = Lu(u).hoistableScripts,
          n = ha(l),
          e = a.get(n);
        e ||
          ((e = u.querySelector(Sn(n))),
          e ||
            ((l = W({ src: l, async: !0, type: "module" }, t)),
            (t = $l.get(n)) && Hc(l, t),
            (e = u.createElement("script")),
            yl(e),
            ol(e, "link", l),
            u.head.appendChild(e)),
          (e = { type: "script", instance: e, count: 1, state: null }),
          a.set(n, e));
      }
    }
    function p1(l, t, u, a) {
      var n = (n = jt.current) ? Ue(n) : null;
      if (!n) throw Error(b(446));
      switch (l) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof u.precedence == "string" && typeof u.href == "string"
            ? ((t = fa(u.href)),
              (u = Lu(n).hoistableStyles),
              (a = u.get(t)),
              a ||
                ((a = { type: "style", instance: null, count: 0, state: null }),
                u.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (
            u.rel === "stylesheet" &&
            typeof u.href == "string" &&
            typeof u.precedence == "string"
          ) {
            l = fa(u.href);
            var e = Lu(n).hoistableStyles,
              f = e.get(l);
            if (
              (f ||
                ((n = n.ownerDocument || n),
                (f = {
                  type: "stylesheet",
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                e.set(l, f),
                (e = n.querySelector(on(l))) &&
                  !e._p &&
                  ((f.instance = e), (f.state.loading = 5)),
                $l.has(l) ||
                  ((u = {
                    rel: "preload",
                    as: "style",
                    href: u.href,
                    crossOrigin: u.crossOrigin,
                    integrity: u.integrity,
                    media: u.media,
                    hrefLang: u.hrefLang,
                    referrerPolicy: u.referrerPolicy,
                  }),
                  $l.set(l, u),
                  e || gh(n, l, u, f.state))),
              t && a === null)
            )
              throw Error(b(528, ""));
            return f;
          }
          if (t && a !== null) throw Error(b(529, ""));
          return null;
        case "script":
          return (
            (t = u.async),
            (u = u.src),
            typeof u == "string" &&
            t &&
            typeof t != "function" &&
            typeof t != "symbol"
              ? ((t = ha(u)),
                (u = Lu(n).hoistableScripts),
                (a = u.get(t)),
                a ||
                  ((a = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  u.set(t, a)),
                a)
              : { type: "void", instance: null, count: 0, state: null }
          );
        default:
          throw Error(b(444, l));
      }
    }
    function fa(l) {
      return 'href="' + Ll(l) + '"';
    }
    function on(l) {
      return 'link[rel="stylesheet"][' + l + "]";
    }
    function om(l) {
      return W({}, l, { "data-precedence": l.precedence, precedence: null });
    }
    function gh(l, t, u, a) {
      l.querySelector('link[rel="preload"][as="style"][' + t + "]")
        ? (a.loading = 1)
        : ((t = l.createElement("link")),
          (a.preload = t),
          t.addEventListener("load", function () {
            return (a.loading |= 1);
          }),
          t.addEventListener("error", function () {
            return (a.loading |= 2);
          }),
          ol(t, "link", u),
          yl(t),
          l.head.appendChild(t));
    }
    function ha(l) {
      return '[src="' + Ll(l) + '"]';
    }
    function Sn(l) {
      return "script[async]" + l;
    }
    function N1(l, t, u) {
      if ((t.count++, t.instance === null))
        switch (t.type) {
          case "style":
            var a = l.querySelector('style[data-href~="' + Ll(u.href) + '"]');
            if (a) return ((t.instance = a), yl(a), a);
            var n = W({}, u, {
              "data-href": u.href,
              "data-precedence": u.precedence,
              href: null,
              precedence: null,
            });
            return (
              (a = (l.ownerDocument || l).createElement("style")),
              yl(a),
              ol(a, "style", n),
              Pn(a, u.precedence, l),
              (t.instance = a)
            );
          case "stylesheet":
            n = fa(u.href);
            var e = l.querySelector(on(n));
            if (e) return ((t.state.loading |= 4), (t.instance = e), yl(e), e);
            ((a = om(u)),
              (n = $l.get(n)) && Nc(a, n),
              (e = (l.ownerDocument || l).createElement("link")),
              yl(e));
            var f = e;
            return (
              (f._p = new Promise(function (i, c) {
                ((f.onload = i), (f.onerror = c));
              })),
              ol(e, "link", a),
              (t.state.loading |= 4),
              Pn(e, u.precedence, l),
              (t.instance = e)
            );
          case "script":
            return (
              (e = ha(u.src)),
              (n = l.querySelector(Sn(e)))
                ? ((t.instance = n), yl(n), n)
                : ((a = u),
                  (n = $l.get(e)) && ((a = W({}, u)), Hc(a, n)),
                  (l = l.ownerDocument || l),
                  (n = l.createElement("script")),
                  yl(n),
                  ol(n, "link", a),
                  l.head.appendChild(n),
                  (t.instance = n))
            );
          case "void":
            return null;
          default:
            throw Error(b(443, t.type));
        }
      else
        t.type === "stylesheet" &&
          (t.state.loading & 4) === 0 &&
          ((a = t.instance), (t.state.loading |= 4), Pn(a, u.precedence, l));
      return t.instance;
    }
    function Pn(l, t, u) {
      for (
        var a = u.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]',
          ),
          n = a.length ? a[a.length - 1] : null,
          e = n,
          f = 0;
        f < a.length;
        f++
      ) {
        var i = a[f];
        if (i.dataset.precedence === t) e = i;
        else if (e !== n) break;
      }
      e
        ? e.parentNode.insertBefore(l, e.nextSibling)
        : ((t = u.nodeType === 9 ? u.head : u),
          t.insertBefore(l, t.firstChild));
    }
    function Nc(l, t) {
      (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
        l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
        l.title == null && (l.title = t.title));
    }
    function Hc(l, t) {
      (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
        l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
        l.integrity == null && (l.integrity = t.integrity));
    }
    var le = null;
    function H1(l, t, u) {
      if (le === null) {
        var a = new Map(),
          n = (le = new Map());
        n.set(u, a);
      } else ((n = le), (a = n.get(u)), a || ((a = new Map()), n.set(u, a)));
      if (a.has(l)) return a;
      for (
        a.set(l, null), u = u.getElementsByTagName(l), n = 0;
        n < u.length;
        n++
      ) {
        var e = u[n];
        if (
          !(
            e[yn] ||
            e[dl] ||
            (l === "link" && e.getAttribute("rel") === "stylesheet")
          ) &&
          e.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          var f = e.getAttribute(t) || "";
          f = l + f;
          var i = a.get(f);
          i ? i.push(e) : a.set(f, [e]);
        }
      }
      return a;
    }
    function r1(l, t, u) {
      ((l = l.ownerDocument || l),
        l.head.insertBefore(
          u,
          t === "title" ? l.querySelector("head > title") : null,
        ));
    }
    function bh(l, t, u) {
      if (u === 1 || t.itemProp != null) return !1;
      switch (l) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            typeof t.precedence != "string" ||
            typeof t.href != "string" ||
            t.href === ""
          )
            break;
          return !0;
        case "link":
          if (
            typeof t.rel != "string" ||
            typeof t.href != "string" ||
            t.href === "" ||
            t.onLoad ||
            t.onError
          )
            break;
          return t.rel === "stylesheet"
            ? ((l = t.disabled), typeof t.precedence == "string" && l == null)
            : !0;
        case "script":
          if (
            t.async &&
            typeof t.async != "function" &&
            typeof t.async != "symbol" &&
            !t.onLoad &&
            !t.onError &&
            t.src &&
            typeof t.src == "string"
          )
            return !0;
      }
      return !1;
    }
    function Sm(l) {
      return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
    }
    function zh(l, t, u, a) {
      if (
        u.type === "stylesheet" &&
        (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
        (u.state.loading & 4) === 0
      ) {
        if (u.instance === null) {
          var n = fa(a.href),
            e = t.querySelector(on(n));
          if (e) {
            ((t = e._p),
              t !== null &&
                typeof t == "object" &&
                typeof t.then == "function" &&
                (l.count++, (l = pe.bind(l)), t.then(l, l)),
              (u.state.loading |= 4),
              (u.instance = e),
              yl(e));
            return;
          }
          ((e = t.ownerDocument || t),
            (a = om(a)),
            (n = $l.get(n)) && Nc(a, n),
            (e = e.createElement("link")),
            yl(e));
          var f = e;
          ((f._p = new Promise(function (i, c) {
            ((f.onload = i), (f.onerror = c));
          })),
            ol(e, "link", a),
            (u.instance = e));
        }
        (l.stylesheets === null && (l.stylesheets = new Map()),
          l.stylesheets.set(u, t),
          (t = u.state.preload) &&
            (u.state.loading & 3) === 0 &&
            (l.count++,
            (u = pe.bind(l)),
            t.addEventListener("load", u),
            t.addEventListener("error", u)));
      }
    }
    var xf = 0;
    function Eh(l, t) {
      return (
        l.stylesheets && l.count === 0 && te(l, l.stylesheets),
        0 < l.count || 0 < l.imgCount
          ? function (u) {
              var a = setTimeout(function () {
                if ((l.stylesheets && te(l, l.stylesheets), l.unsuspend)) {
                  var e = l.unsuspend;
                  ((l.unsuspend = null), e());
                }
              }, 6e4 + t);
              0 < l.imgBytes && xf === 0 && (xf = 62500 * lh());
              var n = setTimeout(
                function () {
                  if (
                    ((l.waitingForImages = !1),
                    l.count === 0 &&
                      (l.stylesheets && te(l, l.stylesheets), l.unsuspend))
                  ) {
                    var e = l.unsuspend;
                    ((l.unsuspend = null), e());
                  }
                },
                (l.imgBytes > xf ? 50 : 800) + t,
              );
              return (
                (l.unsuspend = u),
                function () {
                  ((l.unsuspend = null), clearTimeout(a), clearTimeout(n));
                }
              );
            }
          : null
      );
    }
    function pe() {
      if (
        (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
      ) {
        if (this.stylesheets) te(this, this.stylesheets);
        else if (this.unsuspend) {
          var l = this.unsuspend;
          ((this.unsuspend = null), l());
        }
      }
    }
    var Ne = null;
    function te(l, t) {
      ((l.stylesheets = null),
        l.unsuspend !== null &&
          (l.count++,
          (Ne = new Map()),
          t.forEach(Th, l),
          (Ne = null),
          pe.call(l)));
    }
    function Th(l, t) {
      if (!(t.state.loading & 4)) {
        var u = Ne.get(l);
        if (u) var a = u.get(null);
        else {
          ((u = new Map()), Ne.set(l, u));
          for (
            var n = l.querySelectorAll(
                "link[data-precedence],style[data-precedence]",
              ),
              e = 0;
            e < n.length;
            e++
          ) {
            var f = n[e];
            (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
              (u.set(f.dataset.precedence, f), (a = f));
          }
          a && u.set(null, a);
        }
        ((n = t.instance),
          (f = n.getAttribute("data-precedence")),
          (e = u.get(f) || a),
          e === a && u.set(null, n),
          u.set(f, n),
          this.count++,
          (a = pe.bind(this)),
          n.addEventListener("load", a),
          n.addEventListener("error", a),
          e
            ? e.parentNode.insertBefore(n, e.nextSibling)
            : ((l = l.nodeType === 9 ? l.head : l),
              l.insertBefore(n, l.firstChild)),
          (t.state.loading |= 4));
      }
    }
    var tn = {
      $$typeof: ht,
      Provider: null,
      Consumer: null,
      _currentValue: fu,
      _currentValue2: fu,
      _threadCount: 0,
    };
    function Ah(l, t, u, a, n, e, f, i, c) {
      ((this.tag = 1),
        (this.containerInfo = l),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = of(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = of(0)),
        (this.hiddenUpdates = of(null)),
        (this.identifierPrefix = a),
        (this.onUncaughtError = n),
        (this.onCaughtError = e),
        (this.onRecoverableError = f),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = c),
        (this.incompleteTransitions = new Map()));
    }
    function gm(l, t, u, a, n, e, f, i, c, m, o, g) {
      return (
        (l = new Ah(l, t, u, f, c, m, o, g, i)),
        (t = 1),
        e === !0 && (t |= 24),
        (e = rl(3, null, null, t)),
        (l.current = e),
        (e.stateNode = l),
        (t = uc()),
        t.refCount++,
        (l.pooledCache = t),
        t.refCount++,
        (e.memoizedState = { element: a, isDehydrated: u, cache: t }),
        ec(e),
        l
      );
    }
    function bm(l) {
      return l ? ((l = ju), l) : ju;
    }
    function zm(l, t, u, a, n, e) {
      ((n = bm(n)),
        a.context === null ? (a.context = n) : (a.pendingContext = n),
        (a = Vt(t)),
        (a.payload = { element: u }),
        (e = e === void 0 ? null : e),
        e !== null && (a.callback = e),
        (u = xt(l, a, t)),
        u !== null && (Dl(u, l, t), Ya(u, l, t)));
    }
    function q1(l, t) {
      if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
        var u = l.retryLane;
        l.retryLane = u !== 0 && u < t ? u : t;
      }
    }
    function rc(l, t) {
      (q1(l, t), (l = l.alternate) && q1(l, t));
    }
    function Em(l) {
      if (l.tag === 13 || l.tag === 31) {
        var t = zu(l, 67108864);
        (t !== null && Dl(t, l, 67108864), rc(l, 67108864));
      }
    }
    function C1(l) {
      if (l.tag === 13 || l.tag === 31) {
        var t = Gl();
        t = Vi(t);
        var u = zu(l, t);
        (u !== null && Dl(u, l, t), rc(l, t));
      }
    }
    var He = !0;
    function Oh(l, t, u, a) {
      var n = _.T;
      _.T = null;
      var e = Q.p;
      try {
        ((Q.p = 2), qc(l, t, u, a));
      } finally {
        ((Q.p = e), (_.T = n));
      }
    }
    function _h(l, t, u, a) {
      var n = _.T;
      _.T = null;
      var e = Q.p;
      try {
        ((Q.p = 8), qc(l, t, u, a));
      } finally {
        ((Q.p = e), (_.T = n));
      }
    }
    function qc(l, t, u, a) {
      if (He) {
        var n = Xi(a);
        if (n === null) (Zf(l, t, a, re, u), B1(l, a));
        else if (Dh(n, l, t, u, a)) a.stopPropagation();
        else if ((B1(l, a), t & 4 && -1 < Mh.indexOf(l))) {
          for (; n !== null; ) {
            var e = ya(n);
            if (e !== null)
              switch (e.tag) {
                case 3:
                  if (
                    ((e = e.stateNode), e.current.memoizedState.isDehydrated)
                  ) {
                    var f = au(e.pendingLanes);
                    if (f !== 0) {
                      var i = e;
                      for (i.pendingLanes |= 2, i.entangledLanes |= 2; f; ) {
                        var c = 1 << (31 - Yl(f));
                        ((i.entanglements[1] |= c), (f &= ~c));
                      }
                      (et(e), (X & 6) === 0 && ((Ee = Cl() + 500), hn(0, !1)));
                    }
                  }
                  break;
                case 31:
                case 13:
                  ((i = zu(e, 2)), i !== null && Dl(i, e, 2), Le(), rc(e, 2));
              }
            if (((e = Xi(a)), e === null && Zf(l, t, a, re, u), e === n)) break;
            n = e;
          }
          n !== null && a.stopPropagation();
        } else Zf(l, t, a, null, u);
      }
    }
    function Xi(l) {
      return ((l = Ji(l)), Cc(l));
    }
    var re = null;
    function Cc(l) {
      if (((re = null), (l = Bu(l)), l !== null)) {
        var t = nn(l);
        if (t === null) l = null;
        else {
          var u = t.tag;
          if (u === 13) {
            if (((l = j1(t)), l !== null)) return l;
            l = null;
          } else if (u === 31) {
            if (((l = Z1(t)), l !== null)) return l;
            l = null;
          } else if (u === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            l = null;
          } else t !== l && (l = null);
        }
      }
      return ((re = l), null);
    }
    function Tm(l) {
      switch (l) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (dd()) {
            case K1:
              return 2;
            case J1:
              return 8;
            case fe:
            case sd:
              return 32;
            case w1:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Qi = !1,
      Jt = null,
      wt = null,
      Wt = null,
      un = new Map(),
      an = new Map(),
      Bt = [],
      Mh =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
          " ",
        );
    function B1(l, t) {
      switch (l) {
        case "focusin":
        case "focusout":
          Jt = null;
          break;
        case "dragenter":
        case "dragleave":
          wt = null;
          break;
        case "mouseover":
        case "mouseout":
          Wt = null;
          break;
        case "pointerover":
        case "pointerout":
          un.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          an.delete(t.pointerId);
      }
    }
    function _a(l, t, u, a, n, e) {
      return l === null || l.nativeEvent !== e
        ? ((l = {
            blockedOn: t,
            domEventName: u,
            eventSystemFlags: a,
            nativeEvent: e,
            targetContainers: [n],
          }),
          t !== null && ((t = ya(t)), t !== null && Em(t)),
          l)
        : ((l.eventSystemFlags |= a),
          (t = l.targetContainers),
          n !== null && t.indexOf(n) === -1 && t.push(n),
          l);
    }
    function Dh(l, t, u, a, n) {
      switch (t) {
        case "focusin":
          return ((Jt = _a(Jt, l, t, u, a, n)), !0);
        case "dragenter":
          return ((wt = _a(wt, l, t, u, a, n)), !0);
        case "mouseover":
          return ((Wt = _a(Wt, l, t, u, a, n)), !0);
        case "pointerover":
          var e = n.pointerId;
          return (un.set(e, _a(un.get(e) || null, l, t, u, a, n)), !0);
        case "gotpointercapture":
          return (
            (e = n.pointerId),
            an.set(e, _a(an.get(e) || null, l, t, u, a, n)),
            !0
          );
      }
      return !1;
    }
    function Am(l) {
      var t = Bu(l.target);
      if (t !== null) {
        var u = nn(t);
        if (u !== null) {
          if (((t = u.tag), t === 13)) {
            if (((t = j1(u)), t !== null)) {
              ((l.blockedOn = t),
                g0(l.priority, function () {
                  C1(u);
                }));
              return;
            }
          } else if (t === 31) {
            if (((t = Z1(u)), t !== null)) {
              ((l.blockedOn = t),
                g0(l.priority, function () {
                  C1(u);
                }));
              return;
            }
          } else if (
            t === 3 &&
            u.stateNode.current.memoizedState.isDehydrated
          ) {
            l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
            return;
          }
        }
      }
      l.blockedOn = null;
    }
    function ue(l) {
      if (l.blockedOn !== null) return !1;
      for (var t = l.targetContainers; 0 < t.length; ) {
        var u = Xi(l.nativeEvent);
        if (u === null) {
          u = l.nativeEvent;
          var a = new u.constructor(u.type, u);
          ((ui = a), u.target.dispatchEvent(a), (ui = null));
        } else return ((t = ya(u)), t !== null && Em(t), (l.blockedOn = u), !1);
        t.shift();
      }
      return !0;
    }
    function Y1(l, t, u) {
      ue(l) && u.delete(t);
    }
    function Uh() {
      ((Qi = !1),
        Jt !== null && ue(Jt) && (Jt = null),
        wt !== null && ue(wt) && (wt = null),
        Wt !== null && ue(Wt) && (Wt = null),
        un.forEach(Y1),
        an.forEach(Y1));
    }
    function jn(l, t) {
      l.blockedOn === t &&
        ((l.blockedOn = null),
        Qi ||
          ((Qi = !0),
          il.unstable_scheduleCallback(il.unstable_NormalPriority, Uh)));
    }
    var Zn = null;
    function G1(l) {
      Zn !== l &&
        ((Zn = l),
        il.unstable_scheduleCallback(il.unstable_NormalPriority, function () {
          Zn === l && (Zn = null);
          for (var t = 0; t < l.length; t += 3) {
            var u = l[t],
              a = l[t + 1],
              n = l[t + 2];
            if (typeof a != "function") {
              if (Cc(a || u) === null) continue;
              break;
            }
            var e = ya(u);
            e !== null &&
              (l.splice(t, 3),
              (t -= 3),
              bi(
                e,
                { pending: !0, data: n, method: u.method, action: a },
                a,
                n,
              ));
          }
        }));
    }
    function ia(l) {
      function t(c) {
        return jn(c, l);
      }
      (Jt !== null && jn(Jt, l),
        wt !== null && jn(wt, l),
        Wt !== null && jn(Wt, l),
        un.forEach(t),
        an.forEach(t));
      for (var u = 0; u < Bt.length; u++) {
        var a = Bt[u];
        a.blockedOn === l && (a.blockedOn = null);
      }
      for (; 0 < Bt.length && ((u = Bt[0]), u.blockedOn === null); )
        (Am(u), u.blockedOn === null && Bt.shift());
      if (((u = (l.ownerDocument || l).$$reactFormReplay), u != null))
        for (a = 0; a < u.length; a += 3) {
          var n = u[a],
            e = u[a + 1],
            f = n[Ul] || null;
          if (typeof e == "function") f || G1(u);
          else if (f) {
            var i = null;
            if (e && e.hasAttribute("formAction")) {
              if (((n = e), (f = e[Ul] || null))) i = f.formAction;
              else if (Cc(n) !== null) continue;
            } else i = f.action;
            (typeof i == "function"
              ? (u[a + 1] = i)
              : (u.splice(a, 3), (a -= 3)),
              G1(u));
          }
        }
    }
    function Om() {
      function l(e) {
        e.canIntercept &&
          e.info === "react-transition" &&
          e.intercept({
            handler: function () {
              return new Promise(function (f) {
                return (n = f);
              });
            },
            focusReset: "manual",
            scroll: "manual",
          });
      }
      function t() {
        (n !== null && (n(), (n = null)), a || setTimeout(u, 20));
      }
      function u() {
        if (!a && !navigation.transition) {
          var e = navigation.currentEntry;
          e &&
            e.url != null &&
            navigation.navigate(e.url, {
              state: e.getState(),
              info: "react-transition",
              history: "replace",
            });
        }
      }
      if (typeof navigation == "object") {
        var a = !1,
          n = null;
        return (
          navigation.addEventListener("navigate", l),
          navigation.addEventListener("navigatesuccess", t),
          navigation.addEventListener("navigateerror", t),
          setTimeout(u, 100),
          function () {
            ((a = !0),
              navigation.removeEventListener("navigate", l),
              navigation.removeEventListener("navigatesuccess", t),
              navigation.removeEventListener("navigateerror", t),
              n !== null && (n(), (n = null)));
          }
        );
      }
    }
    function Bc(l) {
      this._internalRoot = l;
    }
    we.prototype.render = Bc.prototype.render = function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(b(409));
      var u = t.current,
        a = Gl();
      zm(u, a, l, t, null, null);
    };
    we.prototype.unmount = Bc.prototype.unmount = function () {
      var l = this._internalRoot;
      if (l !== null) {
        this._internalRoot = null;
        var t = l.containerInfo;
        (zm(l.current, 2, null, l, null, null), Le(), (t[ca] = null));
      }
    };
    function we(l) {
      this._internalRoot = l;
    }
    we.prototype.unstable_scheduleHydration = function (l) {
      if (l) {
        var t = I1();
        l = { blockedOn: null, target: l, priority: t };
        for (var u = 0; u < Bt.length && t !== 0 && t < Bt[u].priority; u++);
        (Bt.splice(u, 0, l), u === 0 && Am(l));
      }
    };
    var X1 = Q1.version;
    if (X1 !== "19.2.6") throw Error(b(527, X1, "19.2.6"));
    Q.findDOMNode = function (l) {
      var t = l._reactInternals;
      if (t === void 0)
        throw typeof l.render == "function"
          ? Error(b(188))
          : ((l = Object.keys(l).join(",")), Error(b(268, l)));
      return (
        (l = ed(t)),
        (l = l !== null ? V1(l) : null),
        (l = l === null ? null : l.stateNode),
        l
      );
    };
    var ph = {
      bundleType: 0,
      version: "19.2.6",
      rendererPackageName: "react-dom",
      currentDispatcherRef: _,
      reconcilerVersion: "19.2.6",
    };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
      ((Ma = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !Ma.isDisabled && Ma.supportsFiber)
    )
      try {
        ((en = Ma.inject(ph)), (Bl = Ma));
      } catch {}
    var Ma;
    We.createRoot = function (l, t) {
      if (!R1(l)) throw Error(b(299));
      var u = !1,
        a = "",
        n = hv,
        e = ov,
        f = Sv;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (u = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (e = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = gm(l, 1, !1, null, null, u, a, null, n, e, f, Om)),
        (l[ca] = t.current),
        pc(l),
        new Bc(t)
      );
    };
    We.hydrateRoot = function (l, t, u) {
      if (!R1(l)) throw Error(b(299));
      var a = !1,
        n = "",
        e = hv,
        f = ov,
        i = Sv,
        c = null;
      return (
        u != null &&
          (u.unstable_strictMode === !0 && (a = !0),
          u.identifierPrefix !== void 0 && (n = u.identifierPrefix),
          u.onUncaughtError !== void 0 && (e = u.onUncaughtError),
          u.onCaughtError !== void 0 && (f = u.onCaughtError),
          u.onRecoverableError !== void 0 && (i = u.onRecoverableError),
          u.formState !== void 0 && (c = u.formState)),
        (t = gm(l, 1, !0, t, u ?? null, a, n, c, e, f, i, Om)),
        (t.context = bm(null)),
        (u = t.current),
        (a = Gl()),
        (a = Vi(a)),
        (n = Vt(a)),
        (n.callback = null),
        xt(u, n, a),
        (u = a),
        (t.current.lanes = u),
        cn(t, u),
        et(t),
        (l[ca] = t.current),
        pc(l),
        new we(t)
      );
    };
    We.version = "19.2.6";
  });
  var Um = Dt((Xh, Dm) => {
    "use strict";
    function Mm() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mm);
        } catch (l) {
          console.error(l);
        }
    }
    (Mm(), (Dm.exports = _m()));
  });
  var Nm = bn(_u()),
    Hm = bn(Um());
  var z = bn(_u()),
    El = bn(_u());
  function Yc() {
    let [l, t] = (0, El.useState)(null),
      [u, a] = (0, El.useState)(Date.now()),
      [n, e] = (0, El.useState)(!1),
      [f, i] = (0, El.useState)(!1),
      [c, m] = (0, El.useState)(""),
      [o, g] = (0, El.useState)(null),
      s = (0, El.useRef)(0),
      h = (0, El.useRef)(!1),
      E = (0, El.useRef)(0),
      O = (0, El.useRef)(null),
      [Y, v] = (0, El.useState)(!1);
    function y(M) {
      ((E.current = M.now - Date.now()), t(M), e(!0), a(M.now));
    }
    (0, El.useEffect)(() => {
      let M = !1;
      async function k() {
        if (h.current) return;
        let gn = ++s.current;
        try {
          let Gc = await pm("ioa_snapshot", {});
          if (!Gc.ok) throw Error();
          let rm = await Gc.json();
          !M && !h.current && gn === s.current && y(rm);
        } catch {
          !M && gn === s.current && e(!1);
        }
      }
      k();
      let Tl = setInterval(k, 2e3),
        Tu = setInterval(() => a(Date.now() + E.current), 1e3);
      return () => {
        ((M = !0), clearInterval(Tl), clearInterval(Tu));
      };
    }, []);
    async function d(M, k) {
      if (h.current) return;
      ((h.current = !0), s.current++, i(!0), m(""));
      let Tl = O.current ?? { kind: M, hub: k, requestId: crypto.randomUUID() };
      O.current = Tl;
      try {
        let Tu = await pm("ioa_action", {
          p_request_id: Tl.requestId,
          p_kind: Tl.kind,
          p_hub: Tl.hub,
        });
        if (!Tu.ok) throw Error();
        (y(await Tu.json()),
          (O.current = null),
          v(!1),
          g(null),
          m(
            Tl.kind === "entry"
              ? "Entr\xE9e enregistr\xE9e dans le Hub " + Tl.hub + "."
              : "Compteur" +
                  (Tl.hub ? " du Hub " + Tl.hub : "s") +
                  " remis \xE0 z\xE9ro.",
          ));
      } catch {
        (e(!1),
          v(!0),
          m(
            "Enregistrement non confirm\xE9. R\xE9essayez pour v\xE9rifier sans compter deux fois.",
          ));
      } finally {
        ((h.current = !1), i(!1));
      }
    }
    let S =
        l?.hubs ??
        [1, 2, 3].map((M) => ({
          hub: M,
          lastSeq: null,
          lastAt: null,
          count: 0,
        })),
      A = [...S].sort((M, k) => (M.lastSeq ?? -M.hub) - (k.lastSeq ?? -k.hub)),
      C = [...S].sort((M, k) =>
        M.lastSeq === null && k.lastSeq === null
          ? M.hub - k.hub
          : M.lastSeq === null
            ? -1
            : k.lastSeq === null
              ? 1
              : M.lastSeq - k.lastSeq,
      ),
      T = C[0],
      D = A[2]?.lastSeq ? A[2] : null,
      N = S.reduce((M, k) => M + k.count, 0);
    function G(M) {
      if (M === null) return "\u2014 \u2014 : \u2014 \u2014";
      let k = Math.max(0, Math.floor((u - M) / 1e3));
      return [Math.floor(k / 3600), Math.floor(k / 60) % 60, k % 60]
        .map((Tl) => String(Tl).padStart(2, "0"))
        .join(":");
    }
    return z.default.createElement(
      z.default.Fragment,
      null,
      z.default.createElement(
        "header",
        null,
        z.default.createElement(
          "div",
          { className: "brand" },
          z.default.createElement("span", { className: "logo" }, "+"),
          z.default.createElement(
            "div",
            null,
            "IOA ",
            z.default.createElement("strong", null, "URM"),
            z.default.createElement("small", null, "URGENCES \xB7 ORIENTATION"),
          ),
        ),
        z.default.createElement(
          "div",
          { className: "connection " + (n ? "ok" : "") },
          z.default.createElement("i", null),
          n
            ? "Synchronis\xE9 \xB7 actualisation 2 s"
            : "Connexion en cours / interrompue",
        ),
      ),
      z.default.createElement(
        "main",
        null,
        z.default.createElement(
          "div",
          { className: "heading" },
          z.default.createElement(
            "div",
            null,
            z.default.createElement(
              "div",
              { className: "eyebrow" },
              "TABLEAU DE ROTATION",
            ),
            z.default.createElement("h1", null, "Une entr\xE9e. Un hub."),
            z.default.createElement(
              "p",
              null,
              "Cliquez sur le hub qui vient de recevoir une entr\xE9e.",
            ),
          ),
          z.default.createElement(
            "div",
            { className: "date" },
            new Date(u).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Europe/Paris",
            }),
            z.default.createElement(
              "strong",
              null,
              new Date(u).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Paris",
              }),
            ),
          ),
        ),
        z.default.createElement(
          "section",
          { className: "summary" },
          z.default.createElement("div", { className: "next-icon" }, "\u2197"),
          z.default.createElement(
            "div",
            null,
            z.default.createElement("small", null, "PROCHAINE ENTR\xC9E"),
            z.default.createElement(
              "strong",
              null,
              l ? "Hub " + T.hub : "Chargement\u2026",
            ),
          ),
          z.default.createElement(
            "span",
            { className: "summary-detail" },
            D
              ? "Derni\xE8re entr\xE9e : Hub " + D.hub
              : "Premi\xE8re rotation : Hub 1 \u2192 Hub 2 \u2192 Hub 3",
          ),
          z.default.createElement(
            "div",
            { className: "total" },
            z.default.createElement("strong", null, l ? N : "\u2014"),
            z.default.createElement(
              "span",
              null,
              "entr\xE9es au total",
              z.default.createElement("small", null, "24 derni\xE8res heures"),
            ),
          ),
        ),
        z.default.createElement(
          "section",
          { className: "cards", "aria-label": "Enregistrer une entr\xE9e" },
          S.map((M) => {
            let k = C.findIndex((gn) => gn.hub === M.hub),
              Tl = l
                ? k === 0
                  ? "green"
                  : M.hub === D?.hub
                    ? "red"
                    : "yellow"
                : "neutral",
              Tu = l
                ? k === 0
                  ? "Prochain \xE0 prendre"
                  : M.hub === D?.hub
                    ? "Derni\xE8re entr\xE9e"
                    : M.lastSeq
                      ? "Avant-dernier"
                      : "En attente"
                : "Chargement";
            return z.default.createElement(
              "article",
              { key: M.hub, className: "card " + Tl },
              z.default.createElement(
                "button",
                {
                  className: "hub-action",
                  onClick: () => d("entry", M.hub),
                  disabled: !n || f || Y,
                  "aria-label":
                    "Enregistrer une entr\xE9e dans le Hub " + M.hub,
                },
                z.default.createElement(
                  "div",
                  { className: "card-top" },
                  z.default.createElement(
                    "span",
                    { className: "badge" },
                    z.default.createElement("i", null),
                    Tu,
                  ),
                  z.default.createElement(
                    "span",
                    { className: "arrow" },
                    "\u2197",
                  ),
                ),
                z.default.createElement("h2", null, "Hub ", M.hub),
                z.default.createElement(
                  "div",
                  { className: "timer" },
                  G(M.lastAt),
                ),
                z.default.createElement(
                  "p",
                  null,
                  "depuis la derni\xE8re entr\xE9e",
                ),
                z.default.createElement(
                  "div",
                  { className: "card-bottom" },
                  z.default.createElement(
                    "span",
                    null,
                    z.default.createElement(
                      "strong",
                      null,
                      l ? M.count : "\u2014",
                    ),
                    " entr\xE9es / 24 h",
                  ),
                  z.default.createElement(
                    "span",
                    { className: "add" },
                    "+ 1 entr\xE9e",
                  ),
                ),
              ),
              z.default.createElement(
                "button",
                {
                  className: "reset-one",
                  disabled: !n || f || Y,
                  onClick: () => g(M.hub),
                },
                "R\xE9initialiser le compteur",
              ),
            );
          }),
        ),
        z.default.createElement(
          "div",
          { className: "legend" },
          z.default.createElement(
            "span",
            null,
            z.default.createElement("i", { className: "dot green-dot" }),
            "Prochain hub",
          ),
          z.default.createElement(
            "span",
            null,
            z.default.createElement("i", { className: "dot yellow-dot" }),
            "Avant-dernier hub",
          ),
          z.default.createElement(
            "span",
            null,
            z.default.createElement("i", { className: "dot red-dot" }),
            "Dernier hub",
          ),
          z.default.createElement(
            "small",
            null,
            "Chaque clic enregistre une entr\xE9e et actualise la rotation.",
          ),
        ),
        z.default.createElement(
          "div",
          { className: "notice", role: "status" },
          c,
          Y &&
            z.default.createElement(
              "button",
              { disabled: f, onClick: () => d(O.current.kind, O.current.hub) },
              "R\xE9essayer l\u2019enregistrement",
            ),
        ),
        z.default.createElement(
          "section",
          { className: "bottom" },
          z.default.createElement(
            "div",
            null,
            z.default.createElement(
              "h3",
              null,
              "Un m\xEAme tableau pour toute l\u2019\xE9quipe",
            ),
            z.default.createElement(
              "p",
              null,
              "Les entr\xE9es sont partag\xE9es entre tous les postes utilisant ce lien. Aucun renseignement patient n\u2019est demand\xE9.",
            ),
          ),
          z.default.createElement(
            "button",
            {
              className: "reset-all",
              disabled: !n || f || Y,
              onClick: () => g(0),
            },
            "\u21BA \xA0 R\xE9initialiser tous les compteurs",
          ),
        ),
        z.default.createElement(
          "footer",
          null,
          z.default.createElement(
            "span",
            null,
            "IOA URM ",
            z.default.createElement("b", null, " / "),
            " Coordination des hubs",
          ),
          z.default.createElement(
            "span",
            null,
            "Compteurs sur 24 h glissantes, depuis la derni\xE8re remise \xE0 z\xE9ro.",
          ),
        ),
      ),
      o !== null &&
        z.default.createElement(
          "div",
          { className: "overlay" },
          z.default.createElement(
            "section",
            {
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": "reset-title",
              className: "modal",
              onKeyDown: (M) => {
                M.key === "Escape" && !f && g(null);
              },
            },
            z.default.createElement(
              "span",
              { className: "modal-icon" },
              "\u21BA",
            ),
            z.default.createElement(
              "h2",
              { id: "reset-title" },
              o
                ? "R\xE9initialiser le Hub " + o + " ?"
                : "R\xE9initialiser tous les compteurs ?",
            ),
            z.default.createElement(
              "p",
              null,
              "La remise \xE0 z\xE9ro s\u2019appliquera \xE0 tous les postes. Les chronom\xE8tres et l\u2019ordre de rotation seront conserv\xE9s.",
            ),
            z.default.createElement(
              "div",
              null,
              z.default.createElement(
                "button",
                { autoFocus: !0, disabled: f, onClick: () => g(null) },
                "Annuler",
              ),
              z.default.createElement(
                "button",
                {
                  className: "confirm",
                  disabled: f || Y,
                  onClick: () => d("reset", o),
                },
                f ? "Enregistrement\u2026" : "Confirmer la remise \xE0 z\xE9ro",
              ),
            ),
          ),
        ),
    );
  }
  async function pm(l, t) {
    return fetch("https://lvnywretwubbgknhjvul.supabase.co/rest/v1/rpc/" + l, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "sb_publishable_qXHpRzoGuNFyo2Td5c4CJg_c7RJCJG8",
      },
      body: JSON.stringify(t),
      signal: AbortSignal.timeout(1e4),
    });
  }
  (0, Hm.createRoot)(document.getElementById("root")).render(
    Nm.default.createElement(Yc, null),
  );
})();
/*! Bundled license information: 

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
