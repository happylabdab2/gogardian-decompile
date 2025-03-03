(() => {
    var e = {
            8981: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const n = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;;
            },
            4666: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(8981),
                    s = n(7742),
                    i = {
                        e: undefined
                    };

                function a(e) {
                    const t = i[e];
                    if (t) {
                        return t;
                    }
                    let n = s.WINDOW[e];
                    if (r.isNativeFunction(n)) {
                        return i[e] = n.bind(s.WINDOW);
                    }
                    const a = s.WINDOW.document;
                    if (a && "function" == typeof a.createElement) {
                        try {
                            const t = a.createElement("iframe");;
                            a.head.appendChild(t);;
                            const r = t.contentWindow;
                            r && r[e] && (n = r[e]);
                            a.head.removeChild(t);;
                        } catch (t) {
                            o.DEBUG_BUILD && r.logger.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `, t);
                        }
                    }
                    return n ? i[e] = n.bind(s.WINDOW) : n;
                };;;;;
            },
            1015: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(3872),
                    o = n(4624),
                    s = n(677),
                    i = n(8577),
                    a = n(4666),
                    c = n(139),
                    l = n(8412);
            },
            677: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7742);
                let s, i, a;

                function c() {
                    if (!o.WINDOW.document) {
                        return;
                    }
                    const e = r.triggerHandlers.bind(null, "dom"),
                        t = l(e, true);
                    o.WINDOW.document.addEventListener("click", t, false);
                    o.WINDOW.document.addEventListener("keypress", t, false);
                    ["EventTarget", "Node"].forEach(t => {
                        const n = o.WINDOW[t] && o.WINDOW[t].prototype;
                        n && n.hasOwnProperty && n.hasOwnProperty("addEventListener") && (r.fill(n, "addEventListener", function(t) {
                            return function(n, r, o) {
                                if ("click" === n || "keypress" == n) {
                                    try {
                                        const r = this,
                                            s = r.__sentry_instrumentation_handlers__ = r.__sentry_instrumentation_handlers__ || {},
                                            i = s[n] = s[n] || {
                                                refCount: 0
                                            };
                                        if (!i.handler) {
                                            const r = l(e);;
                                            t.call(this, n, r, o);;
                                        }
                                        i.refCount++;
                                    } catch (e) {}
                                }
                                return t.call(this, n, r, o);
                            };
                        }), r.fill(n, "removeEventListener", function(e) {
                            return function(t, n, r) {
                                if ("click" === t || "keypress" == t) {
                                    try {
                                        const n = this,
                                            o = n.__sentry_instrumentation_handlers__ || {},
                                            s = o[t];
                                        s && (s.refCount--, s.refCount <= 0 && (e.call(this, t, s.handler, r), s.handler = undefined, delete o[t]), 0 === Object.keys(o).length && delete n.__sentry_instrumentation_handlers__);
                                    } catch (e) {}
                                }
                                return e.call(this, t, n, r);
                            };
                        }));
                    });;
                }

                function l(e, t = false) {
                    return n => {
                        if (!n || n._sentryCaptured) {
                            return;
                        }
                        const c = function(e) {
                            try {
                                return e.target;
                            } catch (e) {
                                return null;
                            }
                        }(n);
                        if (function(e, t) {
                                return "keypress" === e && (!t || !t.tagName || "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName && !t.isContentEditable);
                            }(n.type, c)) {
                            return;
                        }
                        r.addNonEnumerableProperty(n, "_sentryCaptured", true);
                        c && !c._sentryId && r.addNonEnumerableProperty(c, "_sentryId", r.uuid4());;
                        const l = "keypress" === n.type ? "input" : n.type;
                        (function(e) {
                            if (e.type !== i) {
                                return false;
                            }
                            try {
                                if (!e.target || e.target._sentryId !== a) {
                                    return false;
                                }
                            } catch (e) {}
                            return true;
                        }(n) || (e({
                            event: n,
                            name: l,
                            global: t
                        }), i = n.type, a = c ? c._sentryId : undefined));
                        clearTimeout(s);
                        s = o.WINDOW.setTimeout(() => {
                            a = undefined;
                            i = undefined;;
                        }, 1e3);;
                    };
                };;;
            },
            8577: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7742);
                let s;

                function i() {
                    if (!r.supportsHistory()) {
                        return;
                    }
                    const e = o.WINDOW.onpopstate;

                    function t(e) {
                        return function(...t) {
                            const n = t.length > 2 ? t[2] : undefined;
                            if (n) {
                                const e = s,
                                    t = String(n);
                                s = t;
                                const o = {
                                    from: e,
                                    to: t
                                };
                                r.triggerHandlers("history", o);
                            }
                            return e.apply(this, t);
                        };
                    }
                    o.WINDOW.onpopstate = function(...t) {
                        const n = o.WINDOW.location.href,
                            i = s;
                        s = n;
                        const a = {
                            from: i,
                            to: n
                        };
                        if (r.triggerHandlers("history", a), e) {
                            try {
                                return e.apply(this, t);
                            } catch (e) {}
                        }
                    };
                    r.fill(o.WINDOW.history, "pushState", t);
                    r.fill(o.WINDOW.history, "replaceState", t);;
                };
            },
            139: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7742);

                function i() {
                    if (!o.WINDOW.XMLHttpRequest) {
                        return;
                    }
                    const e = XMLHttpRequest.prototype;
                    e.open = new Proxy(e.open, {
                        apply(e, t, n) {
                            const o = 1e3 * r.timestampInSeconds(),
                                i = r.isString(n[0]) ? n[0].toUpperCase() : undefined,
                                a = function(e) {
                                    if (r.isString(e)) {
                                        return e;
                                    }
                                    try {
                                        return e.toString();
                                    } catch (e) {}
                                }(n[1]);
                            if (!i || !a) {
                                return e.apply(t, n);
                            }
                            t.__sentry_xhr_v3__ = {
                                method: i,
                                url: a,
                                request_headers: {}
                            };
                            "POST" === i && a.match(/sentry_key/) && (t.__sentry_own_request__ = true);;
                            const c = () => {
                                const e = t.__sentry_xhr_v3__;
                                if (e && 4 === t.readyState) {
                                    try {
                                        e.status_code = t.status;
                                    } catch (e) {}
                                    const n = {
                                        endTimestamp: 1e3 * r.timestampInSeconds(),
                                        startTimestamp: o,
                                        xhr: t
                                    };
                                    r.triggerHandlers("xhr", n);
                                }
                            };
                            return "onreadystatechange" in t && "function" == typeof t.onreadystatechange ? t.onreadystatechange = new Proxy(t.onreadystatechange, {
                                apply: (e, t, n) => (c(), e.apply(t, n))
                            }) : t.addEventListener("readystatechange", c), t.setRequestHeader = new Proxy(t.setRequestHeader, {
                                apply(e, t, n) {
                                    const [o, i] = n, a = t.__sentry_xhr_v3__;
                                    return a && r.isString(o) && r.isString(i) && (a.request_headers[o.toLowerCase()] = i), e.apply(t, n);
                                }
                            }), e.apply(t, n);
                        }
                    });
                    e.send = new Proxy(e.send, {
                        apply(e, t, n) {
                            const o = t.__sentry_xhr_v3__;
                            if (!o) {
                                return e.apply(t, n);
                            }
                            undefined !== n[0] && (o.body = n[0]);
                            const i = {
                                startTimestamp: 1e3 * r.timestampInSeconds(),
                                xhr: t
                            };
                            return r.triggerHandlers("xhr", i), e.apply(t, n);
                        }
                    });;
                };;;;
            },
            4624: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(8981),
                    s = n(7742),
                    i = n(4882),
                    a = n(3872),
                    c = n(1604),
                    l = n(2990),
                    u = n(5476),
                    d = n(750);
                let p, h, m = 0,
                    f = {
                        fid: {
                            value: e.value,
                            unit: "millisecond"
                        }
                    };

                function g(e, t, n, o, s) {
                    const i = u.getNavigationEntry(),
                        a = c.msToSec(i ? i.requestStart : 0),
                        l = s + Math.max(n, a),
                        d = s + n,
                        p = d + o,
                        h = {
                            [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.resource.browser.metrics"
                        };
                    return l !== d && (h["sentry.browser.measure_happened_before_request"] = true, h["sentry.browser.measure_start_time"] = l), c.startAndEndSpan(e, l, p, {
                        name: t.name,
                        op: t.entryType,
                        attributes: h
                    }), l;
                }

                function _(e, t, n, o, s, i) {
                    const a = i ? t[i] : t[`${n}End`],
                        l = t[`${n}Start`];
                    l && a && c.startAndEndSpan(e, o + c.msToSec(l), o + c.msToSec(a), {
                        op: `browser.${s || n}`,
                        name: t.name,
                        attributes: {
                            [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
                        }
                    });
                }

                function y(e, t, n, o, i, a) {
                    if ("xmlhttprequest" === t.initiatorType || "fetch" === t.initiatorType) {
                        return;
                    }
                    const l = r.parseUrl(n),
                        u = {
                            [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.resource.browser.metrics"
                        };
                    S(u, t, "transferSize", "http.response_transfer_size");
                    S(u, t, "encodedBodySize", "http.response_content_length");
                    S(u, t, "decodedBodySize", "http.decoded_response_content_length");
                    null != t.deliveryType && (u["http.response_delivery_type"] = t.deliveryType);
                    "renderBlockingStatus" in t && (u["resource.render_blocking_status"] = t.renderBlockingStatus);
                    l.protocol && (u["url.scheme"] = l.protocol.split(":").pop());
                    l.host && (u["server.address"] = l.host);
                    u["url.same_origin"] = n.includes(s.WINDOW.location.origin);;
                    const d = a + o,
                        p = d + i;
                    c.startAndEndSpan(e, d, p, {
                        name: n.replace(s.WINDOW.location.origin, ""),
                        op: t.initiatorType ? `resource.${t.initiatorType}` : "resource.other",
                        attributes: u
                    });
                }

                function S(e, t, n, r) {
                    const o = t[n];
                    null != o && o < 2147483647 && (e[r] = o);
                };;;;;;;;
            },
            4882: (e, t, n) => {
                var {
                    _optionalChain: r
                } = n(7872);
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const o = n(7872),
                    s = n(8981),
                    i = n(3872),
                    a = n(1604),
                    c = n(3851);;
            },
            8412: (e, t, n) => {
                var {
                    _optionalChain: r
                } = n(7872);
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const o = n(7872),
                    s = n(3872),
                    i = n(1604),
                    a = [],
                    c = new Map;;;;
            },
            3872: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(8981),
                    s = n(9462),
                    i = n(2637),
                    a = n(8879),
                    c = n(6505),
                    l = n(1188),
                    u = n(763),
                    d = {
                        e: d[e] || []
                    },
                    p = {
                        logout: "LOGOUT",
                        isLoggedIn: "IS_LOGGED_IN",
                        resetConfig: "RESET-CONFIG",
                        UpdateDynamicConfig: "UPDATE-CONFIG-ALL"
                    };
                let h, m, f, g, _;

                function y(e, t) {
                    const n = d[e];
                    if (n && n.length) {
                        for (const s of n) try {
                            s(t);
                        } catch (t) {
                            o.DEBUG_BUILD && r.logger.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${r.getFunctionName(s)}\nError:`, t);
                        }
                    }
                }

                function S() {
                    return s.onCLS(e => {
                        y("cls", {
                            metric: e
                        });
                        h = e;;
                    }, {
                        reportAllChanges: true
                    });
                }

                function v() {
                    return i.onFID(e => {
                        y("fid", {
                            metric: e
                        });
                        m = e;;
                    });
                }

                function b() {
                    return c.onLCP(e => {
                        y("lcp", {
                            metric: e
                        });
                        f = e;;
                    }, {
                        reportAllChanges: true
                    });
                }

                function E() {
                    return u.onTTFB(e => {
                        y("ttfb", {
                            metric: e
                        });
                        g = e;;
                    });
                }

                function T() {
                    return a.onINP(e => {
                        y("inp", {
                            metric: e
                        });
                        _ = e;;
                    });
                }

                function I(e, t, n, r, o = false) {
                    let s;
                    return C(e, t), p[e] || (s = n(), p[e] = true), r && t({
                        metric: r
                    }), w(e, t, o ? s : undefined);
                }

                function C(e, t) {
                    ;
                    d[e].push(t);;
                }

                function w(e, t, n) {
                    return () => {
                        n && n();
                        const r = d[e];
                        if (!r) {
                            return;
                        }
                        const o = r.indexOf(t); -
                        1 !== o && r.splice(o, 1);
                    };
                };;;;;;;;
            },
            1604: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7742);
            },
            9462: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1872),
                    o = n(3940),
                    s = n(1188),
                    i = n(3851),
                    a = n(9212),
                    c = n(9750),
                    l = [0.1, 0.25];;;;
            },
            2637: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1872),
                    o = n(750),
                    s = n(3940),
                    i = n(1188),
                    a = n(3851),
                    c = n(9212),
                    l = n(135),
                    u = [100, 300];
            },
            8879: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742),
                    o = n(1872),
                    s = n(3940),
                    i = n(1188),
                    a = n(3851),
                    c = n(5135),
                    l = n(135),
                    u = [200, 500],
                    d = () => c.getInteractionCount() - 0,
                    p = [],
                    h = {
                        level: "error",
                        BLOCKED: "blocked",
                        NONE: "none"
                    },
                    m = e => {
                        const t = p[p.length - 1],
                            n = h[e.interactionId];
                        if (n || p.length < 10 || t && e.duration > t.latency) {
                            if (n) {
                                n.entries.push(e);;;
                            } else {
                                const t = {
                                    id: e.interactionId,
                                    latency: e.duration,
                                    entries: [e]
                                };
                                h[t.id] = t;
                                p.push(t);;
                            }
                            p.sort((e, t) => t.latency - e.latency);
                            p.splice(10).forEach(e => {
                                delete h[e.id];
                            });;
                        }
                    };;;;
            },
            6505: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742),
                    o = n(1872),
                    s = n(2990),
                    i = n(750),
                    a = n(3940),
                    c = n(1188),
                    l = n(3851),
                    u = n(9212),
                    d = n(135),
                    p = [2500, 4e3],
                    h = {};;;;
            },
            1872: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            7295: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            2990: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(5476);;
            },
            5476: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742);;
            },
            750: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742);
                let o = -1;
                const s = e => {
                    "hidden" === r.WINDOW.document.visibilityState && o > -1 && (o = "visibilitychange" === e.type ? e.timeStamp : 0, removeEventListener("visibilitychange", s, true), removeEventListener("prerenderingchange", s, true));
                };;
            },
            3940: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742),
                    o = n(7295),
                    s = n(2990),
                    i = n(5476);;
            },
            1188: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            3851: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742);;
            },
            5135: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1188);
                let o = 0,
                    s = Infinity,
                    i = 0;
                const a = e => {
                    e.forEach(e => {
                        e.interactionId && (s = Math.min(s, e.interactionId), i = Math.max(i, e.interactionId), o = i ? (i - s) / 7 + 1 : 0);
                    });
                };
                let c;;;;
            },
            9212: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            135: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742);;
            },
            9750: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1872),
                    o = n(2990),
                    s = n(750),
                    i = n(3940),
                    a = n(1188),
                    c = n(135),
                    l = [1800, 3e3];;;;
            },
            763: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7742),
                    o = n(1872),
                    s = n(2990),
                    i = n(5476),
                    a = n(3940),
                    c = n(135),
                    l = [800, 1800],
                    u = e => {
                        r.WINDOW.document && r.WINDOW.document.prerendering ? c.whenActivated(() => u(e)) : r.WINDOW.document && "complete" !== r.WINDOW.document.readyState ? addEventListener("load", () => u(e), true) : setTimeout(e, 0);
                    };;;;
            },
            7742: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872).GLOBAL_OBJ;;
            },
            6532: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = r.GLOBAL_OBJ,
                    s = o.document,
                    i = o.navigator,
                    c = (e, t = {
                        includeReplay: true
                    }) => {
                        if (!e.message) {
                            throw new Error("Unable to submit feedback with empty message");
                        }
                        const n = r.getClient();
                        if (!n) {
                            throw new Error("No client setup, cannot send feedback.");
                        }
                        e.tags && Object.keys(e.tags).length && r.getCurrentScope().setTags(e.tags);
                        const o = r.captureFeedback({
                            source: "api",
                            url: r.getLocationHref(),
                            ...e
                        }, t);
                        return new Promise((e, t) => {
                            const r = setTimeout(() => t("Unable to determine if Feedback was correctly sent."), 5e3),
                                s = n.on("afterSendEvent", (n, i) => {
                                    if (n.event_id === o) {
                                        return clearTimeout(r), s(), i && "number" == typeof i.statusCode && i.statusCode >= 200 && i.statusCode < 300 && e(o), i && "number" == typeof i.statusCode && 0 === i.statusCode ? t("Unable to send Feedback. This is because of network issues, or because you are using an ad-blocker.") : i && "number" == typeof i.statusCode && 403 === i.statusCode ? t("Unable to send Feedback. This could be because this domain is not in your list of allowed domains.") : t("Unable to send Feedback. This could be because of network issues, or because you are using an ad-blocker");
                                    }
                                });
                        });
                    },
                    l = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;

                function u(e, t) {
                    return {
                        ...e,
                        ...t,
                        tags: {
                            ...e.tags,
                            ...t.tags
                        },
                        onFormOpen: () => {
                            t.onFormOpen && t.onFormOpen();
                            e.onFormOpen && e.onFormOpen();;
                        },
                        onFormClose: () => {
                            t.onFormClose && t.onFormClose();
                            e.onFormClose && e.onFormClose();;
                        },
                        onSubmitSuccess: n => {
                            t.onSubmitSuccess && t.onSubmitSuccess(n);
                            e.onSubmitSuccess && e.onSubmitSuccess(n);;
                        },
                        onSubmitError: n => {
                            t.onSubmitError && t.onSubmitError(n);
                            e.onSubmitError && e.onSubmitError(n);;
                        },
                        onFormSubmitted: () => {
                            t.onFormSubmitted && t.onFormSubmitted();
                            e.onFormSubmitted && e.onFormSubmitted();;
                        },
                        themeDark: {
                            ...e.themeDark,
                            ...t.themeDark
                        },
                        themeLight: {
                            ...e.themeLight,
                            ...t.themeLight
                        }
                    };
                }

                function d(e, t) {
                    return Object.entries(t).forEach(([t, n]) => {
                        e.setAttributeNS(null, t, n);
                    }), e;
                }
                const h = {
                        foreground: "#2b2233",
                        background: "#ffffff",
                        accentForeground: "white",
                        accentBackground: "rgba(88, 74, 192, 1)",
                        successColor: "#268d75",
                        errorColor: "#df3338",
                        border: "1.5px solid rgba(41, 35, 47, 0.13)",
                        boxShadow: "0px 4px 24px 0px rgba(43, 34, 51, 0.12)",
                        outline: "1px auto var(--accent-background)",
                        interactiveFilter: "brightness(95%)"
                    },
                    m = {
                        foreground: "#ebe6ef",
                        background: "#29232f",
                        accentForeground: "white",
                        accentBackground: "rgba(88, 74, 192, 1)",
                        successColor: "#2da98c",
                        errorColor: "#f55459",
                        border: "1.5px solid rgba(235, 230, 239, 0.15)",
                        boxShadow: "0px 4px 24px 0px rgba(43, 34, 51, 0.12)",
                        outline: "1px auto var(--accent-background)",
                        interactiveFilter: "brightness(150%)"
                    };

                function f(e) {
                    return `\n  --foreground: ${e.foreground};\n  --background: ${e.background};\n  --accent-foreground: ${e.accentForeground};\n  --accent-background: ${e.accentBackground};\n  --success-color: ${e.successColor};\n  --error-color: ${e.errorColor};\n  --border: ${e.border};\n  --box-shadow: ${e.boxShadow};\n  --outline: ${e.outline};\n  --interactive-filter: ${e.interactiveFilter};\n  `;
                }
                var g, _, y, S, v, b, E, T = {
                        current: {
                            initialX: e.clientX,
                            initialY: e.clientY
                        }
                    },
                    I = [],
                    w = Array.isArray;

                function k(e, t) {
                    for (var n in t) e[n] = t[n];
                    return e;
                }

                function A(e) {
                    var t = e.parentNode;
                    t && t.removeChild(e);
                }

                function M(e, t, n) {
                    var r, o, s, i = {
                        ariaHidden: "false",
                        ariaHidden: "true"
                    };
                    for (s in t) "key" == s ? r = t[s] : "ref" == s ? o = t[s] : i[s] = t[s];
                    if (arguments.length > 2 && (i.children = arguments.length > 3 ? g.call(arguments, 2) : n), "function" == typeof e && null != e.defaultProps) {
                        for (s in e.defaultProps) undefined === i[s] && (i[s] = e.defaultProps[s]);
                    }
                    return x(e, i, r, o, null);
                }

                function x(e, t, n, r, o) {
                    var s = {
                        type: e,
                        props: t,
                        key: n,
                        ref: r,
                        __k: null,
                        __: null,
                        __b: 0,
                        __e: null,
                        __d: undefined,
                        __c: null,
                        constructor: undefined,
                        __v: null == o ? ++y : o,
                        __i: -1,
                        __u: 0
                    };
                    return null == o && null != _.vnode && _.vnode(s), s;
                }

                function O(e) {
                    return e.children;
                }

                function R(e, t) {
                    this.props = e;
                    this.context = t;;
                }

                function D(e, t) {
                    if (null == t) {
                        return e.__ ? D(e.__, e.__i + 1) : null;
                    }
                    for (var n; t < e.__k.length; t++) {
                        if (null != (n = e.__k[t]) && null != n.__e) {
                            return n.__e;
                        }
                    }
                    return "function" == typeof e.type ? D(e) : null;
                }

                function N(e, t, n) {
                    var r, o = e.__v,
                        s = o.__e,
                        i = e.__P;
                    if (i) {
                        return (r = k({}, o)).__v = o.__v + 1, _.vnode && _.vnode(r), z(i, r, o, e.__n, undefined !== i.ownerSVGElement, 32 & o.__u ? [s] : null, t, null == s ? D(o) : s, !!(32 & o.__u), n), r.__.__k[r.__i] = r, r.__d = undefined, r.__e != s && P(r), r;
                    }
                }

                function P(e) {
                    var t, n;
                    if (null != (e = e.__) && null != e.__c) {
                        for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) {
                            if (null != (n = e.__k[t]) && null != n.__e) {
                                e.__e = e.__c.base = n.__e;
                                break;
                            }
                        }
                        return P(e);
                    }
                }

                function L(e) {
                    (!e.__d && (e.__d = true) && S.push(e) && !U.__r++ || v !== _.debounceRendering) && ((v = _.debounceRendering) || b)(U);
                }

                function U() {
                    var e, t, n, r = [],
                        o = [];
                    for (S.sort(E); e = S.shift();) {
                        e.__d && (n = S.length, t = N(e, r, o) || t, 0 === n || S.length > n ? (q(r, t, o), o.length = r.length = 0, t = undefined, S.sort(E)) : t && _.__c && _.__c(t, I));
                    }
                    t && q(r, t, o);
                    U.__r = 0;;
                }

                function B(e, t, n, r, o, s, i, a, c, l, u) {
                    var d, p, h, m, f, g = r && r.__k || I,
                        _ = t.length;
                    for (n.__d = c, function(e, t, n) {
                            var r, o, s, i, a, c = t.length,
                                l = n.length,
                                u = l,
                                d = 0;
                            for (e.__k = [], r = 0; r < c; r++) {
                                null != (o = e.__k[r] = null == (o = t[r]) || "boolean" == typeof o || "function" == typeof o ? null : "string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? x(null, o, null, null, o) : w(o) ? x(O, {
                                    children: o
                                }, null, null, null) : undefined === o.constructor && o.__b > 0 ? x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o) ? (o.__ = e, o.__b = e.__b + 1, a = H(o, n, i = r + d, u), o.__i = a, s = null, -1 !== a && (u--, (s = n[a]) && (s.__u |= 131072)), null == s || null === s.__v ? (-1 == a && d--, "function" != typeof o.type && (o.__u |= 65536)) : a !== i && (a === i + 1 ? d++ : a > i ? u > c - i ? d += a - i : d-- : d = a < i && a == i - 1 ? a - i : 0, a !== r + d && (o.__u |= 65536))) : (s = n[r]) && null == s.key && s.__e && (s.__e == e.__d && (e.__d = D(s)), J(s, s, false), n[r] = null, u--);
                            }
                            if (u) {
                                for (r = 0; r < l; r++) {
                                    null != (s = n[r]) && !(131072 & s.__u) && (s.__e == e.__d && (e.__d = D(s)), J(s, s));
                                }
                            }
                        }(n, t, g), c = n.__d, d = 0; d < _; d++) {
                        null != (h = n.__k[d]) && "boolean" != typeof h && "function" != typeof h && (p = -1 === h.__i ? T : g[h.__i] || T, h.__i = d, z(e, h, p, o, s, i, a, c, l, u), m = h.__e, h.ref && p.ref != h.ref && (p.ref && V(p.ref, null, h), u.push(h.ref, h.__c || m, h)), null == f && null != m && (f = m), 65536 & h.__u || p.__k === h.__k ? c = F(h, c, e) : "function" == typeof h.type && undefined !== h.__d ? c = h.__d : m && (c = m.nextSibling), h.__d = undefined, h.__u &= -196609);
                    };;;
                }

                function F(e, t, n) {
                    var r, o;
                    if ("function" == typeof e.type) {
                        for (r = e.__k, o = 0; r && o < r.length; o++) {
                            r[o] && (r[o].__ = e, t = F(r[o], t, n));
                        }
                        return t;
                    }
                    if (e.__e != t) {
                        n.insertBefore(e.__e, t || null);
                        t = e.__e;
                    }
                    do {
                        t = t && t.nextSibling;
                    } while (null != t && 8 === t.nodeType);
                    return t;
                }

                function H(e, t, n, r) {
                    var o = e.key,
                        s = e.type,
                        i = n - 1,
                        a = n + 1,
                        c = t[n];
                    if (null === c || c && o == c.key && s === c.type) {
                        return n;
                    }
                    if (r > (null == c || 131072 & c.__u ? 0 : 1)) {
                        for (; i >= 0 || a < t.length;) {
                            if (i >= 0) {
                                if ((c = t[i]) && !(131072 & c.__u) && o == c.key && s === c.type) {
                                    return i;
                                }
                                i--;
                            }
                            if (a < t.length) {
                                if ((c = t[a]) && !(131072 & c.__u) && o == c.key && s === c.type) {
                                    return a;
                                }
                                a++;
                            }
                        }
                    }
                    return -1;
                }

                function j(e, t, n) {
                    "-" === t[0] ? e.setProperty(t, null == n ? "" : n) : e[t] = null == n ? "" : "number" != typeof n || /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i.test(t) ? n : n + "px";
                }

                function W(e, t, n, r, o) {
                    var s;
                    e: if ("style" === t) {
                        if ("string" == typeof n) {
                            e.style.cssText = n;
                        } else {
                            if ("string" == typeof r && (e.style.cssText = r = ""), r) {
                                for (t in r) n && t in n || j(e.style, t, "");
                            }
                            if (n) {
                                for (t in n) r && n[t] === r[t] || j(e.style, t, n[t]);
                            }
                        }
                    } else {
                        if ("o" === t[0] && "n" === t[1]) {
                            s = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1"));
                            t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2);
                            e.l || (e.l = {});
                            e.l[t + s] = n;
                            n ? r ? n.u = r.u : (n.u = Date.now(), e.addEventListener(t, s ? $ : G, s)) : e.removeEventListener(t, s ? $ : G, s);;
                        } else {
                            if (o) {
                                t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
                            } else {
                                if ("width" !== t && "height" !== t && "href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && "rowSpan" !== t && "colSpan" !== t && "role" !== t && t in e) {
                                    try {
                                        e[t] = null == n ? "" : n;
                                        break e;
                                    } catch (e) {}
                                }
                            }
                            "function" == typeof n || (null == n || false === n && "-" !== t[4] ? e.removeAttribute(t) : e.setAttribute(t, n));
                        }
                    }
                }

                function G(e) {
                    if (this.l) {
                        var t = this.l[e.type + false];
                        if (e.t) {
                            if (e.t <= t.u) {
                                return;
                            }
                        } else {
                            e.t = Date.now();
                        }
                        return t(_.event ? _.event(e) : e);
                    }
                }

                function $(e) {
                    if (this.l) {
                        return this.l[e.type + true](_.event ? _.event(e) : e);
                    }
                }

                function z(e, t, n, r, o, s, i, a, c, l) {
                    var u, d, p, h, m, f, g, y, S, v, b, E, T, I, C, A = t.type;
                    if (undefined !== t.constructor) {
                        return null;
                    }
                    if (128 & n.__u) {
                        c = !!(32 & n.__u);
                        s = [a = t.__e = n.__e];
                    }
                    (u = _.__b) && u(t);;
                    e: if ("function" == typeof A) {
                            try {
                                if (y = t.props, S = (u = A.contextType) && r[u.__c], v = u ? S ? S.props.value : u.__ : r, n.__c ? g = (d = t.__c = n.__c).__ = d.__E : ("prototype" in A && A.prototype.render ? t.__c = d = new A(y, v) : (t.__c = d = new R(y, v), d.constructor = A, d.render = K), S && S.sub(d), d.props = y, d.state || (d.state = {}), d.context = v, d.__n = r, p = d.__d = true, d.__h = [], d._sb = []), null == d.__s && (d.__s = d.state), null != A.getDerivedStateFromProps && (d.__s == d.state && (d.__s = k({}, d.__s)), k(d.__s, A.getDerivedStateFromProps(y, d.__s))), h = d.props, m = d.state, d.__v = t, p) {
                                    null == A.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount();
                                    null != d.componentDidMount && d.__h.push(d.componentDidMount);;
                                } else {
                                    if (null == A.getDerivedStateFromProps && y !== h && null != d.componentWillReceiveProps && d.componentWillReceiveProps(y, v), !d.__e && (null != d.shouldComponentUpdate && false === d.shouldComponentUpdate(y, d.__s, v) || t.__v === n.__v)) {
                                        for (t.__v !== n.__v && (d.props = y, d.state = d.__s, d.__d = false), t.__e = n.__e, t.__k = n.__k, t.__k.forEach(function(e) {
                                                e && (e.__ = t);
                                            }), b = 0; b < d._sb.length; b++) {
                                            d.__h.push(d._sb[b]);
                                        };
                                        d.__h.length && i.push(d);;
                                        break e;
                                    }
                                    null != d.componentWillUpdate && d.componentWillUpdate(y, d.__s, v);
                                    null != d.componentDidUpdate && d.__h.push(function() {
                                        d.componentDidUpdate(h, m, f);
                                    });;
                                }
                                if (d.context = v, d.props = y, d.__P = e, d.__e = false, E = _.__r, T = 0, "prototype" in A && A.prototype.render) {
                                    for (d.state = d.__s, d.__d = false, E && E(t), u = d.render(d.props, d.state, d.context), I = 0; I < d._sb.length; I++) {
                                        d.__h.push(d._sb[I]);
                                    };
                                } else {
                                    do {
                                        ;
                                        E && E(t);
                                        u = d.render(d.props, d.state, d.context);;;
                                    } while (d.__d && ++T < 25);
                                };
                                null != d.getChildContext && (r = k(k({}, r), d.getChildContext()));
                                p || null == d.getSnapshotBeforeUpdate || (f = d.getSnapshotBeforeUpdate(h, m));
                                B(e, w(C = null != u && u.type === O && null == u.key ? u.props.children : u) ? C : [C], t, n, r, o, s, i, a, c, l);;;
                                d.__h.length && i.push(d);
                                g && (d.__E = d.__ = null);;
                            } catch (e) {
                                ;
                                c || null != s ? (t.__e = a, t.__u |= c ? 160 : 32, s[s.indexOf(a)] = null) : (t.__e = n.__e, t.__k = n.__k);
                                _.__e(e, t, n);;
                            }
                        } else {
                            null == s && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = Y(n.__e, t, n, r, o, s, i, c, l);
                        }
                        (u = _.diffed) && u(t);
                }

                function q(e, t, n) {
                    for (var r = 0; r < n.length; r++) {
                        V(n[r], n[++r], n[++r]);
                    }
                    _.__c && _.__c(t, e);
                    e.some(function(t) {
                        try {
                            e = t.__h;;
                            e.some(function(e) {
                                e.call(t);
                            });;
                        } catch (e) {
                            _.__e(e, t.__v);
                        }
                    });;
                }

                function Y(e, t, n, r, o, s, i, a, c) {
                    var l, u, d, p, h, m, f, _ = n.props,
                        y = t.props,
                        S = t.type;
                    if ("svg" === S && (o = true), null != s) {
                        for (l = 0; l < s.length; l++) {
                            if ((h = s[l]) && "setAttribute" in h == !!S && (S ? h.localName === S : 3 === h.nodeType)) {
                                e = h;;;
                                break;
                            }
                        }
                    }
                    if (null == e) {
                        if (null === S) {
                            return document.createTextNode(y);
                        }
                        e = o ? document.createElementNS("http://www.w3.org/2000/svg", S) : document.createElement(S, y.is && y);
                        s = null;
                        a = false;;
                    }
                    if (null === S) {
                        _ === y || a && e.data === y || (e.data = y);
                    } else {
                        if (s = s && g.call(e.childNodes), _ = n.props || T, !a && null != s) {
                            for (_ = {}, l = 0; l < e.attributes.length; l++) {
                                _[(h = e.attributes[l]).name] = h.value;
                            }
                        }
                        for (l in _) h = _[l], "children" == l || ("dangerouslySetInnerHTML" == l ? d = h : "key" === l || l in y || W(e, l, null, h, o));
                        for (l in y) h = y[l], "children" == l ? p = h : "dangerouslySetInnerHTML" == l ? u = h : "value" == l ? m = h : "checked" == l ? f = h : "key" === l || a && "function" != typeof h || _[l] === h || W(e, l, h, _[l], o);
                        if (u) {
                            a || d && (u.__html === d.__html || u.__html === e.innerHTML) || (e.innerHTML = u.__html);;;
                        } else {
                            if (d && (e.innerHTML = ""), B(e, w(p) ? p : [p], t, n, r, o && "foreignObject" !== S, s, i, s ? s[0] : n.__k && D(n, 0), a, c), null != s) {
                                for (l = s.length; l--;) {
                                    null != s[l] && A(s[l]);
                                }
                            }
                        }
                        a || (l = "value", undefined !== m && (m !== e[l] || "progress" === S && !m || "option" === S && m !== _[l]) && W(e, l, m, _[l], false), l = "checked", undefined !== f && f !== e[l] && W(e, l, f, _[l], false));
                    }
                    return e;
                }

                function V(e, t, n) {
                    try {
                        "function" == typeof e ? e(t) : e.current = t;
                    } catch (e) {
                        _.__e(e, n);
                    }
                }

                function J(e, t, n) {
                    var r, o;
                    if (_.unmount && _.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || V(r, null, t)), null != (r = e.__c)) {
                        if (r.componentWillUnmount) {
                            try {
                                r.componentWillUnmount();
                            } catch (e) {
                                _.__e(e, t);
                            }
                        };
                        e.__c = undefined;;
                    }
                    if (r = e.__k) {
                        for (o = 0; o < r.length; o++) {
                            r[o] && J(r[o], t, n || "function" != typeof e.type);
                        }
                    }
                    n || null == e.__e || A(e.__e);
                    e.__ = e.__e = e.__d = undefined;;
                }
                g = I.slice;
                _ = {
                    __e: function(e, t, n, r) {
                        for (var o, s, i; t = t.__;) {
                            if ((o = t.__c) && !o.__) {
                                try {
                                    if ((s = o.constructor) && null != s.getDerivedStateFromError && (o.setState(s.getDerivedStateFromError(e)), i = o.__d), null != o.componentDidCatch && (o.componentDidCatch(e, r || {}), i = o.__d), i) {
                                        return o.__E = o;
                                    }
                                } catch (t) {
                                    e = t;
                                }
                            }
                        }
                        throw e;
                    }
                };
                y = 0;
                R.prototype.setState = function(e, t) {
                    var n;
                    n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = k({}, this.state);
                    "function" == typeof e && (e = e(k({}, n), this.props));
                    e && k(n, e);
                    null != e && this.__v && (t && this._sb.push(t), L(this));;
                };
                R.prototype.forceUpdate = function(e) {
                    this.__v && (this.__e = true, e && this.__h.push(e), L(this));
                };
                R.prototype.render = O;
                S = [];
                b = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
                E = function(e, t) {
                    return e.__v.__b - t.__v.__b;
                };
                U.__r = 0;;
                var X, Z, Q, ee, te = 0,
                    ne = [],
                    re = [],
                    oe = _,
                    se = oe.__b,
                    ie = oe.__r,
                    ae = oe.diffed,
                    ce = oe.__c,
                    le = oe.unmount,
                    ue = oe.__;

                function de(e, t) {
                    oe.__h && oe.__h(Z, e, te || t);
                    te = 0;;
                    var n = Z.__H || (Z.__H = {
                        __: [],
                        __h: []
                    });
                    return e >= n.__.length && n.__.push({
                        __V: re
                    }), n.__[e];
                }

                function he(e, t, n) {
                    var r = de(X++, 2);
                    if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Te(undefined, t), function(e) {
                            var t = r.__N ? r.__N[0] : r.__[0],
                                n = r.t(t, e);
                            if (t !== n) {
                                ;
                                r.__c.setState({});
                            }
                        }], r.__c = Z, !Z.u)) {
                        var o = function(e, t, n) {
                            if (!r.__c.__H) {
                                return true;
                            }
                            var o = r.__c.__H.__.filter(function(e) {
                                return !!e.__c;
                            });
                            if (o.every(function(e) {
                                    return !e.__N;
                                })) {
                                return !s || s.call(this, e, t, n);
                            }
                            var i = false;
                            return o.forEach(function(e) {
                                if (e.__N) {
                                    var t = e.__[0];
                                    e.__ = e.__N;
                                    e.__N = undefined;
                                    t !== e.__[0] && (i = true);;
                                }
                            }), !(!i && r.__c.props === e) && (!s || s.call(this, e, t, n));
                        };
                        Z.u = true;
                        var s = Z.shouldComponentUpdate,
                            i = Z.componentWillUpdate;
                        Z.componentWillUpdate = function(e, t, n) {
                            if (this.__e) {
                                var r = s;
                                s = undefined;
                                o(e, t, n);
                                s = r;;
                            }
                            i && i.call(this, e, t, n);
                        };
                        Z.shouldComponentUpdate = o;;
                    }
                    return r.__N || r.__;
                }

                function me(e, t) {
                    var n = de(X++, 4);
                    !oe.__s && Ee(n.__H, t) && (n.__ = e, n.i = t, Z.__h.push(n));
                }

                function fe(e, t) {
                    var n = de(X++, 7);
                    return Ee(n.__H, t) ? (n.__V = e(), n.i = t, n.__h = e, n.__V) : n.__;
                }

                function ge(e, t) {
                    return te = 8, fe(function() {
                        return e;
                    }, t);
                }

                function _e() {
                    for (var e; e = ne.shift();) {
                        if (e.__P && e.__H) {
                            try {
                                e.__H.__h.forEach(ve);
                                e.__H.__h.forEach(be);
                                e.__H.__h = [];;
                            } catch (t) {
                                e.__H.__h = [];
                                oe.__e(t, e.__v);;
                            }
                        }
                    }
                }
                oe.__b = function(e) {
                    Z = null;
                    se && se(e);;
                };
                oe.__ = function(e, t) {
                    t.__k && t.__k.__m && (e.__m = t.__k.__m);
                    ue && ue(e, t);;
                };
                oe.__r = function(e) {
                    ie && ie(e);
                    X = 0;;
                    var t = (Z = e.__c).__H;
                    t && (Q === Z ? (t.__h = [], Z.__h = [], t.__.forEach(function(e) {
                        e.__N && (e.__ = e.__N);
                        e.__V = re;
                        e.__N = e.i = undefined;;
                    })) : (t.__h.forEach(ve), t.__h.forEach(be), t.__h = [], X = 0));
                    Q = Z;;
                };
                oe.diffed = function(e) {
                    ae && ae(e);
                    var t = e.__c;
                    t && t.__H && (t.__H.__h.length && (1 !== ne.push(t) && ee === oe.requestAnimationFrame || ((ee = oe.requestAnimationFrame) || Se)(_e)), t.__H.__.forEach(function(e) {
                        e.i && (e.__H = e.i);
                        e.__V !== re && (e.__ = e.__V);
                        e.i = undefined;
                        e.__V = re;;
                    }));
                    Q = Z = null;;
                };
                oe.__c = function(e, t) {
                    t.some(function(e) {
                        try {
                            e.__h.forEach(ve);
                            e.__h = e.__h.filter(function(e) {
                                return !e.__ || be(e);
                            });;
                        } catch (n) {
                            t.some(function(e) {
                                e.__h && (e.__h = []);
                            });
                            t = [];
                            oe.__e(n, e.__v);;
                        }
                    });
                    ce && ce(e, t);;
                };
                oe.unmount = function(e) {
                    le && le(e);
                    var t, n = e.__c;
                    n && n.__H && (n.__H.__.forEach(function(e) {
                        try {
                            ve(e);
                        } catch (e) {
                            t = e;
                        }
                    }), n.__H = undefined, t && oe.__e(t, n.__v));
                };;
                var ye = "function" == typeof requestAnimationFrame;

                function Se(e) {
                    var t, n = function() {
                            clearTimeout(r);
                            ye && cancelAnimationFrame(t);
                            setTimeout(e);;
                        },
                        r = setTimeout(n, 100);
                    ye && (t = requestAnimationFrame(n));
                }

                function ve(e) {
                    var t = Z,
                        n = e.__c;
                    if ("function" == typeof n) {
                        e.__c = undefined;
                        n();
                    }
                    Z = t;;
                }

                function be(e) {
                    var t = Z;
                    e.__c = e.__();
                    Z = t;;
                }

                function Ee(e, t) {
                    return !e || e.length !== t.length || t.some(function(t, n) {
                        return t !== e[n];
                    });
                }

                function Te(e, t) {
                    return "function" == typeof t ? t(e) : t;
                }
                const Ie = {
                    __proto__: null,
                    useCallback: ge,
                    useContext: function(e) {
                        var t = Z.context[e.__c],
                            n = de(X++, 9);
                        return n.c = e, t ? (null == n.__ && (n.__ = true, t.sub(Z)), t.props.value) : e.__;
                    },
                    useDebugValue: function(e, t) {
                        oe.useDebugValue && oe.useDebugValue(t ? t(e) : e);
                    },
                    useEffect: function(e, t) {
                        var n = de(X++, 3);
                        !oe.__s && Ee(n.__H, t) && (n.__ = e, n.i = t, Z.__H.__h.push(n));
                    },
                    useErrorBoundary: function(e) {
                        var t = de(X++, 10),
                            n = (te = 1, he(Te, e));
                        return t.__ = e, Z.componentDidCatch || (Z.componentDidCatch = function(e, r) {
                            t.__ && t.__(e, r);
                            n[1](e);;
                        }), [n[0], function() {
                            n[1](undefined);
                        }];
                    },
                    useId: function() {
                        var e = de(X++, 11);
                        if (!e.__) {
                            for (var t = Z.__v; null !== t && !t.__m && null !== t.__;) {
                                t = t.__;
                            }
                            var n = t.__m || (t.__m = [0, 0]);
                            e.__ = "P" + n[0] + "-" + n[1]++;
                        }
                        return e.__;
                    },
                    useImperativeHandle: function(e, t, n) {
                        te = 6;
                        me(function() {
                            return "function" == typeof e ? (e(t()), function() {
                                return e(null);
                            }) : e ? (e.current = t(), function() {
                                return e.current = null;
                            }) : undefined;
                        }, null == n ? n : n.concat(e));;
                    },
                    useLayoutEffect: me,
                    useMemo: fe,
                    useReducer: he,
                    useRef: function(e) {
                        return te = 5, fe(function() {
                            return {
                                current: e
                            };
                        }, []);
                    },
                    useState: pe
                };

                function Ce() {
                    const e = e => s.createElementNS("http://www.w3.org/2000/svg", e),
                        t = d(e("svg"), {
                            width: "32",
                            height: "30",
                            viewBox: "0 0 72 66",
                            fill: "inherit"
                        }),
                        n = d(e("path"), {
                            transform: "translate(11, 11)",
                            d: "M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"
                        });
                    return t.appendChild(n), t;
                }

                function we({
                    options: e
                }) {
                    const t = fe(() => ({
                        __html: Ce().outerHTML
                    }), []);
                    return M("h2", {
                        class: "dialog__header"
                    }, M("span", {
                        class: "dialog__title"
                    }, e.formTitle), e.showBranding ? M("a", {
                        class: "brand-link",
                        target: "_blank",
                        href: "https://sentry.io/welcome/",
                        title: "Powered by Sentry",
                        rel: "noopener noreferrer",
                        dangerouslySetInnerHTML: t
                    }) : null);
                }

                function ke(e, t) {
                    const n = e.get(t);
                    return "string" == typeof n ? n.trim() : "";
                }

                function Ae({
                    options: e,
                    defaultEmail: t,
                    defaultName: n,
                    onFormClose: o,
                    onSubmit: s,
                    onSubmitSuccess: i,
                    onSubmitError: a,
                    showEmail: c,
                    showName: u,
                    screenshotInput: d
                }) {
                    const {
                        tags: p,
                        addScreenshotButtonLabel: h,
                        removeScreenshotButtonLabel: m,
                        cancelButtonLabel: f,
                        emailLabel: g,
                        emailPlaceholder: _,
                        isEmailRequired: y,
                        isNameRequired: S,
                        messageLabel: v,
                        messagePlaceholder: b,
                        nameLabel: E,
                        namePlaceholder: T,
                        submitButtonLabel: I,
                        isRequiredLabel: C
                    } = e, [w, k] = (te = 1, he(Te, null)), [A, x] = (te = 1, he(Te, false)), O = d && d.input, [R, D] = (te = 1, he(Te, null)), N = ge(e => {
                        D(e);
                        x(false);;
                    }, []), P = ge(e => {
                        const t = function(e, t) {
                            const n = [];
                            return t.isNameRequired && !e.name && n.push(t.nameLabel), t.isEmailRequired && !e.email && n.push(t.emailLabel), e.message || n.push(t.messageLabel), n;
                        }(e, {
                            emailLabel: g,
                            isEmailRequired: y,
                            isNameRequired: S,
                            messageLabel: v,
                            nameLabel: E
                        });
                        return t.length > 0 ? k(`Please enter in the following required fields: ${t.join(", ")}`) : k(null), 0 === t.length;
                    }, [g, y, S, v, E]), L = ge(async e => {
                        try {
                            if (e.preventDefault(), !(e.target instanceof HTMLFormElement)) {
                                return;
                            }
                            const t = new FormData(e.target),
                                n = await (d && A ? d.value() : undefined),
                                o = {
                                    name: ke(t, "name"),
                                    email: ke(t, "email"),
                                    message: ke(t, "message"),
                                    attachments: n ? [n] : undefined
                                };
                            if (!P(o)) {
                                return;
                            }
                            try {
                                await s({
                                    name: o.name,
                                    email: o.email,
                                    message: o.message,
                                    source: "widget",
                                    tags: p
                                }, {
                                    attachments: o.attachments
                                });
                                i(o);;
                            } catch (e) {
                                l && r.logger.error(e);
                                k(e);
                                a(e);;
                            }
                        } catch (e) {}
                    }, [d && A, i, a]);
                    return M("form", {
                        class: "form",
                        onSubmit: L
                    }, O && A ? M(O, {
                        onError: N
                    }) : null, M("div", {
                        class: "form__right",
                        "data-sentry-feedback": true
                    }, M("div", {
                        class: "form__top"
                    }, w ? M("div", {
                        class: "form__error-container"
                    }, w) : null, u ? M("label", {
                        for: "name",
                        class: "form__label"
                    }, M(Me, {
                        label: E,
                        isRequiredLabel: C,
                        isRequired: S
                    }), M("input", {
                        class: "form__input",
                        defaultValue: n,
                        id: "name",
                        name: "name",
                        placeholder: T,
                        required: S,
                        type: "text"
                    })) : M("input", {
                        "aria-hidden": true,
                        value: n,
                        name: "name",
                        type: "hidden"
                    }), c ? M("label", {
                        for: "email",
                        class: "form__label"
                    }, M(Me, {
                        label: g,
                        isRequiredLabel: C,
                        isRequired: y
                    }), M("input", {
                        class: "form__input",
                        defaultValue: t,
                        id: "email",
                        name: "email",
                        placeholder: _,
                        required: y,
                        type: "email"
                    })) : M("input", {
                        "aria-hidden": true,
                        value: t,
                        name: "email",
                        type: "hidden"
                    }), M("label", {
                        for: "message",
                        class: "form__label"
                    }, M(Me, {
                        label: v,
                        isRequiredLabel: C,
                        isRequired: true
                    }), M("textarea", {
                        autoFocus: true,
                        class: "form__input form__input--textarea",
                        id: "message",
                        name: "message",
                        placeholder: b,
                        required: true,
                        rows: 5
                    })), O ? M("label", {
                        for: "screenshot",
                        class: "form__label"
                    }, M("button", {
                        class: "btn btn--default",
                        type: "button",
                        onClick: () => {
                            D(null);
                            x(e => !e);;
                        }
                    }, A ? m : h), R ? M("div", {
                        class: "form__error-container"
                    }, R.message) : null) : null), M("div", {
                        class: "btn-group"
                    }, M("button", {
                        class: "btn btn--primary",
                        type: "submit"
                    }, I), M("button", {
                        class: "btn btn--default",
                        type: "button",
                        onClick: o
                    }, f))));
                }

                function Me({
                    label: e,
                    isRequired: t,
                    isRequiredLabel: n
                }) {
                    return M("span", {
                        class: "form__label__text"
                    }, e, t && M("span", {
                        class: "form__label__text--required"
                    }, n));
                }

                function xe() {
                    const e = e => o.document.createElementNS("http://www.w3.org/2000/svg", e),
                        t = d(e("svg"), {
                            width: "16",
                            height: "17",
                            viewBox: "0 0 16 17",
                            fill: "inherit"
                        }),
                        n = d(e("g"), {
                            clipPath: "url(#clip0_57_156)"
                        }),
                        r = d(e("path"), {
                            "fill-rule": "evenodd",
                            "clip-rule": "evenodd",
                            d: "M3.55544 15.1518C4.87103 16.0308 6.41775 16.5 8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.91775 15.5308 5.37103 14.6518 4.05544C13.7727 2.73985 12.5233 1.71447 11.0615 1.10897C9.59966 0.503466 7.99113 0.34504 6.43928 0.653721C4.88743 0.962403 3.46197 1.72433 2.34315 2.84315C1.22433 3.96197 0.462403 5.38743 0.153721 6.93928C-0.15496 8.49113 0.00346625 10.0997 0.608967 11.5615C1.21447 13.0233 2.23985 14.2727 3.55544 15.1518ZM4.40546 3.1204C5.46945 2.40946 6.72036 2.03 8 2.03C9.71595 2.03 11.3616 2.71166 12.575 3.92502C13.7883 5.13838 14.47 6.78405 14.47 8.5C14.47 9.77965 14.0905 11.0306 13.3796 12.0945C12.6687 13.1585 11.6582 13.9878 10.476 14.4775C9.29373 14.9672 7.99283 15.0953 6.73777 14.8457C5.48271 14.596 4.32987 13.9798 3.42502 13.075C2.52018 12.1701 1.90397 11.0173 1.65432 9.76224C1.40468 8.50718 1.5328 7.20628 2.0225 6.02404C2.5122 4.8418 3.34148 3.83133 4.40546 3.1204Z"
                        }),
                        s = d(e("path"), {
                            d: "M6.68775 12.4297C6.78586 12.4745 6.89218 12.4984 7 12.5C7.11275 12.4955 7.22315 12.4664 7.32337 12.4145C7.4236 12.3627 7.51121 12.2894 7.58 12.2L12 5.63999C12.0848 5.47724 12.1071 5.28902 12.0625 5.11098C12.0178 4.93294 11.9095 4.77744 11.7579 4.67392C11.6064 4.57041 11.4221 4.52608 11.24 4.54931C11.0579 4.57254 10.8907 4.66173 10.77 4.79999L6.88 10.57L5.13 8.56999C5.06508 8.49566 4.98613 8.43488 4.89768 8.39111C4.80922 8.34735 4.713 8.32148 4.61453 8.31498C4.51605 8.30847 4.41727 8.32147 4.32382 8.35322C4.23038 8.38497 4.14413 8.43484 4.07 8.49999C3.92511 8.63217 3.83692 8.81523 3.82387 9.01092C3.81083 9.2066 3.87393 9.39976 4 9.54999L6.43 12.24C6.50187 12.3204 6.58964 12.385 6.68775 12.4297Z"
                        });
                    t.appendChild(n).append(s, r);
                    const i = e("defs"),
                        a = d(e("clipPath"), {
                            id: "clip0_57_156"
                        }),
                        c = d(e("rect"), {
                            width: "16",
                            height: "16",
                            fill: "white",
                            transform: "translate(0 0.5)"
                        });
                    return a.appendChild(c), i.appendChild(a), t.appendChild(i).appendChild(a).appendChild(c), t;
                }

                function Oe({
                    open: e,
                    onFormSubmitted: t,
                    ...n
                }) {
                    const r = n.options,
                        o = fe(() => ({
                            __html: xe().outerHTML
                        }), []),
                        [s, i] = (te = 1, he(Te, null)),
                        a = ge(() => {
                            s && (clearTimeout(s), i(null));
                            t();;
                        }, [s]),
                        c = ge(e => {
                            n.onSubmitSuccess(e);
                            i(setTimeout(() => {
                                t();
                                i(null);;
                            }, 5e3));;
                        }, [t]);
                    return M(O, null, s ? M("div", {
                        class: "success__position",
                        onClick: a
                    }, M("div", {
                        class: "success__content"
                    }, r.successMessageText, M("span", {
                        class: "success__icon",
                        dangerouslySetInnerHTML: o
                    }))) : M("dialog", {
                        class: "dialog",
                        onClick: r.onFormClose,
                        open: e
                    }, M("div", {
                        class: "dialog__position"
                    }, M("div", {
                        class: "dialog__content",
                        onClick: e => {
                            e.stopPropagation();
                        }
                    }, M(we, {
                        options: r
                    }), M(Ae, {
                        ...n,
                        onSubmitSuccess: c
                    })))));
                }

                function Re(e) {
                    const t = s.createElement("style");
                    return t.textContent = `\n.editor {\n  padding: 10px;\n  padding-top: 65px;\n  padding-bottom: 65px;\n  flex-grow: 1;\n\n  background-color: ${"#1A141F"};\n  background-image: repeating-linear-gradient(\n      -145deg,\n      transparent,\n      transparent 8px,\n      ${"#1A141F"} 8px,\n      ${"#1A141F"} 11px\n    ),\n    repeating-linear-gradient(\n      -45deg,\n      transparent,\n      transparent 15px,\n      ${"#302735"} 15px,\n      ${"#302735"} 16px\n    );\n}\n\n.editor__canvas-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.editor__canvas-container canvas {\n  object-fit: contain;\n  position: relative;\n}\n\n.editor__crop-btn-group {\n  padding: 8px;\n  gap: 8px;\n  border-radius: var(--menu-border-radius, 6px);\n  background: var(--button-primary-background, var(--background));\n  width: 175px;\n  position: absolute;\n}\n\n.editor__crop-corner {\n  width: 30px;\n  height: 30px;\n  position: absolute;\n  background: none;\n  border: 3px solid #ffffff;\n}\n\n.editor__crop-corner--top-left {\n  cursor: nwse-resize;\n  border-right: none;\n  border-bottom: none;\n}\n.editor__crop-corner--top-right {\n  cursor: nesw-resize;\n  border-left: none;\n  border-bottom: none;\n}\n.editor__crop-corner--bottom-left {\n  cursor: nesw-resize;\n  border-right: none;\n  border-top: none;\n}\n.editor__crop-corner--bottom-right {\n  cursor: nwse-resize;\n  border-left: none;\n  border-top: none;\n}\n`, e && t.setAttribute("nonce", e), t;
                }
                const Ne = o.devicePixelRatio,
                    Pe = e => ({
                        x: Math.min(e.startX, e.endX),
                        y: Math.min(e.startY, e.endY),
                        width: Math.abs(e.startX - e.endX),
                        height: Math.abs(e.startY - e.endY)
                    }),
                    Le = e => {
                        const t = e.clientHeight,
                            n = e.clientWidth,
                            r = e.width / e.height;
                        let o = t * r,
                            s = t;
                        if (o > n) {
                            o = n;
                            s = n / r;
                        }
                        const i = (n - o) / 2,
                            a = (t - s) / 2;
                        return {
                            startX: i,
                            startY: a,
                            endX: o + i,
                            endY: s + a
                        };
                    };

                function Ue({
                    h: e,
                    hooks: t,
                    imageBuffer: n,
                    dialog: r,
                    options: a
                }) {
                    const c = function({
                        onBeforeScreenshot: t,
                        onScreenshot: n,
                        onAfterScreenshot: r,
                        onError: a
                    }) {
                        e.useEffect(() => {
                            (async () => {
                                t();
                                const e = await i.mediaDevices.getDisplayMedia({
                                        video: {
                                            width: o.innerWidth * o.devicePixelRatio,
                                            height: o.innerHeight * o.devicePixelRatio
                                        },
                                        audio: false,
                                        monitorTypeSurfaces: "exclude",
                                        preferCurrentTab: true,
                                        selfBrowserSurface: "include",
                                        surfaceSwitching: "exclude"
                                    }),
                                    a = s.createElement("video");
                                await new Promise((t, r) => {
                                    a.srcObject = e;
                                    a.onloadedmetadata = () => {
                                        n(a);
                                        e.getTracks().forEach(e => e.stop());
                                        t();;
                                    };
                                    a.play().catch(r);;
                                });
                                r();;
                            })().catch(a);
                        }, []);
                    };
                    return function({
                        onError: i
                    }) {
                        const l = t.useMemo(() => ({
                                __html: Re(a.styleNonce).innerText
                            }), []),
                            u = function({
                                top: t,
                                left: n,
                                corner: r,
                                onGrabButton: o
                            }) {
                                return e("button", {
                                    class: `editor__crop-corner editor__crop-corner--${r} `,
                                    style: {
                                        top: t,
                                        left: n
                                    },
                                    onMouseDown: e => {
                                        e.preventDefault();
                                        o(e, r);;
                                    },
                                    onClick: e => {
                                        e.preventDefault();
                                    }
                                });
                            },
                            d = t.useRef(null),
                            p = t.useRef(null),
                            h = t.useRef(null),
                            [m, f] = t.useState({
                                startX: 0,
                                startY: 0,
                                endX: 0,
                                endY: 0
                            }),
                            [g, _] = t.useState(false),
                            [y, S] = t.useState(false);

                        function v() {
                            const e = h.current,
                                t = Pe(Le(n));
                            if (e) {
                                e.width = t.width * Ne;
                                e.height = t.height * Ne;
                                e.style.width = `${t.width}px`;
                                e.style.height = `${t.height}px`;;
                                const n = e.getContext("2d");
                                n && n.scale(Ne, Ne);
                            }
                            const r = p.current;
                            r && (r.style.width = `${t.width}px`, r.style.height = `${t.height}px`);
                            f({
                                startX: 0,
                                startY: 0,
                                endX: t.width,
                                endY: t.height
                            });;
                        }

                        function b(e, t) {
                            _(false);
                            S(true);;
                            const n = E(t),
                                r = () => {
                                    s.removeEventListener("mousemove", n);
                                    s.removeEventListener("mouseup", r);
                                    _(true);
                                    S(false);;
                                };
                            s.addEventListener("mouseup", r);
                            s.addEventListener("mousemove", n);;
                        }
                        t.useEffect(() => {
                            o.addEventListener("resize", v, false);
                        }, []);
                        t.useEffect(() => {
                            const e = h.current;
                            if (!e) {
                                return;
                            }
                            const t = e.getContext("2d");
                            if (!t) {
                                return;
                            }
                            const r = Pe(Le(n)),
                                o = Pe(m);
                            t.clearRect(0, 0, r.width, r.height);;
                            t.fillRect(0, 0, r.width, r.height);
                            t.clearRect(o.x, o.y, o.width, o.height);;;
                            t.strokeRect(o.x + 1, o.y + 1, o.width - 2, o.height - 2);;;
                            t.strokeRect(o.x + 3, o.y + 3, o.width - 6, o.height - 6);;
                        }, [m]);;
                        const E = t.useCallback(e => function(t) {
                                if (!h.current) {
                                    return;
                                }
                                const n = h.current,
                                    r = n.getBoundingClientRect(),
                                    o = t.clientX - r.x,
                                    s = t.clientY - r.y;
                                switch (e) {
                                    case "top-left":
                                        f(e => ({
                                            ...e,
                                            startX: Math.min(Math.max(0, o), e.endX - 33),
                                            startY: Math.min(Math.max(0, s), e.endY - 33)
                                        }));
                                        break;
                                    case "top-right":
                                        f(e => ({
                                            ...e,
                                            endX: Math.max(Math.min(o, n.width / Ne), e.startX + 33),
                                            startY: Math.min(Math.max(0, s), e.endY - 33)
                                        }));
                                        break;
                                    case "bottom-left":
                                        f(e => ({
                                            ...e,
                                            startX: Math.min(Math.max(0, o), e.endX - 33),
                                            endY: Math.max(Math.min(s, n.height / Ne), e.startY + 33)
                                        }));
                                        break;
                                    case "bottom-right":
                                        f(e => ({
                                            ...e,
                                            endX: Math.max(Math.min(o, n.width / Ne), e.startX + 33),
                                            endY: Math.max(Math.min(s, n.height / Ne), e.startY + 33)
                                        }));
                                }
                            }, []),
                            T = t.useRef({
                                initialX: 0,
                                initialY: 0
                            });
                        return c({
                            onBeforeScreenshot: t.useCallback(() => {
                                r.el.style.display = "none";
                            }, []),
                            onScreenshot: t.useCallback(e => {
                                const t = n.getContext("2d");
                                if (!t) {
                                    throw new Error("Could not get canvas context");
                                };;
                                n.style.width = "100%";
                                n.style.height = "100%";
                                t.drawImage(e, 0, 0);;
                            }, [n]),
                            onAfterScreenshot: t.useCallback(() => {
                                r.el.style.display = "block";
                                const e = d.current;
                                e && e.appendChild(n);
                                v();;
                            }, []),
                            onError: t.useCallback(e => {
                                r.el.style.display = "block";
                                i(e);;
                            }, [])
                        }), e("div", {
                            class: "editor"
                        }, e("style", {
                            nonce: a.styleNonce,
                            dangerouslySetInnerHTML: l
                        }), e("div", {
                            class: "editor__canvas-container",
                            ref: d
                        }, e("div", {
                            class: "editor__crop-container",
                            style: {
                                position: "absolute",
                                zIndex: 1
                            },
                            ref: p
                        }, e("canvas", {
                            onMouseDown: function(e) {
                                if (y) {
                                    return;
                                };
                                const t = e => {
                                        const t = h.current;
                                        if (!t) {
                                            return;
                                        }
                                        const n = e.clientX - T.current.initialX,
                                            r = e.clientY - T.current.initialY;
                                        f(o => {
                                            const s = Math.max(0, Math.min(o.startX + n, t.width / Ne - (o.endX - o.startX))),
                                                i = Math.max(0, Math.min(o.startY + r, t.height / Ne - (o.endY - o.startY))),
                                                a = s + (o.endX - o.startX),
                                                c = i + (o.endY - o.startY);
                                            return T.current.initialX = e.clientX, T.current.initialY = e.clientY, {
                                                startX: s,
                                                startY: i,
                                                endX: a,
                                                endY: c
                                            };
                                        });
                                    },
                                    n = () => {
                                        s.removeEventListener("mousemove", t);
                                        s.removeEventListener("mouseup", n);;
                                    };
                                s.addEventListener("mousemove", t);
                                s.addEventListener("mouseup", n);;
                            },
                            style: {
                                position: "absolute",
                                cursor: g ? "move" : "auto"
                            },
                            ref: h
                        }), e(u, {
                            left: m.startX - 3,
                            top: m.startY - 3,
                            onGrabButton: b,
                            corner: "top-left"
                        }), e(u, {
                            left: m.endX - 30 + 3,
                            top: m.startY - 3,
                            onGrabButton: b,
                            corner: "top-right"
                        }), e(u, {
                            left: m.startX - 3,
                            top: m.endY - 30 + 3,
                            onGrabButton: b,
                            corner: "bottom-left"
                        }), e(u, {
                            left: m.endX - 30 + 3,
                            top: m.endY - 30 + 3,
                            onGrabButton: b,
                            corner: "bottom-right"
                        }), e("div", {
                            style: {
                                left: Math.max(0, m.endX - 191),
                                top: Math.max(0, m.endY + 8),
                                display: g ? "flex" : "none"
                            },
                            class: "editor__crop-btn-group"
                        }, e("button", {
                            onClick: e => {
                                e.preventDefault();
                                h.current && f({
                                    startX: 0,
                                    startY: 0,
                                    endX: h.current.width / Ne,
                                    endY: h.current.height / Ne
                                });
                                _(false);;
                            },
                            class: "btn btn--default"
                        }, a.cancelButtonLabel), e("button", {
                            onClick: e => {
                                e.preventDefault();
                                (function() {
                                    const e = s.createElement("canvas"),
                                        t = Pe(Le(n)),
                                        r = Pe(m);
                                    e.width = r.width * Ne;
                                    e.height = r.height * Ne;;
                                    const o = e.getContext("2d");
                                    o && n && o.drawImage(n, r.x / t.width * n.width, r.y / t.height * n.height, r.width / t.width * n.width, r.height / t.height * n.height, 0, 0, e.width, e.height);
                                    const i = n.getContext("2d");
                                    i && (i.clearRect(0, 0, n.width, n.height), n.width = e.width, n.height = e.height, n.style.width = `${r.width}px`, n.style.height = `${r.height}px`, i.drawImage(e, 0, 0), v());
                                }());
                                _(false);;
                            },
                            class: "btn btn--primary"
                        }, a.confirmButtonLabel)))));
                    };
                };;;;;;
            },
            7143: (e, t, n) => {
                var {
                    _optionalChain: r
                } = n(7872);
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const o = n(7872);
                var s;

                function i(e, t, n = Infinity, r = 0) {
                    return e ? e.nodeType !== e.ELEMENT_NODE || r > n ? -1 : t(e) ? r : i(e.parentNode, t, n, r + 1) : -1;
                }

                function a(e, t) {
                    return n => {
                        const r = n;
                        if (null === r) {
                            return false;
                        }
                        try {
                            if (e) {
                                if ("string" == typeof e) {
                                    if (r.matches(`.${e}`)) {
                                        return true;
                                    }
                                } else {
                                    if (function(e, t) {
                                            for (let n = e.classList.length; n--;) {
                                                const r = e.classList[n];
                                                if (t.test(r)) {
                                                    return true;
                                                }
                                            }
                                            return false;
                                        }(r, e)) {
                                        return true;
                                    }
                                }
                            }
                            return !(!t || !r.matches(t));
                        } catch (e) {
                            return false;
                        }
                    };
                }! function(e) {
                    e[e.Document = 0] = "Document";
                    e[e.DocumentType = 1] = "DocumentType";
                    e[e.Element = 2] = "Element";
                    e[e.Text = 3] = "Text";
                    e[e.CDATA = 4] = "CDATA";
                    e[e.Comment = 5] = "Comment";;
                }(s || (s = {}));;
                let l = {
                    map: {},
                    getId: () => (console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), -1),
                    getNode: () => (console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), null),
                    removeNodeFromMap() {
                        console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.");
                    },
                    has: () => (console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), false),
                    reset() {
                        console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.");
                    }
                };

                function u(e, t, n, r, o = window) {
                    const s = o.Object.getOwnPropertyDescriptor(e, t);
                    return o.Object.defineProperty(e, t, r ? n : {
                        set(e) {
                            m("setTimeout")(...e);
                            s && s.set && s.set.call(this, e);;
                        }
                    }), () => u(e, t, s || {}, true);
                }

                function d(e, t, n) {
                    try {
                        if (!(t in e)) {
                            return () => {};
                        }
                        const r = e[t],
                            o = n(r);
                        return "function" == typeof o && (o.prototype = o.prototype || {}, Object.defineProperties(o, {
                            __rrweb_original__: {
                                enumerable: false,
                                value: r
                            }
                        })), e[t] = o, () => {
                            e[t] = r;
                        };
                    } catch (e) {
                        return () => {};
                    }
                }

                function p(e, t, n, r, o) {
                    if (!e) {
                        return false;
                    }
                    const s = function(e) {
                        return e ? e.nodeType === e.ELEMENT_NODE ? e : e.parentElement : null;
                    }(e);
                    if (!s) {
                        return false;
                    }
                    const c = i(s, a(t, n));
                    let l = -1;
                    return !(c < 0) && (r && (l = i(s, a(null, r))), c > -1 && l < 0 || c < l);
                }
                "undefined" != typeof window && window.Proxy && window.Reflect && (l = new Proxy(l, {
                    get: (e, t, n) => ("map" === t && console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), Reflect.get(e, t, n))
                }));
                /[1-9][0-9]{12}/.test(Date.now().toString());;
                const h = {};

                function m(e) {
                    const t = h[e];
                    if (t) {
                        return t;
                    }
                    const n = window.document;
                    let r = window[e];
                    if (n && "function" == typeof n.createElement) {
                        try {
                            const t = n.createElement("iframe");;
                            n.head.appendChild(t);;
                            const o = t.contentWindow;
                            o && o[e] && (r = o[e]);
                            n.head.removeChild(t);;
                        } catch (e) {}
                    }
                    return h[e] = r.bind(window);
                }
                var _ = (e => (e[e["2D"] = 0] = "2D", e[e.WebGL = 1] = "WebGL", e[e.WebGL2 = 2] = "WebGL2", e))(_ || {});
                let y;

                function S(e) {
                    y = e;
                }
                const v = e => y ? (...t) => {
                    try {
                        return e(...t);
                    } catch (e) {
                        if (y && true === y(e)) {
                            return () => {};
                        }
                        throw e;
                    }
                } : e;
                for (var E = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), T = 0; T < 64; T++) {
                    E["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(T)] = T;
                }
                const I = new Map,
                    C = (e, t, n) => {
                        if (!e || !A(e, t) && "object" != typeof e) {
                            return;
                        }
                        const r = function(e, t) {
                            let n = I.get(e);
                            return n || (n = new Map, I.set(e, n)), n.has(t) || n.set(t, []), n.get(t);
                        }(n, e.constructor.name);
                        let o = r.indexOf(e);
                        return -1 === o && (o = r.length, r.push(e)), o;
                    };

                function w(e, t, n) {
                    if (e instanceof Array) {
                        return e.map(e => w(e, t, n));
                    }
                    if (null === e) {
                        return e;
                    }
                    if (e instanceof Float32Array || e instanceof Float64Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Int16Array || e instanceof Int8Array || e instanceof Uint8ClampedArray) {
                        return {
                            rr_type: e.constructor.name,
                            args: [Object.values(e)]
                        };
                    }
                    if (e instanceof ArrayBuffer) {
                        const t = e.constructor.name,
                            n = function(e) {
                                var t, n = new Uint8Array(e),
                                    r = n.length,
                                    o = "";
                                for (t = 0; t < r; t += 3) {
                                    o += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [n[t] >> 2];
                                    o += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(3 & n[t]) << 4 | n[t + 1] >> 4];
                                    o += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(15 & n[t + 1]) << 2 | n[t + 2] >> 6];
                                    o += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [63 & n[t + 2]];;
                                }
                                return r % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o;
                            }(e);
                        return {
                            rr_type: t,
                            base64: n
                        };
                    }
                    if (e instanceof DataView) {
                        return {
                            rr_type: e.constructor.name,
                            args: [w(e.buffer, t, n), e.byteOffset, e.byteLength]
                        };
                    }
                    if (e instanceof HTMLImageElement) {
                        const t = e.constructor.name,
                            {
                                src: n
                            } = e;
                        return {
                            rr_type: t,
                            src: n
                        };
                    }
                    return e instanceof HTMLCanvasElement ? {
                        rr_type: "HTMLImageElement",
                        src: e.toDataURL()
                    } : e instanceof ImageData ? {
                        rr_type: e.constructor.name,
                        args: [w(e.data, t, n), e.width, e.height]
                    } : A(e, t) || "object" == typeof e ? {
                        rr_type: e.constructor.name,
                        index: C(e, t, n)
                    } : e;
                }
                const k = (e, t, n) => e.map(e => w(e, t, n)),
                    A = (e, t) => {
                        const n = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebGLVertexArrayObjectOES"].filter(e => "function" == typeof t[e]);
                        return Boolean(n.find(n => e instanceof t[n]));
                    };

                function M(e, t, n, r, o) {
                    const s = [];
                    try {
                        const i = d(e.HTMLCanvasElement.prototype, "getContext", function(e) {
                            return function(s, ...i) {
                                if (!p(this, t, n, r)) {
                                    const e = function(e) {
                                        return "experimental-webgl" === e ? "webgl" : e;
                                    }(s);
                                    if ("__context" in this || (this.__context = e), o && ["webgl", "webgl2"].includes(e)) {
                                        if (i[0] && "object" == typeof i[0]) {
                                            const e = i[0];
                                            e.preserveDrawingBuffer || (e.preserveDrawingBuffer = true);
                                        } else {
                                            i.splice(0, 1, {
                                                preserveDrawingBuffer: true
                                            });
                                        }
                                    }
                                }
                                return e.apply(this, [s, ...i]);
                            };
                        });
                        s.push(i);
                    } catch (e) {
                        console.error("failed to patch HTMLCanvasElement.prototype.getContext");
                    }
                    return () => {
                        s.forEach(e => e());
                    };
                }

                function x(e, t, n, r, o, s, i, a) {
                    const c = [],
                        l = Object.getOwnPropertyNames(e);
                    for (const i of l)
                        if (!["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(i)) {
                            try {
                                if ("function" != typeof e[i]) {
                                    continue;
                                }
                                const l = d(e, i, function(e) {
                                    return function(...c) {
                                        const l = e.apply(this, c);
                                        if (C(l, a, this), "tagName" in this.canvas && !p(this.canvas, r, o, s)) {
                                            const e = k(c, a, this),
                                                r = {
                                                    type: t,
                                                    property: i,
                                                    args: e
                                                };
                                            n(this.canvas, r);
                                        }
                                        return l;
                                    };
                                });
                                c.push(l);
                            } catch (r) {
                                const o = u(e, i, {
                                    set(e) {
                                        n(this.canvas, {
                                            type: t,
                                            property: i,
                                            args: [e],
                                            setter: true
                                        });
                                    }
                                });
                                c.push(o);
                            }
                        }
                    return c;
                }
                class O {
                    reset() {
                        this.pendingCanvasMutations.clear();
                        this.restoreHandlers.forEach(e => {
                            try {
                                e();
                            } catch (e) {}
                        });
                        this.restoreHandlers = [];
                        this.windowsSet = new WeakSet;
                        this.windows = [];
                        this.shadowDoms = new Set;
                        r([this, "access", e => e.worker, "optionalAccess", e => e.terminate, "call", e => e()]);
                        this.worker = null;
                        this.snapshotInProgressMap = new Map;;
                    }
                    freeze() {
                        this.frozen = true;
                    }
                    unfreeze() {
                        this.frozen = false;
                    }
                    lock() {
                        this.locked = true;
                    }
                    unlock() {
                        this.locked = false;
                    }
                    constructor(e) {
                        this.pendingCanvasMutations = new Map;
                        this.rafStamps = {
                            latestId: 0,
                            invokeId: null
                        };
                        this.shadowDoms = new Set;
                        this.windowsSet = new WeakSet;
                        this.windows = [];
                        this.restoreHandlers = [];
                        this.frozen = false;
                        this.locked = false;
                        this.snapshotInProgressMap = new Map;
                        this.worker = null;
                        this.processMutation = (e, t) => {
                            !(this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId) && this.rafStamps.invokeId || (this.rafStamps.invokeId = this.rafStamps.latestId);
                            this.pendingCanvasMutations.has(e) || this.pendingCanvasMutations.set(e, []);
                            this.pendingCanvasMutations.get(e).push(t);;
                        };;
                        const {
                            sampling: t = "all",
                            win: n,
                            blockClass: r,
                            blockSelector: o,
                            unblockSelector: s,
                            maxCanvasSize: i,
                            recordCanvas: a,
                            dataURLOptions: c,
                            errorHandler: l
                        } = e;
                        this.mutationCb = e.mutationCb;
                        this.mirror = e.mirror;
                        this.options = e;
                        l && S(l);
                        (a && "number" == typeof t || e.enableManualSnapshot) && (this.worker = this.initFPSWorker());
                        this.addWindow(n);
                        e.enableManualSnapshot || v(() => {
                            a && "all" === t && (this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher());
                            a && "number" == typeof t && this.initCanvasFPSObserver(t, r, o, s, i, {
                                dataURLOptions: c
                            });;
                        })();;
                    }
                    addWindow(e) {
                        const {
                            sampling: t = "all",
                            blockClass: n,
                            blockSelector: r,
                            unblockSelector: o,
                            recordCanvas: s,
                            enableManualSnapshot: i
                        } = this.options;
                        if (!this.windowsSet.has(e)) {
                            if (i) {
                                return this.windowsSet.add(e), void this.windows.push(new WeakRef(e));
                            }
                            v(() => {
                                if (s && "all" === t && this.initCanvasMutationObserver(e, n, r, o), s && "number" == typeof t) {
                                    const t = M(e, n, r, o, true);
                                    this.restoreHandlers.push(() => {
                                        t();
                                    });
                                }
                            })();
                            this.windowsSet.add(e);
                            this.windows.push(new WeakRef(e));;
                        }
                    }
                    addShadowRoot(e) {
                        this.shadowDoms.add(new WeakRef(e));
                    }
                    resetShadowRoots() {
                        this.shadowDoms = new Set;
                    }
                    initFPSWorker() {
                        const e = new Worker(function() {
                            const e = new Blob(['for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t="undefined"==typeof Uint8Array?[]:new Uint8Array(256),a=0;a<64;a++)t[e.charCodeAt(a)]=a;var n=function(t){var a,n=new Uint8Array(t),r=n.length,s="";for(a=0;a<r;a+=3)s+=e[n[a]>>2],s+=e[(3&n[a])<<4|n[a+1]>>4],s+=e[(15&n[a+1])<<2|n[a+2]>>6],s+=e[63&n[a+2]];return r%3==2?s=s.substring(0,s.length-1)+"=":r%3==1&&(s=s.substring(0,s.length-2)+"=="),s};const r=new Map,s=new Map;const i=self;i.onmessage=async function(e){if(!("OffscreenCanvas"in globalThis))return i.postMessage({id:e.data.id});{const{id:t,bitmap:a,width:o,height:f,maxCanvasSize:c,dataURLOptions:g}=e.data,u=async function(e,t,a){const r=e+"-"+t;if("OffscreenCanvas"in globalThis){if(s.has(r))return s.get(r);const i=new OffscreenCanvas(e,t);i.getContext("2d");const o=await i.convertToBlob(a),f=await o.arrayBuffer(),c=n(f);return s.set(r,c),c}return""}(o,f,g),[h,d]=function(e,t,a){if(!a)return[e,t];const[n,r]=a;if(e<=n&&t<=r)return[e,t];let s=e,i=t;return s>n&&(i=Math.floor(n*t/e),s=n),i>r&&(s=Math.floor(r*e/t),i=r),[s,i]}(o,f,c),l=new OffscreenCanvas(h,d),w=l.getContext("bitmaprenderer"),p=h===o&&d===f?a:await createImageBitmap(a,{resizeWidth:h,resizeHeight:d,resizeQuality:"low"});w.transferFromImageBitmap(p),a.close();const y=await l.convertToBlob(g),v=y.type,b=await y.arrayBuffer(),m=n(b);if(p.close(),!r.has(t)&&await u===m)return r.set(t,m),i.postMessage({id:t});if(r.get(t)===m)return i.postMessage({id:t});i.postMessage({id:t,type:v,base64:m,width:o,height:f}),r.set(t,m)}};']);
                            return URL.createObjectURL(e);
                        }());
                        return e.onmessage = e => {
                            const t = e.data,
                                {
                                    id: n
                                } = t;
                            if (this.snapshotInProgressMap.set(n, false), !("base64" in t)) {
                                return;
                            }
                            const {
                                base64: r,
                                type: o,
                                width: s,
                                height: i
                            } = t;
                            this.mutationCb({
                                id: n,
                                type: _["2D"],
                                commands: [{
                                    property: "clearRect",
                                    args: [0, 0, s, i]
                                }, {
                                    property: "drawImage",
                                    args: [{
                                        rr_type: "ImageBitmap",
                                        args: [{
                                            rr_type: "Blob",
                                            data: [{
                                                rr_type: "ArrayBuffer",
                                                base64: r
                                            }],
                                            type: o
                                        }]
                                    }, 0, 0, s, i]
                                }]
                            });
                        }, e;
                    }
                    initCanvasFPSObserver(e, t, n, r, o, s) {
                        const i = this.takeSnapshot(false, e, t, n, r, o, s.dataURLOptions);
                        this.restoreHandlers.push(() => {
                            cancelAnimationFrame(i);
                        });
                    }
                    initCanvasMutationObserver(e, t, n, r) {
                        const o = M(e, t, n, r, false),
                            s = function(e, t, n, r, o) {
                                const s = [],
                                    i = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
                                for (const a of i) try {
                                    if ("function" != typeof t.CanvasRenderingContext2D.prototype[a]) {
                                        continue;
                                    }
                                    const i = d(t.CanvasRenderingContext2D.prototype, a, function(s) {
                                        return function(...i) {
                                            return p(this.canvas, n, r, o) || m("setTimeout")(...e), s.apply(this, i);
                                        };
                                    });
                                    s.push(i);
                                } catch (n) {
                                    const r = u(t.CanvasRenderingContext2D.prototype, a, {
                                        set(t) {
                                            e(this.canvas, {
                                                type: _["2D"],
                                                property: a,
                                                args: [t],
                                                setter: true
                                            });
                                        }
                                    });
                                    s.push(r);
                                }
                                return () => {
                                    s.forEach(e => e());
                                };
                            }(this.processMutation.bind(this), e, t, n, r),
                            i = function(e, t, n, r, o) {
                                const s = [];
                                return s.push(...x(t.WebGLRenderingContext.prototype, _.WebGL, e, n, r, o, 0, t)), undefined !== t.WebGL2RenderingContext && s.push(...x(t.WebGL2RenderingContext.prototype, _.WebGL2, e, n, r, o, 0, t)), () => {
                                    s.forEach(e => e());
                                };
                            }(this.processMutation.bind(this), e, t, n, r, this.mirror);
                        this.restoreHandlers.push(() => {
                            o();
                            s();
                            i();;
                        });
                    }
                    snapshot(e) {
                        const {
                            options: t
                        } = this, n = this.takeSnapshot(true, "all" === t.sampling ? 2 : t.sampling || 2, t.blockClass, t.blockSelector, t.unblockSelector, t.maxCanvasSize, t.dataURLOptions, e);
                        this.restoreHandlers.push(() => {
                            cancelAnimationFrame(n);
                        });
                    }
                    takeSnapshot(e, t, n, o, s, i, a, c) {
                        const l = 1e3 / t;
                        let u, d = 0;
                        const h = e => {
                                if (e) {
                                    return [e];
                                }
                                const t = [],
                                    r = e => {
                                        e.querySelectorAll("canvas").forEach(e => {
                                            p(e, n, o, s) || t.push(e);
                                        });
                                    };
                                for (const e of this.windows) {
                                    const t = e.deref();
                                    t && r(t.document);
                                }
                                for (const e of this.shadowDoms) {
                                    const t = e.deref();
                                    t && r(t);
                                }
                                return t;
                            },
                            m = t => {
                                this.windows.length && (d && t - d < l ? u = m("requestAnimationFrame")(...e) : (d = t, h(c).forEach(t => {
                                    if (!this.mirror.hasNode(t)) {
                                        return;
                                    }
                                    const n = this.mirror.getId(t);
                                    if (!this.snapshotInProgressMap.get(n) && t.width && t.height) {
                                        if (this.snapshotInProgressMap.set(n, true), !e && ["webgl", "webgl2"].includes(t.__context)) {
                                            const e = t.getContext(t.__context);
                                            false === r([e, "optionalAccess", e => e.getContextAttributes, "call", e => e(), "optionalAccess", e => e.preserveDrawingBuffer]) && e.clear(e.COLOR_BUFFER_BIT);
                                        }
                                        createImageBitmap(t).then(e => {
                                            r([this, "access", e => e.worker, "optionalAccess", e => e.postMessage, "call", r => r({
                                                id: n,
                                                bitmap: e,
                                                width: t.width,
                                                height: t.height,
                                                dataURLOptions: a,
                                                maxCanvasSize: i
                                            }, [e])]);
                                        }).catch(e => {
                                            v(() => {
                                                throw e;
                                            })();
                                        });
                                    }
                                }), e || (u = m("requestAnimationFrame")(...e))));
                            };
                        return u = m("requestAnimationFrame")(...e), u;
                    }
                    startPendingCanvasMutationFlusher() {
                        m("requestAnimationFrame")(...e);
                    }
                    startRAFTimestamping() {
                        const e = t => {
                            this.rafStamps.latestId = t;
                            m("requestAnimationFrame")(...e);;
                        };
                        m("requestAnimationFrame")(...e);
                    }
                    flushPendingCanvasMutations() {
                        this.pendingCanvasMutations.forEach((e, t) => {
                            const n = this.mirror.getId(t);
                            this.flushPendingCanvasMutationFor(t, n);
                        });
                        m("requestAnimationFrame")(...e);;
                    }
                    flushPendingCanvasMutationFor(e, t) {
                        if (this.frozen || this.locked) {
                            return;
                        }
                        const n = this.pendingCanvasMutations.get(e);
                        if (!n || -1 === t) {
                            return;
                        }
                        const r = n.map(e => {
                                const {
                                    type: t,
                                    ...n
                                } = e;
                                return n;
                            }),
                            {
                                type: o
                            } = n[0];
                        this.mutationCb({
                            id: t,
                            type: o,
                            commands: r
                        });
                        this.pendingCanvasMutations.delete(e);;
                    }
                }
                const R = {
                        low: {
                            sampling: {
                                canvas: 1
                            },
                            dataURLOptions: {
                                type: "image/webp",
                                quality: 0.25
                            }
                        },
                        medium: {
                            sampling: {
                                canvas: 2
                            },
                            dataURLOptions: {
                                type: "image/webp",
                                quality: 0.4
                            }
                        },
                        high: {
                            sampling: {
                                canvas: 4
                            },
                            dataURLOptions: {
                                type: "image/webp",
                                quality: 0.5
                            }
                        }
                    },
                    N = o.defineIntegration((e = {}) => {
                        const [t, n] = e.maxCanvasSize || [], r = {
                            quality: e.quality || "medium",
                            enableManualSnapshot: e.enableManualSnapshot,
                            maxCanvasSize: [t ? Math.min(t, 1280) : 1280, n ? Math.min(n, 1280) : 1280]
                        };
                        let o;
                        const s = new Promise(e => o = e);
                        return {
                            name: "ReplayCanvas",
                            getOptions() {
                                const {
                                    quality: e,
                                    enableManualSnapshot: t,
                                    maxCanvasSize: n
                                } = r;
                                return {
                                    enableManualSnapshot: t,
                                    recordCanvas: true,
                                    getCanvasManager: e => {
                                        const r = new O({
                                            ...e,
                                            enableManualSnapshot: t,
                                            maxCanvasSize: n,
                                            errorHandler: e => {
                                                try {
                                                    "object" == typeof e && (e.__rrweb__ = true);
                                                } catch (e) {}
                                            }
                                        });
                                        return o(r), r;
                                    },
                                    ...R[e || "medium"] || R.medium
                                };
                            },
                            async snapshot(e) {
                                (await s).snapshot(e);
                            }
                        };
                    });;
            },
            2992: (e, t, n) => {
                var {
                    _nullishCoalesce: r,
                    _optionalChain: o
                } = n(7872);
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const s = n(7872),
                    i = n(1015),
                    a = s.GLOBAL_OBJ;

                function h(e, t) {
                    return null != e ? e : t();
                }

                function m(e) {
                    let t, n = e[0],
                        r = 1;
                    for (; r < e.length;) {
                        const o = e[r],
                            s = e[r + 1];
                        if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) {
                            return;
                        }
                        "access" === o || "optionalAccess" === o ? (t = n, n = s(n)) : "call" !== o && "optionalCall" !== o || (n = s((...e) => n.call(t, ...e)), t = undefined);
                    }
                    return n;
                }
                var f;

                function g(e) {
                    const t = m([e, "optionalAccess", e => e.host]);
                    return Boolean(m([t, "optionalAccess", e => e.shadowRoot]) === e);
                }

                function y(e) {
                    try {
                        const n = e.rules || e.cssRules;
                        return n ? ((t = Array.from(n, S).join("")).includes(" background-clip: text;") && !t.includes(" -webkit-background-clip: text;") && (t = t.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;")), t) : null;
                    } catch (e) {
                        return null;
                    }
                    var t;
                }

                function S(e) {
                    let t;
                    if (function(e) {
                            return "styleSheet" in e;
                        }(e)) {
                        try {
                            t = y(e.styleSheet) || function(e) {
                                const {
                                    cssText: t
                                } = e;
                                if (t.split('"').length < 3) {
                                    return t;
                                }
                                const n = ["@import", `url(${JSON.stringify(e.href)})`];
                                return "" === e.layerName ? n.push("layer") : e.layerName && n.push(`layer(${e.layerName})`), e.supportsText && n.push(`supports(${e.supportsText})`), e.media.length && n.push(e.media.mediaText), n.join(" ") + ";";
                            }(e);
                        } catch (e) {}
                    } else {
                        if (function(e) {
                                return "selectorText" in e;
                            }(e) && e.selectorText.includes(":")) {
                            return e.cssText.replace(/(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm, "$1\\$2");
                        }
                    }
                    return t || e.cssText;
                }! function(e) {
                    e[e.Document = 0] = "Document";
                    e[e.DocumentType = 1] = "DocumentType";
                    e[e.Element = 2] = "Element";
                    e[e.Text = 3] = "Text";
                    e[e.CDATA = 4] = "CDATA";
                    e[e.Comment = 5] = "Comment";;
                }(f || (f = {}));
                class v {
                    constructor() {
                        this.idNodeMap = new Map;
                        this.nodeMetaMap = new WeakMap;;
                    }
                    getId(e) {
                        return e ? h(m([this, "access", e => e.getMeta, "call", t => t(e), "optionalAccess", e => e.id]), () => -1) : -1;
                    }
                    getNode(e) {
                        return this.idNodeMap.get(e) || null;
                    }
                    getIds() {
                        return Array.from(this.idNodeMap.keys());
                    }
                    getMeta(e) {
                        return this.nodeMetaMap.get(e) || null;
                    }
                    removeNodeFromMap(e) {
                        const t = this.getId(e);
                        this.idNodeMap.delete(t);
                        e.childNodes && e.childNodes.forEach(e => this.removeNodeFromMap(e));;
                    }
                    has(e) {
                        return this.idNodeMap.has(e);
                    }
                    hasNode(e) {
                        return this.nodeMetaMap.has(e);
                    }
                    add(e, t) {
                        const n = t.id;
                        this.idNodeMap.set(n, e);
                        this.nodeMetaMap.set(e, t);;
                    }
                    replace(e, t) {
                        const n = this.getNode(e);
                        if (n) {
                            const e = this.nodeMetaMap.get(n);
                            e && this.nodeMetaMap.set(t, e);
                        }
                        this.idNodeMap.set(e, t);
                    }
                    reset() {
                        this.idNodeMap = new Map;
                        this.nodeMetaMap = new WeakMap;;
                    }
                }

                function b({
                    maskInputOptions: e,
                    tagName: t,
                    type: n
                }) {
                    return "OPTION" === t && (t = "SELECT"), Boolean(e[t.toLowerCase()] || n && e[n] || "password" === n || "INPUT" === t && !n && e.text);
                }

                function E({
                    isMasked: e,
                    element: t,
                    value: n,
                    maskInputFn: r
                }) {
                    let o = n || "";
                    return e ? (r && (o = r(o, t)), "*".repeat(o.length)) : o;
                };

                function w(e) {
                    const t = e.type;
                    return e.hasAttribute("data-rr-is-password") ? "password" : t ? t.toLowerCase() : null;
                }

                function k(e, t, n) {
                    return "INPUT" !== t || "radio" !== n && "checkbox" !== n ? e.value : e.getAttribute("value") || "";
                }

                function A(e, t) {
                    let n;
                    try {
                        n = new URL(e, h(t, () => window.location.href));
                    } catch (e) {
                        return null;
                    }
                    return h(m([n.pathname.match(/\.([0-9a-z]+)(?:$)/i), "optionalAccess", e => e[1]]), () => null);
                }
                const M = {};

                function x(e) {
                    const t = M[e];
                    if (t) {
                        return t;
                    }
                    const n = window.document;
                    let r = window[e];
                    if (n && "function" == typeof n.createElement) {
                        try {
                            const t = n.createElement("iframe");;
                            n.head.appendChild(t);;
                            const o = t.contentWindow;
                            o && o[e] && (r = o[e]);
                            n.head.removeChild(t);;
                        } catch (e) {}
                    }
                    return M[e] = r.bind(window);
                }
                let D = 1;
                const N = new RegExp("[^a-z0-9-_:]");

                function P() {
                    return D++;
                }
                let L, U;;

                function W(e, t) {
                    return (e || "").replace(/url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, (e, n, r, o, s, i) => {
                        const a = r || s || i,
                            c = n || o || "";
                        if (!a) {
                            return e;
                        }
                        if (/^(?:[a-z+]+:)?\/\//i.test(a) || /^www\..*/i.test(a)) {
                            return `url(${c}${a}${c})`;
                        }
                        if (/^(data:)([^,]*),(.*)/i.test(a)) {
                            return `url(${c}${a}${c})`;
                        }
                        if ("/" === a[0]) {
                            return `url(${c}${function (e) {
          let t = "";
          return t = e.indexOf("//") > -1 ? e.split("/").slice(0, 3).join("/") : e.split("/")[0], t = t.split("?")[0], t;
        }(t) + a}${c})`;
                        }
                        const l = t.split("/"),
                            u = a.split("/");
                        l.pop();
                        for (const e of u) "." !== e && (".." === e ? l.pop() : l.push(e));
                        return `url(${c}${l.join("/")}${c})`;
                    });
                }
                const z = new WeakMap;

                function q(e, t) {
                    return t && "" !== t.trim() ? Y(e, t) : t;
                }

                function Y(e, t) {
                    let n = z.get(e);
                    if (n || (n = e.createElement("a"), z.set(e, n)), t) {
                        if (t.startsWith("blob:") || t.startsWith("data:")) {
                            return t;
                        }
                    } else {
                        t = "";
                    }
                    return n.setAttribute("href", t), n.href;
                }

                function V(e, t, n, r, o, s) {
                    return r ? "src" === n || "href" === n && ("use" !== t || "#" !== r[0]) || "xlink:href" === n && "#" !== r[0] ? q(e, r) : "background" !== n || "table" !== t && "td" !== t && "th" !== t ? "srcset" === n ? function(e, t) {
                        if ("" === t.trim()) {
                            return t;
                        }
                        let n = 0;

                        function r(e) {
                            let r;
                            const o = e.exec(t.substring(n));
                            return o ? (r = o[0], n += r.length, r) : "";
                        }
                        const o = [];
                        for (; r(/^[, \t\n\r\u000c]+/), !(n >= t.length);) {
                            let s = r(/^[^ \t\n\r\u000c]+/);
                            if ("," === s.slice(-1)) {
                                s = q(e, s.substring(0, s.length - 1));
                                o.push(s);;
                            } else {
                                let r = "";
                                s = q(e, s);
                                let i = false;
                                for (;;) {
                                    const e = t.charAt(n);
                                    if ("" === e) {
                                        o.push((s + r).trim());
                                        break;
                                    }
                                    if (i) {
                                        ")" === e && (i = false);
                                    } else {
                                        if ("," === e) {
                                            n += 1;
                                            o.push((s + r).trim());;
                                            break;
                                        }
                                        "(" === e && (i = true);
                                    }
                                    r += e;
                                    n += 1;;
                                }
                            }
                        }
                        return o.join(", ");
                    }(e, r) : "style" === n ? W(r, Y(e)) : "object" === t && "data" === n ? q(e, r) : "function" == typeof s ? s(n, r, o) : r : q(e, r) : r;
                }

                function K(e, t, n = Infinity, r = 0) {
                    return e ? e.nodeType !== e.ELEMENT_NODE || r > n ? -1 : t(e) ? r : K(e.parentNode, t, n, r + 1) : -1;
                }

                function X(e, t) {
                    return n => {
                        const r = n;
                        if (null === r) {
                            return false;
                        }
                        try {
                            if (e) {
                                if ("string" == typeof e) {
                                    if (r.matches(`.${e}`)) {
                                        return true;
                                    }
                                } else {
                                    if (function(e, t) {
                                            for (let n = e.classList.length; n--;) {
                                                const r = e.classList[n];
                                                if (t.test(r)) {
                                                    return true;
                                                }
                                            }
                                            return false;
                                        }(r, e)) {
                                        return true;
                                    }
                                }
                            }
                            return !(!t || !r.matches(t));
                        } catch (e) {
                            return false;
                        }
                    };
                }

                function Z(e, t, n, r, o, s) {
                    try {
                        const i = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
                        if (null === i) {
                            return false;
                        }
                        if ("INPUT" === i.tagName) {
                            const e = i.getAttribute("autocomplete");
                            if (["current-password", "new-password", "cc-number", "cc-exp", "cc-exp-month", "cc-exp-year", "cc-csc"].includes(e)) {
                                return true;
                            }
                        }
                        let a = -1,
                            c = -1;
                        if (s) {
                            if (c = K(i, X(r, o)), c < 0) {
                                return true;
                            }
                            a = K(i, X(t, n), c >= 0 ? c : Infinity);
                        } else {
                            if (a = K(i, X(t, n)), a < 0) {
                                return false;
                            }
                            c = K(i, X(r, o), a >= 0 ? a : Infinity);
                        }
                        return a >= 0 ? !(c >= 0) || a <= c : !(c >= 0 || !s);
                    } catch (e) {}
                    return !!s;
                }

                function Q(e) {
                    return null == e ? "" : e.toLowerCase();
                }

                function ee(e, t) {
                    const {
                        doc: n,
                        mirror: r,
                        blockClass: o,
                        blockSelector: s,
                        unblockSelector: i,
                        maskAllText: a,
                        maskTextClass: c,
                        unmaskTextClass: l,
                        maskTextSelector: u,
                        unmaskTextSelector: d,
                        skipChild: p = false,
                        inlineStylesheet: h = true,
                        maskInputOptions: S = {},
                        maskAttributeFn: v,
                        maskTextFn: M,
                        maskInputFn: x,
                        slimDOMOptions: D,
                        dataURLOptions: B = {},
                        inlineImages: F = false,
                        recordCanvas: H = false,
                        onSerialize: j,
                        onIframeLoad: G,
                        iframeLoadTimeout: $ = 5e3,
                        onStylesheetLoad: z,
                        stylesheetLoadTimeout: q = 5e3,
                        keepIframeSrcFn: K = () => false,
                        newlyAddedElement: X = false
                    } = t;
                    let {
                        preserveWhiteSpace: te = true
                    } = t;
                    const ne = function(e, t) {
                        const {
                            doc: n,
                            mirror: r,
                            blockClass: o,
                            blockSelector: s,
                            unblockSelector: i,
                            maskAllText: a,
                            maskAttributeFn: c,
                            maskTextClass: l,
                            unmaskTextClass: u,
                            maskTextSelector: d,
                            unmaskTextSelector: p,
                            inlineStylesheet: h,
                            maskInputOptions: g = {},
                            maskTextFn: _,
                            maskInputFn: S,
                            dataURLOptions: v = {},
                            inlineImages: A,
                            recordCanvas: M,
                            keepIframeSrcFn: x,
                            newlyAddedElement: O = false
                        } = t, R = function(e, t) {
                            if (!t.hasNode(e)) {
                                return;
                            }
                            const n = t.getId(e);
                            return 1 === n ? undefined : n;
                        }(n, r);
                        switch (e.nodeType) {
                            case e.DOCUMENT_NODE:
                                return "CSS1Compat" !== e.compatMode ? {
                                    type: f.Document,
                                    childNodes: [],
                                    compatMode: e.compatMode
                                } : {
                                    type: f.Document,
                                    childNodes: []
                                };
                            case e.DOCUMENT_TYPE_NODE:
                                return {
                                    type: f.DocumentType, name: e.name, publicId: e.publicId, systemId: e.systemId, rootId: R
                                };
                            case e.ELEMENT_NODE:
                                return function(e, t) {
                                    const {
                                        doc: n,
                                        blockClass: r,
                                        blockSelector: o,
                                        unblockSelector: s,
                                        inlineStylesheet: i,
                                        maskInputOptions: a = {},
                                        maskAttributeFn: c,
                                        maskInputFn: l,
                                        dataURLOptions: u = {},
                                        inlineImages: d,
                                        recordCanvas: p,
                                        keepIframeSrcFn: h,
                                        newlyAddedElement: m = false,
                                        rootId: g,
                                        maskAllText: _,
                                        maskTextClass: S,
                                        unmaskTextClass: v,
                                        maskTextSelector: A,
                                        unmaskTextSelector: M
                                    } = t, x = function(e, t, n, r) {
                                        try {
                                            if (r && e.matches(r)) {
                                                return false;
                                            }
                                            if ("string" == typeof t) {
                                                if (e.classList.contains(t)) {
                                                    return true;
                                                }
                                            } else {
                                                for (let n = e.classList.length; n--;) {
                                                    const r = e.classList[n];
                                                    if (t.test(r)) {
                                                        return true;
                                                    }
                                                }
                                            }
                                            if (n) {
                                                return e.matches(n);
                                            }
                                        } catch (e) {}
                                        return false;
                                    }(e, r, o, s), O = function(e) {
                                        if (e instanceof HTMLFormElement) {
                                            return "form";
                                        }
                                        const t = e.tagName.toLowerCase();
                                        return N.test(t) ? "div" : t;
                                    }(e);
                                    let R = {
                                        value: E({
                                            isMasked: e,
                                            element: t,
                                            value: r,
                                            maskInputFn: l
                                        }),
                                        rr_dataURL: L.toDataURL(u.type, u.quality)
                                    };
                                    const D = e.attributes.length;
                                    for (let t = 0; t < D; t++) {
                                        const r = e.attributes[t];
                                        r.name && !(("video" === O || "audio" === O) && "autoplay" === r.name) && (R[r.name] = V(n, O, r.name.toLowerCase(), r.value, e, c));
                                    }
                                    if ("link" === O && i) {
                                        const t = Array.from(n.styleSheets).find(t => t.href === e.href);
                                        let r = null;
                                        t && (r = y(t));
                                        r && (delete R.rel, delete R.href, R._cssText = W(r, t.href));;
                                    }
                                    if ("style" === O && e.sheet && !(e.innerText || e.textContent || "").trim().length) {
                                        const t = y(e.sheet);
                                        t && (R._cssText = W(t, Y(n)));
                                    }
                                    if ("input" === O || "textarea" === O || "select" === O || "option" === O) {
                                        const t = e,
                                            n = w(t),
                                            r = k(t, O.toUpperCase(), n),
                                            o = t.checked;
                                        if ("submit" !== n && "button" !== n && r) {
                                            const e = Z(t, S, A, v, M, b({
                                                type: n,
                                                tagName: O.toUpperCase(),
                                                maskInputOptions: a
                                            }));;
                                        }
                                        o && (R.checked = o);
                                    }
                                    if ("option" === O && (e.selected && !a.select ? R.selected = true : delete R.selected), "canvas" === O && p) {
                                        if ("2d" === e.__context) {
                                            (function(e) {
                                                const t = e.getContext("2d");
                                                if (!t) {
                                                    return true;
                                                }
                                                for (let n = 0; n < e.width; n += 50) {
                                                    for (let r = 0; r < e.height; r += 50) {
                                                        const o = t.getImageData,
                                                            s = "__rrweb_original__" in o ? o.__rrweb_original__ : o;
                                                        if (new Uint32Array(s.call(t, n, r, Math.min(50, e.width - n), Math.min(50, e.height - r)).data.buffer).some(e => 0 !== e)) {
                                                            return false;
                                                        }
                                                    }
                                                }
                                                return true;
                                            }(e) || (R.rr_dataURL = e.toDataURL(u.type, u.quality)));
                                        } else {
                                            if (!("__context" in e)) {
                                                const t = e.toDataURL(u.type, u.quality),
                                                    r = n.createElement("canvas");;;
                                                t !== r.toDataURL(u.type, u.quality) && (R.rr_dataURL = t);;
                                            }
                                        }
                                    }
                                    if ("img" === O && d) {
                                        L || (L = n.createElement("canvas"), U = L.getContext("2d"));
                                        const t = e,
                                            r = t.currentSrc || t.getAttribute("src") || "<unknown-src>",
                                            o = t.crossOrigin,
                                            s = () => {
                                                t.removeEventListener("load", s);
                                                try {
                                                    L.width = t.naturalWidth;
                                                    L.height = t.naturalHeight;
                                                    U.drawImage(t, 0, 0);;;
                                                } catch (e) {
                                                    if ("anonymous" !== t.crossOrigin) {
                                                        return t.crossOrigin = "anonymous", void(t.complete && 0 !== t.naturalWidth ? s() : t.addEventListener("load", s));
                                                    }
                                                    console.warn(`Cannot inline img src=${r}! Error: ${e}`);
                                                }
                                                "anonymous" === t.crossOrigin && (o ? R.crossOrigin = o : t.removeAttribute("crossorigin"));
                                            };
                                        t.complete && 0 !== t.naturalWidth ? s() : t.addEventListener("load", s);
                                    }
                                    if ("audio" !== O && "video" !== O || (R.rr_mediaState = e.paused ? "paused" : "played", R.rr_mediaCurrentTime = e.currentTime), m || (e.scrollLeft && (R.rr_scrollLeft = e.scrollLeft), e.scrollTop && (R.rr_scrollTop = e.scrollTop)), x) {
                                        const {
                                            width: t,
                                            height: n
                                        } = e.getBoundingClientRect();
                                        R = {
                                            class: R.class,
                                            rr_width: `${t}px`,
                                            rr_height: `${n}px`
                                        };
                                    }
                                    let P;
                                    "iframe" !== O || h(R.src) || (x || e.contentDocument || (R.rr_src = R.src), delete R.src);
                                    try {
                                        customElements.get(O) && (P = true);
                                    } catch (e) {}
                                    return {
                                        type: f.Element,
                                        tagName: O,
                                        attributes: R,
                                        childNodes: [],
                                        isSVG: (B = e, Boolean("svg" === B.tagName || B.ownerSVGElement) || undefined),
                                        needBlock: x,
                                        rootId: g,
                                        isCustom: P
                                    };
                                    var B;
                                }(e, {
                                    doc: n,
                                    blockClass: o,
                                    blockSelector: s,
                                    unblockSelector: i,
                                    inlineStylesheet: h,
                                    maskAttributeFn: c,
                                    maskInputOptions: g,
                                    maskInputFn: S,
                                    dataURLOptions: v,
                                    inlineImages: A,
                                    recordCanvas: M,
                                    keepIframeSrcFn: x,
                                    newlyAddedElement: O,
                                    rootId: R,
                                    maskAllText: a,
                                    maskTextClass: l,
                                    unmaskTextClass: u,
                                    maskTextSelector: d,
                                    unmaskTextSelector: p
                                });
                            case e.TEXT_NODE:
                                return function(e, t) {
                                    const {
                                        maskAllText: n,
                                        maskTextClass: r,
                                        unmaskTextClass: o,
                                        maskTextSelector: s,
                                        unmaskTextSelector: i,
                                        maskTextFn: a,
                                        maskInputOptions: c,
                                        maskInputFn: l,
                                        rootId: u
                                    } = t, d = e.parentNode && e.parentNode.tagName;
                                    let p = e.textContent;
                                    const h = "STYLE" === d || undefined,
                                        g = "SCRIPT" === d || undefined,
                                        _ = "TEXTAREA" === d || undefined;
                                    if (h && p) {
                                        try {
                                            e.nextSibling || e.previousSibling || m([e, "access", e => e.parentNode, "access", e => e.sheet, "optionalAccess", e => e.cssRules]) && (p = y(e.parentNode.sheet));
                                        } catch (t) {
                                            console.warn(`Cannot get CSS styles from text's parentNode. Error: ${t}`, e);
                                        }
                                        p = W(p, Y(t.doc));
                                    }
                                    g && (p = "SCRIPT_PLACEHOLDER");
                                    const S = Z(e, r, s, o, i, n);
                                    return h || g || _ || !p || !S || (p = a ? a(p, e.parentElement) : p.replace(/[\S]/g, "*")), _ && p && (c.textarea || S) && (p = l ? l(p, e.parentNode) : p.replace(/[\S]/g, "*")), "OPTION" === d && p && (p = E({
                                        isMasked: Z(e, r, s, o, i, b({
                                            type: null,
                                            tagName: d,
                                            maskInputOptions: c
                                        })),
                                        element: e,
                                        value: p,
                                        maskInputFn: l
                                    })), {
                                        type: f.Text,
                                        textContent: p || "",
                                        isStyle: h,
                                        rootId: u
                                    };
                                }(e, {
                                    doc: n,
                                    maskAllText: a,
                                    maskTextClass: l,
                                    unmaskTextClass: u,
                                    maskTextSelector: d,
                                    unmaskTextSelector: p,
                                    maskTextFn: _,
                                    maskInputOptions: g,
                                    maskInputFn: S,
                                    rootId: R
                                });
                            case e.CDATA_SECTION_NODE:
                                return {
                                    type: f.CDATA, textContent: "", rootId: R
                                };
                            case e.COMMENT_NODE:
                                return {
                                    type: f.Comment, textContent: e.textContent || "", rootId: R
                                };
                            default:
                                return false;
                        }
                    }(e, {
                        doc: n,
                        mirror: r,
                        blockClass: o,
                        blockSelector: s,
                        maskAllText: a,
                        unblockSelector: i,
                        maskTextClass: c,
                        unmaskTextClass: l,
                        maskTextSelector: u,
                        unmaskTextSelector: d,
                        inlineStylesheet: h,
                        maskInputOptions: S,
                        maskAttributeFn: v,
                        maskTextFn: M,
                        maskInputFn: x,
                        dataURLOptions: B,
                        inlineImages: F,
                        recordCanvas: H,
                        keepIframeSrcFn: K,
                        newlyAddedElement: X
                    });
                    if (!ne) {
                        return console.warn(e, "not serialized"), null;
                    }
                    let re;
                    re = r.hasNode(e) ? r.getId(e) : ! function(e, t) {
                        if (t.comment && e.type === f.Comment) {
                            return true;
                        }
                        if (e.type === f.Element) {
                            if (t.script && ("script" === e.tagName || "link" === e.tagName && ("preload" === e.attributes.rel || "modulepreload" === e.attributes.rel) && "script" === e.attributes.as || "link" === e.tagName && "prefetch" === e.attributes.rel && "string" == typeof e.attributes.href && "js" === A(e.attributes.href))) {
                                return true;
                            }
                            if (t.headFavicon && ("link" === e.tagName && "shortcut icon" === e.attributes.rel || "meta" === e.tagName && (Q(e.attributes.name).match(/^msapplication-tile(image|color)$/) || "application-name" === Q(e.attributes.name) || "icon" === Q(e.attributes.rel) || "apple-touch-icon" === Q(e.attributes.rel) || "shortcut icon" === Q(e.attributes.rel)))) {
                                return true;
                            }
                            if ("meta" === e.tagName) {
                                if (t.headMetaDescKeywords && Q(e.attributes.name).match(/^description|keywords$/)) {
                                    return true;
                                }
                                if (t.headMetaSocial && (Q(e.attributes.property).match(/^(og|twitter|fb):/) || Q(e.attributes.name).match(/^(og|twitter):/) || "pinterest" === Q(e.attributes.name))) {
                                    return true;
                                }
                                if (t.headMetaRobots && ("robots" === Q(e.attributes.name) || "googlebot" === Q(e.attributes.name) || "bingbot" === Q(e.attributes.name))) {
                                    return true;
                                }
                                if (t.headMetaHttpEquiv && undefined !== e.attributes["http-equiv"]) {
                                    return true;
                                }
                                if (t.headMetaAuthorship && ("author" === Q(e.attributes.name) || "generator" === Q(e.attributes.name) || "framework" === Q(e.attributes.name) || "publisher" === Q(e.attributes.name) || "progid" === Q(e.attributes.name) || Q(e.attributes.property).match(/^article:/) || Q(e.attributes.property).match(/^product:/))) {
                                    return true;
                                }
                                if (t.headMetaVerification && ("google-site-verification" === Q(e.attributes.name) || "yandex-verification" === Q(e.attributes.name) || "csrf-token" === Q(e.attributes.name) || "p:domain_verify" === Q(e.attributes.name) || "verify-v1" === Q(e.attributes.name) || "verification" === Q(e.attributes.name) || "shopify-checkout-api-token" === Q(e.attributes.name))) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }(ne, D) && (te || ne.type !== f.Text || ne.isStyle || ne.textContent.replace(/^\s+|\s+$/gm, "").length) ? P() : -2;
                    const oe = Object.assign(ne, {
                        id: re
                    });
                    if (r.add(e, oe), -2 === re) {
                        return null;
                    }
                    j && j(e);
                    let se = !p;
                    if (oe.type === f.Element) {
                        se = se && !oe.needBlock;
                        delete oe.needBlock;;
                        const t = e.shadowRoot;
                        t && "[object ShadowRoot]" === Object.prototype.toString.call(t) && (oe.isShadowHost = true);
                    }
                    if ((oe.type === f.Document || oe.type === f.Element) && se) {
                        D.headWhitespace && oe.type === f.Element && "head" === oe.tagName && (te = false);
                        const t = {
                            doc: n,
                            mirror: r,
                            blockClass: o,
                            blockSelector: s,
                            maskAllText: a,
                            unblockSelector: i,
                            maskTextClass: c,
                            unmaskTextClass: l,
                            maskTextSelector: u,
                            unmaskTextSelector: d,
                            skipChild: p,
                            inlineStylesheet: h,
                            maskInputOptions: S,
                            maskAttributeFn: v,
                            maskTextFn: M,
                            maskInputFn: x,
                            slimDOMOptions: D,
                            dataURLOptions: B,
                            inlineImages: F,
                            recordCanvas: H,
                            preserveWhiteSpace: te,
                            onSerialize: j,
                            onIframeLoad: G,
                            iframeLoadTimeout: $,
                            onStylesheetLoad: z,
                            stylesheetLoadTimeout: q,
                            keepIframeSrcFn: K
                        };
                        for (const n of Array.from(e.childNodes)) {
                            const e = ee(n, t);
                            e && oe.childNodes.push(e);
                        }
                        if (function(e) {
                                return e.nodeType === e.ELEMENT_NODE;
                            }(e) && e.shadowRoot) {
                            for (const n of Array.from(e.shadowRoot.childNodes)) {
                                const r = ee(n, t);
                                r && ("[object ShadowRoot]" === Object.prototype.toString.call(e.shadowRoot) && (r.isShadow = true), oe.childNodes.push(r));
                            }
                        }
                    }
                    return e.parentNode && g(e.parentNode) && "[object ShadowRoot]" === Object.prototype.toString.call(e.parentNode) && (oe.isShadow = true), oe.type === f.Element && "iframe" === oe.tagName && function(e, t, n) {
                        const r = e.contentWindow;
                        if (!r) {
                            return;
                        }
                        let o, s = false;
                        try {
                            o = r.document.readyState;
                        } catch (e) {
                            return;
                        }
                        if ("complete" !== o) {
                            const r = x("setTimeout")(...e);
                            return void e.addEventListener("load", () => {
                                x("clearTimeout")(...e);
                                s = true;
                                t();;
                            });
                        };
                        if (r.location.href !== "about:blank" || e.src === "about:blank" || "" === e.src) {
                            return x("setTimeout")(...e), e.addEventListener("load", t);
                        }
                        e.addEventListener("load", t);
                    }(e, () => {
                        const t = e.contentDocument;
                        if (t && G) {
                            const n = ee(t, {
                                doc: t,
                                mirror: r,
                                blockClass: o,
                                blockSelector: s,
                                unblockSelector: i,
                                maskAllText: a,
                                maskTextClass: c,
                                unmaskTextClass: l,
                                maskTextSelector: u,
                                unmaskTextSelector: d,
                                skipChild: false,
                                inlineStylesheet: h,
                                maskInputOptions: S,
                                maskAttributeFn: v,
                                maskTextFn: M,
                                maskInputFn: x,
                                slimDOMOptions: D,
                                dataURLOptions: B,
                                inlineImages: F,
                                recordCanvas: H,
                                preserveWhiteSpace: te,
                                onSerialize: j,
                                onIframeLoad: G,
                                iframeLoadTimeout: $,
                                onStylesheetLoad: z,
                                stylesheetLoadTimeout: q,
                                keepIframeSrcFn: K
                            });
                            n && G(e, n);
                        }
                    }, $), oe.type === f.Element && "link" === oe.tagName && "string" == typeof oe.attributes.rel && ("stylesheet" === oe.attributes.rel || "preload" === oe.attributes.rel && "string" == typeof oe.attributes.href && "css" === A(oe.attributes.href)) && function(e, t, n) {
                        let r, o = false;
                        try {
                            r = e.sheet;
                        } catch (e) {
                            return;
                        }
                        if (r) {
                            return;
                        }
                        const s = x("setTimeout")(...e);
                        e.addEventListener("load", () => {
                            x("clearTimeout")(...e);
                            o = true;
                            t();;
                        });
                    }(e, () => {
                        if (z) {
                            const t = ee(e, {
                                doc: n,
                                mirror: r,
                                blockClass: o,
                                blockSelector: s,
                                unblockSelector: i,
                                maskAllText: a,
                                maskTextClass: c,
                                unmaskTextClass: l,
                                maskTextSelector: u,
                                unmaskTextSelector: d,
                                skipChild: false,
                                inlineStylesheet: h,
                                maskInputOptions: S,
                                maskAttributeFn: v,
                                maskTextFn: M,
                                maskInputFn: x,
                                slimDOMOptions: D,
                                dataURLOptions: B,
                                inlineImages: F,
                                recordCanvas: H,
                                preserveWhiteSpace: te,
                                onSerialize: j,
                                onIframeLoad: G,
                                iframeLoadTimeout: $,
                                onStylesheetLoad: z,
                                stylesheetLoadTimeout: q,
                                keepIframeSrcFn: K
                            });
                            t && z(e, t);
                        }
                    }, q), oe;
                }

                function te(e) {
                    let t, n = e[0],
                        r = 1;
                    for (; r < e.length;) {
                        const o = e[r],
                            s = e[r + 1];
                        if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) {
                            return;
                        }
                        "access" === o || "optionalAccess" === o ? (t = n, n = s(n)) : "call" !== o && "optionalCall" !== o || (n = s((...e) => n.call(t, ...e)), t = undefined);
                    }
                    return n;
                }

                function ne(e, t, n = document) {
                    ;
                    return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r);
                };
                let oe = {
                    map: {},
                    getId: () => (console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), -1),
                    getNode: () => (console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), null),
                    removeNodeFromMap() {
                        console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.");
                    },
                    has: () => (console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), false),
                    reset() {
                        console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.");
                    }
                };

                function se(e, t, n = {}) {
                    let r = null,
                        o = 0;
                    return function(...s) {
                        const i = Date.now();
                        o || false !== n.leading || (o = i);
                        const a = t - (i - o),
                            c = this;
                        a <= 0 || a > t ? (r && (function(...e) {
                            Ie("clearTimeout")(...e);
                        }(r), r = null), o = i, e.apply(c, s)) : r || false === n.trailing || (r = Ie("setTimeout")(...e));
                    };
                }

                function ie(e, t, n, r, o = window) {
                    const s = o.Object.getOwnPropertyDescriptor(e, t);
                    return o.Object.defineProperty(e, t, r ? n : {
                        set(e) {
                            Ie("setTimeout")(...e);
                            s && s.set && s.set.call(this, e);;
                        }
                    }), () => ie(e, t, s || {}, true);
                }

                function ae(e, t, n) {
                    try {
                        if (!(t in e)) {
                            return () => {};
                        }
                        const r = e[t],
                            o = n(r);
                        return "function" == typeof o && (o.prototype = o.prototype || {}, Object.defineProperties(o, {
                            __rrweb_original__: {
                                enumerable: false,
                                value: r
                            }
                        })), e[t] = o, () => {
                            e[t] = r;
                        };
                    } catch (e) {
                        return () => {};
                    }
                }
                "undefined" != typeof window && window.Proxy && window.Reflect && (oe = new Proxy(oe, {
                    get: (e, t, n) => ("map" === t && console.error("Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording."), Reflect.get(e, t, n))
                }));
                let ce = Date.now;

                function le(e) {
                    const t = e.document;
                    return {
                        left: t.scrollingElement ? t.scrollingElement.scrollLeft : undefined !== e.pageXOffset ? e.pageXOffset : te([t, "optionalAccess", e => e.documentElement, "access", e => e.scrollLeft]) || te([t, "optionalAccess", e => e.body, "optionalAccess", e => e.parentElement, "optionalAccess", e => e.scrollLeft]) || te([t, "optionalAccess", e => e.body, "optionalAccess", e => e.scrollLeft]) || 0,
                        top: t.scrollingElement ? t.scrollingElement.scrollTop : undefined !== e.pageYOffset ? e.pageYOffset : te([t, "optionalAccess", e => e.documentElement, "access", e => e.scrollTop]) || te([t, "optionalAccess", e => e.body, "optionalAccess", e => e.parentElement, "optionalAccess", e => e.scrollTop]) || te([t, "optionalAccess", e => e.body, "optionalAccess", e => e.scrollTop]) || 0
                    };
                }

                function pe(e) {
                    return e ? e.nodeType === e.ELEMENT_NODE ? e : e.parentElement : null;
                }

                function he(e, t, n, r, o) {
                    if (!e) {
                        return false;
                    }
                    const s = pe(e);
                    if (!s) {
                        return false;
                    }
                    const i = X(t, n);
                    if (!o) {
                        const e = r && s.matches(r);
                        return i(s) && !e;
                    }
                    const a = K(s, i);
                    let c = -1;
                    return !(a < 0) && (r && (c = K(s, X(null, r))), a > -1 && c < 0 || a < c);
                }

                function fe(e, t) {
                    if (g(e)) {
                        return false;
                    }
                    const n = t.getId(e);
                    return !t.has(n) || (!e.parentNode || e.parentNode.nodeType !== e.DOCUMENT_NODE) && (!e.parentNode || fe(e.parentNode, t));
                }
                /[1-9][0-9]{12}/.test(Date.now().toString()) || (ce = () => (new Date).getTime());
                class ve {
                    constructor() {
                        this.id = 1;
                        this.styleIDMap = new WeakMap;
                        this.idStyleMap = new Map;;
                    }
                    getId(e) {
                        return r(this.styleIDMap.get(e), () => -1);
                    }
                    has(e) {
                        return this.styleIDMap.has(e);
                    }
                    add(e, t) {
                        if (this.has(e)) {
                            return this.getId(e);
                        }
                        let n;
                        return n = undefined === t ? this.id++ : t, this.styleIDMap.set(e, n), this.idStyleMap.set(n, e), n;
                    }
                    getStyle(e) {
                        return this.idStyleMap.get(e) || null;
                    }
                    reset() {
                        this.styleIDMap = new WeakMap;
                        this.idStyleMap = new Map;
                        this.id = 1;;
                    }
                    generateId() {
                        return this.id++;
                    }
                }

                function be(e) {
                    let t = null;
                    return te([e, "access", e => e.getRootNode, "optionalCall", e => e(), "optionalAccess", e => e.nodeType]) === Node.DOCUMENT_FRAGMENT_NODE && e.getRootNode().host && (t = e.getRootNode().host), t;
                }

                function Ee(e) {
                    const t = e.ownerDocument;
                    return !!t && (t.contains(e) || function(e) {
                        const t = e.ownerDocument;
                        if (!t) {
                            return false;
                        }
                        const n = function(e) {
                            let t, n = e;
                            for (; t = be(n);) {
                                n = t;
                            }
                            return n;
                        }(e);
                        return t.contains(n);
                    }(e));
                }
                const Te = {};

                function Ie(e) {
                    const t = Te[e];
                    if (t) {
                        return t;
                    }
                    const n = window.document;
                    let r = window[e];
                    if (n && "function" == typeof n.createElement) {
                        try {
                            const t = n.createElement("iframe");;
                            n.head.appendChild(t);;
                            const o = t.contentWindow;
                            o && o[e] && (r = o[e]);
                            n.head.removeChild(t);;
                        } catch (e) {}
                    }
                    return Te[e] = r.bind(window);
                }
                var we = (e => (e[e.DomContentLoaded = 0] = "DomContentLoaded", e[e.Load = 1] = "Load", e[e.FullSnapshot = 2] = "FullSnapshot", e[e.IncrementalSnapshot = 3] = "IncrementalSnapshot", e[e.Meta = 4] = "Meta", e[e.Custom = 5] = "Custom", e[e.Plugin = 6] = "Plugin", e))(we || {}),
                    ke = (e => (e[e.Mutation = 0] = "Mutation", e[e.MouseMove = 1] = "MouseMove", e[e.MouseInteraction = 2] = "MouseInteraction", e[e.Scroll = 3] = "Scroll", e[e.ViewportResize = 4] = "ViewportResize", e[e.Input = 5] = "Input", e[e.TouchMove = 6] = "TouchMove", e[e.MediaInteraction = 7] = "MediaInteraction", e[e.StyleSheetRule = 8] = "StyleSheetRule", e[e.CanvasMutation = 9] = "CanvasMutation", e[e.Font = 10] = "Font", e[e.Log = 11] = "Log", e[e.Drag = 12] = "Drag", e[e.StyleDeclaration = 13] = "StyleDeclaration", e[e.Selection = 14] = "Selection", e[e.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e[e.CustomElement = 16] = "CustomElement", e))(ke || {}),
                    Ae = (e => (e[e.MouseUp = 0] = "MouseUp", e[e.MouseDown = 1] = "MouseDown", e[e.Click = 2] = "Click", e[e.ContextMenu = 3] = "ContextMenu", e[e.DblClick = 4] = "DblClick", e[e.Focus = 5] = "Focus", e[e.Blur = 6] = "Blur", e[e.TouchStart = 7] = "TouchStart", e[e.TouchMove_Departed = 8] = "TouchMove_Departed", e[e.TouchEnd = 9] = "TouchEnd", e[e.TouchCancel = 10] = "TouchCancel", e))(Ae || {}),
                    Me = (e => (e[e.Mouse = 0] = "Mouse", e[e.Pen = 1] = "Pen", e[e.Touch = 2] = "Touch", e))(Me || {});

                function xe(e) {
                    let t, n = e[0],
                        r = 1;
                    for (; r < e.length;) {
                        const o = e[r],
                            s = e[r + 1];
                        if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) {
                            return;
                        }
                        "access" === o || "optionalAccess" === o ? (t = n, n = s(n)) : "call" !== o && "optionalCall" !== o || (n = s((...e) => n.call(t, ...e)), t = undefined);
                    }
                    return n;
                }
                class Re {
                    constructor() {
                        this.length = 0;
                        this.head = null;
                        this.tail = null;;
                    }
                    get(e) {
                        if (e >= this.length) {
                            throw new Error("Position outside of list range");
                        }
                        let t = this.head;
                        for (let n = 0; n < e; n++) {
                            t = xe([t, "optionalAccess", e => e.next]) || null;
                        }
                        return t;
                    }
                    addNode(e) {
                        const t = {
                            value: e,
                            previous: null,
                            next: null
                        };
                        if (e.__ln = t, e.previousSibling && "__ln" in e.previousSibling) {
                            const n = e.previousSibling.__ln.next;;;
                            e.previousSibling.__ln.next = t;
                            n && (n.previous = t);;
                        } else {
                            if (e.nextSibling && "__ln" in e.nextSibling && e.nextSibling.__ln.previous) {
                                const n = e.nextSibling.__ln.previous;;;
                                e.nextSibling.__ln.previous = t;
                                n && (n.next = t);;
                            } else {
                                this.head && (this.head.previous = t);;
                                this.head = t;;
                            }
                        }
                        null === t.next && (this.tail = t);
                        this.length++;;
                    }
                    removeNode(e) {
                        const t = e.__ln;
                        this.head && (t.previous ? (t.previous.next = t.next, t.next ? t.next.previous = t.previous : this.tail = t.previous) : (this.head = t.next, this.head ? this.head.previous = null : this.tail = null), e.__ln && delete e.__ln, this.length--);
                    }
                }
                const De = (e, t) => `${e}@${t}`;
                class Ne {
                    constructor() {
                        this.frozen = false;
                        this.locked = false;
                        this.texts = [];
                        this.attributes = [];
                        this.attributeMap = new WeakMap;
                        this.removes = [];
                        this.mapRemoves = [];
                        this.movedMap = {};
                        this.addedSet = new Set;
                        this.movedSet = new Set;
                        this.droppedSet = new Set;
                        this.processMutations = e => {
                            e.forEach(this.processMutation);
                            this.emit();;
                        };
                        this.emit = () => {
                            if (this.frozen || this.locked) {
                                return;
                            }
                            const e = [],
                                t = new Set,
                                n = new Re,
                                r = e => {
                                    let t = e,
                                        n = -2;
                                    for (; - 2 === n;) {
                                        t = t && t.nextSibling;
                                        n = t && this.mirror.getId(t);;
                                    }
                                    return n;
                                },
                                o = o => {
                                    if (!o.parentNode || !Ee(o)) {
                                        return;
                                    }
                                    const s = g(o.parentNode) ? this.mirror.getId(be(o)) : this.mirror.getId(o.parentNode),
                                        i = r(o);
                                    if (-1 === s || -1 === i) {
                                        return n.addNode(o);
                                    }
                                    const a = ee(o, {
                                        doc: this.doc,
                                        mirror: this.mirror,
                                        blockClass: this.blockClass,
                                        blockSelector: this.blockSelector,
                                        maskAllText: this.maskAllText,
                                        unblockSelector: this.unblockSelector,
                                        maskTextClass: this.maskTextClass,
                                        unmaskTextClass: this.unmaskTextClass,
                                        maskTextSelector: this.maskTextSelector,
                                        unmaskTextSelector: this.unmaskTextSelector,
                                        skipChild: true,
                                        newlyAddedElement: true,
                                        inlineStylesheet: this.inlineStylesheet,
                                        maskInputOptions: this.maskInputOptions,
                                        maskAttributeFn: this.maskAttributeFn,
                                        maskTextFn: this.maskTextFn,
                                        maskInputFn: this.maskInputFn,
                                        slimDOMOptions: this.slimDOMOptions,
                                        dataURLOptions: this.dataURLOptions,
                                        recordCanvas: this.recordCanvas,
                                        inlineImages: this.inlineImages,
                                        onSerialize: e => {
                                            Boolean("IFRAME" === e.nodeName && this.mirror.getMeta(e)) && !he(e, this.blockClass, this.blockSelector, this.unblockSelector, false) && this.iframeManager.addIframe(e);
                                            Boolean("LINK" === e.nodeName && e.nodeType === e.ELEMENT_NODE && e.getAttribute && "stylesheet" === e.getAttribute("rel") && this.mirror.getMeta(e)) && this.stylesheetManager.trackLinkElement(e);
                                            Boolean(te([o, "optionalAccess", e => o.shadowRoot])) && this.shadowDomManager.addShadowRoot(o.shadowRoot, this.doc);;
                                        },
                                        onIframeLoad: (e, t) => {
                                            he(e, this.blockClass, this.blockSelector, this.unblockSelector, false) || (this.iframeManager.attachIframe(e, t), e.contentWindow && this.canvasManager.addWindow(e.contentWindow), this.shadowDomManager.observeAttachShadow(e));
                                        },
                                        onStylesheetLoad: (e, t) => {
                                            this.stylesheetManager.attachLinkElement(e, t);
                                        }
                                    });
                                    a && (e.push({
                                        parentId: s,
                                        nextId: i,
                                        node: a
                                    }), t.add(a.id));
                                };
                            for (; this.mapRemoves.length;) {
                                this.mirror.removeNodeFromMap(this.mapRemoves.shift());
                            }
                            for (const e of this.movedSet) Le(this.removes, e, this.mirror) && !this.movedSet.has(e.parentNode) || o(e);
                            for (const e of this.addedSet) 0 !== this.droppedSet.size && Be(this.droppedSet, e) || Le(this.removes, e, this.mirror) ? 0 !== this.movedSet.size && Be(this.movedSet, e) ? o(e) : this.droppedSet.add(e) : o(e);
                            let s = null;
                            for (; n.length;) {
                                let e = null;
                                if (s) {
                                    const t = this.mirror.getId(s.value.parentNode),
                                        n = r(s.value); -
                                    1 !== t && -1 !== n && (e = s);
                                }
                                if (!e) {
                                    let t = n.tail;
                                    for (; t;) {
                                        const n = t;
                                        if (t = t.previous, n) {
                                            const t = this.mirror.getId(n.value.parentNode);
                                            if (-1 === r(n.value)) {
                                                continue;
                                            }
                                            if (-1 !== t) {
                                                e = n;
                                                break;
                                            } {
                                                const t = n.value;
                                                if (t.parentNode && t.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                                    const r = t.parentNode.host;
                                                    if (-1 !== this.mirror.getId(r)) {
                                                        e = n;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!e) {
                                    for (; n.head;) {
                                        n.removeNode(n.head.value);
                                    }
                                    break;
                                }
                                s = e.previous;
                                n.removeNode(e.value);
                                o(e.value);;
                            }
                            const i = {
                                texts: this.texts.map(e => ({
                                    id: this.mirror.getId(e.node),
                                    value: e.value
                                })).filter(e => !t.has(e.id)).filter(e => this.mirror.has(e.id)),
                                attributes: this.attributes.map(e => {
                                    const {
                                        attributes: t
                                    } = e;
                                    if ("string" == typeof t.style) {
                                        const n = JSON.stringify(e.styleDiff),
                                            r = JSON.stringify(e._unchangedStyles);
                                        n.length < t.style.length && (n + r).split("var(").length === t.style.split("var(").length && (t.style = e.styleDiff);
                                    }
                                    return {
                                        id: this.mirror.getId(e.node),
                                        attributes: t
                                    };
                                }).filter(e => !t.has(e.id)).filter(e => this.mirror.has(e.id)),
                                removes: this.removes,
                                adds: e
                            };
                            (i.texts.length || i.attributes.length || i.removes.length || i.adds.length) && (this.texts = [], this.attributes = [], this.attributeMap = new WeakMap, this.removes = [], this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.movedMap = {}, this.mutationCb(i));
                        };
                        this.processMutation = e => {
                            if (!(-2 === this.mirror.getId(e.target))) {
                                switch (e.type) {
                                    case "characterData": {
                                        const t = e.target.textContent;
                                        he(e.target, this.blockClass, this.blockSelector, this.unblockSelector, false) || t === e.oldValue || this.texts.push({
                                            value: Z(e.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextClass, this.unmaskTextSelector, this.maskAllText) && t ? this.maskTextFn ? this.maskTextFn(t, pe(e.target)) : t.replace(/[\S]/g, "*") : t,
                                            node: e.target
                                        });
                                        break;
                                    }
                                    case "attributes": {
                                        const t = e.target;
                                        let n = e.attributeName,
                                            r = e.target.getAttribute(n);
                                        if ("value" === n) {
                                            const n = w(t),
                                                o = t.tagName;
                                            r = k(t, o, n);
                                            const s = b({
                                                maskInputOptions: this.maskInputOptions,
                                                tagName: o,
                                                type: n
                                            });
                                            r = E({
                                                isMasked: Z(e.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextClass, this.unmaskTextSelector, s),
                                                element: t,
                                                value: r,
                                                maskInputFn: this.maskInputFn
                                            });
                                        }
                                        if (he(e.target, this.blockClass, this.blockSelector, this.unblockSelector, false) || r === e.oldValue) {
                                            return;
                                        }
                                        let o = this.attributeMap.get(e.target);
                                        if ("IFRAME" === t.tagName && "src" === n && !this.keepIframeSrcFn(r)) {
                                            if (t.contentDocument) {
                                                return;
                                            }
                                            n = "rr_src";
                                        }
                                        if (o || (o = {
                                                node: e.target,
                                                attributes: {},
                                                styleDiff: {},
                                                _unchangedStyles: {}
                                            }, this.attributes.push(o), this.attributeMap.set(e.target, o)), "type" === n && "INPUT" === t.tagName && "password" === (e.oldValue || "").toLowerCase() && t.setAttribute("data-rr-is-password", "true"), !(("video" === t.tagName || "audio" === t.tagName) && "autoplay" === n) && (o.attributes[n] = V(this.doc, t.tagName.toLowerCase(), n.toLowerCase(), r, t, this.maskAttributeFn), "style" === n)) {
                                            if (!this.unattachedDoc) {
                                                try {
                                                    this.unattachedDoc = document.implementation.createHTMLDocument();
                                                } catch (e) {
                                                    this.unattachedDoc = this.doc;
                                                }
                                            }
                                            const n = this.unattachedDoc.createElement("span");
                                            e.oldValue && n.setAttribute("style", e.oldValue);
                                            for (const e of Array.from(t.style)) {
                                                const r = t.style.getPropertyValue(e),
                                                    s = t.style.getPropertyPriority(e);
                                                r !== n.style.getPropertyValue(e) || s !== n.style.getPropertyPriority(e) ? o.styleDiff[e] = "" === s ? r : [r, s] : o._unchangedStyles[e] = [r, s];
                                            }
                                            for (const e of Array.from(n.style)) "" === t.style.getPropertyValue(e) && (o.styleDiff[e] = false);
                                        }
                                        break;
                                    }
                                    case "childList":
                                        if (he(e.target, this.blockClass, this.blockSelector, this.unblockSelector, true)) {
                                            return;
                                        }
                                        e.addedNodes.forEach(t => this.genAdds(t, e.target)), e.removedNodes.forEach(t => {
                                            const n = this.mirror.getId(t),
                                                r = g(e.target) ? this.mirror.getId(e.target.host) : this.mirror.getId(e.target);
                                            he(e.target, this.blockClass, this.blockSelector, this.unblockSelector, false) || -2 === this.mirror.getId(t) || ! function(e, t) {
                                                return -1 !== t.getId(e);
                                            }(t, this.mirror) || (this.addedSet.has(t) ? (Pe(this.addedSet, t), this.droppedSet.add(t)) : this.addedSet.has(e.target) && -1 === n || fe(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[De(n, r)] ? Pe(this.movedSet, t) : this.removes.push({
                                                parentId: r,
                                                id: n,
                                                isShadow: !(!g(e.target) || !("[object ShadowRoot]" === Object.prototype.toString.call(e.target))) || undefined
                                            })), this.mapRemoves.push(t));
                                        });
                                }
                            }
                        };
                        this.genAdds = (e, t) => {
                            if (!this.processedNodeManager.inOtherBuffer(e, this) && !this.addedSet.has(e) && !this.movedSet.has(e)) {
                                if (this.mirror.hasNode(e)) {
                                    if (-2 === this.mirror.getId(e)) {
                                        return;
                                    }
                                    this.movedSet.add(e);
                                    let n = null;
                                    t && this.mirror.hasNode(t) && (n = this.mirror.getId(t));
                                    n && -1 !== n && (this.movedMap[De(this.mirror.getId(e), n)] = true);;
                                } else {
                                    this.addedSet.add(e);
                                    this.droppedSet.delete(e);;
                                }
                                he(e, this.blockClass, this.blockSelector, this.unblockSelector, false) || (e.childNodes.forEach(e => this.genAdds(e)), Boolean(te([e, "optionalAccess", e => e.shadowRoot])) && e.shadowRoot.childNodes.forEach(t => {
                                    this.processedNodeManager.add(t, this);
                                    this.genAdds(t, e);;
                                }));
                            }
                        };;
                    }
                    init(e) {
                        ["mutationCb", "blockClass", "blockSelector", "unblockSelector", "maskAllText", "maskTextClass", "unmaskTextClass", "maskTextSelector", "unmaskTextSelector", "inlineStylesheet", "maskInputOptions", "maskAttributeFn", "maskTextFn", "maskInputFn", "keepIframeSrcFn", "recordCanvas", "inlineImages", "slimDOMOptions", "dataURLOptions", "doc", "mirror", "iframeManager", "stylesheetManager", "shadowDomManager", "canvasManager", "processedNodeManager"].forEach(t => {
                            this[t] = e[t];
                        });
                    }
                    freeze() {
                        this.frozen = true;
                        this.canvasManager.freeze();;
                    }
                    unfreeze() {
                        this.frozen = false;
                        this.canvasManager.unfreeze();
                        this.emit();;
                    }
                    isFrozen() {
                        return this.frozen;
                    }
                    lock() {
                        this.locked = true;
                        this.canvasManager.lock();;
                    }
                    unlock() {
                        this.locked = false;
                        this.canvasManager.unlock();
                        this.emit();;
                    }
                    reset() {
                        this.shadowDomManager.reset();
                        this.canvasManager.reset();;
                    }
                }

                function Pe(e, t) {
                    e.delete(t);
                    t.childNodes.forEach(t => Pe(e, t));;
                }

                function Le(e, t, n) {
                    return 0 !== e.length && function(e, t, n) {
                        let r = t.parentNode;
                        for (; r;) {
                            const t = n.getId(r);
                            if (e.some(e => e.id === t)) {
                                return true;
                            }
                            r = r.parentNode;
                        }
                        return false;
                    }(e, t, n);
                }

                function Be(e, t) {
                    const {
                        parentNode: n
                    } = t;
                    return !!n && (!!e.has(n) || Be(e, n));
                }
                let Fe;

                function He(e) {
                    Fe = e;
                }

                function je() {
                    Fe = undefined;
                }
                const We = e => Fe ? (...t) => {
                    try {
                        return e(...t);
                    } catch (e) {
                        if (Fe && true === Fe(e)) {
                            return () => {};
                        }
                        throw e;
                    }
                } : e;

                function Ge(e) {
                    let t, n = e[0],
                        r = 1;
                    for (; r < e.length;) {
                        const o = e[r],
                            s = e[r + 1];
                        if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) {
                            return;
                        }
                        "access" === o || "optionalAccess" === o ? (t = n, n = s(n)) : "call" !== o && "optionalCall" !== o || (n = s((...e) => n.call(t, ...e)), t = undefined);
                    }
                    return n;
                }
                const $e = [];

                function ze(e) {
                    try {
                        if ("composedPath" in e) {
                            const t = e.composedPath();
                            if (t.length) {
                                return t[0];
                            }
                        } else {
                            if ("path" in e && e.path.length) {
                                return e.path[0];
                            }
                        }
                    } catch (e) {}
                    return e && e.target;
                }

                function qe(e, t) {
                    const n = new Ne;
                    $e.push(n);
                    n.init(e);;
                    let r = window.MutationObserver || window.__rrMutationObserver;
                    const o = Ge([window, "optionalAccess", e => e.Zone, "optionalAccess", e => e.__symbol__, "optionalCall", e => e("MutationObserver")]);
                    o && window[o] && (r = window[o]);
                    const s = new r(We(t => {
                        e.onMutation && false === e.onMutation(t) || n.processMutations.bind(n)(t);
                    }));
                    return s.observe(t, {
                        attributes: true,
                        attributeOldValue: true,
                        characterData: true,
                        characterDataOldValue: true,
                        childList: true,
                        subtree: true
                    }), s;
                }

                function Ye({
                    scrollCb: e,
                    doc: t,
                    mirror: n,
                    blockClass: r,
                    blockSelector: o,
                    unblockSelector: s,
                    sampling: i
                }) {
                    return ne("scroll", We(se(We(i => {
                        const a = ze(i);
                        if (!a || he(a, r, o, s, true)) {
                            return;
                        }
                        const c = n.getId(a);
                        if (a === t && t.defaultView) {
                            const n = le(t.defaultView);
                            e({
                                id: c,
                                x: n.left,
                                y: n.top
                            });
                        } else {
                            e({
                                id: c,
                                x: a.scrollLeft,
                                y: a.scrollTop
                            });
                        }
                    }), i.scroll || 100)), t);
                }
                const Ve = ["INPUT", "TEXTAREA", "SELECT"],
                    Je = new WeakMap;

                function Ke({
                    inputCb: e,
                    doc: t,
                    mirror: n,
                    blockClass: r,
                    blockSelector: o,
                    unblockSelector: s,
                    ignoreClass: i,
                    ignoreSelector: a,
                    maskInputOptions: c,
                    maskInputFn: l,
                    sampling: u,
                    userTriggeredOnInput: d,
                    maskTextClass: p,
                    unmaskTextClass: h,
                    maskTextSelector: m,
                    unmaskTextSelector: f
                }) {
                    function g(e) {
                        let n = ze(e);
                        const u = e.isTrusted,
                            g = n && n.tagName.toUpperCase();
                        if ("OPTION" === g && (n = n.parentElement), !n || !g || Ve.indexOf(g) < 0 || he(n, r, o, s, true)) {
                            return;
                        }
                        const y = n;
                        if (y.classList.contains(i) || a && y.matches(a)) {
                            return;
                        }
                        const S = w(n);
                        let v = k(y, g, S),
                            T = false;
                        const C = b({
                                maskInputOptions: c,
                                tagName: g,
                                type: S
                            }),
                            A = Z(n, p, m, h, f, C);
                        "radio" !== S && "checkbox" !== S || (T = n.checked);
                        v = E({
                            isMasked: A,
                            element: n,
                            value: v,
                            maskInputFn: l
                        });
                        "[object ShadowRoot]" === Object.prototype.toString.call(n);;
                        const M = n.name;
                        "radio" === S && M && T && t.querySelectorAll(`input[type="radio"][name="${M}"]`).forEach(e => {
                            if (e !== n) {
                                const t = E({
                                    isMasked: A,
                                    element: e,
                                    value: k(e, g, S),
                                    maskInputFn: l
                                });
                                "[object ShadowRoot]" === Object.prototype.toString.call(e);
                            }
                        });
                    }

                    function _(t, r) {
                        const o = Je.get(t);
                        if (!o || o.text !== r.text || o.isChecked !== r.isChecked) {
                            Je.set(t, r);
                            const o = n.getId(t);
                            We(e)({
                                ...r,
                                id: o
                            });
                        }
                    }
                    const y = ("last" === u.input ? ["change"] : ["input", "change"]).map(e => ne(e, We(g), t)),
                        S = t.defaultView;
                    if (!S) {
                        return () => {
                            y.forEach(e => e());
                        };
                    }
                    const v = S.Object.getOwnPropertyDescriptor(S.HTMLInputElement.prototype, "value"),
                        T = [
                            [S.HTMLInputElement.prototype, "value"],
                            [S.HTMLInputElement.prototype, "checked"],
                            [S.HTMLSelectElement.prototype, "value"],
                            [S.HTMLTextAreaElement.prototype, "value"],
                            [S.HTMLSelectElement.prototype, "selectedIndex"],
                            [S.HTMLOptionElement.prototype, "selected"]
                        ];
                    return v && v.set && y.push(...T.map(e => ie(e[0], e[1], {
                        set() {
                            We(g)({
                                target: this,
                                isTrusted: false
                            });
                        }
                    }, false, S))), We(() => {
                        y.forEach(e => e());
                    });
                }

                function Xe(e) {
                    return function(e, t) {
                        if (undefined !== window.CSSGroupingRule && e.parentRule instanceof CSSGroupingRule || undefined !== window.CSSMediaRule && e.parentRule instanceof CSSMediaRule || undefined !== window.CSSSupportsRule && e.parentRule instanceof CSSSupportsRule || undefined !== window.CSSConditionRule && e.parentRule instanceof CSSConditionRule) {
                            const n = Array.from(e.parentRule.cssRules).indexOf(e);
                            t.unshift(n);
                        } else {
                            if (e.parentStyleSheet) {
                                const n = Array.from(e.parentStyleSheet.cssRules).indexOf(e);
                                t.unshift(n);
                            }
                        }
                        return t;
                    }(e, []);
                }

                function Ze(e, t, n) {
                    let r, o;
                    return e ? (e.ownerNode ? r = t.getId(e.ownerNode) : o = n.getId(e), {
                        styleId: o,
                        id: r
                    }) : {};
                }

                function Qe({
                    mirror: e,
                    stylesheetManager: t
                }, n) {
                    let r = null;
                    r = "#document" === n.nodeName ? e.getId(n) : e.getId(n.host);
                    const o = "#document" === n.nodeName ? Ge([n, "access", e => e.defaultView, "optionalAccess", e => e.Document]) : Ge([n, "access", e => e.ownerDocument, "optionalAccess", e => e.defaultView, "optionalAccess", e => e.ShadowRoot]),
                        s = Ge([o, "optionalAccess", e => e.prototype]) ? Object.getOwnPropertyDescriptor(Ge([o, "optionalAccess", e => e.prototype]), "adoptedStyleSheets") : undefined;
                    return null !== r && -1 !== r && o && s ? (Object.defineProperty(n, "adoptedStyleSheets", {
                        configurable: s.configurable,
                        enumerable: s.enumerable,
                        get() {
                            return Ge([s, "access", e => e.get, "optionalAccess", e => e.call, "call", e => e(this)]);
                        },
                        set(e) {
                            const n = Ge([s, "access", e => e.set, "optionalAccess", e => e.call, "call", t => t(this, e)]);
                            if (null !== r && -1 !== r) {
                                try {
                                    t.adoptStyleSheets(e, r);
                                } catch (e) {}
                            }
                            return n;
                        }
                    }), We(() => {
                        Object.defineProperty(n, "adoptedStyleSheets", {
                            configurable: s.configurable,
                            enumerable: s.enumerable,
                            get: s.get,
                            set: s.set
                        });
                    })) : () => {};
                }

                function et(e, t = {}) {
                    const n = e.doc.defaultView;
                    if (!n) {
                        return () => {};
                    }
                    let r;
                    e.recordDOM && (r = qe(e, e.doc));
                    const o = function({
                            mousemoveCb: e,
                            sampling: t,
                            doc: n,
                            mirror: r
                        }) {
                            if (false === t.mousemove) {
                                return () => {};
                            }
                            const o = "number" == typeof t.mousemove ? t.mousemove : 50,
                                s = "number" == typeof t.mousemoveCallback ? t.mousemoveCallback : 500;
                            let i, a = [];
                            const c = se(We(t => {
                                    const n = Date.now() - i;
                                    e(a.map(e => (e.timeOffset -= n, e)), t);
                                    a = [];
                                    i = null;;
                                }), s),
                                l = We(se(We(e => {
                                    const t = ze(e),
                                        {
                                            clientX: n,
                                            clientY: o
                                        } = Boolean(e.changedTouches) ? e.changedTouches[0] : e;
                                    i || (i = ce());
                                    a.push({
                                        x: n,
                                        y: o,
                                        id: r.getId(t),
                                        timeOffset: ce() - i
                                    });
                                    c("undefined" != typeof DragEvent && e instanceof DragEvent ? ke.Drag : e instanceof MouseEvent ? ke.MouseMove : ke.TouchMove);;
                                }), o, {
                                    trailing: false
                                })),
                                u = [ne("mousemove", l, n), ne("touchmove", l, n), ne("drag", l, n)];
                            return We(() => {
                                u.forEach(e => e());
                            });
                        }(e),
                        s = function({
                            mouseInteractionCb: e,
                            doc: t,
                            mirror: n,
                            blockClass: r,
                            blockSelector: o,
                            unblockSelector: s,
                            sampling: i
                        }) {
                            if (false === i.mouseInteraction) {
                                return () => {};
                            }
                            const a = true === i.mouseInteraction || undefined === i.mouseInteraction ? {} : i.mouseInteraction,
                                c = [];
                            let l = null;
                            return Object.keys(Ae).filter(e => Number.isNaN(Number(e)) && !e.endsWith("_Departed") && false !== a[e]).forEach(i => {
                                let a = i.toLowerCase();
                                const u = (t => i => {
                                    const a = ze(i);
                                    if (he(a, r, o, s, true)) {
                                        return;
                                    }
                                    let c = null,
                                        u = t;
                                    if ("pointerType" in i) {
                                        switch (i.pointerType) {
                                            case "mouse":
                                                c = Me.Mouse;
                                                break;
                                            case "touch":
                                                c = Me.Touch;
                                                break;
                                            case "pen":
                                                c = Me.Pen;
                                        }
                                        c === Me.Touch ? Ae[t] === Ae.MouseDown ? u = "TouchStart" : Ae[t] === Ae.MouseUp && (u = "TouchEnd") : Me.Pen;
                                    } else {
                                        Boolean(i.changedTouches) && (c = Me.Touch);
                                    }
                                    null !== c ? (l = c, (u.startsWith("Touch") && c === Me.Touch || u.startsWith("Mouse") && c === Me.Mouse) && (c = null)) : Ae[t] === Ae.Click && (c = l, l = null);
                                    const d = Boolean(i.changedTouches) ? i.changedTouches[0] : i;
                                    if (!d) {
                                        return;
                                    }
                                    const p = n.getId(a),
                                        {
                                            clientX: h,
                                            clientY: m
                                        } = d;
                                    We(e)({
                                        type: Ae[u],
                                        id: p,
                                        x: h,
                                        y: m,
                                        ...null !== c && {
                                            pointerType: c
                                        }
                                    });
                                })(i);
                                if (window.PointerEvent) {
                                    switch (Ae[i]) {
                                        case Ae.MouseDown:
                                        case Ae.MouseUp:
                                            a = a.replace("mouse", "pointer");
                                            break;
                                        case Ae.TouchStart:
                                        case Ae.TouchEnd:
                                            return;
                                    }
                                }
                                c.push(ne(a, u, t));
                            }), We(() => {
                                c.forEach(e => e());
                            });
                        }(e),
                        i = Ye(e),
                        a = function({
                            viewportResizeCb: e
                        }, {
                            win: t
                        }) {
                            let n = -1,
                                r = -1;
                            return ne("resize", We(se(We(() => {
                                const t = window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight,
                                    o = window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
                                n === t && r === o || (e({
                                    width: Number(o),
                                    height: Number(t)
                                }), n = t, r = o);
                            }), 200)), t);
                        }(e, {
                            win: n
                        }),
                        c = Ke(e),
                        l = function({
                            mediaInteractionCb: e,
                            blockClass: t,
                            blockSelector: n,
                            unblockSelector: r,
                            mirror: o,
                            sampling: s,
                            doc: i
                        }) {
                            const a = We(i => se(We(s => {
                                    const a = ze(s);
                                    if (!a || he(a, t, n, r, true)) {
                                        return;
                                    }
                                    const {
                                        currentTime: c,
                                        volume: l,
                                        muted: u,
                                        playbackRate: d
                                    } = a;
                                    e({
                                        type: i,
                                        id: o.getId(a),
                                        currentTime: c,
                                        volume: l,
                                        muted: u,
                                        playbackRate: d
                                    });
                                }), s.media || 500)),
                                c = [ne("play", a(0), i), ne("pause", a(1), i), ne("seeked", a(2), i), ne("volumechange", a(3), i), ne("ratechange", a(4), i)];
                            return We(() => {
                                c.forEach(e => e());
                            });
                        }(e);
                    let u = () => {},
                        d = () => {},
                        p = () => {},
                        h = () => {};
                    e.recordDOM && (u = function({
                        styleSheetRuleCb: e,
                        mirror: t,
                        stylesheetManager: n
                    }, {
                        win: r
                    }) {
                        if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype) {
                            return () => {};
                        }
                        const o = r.CSSStyleSheet.prototype.insertRule;
                        r.CSSStyleSheet.prototype.insertRule = new Proxy(o, {
                            apply: We((r, o, s) => {
                                const [i, a] = s, {
                                    id: c,
                                    styleId: l
                                } = Ze(o, t, n.styleMirror);
                                return (c && -1 !== c || l && -1 !== l) && e({
                                    id: c,
                                    styleId: l,
                                    adds: [{
                                        rule: i,
                                        index: a
                                    }]
                                }), r.apply(o, s);
                            })
                        });
                        const s = r.CSSStyleSheet.prototype.deleteRule;
                        let i, a;
                        r.CSSStyleSheet.prototype.deleteRule = new Proxy(s, {
                            apply: We((r, o, s) => {
                                const [i] = s, {
                                    id: a,
                                    styleId: c
                                } = Ze(o, t, n.styleMirror);
                                return (a && -1 !== a || c && -1 !== c) && e({
                                    id: a,
                                    styleId: c,
                                    removes: [{
                                        index: i
                                    }]
                                }), r.apply(o, s);
                            })
                        });
                        r.CSSStyleSheet.prototype.replace && (i = r.CSSStyleSheet.prototype.replace, r.CSSStyleSheet.prototype.replace = new Proxy(i, {
                            apply: We((r, o, s) => {
                                const [i] = s, {
                                    id: a,
                                    styleId: c
                                } = Ze(o, t, n.styleMirror);
                                return (a && -1 !== a || c && -1 !== c) && e({
                                    id: a,
                                    styleId: c,
                                    replace: i
                                }), r.apply(o, s);
                            })
                        }));
                        r.CSSStyleSheet.prototype.replaceSync && (a = r.CSSStyleSheet.prototype.replaceSync, r.CSSStyleSheet.prototype.replaceSync = new Proxy(a, {
                            apply: We((r, o, s) => {
                                const [i] = s, {
                                    id: a,
                                    styleId: c
                                } = Ze(o, t, n.styleMirror);
                                return (a && -1 !== a || c && -1 !== c) && e({
                                    id: a,
                                    styleId: c,
                                    replaceSync: i
                                }), r.apply(o, s);
                            })
                        }));;
                        const c = {
                            value: Math.max(e.startTime - o.getActivationStart(), 0),
                            level: "error",
                            ConfigUpdateBackoffRetry: "config_update_backoff_retry",
                            CaptureTabAndSend: "capture_tab_and_send",
                            SendRuntimeMessage: "send_runtime_message",
                            PrintBlockedMessage: "print_blocked_message",
                            CreateNewChromeTab: "create_new_chrome_tab"
                        };
                        Boolean(undefined !== window.CSSGroupingRule && window.CSSGroupingRule.prototype && "insertRule" in window.CSSGroupingRule.prototype && "deleteRule" in window.CSSGroupingRule.prototype) ? c.CSSGroupingRule = r.CSSGroupingRule : (Boolean(undefined !== window.CSSMediaRule && window.CSSMediaRule.prototype && "insertRule" in window.CSSMediaRule.prototype && "deleteRule" in window.CSSMediaRule.prototype) && (c.CSSMediaRule = r.CSSMediaRule), Boolean(undefined !== window.CSSConditionRule && window.CSSConditionRule.prototype && "insertRule" in window.CSSConditionRule.prototype && "deleteRule" in window.CSSConditionRule.prototype) && (c.CSSConditionRule = r.CSSConditionRule), Boolean(undefined !== window.CSSSupportsRule && window.CSSSupportsRule.prototype && "insertRule" in window.CSSSupportsRule.prototype && "deleteRule" in window.CSSSupportsRule.prototype) && (c.CSSSupportsRule = r.CSSSupportsRule));
                        const l = {
                            r: {
                                insertRule: o.prototype.insertRule,
                                deleteRule: o.prototype.deleteRule
                            }
                        };
                        return Object.entries(c).forEach(([r, o]) => {
                            ;
                            o.prototype.insertRule = new Proxy(l[r].insertRule, {
                                apply: We((r, o, s) => {
                                    const [i, a] = s, {
                                        id: c,
                                        styleId: l
                                    } = Ze(o.parentStyleSheet, t, n.styleMirror);
                                    return (c && -1 !== c || l && -1 !== l) && e({
                                        id: c,
                                        styleId: l,
                                        adds: [{
                                            rule: i,
                                            index: [...Xe(o), a || 0]
                                        }]
                                    }), r.apply(o, s);
                                })
                            });
                            o.prototype.deleteRule = new Proxy(l[r].deleteRule, {
                                apply: We((r, o, s) => {
                                    const [i] = s, {
                                        id: a,
                                        styleId: c
                                    } = Ze(o.parentStyleSheet, t, n.styleMirror);
                                    return (a && -1 !== a || c && -1 !== c) && e({
                                        id: a,
                                        styleId: c,
                                        removes: [{
                                            index: [...Xe(o), i]
                                        }]
                                    }), r.apply(o, s);
                                })
                            });;
                        }), We(() => {
                            r.CSSStyleSheet.prototype.insertRule = o;
                            r.CSSStyleSheet.prototype.deleteRule = s;
                            i && (r.CSSStyleSheet.prototype.replace = i);
                            a && (r.CSSStyleSheet.prototype.replaceSync = a);
                            Object.entries(c).forEach(([e, t]) => {
                                t.prototype.insertRule = l[e].insertRule;
                                t.prototype.deleteRule = l[e].deleteRule;;
                            });;
                        });
                    }(e, {
                        win: n
                    }), d = Qe(e, e.doc), p = function({
                        styleDeclarationCb: e,
                        mirror: t,
                        ignoreCSSAttributes: n,
                        stylesheetManager: r
                    }, {
                        win: o
                    }) {
                        const s = o.CSSStyleDeclaration.prototype.setProperty;
                        o.CSSStyleDeclaration.prototype.setProperty = new Proxy(s, {
                            apply: We((o, i, a) => {
                                const [c, l, u] = a;
                                if (n.has(c)) {
                                    return s.apply(i, [c, l, u]);
                                }
                                const {
                                    id: d,
                                    styleId: p
                                } = Ze(Ge([i, "access", e => e.parentRule, "optionalAccess", e => e.parentStyleSheet]), t, r.styleMirror);
                                return (d && -1 !== d || p && -1 !== p) && e({
                                    id: d,
                                    styleId: p,
                                    set: {
                                        property: c,
                                        value: l,
                                        priority: u
                                    },
                                    index: Xe(i.parentRule)
                                }), o.apply(i, a);
                            })
                        });
                        const i = o.CSSStyleDeclaration.prototype.removeProperty;
                        return o.CSSStyleDeclaration.prototype.removeProperty = new Proxy(i, {
                            apply: We((o, s, a) => {
                                const [c] = a;
                                if (n.has(c)) {
                                    return i.apply(s, [c]);
                                }
                                const {
                                    id: l,
                                    styleId: u
                                } = Ze(Ge([s, "access", e => e.parentRule, "optionalAccess", e => e.parentStyleSheet]), t, r.styleMirror);
                                return (l && -1 !== l || u && -1 !== u) && e({
                                    id: l,
                                    styleId: u,
                                    remove: {
                                        property: c
                                    },
                                    index: Xe(s.parentRule)
                                }), o.apply(s, a);
                            })
                        }), We(() => {
                            o.CSSStyleDeclaration.prototype.setProperty = s;
                            o.CSSStyleDeclaration.prototype.removeProperty = i;;
                        });
                    }(e, {
                        win: n
                    }), e.collectFonts && (h = function({
                        fontCb: e,
                        doc: t
                    }) {
                        const n = t.defaultView;
                        if (!n) {
                            return () => {};
                        }
                        const r = [],
                            o = new WeakMap,
                            s = n.FontFace;;
                        const i = ae(t.fonts, "add", function(t) {
                            return function(n) {
                                return Ie("setTimeout")(...e), t.apply(this, [n]);
                            };
                        });
                        return r.push(() => {
                            ;
                        }), r.push(i), We(() => {
                            r.forEach(e => e());
                        });
                    }(e)));
                    const m = function(e) {
                            const {
                                doc: t,
                                mirror: n,
                                blockClass: r,
                                blockSelector: o,
                                unblockSelector: s,
                                selectionCb: i
                            } = e;
                            let a = true;
                            const c = We(() => {
                                const e = t.getSelection();
                                if (!e || a && Ge([e, "optionalAccess", e => e.isCollapsed])) {
                                    return;
                                }
                                a = e.isCollapsed || false;
                                const c = [],
                                    l = e.rangeCount || 0;
                                for (let t = 0; t < l; t++) {
                                    const i = e.getRangeAt(t),
                                        {
                                            startContainer: a,
                                            startOffset: l,
                                            endContainer: u,
                                            endOffset: d
                                        } = i;
                                    he(a, r, o, s, true) || he(u, r, o, s, true) || c.push({
                                        start: n.getId(a),
                                        startOffset: l,
                                        end: n.getId(u),
                                        endOffset: d
                                    });
                                }
                                i({
                                    ranges: c
                                });
                            });
                            return c(), ne("selectionchange", c);
                        }(e),
                        f = function({
                            doc: e,
                            customElementCb: t
                        }) {
                            const n = e.defaultView;
                            return n && n.customElements ? ae(n.customElements, "define", function(e) {
                                return function(n, r, o) {
                                    try {
                                        t({
                                            define: {
                                                name: n
                                            }
                                        });
                                    } catch (e) {}
                                    return e.apply(this, [n, r, o]);
                                };
                            }) : () => {};
                        }(e),
                        g = [];
                    for (const t of e.plugins) g.push(t.observer(t.callback, n, t.options));
                    return We(() => {
                        $e.forEach(e => e.reset());
                        Ge([r, "optionalAccess", e => e.disconnect, "call", e => e()]);
                        o();
                        s();
                        i();
                        a();
                        c();
                        l();
                        u();
                        d();
                        p();
                        h();
                        m();
                        f();
                        g.forEach(e => e());;
                    });
                }
                class rt {
                    constructor(e) {
                        this.generateIdFn = e;
                        this.iframeIdToRemoteIdMap = new WeakMap;
                        this.iframeRemoteIdToIdMap = new WeakMap;;
                    }
                    getId(e, t, n, r) {
                        const o = n || this.getIdToRemoteIdMap(e),
                            s = r || this.getRemoteIdToIdMap(e);
                        let i = o.get(t);
                        return i || (i = this.generateIdFn(), o.set(t, i), s.set(i, t)), i;
                    }
                    getIds(e, t) {
                        const n = this.getIdToRemoteIdMap(e),
                            r = this.getRemoteIdToIdMap(e);
                        return t.map(t => this.getId(e, t, n, r));
                    }
                    getRemoteId(e, t, n) {
                        const r = n || this.getRemoteIdToIdMap(e);
                        if ("number" != typeof t) {
                            return t;
                        }
                        return r.get(t) || -1;
                    }
                    getRemoteIds(e, t) {
                        const n = this.getRemoteIdToIdMap(e);
                        return t.map(t => this.getRemoteId(e, t, n));
                    }
                    reset(e) {
                        if (!e) {
                            return this.iframeIdToRemoteIdMap = new WeakMap, void(this.iframeRemoteIdToIdMap = new WeakMap);
                        }
                        this.iframeIdToRemoteIdMap.delete(e);
                        this.iframeRemoteIdToIdMap.delete(e);;
                    }
                    getIdToRemoteIdMap(e) {
                        let t = this.iframeIdToRemoteIdMap.get(e);
                        return t || (t = new Map, this.iframeIdToRemoteIdMap.set(e, t)), t;
                    }
                    getRemoteIdToIdMap(e) {
                        let t = this.iframeRemoteIdToIdMap.get(e);
                        return t || (t = new Map, this.iframeRemoteIdToIdMap.set(e, t)), t;
                    }
                }

                function ot(e) {
                    let t, n = e[0],
                        r = 1;
                    for (; r < e.length;) {
                        const o = e[r],
                            s = e[r + 1];
                        if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) {
                            return;
                        }
                        "access" === o || "optionalAccess" === o ? (t = n, n = s(n)) : "call" !== o && "optionalCall" !== o || (n = s((...e) => n.call(t, ...e)), t = undefined);
                    }
                    return n;
                }
                class st {
                    constructor() {
                        this.crossOriginIframeMirror = new rt(P);
                        this.crossOriginIframeRootIdMap = new WeakMap;;
                    }
                    addIframe() {}
                    addLoadListener() {}
                    attachIframe() {}
                }
                class it {
                    constructor(e) {
                        this.iframes = new WeakMap;
                        this.crossOriginIframeMap = new WeakMap;
                        this.crossOriginIframeMirror = new rt(P);
                        this.crossOriginIframeRootIdMap = new WeakMap;
                        this.mutationCb = e.mutationCb;
                        this.wrappedEmit = e.wrappedEmit;
                        this.stylesheetManager = e.stylesheetManager;
                        this.recordCrossOriginIframes = e.recordCrossOriginIframes;
                        this.crossOriginIframeStyleMirror = new rt(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror));
                        this.mirror = e.mirror;
                        this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));;
                    }
                    addIframe(e) {
                        this.iframes.set(e, true);
                        e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e);;
                    }
                    addLoadListener(e) {
                        this.loadListener = e;
                    }
                    attachIframe(e, t) {
                        this.mutationCb({
                            adds: [{
                                parentId: this.mirror.getId(e),
                                nextId: null,
                                node: t
                            }],
                            removes: [],
                            texts: [],
                            attributes: [],
                            isAttachIframe: true
                        });
                        ot([this, "access", e => e.loadListener, "optionalCall", t => t(e)]);
                        e.contentDocument && e.contentDocument.adoptedStyleSheets && e.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(e.contentDocument.adoptedStyleSheets, this.mirror.getId(e.contentDocument));;
                    }
                    handleMessage(e) {
                        const t = e;
                        if ("rrweb" !== t.data.type || t.origin !== t.data.origin) {
                            return;
                        }
                        if (!e.source) {
                            return;
                        }
                        const n = this.crossOriginIframeMap.get(e.source);
                        if (!n) {
                            return;
                        }
                        const r = this.transformCrossOriginEvent(n, t.data.event);
                        r && this.wrappedEmit(r, t.data.isCheckout);
                    }
                    transformCrossOriginEvent(e, t) {
                        switch (t.type) {
                            case we.FullSnapshot: {
                                this.crossOriginIframeMirror.reset(e);
                                this.crossOriginIframeStyleMirror.reset(e);
                                this.replaceIdOnNode(t.data.node, e);;
                                const n = t.data.node.id;
                                return this.crossOriginIframeRootIdMap.set(e, n), this.patchRootIdOnNode(t.data.node, n), {
                                    timestamp: t.timestamp,
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.Mutation,
                                        adds: [{
                                            parentId: this.mirror.getId(e),
                                            nextId: null,
                                            node: t.data.node
                                        }],
                                        removes: [],
                                        texts: [],
                                        attributes: [],
                                        isAttachIframe: true
                                    }
                                };
                            }
                            case we.Meta:
                            case we.Load:
                            case we.DomContentLoaded:
                                return false;
                            case we.Plugin:
                                return t;
                            case we.Custom:
                                return this.replaceIds(t.data.payload, e, ["id", "parentId", "previousId", "nextId"]), t;
                            case we.IncrementalSnapshot:
                                switch (t.data.source) {
                                    case ke.Mutation:
                                        return t.data.adds.forEach(t => {
                                            this.replaceIds(t, e, ["parentId", "nextId", "previousId"]);
                                            this.replaceIdOnNode(t.node, e);;
                                            const n = this.crossOriginIframeRootIdMap.get(e);
                                            n && this.patchRootIdOnNode(t.node, n);
                                        }), t.data.removes.forEach(t => {
                                            this.replaceIds(t, e, ["parentId", "id"]);
                                        }), t.data.attributes.forEach(t => {
                                            this.replaceIds(t, e, ["id"]);
                                        }), t.data.texts.forEach(t => {
                                            this.replaceIds(t, e, ["id"]);
                                        }), t;
                                    case ke.Drag:
                                    case ke.TouchMove:
                                    case ke.MouseMove:
                                        return t.data.positions.forEach(t => {
                                            this.replaceIds(t, e, ["id"]);
                                        }), t;
                                    case ke.ViewportResize:
                                        return false;
                                    case ke.MediaInteraction:
                                    case ke.MouseInteraction:
                                    case ke.Scroll:
                                    case ke.CanvasMutation:
                                    case ke.Input:
                                        return this.replaceIds(t.data, e, ["id"]), t;
                                    case ke.StyleSheetRule:
                                    case ke.StyleDeclaration:
                                        return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
                                    case ke.Font:
                                        return t;
                                    case ke.Selection:
                                        return t.data.ranges.forEach(t => {
                                            this.replaceIds(t, e, ["start", "end"]);
                                        }), t;
                                    case ke.AdoptedStyleSheet:
                                        return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleIds"]), ot([t, "access", e => e.data, "access", e => e.styles, "optionalAccess", e => e.forEach, "call", t => t(t => {
                                            this.replaceStyleIds(t, e, ["styleId"]);
                                        })]), t;
                                }
                        }
                        return false;
                    }
                    replace(e, t, n, r) {
                        for (const o of r)(Array.isArray(t[o]) || "number" == typeof t[o]) && (Array.isArray(t[o]) ? t[o] = e.getIds(n, t[o]) : t[o] = e.getId(n, t[o]));
                        return t;
                    }
                    replaceIds(e, t, n) {
                        return this.replace(this.crossOriginIframeMirror, e, t, n);
                    }
                    replaceStyleIds(e, t, n) {
                        return this.replace(this.crossOriginIframeStyleMirror, e, t, n);
                    }
                    replaceIdOnNode(e, t) {
                        this.replaceIds(e, t, ["id", "rootId"]);
                        "childNodes" in e && e.childNodes.forEach(e => {
                            this.replaceIdOnNode(e, t);
                        });;
                    }
                    patchRootIdOnNode(e, t) {
                        e.type === f.Document || e.rootId || (e.rootId = t);
                        "childNodes" in e && e.childNodes.forEach(e => {
                            this.patchRootIdOnNode(e, t);
                        });;
                    }
                }
                class at {
                    init() {}
                    addShadowRoot() {}
                    observeAttachShadow() {}
                    reset() {}
                }
                class ct {
                    constructor(e) {
                        this.shadowDoms = new WeakSet;
                        this.restoreHandlers = [];
                        this.mutationCb = e.mutationCb;
                        this.scrollCb = e.scrollCb;
                        this.bypassOptions = e.bypassOptions;
                        this.mirror = e.mirror;
                        this.init();;
                    }
                    init() {
                        this.reset();
                        this.patchAttachShadow(Element, document);;
                    }
                    addShadowRoot(e, t) {
                        if (!("[object ShadowRoot]" === Object.prototype.toString.call(e))) {
                            return;
                        }
                        if (this.shadowDoms.has(e)) {
                            return;
                        }
                        this.shadowDoms.add(e);
                        this.bypassOptions.canvasManager.addShadowRoot(e);;
                        const n = qe({
                            ...this.bypassOptions,
                            doc: t,
                            mutationCb: this.mutationCb,
                            mirror: this.mirror,
                            shadowDomManager: this
                        }, e);
                        this.restoreHandlers.push(() => n.disconnect());
                        this.restoreHandlers.push(Ye({
                            ...this.bypassOptions,
                            scrollCb: this.scrollCb,
                            doc: e,
                            mirror: this.mirror
                        }));
                        Ie("setTimeout")(...e);;
                    }
                    observeAttachShadow(e) {
                        e.contentWindow && e.contentDocument && this.patchAttachShadow(e.contentWindow.Element, e.contentDocument);
                    }
                    patchAttachShadow(e, t) {
                        const n = this;
                        this.restoreHandlers.push(ae(e.prototype, "attachShadow", function(e) {
                            return function(r) {
                                const o = e.call(this, r);
                                return this.shadowRoot && Ee(this) && n.addShadowRoot(this.shadowRoot, t), o;
                            };
                        }));
                    }
                    reset() {
                        this.restoreHandlers.forEach(e => {
                            try {
                                e();
                            } catch (e) {}
                        });
                        this.restoreHandlers = [];
                        this.shadowDoms = new WeakSet;
                        this.bypassOptions.canvasManager.resetShadowRoots();;
                    }
                }
                class lt {
                    reset() {}
                    freeze() {}
                    unfreeze() {}
                    lock() {}
                    unlock() {}
                    snapshot() {}
                    addWindow() {}
                    addShadowRoot() {}
                    resetShadowRoots() {}
                }
                class ut {
                    constructor(e) {
                        this.trackedLinkElements = new WeakSet;
                        this.styleMirror = new ve;
                        this.mutationCb = e.mutationCb;
                        this.adoptedStyleSheetCb = e.adoptedStyleSheetCb;;
                    }
                    attachLinkElement(e, t) {
                        "_cssText" in t.attributes && this.mutationCb({
                            adds: [],
                            removes: [],
                            texts: [],
                            attributes: [{
                                id: t.id,
                                attributes: t.attributes
                            }]
                        });
                        this.trackLinkElement(e);;
                    }
                    trackLinkElement(e) {
                        this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e));
                    }
                    adoptStyleSheets(e, t) {
                        if (0 === e.length) {
                            return;
                        }
                        const n = {
                                id: t,
                                styleIds: []
                            },
                            r = [];
                        for (const t of e) {
                            let e;
                            this.styleMirror.has(t) ? e = this.styleMirror.getId(t) : (e = this.styleMirror.add(t), r.push({
                                styleId: e,
                                rules: Array.from(t.rules || CSSRule, (e, t) => ({
                                    rule: S(e),
                                    index: t
                                }))
                            }));
                            n.styleIds.push(e);;
                        }
                        r.length > 0 && (n.styles = r);
                        this.adoptedStyleSheetCb(n);;
                    }
                    reset() {
                        this.styleMirror.reset();
                        this.trackedLinkElements = new WeakSet;;
                    }
                    trackStylesheetInLinkElement(e) {}
                }
                class dt {
                    constructor() {
                        this.nodeMap = new WeakMap;
                        this.active = false;;
                    }
                    inOtherBuffer(e, t) {
                        const n = this.nodeMap.get(e);
                        return n && Array.from(n).some(e => e !== t);
                    }
                    add(e, t) {
                        this.active || (this.active = true, function(...e) {
                            Ie("requestAnimationFrame")(...e);
                        }(() => {
                            this.nodeMap = new WeakMap;
                            this.active = false;;
                        }));
                        this.nodeMap.set(e, (this.nodeMap.get(e) || new Set).add(t));;
                    }
                    destroy() {}
                }
                let pt, ht;
                try {
                    if (2 !== Array.from([1], e => 2 * e)[0]) {
                        const e = document.createElement("iframe");
                        document.body.appendChild(e);
                        Array.from = o([e, "access", e => e.contentWindow, "optionalAccess", e => e.Array, "access", e => e.from]) || Array.from;
                        document.body.removeChild(e);;
                    }
                } catch (e) {
                    console.debug("Unable to override Array.from", e);
                }
                const mt = new v;

                function ft(e = {}) {
                    const {
                        emit: t,
                        checkoutEveryNms: n,
                        checkoutEveryNth: r,
                        blockClass: s = "rr-block",
                        blockSelector: i = null,
                        unblockSelector: a = null,
                        ignoreClass: c = "rr-ignore",
                        ignoreSelector: l = null,
                        maskAllText: u = false,
                        maskTextClass: d = "rr-mask",
                        unmaskTextClass: p = null,
                        maskTextSelector: h = null,
                        unmaskTextSelector: m = null,
                        inlineStylesheet: f = true,
                        maskAllInputs: g,
                        maskInputOptions: _,
                        slimDOMOptions: y,
                        maskAttributeFn: S,
                        maskInputFn: b,
                        maskTextFn: E,
                        maxCanvasSize: T = null,
                        packFn: I,
                        sampling: C = {},
                        dataURLOptions: w = {},
                        mousemoveWait: k,
                        recordDOM: A = true,
                        recordCanvas: M = false,
                        recordCrossOriginIframes: x = false,
                        recordAfter: O = "DOMContentLoaded" === e.recordAfter ? e.recordAfter : "load",
                        userTriggeredOnInput: R = false,
                        collectFonts: D = false,
                        inlineImages: N = false,
                        plugins: P,
                        keepIframeSrcFn: L = () => false,
                        ignoreCSSAttributes: U = new Set([]),
                        errorHandler: B,
                        onMutation: F,
                        getCanvasManager: H
                    } = e;
                    He(B);
                    const j = !x || window.parent === window;
                    let W = false;
                    if (!j) {
                        try {
                            window.parent.document && (W = false);
                        } catch (e) {
                            W = true;
                        }
                    }
                    if (j && !t) {
                        throw new Error("emit function is required");
                    }
                    if (!j && !W) {
                        return () => {};
                    }
                    undefined !== k && undefined === C.mousemove && (C.mousemove = k);
                    mt.reset();;
                    const G = true === g ? {
                            color: true,
                            date: true,
                            "datetime-local": true,
                            email: true,
                            month: true,
                            number: true,
                            range: true,
                            search: true,
                            tel: true,
                            text: true,
                            time: true,
                            url: true,
                            week: true,
                            textarea: true,
                            select: true,
                            radio: true,
                            checkbox: true
                        } : undefined !== _ ? _ : {},
                        $ = true === y || "all" === y ? {
                            script: true,
                            comment: true,
                            headFavicon: true,
                            headWhitespace: true,
                            headMetaSocial: true,
                            headMetaRobots: true,
                            headMetaHttpEquiv: true,
                            headMetaVerification: true,
                            headMetaAuthorship: "all" === y,
                            headMetaDescKeywords: "all" === y
                        } : y || {};
                    let z;
                    ! function(e = window) {
                        "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach);
                        "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach);
                        Node.prototype.contains || (Node.prototype.contains = (...e) => {
                            let t = e[0];
                            if (!(0 in e)) {
                                throw new TypeError("1 argument is required");
                            }
                            do {
                                if (this === t) {
                                    return true;
                                }
                            } while (t = t && t.parentNode);
                            return false;
                        });;
                    }();
                    let q = 0;
                    const Y = e => {
                        for (const t of P || []) t.eventProcessor && (e = t.eventProcessor(e));
                        return I && !W && (e = e.toUpperCase()), e;
                    };
                    pt = (e, s) => {
                        const i = e;
                        if (i.timestamp = ce(), !o([$e, "access", e => e[0], "optionalAccess", e => e.isFrozen, "call", e => e()]) || i.type === we.FullSnapshot || i.type === we.IncrementalSnapshot && i.data.source === ke.Mutation || $e.forEach(e => e.unfreeze()), j) {
                            o([t, "optionalCall", e => e(Y(i), s)]);
                        } else {
                            if (W) {
                                const e = {
                                    type: "rrweb",
                                    event: Y(i),
                                    origin: window.location.origin,
                                    isCheckout: s
                                };
                                window.parent.postMessage(e, "*");
                            }
                        }
                        if (i.type === we.FullSnapshot) {
                            z = i;
                            q = 0;;
                        } else {
                            if (i.type === we.IncrementalSnapshot) {
                                if (i.data.source === ke.Mutation && i.data.isAttachIframe) {
                                    return;
                                }
                                q++;
                                const e = r && q >= r,
                                    t = n && z && i.timestamp - z.timestamp > n;
                                (e || t) && oe(true);
                            }
                        }
                    };
                    const V = e => {
                            pt({
                                type: we.IncrementalSnapshot,
                                data: {
                                    source: ke.Mutation,
                                    ...e
                                }
                            });
                        },
                        J = e => pt({
                            type: we.IncrementalSnapshot,
                            data: {
                                source: ke.Scroll,
                                ...e
                            }
                        }),
                        K = e => pt({
                            type: we.IncrementalSnapshot,
                            data: {
                                source: ke.CanvasMutation,
                                ...e
                            }
                        }),
                        X = new ut({
                            mutationCb: V,
                            adoptedStyleSheetCb: e => pt({
                                type: we.IncrementalSnapshot,
                                data: {
                                    source: ke.AdoptedStyleSheet,
                                    ...e
                                }
                            })
                        }),
                        Z = "boolean" == typeof __RRWEB_EXCLUDE_IFRAME__ && __RRWEB_EXCLUDE_IFRAME__ ? new st : new it({
                            mirror: mt,
                            mutationCb: V,
                            stylesheetManager: X,
                            recordCrossOriginIframes: x,
                            wrappedEmit: pt
                        });
                    for (const e of P || []) e.getMirror && e.getMirror({
                        nodeMirror: mt,
                        crossOriginIframeMirror: Z.crossOriginIframeMirror,
                        crossOriginIframeStyleMirror: Z.crossOriginIframeStyleMirror
                    });
                    const Q = new dt,
                        te = function(e, t) {
                            try {
                                return e ? e(t) : new lt;
                            } catch (e) {
                                return console.warn("Unable to initialize CanvasManager"), new lt;
                            }
                        }(H, {
                            mirror: mt,
                            win: window,
                            mutationCb: e => pt({
                                type: we.IncrementalSnapshot,
                                data: {
                                    source: ke.CanvasMutation,
                                    ...e
                                }
                            }),
                            recordCanvas: M,
                            blockClass: s,
                            blockSelector: i,
                            unblockSelector: a,
                            maxCanvasSize: T,
                            sampling: C.canvas,
                            dataURLOptions: w,
                            errorHandler: B
                        }),
                        re = "boolean" == typeof __RRWEB_EXCLUDE_SHADOW_DOM__ && __RRWEB_EXCLUDE_SHADOW_DOM__ ? new at : new ct({
                            mutationCb: V,
                            scrollCb: J,
                            bypassOptions: {
                                onMutation: F,
                                blockClass: s,
                                blockSelector: i,
                                unblockSelector: a,
                                maskAllText: u,
                                maskTextClass: d,
                                unmaskTextClass: p,
                                maskTextSelector: h,
                                unmaskTextSelector: m,
                                inlineStylesheet: f,
                                maskInputOptions: G,
                                dataURLOptions: w,
                                maskAttributeFn: S,
                                maskTextFn: E,
                                maskInputFn: b,
                                recordCanvas: M,
                                inlineImages: N,
                                sampling: C,
                                slimDOMOptions: $,
                                iframeManager: Z,
                                stylesheetManager: X,
                                canvasManager: te,
                                keepIframeSrcFn: L,
                                processedNodeManager: Q
                            },
                            mirror: mt
                        }),
                        oe = (e = false) => {
                            if (!A) {
                                return;
                            }
                            pt({
                                type: we.Meta,
                                data: {
                                    href: window.location.href,
                                    width: window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth,
                                    height: window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
                                }
                            }, e);
                            X.reset();
                            re.init();
                            $e.forEach(e => e.lock());;
                            const t = function(e, t) {
                                const {
                                    mirror: n = new v,
                                    blockClass: r = "rr-block",
                                    blockSelector: o = null,
                                    unblockSelector: s = null,
                                    maskAllText: i = false,
                                    maskTextClass: a = "rr-mask",
                                    unmaskTextClass: c = null,
                                    maskTextSelector: l = null,
                                    unmaskTextSelector: u = null,
                                    inlineStylesheet: d = true,
                                    inlineImages: p = false,
                                    recordCanvas: h = false,
                                    maskAllInputs: m = false,
                                    maskAttributeFn: f,
                                    maskTextFn: g,
                                    maskInputFn: _,
                                    slimDOM: y = false,
                                    dataURLOptions: S,
                                    preserveWhiteSpace: b,
                                    onSerialize: E,
                                    onIframeLoad: T,
                                    iframeLoadTimeout: I,
                                    onStylesheetLoad: C,
                                    stylesheetLoadTimeout: w,
                                    keepIframeSrcFn: k = () => false
                                } = t || {};
                                return ee(e, {
                                    doc: e,
                                    mirror: n,
                                    blockClass: r,
                                    blockSelector: o,
                                    unblockSelector: s,
                                    maskAllText: i,
                                    maskTextClass: a,
                                    unmaskTextClass: c,
                                    maskTextSelector: l,
                                    unmaskTextSelector: u,
                                    skipChild: false,
                                    inlineStylesheet: d,
                                    maskInputOptions: true === m ? {
                                        color: true,
                                        date: true,
                                        "datetime-local": true,
                                        email: true,
                                        month: true,
                                        number: true,
                                        range: true,
                                        search: true,
                                        tel: true,
                                        text: true,
                                        time: true,
                                        url: true,
                                        week: true,
                                        textarea: true,
                                        select: true
                                    } : false === m ? {} : m,
                                    maskAttributeFn: f,
                                    maskTextFn: g,
                                    maskInputFn: _,
                                    slimDOMOptions: true === y || "all" === y ? {
                                        script: true,
                                        comment: true,
                                        headFavicon: true,
                                        headWhitespace: true,
                                        headMetaDescKeywords: "all" === y,
                                        headMetaSocial: true,
                                        headMetaRobots: true,
                                        headMetaHttpEquiv: true,
                                        headMetaAuthorship: true,
                                        headMetaVerification: true
                                    } : false === y ? {} : y,
                                    dataURLOptions: S,
                                    inlineImages: p,
                                    recordCanvas: h,
                                    preserveWhiteSpace: b,
                                    onSerialize: E,
                                    onIframeLoad: T,
                                    iframeLoadTimeout: I,
                                    onStylesheetLoad: C,
                                    stylesheetLoadTimeout: w,
                                    keepIframeSrcFn: k,
                                    newlyAddedElement: false
                                });
                            }(document, {
                                mirror: mt,
                                blockClass: s,
                                blockSelector: i,
                                unblockSelector: a,
                                maskAllText: u,
                                maskTextClass: d,
                                unmaskTextClass: p,
                                maskTextSelector: h,
                                unmaskTextSelector: m,
                                inlineStylesheet: f,
                                maskAllInputs: G,
                                maskAttributeFn: S,
                                maskInputFn: b,
                                maskTextFn: E,
                                slimDOM: $,
                                dataURLOptions: w,
                                recordCanvas: M,
                                inlineImages: N,
                                onSerialize: e => {
                                    Boolean("IFRAME" === e.nodeName && mt.getMeta(e)) && Z.addIframe(e);
                                    Boolean("LINK" === e.nodeName && e.nodeType === e.ELEMENT_NODE && e.getAttribute && "stylesheet" === e.getAttribute("rel") && mt.getMeta(e)) && X.trackLinkElement(e);
                                    Boolean(te([e, "optionalAccess", e => e.shadowRoot])) && re.addShadowRoot(e.shadowRoot, document);;
                                },
                                onIframeLoad: (e, t) => {
                                    Z.attachIframe(e, t);
                                    e.contentWindow && te.addWindow(e.contentWindow);
                                    re.observeAttachShadow(e);;
                                },
                                onStylesheetLoad: (e, t) => {
                                    X.attachLinkElement(e, t);
                                },
                                keepIframeSrcFn: L
                            });
                            if (!t) {
                                return console.warn("Failed to snapshot the document");
                            }
                            pt({
                                type: we.FullSnapshot,
                                data: {
                                    node: t,
                                    initialOffset: le(window)
                                }
                            });
                            $e.forEach(e => e.unlock());
                            document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && X.adoptStyleSheets(document.adoptedStyleSheets, mt.getId(document));;
                        };
                    ht = oe;
                    try {
                        const e = [],
                            t = e => We(et)({
                                onMutation: F,
                                mutationCb: V,
                                mousemoveCb: (e, t) => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: t,
                                        positions: e
                                    }
                                }),
                                mouseInteractionCb: e => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.MouseInteraction,
                                        ...e
                                    }
                                }),
                                scrollCb: J,
                                viewportResizeCb: e => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.ViewportResize,
                                        ...e
                                    }
                                }),
                                inputCb: e => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.Input,
                                        ...e
                                    }
                                }),
                                mediaInteractionCb: e => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.MediaInteraction,
                                        ...e
                                    }
                                }),
                                styleSheetRuleCb: e => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.StyleSheetRule,
                                        ...e
                                    }
                                }),
                                styleDeclarationCb: e => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.StyleDeclaration,
                                        ...e
                                    }
                                }),
                                canvasMutationCb: K,
                                fontCb: e => pt({
                                    type: we.IncrementalSnapshot,
                                    data: {
                                        source: ke.Font,
                                        ...e
                                    }
                                }),
                                selectionCb: e => {
                                    pt({
                                        type: we.IncrementalSnapshot,
                                        data: {
                                            source: ke.Selection,
                                            ...e
                                        }
                                    });
                                },
                                customElementCb: e => {
                                    pt({
                                        type: we.IncrementalSnapshot,
                                        data: {
                                            source: ke.CustomElement,
                                            ...e
                                        }
                                    });
                                },
                                blockClass: s,
                                ignoreClass: c,
                                ignoreSelector: l,
                                maskAllText: u,
                                maskTextClass: d,
                                unmaskTextClass: p,
                                maskTextSelector: h,
                                unmaskTextSelector: m,
                                maskInputOptions: G,
                                inlineStylesheet: f,
                                sampling: C,
                                recordDOM: A,
                                recordCanvas: M,
                                inlineImages: N,
                                userTriggeredOnInput: R,
                                collectFonts: D,
                                doc: e,
                                maskAttributeFn: S,
                                maskInputFn: b,
                                maskTextFn: E,
                                keepIframeSrcFn: L,
                                blockSelector: i,
                                unblockSelector: a,
                                slimDOMOptions: $,
                                dataURLOptions: w,
                                mirror: mt,
                                iframeManager: Z,
                                stylesheetManager: X,
                                shadowDomManager: re,
                                processedNodeManager: Q,
                                canvasManager: te,
                                ignoreCSSAttributes: U,
                                plugins: o([P, "optionalAccess", e => e.filter, "call", e => e(e => e.observer), "optionalAccess", e => e.map, "call", e => e(e => ({
                                    observer: e.observer,
                                    options: e.options,
                                    callback: t => pt({
                                        type: we.Plugin,
                                        data: {
                                            plugin: e.name,
                                            payload: t
                                        }
                                    })
                                }))]) || []
                            }, {});
                        Z.addLoadListener(n => {
                            try {
                                e.push(t(n.contentDocument));
                            } catch (e) {
                                console.warn(e);
                            }
                        });
                        const n = () => {
                            oe();
                            e.push(t(document));;
                        };
                        return "interactive" === document.readyState || "complete" === document.readyState ? n() : (e.push(ne("DOMContentLoaded", () => {
                            pt({
                                type: we.DomContentLoaded,
                                data: {}
                            });
                            "DOMContentLoaded" === O && n();;
                        })), e.push(ne("load", () => {
                            pt({
                                type: we.Load,
                                data: {}
                            });
                            "load" === O && n();;
                        }, window))), () => {
                            e.forEach(e => e());
                            Q.destroy();
                            ht = undefined;
                            je();;
                        };
                    } catch (e) {
                        console.warn(e);
                    }
                }
                ft.mirror = mt;
                ft.takeFullSnapshot = function(e) {
                    if (!ht) {
                        throw new Error("please take full snapshot after start recording");
                    }
                    ht(e);
                };;
                const gt = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
                    _t = ["info", "warn", "error", "log"];

                function St(e, t = "info") {
                    s.addBreadcrumb({
                        category: "console",
                        data: {
                            logger: "replay"
                        },
                        level: t,
                        message: `${"[Replay] "}${e}`
                    }, {
                        level: t
                    });
                }
                const vt = function() {
                    let e = false,
                        t = false;
                    const n = {
                        exception: () => {},
                        infoTick: () => {},
                        setConfig: n => {
                            e = n.captureExceptions;
                            t = n.traceInternals;;
                        }
                    };
                    return gt ? (_t.forEach(e => {
                        ;
                    }), n.exception = (r, ...o) => {
                        o.length && n.error && n.error(...o);
                        s.logger.error("[Replay] ", r);
                        e ? s.captureException(r) : t && St(r, "error");;
                    }, n.infoTick = (...e) => {
                        s.logger.info("[Replay] ", ...e);
                        t && setTimeout(() => St(e[0]), 0);;
                    }) : _t.forEach(e => {
                        ;
                    }), n;
                }();

                function bt(e) {
                    return e > 9999999999 ? e : 1e3 * e;
                }

                function Et(e) {
                    return e > 9999999999 ? e / 1e3 : e;
                }

                function Tt(e, t) {
                    if ("sentry.transaction" !== t.category) {
                        ["ui.click", "ui.input"].includes(t.category) ? e.triggerUserActivity() : e.checkAndHandleExpiredSession();
                        e.addUpdate(() => (e.throttledAddEvent({
                            type: we.Custom,
                            timestamp: 1e3 * (t.timestamp || 0),
                            data: {
                                tag: "breadcrumb",
                                payload: s.normalize(t, 10, 1e3)
                            }
                        }), "console" === t.category));
                    }
                }

                function Ct(e) {
                    const t = wt(e);
                    return t && t instanceof Element ? t.closest("button,a") || t : t;
                }

                function wt(e) {
                    return function(e) {
                        return "object" == typeof e && !!e && "target" in e;
                    }(e) ? e.target : e;
                }
                let kt;
                const At = new Set([ke.Mutation, ke.StyleSheetRule, ke.StyleDeclaration, ke.AdoptedStyleSheet, ke.CanvasMutation, ke.Selection, ke.MediaInteraction]);
                class Mt {
                    constructor(e, t, n = Tt) {
                        this._lastMutation = 0;
                        this._lastScroll = 0;
                        this._clicks = [];
                        this._timeout = t.timeout / 1e3;
                        this._threshold = t.threshold / 1e3;
                        this._scrollTimeout = t.scrollTimeout / 1e3;
                        this._replay = e;
                        this._ignoreSelector = t.ignoreSelector;
                        this._addBreadcrumbEvent = n;;
                    }
                    addListeners() {
                        const e = (t = () => {
                            this._lastMutation = Date.now() / 1e3;
                        }, kt || (kt = [], s.fill(a, "open", function(e) {
                            return function(...t) {
                                if (kt) {
                                    try {
                                        kt.forEach(e => e());
                                    } catch (e) {}
                                }
                                return e.apply(a, t);
                            };
                        })), kt.push(t), () => {
                            const e = kt ? kt.indexOf(t) : -1;
                            e > -1 && kt.splice(e, 1);
                        });
                        var t;
                        this._teardown = () => {
                            e();
                            this._clicks = [];
                            this._lastMutation = 0;
                            this._lastScroll = 0;;
                        };
                    }
                    removeListeners() {
                        this._teardown && this._teardown();
                        this._checkClickTimeout && clearTimeout(this._checkClickTimeout);;
                    }
                    handleClick(e, t) {
                        if (function(e, t) {
                                return !xt.includes(e.tagName) || ("INPUT" === e.tagName && !["submit", "button"].includes(e.getAttribute("type") || "") || (!("A" !== e.tagName || !(e.hasAttribute("download") || e.hasAttribute("target") && "_self" !== e.getAttribute("target"))) || !(!t || !e.matches(t))));
                            }(t, this._ignoreSelector) || ! function(e) {
                                return !(!e.data || "number" != typeof e.data.nodeId || !e.timestamp);
                            }(e)) {
                            return;
                        }
                        const n = {
                            timestamp: Et(e.timestamp),
                            clickBreadcrumb: e,
                            clickCount: 0,
                            node: t
                        };
                        this._clicks.some(e => e.node === n.node && Math.abs(e.timestamp - n.timestamp) < 1) || (this._clicks.push(n), 1 === this._clicks.length && this._scheduleCheckClicks());
                    }
                    registerMutation(e = Date.now()) {
                        this._lastMutation = Et(e);
                    }
                    registerScroll(e = Date.now()) {
                        this._lastScroll = Et(e);
                    }
                    registerClick(e) {
                        const t = e.closest("button,a") || e;
                        this._handleMultiClick(t);
                    }
                    _handleMultiClick(e) {
                        this._getClicks(e).forEach(e => {
                            e.clickCount++;
                        });
                    }
                    _getClicks(e) {
                        return this._clicks.filter(t => t.node === e);
                    }
                    _checkClicks() {
                        const e = [],
                            t = Date.now() / 1e3;
                        this._clicks.forEach(n => {
                            !n.mutationAfter && this._lastMutation && (n.mutationAfter = n.timestamp <= this._lastMutation ? this._lastMutation - n.timestamp : undefined);
                            !n.scrollAfter && this._lastScroll && (n.scrollAfter = n.timestamp <= this._lastScroll ? this._lastScroll - n.timestamp : undefined);
                            n.timestamp + this._timeout <= t && e.push(n);;
                        });
                        for (const t of e) {
                            const e = this._clicks.indexOf(t);
                            if (e > -1) {
                                this._generateBreadcrumbs(t);
                                this._clicks.splice(e, 1);
                            }
                        }
                        this._clicks.length && this._scheduleCheckClicks();
                    }
                    _generateBreadcrumbs(e) {
                        const t = this._replay,
                            n = e.scrollAfter && e.scrollAfter <= this._scrollTimeout,
                            r = e.mutationAfter && e.mutationAfter <= this._threshold,
                            o = !n && !r,
                            {
                                clickCount: s,
                                clickBreadcrumb: i
                            } = e;
                        if (o) {
                            const n = 1e3 * Math.min(e.mutationAfter || this._timeout, this._timeout),
                                r = n < 1e3 * this._timeout ? "mutation" : "timeout",
                                o = {
                                    type: "default",
                                    message: i.message,
                                    timestamp: i.timestamp,
                                    category: "ui.slowClickDetected",
                                    data: {
                                        ...i.data,
                                        url: a.location.href,
                                        route: t.getCurrentRoute(),
                                        timeAfterClickMs: n,
                                        endReason: r,
                                        clickCount: s || 1
                                    }
                                };
                            this._addBreadcrumbEvent(t, o);
                        } else {
                            if (s > 1) {
                                const e = {
                                    type: "default",
                                    message: i.message,
                                    timestamp: i.timestamp,
                                    category: "ui.multiClick",
                                    data: {
                                        ...i.data,
                                        url: a.location.href,
                                        route: t.getCurrentRoute(),
                                        clickCount: s,
                                        metric: true
                                    }
                                };
                                this._addBreadcrumbEvent(t, e);
                            }
                        }
                    }
                    _scheduleCheckClicks() {
                        this._checkClickTimeout && clearTimeout(this._checkClickTimeout);
                        this._checkClickTimeout = i.setTimeout(() => this._checkClicks(), 1e3);;
                    }
                }
                const xt = ["A", "BUTTON", "INPUT"];

                function Rt(e) {
                    return {
                        timestamp: Date.now() / 1e3,
                        type: "default",
                        ...e
                    };
                }
                var Dt;
                ! function(e) {
                    e[e.Document = 0] = "Document";
                    e[e.DocumentType = 1] = "DocumentType";
                    e[e.Element = 2] = "Element";
                    e[e.Text = 3] = "Text";
                    e[e.CDATA = 4] = "CDATA";
                    e[e.Comment = 5] = "Comment";;
                }(Dt || (Dt = {}));
                const Nt = new Set(["id", "class", "aria-label", "role", "name", "alt", "title", "data-test-id", "data-testid", "disabled", "aria-disabled", "data-sentry-component"]);

                function Pt(e) {
                    const t = {
                        r: e[n]
                    };
                    !e["data-sentry-component"] && e["data-sentry-element"] && (e["data-sentry-component"] = e["data-sentry-element"]);
                    for (const n in e)
                        if (Nt.has(n)) {
                            let r = n;
                            "data-testid" !== n && "data-test-id" !== n || (r = "testId");;;
                        }
                    return t;
                }

                function Lt(e, t) {
                    const n = ft.mirror.getId(e),
                        r = n && ft.mirror.getNode(n),
                        o = r && ft.mirror.getMeta(r),
                        s = o && function(e) {
                            return e.type === Dt.Element;
                        }(o) ? o : null;
                    return {
                        message: t,
                        data: s ? {
                            nodeId: n,
                            node: {
                                id: n,
                                tagName: s.tagName,
                                textContent: Array.from(s.childNodes).map(e => e.type === Dt.Text && e.textContent).filter(Boolean).map(e => e.trim()).join(""),
                                attributes: Pt(s.attributes)
                            }
                        } : {}
                    };
                }
                const Ut = {
                    resource: function(e) {
                        const {
                            entryType: t,
                            initiatorType: n,
                            name: r,
                            responseEnd: o,
                            startTime: s,
                            decodedBodySize: i,
                            encodedBodySize: a,
                            responseStatus: c,
                            transferSize: l
                        } = e;
                        return ["fetch", "xmlhttprequest"].includes(n) ? null : {
                            type: `${t}.${n}`,
                            start: ((s.browserPerformanceTimeOrigin || a.performance.timeOrigin) + s) / 1e3,
                            end: ((s.browserPerformanceTimeOrigin || a.performance.timeOrigin) + o) / 1e3,
                            name: r,
                            data: {
                                size: l,
                                statusCode: c,
                                decodedBodySize: i,
                                encodedBodySize: a
                            }
                        };
                    },
                    paint: function(e) {
                        const {
                            duration: t,
                            entryType: n,
                            name: r,
                            startTime: o
                        } = e, s = ((s.browserPerformanceTimeOrigin || a.performance.timeOrigin) + o) / 1e3;
                        return {
                            type: n,
                            name: r,
                            start: s,
                            end: s + t,
                            data: undefined
                        };
                    },
                    navigation: function(e) {
                        const {
                            entryType: t,
                            name: n,
                            decodedBodySize: r,
                            duration: o,
                            domComplete: s,
                            encodedBodySize: i,
                            domContentLoadedEventStart: a,
                            domContentLoadedEventEnd: c,
                            domInteractive: l,
                            loadEventStart: u,
                            loadEventEnd: d,
                            redirectCount: p,
                            startTime: h,
                            transferSize: m,
                            type: f
                        } = e;
                        return 0 === o ? null : {
                            type: `${t}.${f}`,
                            start: ((s.browserPerformanceTimeOrigin || a.performance.timeOrigin) + h) / 1e3,
                            end: ((s.browserPerformanceTimeOrigin || a.performance.timeOrigin) + s) / 1e3,
                            name: n,
                            data: {
                                size: m,
                                decodedBodySize: r,
                                encodedBodySize: i,
                                duration: o,
                                domInteractive: l,
                                domContentLoadedEventStart: a,
                                domContentLoadedEventEnd: c,
                                loadEventStart: u,
                                loadEventEnd: d,
                                domComplete: s,
                                redirectCount: p
                            }
                        };
                    }
                };

                function Bt(e, t) {
                    return ({
                        metric: n
                    }) => {
                        t.replayPerformanceEntries.push(e(n));
                    };
                }

                function Ft(e) {
                    const t = Ut[e.entryType];
                    return t ? t(e) : null;
                }

                function jt(e) {
                    const t = e.entries[e.entries.length - 1];
                    return qt(e, "largest-contentful-paint", t && t.element ? [t.element] : undefined);
                }

                function Gt(e) {
                    const t = [],
                        n = [];
                    for (const r of e.entries)
                        if (undefined !== r.sources) {
                            const e = [];
                            for (const t of r.sources)
                                if (t.node) {
                                    n.push(t.node);
                                    const r = ft.mirror.getId(t.node);
                                    r && e.push(r);
                                }
                            t.push({
                                value: r.value,
                                nodeIds: e.length ? e : undefined
                            });
                        }
                    return qt(e, "cumulative-layout-shift", n, t);
                }

                function $t(e) {
                    const t = e.entries[e.entries.length - 1];
                    return qt(e, "first-input-delay", t && t.target ? [t.target] : undefined);
                }

                function zt(e) {
                    const t = e.entries[e.entries.length - 1];
                    return qt(e, "interaction-to-next-paint", t && t.target ? [t.target] : undefined);
                }

                function qt(e, t, n, r) {
                    const o = e.value,
                        s = e.rating,
                        i = ((s.browserPerformanceTimeOrigin || a.performance.timeOrigin) + o) / 1e3;
                    return {
                        type: "web-vital",
                        name: t,
                        start: i,
                        end: i,
                        data: {
                            value: o,
                            size: o,
                            rating: s,
                            nodeIds: n ? n.map(e => ft.mirror.getId(e)) : undefined,
                            attributions: r
                        }
                    };
                }
                class Yt extends Error {
                    constructor() {
                        super("Event buffer exceeded maximum size of 20000000.");
                    }
                }
                class Vt {
                    constructor() {
                        this.events = [];
                        this._totalSize = 0;
                        this.hasCheckout = false;
                        this.waitForCheckout = false;;
                    }
                    get hasEvents() {
                        return this.events.length > 0;
                    }
                    get type() {
                        return "sync";
                    }
                    destroy() {
                        this.events = [];
                    }
                    async addEvent(e) {
                        const t = JSON.stringify(e).length;
                        if (this._totalSize += t, this._totalSize > 2e7) {
                            throw new Yt;
                        }
                        this.events.push(e);
                    }
                    finish() {
                        return new Promise(e => {
                            const t = this.events;
                            this.clear();
                            e(JSON.stringify(t));;
                        });
                    }
                    clear() {
                        this.events = [];
                        this._totalSize = 0;
                        this.hasCheckout = false;;
                    }
                    getEarliestTimestamp() {
                        const e = this.events.map(e => e.timestamp).sort()[0];
                        return e ? bt(e) : null;
                    }
                }
                class Jt {
                    constructor(e) {
                        this._worker = e;
                        this._id = 0;;
                    }
                    ensureReady() {
                        return this._ensureReadyPromise || (this._ensureReadyPromise = new Promise((e, t) => {
                            this._worker.addEventListener("message", ({
                                data: n
                            }) => {
                                n.success ? e() : t();
                            }, {
                                once: true
                            });
                            this._worker.addEventListener("error", e => {
                                t(e);
                            }, {
                                once: true
                            });;
                        })), this._ensureReadyPromise;
                    }
                    destroy() {
                        gt && vt.info("Destroying compression worker");
                        this._worker.terminate();;
                    }
                    postMessage(e, t) {
                        const n = this._getAndIncrementId();
                        return new Promise((r, o) => {
                            const s = ({
                                data: t
                            }) => {
                                const i = t;
                                if (i.method === e && i.id === n) {
                                    if (this._worker.removeEventListener("message", s), !i.success) {
                                        return gt && vt.error("Error in compression worker: ", i.response), void o(new Error("Error in compression worker"));
                                    }
                                    r(i.response);
                                }
                            };
                            this._worker.addEventListener("message", s);
                            this._worker.postMessage({
                                id: n,
                                method: e,
                                arg: t
                            });;
                        });
                    }
                    _getAndIncrementId() {
                        return this._id++;
                    }
                }
                class Kt {
                    constructor(e) {
                        this._worker = new Jt(e);
                        this._earliestTimestamp = null;
                        this._totalSize = 0;
                        this.hasCheckout = false;
                        this.waitForCheckout = false;;
                    }
                    get hasEvents() {
                        return !!this._earliestTimestamp;
                    }
                    get type() {
                        return "worker";
                    }
                    ensureReady() {
                        return this._worker.ensureReady();
                    }
                    destroy() {
                        this._worker.destroy();
                    }
                    addEvent(e) {
                        const t = bt(e.timestamp);
                        (!this._earliestTimestamp || t < this._earliestTimestamp) && (this._earliestTimestamp = t);
                        const n = JSON.stringify(e);
                        return this._totalSize += n.length, this._totalSize > 2e7 ? Promise.reject(new Yt) : this._sendEventToWorker(n);
                    }
                    finish() {
                        return this._finishRequest();
                    }
                    clear() {
                        this._earliestTimestamp = null;
                        this._totalSize = 0;
                        this.hasCheckout = false;
                        this._worker.postMessage("clear").then(null, e => {
                            gt && vt.exception(e, 'Sending "clear" message to worker failed', e);
                        });;
                    }
                    getEarliestTimestamp() {
                        return this._earliestTimestamp;
                    }
                    _sendEventToWorker(e) {
                        return this._worker.postMessage("addEvent", e);
                    }
                    async _finishRequest() {
                        const e = await this._worker.postMessage("finish");
                        return this._earliestTimestamp = null, this._totalSize = 0, e;
                    }
                }
                class Xt {
                    constructor(e) {
                        this._fallback = new Vt;
                        this._compression = new Kt(e);
                        this._used = this._fallback;
                        this._ensureWorkerIsLoadedPromise = this._ensureWorkerIsLoaded();;
                    }
                    get waitForCheckout() {
                        return this._used.waitForCheckout;
                    }
                    get type() {
                        return this._used.type;
                    }
                    get hasEvents() {
                        return this._used.hasEvents;
                    }
                    get hasCheckout() {
                        return this._used.hasCheckout;
                    }
                    set hasCheckout(e) {
                        this._used.hasCheckout = e;
                    }
                    set waitForCheckout(e) {
                        this._used.waitForCheckout = e;
                    }
                    destroy() {
                        this._fallback.destroy();
                        this._compression.destroy();;
                    }
                    clear() {
                        return this._used.clear();
                    }
                    getEarliestTimestamp() {
                        return this._used.getEarliestTimestamp();
                    }
                    addEvent(e) {
                        return this._used.addEvent(e);
                    }
                    async finish() {
                        return await this.ensureWorkerIsLoaded(), this._used.finish();
                    }
                    ensureWorkerIsLoaded() {
                        return this._ensureWorkerIsLoadedPromise;
                    }
                    async _ensureWorkerIsLoaded() {
                        try {
                            await this._compression.ensureReady();
                        } catch (e) {
                            return void(gt && vt.exception(e, "Failed to load the compression worker, falling back to simple buffer"));
                        }
                        await this._switchToCompressionWorker();
                    }
                    async _switchToCompressionWorker() {
                        const {
                            events: e,
                            hasCheckout: t,
                            waitForCheckout: n
                        } = this._fallback, r = [];
                        for (const t of e) r.push(this._compression.addEvent(t));
                        this._compression.hasCheckout = t;
                        this._compression.waitForCheckout = n;
                        this._used = this._compression;;
                        try {
                            await Promise.all(r);
                            this._fallback.clear();;
                        } catch (e) {
                            gt && vt.exception(e, "Failed to add events when switching buffers.");
                        }
                    }
                }

                function Zt() {
                    try {
                        return "sessionStorage" in a && !!a.sessionStorage;
                    } catch (e) {
                        return false;
                    }
                }

                function en(e) {
                    const t = Date.now();
                    return {
                        id: e.id || s.uuid4(),
                        started: e.started || t,
                        lastActivity: e.lastActivity || t,
                        segmentId: e.segmentId || 0,
                        sampled: e.sampled,
                        previousSessionId: e.previousSessionId
                    };
                }

                function tn(e) {
                    if (Zt()) {
                        try {
                            a.sessionStorage.setItem("sentryReplaySession", JSON.stringify(e));
                        } catch (e) {}
                    }
                }

                function nn({
                    sessionSampleRate: e,
                    allowBuffering: t,
                    stickySession: n = false
                }, {
                    previousSessionId: r
                } = {}) {
                    const o = function(e, t) {
                            return undefined !== e && Math.random() < e ? "session" : !!t && "buffer";
                        }(e, t),
                        s = en({
                            sampled: o,
                            previousSessionId: r
                        });
                    return n && tn(s), s;
                }

                function rn(e, t, n = +new Date) {
                    return null === e || undefined === t || t < 0 || 0 !== t && e + t <= n;
                }

                function on(e, {
                    maxReplayDuration: t,
                    sessionIdleExpire: n,
                    targetTime: r = Date.now()
                }) {
                    return rn(e.started, t, r) || rn(e.lastActivity, n, r);
                }

                function sn(e, {
                    sessionIdleExpire: t,
                    maxReplayDuration: n
                }) {
                    return !!on(e, {
                        sessionIdleExpire: t,
                        maxReplayDuration: n
                    }) && ("buffer" !== e.sampled || 0 !== e.segmentId);
                }

                function an({
                    sessionIdleExpire: e,
                    maxReplayDuration: t,
                    previousSessionId: n
                }, r) {
                    const o = r.stickySession && function() {
                        if (!Zt()) {
                            return null;
                        }
                        try {
                            const e = a.sessionStorage.getItem("sentryReplaySession");
                            if (!e) {
                                return null;
                            }
                            const t = JSON.parse(e);
                            return gt && vt.infoTick("Loading existing session"), en(t);
                        } catch (e) {
                            return null;
                        }
                    }();
                    return o ? sn(o, {
                        sessionIdleExpire: e,
                        maxReplayDuration: t
                    }) ? (gt && vt.infoTick("Session in sessionStorage is expired, creating new one..."), nn(r, {
                        previousSessionId: o.id
                    })) : o : (gt && vt.infoTick("Creating new session"), nn(r, {
                        previousSessionId: n
                    }));
                }
                async function ln(e, t, n) {
                    const {
                        eventBuffer: r
                    } = e;
                    if (!r || r.waitForCheckout && !n) {
                        return null;
                    }
                    const o = "buffer" === e.recordingMode;
                    try {
                        n && o && r.clear();
                        n && (r.hasCheckout = true, r.waitForCheckout = false);;
                        const s = function(e, t) {
                            try {
                                if ("function" == typeof t && function(e) {
                                        return e.type === we.Custom;
                                    }(e)) {
                                    return t(e);
                                }
                            } catch (e) {
                                return gt && vt.exception(e, "An error occurred in the `beforeAddRecordingEvent` callback, skipping the event..."), null;
                            }
                            return e;
                        }(t, e.getOptions().beforeAddRecordingEvent);
                        if (!s) {
                            return;
                        }
                        return await r.addEvent(s);
                    } catch (t) {
                        const n = t && t instanceof Yt,
                            i = n ? "addEventSizeExceeded" : "addEvent";
                        if (n && o) {
                            return r.clear(), r.waitForCheckout = true, null;
                        }
                        e.handleException(t);
                        await e.stop({
                            reason: i
                        });;
                        const a = s.getClient();
                        a && a.recordDroppedEvent("internal_sdk_error", "replay");
                    }
                }

                function un(e, t) {
                    if (!e.eventBuffer || e.isPaused() || !e.isEnabled()) {
                        return false;
                    }
                    const n = bt(t.timestamp);
                    return !(n + e.timeouts.sessionIdlePause < Date.now() || n > e.getContext().initialTimestamp + e.getOptions().maxReplayDuration && (gt && vt.infoTick(`Skipping event with timestamp ${n} because it is after maxReplayDuration`), 1));
                }

                function fn() {
                    const e = s.getCurrentScope().getPropagationContext().dsc;
                    e && delete e.replay_id;
                    const t = s.getActiveSpan();
                    t && delete s.getDynamicSamplingContextFromSpan(t).replay_id;
                }

                function gn(e, t) {
                    return t.map(({
                        type: t,
                        start: n,
                        end: r,
                        name: o,
                        data: s
                    }) => {
                        const i = e.throttledAddEvent({
                            type: we.Custom,
                            timestamp: n,
                            data: {
                                tag: "performanceSpan",
                                payload: {
                                    op: t,
                                    description: o,
                                    startTimestamp: n,
                                    endTimestamp: r,
                                    data: s
                                }
                            }
                        });
                        return "string" == typeof i ? Promise.resolve(null) : i;
                    });
                }

                function _n(e, t) {
                    e.isEnabled() && null !== t && (function(e, t) {
                        return (!gt || !e.getOptions()._experiments.traceInternals) && s.isSentryRequestUrl(t, s.getClient());
                    }(e, t.name) || e.addUpdate(() => (gn(e, [t]), true)));
                }

                function yn(e) {
                    if (!e) {
                        return;
                    }
                    const t = new TextEncoder;
                    try {
                        if ("string" == typeof e) {
                            return t.encode(e).length;
                        }
                        if (e instanceof URLSearchParams) {
                            return t.encode(e.toString()).length;
                        }
                        if (e instanceof FormData) {
                            const n = new URLSearchParams(e).toString();
                            return t.encode(n).length;
                        }
                        if (e instanceof Blob) {
                            return e.size;
                        }
                        if (e instanceof ArrayBuffer) {
                            return e.byteLength;
                        }
                    } catch (e) {}
                }

                function Sn(e) {
                    if (!e) {
                        return;
                    }
                    const t = parseInt(e, 10);
                    return isNaN(t) ? undefined : t;
                }

                function vn(e) {
                    try {
                        if ("string" == typeof e) {
                            return [e];
                        }
                        if (e instanceof URLSearchParams) {
                            return [e.toString()];
                        }
                        if (e instanceof FormData) {
                            return [new URLSearchParams(e).toString()];
                        }
                        if (!e) {
                            return [undefined];
                        }
                    } catch (t) {
                        return gt && vt.exception(t, "Failed to serialize body", e), [undefined, "BODY_PARSE_ERROR"];
                    }
                    return gt && vt.info("Skipping network body because of body type", e), [undefined, "UNPARSEABLE_BODY_TYPE"];
                }

                function bn(e, t) {
                    if (!e) {
                        return {
                            headers: {},
                            size: undefined,
                            _meta: {
                                warnings: [t]
                            }
                        };
                    }
                    const n = {
                            ...e._meta
                        },
                        r = n.warnings || [];
                    return n.warnings = [...r, t], e._meta = n, e;
                }

                function En(e, t) {
                    if (!t) {
                        return null;
                    }
                    const {
                        startTimestamp: n,
                        endTimestamp: r,
                        url: o,
                        method: i,
                        statusCode: a,
                        request: c,
                        response: l
                    } = t;
                    return {
                        type: e,
                        start: n / 1e3,
                        end: r / 1e3,
                        name: o,
                        data: s.dropUndefinedKeys({
                            method: i,
                            statusCode: a,
                            request: c,
                            response: l
                        })
                    };
                }

                function Tn(e) {
                    return {
                        headers: {},
                        size: e,
                        _meta: {
                            warnings: ["URL_SKIPPED"]
                        }
                    };
                }

                function In(e, t, n) {
                    if (!t && 0 === Object.keys(e).length) {
                        return;
                    }
                    if (!t) {
                        return {
                            headers: e
                        };
                    }
                    if (!n) {
                        return {
                            headers: e,
                            size: t
                        };
                    }
                    const r = {
                            headers: e,
                            size: t
                        },
                        {
                            body: o,
                            warnings: s
                        } = function(e) {
                            if (!e || "string" != typeof e) {
                                return {
                                    body: e
                                };
                            }
                            const t = e.length > 15e4,
                                n = function(e) {
                                    const t = e[0],
                                        n = e[e.length - 1];
                                    return "[" === t && "]" === n || "{" === t && "}" === n;
                                }(e);
                            if (t) {
                                const t = e.slice(0, 15e4);
                                return n ? {
                                    body: t,
                                    warnings: ["MAYBE_JSON_TRUNCATED"]
                                } : {
                                    body: `${t}â€¦`,
                                    warnings: ["TEXT_TRUNCATED"]
                                };
                            }
                            if (n) {
                                try {
                                    return {
                                        body: JSON.parse(e)
                                    };
                                } catch (e) {}
                            }
                            return {
                                body: e
                            };
                        }(n);
                    return r.body = o, s && s.length > 0 && (r._meta = {
                        warnings: s
                    }), r;
                }

                function Cn(e, t) {
                    return Object.entries(e).reduce((n, [r, o]) => {
                        const s = r.toLowerCase();
                        return t.includes(s) && e[r] && (n[s] = o), n;
                    }, {});
                }

                function kn(e, t) {
                    const n = function(e, t = a.document.baseURI) {
                        if (e.startsWith("http://") || e.startsWith("https://") || e.startsWith(a.location.origin)) {
                            return e;
                        }
                        const n = new URL(e, t);
                        if (n.origin !== new URL(t).origin) {
                            return e;
                        }
                        const r = n.href;
                        return !e.endsWith("/") && r.endsWith("/") ? r.slice(0, -1) : r;
                    }(e);
                    return s.stringMatchesSomePattern(n, t);
                }

                function An(e = []) {
                    if (2 === e.length && "object" == typeof e[1]) {
                        return e[1].body;
                    }
                }

                function Mn(e, t) {
                    const n = {
                        FontFace: function(e, t, n) {
                            const r = new s(e, t, n);
                            return o.set(r, {
                                family: e,
                                buffer: "string" != typeof t,
                                descriptors: n,
                                fontSource: "string" == typeof t ? t : JSON.stringify(Array.from(new Uint8Array(t)))
                            }), r;
                        },
                        FontFace: s,
                        e: (...n) => {
                            s.logger[e]("[Replay] ", ...n);
                            t && St(n.join(""), s.severityLevelFromString(e));;
                        },
                        e: () => {},
                        session: undefined
                    };
                    return t.forEach(t => {
                        e.get(t) && (n[t] = e.get(t));
                    }), n;
                }

                function xn(e, t) {
                    if (!e) {
                        return {};
                    }
                    const n = e.headers;
                    return n ? n instanceof Headers ? Mn(n, t) : Array.isArray(n) ? {} : Cn(n, t) : {};
                }

                function On(e) {
                    const t = s.getClient();
                    try {
                        const {
                            networkDetailAllowUrls: n,
                            networkDetailDenyUrls: r,
                            networkCaptureBodies: o,
                            networkRequestHeaders: s,
                            networkResponseHeaders: a
                        } = e.getOptions(), c = {
                            replay: e,
                            networkDetailAllowUrls: n,
                            networkDetailDenyUrls: r,
                            networkCaptureBodies: o,
                            networkRequestHeaders: s,
                            networkResponseHeaders: a
                        };
                        t && t.on("beforeAddBreadcrumb", (e, t) => function(e, t, n) {
                            if (t.data) {
                                try {
                                    (function(e) {
                                        return "xhr" === e.category;
                                    }(t) && function(e) {
                                        return e && e.xhr;
                                    }(n) && (function(e, t) {
                                        const {
                                            xhr: n,
                                            input: r
                                        } = t;
                                        if (!n) {
                                            return;
                                        }
                                        const o = yn(r),
                                            s = n.getResponseHeader("content-length") ? Sn(n.getResponseHeader("content-length")) : function(e, t) {
                                                try {
                                                    return yn("json" === t && e && "object" == typeof e ? JSON.stringify(e) : e);
                                                } catch (e) {
                                                    return;
                                                }
                                            }(n.response, n.responseType);
                                        undefined !== o && (e.data.request_body_size = o);
                                        undefined !== s && (e.data.response_body_size = s);;
                                    }(t, n), async function(e, t, n) {
                                        try {
                                            const r = function(e, t, n) {
                                                    const r = Date.now(),
                                                        {
                                                            startTimestamp: o = r,
                                                            endTimestamp: s = r,
                                                            input: a,
                                                            xhr: c
                                                        } = t,
                                                        {
                                                            url: l,
                                                            method: u,
                                                            status_code: d = 0,
                                                            request_body_size: p,
                                                            response_body_size: h
                                                        } = e.data;
                                                    if (!l) {
                                                        return null;
                                                    }
                                                    if (!c || !kn(l, n.networkDetailAllowUrls) || kn(l, n.networkDetailDenyUrls)) {
                                                        return {
                                                            startTimestamp: o,
                                                            endTimestamp: s,
                                                            url: l,
                                                            method: u,
                                                            statusCode: d,
                                                            request: Tn(p),
                                                            response: Tn(h)
                                                        };
                                                    }
                                                    const m = c[i.SENTRY_XHR_DATA_KEY],
                                                        f = m ? Cn(m.request_headers, n.networkRequestHeaders) : {},
                                                        g = Cn(function(e) {
                                                            const t = e.getAllResponseHeaders();
                                                            return t ? t.split("\r\n").reduce((e, t) => {
                                                                const [n, r] = t.split(": ");
                                                                return r && (e[n.toLowerCase()] = r), e;
                                                            }, {}) : {};
                                                        }(c), n.networkResponseHeaders),
                                                        [_, y] = n.networkCaptureBodies ? vn(a) : [undefined],
                                                        [S, v] = n.networkCaptureBodies ? function(e) {
                                                            const t = [];
                                                            try {
                                                                return [e.responseText];
                                                            } catch (e) {
                                                                t.push(e);
                                                            }
                                                            try {
                                                                return function(e, t) {
                                                                    try {
                                                                        if ("string" == typeof e) {
                                                                            return [e];
                                                                        }
                                                                        if (e instanceof Document) {
                                                                            return [e.body.outerHTML];
                                                                        }
                                                                        if ("json" === t && e && "object" == typeof e) {
                                                                            return [JSON.stringify(e)];
                                                                        }
                                                                        if (!e) {
                                                                            return [undefined];
                                                                        }
                                                                    } catch (t) {
                                                                        return gt && vt.exception(t, "Failed to serialize body", e), [undefined, "BODY_PARSE_ERROR"];
                                                                    }
                                                                    return gt && vt.info("Skipping network body because of body type", e), [undefined, "UNPARSEABLE_BODY_TYPE"];
                                                                }(e.response, e.responseType);
                                                            } catch (e) {
                                                                t.push(e);
                                                            }
                                                            return gt && vt.warn("Failed to get xhr response body", ...t), [undefined];
                                                        }(c) : [undefined],
                                                        b = In(f, p, _),
                                                        E = In(g, h, S);
                                                    return {
                                                        startTimestamp: o,
                                                        endTimestamp: s,
                                                        url: l,
                                                        method: u,
                                                        statusCode: d,
                                                        request: y ? bn(b, y) : b,
                                                        response: v ? bn(E, v) : E
                                                    };
                                                }(e, t, n),
                                                o = En("resource.xhr", r);
                                            _n(n.replay, o);
                                        } catch (e) {
                                            gt && vt.exception(e, "Failed to capture xhr breadcrumb");
                                        }
                                    }(t, n, e)));
                                    (function(e) {
                                        return "fetch" === e.category;
                                    }(t) && function(e) {
                                        return e && e.response;
                                    }(n) && (function(e, t) {
                                        const {
                                            input: n,
                                            response: r
                                        } = t, o = yn(n ? An(n) : undefined), s = r ? Sn(r.headers.get("content-length")) : undefined;
                                        undefined !== o && (e.data.request_body_size = o);
                                        undefined !== s && (e.data.response_body_size = s);;
                                    }(t, n), async function(e, t, n) {
                                        try {
                                            const r = await async function(e, t, n) {
                                                const r = Date.now(),
                                                    {
                                                        startTimestamp: o = r,
                                                        endTimestamp: s = r
                                                    } = t,
                                                    {
                                                        url: a,
                                                        method: c,
                                                        status_code: l = 0,
                                                        request_body_size: u,
                                                        response_body_size: d
                                                    } = e.data,
                                                    p = kn(a, n.networkDetailAllowUrls) && !kn(a, n.networkDetailDenyUrls),
                                                    h = p ? function({
                                                        networkCaptureBodies: e,
                                                        networkRequestHeaders: t
                                                    }, n, r) {
                                                        const o = n ? (i = t, 1 === (s = n).length && "string" != typeof s[0] ? xn(s[0], i) : 2 === s.length ? xn(s[1], i) : {}) : {};
                                                        var s, i;
                                                        if (!e) {
                                                            return In(o, r, undefined);
                                                        }
                                                        const a = An(n),
                                                            [c, l] = vn(a),
                                                            u = In(o, r, c);
                                                        return l ? bn(u, l) : u;
                                                    }(n, t.input, u) : Tn(u),
                                                    m = await async function(e, {
                                                        networkCaptureBodies: t,
                                                        networkResponseHeaders: n
                                                    }, r, o) {
                                                        if (!e && undefined !== o) {
                                                            return Tn(o);
                                                        }
                                                        const s = r ? Mn(r.headers, n) : {};
                                                        if (!r || !t && undefined !== o) {
                                                            return In(s, o, undefined);
                                                        }
                                                        const [a, c] = await async function(e) {
                                                            const t = function(e) {
                                                                try {
                                                                    return e.clone();
                                                                } catch (e) {
                                                                    gt && vt.exception(e, "Failed to clone response body");
                                                                }
                                                            }(e);
                                                            if (!t) {
                                                                return [undefined, "BODY_PARSE_ERROR"];
                                                            }
                                                            try {
                                                                const e = await
                                                                function(e) {
                                                                    return new Promise((t, n) => {
                                                                        const r = i.setTimeout(() => n(new Error("Timeout while trying to read response body")), 500);
                                                                        (async function(e) {
                                                                            return await e.text();
                                                                        }(e).then(e => t(e), e => n(e)).finally(() => clearTimeout(r)));
                                                                    });
                                                                }(t);
                                                                return [e];
                                                            } catch (e) {
                                                                return e instanceof Error && e.message.indexOf("Timeout") > -1 ? (gt && vt.warn("Parsing text body from response timed out"), [undefined, "BODY_PARSE_TIMEOUT"]) : (gt && vt.exception(e, "Failed to get text body from response"), [undefined, "BODY_PARSE_ERROR"]);
                                                            }
                                                        }(r), l = function(e, {
                                                            networkCaptureBodies: t,
                                                            responseBodySize: n,
                                                            captureDetails: r,
                                                            headers: o
                                                        }) {
                                                            try {
                                                                const s = e && e.length && undefined === n ? yn(e) : n;
                                                                return r ? In(o, s, t ? e : undefined) : Tn(s);
                                                            } catch (e) {
                                                                return gt && vt.exception(e, "Failed to serialize response body"), In(o, n, undefined);
                                                            }
                                                        }(a, {
                                                            networkCaptureBodies: t,
                                                            responseBodySize: o,
                                                            captureDetails: e,
                                                            headers: s
                                                        });
                                                        return c ? bn(l, c) : l;
                                                    }(p, n, t.response, d);
                                                return {
                                                    startTimestamp: o,
                                                    endTimestamp: s,
                                                    url: a,
                                                    method: c,
                                                    statusCode: l,
                                                    request: h,
                                                    response: m
                                                };
                                            }(e, t, n), o = En("resource.fetch", r);
                                            _n(n.replay, o);
                                        } catch (e) {
                                            gt && vt.exception(e, "Failed to capture fetch breadcrumb");
                                        }
                                    }(t, n, e)));;
                                } catch (e) {
                                    gt && vt.exception(e, "Error when enriching network breadcrumb");
                                }
                            }
                        }(c, e, t));
                    } catch (e) {}
                }

                function Rn(e) {
                    const {
                        jsHeapSizeLimit: t,
                        totalJSHeapSize: n,
                        usedJSHeapSize: r
                    } = e, o = Date.now() / 1e3;
                    return {
                        type: "memory",
                        name: "memory",
                        start: o,
                        end: o,
                        data: {
                            memory: {
                                jsHeapSizeLimit: t,
                                totalJSHeapSize: n,
                                usedJSHeapSize: r
                            }
                        }
                    };
                }

                function Dn(e) {
                    let t = false;
                    return (n, r) => {
                        if (!e.checkAndHandleExpiredSession()) {
                            return void(gt && vt.warn("Received replay event after session expired."));
                        }
                        const o = r || !t;
                        t = true;
                        e.clickDetector && function(e, t) {
                            try {
                                if (! function(e) {
                                        return 3 === e.type;
                                    }(t)) {
                                    return;
                                }
                                const {
                                    source: n
                                } = t.data;
                                if (At.has(n) && e.registerMutation(t.timestamp), n === ke.Scroll && e.registerScroll(t.timestamp), function(e) {
                                        return e.data.source === ke.MouseInteraction;
                                    }(t)) {
                                    const {
                                        type: n,
                                        id: r
                                    } = t.data, o = ft.mirror.getNode(r);
                                    o instanceof HTMLElement && n === Ae.Click && e.registerClick(o);
                                }
                            } catch (e) {}
                        }(e.clickDetector, n);
                        e.addUpdate(() => {
                            if ("buffer" === e.recordingMode && o && e.setInitialState(), !(!!un(e, n) && (ln(e, n, o), true))) {
                                return true;
                            }
                            if (!o) {
                                return false;
                            }
                            const t = e.session;
                            if (function(e, t) {
                                    t && e.session && 0 === e.session.segmentId && (!!un(e, function(e) {
                                        const t = e.getOptions();
                                        return {
                                            type: we.Custom,
                                            timestamp: Date.now(),
                                            data: {
                                                tag: "options",
                                                payload: {
                                                    shouldRecordCanvas: e.isRecordingCanvas(),
                                                    sessionSampleRate: t.sessionSampleRate,
                                                    errorSampleRate: t.errorSampleRate,
                                                    useCompressionOption: t.useCompression,
                                                    blockAllMedia: t.blockAllMedia,
                                                    maskAllText: t.maskAllText,
                                                    maskAllInputs: t.maskAllInputs,
                                                    useCompression: !!e.eventBuffer && "worker" === e.eventBuffer.type,
                                                    networkDetailHasUrls: t.networkDetailAllowUrls.length > 0,
                                                    networkCaptureBodies: t.networkCaptureBodies,
                                                    networkRequestHasHeaders: t.networkRequestHeaders.length > 0,
                                                    networkResponseHasHeaders: t.networkResponseHeaders.length > 0
                                                }
                                            }
                                        };
                                    }(e)) && (ln(e, function(e) {
                                        const t = e.getOptions();
                                        return {
                                            type: we.Custom,
                                            timestamp: Date.now(),
                                            data: {
                                                tag: "options",
                                                payload: {
                                                    shouldRecordCanvas: e.isRecordingCanvas(),
                                                    sessionSampleRate: t.sessionSampleRate,
                                                    errorSampleRate: t.errorSampleRate,
                                                    useCompressionOption: t.useCompression,
                                                    blockAllMedia: t.blockAllMedia,
                                                    maskAllText: t.maskAllText,
                                                    maskAllInputs: t.maskAllInputs,
                                                    useCompression: !!e.eventBuffer && "worker" === e.eventBuffer.type,
                                                    networkDetailHasUrls: t.networkDetailAllowUrls.length > 0,
                                                    networkCaptureBodies: t.networkCaptureBodies,
                                                    networkRequestHasHeaders: t.networkRequestHeaders.length > 0,
                                                    networkResponseHasHeaders: t.networkResponseHeaders.length > 0
                                                }
                                            }
                                        };
                                    }(e), false), true));
                                }(e, o), "buffer" === e.recordingMode && t && e.eventBuffer) {
                                const n = e.eventBuffer.getEarliestTimestamp();
                                n && (gt && vt.info(`Updating session start time to earliest event in buffer to ${new Date(n)}`), t.started = n, e.getOptions().stickySession && tn(t));
                            }
                            return t && t.previousSessionId || "session" === e.recordingMode && e.flush(), true;
                        });;
                    };
                }
                class Nn extends Error {
                    constructor(e) {
                        super(`Transport returned status code ${e}`);
                    }
                }
                class Pn extends Error {
                    constructor(e) {
                        super("Rate limit hit");
                        this.rateLimits = e;;
                    }
                }
                async function Ln(e, t = {
                    count: 0,
                    interval: 5e3
                }) {
                    const {
                        recordingData: n,
                        onError: r
                    } = e;
                    if (n.length) {
                        try {
                            return await async function({
                                recordingData: e,
                                replayId: t,
                                segmentId: n,
                                eventContext: r,
                                timestamp: o,
                                session: i
                            }) {
                                const a = function({
                                        recordingData: e,
                                        headers: t
                                    }) {
                                        let n;
                                        const r = `${JSON.stringify(t)}\n`;
                                        if ("string" == typeof e) {
                                            n = `${r}${e}`;
                                        } else {
                                            const t = (new TextEncoder).encode(r);
                                            n = new Uint8Array(t.length + e.length);
                                            n.set(t);
                                            n.set(e, t.length);;
                                        }
                                        return n;
                                    }({
                                        recordingData: e,
                                        headers: {
                                            segment_id: n
                                        }
                                    }),
                                    {
                                        urls: c,
                                        errorIds: u,
                                        traceIds: d,
                                        initialTimestamp: p
                                    } = r,
                                    h = s.getClient(),
                                    m = s.getCurrentScope(),
                                    f = h && h.getTransport(),
                                    g = h && h.getDsn();
                                if (!(h && f && g && i.sampled)) {
                                    return s.resolvedSyncPromise({});
                                }
                                const _ = {
                                        type: "replay_event",
                                        replay_start_timestamp: p / 1e3,
                                        timestamp: o / 1e3,
                                        error_ids: u,
                                        trace_ids: d,
                                        urls: c,
                                        replay_id: t,
                                        segment_id: n,
                                        replay_type: i.sampled
                                    },
                                    y = await async function({
                                        client: e,
                                        scope: t,
                                        replayId: n,
                                        event: r
                                    }) {
                                        const o = {
                                            event_id: n,
                                            integrations: "object" != typeof e._integrations || null === e._integrations || Array.isArray(e._integrations) ? undefined : Object.keys(e._integrations)
                                        };
                                        e.emit("preprocessEvent", r, o);
                                        const i = await s.prepareEvent(e.getOptions(), r, o, t, e, s.getIsolationScope());
                                        if (!i) {
                                            return null;
                                        };
                                        const a = e.getSdkMetadata(),
                                            {
                                                name: c,
                                                version: l
                                            } = a && a.sdk || {};
                                        return i.sdk = {
                                            ...i.sdk,
                                            name: c || "sentry.javascript.unknown",
                                            version: l || "0.0.0"
                                        }, i;
                                    }({
                                        scope: m,
                                        client: h,
                                        replayId: t,
                                        event: _
                                    });
                                if (!y) {
                                    return h.recordDroppedEvent("event_processor", "replay", _), gt && vt.info("An event processor returned `null`, will not send event."), s.resolvedSyncPromise({});
                                }
                                delete y.sdkProcessingMetadata;
                                const S = function(e, t, n, r) {
                                    return s.createEnvelope(s.createEventEnvelopeHeaders(e, s.getSdkMetadataForEnvelopeHeader(e), r, n), [
                                        [{
                                            type: "replay_event"
                                        }, e],
                                        [{
                                            type: "replay_recording",
                                            length: "string" == typeof t ? (new TextEncoder).encode(t).length : t.length
                                        }, t]
                                    ]);
                                }(y, a, g, h.getOptions().tunnel);
                                let v;
                                try {
                                    v = await f.send(S);
                                } catch (e) {
                                    const t = new Error("Unable to send Replay");
                                    try {
                                        ;
                                    } catch (e) {}
                                    throw t;
                                }
                                if ("number" == typeof v.statusCode && (v.statusCode < 200 || v.statusCode >= 300)) {
                                    throw new Nn(v.statusCode);
                                }
                                const b = s.updateRateLimits({}, v);
                                if (s.isRateLimited(b, "replay")) {
                                    throw new Pn(b);
                                }
                                return v;
                            }(e), true;
                        } catch (n) {
                            if (n instanceof Nn || n instanceof Pn) {
                                throw n;
                            }
                            if (s.setContext("Replays", {
                                    _retryCount: t.count
                                }), r && r(n), t.count >= 3) {
                                const e = new Error(`${"Unable to send Replay"} - max retries exceeded`);
                                try {
                                    e.cause = n;
                                } catch (e) {}
                                throw e;
                            }
                            return t.interval *= ++t.count, new Promise((n, r) => {
                                i.setTimeout(async () => {
                                    try {
                                        await Ln(e, t);
                                        n(true);;
                                    } catch (e) {
                                        r(e);
                                    }
                                }, t.interval);
                            });
                        }
                    }
                };
                class Bn {
                    constructor({
                        options: e,
                        recordingOptions: t
                    }) {
                        Bn.prototype.__init.call(this);
                        Bn.prototype.__init2.call(this);
                        Bn.prototype.__init3.call(this);
                        Bn.prototype.__init4.call(this);
                        Bn.prototype.__init5.call(this);
                        Bn.prototype.__init6.call(this);
                        this.eventBuffer = null;
                        this.performanceEntries = [];
                        this.replayPerformanceEntries = [];
                        this.recordingMode = "session";
                        this.timeouts = {
                            sessionIdlePause: 3e5,
                            sessionIdleExpire: 9e5
                        };
                        this._lastActivity = Date.now();
                        this._isEnabled = false;
                        this._isPaused = false;
                        this._requiresManualStart = false;
                        this._hasInitializedCoreListeners = false;
                        this._context = {
                            errorIds: new Set,
                            traceIds: new Set,
                            urls: [],
                            initialTimestamp: Date.now(),
                            initialUrl: ""
                        };
                        this._recordingOptions = t;
                        this._options = e;
                        this._debouncedFlush = function(e, t, n) {
                            let r, o, s;
                            const a = n && n.maxWait ? Math.max(n.maxWait, t) : 0;

                            function l() {
                                undefined !== o && clearTimeout(o);
                                undefined !== s && clearTimeout(s);
                                o = s = undefined;;
                            }
                            return 15e4.cancel = l, 15e4.flush = function() {
                                return undefined !== o || undefined !== s ? (l(), r = e(), r) : r;
                            }, 15e4;
                        }(() => this._flush(), this._options.flushMinDelay, {
                            maxWait: this._options.flushMaxDelay
                        });
                        this._throttledAddEvent = function(e, t, n) {
                            const r = new Map;
                            let o = false;
                            return (...s) => {
                                const i = Math.floor(Date.now() / 1e3);
                                if ((e => {
                                        const t = e - n;
                                        r.forEach((e, n) => {
                                            n < t && r.delete(n);
                                        });
                                    })(i), [...r.values()].reduce((e, t) => e + t, 0) >= t) {
                                    const e = o;
                                    return o = true, e ? "__SKIPPED" : "__THROTTLED";
                                }
                                o = false;
                                const a = r.get(i) || 0;
                                return r.set(i, a + 1), e(...s);
                            };
                        }((e, t) => function(e, t, n) {
                            return un(e, t) ? ln(e, t, n) : Promise.resolve(null);
                        }(this, e, t), 300, 5);;
                        const {
                            slowClickTimeout: n,
                            slowClickIgnoreSelectors: r
                        } = this.getOptions(), o = n ? {
                            threshold: Math.min(3e3, n),
                            timeout: n,
                            scrollTimeout: 300,
                            ignoreSelector: r ? r.join(",") : ""
                        } : undefined;
                        if (o && (this.clickDetector = new Mt(this, o)), gt) {
                            const t = e._experiments;
                            vt.setConfig({
                                captureExceptions: !!t.captureExceptions,
                                traceInternals: !!t.traceInternals
                            });
                        }
                    }
                    getContext() {
                        return this._context;
                    }
                    isEnabled() {
                        return this._isEnabled;
                    }
                    isPaused() {
                        return this._isPaused;
                    }
                    isRecordingCanvas() {
                        return Boolean(this._canvas);
                    }
                    getOptions() {
                        return this._options;
                    }
                    handleException(e) {
                        gt && vt.exception(e);
                        this._options.onError && this._options.onError(e);;
                    }
                    initializeSampling(e) {
                        const {
                            errorSampleRate: t,
                            sessionSampleRate: n
                        } = this._options, r = t <= 0 && n <= 0;
                        this._requiresManualStart = r;
                        r || (this._initializeSessionForSampling(e), this.session ? false !== this.session.sampled && (this.recordingMode = "buffer" === this.session.sampled && 0 === this.session.segmentId ? "buffer" : "session", gt && vt.infoTick(`Starting replay in ${this.recordingMode} mode`), this._initializeRecording()) : gt && vt.exception(new Error("Unable to initialize and create session")));;
                    }
                    start() {
                        if (this._isEnabled && "session" === this.recordingMode) {
                            return void(gt && vt.info("Recording is already in progress"));
                        }
                        if (this._isEnabled && "buffer" === this.recordingMode) {
                            return void(gt && vt.info("Buffering is in progress, call `flush()` to save the replay"));
                        }
                        gt && vt.infoTick("Starting replay in session mode");
                        this._updateUserActivity();;
                        const e = an({
                            maxReplayDuration: this._options.maxReplayDuration,
                            sessionIdleExpire: this.timeouts.sessionIdleExpire
                        }, {
                            stickySession: this._options.stickySession,
                            sessionSampleRate: 1,
                            allowBuffering: false
                        });
                        this.session = e;
                        this._initializeRecording();;
                    }
                    startBuffering() {
                        if (this._isEnabled) {
                            return void(gt && vt.info("Buffering is in progress, call `flush()` to save the replay"));
                        }
                        gt && vt.infoTick("Starting replay in buffer mode");
                        const e = an({
                            sessionIdleExpire: this.timeouts.sessionIdleExpire,
                            maxReplayDuration: this._options.maxReplayDuration
                        }, {
                            stickySession: this._options.stickySession,
                            sessionSampleRate: 0,
                            allowBuffering: true
                        });
                        this.session = e;
                        this.recordingMode = "buffer";
                        this._initializeRecording();;
                    }
                    startRecording() {
                        try {
                            const e = this._canvas;
                            this._stopRecording = ft({
                                ...this._recordingOptions,
                                ..."buffer" === this.recordingMode ? {
                                    checkoutEveryNms: 6e4
                                } : this._options._experiments.continuousCheckout && {
                                    checkoutEveryNms: Math.max(36e4, this._options._experiments.continuousCheckout)
                                },
                                emit: Dn(this),
                                onMutation: this._onMutationHandler,
                                ...e ? {
                                    recordCanvas: e.recordCanvas,
                                    getCanvasManager: e.getCanvasManager,
                                    sampling: e.sampling,
                                    dataURLOptions: e.dataURLOptions
                                } : {}
                            });
                        } catch (e) {
                            this.handleException(e);
                        }
                    }
                    stopRecording() {
                        try {
                            return this._stopRecording && (this._stopRecording(), this._stopRecording = undefined), true;
                        } catch (e) {
                            return this.handleException(e), false;
                        }
                    }
                    async stop({
                        forceFlush: e = false,
                        reason: t
                    } = {}) {
                        if (this._isEnabled) {
                            this._isEnabled = false;
                            try {
                                gt && vt.info("Stopping Replay" + (t ? ` triggered by ${t}` : ""));
                                fn();
                                this._removeListeners();
                                this.stopRecording();
                                this._debouncedFlush.cancel();
                                e && await this._flush({
                                    force: true
                                });
                                this.eventBuffer && this.eventBuffer.destroy();
                                this.eventBuffer = null;
                                n = this;
                                (function() {
                                    if (Zt()) {
                                        try {
                                            a.sessionStorage.removeItem("sentryReplaySession");
                                        } catch (e) {}
                                    }
                                }());;;
                            } catch (e) {
                                this.handleException(e);
                            }
                        }
                        var n;
                    }
                    pause() {
                        this._isPaused || (this._isPaused = true, this.stopRecording(), gt && vt.info("Pausing replay"));
                    }
                    resume() {
                        this._isPaused && this._checkSession() && (this._isPaused = false, this.startRecording(), gt && vt.info("Resuming replay"));
                    }
                    async sendBufferedReplayOrFlush({
                        continueRecording: e = true
                    } = {}) {
                        if ("session" === this.recordingMode) {
                            return this.flushImmediate();
                        }
                        const t = Date.now();
                        gt && vt.info("Converting buffer to session");
                        await this.flushImmediate();;
                        const n = this.stopRecording();
                        e && n && "session" !== this.recordingMode && (this.recordingMode = "session", this.session && (this._updateUserActivity(t), this._updateSessionActivity(t), this._maybeSaveSession()), this.startRecording());
                    }
                    addUpdate(e) {
                        const t = e();
                        "buffer" !== this.recordingMode && true !== t && this._debouncedFlush();
                    }
                    triggerUserActivity() {
                        if (this._updateUserActivity(), this._stopRecording) {
                            this.checkAndHandleExpiredSession();
                            this._updateSessionActivity();;
                        } else {
                            if (!this._checkSession()) {
                                return;
                            }
                            this.resume();
                        }
                    }
                    updateUserActivity() {
                        this._updateUserActivity();
                        this._updateSessionActivity();;
                    }
                    conditionalFlush() {
                        return "buffer" === this.recordingMode ? Promise.resolve() : this.flushImmediate();
                    }
                    flush() {
                        return this._debouncedFlush();
                    }
                    flushImmediate() {
                        return this._debouncedFlush(), this._debouncedFlush.flush();
                    }
                    cancelFlush() {
                        this._debouncedFlush.cancel();
                    }
                    getSessionId() {
                        return this.session && this.session.id;
                    }
                    checkAndHandleExpiredSession() {
                        if (!(this._lastActivity && rn(this._lastActivity, this.timeouts.sessionIdlePause) && this.session && "session" === this.session.sampled)) {
                            return !!this._checkSession();
                        }
                        this.pause();
                    }
                    setInitialState() {
                        const e = `${a.location.pathname}${a.location.hash}${a.location.search}`,
                            t = `${a.location.origin}${e}`;
                        this.performanceEntries = [];
                        this.replayPerformanceEntries = [];
                        this._clearContext();
                        this._context.initialUrl = t;
                        this._context.initialTimestamp = Date.now();
                        this._context.urls.push(t);;
                    }
                    throttledAddEvent(e, t) {
                        const n = this._throttledAddEvent(e, t);
                        if (n === "__THROTTLED") {
                            const e = Rt({
                                category: "replay.throttled"
                            });
                            this.addUpdate(() => !(!!un(this, {
                                type: 5,
                                timestamp: e.timestamp || 0,
                                data: {
                                    tag: "breadcrumb",
                                    payload: e,
                                    metric: true
                                }
                            }) && (ln(this, {
                                type: 5,
                                timestamp: e.timestamp || 0,
                                data: {
                                    tag: "breadcrumb",
                                    payload: e,
                                    metric: true
                                }
                            }, n), true)));
                        }
                        return n;
                    }
                    getCurrentRoute() {
                        const e = this.lastActiveSpan || s.getActiveSpan(),
                            t = e && s.getRootSpan(e),
                            n = (t && s.spanToJSON(t).data || {})[s.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
                        if (t && n && ["route", "custom"].includes(n)) {
                            return s.spanToJSON(t).description;
                        }
                    }
                    _initializeRecording() {
                        this.setInitialState();
                        this._updateSessionActivity();
                        this.eventBuffer = function({
                            useCompression: e,
                            workerUrl: t
                        }) {
                            if (e && window.Worker) {
                                const e = function(e) {
                                    try {
                                        const t = e || ("undefined" != typeof __SENTRY_EXCLUDE_REPLAY_WORKER__ && __SENTRY_EXCLUDE_REPLAY_WORKER__ ? "" : function() {
                                            const e = new Blob(['var t=Uint8Array,n=Uint16Array,r=Int32Array,e=new t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),i=new t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),a=new t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=function(t,e){for(var i=new n(31),a=0;a<31;++a)i[a]=e+=1<<t[a-1];var s=new r(i[30]);for(a=1;a<30;++a)for(var o=i[a];o<i[a+1];++o)s[o]=o-i[a]<<5|a;return{b:i,r:s}},o=s(e,2),f=o.b,h=o.r;f[28]=258,h[258]=28;for(var l=s(i,0).r,u=new n(32768),c=0;c<32768;++c){var v=(43690&c)>>1|(21845&c)<<1;v=(61680&(v=(52428&v)>>2|(13107&v)<<2))>>4|(3855&v)<<4,u[c]=((65280&v)>>8|(255&v)<<8)>>1}var d=function(t,r,e){for(var i=t.length,a=0,s=new n(r);a<i;++a)t[a]&&++s[t[a]-1];var o,f=new n(r);for(a=1;a<r;++a)f[a]=f[a-1]+s[a-1]<<1;if(e){o=new n(1<<r);var h=15-r;for(a=0;a<i;++a)if(t[a])for(var l=a<<4|t[a],c=r-t[a],v=f[t[a]-1]++<<c,d=v|(1<<c)-1;v<=d;++v)o[u[v]>>h]=l}else for(o=new n(i),a=0;a<i;++a)t[a]&&(o[a]=u[f[t[a]-1]++]>>15-t[a]);return o},g=new t(288);for(c=0;c<144;++c)g[c]=8;for(c=144;c<256;++c)g[c]=9;for(c=256;c<280;++c)g[c]=7;for(c=280;c<288;++c)g[c]=8;var w=new t(32);for(c=0;c<32;++c)w[c]=5;var p=d(g,9,0),y=d(w,5,0),m=function(t){return(t+7)/8|0},b=function(n,r,e){return(null==e||e>n.length)&&(e=n.length),new t(n.subarray(r,e))},M=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(t,n,r){var e=new Error(n||M[t]);if(e.code=t,Error.captureStackTrace&&Error.captureStackTrace(e,E),!r)throw e;return e},z=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8},_=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8,t[e+2]|=r>>16},x=function(r,e){for(var i=[],a=0;a<r.length;++a)r[a]&&i.push({s:a,f:r[a]});var s=i.length,o=i.slice();if(!s)return{t:F,l:0};if(1==s){var f=new t(i[0].s+1);return f[i[0].s]=1,{t:f,l:1}}i.sort((function(t,n){return t.f-n.f})),i.push({s:-1,f:25001});var h=i[0],l=i[1],u=0,c=1,v=2;for(i[0]={s:-1,f:h.f+l.f,l:h,r:l};c!=s-1;)h=i[i[u].f<i[v].f?u++:v++],l=i[u!=c&&i[u].f<i[v].f?u++:v++],i[c++]={s:-1,f:h.f+l.f,l:h,r:l};var d=o[0].s;for(a=1;a<s;++a)o[a].s>d&&(d=o[a].s);var g=new n(d+1),w=A(i[c-1],g,0);if(w>e){a=0;var p=0,y=w-e,m=1<<y;for(o.sort((function(t,n){return g[n.s]-g[t.s]||t.f-n.f}));a<s;++a){var b=o[a].s;if(!(g[b]>e))break;p+=m-(1<<w-g[b]),g[b]=e}for(p>>=y;p>0;){var M=o[a].s;g[M]<e?p-=1<<e-g[M]++-1:++a}for(;a>=0&&p;--a){var E=o[a].s;g[E]==e&&(--g[E],++p)}w=e}return{t:new t(g),l:w}},A=function(t,n,r){return-1==t.s?Math.max(A(t.l,n,r+1),A(t.r,n,r+1)):n[t.s]=r},D=function(t){for(var r=t.length;r&&!t[--r];);for(var e=new n(++r),i=0,a=t[0],s=1,o=function(t){e[i++]=t},f=1;f<=r;++f)if(t[f]==a&&f!=r)++s;else{if(!a&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(a),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(a);s=1,a=t[f]}return{c:e.subarray(0,i),n:r}},T=function(t,n){for(var r=0,e=0;e<n.length;++e)r+=t[e]*n[e];return r},k=function(t,n,r){var e=r.length,i=m(n+2);t[i]=255&e,t[i+1]=e>>8,t[i+2]=255^t[i],t[i+3]=255^t[i+1];for(var a=0;a<e;++a)t[i+a+4]=r[a];return 8*(i+4+e)},U=function(t,r,s,o,f,h,l,u,c,v,m){z(r,m++,s),++f[256];for(var b=x(f,15),M=b.t,E=b.l,A=x(h,15),U=A.t,C=A.l,F=D(M),I=F.c,S=F.n,L=D(U),O=L.c,j=L.n,q=new n(19),B=0;B<I.length;++B)++q[31&I[B]];for(B=0;B<O.length;++B)++q[31&O[B]];for(var G=x(q,7),H=G.t,J=G.l,K=19;K>4&&!H[a[K-1]];--K);var N,P,Q,R,V=v+5<<3,W=T(f,g)+T(h,w)+l,X=T(f,M)+T(h,U)+l+14+3*K+T(q,H)+2*q[16]+3*q[17]+7*q[18];if(c>=0&&V<=W&&V<=X)return k(r,m,t.subarray(c,c+v));if(z(r,m,1+(X<W)),m+=2,X<W){N=d(M,E,0),P=M,Q=d(U,C,0),R=U;var Y=d(H,J,0);z(r,m,S-257),z(r,m+5,j-1),z(r,m+10,K-4),m+=14;for(B=0;B<K;++B)z(r,m+3*B,H[a[B]]);m+=3*K;for(var Z=[I,O],$=0;$<2;++$){var tt=Z[$];for(B=0;B<tt.length;++B){var nt=31&tt[B];z(r,m,Y[nt]),m+=H[nt],nt>15&&(z(r,m,tt[B]>>5&127),m+=tt[B]>>12)}}}else N=p,P=g,Q=y,R=w;for(B=0;B<u;++B){var rt=o[B];if(rt>255){_(r,m,N[(nt=rt>>18&31)+257]),m+=P[nt+257],nt>7&&(z(r,m,rt>>23&31),m+=e[nt]);var et=31&rt;_(r,m,Q[et]),m+=R[et],et>3&&(_(r,m,rt>>5&8191),m+=i[et])}else _(r,m,N[rt]),m+=P[rt]}return _(r,m,N[256]),m+P[256]},C=new r([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),F=new t(0),I=function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var r=n,e=9;--e;)r=(1&r&&-306674912)^r>>>1;t[n]=r}return t}(),S=function(){var t=-1;return{p:function(n){for(var r=t,e=0;e<n.length;++e)r=I[255&r^n[e]]^r>>>8;t=r},d:function(){return~t}}},L=function(){var t=1,n=0;return{p:function(r){for(var e=t,i=n,a=0|r.length,s=0;s!=a;){for(var o=Math.min(s+2655,a);s<o;++s)i+=e+=r[s];e=(65535&e)+15*(e>>16),i=(65535&i)+15*(i>>16)}t=e,n=i},d:function(){return(255&(t%=65521))<<24|(65280&t)<<8|(255&(n%=65521))<<8|n>>8}}},O=function(a,s,o,f,u){if(!u&&(u={l:1},s.dictionary)){var c=s.dictionary.subarray(-32768),v=new t(c.length+a.length);v.set(c),v.set(a,c.length),a=v,u.w=c.length}return function(a,s,o,f,u,c){var v=c.z||a.length,d=new t(f+v+5*(1+Math.ceil(v/7e3))+u),g=d.subarray(f,d.length-u),w=c.l,p=7&(c.r||0);if(s){p&&(g[0]=c.r>>3);for(var y=C[s-1],M=y>>13,E=8191&y,z=(1<<o)-1,_=c.p||new n(32768),x=c.h||new n(z+1),A=Math.ceil(o/3),D=2*A,T=function(t){return(a[t]^a[t+1]<<A^a[t+2]<<D)&z},F=new r(25e3),I=new n(288),S=new n(32),L=0,O=0,j=c.i||0,q=0,B=c.w||0,G=0;j+2<v;++j){var H=T(j),J=32767&j,K=x[H];if(_[J]=K,x[H]=J,B<=j){var N=v-j;if((L>7e3||q>24576)&&(N>423||!w)){p=U(a,g,0,F,I,S,O,q,G,j-G,p),q=L=O=0,G=j;for(var P=0;P<286;++P)I[P]=0;for(P=0;P<30;++P)S[P]=0}var Q=2,R=0,V=E,W=J-K&32767;if(N>2&&H==T(j-W))for(var X=Math.min(M,N)-1,Y=Math.min(32767,j),Z=Math.min(258,N);W<=Y&&--V&&J!=K;){if(a[j+Q]==a[j+Q-W]){for(var $=0;$<Z&&a[j+$]==a[j+$-W];++$);if($>Q){if(Q=$,R=W,$>X)break;var tt=Math.min(W,$-2),nt=0;for(P=0;P<tt;++P){var rt=j-W+P&32767,et=rt-_[rt]&32767;et>nt&&(nt=et,K=rt)}}}W+=(J=K)-(K=_[J])&32767}if(R){F[q++]=268435456|h[Q]<<18|l[R];var it=31&h[Q],at=31&l[R];O+=e[it]+i[at],++I[257+it],++S[at],B=j+Q,++L}else F[q++]=a[j],++I[a[j]]}}for(j=Math.max(j,B);j<v;++j)F[q++]=a[j],++I[a[j]];p=U(a,g,w,F,I,S,O,q,G,j-G,p),w||(c.r=7&p|g[p/8|0]<<3,p-=7,c.h=x,c.p=_,c.i=j,c.w=B)}else{for(j=c.w||0;j<v+w;j+=65535){var st=j+65535;st>=v&&(g[p/8|0]=w,st=v),p=k(g,p+1,a.subarray(j,st))}c.i=v}return b(d,0,f+m(p)+u)}(a,null==s.level?6:s.level,null==s.mem?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(a.length)))):12+s.mem,o,f,u)},j=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},q=function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&j(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var e=0;e<=r.length;++e)t[e+10]=r.charCodeAt(e)}},B=function(t){return 10+(t.filename?t.filename.length+1:0)},G=function(){function n(n,r){if("function"==typeof n&&(r=n,n={}),this.ondata=r,this.o=n||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new t(98304),this.o.dictionary){var e=this.o.dictionary.subarray(-32768);this.b.set(e,32768-e.length),this.s.i=32768-e.length}}return n.prototype.p=function(t,n){this.ondata(O(t,this.o,0,0,this.s),n)},n.prototype.push=function(n,r){this.ondata||E(5),this.s.l&&E(4);var e=n.length+this.s.z;if(e>this.b.length){if(e>2*this.b.length-32768){var i=new t(-32768&e);i.set(this.b.subarray(0,this.s.z)),this.b=i}var a=this.b.length-this.s.z;a&&(this.b.set(n.subarray(0,a),this.s.z),this.s.z=this.b.length,this.p(this.b,!1)),this.b.set(this.b.subarray(-32768)),this.b.set(n.subarray(a),32768),this.s.z=n.length-a+32768,this.s.i=32766,this.s.w=32768}else this.b.set(n,this.s.z),this.s.z+=n.length;this.s.l=1&r,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2)},n}();var H=function(){function t(t,n){this.c=L(),this.v=1,G.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),G.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=O(t,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(function(t,n){var r=n.level,e=0==r?0:r<6?1:9==r?3:2;if(t[0]=120,t[1]=e<<6|(n.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,n.dictionary){var i=L();i.p(n.dictionary),j(t,2,i.d())}}(r,this.o),this.v=0),n&&j(r,r.length-4,this.c.d()),this.ondata(r,n)},t}(),J="undefined"!=typeof TextEncoder&&new TextEncoder,K="undefined"!=typeof TextDecoder&&new TextDecoder;try{K.decode(F,{stream:!0})}catch(t){}var N=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){this.ondata||E(5),this.d&&E(4),this.ondata(P(t),this.d=n||!1)},t}();function P(n,r){if(J)return J.encode(n);for(var e=n.length,i=new t(n.length+(n.length>>1)),a=0,s=function(t){i[a++]=t},o=0;o<e;++o){if(a+5>i.length){var f=new t(a+8+(e-o<<1));f.set(i),i=f}var h=n.charCodeAt(o);h<128||r?s(h):h<2048?(s(192|h>>6),s(128|63&h)):h>55295&&h<57344?(s(240|(h=65536+(1047552&h)|1023&n.charCodeAt(++o))>>18),s(128|h>>12&63),s(128|h>>6&63),s(128|63&h)):(s(224|h>>12),s(128|h>>6&63),s(128|63&h))}return b(i,0,a)}function Q(t){return function(t,n){n||(n={});var r=S(),e=t.length;r.p(t);var i=O(t,n,B(n),8),a=i.length;return q(i,n),j(i,a-8,r.d()),j(i,a-4,e),i}(P(t))}const R=new class{constructor(){this._init()}clear(){this._init()}addEvent(t){if(!t)throw new Error("Adding invalid event");const n=this._hasEvents?",":"";this.stream.push(n+t),this._hasEvents=!0}finish(){this.stream.push("]",!0);const t=function(t){let n=0;for(const r of t)n+=r.length;const r=new Uint8Array(n);for(let n=0,e=0,i=t.length;n<i;n++){const i=t[n];r.set(i,e),e+=i.length}return r}(this._deflatedData);return this._init(),t}_init(){this._hasEvents=!1,this._deflatedData=[],this.deflate=new H,this.deflate.ondata=(t,n)=>{this._deflatedData.push(t)},this.stream=new N(((t,n)=>{this.deflate.push(t,n)})),this.stream.push("[")}},V={clear:()=>{R.clear()},addEvent:t=>R.addEvent(t),finish:()=>R.finish(),compress:t=>Q(t)};addEventListener("message",(function(t){const n=t.data.method,r=t.data.id,e=t.data.arg;if(n in V&&"function"==typeof V[n])try{const t=V[n](e);postMessage({id:r,method:n,success:!0,response:t})}catch(t){postMessage({id:r,method:n,success:!1,response:t.message}),console.error(t)}})),postMessage({id:void 0,method:"init",success:!0,response:void 0});']);
                                            return URL.createObjectURL(e);
                                        }());
                                        if (!t) {
                                            return;
                                        }
                                        gt && vt.info("Using compression worker" + (e ? ` from ${e}` : ""));
                                        const n = new Worker(t);
                                        return new Xt(n);
                                    } catch (e) {
                                        gt && vt.exception(e, "Failed to create compression worker");
                                    }
                                }(t);
                                if (e) {
                                    return e;
                                }
                            }
                            return gt && vt.info("Using simple buffer"), new Vt;
                        }({
                            useCompression: this._options.useCompression,
                            workerUrl: this._options.workerUrl
                        });
                        this._removeListeners();
                        this._addListeners();
                        this._isEnabled = true;
                        this._isPaused = false;
                        this.startRecording();;
                    }
                    _initializeSessionForSampling(e) {
                        const t = this._options.errorSampleRate > 0,
                            n = an({
                                sessionIdleExpire: this.timeouts.sessionIdleExpire,
                                maxReplayDuration: this._options.maxReplayDuration,
                                previousSessionId: e
                            }, {
                                stickySession: this._options.stickySession,
                                sessionSampleRate: this._options.sessionSampleRate,
                                allowBuffering: t
                            });
                        this.session = n;
                    }
                    _checkSession() {
                        if (!this.session) {
                            return false;
                        }
                        const e = this.session;
                        return !sn(e, {
                            sessionIdleExpire: this.timeouts.sessionIdleExpire,
                            maxReplayDuration: this._options.maxReplayDuration
                        }) || (this._refreshSession(e), false);
                    }
                    async _refreshSession(e) {
                        this._isEnabled && (await this.stop({
                            reason: "refresh session"
                        }), this.initializeSampling(e.id));
                    }
                    _addListeners() {
                        try {
                            a.document.addEventListener("visibilitychange", this._handleVisibilityChange);
                            a.addEventListener("blur", this._handleWindowBlur);
                            a.addEventListener("focus", this._handleWindowFocus);
                            a.addEventListener("keydown", this._handleKeyboardEvent);
                            this.clickDetector && this.clickDetector.addListeners();
                            this._hasInitializedCoreListeners || (function(e) {
                                const t = s.getClient();
                                i.addClickKeypressInstrumentationHandler((e => t => {
                                    if (!e.isEnabled()) {
                                        return;
                                    }
                                    const n = function(e) {
                                        const {
                                            target: t,
                                            message: n
                                        } = function(e) {
                                            const t = "click" === e.name;
                                            let n, r = null;
                                            try {
                                                r = t ? Ct(e.event) : wt(e.event);
                                                n = s.htmlTreeAsString(r, {
                                                    maxStringLength: 200
                                                }) || "<unknown>";;
                                            } catch (e) {
                                                n = "<unknown>";
                                            }
                                            return {
                                                target: r,
                                                message: n
                                            };
                                        }(e);
                                        return Rt({
                                            category: `ui.${e.name}`,
                                            ...Lt(t, n)
                                        });
                                    }(t);
                                    if (!n) {
                                        return;
                                    }
                                    const r = "click" === t.name,
                                        o = r ? t.event : undefined;
                                    var i, a, c;
                                    !(r && e.clickDetector && o && o.target) || o.altKey || o.metaKey || o.ctrlKey || o.shiftKey || (i = e.clickDetector, a = n, c = Ct(t.event), i.handleClick(a, c));
                                    Tt(e, n);;
                                })(e));
                                i.addHistoryInstrumentationHandler(t => {
                                    if (!e.isEnabled()) {
                                        return;
                                    }
                                    const n = function(e) {
                                        const {
                                            from: t,
                                            to: n
                                        } = e, r = Date.now() / 1e3;
                                        return {
                                            type: "navigation.push",
                                            start: r,
                                            end: r,
                                            name: n,
                                            data: {
                                                previous: t
                                            }
                                        };
                                    }(t);
                                    if (null !== n) {
                                        e.getContext().urls.push(n.name);
                                        e.triggerUserActivity();
                                        e.addUpdate(() => (gn(e, [n]), false));
                                    }
                                });
                                (function(e) {
                                    const t = s.getClient();
                                    t && t.on("beforeAddBreadcrumb", t => function(e, t) {
                                        if (!e.isEnabled() || !!!t.category) {
                                            return;
                                        }
                                        const n = function(e) {
                                            return !!!e.category || ["fetch", "xhr", "sentry.event", "sentry.transaction"].includes(e.category) || e.category.startsWith("ui.") ? null : "console" === e.category ? function(e) {
                                                const t = e.data && e.data.arguments;
                                                if (!Array.isArray(t) || 0 === t.length) {
                                                    return Rt(e);
                                                }
                                                let n = false;
                                                const r = t.map(e => {
                                                    if (!e) {
                                                        return e;
                                                    }
                                                    if ("string" == typeof e) {
                                                        return e.length > 5e3 ? (n = true, `${e.slice(0, 5e3)}â€¦`) : e;
                                                    }
                                                    if ("object" == typeof e) {
                                                        try {
                                                            const t = s.normalize(e, 7);
                                                            return JSON.stringify(t).length > 5e3 ? (n = true, `${JSON.stringify(t, null, 2).slice(0, 5e3)}â€¦`) : t;
                                                        } catch (e) {}
                                                    }
                                                    return e;
                                                });
                                                return Rt({
                                                    ...e,
                                                    data: {
                                                        ...e.data,
                                                        arguments: r,
                                                        ...n ? {
                                                            _meta: {
                                                                warnings: ["CONSOLE_ARG_TRUNCATED"]
                                                            }
                                                        } : {}
                                                    }
                                                });
                                            }(e) : Rt(e);
                                        }(t);
                                        n && Tt(e, n);
                                    }(e, t));
                                }(e));
                                On(e);;
                                const n = Object.assign((t, n) => {
                                    if (!e.isEnabled() || e.isPaused()) {
                                        return t;
                                    }
                                    if (function(e) {
                                            return "replay_event" === e.type;
                                        }(t)) {
                                        return delete t.breadcrumbs, t;
                                    }
                                    if (!!t.type && !("transaction" === t.type) && !("feedback" === t.type)) {
                                        return t;
                                    }
                                    if (!e.checkAndHandleExpiredSession()) {
                                        return fn(), t;
                                    }
                                    if ("feedback" === t.type) {
                                        return e.flush(), t.contexts.feedback.replay_id = e.getSessionId(),
                                            function(e, t) {
                                                e.triggerUserActivity();
                                                e.addUpdate(() => !t.timestamp || (e.throttledAddEvent({
                                                    type: we.Custom,
                                                    timestamp: 1e3 * t.timestamp,
                                                    data: {
                                                        tag: "breadcrumb",
                                                        payload: {
                                                            timestamp: t.timestamp,
                                                            type: "default",
                                                            category: "sentry.feedback",
                                                            data: {
                                                                feedbackId: t.event_id
                                                            }
                                                        }
                                                    }
                                                }), false));;
                                            }(e, t), t;
                                    }
                                    if (function(e, t) {
                                            return !(e.type || !e.exception || !e.exception.values || !e.exception.values.length || !t.originalException || !t.originalException.__rrweb__);
                                        }(t, n) && !e.getOptions()._experiments.captureExceptions) {
                                        return gt && vt.log("Ignoring error from rrweb internals", t), null;
                                    }
                                    const r = function(e, t) {
                                        return "buffer" === e.recordingMode && t.message !== "Unable to send Replay" && !(!t.exception || t.type) && (undefined !== e.getOptions().errorSampleRate && Math.random() < e.getOptions().errorSampleRate);
                                    }(e, t);
                                    return (r || "session" === e.recordingMode) && (t.tags = {
                                        ...t.tags,
                                        replayId: e.getSessionId()
                                    }), t;
                                }, {
                                    id: "Replay"
                                });
                                s.addEventProcessor(n);
                                t && (t.on("beforeSendEvent", t => {
                                    e.isEnabled() && !t.type && function(e, t) {
                                        const n = t.exception && t.exception.values && t.exception.values[0] && t.exception.values[0].value;
                                        "string" == typeof n && (n.match(/(reactjs\.org\/docs\/error-decoder\.html\?invariant=|react\.dev\/errors\/)(418|419|422|423|425)/) || n.match(/(does not match server-rendered HTML|Hydration failed because)/i)) && Tt(e, Rt({
                                            category: "replay.hydrate-error",
                                            data: {
                                                url: s.getLocationHref()
                                            }
                                        }));
                                    }(e, t);
                                }), t.on("afterSendEvent", (t, n) => {
                                    if (!e.isEnabled() || !!t.type && !("transaction" === t.type)) {
                                        return;
                                    }
                                    const r = n && n.statusCode;
                                    !r || r < 200 || r >= 300 || ("transaction" === t.type ? function(e, t) {
                                        const n = e.getContext();
                                        t.contexts && t.contexts.trace && t.contexts.trace.trace_id && n.traceIds.size < 100 && n.traceIds.add(t.contexts.trace.trace_id);
                                    }(e, t) : function(e, t) {
                                        const n = e.getContext();
                                        if (t.event_id && n.errorIds.size < 100 && n.errorIds.add(t.event_id), "buffer" !== e.recordingMode || !t.tags || !t.tags.replayId) {
                                            return;
                                        }
                                        const {
                                            beforeErrorSampling: r
                                        } = e.getOptions();
                                        ("function" != typeof r || r(t)) && i.setTimeout(async () => {
                                            try {
                                                await e.sendBufferedReplayOrFlush();
                                            } catch (t) {
                                                e.handleException(t);
                                            }
                                        });
                                    }(e, t));
                                }), t.on("createDsc", t => {
                                    const n = e.getSessionId();
                                    n && e.isEnabled() && "session" === e.recordingMode && e.checkAndHandleExpiredSession() && (t.replay_id = n);
                                }), t.on("spanStart", t => {
                                    e.lastActiveSpan = t;
                                }), t.on("spanEnd", t => {
                                    e.lastActiveSpan = t;
                                }), t.on("beforeSendFeedback", (t, n) => {
                                    const r = e.getSessionId();
                                    n && n.includeReplay && e.isEnabled() && r && t.contexts && t.contexts.feedback && (t.contexts.feedback.replay_id = r);
                                }));;
                            }(this), this._hasInitializedCoreListeners = true);;
                        } catch (e) {
                            this.handleException(e);
                        }
                        this._performanceCleanupCallback = function(e) {
                            function t(t) {
                                e.performanceEntries.includes(t) || e.performanceEntries.push(t);
                            }

                            function n({
                                entries: e
                            }) {
                                e.forEach(t);
                            }
                            const r = [];
                            return ["navigation", "paint", "resource"].forEach(e => {
                                r.push(i.addPerformanceInstrumentationHandler(e, n));
                            }), r.push(i.addLcpInstrumentationHandler(Bt(jt, e)), i.addClsInstrumentationHandler(Bt(Gt, e)), i.addFidInstrumentationHandler(Bt($t, e)), i.addInpInstrumentationHandler(Bt(zt, e))), () => {
                                r.forEach(e => e());
                            };
                        }(this);
                    }
                    _removeListeners() {
                        try {
                            a.document.removeEventListener("visibilitychange", this._handleVisibilityChange);
                            a.removeEventListener("blur", this._handleWindowBlur);
                            a.removeEventListener("focus", this._handleWindowFocus);
                            a.removeEventListener("keydown", this._handleKeyboardEvent);
                            this.clickDetector && this.clickDetector.removeListeners();
                            this._performanceCleanupCallback && this._performanceCleanupCallback();;
                        } catch (e) {
                            this.handleException(e);
                        }
                    }
                    __init() {
                        this._handleVisibilityChange = () => {
                            "visible" === a.document.visibilityState ? this._doChangeToForegroundTasks() : this._doChangeToBackgroundTasks();
                        };
                    }
                    __init2() {
                        this._handleWindowBlur = () => {
                            const e = Rt({
                                category: "ui.blur"
                            });
                            this._doChangeToBackgroundTasks(e);
                        };
                    }
                    __init3() {
                        this._handleWindowFocus = () => {
                            const e = Rt({
                                category: "ui.focus"
                            });
                            this._doChangeToForegroundTasks(e);
                        };
                    }
                    __init4() {
                        this._handleKeyboardEvent = e => {
                            ! function(e, t) {
                                if (!e.isEnabled()) {
                                    return;
                                }
                                e.updateUserActivity();
                                const n = function(e) {
                                    const {
                                        metaKey: t,
                                        shiftKey: n,
                                        ctrlKey: r,
                                        altKey: o,
                                        key: i,
                                        target: a
                                    } = e;
                                    if (!a || function(e) {
                                            return "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.isContentEditable;
                                        }(a) || !i) {
                                        return null;
                                    }
                                    const c = t || r || o,
                                        l = 1 === i.length;
                                    if (!c && l) {
                                        return null;
                                    }
                                    const u = s.htmlTreeAsString(a, {
                                        maxStringLength: 200
                                    }) || "<unknown>";
                                    return Rt({
                                        category: "ui.keyDown",
                                        message: u,
                                        data: {
                                            ...Lt(a, u).data,
                                            metaKey: t,
                                            shiftKey: n,
                                            ctrlKey: r,
                                            altKey: o,
                                            key: i
                                        }
                                    });
                                }(t);
                                n && Tt(e, n);
                            }(this, e);
                        };
                    }
                    _doChangeToBackgroundTasks(e) {
                        this.session && (on(this.session, {
                            maxReplayDuration: this._options.maxReplayDuration,
                            sessionIdleExpire: this.timeouts.sessionIdleExpire
                        }) || (e && this._createCustomBreadcrumb(e), this.conditionalFlush()));
                    }
                    _doChangeToForegroundTasks(e) {
                        this.session && (this.checkAndHandleExpiredSession() ? e && this._createCustomBreadcrumb(e) : gt && vt.info("Document has become active, but session has expired"));
                    }
                    _updateUserActivity(e = Date.now()) {
                        this._lastActivity = e;
                    }
                    _updateSessionActivity(e = Date.now()) {
                        this.session && (this.session.lastActivity = e, this._maybeSaveSession());
                    }
                    _createCustomBreadcrumb(e) {
                        this.addUpdate(() => {
                            this.throttledAddEvent({
                                type: we.Custom,
                                timestamp: e.timestamp || 0,
                                data: {
                                    tag: "breadcrumb",
                                    payload: e
                                }
                            });
                        });
                    }
                    _addPerformanceEntries() {
                        let e = (t = this.performanceEntries, t.map(Ft).filter(Boolean)).concat(this.replayPerformanceEntries);
                        var t;
                        if (this.performanceEntries = [], this.replayPerformanceEntries = [], this._requiresManualStart) {
                            const t = this._context.initialTimestamp / 1e3;
                            e = e.filter(e => e.start >= t);
                        }
                        return Promise.all(gn(this, e));
                    }
                    _clearContext() {
                        this._context.errorIds.clear();
                        this._context.traceIds.clear();
                        this._context.urls = [];;
                    }
                    _updateInitialTimestampFromEventBuffer() {
                        const {
                            session: e,
                            eventBuffer: t
                        } = this;
                        if (!e || !t || this._requiresManualStart) {
                            return;
                        }
                        if (e.segmentId) {
                            return;
                        }
                        const n = t.getEarliestTimestamp();
                        n && n < this._context.initialTimestamp && (this._context.initialTimestamp = n);
                    }
                    _popEventContext() {
                        const e = {
                            initialTimestamp: this._context.initialTimestamp,
                            initialUrl: this._context.initialUrl,
                            errorIds: Array.from(this._context.errorIds),
                            traceIds: Array.from(this._context.traceIds),
                            urls: this._context.urls
                        };
                        return this._clearContext(), e;
                    }
                    async _runFlush() {
                        const e = this.getSessionId();
                        if (this.session && this.eventBuffer && e) {
                            if (await this._addPerformanceEntries(), this.eventBuffer && this.eventBuffer.hasEvents && (await async function(e) {
                                    try {
                                        return Promise.all(gn(e, [Rn(a.performance.memory)]));
                                    } catch (e) {
                                        return [];
                                    }
                                }(this), this.eventBuffer && e === this.getSessionId())) {
                                try {
                                    this._updateInitialTimestampFromEventBuffer();
                                    const t = Date.now();
                                    if (t - this._context.initialTimestamp > this._options.maxReplayDuration + 3e4) {
                                        throw new Error("Session is too long, not sending replay");
                                    }
                                    const n = this._popEventContext(),
                                        r = this.session.segmentId++;
                                    this._maybeSaveSession();
                                    const o = await this.eventBuffer.finish();
                                    await Ln({
                                        replayId: e,
                                        recordingData: o,
                                        segmentId: r,
                                        eventContext: n,
                                        session: this.session,
                                        timestamp: t,
                                        onError: e => this.handleException(e)
                                    });
                                } catch (e) {
                                    this.handleException(e);
                                    this.stop({
                                        reason: "sendReplay"
                                    });;
                                    const t = s.getClient();
                                    if (t) {
                                        const n = e instanceof Pn ? "ratelimit_backoff" : "send_error";
                                        t.recordDroppedEvent(n, "replay");
                                    }
                                }
                            }
                        } else {
                            gt && vt.error("No session or eventBuffer found to flush.");
                        }
                    }
                    __init5() {
                        this._flush = async ({
                            force: e = false
                        } = {}) => {
                            if (!this._isEnabled && !e) {
                                return;
                            }
                            if (!this.checkAndHandleExpiredSession()) {
                                return void(gt && vt.error("Attempting to finish replay event after session expired."));
                            }
                            if (!this.session) {
                                return;
                            }
                            const t = this.session.started,
                                n = Date.now() - t;
                            this._debouncedFlush.cancel();
                            const r = n < this._options.minReplayDuration,
                                o = n > this._options.maxReplayDuration + 5e3;
                            if (r || o) {
                                return gt && vt.info(`Session duration (${Math.floor(n / 1e3)}s) is too ${r ? "short" : "long"}, not sending replay.`), void(r && this._debouncedFlush());
                            }
                            const s = this.eventBuffer;
                            s && 0 === this.session.segmentId && !s.hasCheckout && gt && vt.info("Flushing initial segment without checkout.");
                            const i = !!this._flushLock;
                            this._flushLock || (this._flushLock = this._runFlush());
                            try {
                                await this._flushLock;
                            } catch (e) {
                                this.handleException(e);
                            } finally {
                                this._flushLock = undefined;
                                i && this._debouncedFlush();;
                            }
                        };
                    }
                    _maybeSaveSession() {
                        this.session && this._options.stickySession && tn(this.session);
                    }
                    __init6() {
                        this._onMutationHandler = e => {
                            const t = e.length,
                                n = this._options.mutationLimit,
                                r = n && t > n;
                            if (t > this._options.mutationBreadcrumbLimit || r) {
                                const e = Rt({
                                    category: "replay.mutations",
                                    data: {
                                        count: t,
                                        limit: r
                                    }
                                });
                                this._createCustomBreadcrumb(e);
                            }
                            return !r || (this.stop({
                                reason: "mutationLimit",
                                forceFlush: "session" === this.recordingMode
                            }), false);
                        };
                    }
                }
                const jn = ["content-length", "content-type", "accept"];
                let Wn = false;
                class Gn {
                    static __initStatic() {
                        this.id = "Replay";
                    }
                    constructor({
                        flushMinDelay: e = 5e3,
                        flushMaxDelay: t = 5500,
                        minReplayDuration: n = 4999,
                        maxReplayDuration: r = 36e5,
                        stickySession: o = true,
                        useCompression: i = true,
                        workerUrl: a,
                        _experiments: c = {},
                        maskAllText: l = true,
                        maskAllInputs: u = true,
                        blockAllMedia: d = true,
                        mutationBreadcrumbLimit: p = 750,
                        mutationLimit: h = 1e4,
                        slowClickTimeout: m = 7e3,
                        slowClickIgnoreSelectors: f = [],
                        networkDetailAllowUrls: g = [],
                        networkDetailDenyUrls: _ = [],
                        networkCaptureBodies: y = true,
                        networkRequestHeaders: S = [],
                        networkResponseHeaders: v = [],
                        mask: b = [],
                        maskAttributes: E = ["title", "placeholder"],
                        unmask: T = [],
                        block: I = [],
                        unblock: C = [],
                        ignore: w = [],
                        maskFn: k,
                        beforeAddRecordingEvent: A,
                        beforeErrorSampling: M,
                        onError: x
                    } = {}) {
                        this.name = Gn.id;
                        const O = function({
                            mask: e,
                            unmask: t,
                            block: n,
                            unblock: r,
                            ignore: o
                        }) {
                            return {
                                maskTextSelector: [...e, ...[".sentry-mask", "[data-sentry-mask]"]].join(","),
                                unmaskTextSelector: [...t, ...[]].join(","),
                                blockSelector: [...n, ...[".sentry-block", "[data-sentry-block]", 'base[href="/"]']].join(","),
                                unblockSelector: [...r, ...[]].join(","),
                                ignoreSelector: [...o, ...[".sentry-ignore", "[data-sentry-ignore]", 'input[type="file"]']].join(",")
                            };
                        }({
                            mask: b,
                            unmask: T,
                            block: I,
                            unblock: C,
                            ignore: w
                        });
                        if (this._recordingOptions = {
                                maskAllInputs: u,
                                maskAllText: l,
                                maskInputOptions: {
                                    password: true
                                },
                                maskTextFn: k,
                                maskInputFn: k,
                                maskAttributeFn: (e, t, n) => function({
                                    el: e,
                                    key: t,
                                    maskAttributes: n,
                                    maskAllText: r,
                                    privacyOptions: o,
                                    value: s
                                }) {
                                    return r ? o.unmaskTextSelector && e.matches(o.unmaskTextSelector) ? s : n.includes(t) || "value" === t && "INPUT" === e.tagName && ["submit", "button"].includes(e.getAttribute("type") || "") ? s.replace(/[\S]/g, "*") : s : s;
                                }({
                                    maskAttributes: E,
                                    maskAllText: l,
                                    privacyOptions: O,
                                    key: e,
                                    value: t,
                                    el: n
                                }),
                                ...O,
                                slimDOMOptions: "all",
                                inlineStylesheet: true,
                                inlineImages: false,
                                collectFonts: true,
                                errorHandler: e => {
                                    try {
                                        e.__rrweb__ = true;
                                    } catch (e) {}
                                }
                            }, this._initialOptions = {
                                flushMinDelay: e,
                                flushMaxDelay: t,
                                minReplayDuration: Math.min(n, 15e3),
                                maxReplayDuration: Math.min(r, 36e5),
                                stickySession: o,
                                useCompression: i,
                                workerUrl: a,
                                blockAllMedia: d,
                                maskAllInputs: u,
                                maskAllText: l,
                                mutationBreadcrumbLimit: p,
                                mutationLimit: h,
                                slowClickTimeout: m,
                                slowClickIgnoreSelectors: f,
                                networkDetailAllowUrls: g,
                                networkDetailDenyUrls: _,
                                networkCaptureBodies: y,
                                networkRequestHeaders: $n(S),
                                networkResponseHeaders: $n(v),
                                beforeAddRecordingEvent: A,
                                beforeErrorSampling: M,
                                onError: x,
                                _experiments: c
                            }, this._initialOptions.blockAllMedia && (this._recordingOptions.blockSelector = this._recordingOptions.blockSelector ? `${this._recordingOptions.blockSelector},${'img,image,svg,video,object,picture,embed,map,audio,link[rel="icon"],link[rel="apple-touch-icon"]'}` : 'img,image,svg,video,object,picture,embed,map,audio,link[rel="icon"],link[rel="apple-touch-icon"]'), this._isInitialized && s.isBrowser()) {
                            throw new Error("Multiple Sentry Session Replay instances are not supported");
                        }
                        this._isInitialized = true;
                    }
                    get _isInitialized() {
                        return Wn;
                    }
                    set _isInitialized(e) {
                        Wn = e;
                    }
                    afterAllSetup(e) {
                        s.isBrowser() && !this._replay && (this._setup(e), this._initialize(e));
                    }
                    start() {
                        this._replay && this._replay.start();
                    }
                    startBuffering() {
                        this._replay && this._replay.startBuffering();
                    }
                    stop() {
                        return this._replay ? this._replay.stop({
                            forceFlush: "session" === this._replay.recordingMode
                        }) : Promise.resolve();
                    }
                    flush(e) {
                        return this._replay ? this._replay.isEnabled() ? this._replay.sendBufferedReplayOrFlush(e) : (this._replay.start(), Promise.resolve()) : Promise.resolve();
                    }
                    getReplayId() {
                        if (this._replay && this._replay.isEnabled()) {
                            return this._replay.getSessionId();
                        }
                    }
                    getRecordingMode() {
                        if (this._replay && this._replay.isEnabled()) {
                            return this._replay.recordingMode;
                        }
                    }
                    _initialize(e) {
                        this._replay && (this._maybeLoadFromReplayCanvasIntegration(e), this._replay.initializeSampling());
                    }
                    _setup(e) {
                        const t = function(e, t) {
                            const n = t.getOptions(),
                                r = {
                                    sessionSampleRate: 0,
                                    errorSampleRate: 0,
                                    ...s.dropUndefinedKeys(e)
                                },
                                o = s.parseSampleRate(n.replaysSessionSampleRate),
                                i = s.parseSampleRate(n.replaysOnErrorSampleRate);
                            return null == o && null == i && s.consoleSandbox(() => {
                                console.warn("Replay is disabled because neither `replaysSessionSampleRate` nor `replaysOnErrorSampleRate` are set.");
                            }), null != o && (r.sessionSampleRate = o), null != i && (r.errorSampleRate = i), r;
                        }(this._initialOptions, e);
                        this._replay = new Bn({
                            options: t,
                            recordingOptions: this._recordingOptions
                        });
                    }
                    _maybeLoadFromReplayCanvasIntegration(e) {
                        try {
                            const t = e.getIntegrationByName("ReplayCanvas");
                            if (!t) {
                                return;
                            }
                            this._replay._canvas = t.getOptions();
                        } catch (e) {}
                    }
                }

                function $n(e) {
                    return [...jn, ...e.map(e => e.toLowerCase())];
                }
                Gn.__initStatic();;;;
            },
            800: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(6421),
                    s = n(4288),
                    i = n(7670),
                    a = n(7227);
                class c extends r.BaseClient {
                    constructor(e) {
                        const t = {
                                parentSpanIsAlwaysRootSpan: true,
                                ...e
                            },
                            n = i.WINDOW.SENTRY_SDK_SOURCE || r.getSDKSource();
                        r.applySdkMetadata(t, "browser", ["browser"], n);
                        super(t);
                        t.sendClientReports && i.WINDOW.document && i.WINDOW.document.addEventListener("visibilitychange", () => {
                            "hidden" === i.WINDOW.document.visibilityState && this._flushOutcomes();
                        });;
                    }
                    eventFromException(e, t) {
                        return s.eventFromException(this._options.stackParser, e, t, this._options.attachStacktrace);
                    }
                    eventFromMessage(e, t = "info", n) {
                        return s.eventFromMessage(this._options.stackParser, e, t, n, this._options.attachStacktrace);
                    }
                    captureUserFeedback(e) {
                        if (!this._isEnabled()) {
                            return void(o.DEBUG_BUILD && r.logger.warn("SDK not enabled, will not capture user feedback."));
                        }
                        const t = a.createUserFeedbackEnvelope(e, {
                            metadata: this.getSdkMetadata(),
                            dsn: this.getDsn(),
                            tunnel: this.getOptions().tunnel
                        });
                        this.sendEnvelope(t);
                    }
                    _prepareEvent(e, t, n) {
                        return e.platform = e.platform || "javascript", super._prepareEvent(e, t, n);
                    }
                };
            },
            6421: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const n = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;;
            },
            4288: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872);

                function o(e, t) {
                    const n = i(e, t),
                        r = {
                            type: l(t),
                            value: u(t)
                        };
                    return n.length && (r.stacktrace = {
                        frames: n
                    }), undefined === r.type && "" === r.value && (r.value = "Unrecoverable error caught"), r;
                }

                function s(e, t) {
                    return {
                        exception: {
                            values: [o(e, t)]
                        }
                    };
                }

                function i(e, t) {
                    const n = t.stacktrace || t.stack || "",
                        r = function(e) {
                            return e && /Minified React error #\d+;/i.test(e.message) ? 1 : 0;
                        }(t),
                        o = function(e) {
                            return "number" == typeof e.framesToPop ? e.framesToPop : 0;
                        }(t);
                    try {
                        return e(n, r, o);
                    } catch (e) {}
                    return [];
                };

                function l(e) {
                    const t = e && e.name;
                    return !t && ("undefined" != typeof WebAssembly && undefined !== WebAssembly.Exception && e instanceof WebAssembly.Exception) ? e.message && Array.isArray(e.message) && 2 == e.message.length ? e.message[0] : "WebAssembly.Exception" : t;
                }

                function u(e) {
                    const t = e && e.message;
                    return t ? t.error && "string" == typeof t.error.message ? t.error.message : "undefined" != typeof WebAssembly && undefined !== WebAssembly.Exception && e instanceof WebAssembly.Exception && Array.isArray(e.message) && 2 == e.message.length ? e.message[1] : t : "No error message";
                }

                function d(e, t, n, a, c) {
                    let l;
                    if (r.isErrorEvent(t) && t.error) {
                        return s(e, t.error);
                    }
                    if (r.isDOMError(t) || r.isDOMException(t)) {
                        const o = t;
                        if ("stack" in t) {
                            l = s(e, t);
                        } else {
                            const t = o.name || (r.isDOMError(o) ? "DOMError" : "DOMException"),
                                s = o.message ? `${t}: ${o.message}` : t;
                            l = p(e, s, n, a);
                            r.addExceptionTypeValue(l, s);;
                        }
                        return "code" in o && (l.tags = {
                            ...l.tags,
                            "DOMException.code": `${o.code}`
                        }), l;
                    }
                    return r.isError(t) ? s(e, t) : r.isPlainObject(t) || r.isEvent(t) ? (l = function(e, t, n, s) {
                        const a = r.getClient(),
                            c = a && a.getOptions().normalizeDepth,
                            l = function(e) {
                                for (const t in e)
                                    if (Object.prototype.hasOwnProperty.call(e, t)) {
                                        const n = e[t];
                                        if (n instanceof Error) {
                                            return n;
                                        }
                                    }
                            }(t),
                            u = {
                                __serialized__: r.normalizeToSize(t, c)
                            };
                        if (l) {
                            return {
                                exception: {
                                    values: [o(e, l)]
                                },
                                extra: u
                            };
                        }
                        const d = {
                            exception: {
                                values: [{
                                    type: r.isEvent(t) ? t.constructor.name : s ? "UnhandledRejection" : "Error",
                                    value: h(t, {
                                        isUnhandledRejection: s
                                    })
                                }]
                            },
                            extra: u
                        };
                        if (n) {
                            const t = i(e, n);
                            t.length && (d.exception.values[0].stacktrace = {
                                frames: t
                            });
                        }
                        return d;
                    }(e, t, n, c), r.addExceptionMechanism(l, {
                        synthetic: true
                    }), l) : (l = p(e, t, n, a), r.addExceptionTypeValue(l, `${t}`, undefined), r.addExceptionMechanism(l, {
                        synthetic: true
                    }), l);
                }

                function p(e, t, n, o) {
                    const s = {
                        l: null,
                        async: true,
                        crossOrigin: "anonymous",
                        src: r.getReportDialogEndpoint(o, e),
                        all: o + a,
                        WARN: "WARN",
                        ERROR: "ERROR",
                        DEBUG: "DEBUG"
                    };
                    if (o && n) {
                        const r = i(e, n);
                        r.length && (s.exception = {
                            values: [{
                                value: t,
                                stacktrace: {
                                    frames: r
                                }
                            }]
                        });
                    }
                    if (r.isParameterizedString(t)) {
                        const {
                            __sentry_template_string__: e,
                            __sentry_template_values__: n
                        } = t;
                        return s.logentry = {
                            message: e,
                            params: n
                        }, s;
                    }
                    return s.message = t, s;
                }

                function h(e, {
                    isUnhandledRejection: t
                }) {
                    const n = r.extractExceptionKeysForMessage(e),
                        o = t ? "promise rejection" : "exception";
                    return r.isErrorEvent(e) ? `Event \`ErrorEvent\` captured as ${o} with message \`${e.message}\`` : r.isEvent(e) ? `Event \`${function (e) {
      try {
        const t = Object.getPrototypeOf(e);
        return t ? t.constructor.name : undefined;
      } catch (e) {}
    }(e)}\` (type=${e.type}) captured as ${o}` : `Object captured as ${o} with keys: ${n}`;
                };;;;;;;
            },
            6342: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(6532),
                    o = n(5201),
                    s = r.buildFeedbackIntegration({
                        lazyLoadIntegration: o.lazyLoadIntegration
                    });;
            },
            6339: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(6532),
                    o = n(5201),
                    s = r.buildFeedbackIntegration({
                        lazyLoadIntegration: o.lazyLoadIntegration,
                        getModalIntegration: () => r.feedbackModalIntegration,
                        getScreenshotIntegration: () => r.feedbackScreenshotIntegration
                    });;
            },
            7670: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = r.GLOBAL_OBJ;
                let s = 0;

                function i() {
                    s++;
                    setTimeout(() => {
                        s--;
                    });;
                };;;;;
            },
            327: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7670),
                    s = n(800),
                    i = n(6750),
                    a = n(7558),
                    c = n(4288),
                    l = n(7227),
                    u = n(6127),
                    d = n(1673),
                    p = n(4449),
                    h = n(8968),
                    m = n(2357),
                    f = n(5196),
                    g = n(5201),
                    _ = n(2855),
                    y = n(44),
                    S = n(8585),
                    v = n(2992),
                    b = n(7143),
                    E = n(6342),
                    T = n(6339),
                    I = n(6532),
                    C = n(7578),
                    w = n(7299),
                    k = n(3646),
                    A = n(213),
                    M = n(4012),
                    x = n(8195);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            },
            1673: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1015),
                    o = n(7872),
                    s = n(6421),
                    i = n(7670),
                    a = o.defineIntegration((e = {}) => {
                        const t = {
                            console: true,
                            dom: true,
                            fetch: true,
                            history: true,
                            sentry: true,
                            xhr: true,
                            ...e
                        };
                        return {
                            name: "Breadcrumbs",
                            setup(e) {
                                t.console && o.addConsoleInstrumentationHandler(function(t) {
                                    if (o.getClient() !== e) {
                                        return;
                                    }
                                    const n = {
                                        category: "console",
                                        data: {
                                            arguments: t.args,
                                            logger: "console"
                                        },
                                        level: o.severityLevelFromString(t.level),
                                        message: o.safeJoin(t.args, " ")
                                    };
                                    if ("assert" === t.level) {
                                        if (false !== t.args[0]) {
                                            return;
                                        };
                                        n.data.arguments = t.args.slice(1);;
                                    }
                                    o.addBreadcrumb(n, {
                                        input: t.args,
                                        level: t.level
                                    });
                                });
                                t.dom && r.addClickKeypressInstrumentationHandler(function(n) {
                                    if (o.getClient() !== e) {
                                        return;
                                    }
                                    let r, i, a = "object" == typeof t ? t.serializeAttribute : undefined,
                                        c = "object" == typeof t && "number" == typeof t.maxStringLength ? t.maxStringLength : undefined;
                                    c && c > 1024 && (s.DEBUG_BUILD && o.logger.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${c} was configured. Sentry will use 1024 instead.`), c = 1024);
                                    "string" == typeof a && (a = [a]);;
                                    try {
                                        const e = n.event,
                                            t = function(e) {
                                                return !!e && !!e.target;
                                            }(e) ? e.target : e;
                                        r = o.htmlTreeAsString(t, {
                                            keyAttrs: a,
                                            maxStringLength: c
                                        });
                                        i = o.getComponentName(t);;
                                    } catch (e) {
                                        r = "<unknown>";
                                    }
                                    if (0 === r.length) {
                                        return;
                                    }
                                    const l = {
                                        category: `ui.${n.name}`,
                                        message: r
                                    };
                                    i && (l.data = {
                                        "ui.component_name": i
                                    });
                                    o.addBreadcrumb(l, {
                                        event: n.event,
                                        name: n.name,
                                        global: n.global
                                    });;
                                });
                                t.xhr && r.addXhrInstrumentationHandler(function(t) {
                                    if (o.getClient() !== e) {
                                        return;
                                    }
                                    const {
                                        startTimestamp: n,
                                        endTimestamp: s
                                    } = t, i = t.xhr[r.SENTRY_XHR_DATA_KEY];
                                    if (!n || !s || !i) {
                                        return;
                                    }
                                    const {
                                        method: a,
                                        url: c,
                                        status_code: l,
                                        body: u
                                    } = i, d = {
                                        method: a,
                                        url: c,
                                        status_code: l
                                    }, p = {
                                        xhr: t.xhr,
                                        input: u,
                                        startTimestamp: n,
                                        endTimestamp: s
                                    }, h = o.getBreadcrumbLogLevelFromHttpStatusCode(l);
                                    o.addBreadcrumb({
                                        category: "xhr",
                                        data: d,
                                        type: "http",
                                        level: h
                                    }, p);
                                });
                                t.fetch && o.addFetchInstrumentationHandler(function(t) {
                                    if (o.getClient() !== e) {
                                        return;
                                    }
                                    const {
                                        startTimestamp: n,
                                        endTimestamp: r
                                    } = t;
                                    if (r && (!t.fetchData.url.match(/sentry_key/) || "POST" !== t.fetchData.method)) {
                                        if (t.error) {
                                            const e = t.fetchData,
                                                s = {
                                                    data: t.error,
                                                    input: t.args,
                                                    startTimestamp: n,
                                                    endTimestamp: r
                                                };
                                            o.addBreadcrumb({
                                                category: "fetch",
                                                data: e,
                                                level: "error",
                                                type: "http"
                                            }, s);
                                        } else {
                                            const e = t.response,
                                                s = {
                                                    ...t.fetchData,
                                                    status_code: e && e.status
                                                },
                                                i = {
                                                    input: t.args,
                                                    response: e,
                                                    startTimestamp: n,
                                                    endTimestamp: r
                                                },
                                                a = o.getBreadcrumbLogLevelFromHttpStatusCode(s.status_code);
                                            o.addBreadcrumb({
                                                category: "fetch",
                                                data: s,
                                                type: "http",
                                                level: a
                                            }, i);
                                        }
                                    }
                                });
                                t.history && r.addHistoryInstrumentationHandler(function(t) {
                                    if (o.getClient() !== e) {
                                        return;
                                    }
                                    let n = t.from,
                                        r = t.to;
                                    const s = o.parseUrl(i.WINDOW.location.href);
                                    let a = n ? o.parseUrl(n) : undefined;
                                    const c = o.parseUrl(r);
                                    a && a.path || (a = s);
                                    s.protocol === c.protocol && s.host === c.host && (r = c.relative);
                                    s.protocol === a.protocol && s.host === a.host && (n = a.relative);
                                    o.addBreadcrumb({
                                        category: "navigation",
                                        data: {
                                            from: n,
                                            to: r
                                        }
                                    });;
                                });
                                t.sentry && e.on("beforeSendEvent", function(t) {
                                    o.getClient() === e && o.addBreadcrumb({
                                        category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
                                        event_id: t.event_id,
                                        level: t.level,
                                        message: o.getEventDescription(t)
                                    }, {
                                        event: t
                                    });
                                });;
                            }
                        };
                    });;
            },
            5196: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7670),
                    s = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "BroadcastChannel", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "SharedWorker", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"],
                    i = r.defineIntegration((e = {}) => {
                        const t = {
                            XMLHttpRequest: true,
                            eventTarget: true,
                            requestAnimationFrame: true,
                            setInterval: true,
                            setTimeout: true,
                            ...e
                        };
                        return {
                            name: "BrowserApiErrors",
                            setupOnce() {
                                t.setTimeout && r.fill(o.WINDOW, "setTimeout", a);
                                t.setInterval && r.fill(o.WINDOW, "setInterval", a);
                                t.requestAnimationFrame && r.fill(o.WINDOW, "requestAnimationFrame", c);
                                t.XMLHttpRequest && "XMLHttpRequest" in o.WINDOW && r.fill(XMLHttpRequest.prototype, "send", l);;
                                const e = t.eventTarget;
                                e && (Array.isArray(e) ? e : s).forEach(u);
                            }
                        };
                    });

                function a(e) {
                    return function(...t) {
                        const n = t[0];
                        return t[0] = o.wrap(n, {
                            mechanism: {
                                data: {
                                    function: r.getFunctionName(e)
                                },
                                handled: false,
                                type: "instrument"
                            }
                        }), e.apply(this, t);
                    };
                }

                function c(e) {
                    return function(t) {
                        return e.apply(this, [o.wrap(t, {
                            mechanism: {
                                data: {
                                    function: "requestAnimationFrame",
                                    handler: r.getFunctionName(e)
                                },
                                handled: false,
                                type: "instrument"
                            }
                        })]);
                    };
                }

                function l(e) {
                    return function(...t) {
                        const n = this;
                        return ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(e => {
                            e in n && "function" == typeof n[e] && r.fill(n, e, function(t) {
                                const n = {
                                        mechanism: {
                                            data: {
                                                function: e,
                                                handler: r.getFunctionName(t)
                                            },
                                            handled: false,
                                            type: "instrument"
                                        }
                                    },
                                    s = r.getOriginalFunction(t);
                                return s && (n.mechanism.data.handler = r.getFunctionName(s)), o.wrap(t, n);
                            });
                        }), e.apply(this, t);
                    };
                }

                function u(e) {
                    const t = o.WINDOW,
                        n = t[e] && t[e].prototype;
                    n && n.hasOwnProperty && n.hasOwnProperty("addEventListener") && (r.fill(n, "addEventListener", function(t) {
                        return function(n, s, i) {
                            try {
                                "function" == typeof s.handleEvent && (s.handleEvent = o.wrap(s.handleEvent, {
                                    mechanism: {
                                        data: {
                                            function: "handleEvent",
                                            handler: r.getFunctionName(s),
                                            target: e
                                        },
                                        handled: false,
                                        type: "instrument"
                                    }
                                }));
                            } catch (e) {}
                            return t.apply(this, [n, o.wrap(s, {
                                mechanism: {
                                    data: {
                                        function: "addEventListener",
                                        handler: r.getFunctionName(s),
                                        target: e
                                    },
                                    handled: false,
                                    type: "instrument"
                                }
                            }), i]);
                        };
                    }), r.fill(n, "removeEventListener", function(e) {
                        return function(t, n, r) {
                            const o = n;
                            try {
                                const n = o && o.__sentry_wrapped__;
                                n && e.call(this, t, n, r);
                            } catch (e) {}
                            return e.call(this, t, o, r);
                        };
                    }));
                };
            },
            8585: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = r.GLOBAL_OBJ,
                    s = r.defineIntegration((e = {}) => {
                        const t = null != e.frameContextLines ? e.frameContextLines : 7;
                        return {
                            name: "ContextLines",
                            processEvent: e => function(e, t) {
                                const n = o.document,
                                    s = o.location && r.stripUrlQueryAndFragment(o.location.href);
                                if (!n || !s) {
                                    return e;
                                }
                                const a = e.exception && e.exception.values;
                                if (!a || !a.length) {
                                    return e;
                                }
                                const c = n.documentElement.innerHTML;
                                if (!c) {
                                    return e;
                                }
                                const l = ["<!DOCTYPE html>", "<html>", ...c.split("\n"), "</html>"];
                                return a.forEach(e => {
                                    const n = e.stacktrace;
                                    n && n.frames && (n.frames = n.frames.map(e => i(e, l, s, t)));
                                }), e;
                            }(e, t)
                        };
                    });

                function i(e, t, n, o) {
                    return e.filename === n && e.lineno && t.length ? (r.addContextToFrame(t, e, o), e) : e;
                };;;
            },
            4449: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(6421),
                    s = n(4288),
                    i = n(7670),
                    a = r.defineIntegration((e = {}) => {
                        const t = {
                            onerror: true,
                            onunhandledrejection: true,
                            ...e
                        };
                        return {
                            name: "GlobalHandlers",
                            setupOnce() {
                                Error.stackTraceLimit = 50;
                            },
                            setup(e) {
                                t.onerror && (function(e) {
                                    r.addGlobalErrorInstrumentationHandler(t => {
                                        const {
                                            stackParser: n,
                                            attachStacktrace: o
                                        } = l();
                                        if (r.getClient() !== e || i.shouldIgnoreOnError()) {
                                            return;
                                        }
                                        const {
                                            msg: a,
                                            url: c,
                                            line: u,
                                            column: d,
                                            error: p
                                        } = t, h = function(e, t, n, o) {
                                            const s = e.exception = e.exception || {},
                                                i = s.values = s.values || [],
                                                a = i[0] = i[0] || {},
                                                c = a.stacktrace = a.stacktrace || {},
                                                l = c.frames = c.frames || [],
                                                u = isNaN(parseInt(o, 10)) ? undefined : o,
                                                d = isNaN(parseInt(n, 10)) ? undefined : n,
                                                p = r.isString(t) && t.length > 0 ? t : r.getLocationHref();
                                            return 0 === l.length && l.push({
                                                colno: u,
                                                filename: p,
                                                function: r.UNKNOWN_FUNCTION,
                                                in_app: true,
                                                lineno: d
                                            }), e;
                                        }(s.eventFromUnknownInput(n, p || a, undefined, o, false), c, u, d);;
                                        r.captureEvent(h, {
                                            originalException: p,
                                            mechanism: {
                                                handled: false,
                                                type: "onerror"
                                            }
                                        });;
                                    });
                                }(e), c("onerror"));
                                t.onunhandledrejection && (function(e) {
                                    r.addGlobalUnhandledRejectionInstrumentationHandler(t => {
                                        const {
                                            stackParser: n,
                                            attachStacktrace: o
                                        } = l();
                                        if (r.getClient() !== e || i.shouldIgnoreOnError()) {
                                            return;
                                        }
                                        const a = function(e) {
                                                if (r.isPrimitive(e)) {
                                                    return e;
                                                }
                                                try {
                                                    if ("reason" in e) {
                                                        return e.reason;
                                                    }
                                                    if ("detail" in e && "reason" in e.detail) {
                                                        return e.detail.reason;
                                                    }
                                                } catch (e) {}
                                                return e;
                                            }(t),
                                            c = r.isPrimitive(a) ? {
                                                exception: {
                                                    values: [{
                                                        type: "UnhandledRejection",
                                                        value: `Non-Error promise rejection captured with value: ${String(a)}`
                                                    }]
                                                }
                                            } : s.eventFromUnknownInput(n, a, undefined, o, true);;
                                        r.captureEvent(c, {
                                            originalException: a,
                                            mechanism: {
                                                handled: false,
                                                type: "onunhandledrejection"
                                            }
                                        });;
                                    });
                                }(e), c("onunhandledrejection"));;
                            }
                        };
                    });

                function c(e) {
                    o.DEBUG_BUILD && r.logger.log(`Global Handler attached: ${e}`);
                }

                function l() {
                    const e = r.getClient();
                    return e && e.getOptions() || {
                        stackParser: () => [],
                        attachStacktrace: false
                    };
                };
            },
            44: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1015),
                    o = n(7872),
                    s = n(6421),
                    i = o.defineIntegration((e = {}) => {
                        const t = {
                            failedRequestStatusCodes: [
                                [500, 599]
                            ],
                            failedRequestTargets: [/.*/],
                            ...e
                        };
                        return {
                            name: "HttpClient",
                            setup(e) {
                                ! function(e, t) {
                                    o.supportsNativeFetch() && o.addFetchInstrumentationHandler(n => {
                                        if (o.getClient() !== e) {
                                            return;
                                        }
                                        const {
                                            response: r,
                                            args: s
                                        } = n, [i, c] = s;
                                        r && function(e, t, n, r) {
                                            if (u(e, n.status, n.url)) {
                                                const e = function(e, t) {
                                                    return !t && e instanceof Request || e instanceof Request && e.bodyUsed ? e : new Request(e, t);
                                                }(t, r);
                                                let s, i, c, l;
                                                p() && ([s, c] = a("Cookie", e), [i, l] = a("Set-Cookie", n));
                                                const u = d({
                                                    url: e.url,
                                                    method: e.method,
                                                    status: n.status,
                                                    requestHeaders: s,
                                                    responseHeaders: i,
                                                    requestCookies: c,
                                                    responseCookies: l
                                                });
                                                o.captureEvent(u);
                                            }
                                        }(t, i, r, c);
                                    });
                                }(e, t);
                                (function(e, t) {
                                    "XMLHttpRequest" in o.GLOBAL_OBJ && r.addXhrInstrumentationHandler(n => {
                                        if (o.getClient() !== e) {
                                            return;
                                        }
                                        const i = n.xhr,
                                            a = i[r.SENTRY_XHR_DATA_KEY];
                                        if (!a) {
                                            return;
                                        }
                                        const {
                                            method: c,
                                            request_headers: h
                                        } = a;
                                        try {
                                            ! function(e, t, n, r) {
                                                if (u(e, t.status, t.responseURL)) {
                                                    let e, i, a;
                                                    if (p()) {
                                                        try {
                                                            const e = t.getResponseHeader("Set-Cookie") || t.getResponseHeader("set-cookie") || undefined;
                                                            e && (i = l(e));
                                                        } catch (e) {
                                                            s.DEBUG_BUILD && o.logger.log("Could not extract cookies from response headers");
                                                        }
                                                        try {
                                                            a = function(e) {
                                                                const t = e.getAllResponseHeaders();
                                                                return t ? t.split("\r\n").reduce((e, t) => {
                                                                    const [n, r] = t.split(": ");
                                                                    return n && r && (e[n] = r), e;
                                                                }, {}) : {};
                                                            }(t);
                                                        } catch (e) {
                                                            s.DEBUG_BUILD && o.logger.log("Could not extract headers from response");
                                                        }
                                                        e = r;
                                                    }
                                                    const c = d({
                                                        url: t.responseURL,
                                                        method: n,
                                                        status: t.status,
                                                        requestHeaders: e,
                                                        responseHeaders: a,
                                                        responseCookies: i
                                                    });
                                                    o.captureEvent(c);
                                                }
                                            }(t, i, c, h);
                                        } catch (e) {
                                            s.DEBUG_BUILD && o.logger.warn("Error while extracting response event form XHR response", e);
                                        }
                                    });
                                }(e, t));;
                            }
                        };
                    });

                function a(e, t) {
                    const n = function(e) {
                        const t = {
                            n: e
                        };
                        return e.forEach((e, n) => {
                            ;
                        }), t;
                    }(t.headers);
                    let r;
                    try {
                        const t = n[e] || n[e.toLowerCase()] || undefined;
                        t && (r = l(t));
                    } catch (t) {
                        s.DEBUG_BUILD && o.logger.log(`Could not extract cookies from header ${e}`);
                    }
                    return [n, r];
                }

                function c(e) {
                    if (e) {
                        const t = e["Content-Length"] || e["content-length"];
                        if (t) {
                            return parseInt(t, 10);
                        }
                    }
                }

                function l(e) {
                    return e.split("; ").reduce((e, t) => {
                        const [n, r] = t.split("=");
                        return n && r && (e[n] = r), e;
                    }, {});
                }

                function u(e, t, n) {
                    return function(e, t) {
                        return e.some(e => "number" == typeof e ? e === t : t >= e[0] && t <= e[1]);
                    }(e.failedRequestStatusCodes, t) && (r = e.failedRequestTargets, s = n, r.some(e => "string" == typeof e ? s.includes(e) : e.test(s))) && !o.isSentryRequestUrl(n, o.getClient());
                    var r, s;
                }

                function d(e) {
                    const t = `HTTP Client Error with status code: ${e.status}`,
                        n = {
                            message: t,
                            exception: {
                                values: [{
                                    type: "Error",
                                    value: t
                                }]
                            },
                            request: {
                                url: e.url,
                                method: e.method,
                                headers: e.requestHeaders,
                                cookies: e.requestCookies
                            },
                            contexts: {
                                response: {
                                    status_code: e.status,
                                    headers: e.responseHeaders,
                                    cookies: e.responseCookies,
                                    body_size: c(e.responseHeaders)
                                }
                            }
                        };
                    return o.addExceptionMechanism(n, {
                        type: "http.client",
                        handled: false
                    }), n;
                }

                function p() {
                    const e = o.getClient();
                    return !!e && Boolean(e.getOptions().sendDefaultPii);
                };
            },
            8968: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7670),
                    s = r.defineIntegration(() => ({
                        name: "HttpContext",
                        preprocessEvent(e) {
                            if (!o.WINDOW.navigator && !o.WINDOW.location && !o.WINDOW.document) {
                                return;
                            }
                            const t = e.request && e.request.url || o.WINDOW.location && o.WINDOW.location.href,
                                {
                                    referrer: n
                                } = o.WINDOW.document || {},
                                {
                                    userAgent: r
                                } = o.WINDOW.navigator || {},
                                s = {
                                    ...e.request && e.request.headers,
                                    ...n && {
                                        Referer: n
                                    },
                                    ...r && {
                                        "User-Agent": r
                                    }
                                },
                                i = {
                                    ...e.request,
                                    ...t && {
                                        url: t
                                    },
                                    headers: s
                                };
                            e.request = i;
                        }
                    }));;
            },
            2357: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(4288),
                    s = r.defineIntegration((e = {}) => {
                        const t = e.limit || 5,
                            n = e.key || "cause";
                        return {
                            name: "LinkedErrors",
                            preprocessEvent(e, s, i) {
                                const a = i.getOptions();
                                r.applyAggregateErrorsToEvent(o.exceptionFromError, a.stackParser, a.maxValueLength, n, t, e, s);
                            }
                        };
                    });;
            },
            2855: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = r.GLOBAL_OBJ,
                    s = new WeakMap,
                    i = r.defineIntegration((e = {}) => {
                        const t = e.types || ["crash", "deprecation", "intervention"];

                        function n(e) {
                            if (s.has(r.getClient())) {
                                for (const t of e) r.withScope(e => {
                                    e.setExtra("url", t.url);
                                    const n = `ReportingObserver [${t.type}]`;
                                    let o = "No details available";
                                    if (t.body) {
                                        const n = {
                                            e: t.body[e]
                                        };
                                        for (const e in t.body);
                                        if (e.setExtra("body", n), "crash" === t.type) {
                                            const e = t.body;
                                            o = [e.crashId || "", e.reason || ""].join(" ").trim() || o;
                                        } else {
                                            o = t.body.message || o;
                                        }
                                    }
                                    r.captureMessage(`${n}: ${o}`);
                                });
                            }
                        }
                        return {
                            name: "ReportingObserver",
                            setupOnce() {
                                r.supportsReportingObserver() && new o.ReportingObserver(n, {
                                    buffered: true,
                                    types: t
                                }).observe();
                            },
                            setup(e) {
                                s.set(e, true);
                            }
                        };
                    });;
            },
            8195: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1015),
                    o = n(7872),
                    s = n(6421),
                    a = o.defineIntegration((e = {}) => {
                        const t = e.sidecarUrl || "http://localhost:8969/stream";
                        return {
                            name: "SpotlightBrowser",
                            setup: () => {
                                s.DEBUG_BUILD && o.logger.log("Using Sidecar URL", t);
                            },
                            processEvent: e => Boolean("transaction" === e.type && e.spans && e.contexts && e.contexts.trace && "ui.action.click" === e.contexts.trace.op && e.spans.some(({
                                description: e
                            }) => e && e.includes("#sentry-spotlight"))) ? null : e,
                            afterAllSetup: e => {
                                ! function(e, t) {
                                    const n = r.getNativeImplementation("fetch");
                                    let s = 0;
                                    e.on("beforeEnvelope", e => {
                                        s > 3 ? o.logger.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests:", s) : n(t, {
                                            method: "POST",
                                            body: o.serializeEnvelope(e),
                                            headers: {
                                                "Content-Type": "application/x-sentry-envelope"
                                            },
                                            mode: "cors"
                                        }).then(e => {
                                            e.status >= 200 && e.status < 400 && (s = 0);
                                        }, e => {
                                            s++;
                                            o.logger.error("Sentry SDK can't connect to Sidecar is it running? See: https://spotlightjs.com/sidecar/npx/", e);;
                                        });
                                    });
                                }(e, t);
                            }
                        };
                    });;;;;
            },
            7578: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = {
                        increment: function(e, t = 1, n) {
                            r.metrics.increment(r.BrowserMetricsAggregator, e, t, n);
                        },
                        distribution: function(e, t, n) {
                            r.metrics.distribution(r.BrowserMetricsAggregator, e, t, n);
                        },
                        set: function(e, t, n) {
                            r.metrics.set(r.BrowserMetricsAggregator, e, t, n);
                        },
                        gauge: function(e, t, n) {
                            r.metrics.gauge(r.BrowserMetricsAggregator, e, t, n);
                        },
                        timing: function(e, t, n = "second", o) {
                            return r.metrics.timing(r.BrowserMetricsAggregator, e, t, n, o);
                        }
                    };;
            },
            4012: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(6421),
                    s = n(8826),
                    i = n(7751),
                    a = r.defineIntegration(() => ({
                        name: "BrowserProfiling",
                        setup(e) {
                            const t = r.getActiveSpan(),
                                n = t && r.getRootSpan(t);
                            n && i.isAutomatedPageLoadSpan(n) && i.shouldProfileSpan(n) && s.startProfileForSpan(n);
                            e.on("spanStart", e => {
                                e === r.getRootSpan(e) && i.shouldProfileSpan(e) && s.startProfileForSpan(e);
                            });
                            e.on("beforeEnvelope", e => {
                                if (!i.getActiveProfilesCount()) {
                                    return;
                                }
                                const t = i.findProfiledTransactionsFromEnvelope(e);
                                if (!t.length) {
                                    return;
                                }
                                const n = [];
                                for (const e of t) {
                                    const t = e && e.contexts,
                                        s = t && t.profile && t.profile.profile_id,
                                        a = t && t.profile && t.profile.start_timestamp;
                                    if ("string" != typeof s) {
                                        o.DEBUG_BUILD && r.logger.log("[Profiling] cannot find profile for a span without a profile context");
                                        continue;
                                    }
                                    if (!s) {
                                        o.DEBUG_BUILD && r.logger.log("[Profiling] cannot find profile for a span without a profile context");
                                        continue;
                                    }
                                    t && t.profile && delete t.profile;
                                    const c = i.takeProfileFromGlobalCache(s);
                                    if (!c) {
                                        o.DEBUG_BUILD && r.logger.log(`[Profiling] Could not retrieve profile for span: ${s}`);
                                        continue;
                                    }
                                    const l = i.createProfilingEvent(s, a, c, e);
                                    l && n.push(l);
                                }
                                i.addProfilesToEnvelope(e, n);
                            });;
                        }
                    }));;
            },
            8826: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(6421),
                    s = n(7670),
                    i = n(7751);;
            },
            7751: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(6421),
                    s = n(7670),
                    a = String(0);
                let c = "",
                    l = "",
                    u = "",
                    d = s.WINDOW.navigator && s.WINDOW.navigator.userAgent || "",
                    p = "";
                const h = s.WINDOW.navigator && s.WINDOW.navigator.language || s.WINDOW.navigator && s.WINDOW.navigator.languages && s.WINDOW.navigator.languages[0] || "",
                    m = s.WINDOW.navigator && s.WINDOW.navigator.userAgentData;
                var f;

                function g(e) {
                    return function(e) {
                        return !("thread_metadata" in e);
                    }(e) ? y(e) : e;
                }

                function _(e, t, n, i) {
                    if ("transaction" !== i.type) {
                        throw new TypeError("Profiling events may only be attached to transactions, this should never occur.");
                    }
                    if (null == n) {
                        throw new TypeError(`Cannot construct profiling event envelope without a valid profile. Got ${n} instead.`);
                    }
                    const m = function(e) {
                            const t = e && e.contexts && e.contexts.trace && e.contexts.trace.trace_id;
                            return "string" == typeof t && 32 !== t.length && o.DEBUG_BUILD && r.logger.log(`[Profiling] Invalid traceId: ${t} on profiled event`), "string" != typeof t ? "" : t;
                        }(i),
                        f = g(n),
                        _ = t || ("number" == typeof i.start_timestamp ? 1e3 * i.start_timestamp : 1e3 * r.timestampInSeconds()),
                        y = "number" == typeof i.timestamp ? 1e3 * i.timestamp : 1e3 * r.timestampInSeconds();
                    return {
                        event_id: e,
                        timestamp: new Date(_).toISOString(),
                        platform: "javascript",
                        version: "1",
                        release: i.release || "",
                        environment: i.environment || r.DEFAULT_ENVIRONMENT,
                        runtime: {
                            name: "javascript",
                            version: s.WINDOW.navigator.userAgent
                        },
                        os: {
                            name: c,
                            version: l,
                            build_number: d
                        },
                        device: {
                            locale: h,
                            model: p,
                            manufacturer: d,
                            architecture: u,
                            is_emulator: false
                        },
                        debug_meta: {
                            images: S(n.resources)
                        },
                        profile: f,
                        transactions: [{
                            name: i.transaction || "",
                            id: i.event_id || r.uuid4(),
                            trace_id: m,
                            active_thread_id: a,
                            relative_start_ns: "0",
                            relative_end_ns: (1e6 * (y - _)).toFixed(0)
                        }]
                    };
                }

                function y(e) {
                    let t, n = 0;
                    const o = {
                            samples: [],
                            stacks: [],
                            frames: [],
                            thread_metadata: {
                                [a]: {
                                    name: "main"
                                }
                            }
                        },
                        s = e.samples[0];
                    if (!s) {
                        return o;
                    }
                    const c = s.timestamp,
                        l = "number" == typeof performance.timeOrigin ? performance.timeOrigin : r.browserPerformanceTimeOrigin || 0,
                        u = l - (r.browserPerformanceTimeOrigin || l);
                    return e.samples.forEach((r, s) => {
                        if (undefined === r.stackId) {
                            return undefined === t && (t = n, o.stacks[t] = [], n++), void(o.samples[s] = {
                                elapsed_since_start_ns: ((r.timestamp + u - c) * 1e6).toFixed(0),
                                stack_id: t,
                                thread_id: a
                            });
                        }
                        let l = e.stacks[r.stackId];
                        const d = [];
                        for (; l;) {
                            d.push(l.frameId);
                            const t = e.frames[l.frameId];
                            t && undefined === o.frames[l.frameId] && (o.frames[l.frameId] = {
                                function: t.name,
                                abs_path: "number" == typeof t.resourceId ? e.resources[t.resourceId] : undefined,
                                lineno: t.line,
                                colno: t.column
                            });
                            l = undefined === l.parentId ? undefined : e.stacks[l.parentId];;
                        }
                        const p = {
                            elapsed_since_start_ns: ((r.timestamp + u - c) * 1e6).toFixed(0),
                            stack_id: n,
                            thread_id: a
                        };
                        o.stacks[n] = d;
                        o.samples[s] = p;
                        n++;;
                    }), o;
                }

                function S(e) {
                    const t = r.getClient(),
                        n = t && t.getOptions(),
                        o = n && n.stackParser;
                    return o ? r.getDebugImagesForResources(o, e) : [];
                }

                function v(e) {
                    return "number" != typeof e && "boolean" != typeof e || "number" == typeof e && isNaN(e) ? (o.DEBUG_BUILD && r.logger.warn(`[Profiling] Invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(e)} of type ${JSON.stringify(typeof e)}.`), false) : true === e || false === e || !(e < 0 || e > 1) || (o.DEBUG_BUILD && r.logger.warn(`[Profiling] Invalid sample rate. Sample rate must be between 0 and 1. Got ${e}.`), false);
                }
                "object" == typeof(f = m) && null !== f && "getHighEntropyValues" in f && m.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "fullVersionList"]).then(e => {
                    if (c = e.platform || "", u = e.architecture || "", p = e.model || "", l = e.platformVersion || "", e.fullVersionList && e.fullVersionList.length > 0) {
                        const t = e.fullVersionList[e.fullVersionList.length - 1];
                        d = `${t.brand} ${t.version}`;
                    }
                }).catch(e => {});
                let b = false;
                const E = new Map;;;;;;;;;;;;;;;;;
            },
            6127: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(1015),
                    s = n(800),
                    i = n(6421),
                    a = n(7670),
                    c = n(1673),
                    l = n(5196),
                    u = n(4449),
                    d = n(8968),
                    p = n(2357),
                    h = n(7558),
                    m = n(6750);

                function f(e) {
                    return [r.inboundFiltersIntegration(), r.functionToStringIntegration(), l.browserApiErrorsIntegration(), c.breadcrumbsIntegration(), u.globalHandlersIntegration(), p.linkedErrorsIntegration(), r.dedupeIntegration(), d.httpContextIntegration()];
                };;;;;;;
            },
            7558: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872);

                function o(e, t, n, o) {
                    const s = {
                        filename: e,
                        function: "<anonymous>" === t ? r.UNKNOWN_FUNCTION : t,
                        in_app: true
                    };
                    return undefined !== n && (s.lineno = n), undefined !== o && (s.colno = o), s;
                }
                const c = [30, e => {
                        const t = s.exec(e);
                        if (t) {
                            const [, e, n, s] = t;
                            return o(e, r.UNKNOWN_FUNCTION, +n, +s);
                        }
                        const n = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i.exec(e);
                        if (n) {
                            if (n[2] && 0 === n[2].indexOf("eval")) {
                                const e = /\((\S*)(?::(\d+))(?::(\d+))\)/.exec(n[2]);
                                e && (n[2] = e[1], n[3] = e[2], n[4] = e[3]);
                            }
                            const [e, t] = v(n[1] || r.UNKNOWN_FUNCTION, n[2]);
                            return o(t, e, n[3] ? +n[3] : undefined, n[4] ? +n[4] : undefined);
                        }
                    }],
                    d = [50, e => {
                        const t = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i.exec(e);
                        if (t) {
                            if (t[3] && t[3].indexOf(" > eval") > -1) {
                                const e = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i.exec(t[3]);
                                e && (t[1] = t[1] || "eval", t[3] = e[1], t[4] = e[2], t[5] = "");
                            }
                            let e = t[3],
                                n = t[1] || r.UNKNOWN_FUNCTION;
                            return [n, e] = v(n, e), o(e, n, t[4] ? +t[4] : undefined, t[5] ? +t[5] : undefined);
                        }
                    }],
                    h = [40, e => {
                        const t = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i.exec(e);
                        return t ? o(t[2], t[1] || r.UNKNOWN_FUNCTION, +t[3], t[4] ? +t[4] : undefined) : undefined;
                    }],
                    f = [10, e => {
                        const t = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i.exec(e);
                        return t ? o(t[2], t[3] || r.UNKNOWN_FUNCTION, +t[1]) : undefined;
                    }],
                    _ = [20, e => {
                        const t = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i.exec(e);
                        return t ? o(t[5], t[3] || t[4] || r.UNKNOWN_FUNCTION, +t[1], +t[2]) : undefined;
                    }],
                    y = [c, d],
                    S = r.createStackParser(...y),
                    v = (e, t) => {
                        const n = -1 !== e.indexOf("safari-extension"),
                            o = -1 !== e.indexOf("safari-web-extension");
                        return n || o ? [-1 !== e.indexOf("@") ? e.split("@")[0] : r.UNKNOWN_FUNCTION, n ? `safari-extension:${t}` : `safari-web-extension:${t}`] : [e, t];
                    };;;;;;;;;
            },
            9233: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(6421),
                    s = n(7670);;
            },
            3646: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1015),
                    o = n(7872),
                    s = n(6421),
                    i = n(7670),
                    a = n(9233),
                    c = n(7299),
                    u = {
                        ...o.TRACING_DEFAULTS,
                        instrumentNavigation: true,
                        instrumentPageLoad: true,
                        markBackgroundSpan: true,
                        enableLongTask: true,
                        enableLongAnimationFrame: true,
                        enableInp: true,
                        _experiments: {},
                        ...c.defaultRequestInstrumentationOptions
                    };

                function d(e, t, n) {
                    e.emit("startPageLoadSpan", t, n);
                    o.getCurrentScope().setTransactionName(t.name);;
                    const r = o.getActiveSpan();
                    return "pageload" === (r && o.spanToJSON(r).op) ? r : undefined;
                }

                function p(e, t) {
                    o.getIsolationScope().setPropagationContext(o.generatePropagationContext());
                    o.getCurrentScope().setPropagationContext(o.generatePropagationContext());
                    e.emit("startNavigationSpan", t);
                    o.getCurrentScope().setTransactionName(t.name);;
                    const n = o.getActiveSpan();
                    return "navigation" === (n && o.spanToJSON(n).op) ? n : undefined;
                }

                function h(e) {
                    const t = o.getDomElement(`meta[name=${e}]`);
                    return t ? t.getAttribute("content") : undefined;
                };;;;;;
            },
            7299: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1015),
                    o = n(7872),
                    s = n(7670),
                    i = new WeakMap,
                    a = new Map;

                function l(e) {
                    const {
                        url: t
                    } = o.spanToJSON(e).data || {};
                    if (!t || "string" != typeof t) {
                        return;
                    }
                    const n = r.addPerformanceInstrumentationHandler("resource", ({
                        entries: r
                    }) => {
                        r.forEach(r => {
                            (function(e) {
                                return "resource" === e.entryType && "initiatorType" in e && "string" == typeof e.nextHopProtocol && ("fetch" === e.initiatorType || "xmlhttprequest" === e.initiatorType);
                            }(r) && r.name.endsWith(t) && (function(e) {
                                const {
                                    name: t,
                                    version: n
                                } = u(e.nextHopProtocol), r = [];
                                return r.push(["network.protocol.version", n], ["network.protocol.name", t]), o.browserPerformanceTimeOrigin ? [...r, ["http.request.redirect_start", d(e.redirectStart)],
                                    ["http.request.fetch_start", d(e.fetchStart)],
                                    ["http.request.domain_lookup_start", d(e.domainLookupStart)],
                                    ["http.request.domain_lookup_end", d(e.domainLookupEnd)],
                                    ["http.request.connect_start", d(e.connectStart)],
                                    ["http.request.secure_connection_start", d(e.secureConnectionStart)],
                                    ["http.request.connection_end", d(e.connectEnd)],
                                    ["http.request.request_start", d(e.requestStart)],
                                    ["http.request.response_start", d(e.responseStart)],
                                    ["http.request.response_end", d(e.responseEnd)]
                                ] : r;
                            }(r).forEach(t => e.setAttribute(...t)), setTimeout(n)));
                        });
                    });
                }

                function u(e) {
                    let t = "unknown",
                        n = "unknown",
                        r = "";
                    for (const o of e) {
                        if ("/" === o) {
                            [t, n] = e.split("/");
                            break;
                        }
                        if (!isNaN(Number(o))) {
                            t = "h" === r ? "http" : r;
                            n = e.split(r)[1];;
                            break;
                        }
                        r += o;
                    }
                    return r === e && (t = r), {
                        name: t,
                        version: n
                    };
                }

                function d(e = 0) {
                    return ((o.browserPerformanceTimeOrigin || performance.timeOrigin) + e) / 1e3;
                }

                function p(e, t) {
                    const n = s.WINDOW.location && s.WINDOW.location.href;
                    if (n) {
                        let r, s;
                        try {
                            r = new URL(e, n);
                            s = new URL(n).origin;;
                        } catch (e) {
                            return false;
                        }
                        const i = r.origin === s;
                        return t ? o.stringMatchesSomePattern(r.toString(), t) || i && o.stringMatchesSomePattern(r.pathname, t) : i;
                    } {
                        const n = !!e.match(/^\/(?!\/)/);
                        return t ? o.stringMatchesSomePattern(e, t) : n;
                    }
                }

                function h(e, t, n, s) {
                    const i = e.xhr,
                        a = i && i[r.SENTRY_XHR_DATA_KEY];
                    if (!i || i.__sentry_own_request__ || !a) {
                        return;
                    }
                    const c = o.hasTracingEnabled() && t(a.url);
                    if (e.endTimestamp && c) {
                        const e = i.__sentry_xhr_span_id__;
                        if (!e) {
                            return;
                        }
                        const t = s[e];
                        return void(t && undefined !== a.status_code && (o.setHttpStatus(t, a.status_code), t.end(), delete s[e]));
                    }
                    const l = m(a.url),
                        u = l ? o.parseUrl(l).host : undefined,
                        d = !!o.getActiveSpan(),
                        p = c && d ? o.startInactiveSpan({
                            name: `${a.method} ${a.url}`,
                            attributes: {
                                type: "xhr",
                                "http.method": a.method,
                                "http.url": l,
                                url: a.url,
                                "server.address": u,
                                [o.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser",
                                [o.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "http.client"
                            }
                        }) : new o.SentryNonRecordingSpan;;
                    s[i.__sentry_xhr_span_id__] = p;;
                    const h = o.getClient();
                    return i.setRequestHeader && n(a.url) && h && function(e, t, n) {
                        const r = o.getCurrentScope(),
                            s = o.getIsolationScope(),
                            {
                                traceId: i,
                                spanId: a,
                                sampled: c,
                                dsc: l
                            } = {
                                ...s.getPropagationContext(),
                                ...r.getPropagationContext()
                            };
                        ! function(e, t, n) {
                            try {
                                e.setRequestHeader("sentry-trace", t);
                                n && e.setRequestHeader(o.BAGGAGE_HEADER_NAME, n);;
                            } catch (e) {}
                        }(e, n && o.hasTracingEnabled() ? o.spanToTraceHeader(n) : o.generateSentryTraceHeader(i, a, c), o.dynamicSamplingContextToSentryBaggageHeader(l || (n ? o.getDynamicSamplingContextFromSpan(n) : o.getDynamicSamplingContextFromClient(i, t))));
                    }(i, h, o.hasTracingEnabled() && d ? p : undefined), p;
                }

                function m(e) {
                    try {
                        return new URL(e, s.WINDOW.location.origin).href;
                    } catch (e) {
                        return;
                    }
                };;;;;;
            },
            6750: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1015),
                    o = n(7872);;
            },
            213: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(6750);

                function s(e) {
                    return new Promise((t, n) => {
                        e.oncomplete = e.onsuccess = () => t(e.result);
                        e.onabort = e.onerror = () => n(e.error);;
                    });
                }

                function i(e, t) {
                    const n = indexedDB.open(e);;
                    const r = s(n);
                    return e => r.then(n => e(n.transaction(t, "readwrite").objectStore(t)));
                }

                function c(e, t, n) {
                    return e(e => s(e.getAllKeys()).then(r => {
                        if (!(r.length >= n)) {
                            return e.put(t, Math.max(...r, 0) + 1), s(e.transaction);
                        }
                    }));
                }

                function l(e, t, n) {
                    return e(e => s(e.getAllKeys()).then(r => {
                        if (!(r.length >= n)) {
                            return e.put(t, Math.min(...r, 0) - 1), s(e.transaction);
                        }
                    }));
                }

                function u(e) {
                    return e(e => s(e.getAllKeys()).then(t => {
                        const n = t[0];
                        if (null != n) {
                            return s(e.get(n)).then(t => (e.delete(n), s(e.transaction).then(() => t)));
                        }
                    }));
                }

                function d(e) {
                    let t;
                    return {
                        push: async t => {
                            try {
                                const o = await r.serializeEnvelope(t);
                                await c((null == t && (t = i(e.dbName || "sentry-offline", e.storeName || "queue")), t), o, e.maxQueueSize || 30);
                            } catch (e) {}
                        },
                        unshift: async t => {
                            try {
                                const o = await r.serializeEnvelope(t);
                                await l((null == t && (t = i(e.dbName || "sentry-offline", e.storeName || "queue")), t), o, e.maxQueueSize || 30);
                            } catch (e) {}
                        },
                        shift: async () => {
                            try {
                                const e = await u((null == t && (t = i(e.dbName || "sentry-offline", e.storeName || "queue")), t));
                                if (e) {
                                    return r.parseEnvelope(e);
                                }
                            } catch (e) {}
                        }
                    };
                };;;;;;
            },
            7227: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872);;
            },
            5201: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7872),
                    o = n(7670),
                    i = o.WINDOW;;
            },
            5740: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1101),
                    o = n(2093);

                function s(e) {
                    const t = e.protocol ? `${e.protocol}:` : "",
                        n = e.port ? `:${e.port}` : "";
                    return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
                };;;
            },
            2810: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(3220),
                    o = n(5475);;;;
            },
            5475: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7320),
                    o = n(9640),
                    s = n(4478);
                n(9572);
                n(8950);
                n(3910);
                n(8587);
                n(7120);;
                const i = n(3220);
                class a {
                    constructor(e, t) {
                        let n, r;
                        n = e || new o.Scope;
                        r = t || new o.Scope;
                        this._stack = [{
                            scope: n
                        }];
                        this._isolationScope = r;;
                    }
                    withScope(e) {
                        const t = this._pushScope();
                        let n;
                        try {
                            n = e(t);
                        } catch (e) {
                            throw this._popScope(), e;
                        }
                        return s.isThenable(n) ? n.then(e => (this._popScope(), e), e => {
                            throw this._popScope(), e;
                        }) : (this._popScope(), n);
                    }
                    getClient() {
                        return this.getStackTop().client;
                    }
                    getScope() {
                        return this.getStackTop().scope;
                    }
                    getIsolationScope() {
                        return this._isolationScope;
                    }
                    getStackTop() {
                        return this._stack[this._stack.length - 1];
                    }
                    _pushScope() {
                        const e = this.getScope().clone();
                        return this._stack.push({
                            client: this.getClient(),
                            scope: e
                        }), e;
                    }
                    _popScope() {
                        return !(this._stack.length <= 1 || !this._stack.pop());
                    }
                }

                function c() {
                    const e = i.getMainCarrier(),
                        t = i.getSentryCarrier(e);
                    return t.stack = t.stack || new a(r.getDefaultCurrentScope(), r.getDefaultIsolationScope());
                }

                function u(e, t) {
                    const n = c();
                    return n.withScope(() => (n.getStackTop().scope = e, t(e)));
                };;;
            },
            7183: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(5740),
                    o = n(9564),
                    s = n(8974),
                    i = n(238),
                    a = n(2430),
                    c = n(1348),
                    l = n(3754),
                    u = n(1091),
                    d = n(1101),
                    p = n(3206),
                    h = n(8746),
                    m = n(4478),
                    f = n(3910),
                    g = n(2322),
                    _ = n(2093),
                    y = n(7120),
                    S = n(393),
                    v = n(1485);;
            },
            7990: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(3910),
                    s = n(8587);;
            },
            3220: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9572),
                    o = n(4987);

                function s(e) {
                    const t = e.__SENTRY__ = e.__SENTRY__ || {};
                    return t.version = t.version || r.SDK_VERSION, t[r.SDK_VERSION] = t[r.SDK_VERSION] || {};
                };;;
            },
            251: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1101),
                    o = n(3206),
                    s = n(2093);;
            },
            2501: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            9564: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2810),
                    o = n(3220),
                    s = n(9640),
                    i = n(4987);

                function a() {
                    const e = o.getMainCarrier();
                    return r.getAsyncContextStrategy(e).getCurrentScope();
                };;;;;;;
            },
            8974: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const n = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;;
            },
            7320: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9640),
                    o = n(4987);;;;
            },
            238: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(3754),
                    o = n(1101),
                    s = n(3206),
                    i = n(4583);;;;;
            },
            1929: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(4478),
                    s = n(3910),
                    i = n(7120);;
            },
            9183: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2501),
                    o = n(9564),
                    s = n(8974),
                    i = n(1348),
                    a = n(4478),
                    c = n(3910),
                    l = n(2322),
                    u = n(8587),
                    d = n(4987),
                    p = n(1485);

                function h(e, t) {
                    const n = o.getCurrentScope(),
                        r = o.getClient();
                    if (r) {
                        if (r.captureCheckIn) {
                            return r.captureCheckIn(e, t, n);
                        }
                        s.DEBUG_BUILD && c.logger.warn("Cannot capture check-in. Client does not support sending check-ins.");
                    } else {
                        s.DEBUG_BUILD && c.logger.warn("Cannot capture check-in. No client defined.");
                    }
                    return l.uuid4();
                }

                function m() {
                    const e = o.getIsolationScope(),
                        t = o.getCurrentScope(),
                        n = t.getSession() || e.getSession();
                    n && i.closeSession(n);
                    f();
                    e.setSession();
                    t.setSession();;
                }

                function f() {
                    const e = o.getIsolationScope(),
                        t = o.getCurrentScope(),
                        n = o.getClient(),
                        r = t.getSession() || e.getSession();
                    r && n && n.captureSession(r);
                };;;;;;;;;;;;;;;;;;;;;
            },
            6933: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(2093);;
            },
            1096: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(2751);
                n(4038);
                const s = n(4478);
                n(9572);
                n(8950);
                n(3910);
                n(8974);
                n(8587);;
                const i = n(73),
                    a = n(4583),
                    c = n(7392),
                    l = n(5363),
                    u = n(5908),
                    d = n(3754),
                    p = n(8558),
                    h = n(4890),
                    m = n(9657);

                function f(e, t, n, o, i) {
                    const c = r.getIsolationScope(),
                        {
                            traceId: l,
                            spanId: u,
                            sampled: m,
                            dsc: f
                        } = {
                            ...c.getPropagationContext(),
                            ...n.getPropagationContext()
                        },
                        _ = i ? a.spanToTraceHeader(i) : h.generateSentryTraceHeader(l, u, m),
                        y = p.dynamicSamplingContextToSentryBaggageHeader(f || (i ? d.getDynamicSamplingContextFromSpan(i) : d.getDynamicSamplingContextFromClient(l, t))),
                        S = o.headers || ("undefined" != typeof Request && s.isInstanceOf(e, Request) ? e.headers : undefined);
                    if (S) {
                        if ("undefined" != typeof Headers && s.isInstanceOf(S, Headers)) {
                            const e = new Headers(S);
                            if (e.set("sentry-trace", _), y) {
                                const t = e.get(p.BAGGAGE_HEADER_NAME);
                                if (t) {
                                    const n = t.split(",").filter(e => !t.split("=")[0].startsWith(p.SENTRY_BAGGAGE_KEY_PREFIX)).join(",");
                                    e.set(p.BAGGAGE_HEADER_NAME, n ? `${n},${y}` : y);
                                } else {
                                    e.set(p.BAGGAGE_HEADER_NAME, y);
                                }
                            }
                            return e;
                        }
                        if (Array.isArray(S)) {
                            const e = [...S.filter(e => !(Array.isArray(e) && "sentry-trace" === e[0])).map(e => {
                                if (Array.isArray(e) && e[0] === p.BAGGAGE_HEADER_NAME && "string" == typeof e[1]) {
                                    const [t, n, ...r] = e;
                                    return [t, n.split(",").filter(e => !n.split("=")[0].startsWith(p.SENTRY_BAGGAGE_KEY_PREFIX)).join(","), ...r];
                                }
                                return e;
                            }), ["sentry-trace", _]];
                            return y && e.push([p.BAGGAGE_HEADER_NAME, y]), e;
                        } {
                            const e = "baggage" in S ? S.baggage : undefined;
                            let t = [];
                            return Array.isArray(e) ? t = e.map(e => "string" == typeof e ? e.split(",").filter(e => !e.split("=")[0].startsWith(p.SENTRY_BAGGAGE_KEY_PREFIX)).join(",") : e).filter(e => "" === e) : e && t.push(e.split(",").filter(e => !e.split("=")[0].startsWith(p.SENTRY_BAGGAGE_KEY_PREFIX)).join(",")), y && t.push(y), {
                                ...S,
                                "sentry-trace": _,
                                baggage: t.length > 0 ? t.join(",") : undefined
                            };
                        }
                    }
                    return {
                        "sentry-trace": _,
                        baggage: y
                    };
                };;;
            },
            7249: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7990),
                    o = n(9564),
                    s = n(9183);

                function i() {
                    return {
                        bindClient(e) {
                            o.getCurrentScope().setClient(e);
                        },
                        withScope: o.withScope,
                        getClient: () => o.getClient(),
                        getScope: o.getCurrentScope,
                        getIsolationScope: o.getIsolationScope,
                        captureException: (e, t) => o.getCurrentScope().captureException(e, t),
                        captureMessage: (e, t, n) => o.getCurrentScope().captureMessage(e, t, n),
                        captureEvent: s.captureEvent,
                        addBreadcrumb: r.addBreadcrumb,
                        setUser: s.setUser,
                        setTags: s.setTags,
                        setTag: s.setTag,
                        setExtra: s.setExtra,
                        setExtras: s.setExtras,
                        setContext: s.setContext,
                        getIntegration(e) {
                            const t = o.getClient();
                            return t && t.getIntegrationByName(e.id) || null;
                        },
                        startSession: s.startSession,
                        endSession: s.endSession,
                        captureSession(e) {
                            if (e) {
                                return s.endSession();
                            }! function() {
                                const e = o.getCurrentScope(),
                                    t = o.getClient(),
                                    n = e.getSession();
                                t && n && t.captureSession(n);
                            }();
                        }
                    };
                }
                const a = i;;;;
            },
            7872: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4038),
                    o = n(4284),
                    s = n(2188),
                    i = n(7011),
                    a = n(242),
                    c = n(7392),
                    l = n(5363),
                    u = n(5908),
                    d = n(3754),
                    p = n(8945),
                    h = n(9816),
                    m = n(8346),
                    f = n(2751),
                    g = n(238),
                    _ = n(9183),
                    y = n(9564),
                    S = n(7320),
                    v = n(2810),
                    b = n(3220),
                    E = n(1348),
                    T = n(4751),
                    I = n(9640),
                    C = n(1929),
                    w = n(5740),
                    k = n(7183),
                    A = n(4842),
                    M = n(7008),
                    x = n(4450),
                    O = n(2256),
                    R = n(4082),
                    D = n(2430),
                    N = n(5013),
                    P = n(1485),
                    L = n(251),
                    U = n(73),
                    B = n(6877),
                    F = n(6354),
                    H = n(2979),
                    j = n(4583),
                    W = n(393),
                    G = n(5303),
                    $ = n(647),
                    z = n(145),
                    q = n(2501),
                    Y = n(7990),
                    V = n(8360),
                    J = n(6492),
                    K = n(2958),
                    X = n(2213),
                    Z = n(2215),
                    Q = n(5003),
                    ee = n(9097),
                    te = n(431),
                    ne = n(1312),
                    re = n(7536),
                    oe = n(200),
                    se = n(4208),
                    ie = n(699),
                    ae = n(2177),
                    ce = n(3090),
                    le = n(9133),
                    ue = n(2094),
                    de = n(4021),
                    pe = n(1096),
                    he = n(6033),
                    me = n(6933),
                    fe = n(7249),
                    ge = n(8891),
                    _e = n(4558),
                    ye = n(1647),
                    Se = n(1268),
                    ve = n(1101),
                    be = n(8746),
                    Ee = n(4987),
                    Te = n(3765),
                    Ie = n(8096),
                    Ce = n(5495),
                    we = n(2023),
                    ke = n(8983),
                    Ae = n(4478),
                    Me = n(8612),
                    xe = n(3910),
                    Oe = n(4880),
                    Re = n(2322),
                    De = n(6566),
                    Ne = n(6507),
                    Pe = n(2093),
                    Le = n(6785),
                    Ue = n(5467),
                    Be = n(789),
                    Fe = n(3389),
                    He = n(8051),
                    je = n(6835),
                    We = n(3591),
                    Ge = n(1002),
                    $e = n(7120),
                    ze = n(8587),
                    qe = n(4890),
                    Ye = n(9827),
                    Ve = n(3206),
                    Je = n(1091),
                    Ke = n(5469),
                    Xe = n(8558),
                    Ze = n(9657),
                    Qe = n(2302),
                    et = n(3185),
                    tt = n(1771),
                    nt = n(7501),
                    rt = n(367),
                    ot = n(306),
                    st = n(9572),
                    it = n(4008),
                    at = n(2123),
                    ct = n(3423),
                    lt = n(7060),
                    ut = n(1357),
                    dt = n(1622),
                    pt = n(4834),
                    ht = n(9015),
                    mt = n(7816);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                Object.defineProperty(t, "_browserPerformanceTimeOriginMode", {
                    enumerable: true,
                    get: () => ze._browserPerformanceTimeOriginMode
                });;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            },
            2430: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(8974),
                    s = n(3910),
                    i = [];

                function a(e, t, n) {
                    if (n[t.name]) {
                        o.DEBUG_BUILD && s.logger.log(`Integration skipped because it was already installed: ${t.name}`);
                    } else {
                        if (n[t.name] = t, -1 === i.indexOf(t.name) && "function" == typeof t.setupOnce && (t.setupOnce(), i.push(t.name)), t.setup && "function" == typeof t.setup && t.setup(e), "function" == typeof t.preprocessEvent) {
                            const n = t.preprocessEvent.bind(t);
                            e.on("preprocessEvent", (t, r) => n(t, r, e));
                        }
                        if ("function" == typeof t.processEvent) {
                            const n = t.processEvent.bind(t),
                                r = Object.assign((t, r) => n(t, r, e), {
                                    id: t.name
                                });
                            e.addEventProcessor(r);
                        }
                        o.DEBUG_BUILD && s.logger.log(`Integration installed: ${t.name}`);
                    }
                };;;;;;;;
            },
            5003: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(9183),
                    s = n(2430),
                    i = n(3765),
                    a = n(3910),
                    c = n(2322),
                    l = n(3389),
                    u = n(3591),
                    d = n(4987),
                    p = s.defineIntegration((e = {}) => {
                        const t = e.levels || a.CONSOLE_LEVELS;
                        return {
                            name: "CaptureConsole",
                            setup(e) {
                                "console" in d.GLOBAL_OBJ && i.addConsoleInstrumentationHandler(({
                                    args: n,
                                    level: s
                                }) => {
                                    r.getClient() === e && t.includes(s) && function(e, t) {
                                        const n = {
                                            level: l.severityLevelFromString(t),
                                            extra: {
                                                arguments: e
                                            }
                                        };
                                        r.withScope(r => {
                                            if (r.addEventProcessor(e => (e.logger = "console", c.addExceptionMechanism(e, {
                                                    handled: false,
                                                    type: "console"
                                                }), e)), "assert" === t) {
                                                if (!e[0]) {
                                                    const t = `Assertion failed: ${u.safeJoin(e.slice(1), " ") || "console.assert"}`;
                                                    r.setExtra("arguments", e.slice(1));
                                                    o.captureMessage(t, n);;
                                                }
                                                return;
                                            }
                                            const s = e.find(e => e instanceof Error);
                                            if (s) {
                                                return void o.captureException(s, n);
                                            }
                                            const i = u.safeJoin(e, " ");
                                            o.captureMessage(i, n);
                                        });
                                    }(n, s);
                                });
                            }
                        };
                    });;
            },
            9097: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(3910),
                    s = r.defineIntegration((e = {}) => {
                        const t = {
                            debugger: false,
                            stringify: false,
                            ...e
                        };
                        return {
                            name: "Debug",
                            setup(e) {
                                e.on("beforeSendEvent", (e, n) => {
                                    t.debugger;
                                    o.consoleSandbox(() => {
                                        t.stringify ? (console.log(JSON.stringify(e, null, 2)), n && Object.keys(n).length && console.log(JSON.stringify(n, null, 2))) : (console.log(e), n && Object.keys(n).length && console.log(n));
                                    });;
                                });
                            }
                        };
                    });;
            },
            431: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(8974),
                    s = n(3910),
                    i = n(8051),
                    a = r.defineIntegration(() => {
                        let e;
                        return {
                            name: "Dedupe",
                            processEvent(t) {
                                if (t.type) {
                                    return t;
                                }
                                try {
                                    if (c(t, e)) {
                                        return o.DEBUG_BUILD && s.logger.warn("Event dropped due to being a duplicate of previously captured event."), null;
                                    }
                                } catch (e) {}
                                return e = t;
                            }
                        };
                    });

                function c(e, t) {
                    return !(!t || ! function(e, t) {
                        const n = e.message,
                            r = t.message;
                        return !(!n && !r) && (!(n && !r || !n && r) && (n === r && (!!u(e, t) && !!l(e, t))));
                    }(e, t) && ! function(e, t) {
                        const n = t.exception && t.exception.values && t.exception.values[0],
                            r = e.exception && e.exception.values && e.exception.values[0];
                        return !(!n || !r) && (n.type === r.type && n.value === r.value && (!!u(e, t) && !!l(e, t)));
                    }(e, t));
                }

                function l(e, t) {
                    let n = i.getFramesFromEvent(e),
                        r = i.getFramesFromEvent(t);
                    if (!n && !r) {
                        return true;
                    }
                    if (n && !r || !n && r) {
                        return false;
                    }
                    if (r.length !== n.length) {
                        return false;
                    }
                    for (let e = 0; e < r.length; e++) {
                        const t = r[e],
                            o = n[e];
                        if (t.filename !== o.filename || t.lineno !== o.lineno || t.colno !== o.colno || t.function !== o.function) {
                            return false;
                        }
                    }
                    return true;
                }

                function u(e, t) {
                    let n = e.fingerprint,
                        r = t.fingerprint;
                    if (!n && !r) {
                        return true;
                    }
                    if (n && !r || !n && r) {
                        return false;
                    }
                    try {
                        return !(n.join("") !== r.join(""));
                    } catch (e) {
                        return false;
                    }
                };;;
            },
            1312: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(8974),
                    s = n(4478),
                    i = n(3910),
                    a = n(6507),
                    c = n(2093),
                    l = n(3591),
                    u = r.defineIntegration((e = {}) => {
                        const {
                            depth: t = 3,
                            captureErrorCause: n = true
                        } = e;
                        return {
                            name: "ExtraErrorData",
                            processEvent(e, r, u) {
                                const {
                                    maxValueLength: d = 250
                                } = u.getOptions();
                                return function(e, t = {}, n, r, u) {
                                    if (!t.originalException || !s.isError(t.originalException)) {
                                        return e;
                                    }
                                    const d = t.originalException.name || t.originalException.constructor.name,
                                        p = function(e, t, n) {
                                            try {
                                                const r = ["name", "message", "stack", "line", "column", "fileName", "lineNumber", "columnNumber", "toJSON"],
                                                    o = {
                                                        t: s.isError(i) || "string" == typeof i ? l.truncate(`${i}`, n) : i,
                                                        e: s.isError(n) ? n.toString() : n
                                                    };
                                                for (const t of Object.keys(e)) {
                                                    if (-1 !== r.indexOf(t)) {
                                                        continue;
                                                    }
                                                    const i = e[t];;
                                                }
                                                if (t && undefined !== e.cause && (o.cause = s.isError(e.cause) ? e.cause.toString() : e.cause), "function" == typeof e.toJSON) {
                                                    const t = e.toJSON();
                                                    for (const e of Object.keys(t)) {
                                                        const n = t[e];;
                                                    }
                                                }
                                                return o;
                                            } catch (e) {
                                                o.DEBUG_BUILD && i.logger.error("Unable to extract extra data from the Error object:", e);
                                            }
                                            return null;
                                        }(t.originalException, r, u);
                                    if (p) {
                                        const t = {
                                                ...e.contexts
                                            },
                                            r = a.normalize(p, n);
                                        return s.isPlainObject(r) && (c.addNonEnumerableProperty(r, "__sentry_skip_normalization__", true), t[d] = r), {
                                            ...e,
                                            contexts: t
                                        };
                                    }
                                    return e;
                                }(e, r, t, n, d);
                            }
                        };
                    });;
            },
            8360: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(2430),
                    s = n(2093);
                let i;
                const a = new WeakMap,
                    c = o.defineIntegration(() => ({
                        name: "FunctionToString",
                        setupOnce() {
                            i = Function.prototype.toString;
                            try {
                                Function.prototype.toString = function(...e) {
                                    const t = s.getOriginalFunction(this),
                                        n = a.has(r.getClient()) && undefined !== t ? t : this;
                                    return i.apply(n, e);
                                };
                            } catch (e) {}
                        },
                        setup(e) {
                            a.set(e, true);
                        }
                    }));;
            },
            6492: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(2430),
                    s = n(3910),
                    i = n(2322),
                    a = n(3591),
                    c = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/, /^ResizeObserver loop completed with undelivered notifications.$/, /^Cannot redefine property: googletag$/, "undefined is not an object (evaluating 'a.L')", 'can\'t redefine non-configurable property "solana"', "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)", "Can't find variable: _AutofillCallbackHandler"],
                    l = o.defineIntegration((e = {}) => ({
                        name: "InboundFilters",
                        processEvent(t, n, o) {
                            const l = o.getOptions(),
                                d = function(e = {}, t = {}) {
                                    return {
                                        allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
                                        denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
                                        ignoreErrors: [...e.ignoreErrors || [], ...t.ignoreErrors || [], ...e.disableErrorDefaults ? [] : c],
                                        ignoreTransactions: [...e.ignoreTransactions || [], ...t.ignoreTransactions || []],
                                        ignoreInternal: undefined === e.ignoreInternal || e.ignoreInternal
                                    };
                                }(e, l);
                            return function(e, t) {
                                return t.ignoreInternal && function(e) {
                                    try {
                                        return "SentryError" === e.exception.values[0].type;
                                    } catch (e) {}
                                    return false;
                                }(e) ? (r.DEBUG_BUILD && s.logger.warn(`Event dropped due to being internal Sentry Error.\nEvent: ${i.getEventDescription(e)}`), true) : function(e, t) {
                                    return !(e.type || !t || !t.length) && function(e) {
                                        const t = [];
                                        let n;
                                        e.message && t.push(e.message);
                                        try {
                                            n = e.exception.values[e.exception.values.length - 1];
                                        } catch (e) {}
                                        return n && n.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`)), t;
                                    }(e).some(e => a.stringMatchesSomePattern(e, t));
                                }(e, t.ignoreErrors) ? (r.DEBUG_BUILD && s.logger.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${i.getEventDescription(e)}`), true) : function(e) {
                                    return !e.type && (!(!e.exception || !e.exception.values || 0 === e.exception.values.length) && (!e.message && !e.exception.values.some(e => e.stacktrace || e.type && "Error" !== e.type || e.value)));
                                }(e) ? (r.DEBUG_BUILD && s.logger.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${i.getEventDescription(e)}`), true) : function(e, t) {
                                    if ("transaction" !== e.type || !t || !t.length) {
                                        return false;
                                    }
                                    const n = e.transaction;
                                    return !!n && a.stringMatchesSomePattern(n, t);
                                }(e, t.ignoreTransactions) ? (r.DEBUG_BUILD && s.logger.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${i.getEventDescription(e)}`), true) : function(e, t) {
                                    if (!t || !t.length) {
                                        return false;
                                    }
                                    const n = u(e);
                                    return !!n && a.stringMatchesSomePattern(n, t);
                                }(e, t.denyUrls) ? (r.DEBUG_BUILD && s.logger.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${i.getEventDescription(e)}.\nUrl: ${u(e)}`), true) : ! function(e, t) {
                                    if (!t || !t.length) {
                                        return true;
                                    }
                                    const n = u(e);
                                    return !n || a.stringMatchesSomePattern(n, t);
                                }(e, t.allowUrls) && (r.DEBUG_BUILD && s.logger.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${i.getEventDescription(e)}.\nUrl: ${u(e)}`), true);
                            }(t, d) ? null : t;
                        }
                    }));

                function u(e) {
                    try {
                        let t;
                        try {
                            t = e.exception.values[0].stacktrace.frames;
                        } catch (e) {}
                        return t ? function(e = []) {
                            for (let t = e.length - 1; t >= 0; t--) {
                                const n = e[t];
                                if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename) {
                                    return n.filename || null;
                                }
                            }
                            return null;
                        }(t) : null;
                    } catch (t) {
                        return r.DEBUG_BUILD && s.logger.error(`Cannot extract url for event ${i.getEventDescription(e)}`), null;
                    }
                };
            },
            2958: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(8891),
                    s = n(3185),
                    i = r.defineIntegration((e = {}) => {
                        const t = e.limit || 5,
                            n = e.key || "cause";
                        return {
                            name: "LinkedErrors",
                            preprocessEvent(e, r, i) {
                                const a = i.getOptions();
                                o.applyAggregateErrorsToEvent(s.exceptionFromError, a.stackParser, a.maxValueLength, n, t, e, r);
                            }
                        };
                    });;
            },
            2213: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(6823),
                    s = n(3206),
                    i = r.defineIntegration(() => ({
                        name: "ModuleMetadata",
                        setup(e) {
                            e.on("beforeEnvelope", e => {
                                s.forEachEnvelopeItem(e, (e, t) => {
                                    if ("event" === t) {
                                        const t = Array.isArray(e) ? e[1] : undefined;
                                        t && (o.stripMetadataFromStackFrames(t), e[1] = t);
                                    }
                                });
                            });
                            e.on("applyFrameMetadata", t => {
                                if (t.type) {
                                    return;
                                }
                                const n = e.getOptions().stackParser;
                                o.addMetadataToStackFrames(n, t);
                            });;
                        }
                    }));;
            },
            2215: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(789),
                    s = {
                        include: {
                            cookies: true,
                            data: true,
                            headers: true,
                            ip: false,
                            query_string: true,
                            url: true,
                            user: {
                                id: true,
                                username: true,
                                email: true
                            }
                        },
                        transactionNamingScheme: "methodPath"
                    },
                    i = r.defineIntegration((e = {}) => {
                        const t = {
                            ...s,
                            ...e,
                            include: {
                                ...s.include,
                                ...e.include,
                                user: e.include && "boolean" == typeof e.include.user ? e.include.user : {
                                    ...s.include.user,
                                    ...(e.include || {}).user
                                }
                            }
                        };
                        return {
                            name: "RequestData",
                            processEvent(e) {
                                const {
                                    sdkProcessingMetadata: n = {}
                                } = e, {
                                    request: r,
                                    normalizedRequest: s
                                } = n, i = function(e) {
                                    const {
                                        transactionNamingScheme: t,
                                        include: {
                                            ip: n,
                                            user: r,
                                            ...o
                                        }
                                    } = e, s = ["method"];
                                    for (const [e, t] of Object.entries(o)) t && s.push(e);
                                    let i;
                                    if (undefined === r) {
                                        i = true;
                                    } else {
                                        if ("boolean" == typeof r) {
                                            i = r;
                                        } else {
                                            const e = [];
                                            for (const [t, n] of Object.entries(r)) n && e.push(t);
                                            i = e;
                                        }
                                    }
                                    return {
                                        include: {
                                            ip: n,
                                            user: i,
                                            request: 0 !== s.length ? s : undefined,
                                            transaction: t
                                        }
                                    };
                                }(t);
                                if (s) {
                                    const t = r ? r.ip || r.socket && r.socket.remoteAddress : undefined,
                                        n = r ? r.user : undefined;
                                    return o.addNormalizedRequestDataToEvent(e, s, {
                                        ipAddress: t,
                                        user: n
                                    }, i), e;
                                }
                                return r ? o.addRequestDataToEvent(e, r, i) : e;
                            }
                        };
                    });;
            },
            7536: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(6785),
                    s = n(4987),
                    i = r.defineIntegration((e = {}) => {
                        const t = e.root,
                            n = e.prefix || "app:///",
                            r = "window" in s.GLOBAL_OBJ && undefined !== s.GLOBAL_OBJ.window,
                            o = e.iteratee || a({
                                isBrowser: r,
                                root: t,
                                prefix: n
                            });
                        return {
                            name: "RewriteFrames",
                            processEvent(e) {
                                let t = e;
                                return e.exception && Array.isArray(e.exception.values) && (t = function(e) {
                                    try {
                                        return {
                                            ...e,
                                            exception: {
                                                ...e.exception,
                                                values: e.exception.values.map(e => {
                                                    return {
                                                        ...e,
                                                        ...e.stacktrace && {
                                                            stacktrace: (t = e.stacktrace, {
                                                                ...t,
                                                                frames: t && t.frames && t.frames.map(e => o(e))
                                                            })
                                                        }
                                                    };
                                                    var t;
                                                })
                                            }
                                        };
                                    } catch (t) {
                                        return e;
                                    }
                                }(t)), t;
                            }
                        };
                    });

                function a({
                    isBrowser: e,
                    root: t,
                    prefix: n
                }) {
                    return r => {
                        if (!r.filename) {
                            return r;
                        }
                        const s = /^[a-zA-Z]:\\/.test(r.filename) || r.filename.includes("\\") && !r.filename.includes("/"),
                            i = /^\//.test(r.filename);
                        if (e) {
                            if (t) {
                                const e = r.filename;
                                0 === e.indexOf(t) && (r.filename = e.replace(t, n));
                            }
                        } else {
                            if (s || i) {
                                const e = s ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : r.filename,
                                    i = t ? o.relative(t, e) : o.basename(e);;
                            }
                        }
                        return r;
                    };
                };;;
            },
            200: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(8587),
                    s = r.defineIntegration(() => {
                        const e = 1e3 * o.timestampInSeconds();
                        return {
                            name: "SessionTiming",
                            processEvent(t) {
                                const n = 1e3 * o.timestampInSeconds();
                                return {
                                    ...t,
                                    extra: {
                                        ...t.extra,
                                        "session:start": e,
                                        "session:duration": n - e,
                                        "session:end": n
                                    }
                                };
                            }
                        };
                    });;
            },
            699: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(6823),
                    s = n(3206),
                    i = n(8051),
                    a = r.defineIntegration(e => ({
                        name: "ThirdPartyErrorsFilter",
                        setup(e) {
                            e.on("beforeEnvelope", e => {
                                s.forEachEnvelopeItem(e, (e, t) => {
                                    if ("event" === t) {
                                        const t = Array.isArray(e) ? e[1] : undefined;
                                        t && (o.stripMetadataFromStackFrames(t), e[1] = t);
                                    }
                                });
                            });
                            e.on("applyFrameMetadata", t => {
                                if (t.type) {
                                    return;
                                }
                                const n = e.getOptions().stackParser;
                                o.addMetadataToStackFrames(n, t);
                            });;
                        },
                        processEvent(t) {
                            const n = function(e) {
                                const t = i.getFramesFromEvent(e);
                                if (t) {
                                    return t.filter(e => !!e.filename).map(e => e.module_metadata ? Object.keys(e.module_metadata).filter(e => e.startsWith("_sentryBundlerPluginAppKey:")).map(e => e.slice("_sentryBundlerPluginAppKey:".length)) : []);
                                }
                            }(t);
                            if (n && n["drop-error-if-contains-third-party-frames" === e.behaviour || "apply-tag-if-contains-third-party-frames" === e.behaviour ? "some" : "every"](t => !t.some(t => e.filterKeys.includes(t)))) {
                                if ("drop-error-if-contains-third-party-frames" === e.behaviour || "drop-error-if-exclusively-contains-third-party-frames" === e.behaviour) {
                                    return null;
                                };
                            }
                            return t;
                        }
                    }));;
            },
            4208: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2430),
                    o = n(4478),
                    s = n(3591);

                function i(e) {
                    return {
                        ...e,
                        path: "path" in e && Array.isArray(e.path) ? e.path.join(".") : undefined,
                        keys: "keys" in e ? JSON.stringify(e.keys) : undefined,
                        unionErrors: "unionErrors" in e ? JSON.stringify(e.unionErrors) : undefined
                    };
                }

                function a(e) {
                    const t = new Set;
                    for (const n of e.issues) n.path && n.path[0] && t.add(n.path[0]);
                    const n = Array.from(t);
                    return `Failed to validate keys: ${s.truncate(n.join(", "), 100)}`;
                }

                function c(e, t, n) {
                    return t.exception && t.exception.values && n && n.originalException && (r = n.originalException, o.isError(r) && "ZodError" === r.name && Array.isArray(r.errors)) && 0 !== n.originalException.issues.length ? {
                        ...t,
                        exception: {
                            ...t.exception,
                            values: [{
                                ...t.exception.values[0],
                                value: a(n.originalException)
                            }, ...t.exception.values.slice(1)]
                        },
                        extra: {
                            ...t.extra,
                            "zoderror.issues": n.originalException.errors.slice(0, e).map(i)
                        }
                    } : t;
                    var r;
                }
                const l = r.defineIntegration((e = {}) => {
                    const t = e.limit || 10;
                    return {
                        name: "ZodErrors",
                        processEvent: (e, n) => c(t, e, n)
                    };
                });;;;
            },
            6823: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4987),
                    o = new Map,
                    s = new Set;

                function i(e, t) {
                    return function(e) {
                        if (r.GLOBAL_OBJ._sentryModuleMetadata) {
                            for (const t of Object.keys(r.GLOBAL_OBJ._sentryModuleMetadata)) {
                                const n = r.GLOBAL_OBJ._sentryModuleMetadata[t];
                                if (s.has(t)) {
                                    continue;
                                }
                                s.add(t);
                                const i = e(t);
                                for (const e of i.reverse())
                                    if (e.filename) {
                                        o.set(e.filename, n);
                                        break;
                                    }
                            }
                        }
                    }(e), o.get(t);
                };;;;
            },
            885: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8587),
                    o = n(4583),
                    s = n(9371),
                    i = n(8844),
                    a = n(8423),
                    c = n(3227);;
            },
            2094: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8587),
                    o = n(4583),
                    s = n(9371),
                    i = n(8844),
                    a = n(8423),
                    c = n(3227);;
            },
            9371: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;;;;;;;
            },
            8844: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1101),
                    o = n(3206),
                    s = n(3910),
                    i = n(3227);

                function a(e, t, n, s) {
                    const a = {
                        sent_at: (new Date).toISOString()
                    };
                    n && n.sdk && (a.sdk = {
                        name: n.sdk.name,
                        version: n.sdk.version
                    });
                    s && t && (a.dsn = r.dsnToString(t));;
                    const c = function(e) {
                        const t = i.serializeMetricBuckets(e);
                        return [{
                            type: "statsd",
                            length: t.length
                        }, t];
                    }(e);
                    return o.createEnvelope(a, [c]);
                };;;
            },
            9133: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(885),
                    o = n(2177),
                    s = {
                        increment: function(e, t = 1, n) {
                            o.metrics.increment(r.MetricsAggregator, e, t, n);
                        },
                        distribution: function(e, t, n) {
                            o.metrics.distribution(r.MetricsAggregator, e, t, n);
                        },
                        set: function(e, t, n) {
                            o.metrics.set(r.MetricsAggregator, e, t, n);
                        },
                        gauge: function(e, t, n) {
                            o.metrics.gauge(r.MetricsAggregator, e, t, n);
                        },
                        timing: function(e, t, n = "second", s) {
                            return o.metrics.timing(r.MetricsAggregator, e, t, n, s);
                        },
                        getMetricsAggregatorForClient: function(e) {
                            return o.metrics.getMetricsAggregatorForClient(e, r.MetricsAggregator);
                        }
                    };;
            },
            2177: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(8974);
                n(4038);
                const s = n(4987);
                n(8950);
                const i = n(3910),
                    a = n(8587),
                    c = n(4583),
                    l = n(5908),
                    u = n(6354),
                    d = n(9371);

                function p(e, t) {
                    const n = s.getGlobalSingleton("globalMetricsAggregators", () => new WeakMap),
                        r = n.get(e);
                    if (r) {
                        return r;
                    }
                    const o = new t(e);
                    return e.on("flush", () => o.flush()), e.on("close", () => o.close()), n.set(e, o), o;
                }

                function h(e, t, n, s, a = {}) {
                    const l = a.client || r.getClient();
                    if (!l) {
                        return;
                    }
                    const u = c.getActiveSpan(),
                        d = u ? c.getRootSpan(u) : undefined,
                        h = d && c.spanToJSON(d).description,
                        {
                            unit: m,
                            tags: f,
                            timestamp: g
                        } = a,
                        {
                            release: _,
                            environment: y
                        } = l.getOptions(),
                        S = {};
                    _ && (S.release = _);
                    y && (S.environment = y);
                    h && (S.transaction = h);
                    o.DEBUG_BUILD && i.logger.log(`Adding value of ${s} to ${t} metric ${n}`);
                    p(l, e).add(t, n, s, m, {
                        ...S,
                        ...f
                    }, g);;
                }

                function m(e, t, n, r) {
                    h(e, d.DISTRIBUTION_METRIC_TYPE, t, g(n), r);
                }
                const f = {
                    increment: function(e, t, n = 1, r) {
                        h(e, d.COUNTER_METRIC_TYPE, t, g(n), r);
                    },
                    distribution: m,
                    set: function(e, t, n, r) {
                        h(e, d.SET_METRIC_TYPE, t, n, r);
                    },
                    gauge: function(e, t, n, r) {
                        h(e, d.GAUGE_METRIC_TYPE, t, g(n), r);
                    },
                    timing: function(e, t, n, r = "second", o) {
                        if ("function" == typeof n) {
                            const r = a.timestampInSeconds();
                            return l.startSpanManual({
                                op: "metrics.timing",
                                name: t,
                                startTime: r,
                                onlyIfParent: true
                            }, s => u.handleCallbackErrors(() => n(), () => {}, () => {
                                const n = a.timestampInSeconds();
                                m(e, t, n - r, {
                                    ...o,
                                    unit: "second"
                                });
                                s.end(n);;
                            }));
                        }
                        m(e, t, n, {
                            ...o,
                            unit: r
                        });
                    },
                    getMetricsAggregatorForClient: p
                };

                function g(e) {
                    return "string" == typeof e ? parseInt(e) : e;
                };
            },
            8423: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9371),
                    o = n(3227);
                class s {
                    constructor(e) {
                        this._value = e;
                    }
                    get weight() {
                        return 1;
                    }
                    add(e) {
                        this._value += e;
                    }
                    toString() {
                        return `${this._value}`;
                    }
                }
                class i {
                    constructor(e) {
                        this._last = e;
                        this._min = e;
                        this._max = e;
                        this._sum = e;
                        this._count = 1;;
                    }
                    get weight() {
                        return 5;
                    }
                    add(e) {
                        this._last = e;
                        e < this._min && (this._min = e);
                        e > this._max && (this._max = e);
                        this._sum += e;
                        this._count++;;
                    }
                    toString() {
                        return `${this._last}:${this._min}:${this._max}:${this._sum}:${this._count}`;
                    }
                }
                class a {
                    constructor(e) {
                        this._value = [e];
                    }
                    get weight() {
                        return this._value.length;
                    }
                    add(e) {
                        this._value.push(e);
                    }
                    toString() {
                        return this._value.join(":");
                    }
                }
                class c {
                    constructor(e) {
                        this.first = e;
                        this._value = new Set([e]);;
                    }
                    get weight() {
                        return this._value.size;
                    }
                    add(e) {
                        this._value.add(e);
                    }
                    toString() {
                        return Array.from(this._value).map(e => "string" == typeof e ? o.simpleHash(e) : e).join(":");
                    }
                }
                const l = {
                    [r.COUNTER_METRIC_TYPE]: s,
                    [r.GAUGE_METRIC_TYPE]: i,
                    [r.DISTRIBUTION_METRIC_TYPE]: a,
                    [r.SET_METRIC_TYPE]: c
                };;;;;;;
            },
            4021: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2093);;;;
            },
            3227: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2093);
                const s = [
                    ["\n", "\\n"],
                    ["\r", "\\r"],
                    ["	", "\\t"],
                    ["\\", "\\\\"],
                    ["|", "\\u{7c}"],
                    [",", "\\u{2c}"]
                ];;;;;;;;
            },
            3090: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(8974),
                    s = n(3910);
                const a = {
                    startProfiler: function() {
                        const e = r.getClient();
                        if (!e) {
                            return void(o.DEBUG_BUILD && s.logger.warn("No Sentry client available, profiling is not started"));
                        }
                        const t = e.getIntegrationByName("ProfilingIntegration");
                        t ? !!t && undefined !== t._profiler && "function" == typeof t._profiler.start && "function" == typeof t._profiler.stop ? t._profiler.start() : o.DEBUG_BUILD && s.logger.warn("Profiler is not available on profiling integration.") : o.DEBUG_BUILD && s.logger.warn("ProfilingIntegration is not available");
                    },
                    stopProfiler: function() {
                        const e = r.getClient();
                        if (!e) {
                            return void(o.DEBUG_BUILD && s.logger.warn("No Sentry client available, profiling is not started"));
                        }
                        const t = e.getIntegrationByName("ProfilingIntegration");
                        t ? !!t && undefined !== t._profiler && "function" == typeof t._profiler.start && "function" == typeof t._profiler.stop ? t._profiler.stop() : o.DEBUG_BUILD && s.logger.warn("Profiler is not available on profiling integration.") : o.DEBUG_BUILD && s.logger.warn("ProfilingIntegration is not available");
                    }
                };;
            },
            9640: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1348),
                    o = n(4478),
                    s = n(3910),
                    i = n(2322),
                    a = n(367),
                    c = n(8587),
                    l = n(9090),
                    u = n(4865);
                class d {
                    constructor() {
                        this._notifyingListeners = false;
                        this._scopeListeners = [];
                        this._eventProcessors = [];
                        this._breadcrumbs = [];
                        this._attachments = [];
                        this._user = {};
                        this._tags = {};
                        this._extra = {};
                        this._contexts = {};
                        this._sdkProcessingMetadata = {};
                        this._propagationContext = a.generatePropagationContext();;
                    }
                    clone() {
                        const e = new d;
                        return e._breadcrumbs = [...this._breadcrumbs], e._tags = {
                            ...this._tags
                        }, e._extra = {
                            ...this._extra
                        }, e._contexts = {
                            ...this._contexts
                        }, e._user = this._user, e._level = this._level, e._session = this._session, e._transactionName = this._transactionName, e._fingerprint = this._fingerprint, e._eventProcessors = [...this._eventProcessors], e._requestSession = this._requestSession, e._attachments = [...this._attachments], e._sdkProcessingMetadata = {
                            ...this._sdkProcessingMetadata
                        }, e._propagationContext = {
                            ...this._propagationContext
                        }, e._client = this._client, e._lastEventId = this._lastEventId, u._setSpanForScope(e, u._getSpanForScope(this)), e;
                    }
                    setClient(e) {
                        this._client = e;
                    }
                    setLastEventId(e) {
                        this._lastEventId = e;
                    }
                    getClient() {
                        return this._client;
                    }
                    lastEventId() {
                        return this._lastEventId;
                    }
                    addScopeListener(e) {
                        this._scopeListeners.push(e);
                    }
                    addEventProcessor(e) {
                        return this._eventProcessors.push(e), this;
                    }
                    setUser(e) {
                        return this._user = e || {
                            email: undefined,
                            id: undefined,
                            ip_address: undefined,
                            username: undefined
                        }, this._session && r.updateSession(this._session, {
                            user: e
                        }), this._notifyScopeListeners(), this;
                    }
                    getUser() {
                        return this._user;
                    }
                    getRequestSession() {
                        return this._requestSession;
                    }
                    setRequestSession(e) {
                        return this._requestSession = e, this;
                    }
                    setTags(e) {
                        return this._tags = {
                            ...this._tags,
                            ...e
                        }, this._notifyScopeListeners(), this;
                    }
                    setTag(e, t) {
                        return this._tags = {
                            ...this._tags,
                            [e]: t
                        }, this._notifyScopeListeners(), this;
                    }
                    setExtras(e) {
                        return this._extra = {
                            ...this._extra,
                            ...e
                        }, this._notifyScopeListeners(), this;
                    }
                    setExtra(e, t) {
                        return this._extra = {
                            ...this._extra,
                            [e]: t
                        }, this._notifyScopeListeners(), this;
                    }
                    setFingerprint(e) {
                        return this._fingerprint = e, this._notifyScopeListeners(), this;
                    }
                    setLevel(e) {
                        return this._level = e, this._notifyScopeListeners(), this;
                    }
                    setTransactionName(e) {
                        return this._transactionName = e, this._notifyScopeListeners(), this;
                    }
                    setContext(e, t) {
                        return null === t ? delete this._contexts[e] : this._contexts[e] = t, this._notifyScopeListeners(), this;
                    }
                    setSession(e) {
                        return e ? this._session = e : delete this._session, this._notifyScopeListeners(), this;
                    }
                    getSession() {
                        return this._session;
                    }
                    update(e) {
                        if (!e) {
                            return this;
                        }
                        const t = "function" == typeof e ? e(this) : e,
                            [n, r] = t instanceof p ? [t.getScopeData(), t.getRequestSession()] : o.isPlainObject(t) ? [e, e.requestSession] : [],
                            {
                                tags: s,
                                extra: i,
                                user: a,
                                contexts: c,
                                level: l,
                                fingerprint: u = [],
                                propagationContext: d
                            } = n || {};
                        return this._tags = {
                            ...this._tags,
                            ...s
                        }, this._extra = {
                            ...this._extra,
                            ...i
                        }, this._contexts = {
                            ...this._contexts,
                            ...c
                        }, a && Object.keys(a).length && (this._user = a), l && (this._level = l), u.length && (this._fingerprint = u), d && (this._propagationContext = d), r && (this._requestSession = r), this;
                    }
                    clear() {
                        return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = undefined, this._transactionName = undefined, this._fingerprint = undefined, this._requestSession = undefined, this._session = undefined, u._setSpanForScope(this, undefined), this._attachments = [], this._propagationContext = a.generatePropagationContext(), this._notifyScopeListeners(), this;
                    }
                    addBreadcrumb(e, t) {
                        const n = "number" == typeof t ? t : 100;
                        if (n <= 0) {
                            return this;
                        }
                        const r = {
                                timestamp: c.dateTimestampInSeconds(),
                                ...e
                            },
                            o = this._breadcrumbs;
                        return o.push(r), this._breadcrumbs = o.length > n ? o.slice(-n) : o, this._notifyScopeListeners(), this;
                    }
                    getLastBreadcrumb() {
                        return this._breadcrumbs[this._breadcrumbs.length - 1];
                    }
                    clearBreadcrumbs() {
                        return this._breadcrumbs = [], this._notifyScopeListeners(), this;
                    }
                    addAttachment(e) {
                        return this._attachments.push(e), this;
                    }
                    clearAttachments() {
                        return this._attachments = [], this;
                    }
                    getScopeData() {
                        return {
                            breadcrumbs: this._breadcrumbs,
                            attachments: this._attachments,
                            contexts: this._contexts,
                            tags: this._tags,
                            extra: this._extra,
                            user: this._user,
                            level: this._level,
                            fingerprint: this._fingerprint || [],
                            eventProcessors: this._eventProcessors,
                            propagationContext: this._propagationContext,
                            sdkProcessingMetadata: this._sdkProcessingMetadata,
                            transactionName: this._transactionName,
                            span: u._getSpanForScope(this)
                        };
                    }
                    setSDKProcessingMetadata(e) {
                        return this._sdkProcessingMetadata = l.merge(this._sdkProcessingMetadata, e, 2), this;
                    }
                    setPropagationContext(e) {
                        return this._propagationContext = e, this;
                    }
                    getPropagationContext() {
                        return this._propagationContext;
                    }
                    captureException(e, t) {
                        const n = t && t.event_id ? t.event_id : i.uuid4();
                        if (!this._client) {
                            return s.logger.warn("No client configured on scope - will not capture exception!"), n;
                        }
                        const r = new Error("Sentry syntheticException");
                        return this._client.captureException(e, {
                            originalException: e,
                            syntheticException: r,
                            ...t,
                            event_id: n
                        }, this), n;
                    }
                    captureMessage(e, t, n) {
                        const r = n && n.event_id ? n.event_id : i.uuid4();
                        if (!this._client) {
                            return s.logger.warn("No client configured on scope - will not capture message!"), r;
                        }
                        const o = new Error(e);
                        return this._client.captureMessage(e, t, {
                            originalException: e,
                            syntheticException: o,
                            ...n,
                            event_id: r
                        }, this), r;
                    }
                    captureEvent(e, t) {
                        const n = t && t.event_id ? t.event_id : i.uuid4();
                        return this._client ? (this._client.captureEvent(e, {
                            ...t,
                            event_id: n
                        }, this), n) : (s.logger.warn("No client configured on scope - will not capture event!"), n);
                    }
                    _notifyScopeListeners() {
                        this._notifyingListeners || (this._notifyingListeners = true, this._scopeListeners.forEach(e => {
                            e(this);
                        }), this._notifyingListeners = false);
                    }
                }
                const p = d;;
            },
            7008: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(8974),
                    s = n(3910);

                function i(e) {
                    r.getCurrentScope().setClient(e);
                };;;
            },
            2751: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;;;;;;;;;;;;;;
            },
            4842: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(7183),
                    o = n(251),
                    s = n(9564),
                    i = n(8974),
                    a = n(4751),
                    c = n(4038);
                n(9572);
                n(8950);;
                const l = n(3910);
                n(8587);
                const u = n(4865),
                    d = n(4583),
                    p = n(2322),
                    h = n(7120),
                    m = n(3185),
                    f = n(3754);
                class g extends r.BaseClient {
                    constructor(e) {
                        c.registerSpanErrorInstrumentation();
                        super(e);;
                    }
                    eventFromException(e, t) {
                        return h.resolvedSyncPromise(m.eventFromUnknownInput(this, this._options.stackParser, e, t));
                    }
                    eventFromMessage(e, t = "info", n) {
                        return h.resolvedSyncPromise(m.eventFromMessage(this._options.stackParser, e, t, n, this._options.attachStacktrace));
                    }
                    captureException(e, t, n) {
                        if (this._options.autoSessionTracking && this._sessionFlusher) {
                            const e = s.getIsolationScope().getRequestSession();
                            e && "ok" === e.status && (e.status = "errored");
                        }
                        return super.captureException(e, t, n);
                    }
                    captureEvent(e, t, n) {
                        if (this._options.autoSessionTracking && this._sessionFlusher && "exception" === (e.type || "exception") && e.exception && e.exception.values && e.exception.values.length > 0) {
                            const e = s.getIsolationScope().getRequestSession();
                            e && "ok" === e.status && (e.status = "errored");
                        }
                        return super.captureEvent(e, t, n);
                    }
                    close(e) {
                        return this._sessionFlusher && this._sessionFlusher.close(), super.close(e);
                    }
                    initSessionFlusher() {
                        const {
                            release: e,
                            environment: t
                        } = this._options;
                        e ? this._sessionFlusher = new a.SessionFlusher(this, {
                            release: e,
                            environment: t
                        }) : i.DEBUG_BUILD && l.logger.warn("Cannot initialise an instance of SessionFlusher if no release is provided!");
                    }
                    captureCheckIn(e, t, n) {
                        const r = "checkInId" in e && e.checkInId ? e.checkInId : p.uuid4();
                        if (!this._isEnabled()) {
                            return i.DEBUG_BUILD && l.logger.warn("SDK not enabled, will not capture checkin."), r;
                        }
                        const s = this.getOptions(),
                            {
                                release: a,
                                environment: c,
                                tunnel: u
                            } = s,
                            d = {
                                check_in_id: r,
                                monitor_slug: e.monitorSlug,
                                status: e.status,
                                release: a,
                                environment: c
                            };
                        "duration" in e && (d.duration = e.duration);
                        t && (d.monitor_config = {
                            schedule: t.schedule,
                            checkin_margin: t.checkinMargin,
                            max_runtime: t.maxRuntime,
                            timezone: t.timezone,
                            failure_issue_threshold: t.failureIssueThreshold,
                            recovery_threshold: t.recoveryThreshold
                        });;
                        const [h, m] = this._getTraceInfoFromScope(n);
                        m && (d.contexts = {
                            trace: m
                        });
                        const f = o.createCheckInEnvelope(d, h, this.getSdkMetadata(), u, this.getDsn());
                        return i.DEBUG_BUILD && l.logger.info("Sending checkin:", e.monitorSlug, e.status), this.sendEnvelope(f), r;
                    }
                    _captureRequestSession() {
                        this._sessionFlusher ? this._sessionFlusher.incrementSessionStatusCount() : i.DEBUG_BUILD && l.logger.warn("Discarded request mode session because autoSessionTracking option was disabled");
                    }
                    _prepareEvent(e, t, n, r) {
                        return this._options.platform && (e.platform = e.platform || this._options.platform), this._options.runtime && (e.contexts = {
                            ...e.contexts,
                            runtime: (e.contexts || {}).runtime || this._options.runtime
                        }), this._options.serverName && (e.server_name = e.server_name || this._options.serverName), super._prepareEvent(e, t, n, r);
                    }
                    _getTraceInfoFromScope(e) {
                        if (!e) {
                            return [undefined, undefined];
                        }
                        const t = u._getSpanForScope(e);
                        if (t) {
                            const e = d.getRootSpan(t);
                            return [f.getDynamicSamplingContextFromSpan(e), d.spanToTraceContext(e)];
                        }
                        const {
                            traceId: n,
                            spanId: r,
                            parentSpanId: o,
                            dsc: s
                        } = e.getPropagationContext(), i = {
                            trace_id: n,
                            span_id: r,
                            parent_span_id: o
                        };
                        return s ? [s, i] : [f.getDynamicSamplingContextFromClient(n, this), i];
                    }
                };
            },
            1348: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                n(9572);
                n(8950);
                n(3910);;
                const r = n(2093),
                    o = n(8587),
                    s = n(2322);

                function i(e, t = {}) {
                    if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), e.did || t.did || (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || o.timestampInSeconds(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = 32 === t.sid.length ? t.sid : s.uuid4()), undefined !== t.init && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), "number" == typeof t.started && (e.started = t.started), e.ignoreDuration) {
                        e.duration = undefined;
                    } else {
                        if ("number" == typeof t.duration) {
                            e.duration = t.duration;
                        } else {
                            const t = e.timestamp - e.started;
                            e.duration = t >= 0 ? t : 0;
                        }
                    }
                    t.release && (e.release = t.release);
                    t.environment && (e.environment = t.environment);
                    !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress);
                    !e.userAgent && t.userAgent && (e.userAgent = t.userAgent);
                    "number" == typeof t.errors && (e.errors = t.errors);
                    t.status && (e.status = t.status);;
                }
                n(7120);;;;;
            },
            4751: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(2093);;
            },
            3754: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2501),
                    o = n(9564),
                    s = n(2751),
                    i = n(8558),
                    a = n(2093),
                    c = n(73),
                    l = n(4583);

                function d(e, t) {
                    const n = t.getOptions(),
                        {
                            publicKey: o
                        } = t.getDsn() || {},
                        s = a.dropUndefinedKeys({
                            environment: n.environment || r.DEFAULT_ENVIRONMENT,
                            release: n.release,
                            public_key: o,
                            trace_id: e
                        });
                    return t.emit("createDsc", s), s;
                }

                function p(e) {
                    const t = o.getClient();
                    if (!t) {
                        return {};
                    }
                    const n = d(l.spanToJSON(e).trace_id || "", t),
                        r = l.getRootSpan(e),
                        a = r._frozenDsc;
                    if (a) {
                        return a;
                    }
                    const p = r.spanContext().traceState,
                        h = p && p.get("sentry.dsc"),
                        m = h && i.baggageHeaderToDynamicSamplingContext(h);
                    if (m) {
                        return m;
                    }
                    const f = l.spanToJSON(r),
                        g = f.data || {},
                        _ = g[s.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];
                    null != _ && (n.sample_rate = `${_}`);
                    const y = g[s.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
                        S = f.description;
                    return "url" !== y && S && (n.transaction = S), c.hasTracingEnabled() && (n.sampled = String(l.spanIsSampled(r))), t.emit("createDsc", n, r), n;
                };;;;;
            },
            4038: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(5495),
                    s = n(2023),
                    i = n(3910),
                    a = n(4583),
                    c = n(5363);
                let l = false;

                function u() {
                    const e = a.getActiveSpan(),
                        t = e && a.getRootSpan(e);
                    if (t) {
                        const e = "internal_error";
                        r.DEBUG_BUILD && i.logger.log(`[Tracing] Root span: ${e} -> Global error occurred`);
                        t.setStatus({
                            code: c.SPAN_STATUS_ERROR,
                            message: e
                        });;
                    }
                }
                u.tag = "sentry_tracingErrorCallback";;;
            },
            2188: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4038);;
            },
            7011: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(8974),
                    s = n(2751),
                    i = n(3910),
                    a = n(8587),
                    c = n(73),
                    l = n(4865),
                    u = n(4583),
                    d = n(7392),
                    p = n(5363),
                    h = n(5908);;;;
            },
            8346: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(3910),
                    s = n(4583);;;;
            },
            8945: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2751),
                    o = n(4583);;;;
            },
            9816: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(3910),
                    s = n(73),
                    i = n(393);;
            },
            7392: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2322),
                    o = n(4583);;
            },
            242: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(8974),
                    s = n(238),
                    i = n(4021),
                    a = n(2751),
                    c = n(3910),
                    l = n(2322),
                    u = n(2093),
                    d = n(8587),
                    p = n(4583),
                    h = n(3754),
                    m = n(8346),
                    f = n(8945),
                    g = n(4284);
                class _ {
                    constructor(e = {}) {
                        this._traceId = e.traceId || l.uuid4();
                        this._spanId = e.spanId || l.uuid4().substring(16);
                        this._startTime = e.startTimestamp || d.timestampInSeconds();
                        this._attributes = {};
                        this.setAttributes({
                            [a.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "manual",
                            [a.SEMANTIC_ATTRIBUTE_SENTRY_OP]: e.op,
                            ...e.attributes
                        });
                        this._name = e.name;
                        e.parentSpanId && (this._parentSpanId = e.parentSpanId);
                        "sampled" in e && (this._sampled = e.sampled);
                        e.endTimestamp && (this._endTime = e.endTimestamp);
                        this._events = [];
                        this._isStandaloneSpan = e.isStandalone;
                        this._endTime && this._onSpanEnded();;
                    }
                    addLink(e) {
                        return this;
                    }
                    addLinks(e) {
                        return this;
                    }
                    recordException(e, t) {}
                    spanContext() {
                        const {
                            _spanId: e,
                            _traceId: t,
                            _sampled: n
                        } = this;
                        return {
                            spanId: e,
                            traceId: t,
                            traceFlags: n ? p.TRACE_FLAG_SAMPLED : p.TRACE_FLAG_NONE
                        };
                    }
                    setAttribute(e, t) {
                        return undefined === t ? delete this._attributes[e] : this._attributes[e] = t, this;
                    }
                    setAttributes(e) {
                        return Object.keys(e).forEach(t => this.setAttribute(t, e[t])), this;
                    }
                    updateStartTime(e) {
                        this._startTime = p.spanTimeInputToSeconds(e);
                    }
                    setStatus(e) {
                        return this._status = e, this;
                    }
                    updateName(e) {
                        return this._name = e, this.setAttribute(a.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "custom"), this;
                    }
                    end(e) {
                        this._endTime || (this._endTime = p.spanTimeInputToSeconds(e), m.logSpanEnd(this), this._onSpanEnded());
                    }
                    getSpanJSON() {
                        return u.dropUndefinedKeys({
                            data: this._attributes,
                            description: this._name,
                            op: this._attributes[a.SEMANTIC_ATTRIBUTE_SENTRY_OP],
                            parent_span_id: this._parentSpanId,
                            span_id: this._spanId,
                            start_timestamp: this._startTime,
                            status: p.getStatusMessage(this._status),
                            timestamp: this._endTime,
                            trace_id: this._traceId,
                            origin: this._attributes[a.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
                            _metrics_summary: i.getMetricSummaryJsonForSpan(this),
                            profile_id: this._attributes[a.SEMANTIC_ATTRIBUTE_PROFILE_ID],
                            exclusive_time: this._attributes[a.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
                            measurements: f.timedEventsToMeasurements(this._events),
                            is_segment: this._isStandaloneSpan && p.getRootSpan(this) === this || undefined,
                            segment_id: this._isStandaloneSpan ? p.getRootSpan(this).spanContext().spanId : undefined
                        });
                    }
                    isRecording() {
                        return !this._endTime && !!this._sampled;
                    }
                    addEvent(e, t, n) {
                        o.DEBUG_BUILD && c.logger.log("[Tracing] Adding an event to span:", e);
                        const r = t && "number" == typeof t || t instanceof Date || Array.isArray(t) ? t : n || d.timestampInSeconds(),
                            s = t && "number" == typeof t || t instanceof Date || Array.isArray(t) ? {} : t || {},
                            i = {
                                name: e,
                                time: p.spanTimeInputToSeconds(r),
                                attributes: s
                            };
                        return this._events.push(i), this;
                    }
                    isStandaloneSpan() {
                        return !!this._isStandaloneSpan;
                    }
                    _onSpanEnded() {
                        const e = r.getClient();
                        if (e && e.emit("spanEnd", this), !this._isStandaloneSpan && this !== p.getRootSpan(this)) {
                            return;
                        }
                        if (this._isStandaloneSpan) {
                            return void(this._sampled ? function(e) {
                                const t = r.getClient();
                                if (!t) {
                                    return;
                                }
                                const n = e[1];
                                n && 0 !== n.length ? t.sendEnvelope(e) : t.recordDroppedEvent("before_send", "span");
                            }(s.createSpanEnvelope([this], e)) : (o.DEBUG_BUILD && c.logger.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), e && e.recordDroppedEvent("sample_rate", "span")));
                        }
                        const t = this._convertSpanToTransaction();
                        t && (g.getCapturedScopesOnSpan(this).scope || r.getCurrentScope()).captureEvent(t);
                    }
                    _convertSpanToTransaction() {
                        if (!!!(p.spanToJSON(this).start_timestamp && p.spanToJSON(this).timestamp && p.spanToJSON(this).span_id && p.spanToJSON(this).trace_id)) {
                            return;
                        }
                        this._name || (o.DEBUG_BUILD && c.logger.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>");
                        const {
                            scope: e,
                            isolationScope: t
                        } = g.getCapturedScopesOnSpan(this), n = (e || r.getCurrentScope()).getClient() || r.getClient();
                        if (true !== this._sampled) {
                            return o.DEBUG_BUILD && c.logger.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."), void(n && n.recordDroppedEvent("sample_rate", "transaction"));
                        }
                        const s = p.getSpanDescendants(this).filter(e => e !== this && ! function(e) {
                                return e instanceof _ && e.isStandaloneSpan();
                            }(e)).map(e => p.spanToJSON(e)).filter(S),
                            l = this._attributes[a.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
                            d = {
                                contexts: {
                                    trace: p.spanToTransactionTraceContext(this)
                                },
                                spans: s.length > 1e3 ? s.sort((e, t) => e.start_timestamp - t.start_timestamp).slice(0, 1e3) : s,
                                start_timestamp: this._startTime,
                                timestamp: this._endTime,
                                transaction: this._name,
                                type: "transaction",
                                sdkProcessingMetadata: {
                                    capturedSpanScope: e,
                                    capturedSpanIsolationScope: t,
                                    ...u.dropUndefinedKeys({
                                        dynamicSamplingContext: h.getDynamicSamplingContextFromSpan(this)
                                    })
                                },
                                _metrics_summary: i.getMetricSummaryJsonForSpan(this),
                                ...l && {
                                    transaction_info: {
                                        source: l
                                    }
                                }
                            },
                            m = f.timedEventsToMeasurements(this._events);
                        return m && Object.keys(m).length && (o.DEBUG_BUILD && c.logger.log("[Measurements] Adding measurements to transaction event", JSON.stringify(m, undefined, 2)), d.measurements = m), d;
                    }
                };
            },
            5363: (e, t) => {
                function n(e) {
                    if (e < 400 && e >= 100) {
                        return {
                            code: 1
                        };
                    }
                    if (e >= 400 && e < 500) {
                        switch (e) {
                            case 401:
                                return {
                                    code: 2, message: "unauthenticated"
                                };
                            case 403:
                                return {
                                    code: 2, message: "permission_denied"
                                };
                            case 404:
                                return {
                                    code: 2, message: "not_found"
                                };
                            case 409:
                                return {
                                    code: 2, message: "already_exists"
                                };
                            case 413:
                                return {
                                    code: 2, message: "failed_precondition"
                                };
                            case 429:
                                return {
                                    code: 2, message: "resource_exhausted"
                                };
                            case 499:
                                return {
                                    code: 2, message: "cancelled"
                                };
                            default:
                                return {
                                    code: 2, message: "invalid_argument"
                                };
                        }
                    }
                    if (e >= 500 && e < 600) {
                        switch (e) {
                            case 501:
                                return {
                                    code: 2, message: "unimplemented"
                                };
                            case 503:
                                return {
                                    code: 2, message: "unavailable"
                                };
                            case 504:
                                return {
                                    code: 2, message: "deadline_exceeded"
                                };
                            default:
                                return {
                                    code: 2, message: "internal_error"
                                };
                        }
                    }
                    return {
                        code: 2,
                        message: "unknown_error"
                    };
                }
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;;;;;
            },
            5908: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(3220),
                    o = n(9564),
                    s = n(2810),
                    i = n(8974),
                    a = n(2751),
                    c = n(3910),
                    l = n(367),
                    u = n(4890),
                    d = n(6354),
                    p = n(73),
                    h = n(4865),
                    m = n(4583),
                    f = n(3754),
                    g = n(8346),
                    _ = n(9816),
                    y = n(7392),
                    S = n(242),
                    v = n(5363),
                    b = n(4284);

                function T(e, t) {
                    const n = w();
                    return n.withActiveSpan ? n.withActiveSpan(e, t) : o.withScope(n => (h._setSpanForScope(n, e || undefined), t(n)));
                }

                function I({
                    parentSpan: e,
                    spanArguments: t,
                    forceTransaction: n,
                    scope: r
                }) {
                    if (!p.hasTracingEnabled()) {
                        return new y.SentryNonRecordingSpan;
                    }
                    const s = o.getIsolationScope();
                    let i;
                    if (e && !n) {
                        i = function(e, t, n) {
                            const {
                                spanId: r,
                                traceId: s
                            } = e.spanContext(), i = !t.getScopeData().sdkProcessingMetadata.__SENTRY_SUPPRESS_TRACING__ && m.spanIsSampled(e), a = i ? new S.SentrySpan({
                                ...n,
                                parentSpanId: r,
                                traceId: s,
                                sampled: i
                            }) : new y.SentryNonRecordingSpan({
                                traceId: s
                            });
                            m.addChildSpanToSpan(e, a);
                            const c = o.getClient();
                            return c && (c.emit("spanStart", a), n.endTimestamp && c.emit("spanEnd", a)), a;
                        }(e, r, t);
                        m.addChildSpanToSpan(e, i);;
                    } else {
                        if (e) {
                            const n = f.getDynamicSamplingContextFromSpan(e),
                                {
                                    traceId: o,
                                    spanId: s
                                } = e.spanContext(),
                                a = m.spanIsSampled(e);
                            i = k({
                                traceId: o,
                                parentSpanId: s,
                                ...t
                            }, r, a);
                            f.freezeDscOnSpan(i, n);;
                        } else {
                            const {
                                traceId: e,
                                dsc: n,
                                parentSpanId: o,
                                sampled: a
                            } = {
                                ...s.getPropagationContext(),
                                ...r.getPropagationContext()
                            };
                            i = k({
                                traceId: e,
                                parentSpanId: o,
                                ...t
                            }, r, a);
                            n && f.freezeDscOnSpan(i, n);;
                        }
                    }
                    return g.logSpanStart(i), b.setCapturedScopesOnSpan(i, r, s), i;
                }

                function C(e) {
                    const t = {
                        isStandalone: (e.experimental || {}).standalone,
                        ...e
                    };
                    if (e.startTime) {
                        const n = {
                            ...t
                        };
                        return n.startTimestamp = m.spanTimeInputToSeconds(e.startTime), delete n.startTime, n;
                    }
                    return t;
                }

                function w() {
                    const e = r.getMainCarrier();
                    return s.getAsyncContextStrategy(e);
                }

                function k(e, t, n) {
                    const r = o.getClient(),
                        s = r && r.getOptions() || {},
                        {
                            name: i = "",
                            attributes: c
                        } = e,
                        [l, u] = t.getScopeData().sdkProcessingMetadata.__SENTRY_SUPPRESS_TRACING__ ? [false] : _.sampleSpan(s, {
                            name: i,
                            parentSampled: n,
                            attributes: c,
                            transactionContext: {
                                name: i,
                                parentSampled: n
                            }
                        }),
                        d = new S.SentrySpan({
                            ...e,
                            attributes: {
                                [a.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "custom",
                                ...e.attributes
                            },
                            sampled: l
                        });
                    return undefined !== u && d.setAttribute(a.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, u), r && r.emit("spanStart", d), d;
                }

                function A(e) {
                    const t = h._getSpanForScope(e);
                    if (!t) {
                        return;
                    }
                    const n = o.getClient();
                    return (n ? n.getOptions() : {}).parentSpanIsAlwaysRootSpan ? m.getRootSpan(t) : t;
                }

                function M(e) {
                    return undefined !== e ? t => T(e, t) : e => e();
                };;;;;;;;
            },
            4284: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2093);;;;
            },
            4450: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(3206),
                    s = n(8746),
                    i = n(3910),
                    a = n(5467),
                    c = n(5469),
                    l = n(7120);

                function u(e, t) {
                    if ("event" === t || "transaction" === t) {
                        return Array.isArray(e) ? e[1] : undefined;
                    }
                };;;
            },
            4082: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(5740),
                    o = n(1101),
                    s = n(3206);

                function i(e, t) {
                    let n;
                    return s.forEachEnvelopeItem(e, (e, r) => (t.includes(r) && (n = Array.isArray(e) ? e[1] : undefined), !!n)), n;
                };;;
            },
            2256: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(3206),
                    s = n(3910),
                    i = n(5469);;;;;
            },
            6033: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564),
                    o = n(9183),
                    s = n(2751);
                n(4038);
                n(9572);
                n(8950);
                n(3910);
                n(8974);
                n(8587);;
                const i = n(6507);
                n(7120);
                const a = n(5908),
                    c = {
                        mechanism: {
                            handled: false,
                            data: {
                                function: "trpcMiddleware"
                            }
                        }
                    };;
            },
            8891: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478),
                    o = n(3591);

                function s(e, t, n, o, c, l, u, d) {
                    if (l.length >= n + 1) {
                        return l;
                    }
                    let p = [...l];
                    if (r.isInstanceOf(o[c], Error)) {
                        i(u, d);
                        const r = e(t, o[c]),
                            l = p.length;
                        a(r, c, l, d);
                        p = s(e, t, n, o[c], c, [r, ...p], r, l);;
                    }
                    return Array.isArray(o.errors) && o.errors.forEach((o, l) => {
                        if (r.isInstanceOf(o, Error)) {
                            i(u, d);
                            const r = e(t, o),
                                h = p.length;
                            a(r, `errors[${l}]`, h, d);
                            p = s(e, t, n, o, c, [r, ...p], r, h);;
                        }
                    }), p;
                }

                function i(e, t) {
                    e.mechanism = e.mechanism || {
                        type: "generic",
                        handled: true
                    };
                    e.mechanism = {
                        ...e.mechanism,
                        ..."AggregateError" === e.type && {
                            is_exception_group: true
                        },
                        exception_id: t
                    };;
                }

                function a(e, t, n, r) {
                    e.mechanism = e.mechanism || {
                        type: "generic",
                        handled: true
                    };
                    e.mechanism = {
                        ...e.mechanism,
                        type: "chained",
                        source: t,
                        exception_id: n,
                        parent_id: r
                    };;
                };
            },
            1771: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(6835),
                    o = n(2093),
                    s = n(8051);;;;
            },
            4558: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            8558: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8950),
                    o = n(4478),
                    s = n(3910);

                function c(e) {
                    if (e && (o.isString(e) || Array.isArray(e))) {
                        return Array.isArray(e) ? e.reduce((e, t) => {
                            const n = t.split(",").map(e => t.split("=").map(e => decodeURIComponent(t.trim()))).reduce((e, [t, n]) => (t && n && (t[t] = n), t), {});
                            return Object.entries(n).forEach(([t, n]) => {
                                e[t] = n;
                            }), e;
                        }, {}) : e.split(",").map(e => e.split("=").map(e => decodeURIComponent(e.trim()))).reduce((e, [t, n]) => (t && n && (e[t] = n), e), {});
                    }
                };;;;;;;;
            },
            1647: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            1268: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478),
                    o = n(4987).GLOBAL_OBJ;

                function s(e, t) {
                    const n = e,
                        s = [];
                    if (!n || !n.tagName) {
                        return "";
                    }
                    if (o.HTMLElement && n instanceof HTMLElement && n.dataset) {
                        if (n.dataset.sentryComponent) {
                            return n.dataset.sentryComponent;
                        }
                        if (n.dataset.sentryElement) {
                            return n.dataset.sentryElement;
                        }
                    }
                    s.push(n.tagName.toLowerCase());
                    const i = t && t.length ? t.filter(e => n.getAttribute(e)).map(e => [e, n.getAttribute(e)]) : null;
                    if (i && i.length) {
                        i.forEach(e => {
                            s.push(`[${e[0]}="${e[1]}"]`);
                        });
                    } else {
                        n.id && s.push(`#${n.id}`);
                        const e = n.className;
                        if (e && r.isString(e)) {
                            const t = e.split(/\s+/);
                            for (const e of t) s.push(`.${e}`);
                        }
                    }
                    const a = ["aria-label", "type", "name", "title", "alt"];
                    for (const e of a) {
                        const t = n.getAttribute(e);
                        t && s.push(`[${e}="${t}"]`);
                    }
                    return s.join("");
                };;;;;
            },
            7060: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4834);;
            },
            1357: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            1622: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1357);;
            },
            4834: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            9015: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            7816: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9015);;
            },
            2302: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            1091: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(3206),
                    o = n(8587);;
            },
            6396: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            8950: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const n = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;;
            },
            4008: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4987),
                    o = new WeakMap;

                function s(e) {
                    const t = r.GLOBAL_OBJ._sentryDebugIds;
                    if (!t) {
                        return {};
                    }
                    let n;
                    const s = o.get(e);
                    return s ? n = s : (n = new Map, o.set(e, n)), Object.keys(t).reduce((r, o) => {
                        let s;
                        const i = n.get(o);
                        i ? s = i : (s = e(o), n.set(o, s));
                        for (let e = s.length - 1; e >= 0; e--) {
                            const n = s[e],
                                i = n && n.filename;
                            if (n && i) {
                                ;
                                break;
                            }
                        }
                        return r;
                    }, {});
                };;;
            },
            1101: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8950),
                    o = n(3910);

                function i(e) {
                    const t = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/.exec(e);
                    if (!t) {
                        return void o.consoleSandbox(() => {
                            console.error(`Invalid Sentry Dsn: ${e}`);
                        });
                    }
                    const [n, r, i = "", c = "", l = "", u = ""] = t.slice(1);
                    let d = "",
                        p = u;
                    const h = p.split("/");
                    if (h.length > 1 && (d = h.slice(0, -1).join("/"), p = h.pop()), p) {
                        const e = p.match(/^\d+/);
                        e && (p = e[0]);
                    }
                    return a({
                        host: c,
                        pass: i,
                        path: d,
                        projectId: p,
                        port: l,
                        protocol: n,
                        publicKey: r
                    });
                }

                function a(e) {
                    return {
                        protocol: e.protocol,
                        publicKey: e.publicKey || "",
                        pass: e.pass || "",
                        host: e.host,
                        port: e.port || "",
                        path: e.path || "",
                        projectId: e.projectId
                    };
                };;;;
            },
            9827: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;;
            },
            3206: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1101),
                    o = n(6507),
                    s = n(2093),
                    i = n(4987);

                function a(e, t) {
                    const n = e[1];
                    for (const e of n)
                        if (t(e, e[0].type)) {
                            return true;
                        }
                    return false;
                }

                function c(e) {
                    return i.GLOBAL_OBJ.__SENTRY__ && i.GLOBAL_OBJ.__SENTRY__.encodePolyfill ? i.GLOBAL_OBJ.__SENTRY__.encodePolyfill(e) : (new TextEncoder).encode(e);
                };;;;;;;;;;;;;
            },
            8746: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                class n extends Error {
                    constructor(e, t = "warn") {
                        super(e);
                        this.message = e;
                        this.name = new.target.prototype.constructor.name;
                        Object.setPrototypeOf(this, new.target.prototype);
                        this.logLevel = t;;
                    }
                };
            },
            3185: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478),
                    o = n(2322),
                    s = n(6507),
                    i = n(2093);

                function c(e, t) {
                    const n = {
                            type: t.name || t.constructor.name,
                            value: t.message
                        },
                        r = e(t.stack || "", 1);
                    return r.length && (n.stacktrace = {
                        frames: r
                    }), n;
                }

                function l(e, t, n, o) {
                    if (r.isError(n)) {
                        return [n, undefined];
                    }
                    if (t.synthetic = true, r.isPlainObject(n)) {
                        const t = e && e.getOptions().normalizeDepth,
                            a = {
                                __serialized__: s.normalizeToSize(n, t)
                            },
                            c = function(e) {
                                for (const t in e)
                                    if (Object.prototype.hasOwnProperty.call(e, t)) {
                                        const n = e[t];
                                        if (n instanceof Error) {
                                            return n;
                                        }
                                    }
                            }(n);
                        if (c) {
                            return [c, a];
                        }
                        const l = function(e) {
                                if ("name" in e && "string" == typeof e.name) {
                                    let t = `'${e.name}' captured as exception`;
                                    return "message" in e && "string" == typeof e.message && (t += ` with message '${e.message}'`), t;
                                }
                                if ("message" in e && "string" == typeof e.message) {
                                    return e.message;
                                }
                                const t = i.extractExceptionKeysForMessage(e);
                                if (r.isErrorEvent(e)) {
                                    return `Event \`ErrorEvent\` captured as exception with message \`${e.message}\``;
                                }
                                const n = function(e) {
                                    try {
                                        const t = Object.getPrototypeOf(e);
                                        return t ? t.constructor.name : undefined;
                                    } catch (e) {}
                                }(e);
                                return `${n && "Object" !== n ? `'${n}'` : "Object"} captured as exception with keys: ${t}`;
                            }(n),
                            u = o && o.syntheticException || new Error(l);
                        return u.message = l, [u, a];
                    }
                    const a = o && o.syntheticException || new Error(n);
                    return a.message = `${n}`, [a, undefined];
                };;;;;
            },
            3765: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(3910),
                    o = n(2093),
                    s = n(4987),
                    i = n(8983);

                function a() {
                    "console" in s.GLOBAL_OBJ && r.CONSOLE_LEVELS.forEach(function(e) {
                        e in s.GLOBAL_OBJ.console && o.fill(s.GLOBAL_OBJ.console, e, function(t) {
                            return r.originalConsoleMethods[e] = t,
                                function(...t) {
                                    const n = {
                                        args: t,
                                        level: e
                                    };
                                    i.triggerHandlers("console", n);
                                    const o = r.originalConsoleMethods[e];
                                    o && o.apply(s.GLOBAL_OBJ.console, t);
                                };
                        });
                    });
                };
            },
            8096: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478),
                    o = n(2093),
                    s = n(1002),
                    i = n(8587),
                    a = n(4987),
                    c = n(8983);

                function l(e, t = false) {
                    t && !s.supportsNativeFetch() || o.fill(a.GLOBAL_OBJ, "fetch", function(t) {
                        return function(...n) {
                            const {
                                method: s,
                                url: l
                            } = h(n), u = {
                                args: n,
                                fetchData: {
                                    method: s,
                                    url: l
                                },
                                startTimestamp: 1e3 * i.timestampInSeconds()
                            };
                            e || c.triggerHandlers("fetch", {
                                ...u
                            });
                            const d = (new Error).stack;
                            return t.apply(a.GLOBAL_OBJ, n).then(async t => (e ? e(t) : c.triggerHandlers("fetch", {
                                ...u,
                                endTimestamp: 1e3 * i.timestampInSeconds(),
                                response: t
                            }), t), e => {
                                throw c.triggerHandlers("fetch", {
                                    ...u,
                                    endTimestamp: 1e3 * i.timestampInSeconds(),
                                    error: e
                                }), r.isError(e) && undefined === e.stack && (e.stack = d, o.addNonEnumerableProperty(e, "framesToPop", 1)), e;
                            });
                        };
                    });
                }

                function u(e) {
                    let t;
                    try {
                        t = e.clone();
                    } catch (e) {
                        return;
                    }!async function(t) {
                        if (t && t.body) {
                            const n = t.body,
                                r = n.getReader(),
                                o = setTimeout(() => {
                                    n.cancel().then(null, () => {});
                                }, 9e4);
                            let s = true;
                            for (; s;) {
                                let t;
                                try {
                                    t = setTimeout(() => {
                                        n.cancel().then(null, () => {});
                                    }, 5e3);
                                    const {
                                        done: o
                                    } = await r.read();
                                    clearTimeout(t);
                                    o && (c.triggerHandlers("fetch-body-resolved", {
                                        endTimestamp: 1e3 * i.timestampInSeconds(),
                                        response: e
                                    }), s = false);;
                                } catch (e) {
                                    s = false;
                                } finally {
                                    clearTimeout(t);
                                }
                            }
                            clearTimeout(o);
                            r.releaseLock();
                            n.cancel().then(null, () => {});;
                        }
                    }(t);
                }

                function p(e) {
                    return "string" == typeof e ? e : e ? !!e && "object" == typeof e && !!e.url ? e.url : e.toString ? e.toString() : "" : "";
                }

                function h(e) {
                    if (0 === e.length) {
                        return {
                            method: "GET",
                            url: ""
                        };
                    }
                    if (2 === e.length) {
                        const [t, n] = e;
                        return {
                            url: p(t),
                            method: !!n && "object" == typeof n && !!n.method ? String(n.method).toUpperCase() : "GET"
                        };
                    }
                    const t = e[0];
                    return {
                        url: p(t),
                        method: !!t && "object" == typeof t && !!t.method ? String(t.method).toUpperCase() : "GET"
                    };
                };;;;
            },
            5495: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4987),
                    o = n(8983);
                let s = null;

                function i() {
                    s = r.GLOBAL_OBJ.onerror;
                    r.GLOBAL_OBJ.onerror = function(e, t, n, r, i) {
                        const a = {
                            column: r,
                            error: i,
                            line: n,
                            msg: e,
                            url: t
                        };
                        return o.triggerHandlers("error", a), !(!s || s.__SENTRY_LOADER__) && s.apply(this, arguments);
                    };
                    r.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = true;;
                };
            },
            2023: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4987),
                    o = n(8983);
                let s = null;

                function i() {
                    s = r.GLOBAL_OBJ.onunhandledrejection;
                    r.GLOBAL_OBJ.onunhandledrejection = function(e) {
                        const t = e;
                        return o.triggerHandlers("unhandledrejection", t), !(s && !s.__SENTRY_LOADER__) || s.apply(this, arguments);
                    };
                    r.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;;
                };
            },
            8983: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8950),
                    o = n(3910),
                    s = n(8051),
                    i = {
                        e: i[e] || [],
                        e: undefined
                    },
                    a = {
                        e: true
                    };;;;;;
            },
            4478: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const n = Object.prototype.toString;

                function i(e, t) {
                    try {
                        return e instanceof t;
                    } catch (e) {
                        return false;
                    }
                };;;;;;;;;;;;;;;;
            },
            8612: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(6566),
                    o = n(4987);;
            },
            3910: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8950),
                    o = n(4987),
                    s = ["debug", "info", "warn", "error", "log", "assert", "trace"],
                    i = {
                        handler: r,
                        platform: i.platform || "javascript",
                        __sentry_xhr_span_id__: p.spanContext().spanId,
                        Warning: "logging__warning",
                        Message: "logging__message",
                        Debug: "logging__debug"
                    };

                function a(e) {
                    if (!("console" in o.GLOBAL_OBJ)) {
                        return e();
                    }
                    const t = o.GLOBAL_OBJ.console,
                        n = {
                            e: t[e]
                        },
                        r = Object.keys(i);
                    r.forEach(e => {
                        const r = i[e];;;;
                    });
                    try {
                        return e();
                    } finally {
                        r.forEach(e => {
                            ;
                        });
                    }
                }
                const c = o.getGlobalSingleton("logger", function() {
                    let e = false;
                    const t = {
                        enable: () => {
                            e = true;
                        },
                        disable: () => {
                            e = false;
                        },
                        isEnabled: () => e
                    };
                    return r.DEBUG_BUILD ? s.forEach(n => {
                        ;
                    }) : s.forEach(e => {
                        ;
                    }), t;
                });;;;;;
            },
            7501: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            4880: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            2322: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2093),
                    o = n(3591),
                    s = n(4987);

                function i(e) {
                    return e.exception && e.exception.values ? e.exception.values[0] : undefined;
                };;;;;;;;;;
            },
            6835: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8051);

                function o(e, t = false) {
                    return !(t || e && !e.startsWith("/") && !e.match(/^[A-Z]:/) && !e.startsWith(".") && !e.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//) || undefined === e || e.includes("node_modules/"));
                }

                function s(e) {
                    ;
                    return s => {
                        const a = s.match(n);
                        if (a) {
                            let t, n, s, c, l;
                            if (a[1]) {
                                s = a[1];
                                let e = s.lastIndexOf(".");
                                if ("." === s[e - 1] && e--, e > 0) {
                                    t = s.slice(0, e);
                                    n = s.slice(e + 1);;
                                    const r = t.indexOf(".Module");
                                    if (r > 0) {
                                        s = s.slice(r + 1);
                                        t = t.slice(0, r);
                                    }
                                }
                                c = undefined;
                            }
                            n && (c = t, l = n);
                            if ("<anonymous>" === n) {
                                l = undefined;
                                s = undefined;
                            }
                            if (undefined === s) {
                                l = l || r.UNKNOWN_FUNCTION;
                                s = c ? `${c}.${l}` : l;
                            };
                            let u = a[2] && a[2].startsWith("file://") ? a[2].slice(7) : a[2];
                            const d = "native" === a[5];
                            return u && u.match(/\/[A-Z]:/) && (u = u.slice(1)), u || !a[5] || d || (u = a[5]), {
                                filename: u,
                                module: e ? e(u) : undefined,
                                function: s,
                                lineno: parseInt(a[3] || "", 10) || undefined,
                                colno: parseInt(a[4] || "", 10) || undefined,
                                in_app: o(u || "", d)
                            };
                        }
                        if (s.match(t)) {
                            return {
                                filename: s
                            };
                        }
                    };
                };;;;
            },
            6566: (e, t, n) => {
                e = n.nmd(e);
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;
                const r = n(9827);;;;;
            },
            6507: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478),
                    o = n(4880),
                    s = n(2093),
                    i = n(8051);

                function a(e, t = 100, n = Infinity) {
                    try {
                        return c("", e, t, n);
                    } catch (e) {
                        return {
                            ERROR: `**non-serializable** (${e})`
                        };
                    }
                }

                function c(e, t, a = Infinity, l = Infinity, u = o.memoBuilder()) {
                    const [d, p] = u;
                    if (null == t || ["boolean", "string"].includes(typeof t) || "number" == typeof t && Number.isFinite(t)) {
                        return t;
                    }
                    const h = function(e, t) {
                        try {
                            if ("domain" === e && t && "object" == typeof t && t._events) {
                                return "[Domain]";
                            }
                            if ("domainEmitter" === e) {
                                return "[DomainEmitter]";
                            }
                            if (undefined !== n.g && t === n.g) {
                                return "[Global]";
                            }
                            if ("undefined" != typeof window && t === window) {
                                return "[Window]";
                            }
                            if ("undefined" != typeof document && t === document) {
                                return "[Document]";
                            }
                            if (r.isVueViewModel(t)) {
                                return "[VueViewModel]";
                            }
                            if (r.isSyntheticEvent(t)) {
                                return "[SyntheticEvent]";
                            }
                            if ("number" == typeof t && !Number.isFinite(t)) {
                                return `[${t}]`;
                            }
                            if ("function" == typeof t) {
                                return `[Function: ${i.getFunctionName(t)}]`;
                            }
                            if ("symbol" == typeof t) {
                                return `[${String(t)}]`;
                            }
                            if ("bigint" == typeof t) {
                                return `[BigInt: ${String(t)}]`;
                            }
                            const o = function(e) {
                                const t = Object.getPrototypeOf(e);
                                return t ? t.constructor.name : "null prototype";
                            }(t);
                            return /^HTML(\w*)Element$/.test(o) ? `[HTMLElement: ${o}]` : `[object ${o}]`;
                        } catch (e) {
                            return `**non-serializable** (${e})`;
                        }
                    }(e, t);
                    if (!h.startsWith("[object ")) {
                        return h;
                    }
                    if (t.__sentry_skip_normalization__) {
                        return t;
                    }
                    const m = "number" == typeof t.__sentry_override_normalization_depth__ ? t.__sentry_override_normalization_depth__ : a;
                    if (0 === m) {
                        return h.replace("object ", "");
                    }
                    if (d(t)) {
                        return "[Circular ~]";
                    }
                    const f = t;
                    if (f && "function" == typeof f.toJSON) {
                        try {
                            return c("", f.toJSON(), m - 1, l, u);
                        } catch (e) {}
                    }
                    const g = Array.isArray(t) ? [] : {};
                    let _ = 0;
                    const y = s.convertToPlainObject(t);
                    for (const e in y) {
                        if (!Object.prototype.hasOwnProperty.call(y, e)) {
                            continue;
                        }
                        if (_ >= l) {
                            g[e] = "[MaxProperties ~]";
                            break;
                        }
                        const t = y[e];
                        g[e] = c(e, t, m - 1, l, u);
                        _++;;
                    }
                    return p(t), g;
                };;;;
            },
            2093: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(1268),
                    o = n(8950),
                    s = n(4478),
                    i = n(3910),
                    a = n(3591);

                function c(e, t, n) {
                    try {
                        Object.defineProperty(e, t, {
                            value: n,
                            writable: true,
                            configurable: true
                        });
                    } catch (n) {
                        o.DEBUG_BUILD && i.logger.log(`Failed to add non-enumerable property "${t}" to object`, e);
                    }
                }

                function l(e, t) {
                    try {
                        const n = t.prototype || {};
                        e.prototype = t.prototype = n;
                        c(e, "__sentry_original__", t);;
                    } catch (e) {}
                }

                function u(e) {
                    if (s.isError(e)) {
                        return {
                            message: e.message,
                            name: e.name,
                            stack: e.stack,
                            ...p(e)
                        };
                    }
                    if (s.isEvent(e)) {
                        const t = {
                            type: e.type,
                            target: d(e.target),
                            currentTarget: d(e.currentTarget),
                            ...p(e)
                        };
                        return "undefined" != typeof CustomEvent && s.isInstanceOf(e, CustomEvent) && (t.detail = e.detail), t;
                    }
                    return e;
                }

                function d(e) {
                    try {
                        return s.isElement(e) ? r.htmlTreeAsString(e) : Object.prototype.toString.call(e);
                    } catch (e) {
                        return "<unknown>";
                    }
                }

                function p(e) {
                    if ("object" == typeof e && null !== e) {
                        const t = {
                            addNonEnumerableProperty: c,
                            convertToPlainObject: u,
                            dropUndefinedKeys: function(e) {
                                return h(e, new Map);
                            },
                            extractExceptionKeysForMessage: function(e, t = 40) {
                                const n = Object.keys(u(e));
                                n.sort();
                                const r = n[0];
                                if (!r) {
                                    return "[object has no keys]";
                                }
                                if (r.length >= t) {
                                    return a.truncate(r, t);
                                }
                                for (let e = n.length; e > 0; e--) {
                                    const r = n.slice(0, e).join(", ");
                                    if (!(r.length > t)) {
                                        return e === n.length ? r : a.truncate(r, t);
                                    }
                                }
                                return "";
                            },
                            fill: function(e, t, n) {
                                if (!(t in e)) {
                                    return;
                                }
                                const r = e[t],
                                    s = n(r);
                                "function" == typeof s && l(s, r);
                                try {
                                    e[t] = s;
                                } catch (n) {
                                    o.DEBUG_BUILD && i.logger.log(`Failed to replace method "${t}" in object`, e);
                                }
                            },
                            getOriginalFunction: function(e) {
                                return e.__sentry_original__;
                            },
                            markFunctionWrapped: l,
                            objectify: function(e) {
                                let t;
                                switch (true) {
                                    case null == e:
                                        t = new String(e);
                                        break;
                                    case "symbol" == typeof e || "bigint" == typeof e:
                                        t = Object(e);
                                        break;
                                    case s.isPrimitive(e):
                                        t = new e.constructor(e);
                                        break;
                                    default:
                                        t = e;
                                }
                                return t;
                            },
                            urlEncode: function(e) {
                                return Object.keys(e).map(t => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join("&");
                            }
                        };
                        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        return t;
                    }
                    return {};
                }

                function h(e, t) {
                    if (function(e) {
                            if (!s.isPlainObject(e)) {
                                return false;
                            }
                            try {
                                const t = Object.getPrototypeOf(e).constructor.name;
                                return !t || "Object" === t;
                            } catch (e) {
                                return true;
                            }
                        }(e)) {
                        const n = t.get(e);
                        if (undefined !== n) {
                            return n;
                        }
                        const r = {
                            base: r.__P = null,
                            __N: [n, r.__[1]],
                            width: e.width,
                            height: e.height,
                            transaction_info: {
                                ...i,
                                source: e
                            },
                            filename: `${n}${i}`,
                            i: t[o],
                            companionLite: "companion_lite",
                            proxyFilter: "proxy_filter",
                            dns_filter: "dns_filter",
                            classroom: "classroom",
                            liteModeEnabled: "companion-mode-lite-enabled"
                        };
                        t.set(e, r);
                        for (const n of Object.getOwnPropertyNames(e)) undefined !== e[n] && (r[n] = h(e[n], t));
                        return r;
                    }
                    if (Array.isArray(e)) {
                        const n = t.get(e);
                        if (undefined !== n) {
                            return n;
                        }
                        const r = [];
                        return t.set(e, r), e.forEach(e => {
                            r.push(h(e, t));
                        }), r;
                    }
                    return e;
                };;;;;;;;;;
            },
            6785: (e, t) => {
                function n(e, t) {
                    let n = 0;
                    for (let t = e.length - 1; t >= 0; t--) {
                        const r = e[t];
                        "." === r ? e.splice(t, 1) : ".." === r ? (e.splice(t, 1), n++) : n && (e.splice(t, 1), n--);
                    }
                    if (t) {
                        for (; n--; n) {
                            e.unshift("..");
                        }
                    }
                    return e;
                }
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;

                function o(e) {
                    const t = e.length > 1024 ? `<truncated>${e.slice(-1024)}` : e,
                        n = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/.exec(t);
                    return n ? n.slice(1) : [];
                }

                function s(...e) {
                    let t = "",
                        r = false;
                    for (let n = e.length - 1; n >= -1 && !r; n--) {
                        const o = n >= 0 ? e[n] : "/";
                        o && (t = `${o}/${t}`, r = "/" === o.charAt(0));
                    }
                    return t = n(t.split("/").filter(e => !!e), !r).join("/"), (r ? "/" : "") + t || ".";
                }

                function i(e) {
                    let t = 0;
                    for (; t < e.length && "" === e[t]; t++) {
                        ;
                    }
                    let n = e.length - 1;
                    for (; n >= 0 && "" === e[n]; n--) {
                        ;
                    }
                    return t > n ? [] : e.slice(t, n - t + 1);
                }

                function a(e) {
                    const t = "/" === e.charAt(0),
                        r = "/" === e.slice(-1);
                    let o = n(e.split("/").filter(e => !!e), !t).join("/");
                    return o || t || (o = "."), o && r && (o += "/"), (t ? "/" : "") + o;
                };;;;;;;;
            },
            5467: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8746),
                    o = n(7120);;
            },
            367: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2322);;
            },
            5469: (e, t) => {
                function n(e, t = Date.now()) {
                    const n = parseInt(`${e}`, 10);
                    if (!isNaN(n)) {
                        return 1e3 * n;
                    }
                    const r = Date.parse(`${e}`);
                    return isNaN(r) ? 6e4 : r - t;
                }
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;;;;;
            },
            789: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(6396),
                    o = n(8950),
                    s = n(4478),
                    i = n(3910),
                    a = n(6507),
                    c = n(2093),
                    l = n(3591),
                    u = n(9657),
                    d = n(8940),
                    h = ["cookies", "data", "headers", "method", "query_string", "url"],
                    m = ["id", "username", "email"];

                function f(e, t) {
                    const n = {};
                    return (Array.isArray(t) ? t : m).forEach(t => {
                        e && t in e && (n[t] = e[t]);
                    }), n;
                }

                function g(e, t = {}) {
                    const {
                        include: n = h
                    } = t, o = {
                        method: c,
                        url: f,
                        cookies: e.cookies || i.cookie && r.parseCookie(i.cookie) || {},
                        query_string: function(e) {
                            let t = e.originalUrl || e.url || "";
                            if (t) {
                                t.startsWith("/") && (t = `http://dogs.are.great${t}`);
                                try {
                                    const n = e.query || new URL(t).search.slice(1);
                                    return n.length ? n : undefined;
                                } catch (e) {
                                    return;
                                }
                            }
                        }(e)
                    }, i = e.headers || {}, c = e.method, u = i.host || e.hostname || e.host || "<no host>", p = "https" === e.protocol || e.socket && e.socket.encrypted ? "https" : "http", m = e.originalUrl || e.url || "", f = m.startsWith(p) ? m : `${p}://${u}${m}`;
                    return n.forEach(t => {
                        switch (t) {
                            case "headers":
                                o.headers = i, n.includes("cookies") || delete o.headers.cookie, n.includes("ip") || d.ipHeaderNames.forEach(e => {
                                    delete o.headers[e];
                                });
                                break;
                            case "method":
                                ;
                                break;
                            case "url":
                                ;
                                break;
                            case "cookies":
                                ;
                                break;
                            case "query_string":
                                ;
                                break;
                            case "data": {
                                if ("GET" === c || "HEAD" === c) {
                                    break;
                                }
                                const t = e.body;
                                if (undefined !== t) {
                                    const e = s.isString(t) ? t : s.isPlainObject(t) ? JSON.stringify(a.normalize(t)) : l.truncate(`${t}`, 1024);
                                    e && (o.data = e);
                                }
                                break;
                            }
                            default:
                                ({}.hasOwnProperty.call(e, t) && (o[t] = e[t]));
                        }
                    }), o;
                }

                function _(e) {
                    const t = {
                        DEFAULT_USER_INCLUDES: m,
                        addNormalizedRequestDataToEvent: function(e, t, n, o) {
                            const i = {
                                ...p,
                                ...o && o.include
                            };
                            if (i.request) {
                                const n = Array.isArray(i.request) ? [...i.request] : [...h];
                                i.ip && n.push("ip");
                                const o = function(e, {
                                    include: t
                                }) {
                                    const n = t ? Array.isArray(t) ? t : h : [],
                                        o = {
                                            cookies: t || {}
                                        },
                                        s = {
                                            ...e.headers
                                        };
                                    if (n.includes("headers") && (o.headers = s, t.includes("cookies") || delete s.cookie, t.includes("ip") || d.ipHeaderNames.forEach(e => {
                                            delete s[e];
                                        })), n.includes("method") && (o.method = e.method), n.includes("url") && (o.url = e.url), n.includes("cookies")) {
                                        const t = e.cookies || (s && s.cookie ? r.parseCookie(s.cookie) : undefined);;
                                    }
                                    return n.includes("query_string") && (o.query_string = e.query_string), n.includes("data") && (o.data = e.data), o;
                                }(t, {
                                    include: n
                                });
                                e.request = {
                                    ...e.request,
                                    ...o
                                };
                            }
                            if (i.user) {
                                const t = n.user && s.isPlainObject(n.user) ? f(n.user, i.user) : {};
                                Object.keys(t).length && (e.user = {
                                    ...e.user,
                                    ...t
                                });
                            }
                            if (i.ip) {
                                const r = t.headers && d.getClientIPAddress(t.headers) || n.ipAddress;
                                r && (e.user = {
                                    ...e.user,
                                    ip_address: r
                                });
                            }
                        },
                        addRequestDataToEvent: function(e, t, n) {
                            const r = {
                                ...p,
                                ...n && n.include
                            };
                            if (r.request) {
                                const n = Array.isArray(r.request) ? [...r.request] : [...h];
                                r.ip && n.push("ip");
                                const o = g(t, {
                                    include: n
                                });
                                e.request = {
                                    ...e.request,
                                    ...o
                                };
                            }
                            if (r.user) {
                                const n = t.user && s.isPlainObject(t.user) ? f(t.user, r.user) : {};
                                Object.keys(n).length && (e.user = {
                                    ...e.user,
                                    ...n
                                });
                            }
                            if (r.ip) {
                                const n = t.headers && d.getClientIPAddress(t.headers) || t.ip || t.socket && t.socket.remoteAddress;
                                n && (e.user = {
                                    ...e.user,
                                    ip_address: n
                                });
                            }
                            return e;
                        },
                        extractPathForTransaction: function(e, t = {}) {
                            const n = e.method && e.method.toUpperCase();
                            let r = "",
                                o = "url";
                            t.customRoute || e.route ? (r = t.customRoute || `${e.baseUrl || ""}${e.route && e.route.path}`, o = "route") : (e.originalUrl || e.url) && (r = u.stripUrlQueryAndFragment(e.originalUrl || e.url || ""));
                            let s = "";
                            return t.method && n && (s += n), t.method && t.path && (s += " "), t.path && r && (s += r), [s, o];
                        },
                        extractQueryParamsFromUrl: S,
                        extractRequestData: g,
                        headersToDict: y,
                        httpRequestToRequestData: function(e) {
                            const t = e.headers || {},
                                n = t.host || "<no host>",
                                r = e.socket && e.socket.encrypted ? "https" : "http",
                                o = e.url || "",
                                s = o.startsWith(r) ? o : `${r}://${n}${o}`,
                                i = e.body || undefined,
                                a = e.cookies;
                            return c.dropUndefinedKeys({
                                url: s,
                                method: e.method,
                                query_string: S(o),
                                headers: y(t),
                                cookies: a,
                                data: i
                            });
                        },
                        winterCGHeadersToDict: _,
                        winterCGRequestToRequestData: function(e) {
                            const t = _(e.headers);
                            return {
                                method: e.method,
                                url: e.url,
                                query_string: S(e.url),
                                headers: t
                            };
                        }
                    };
                    try {
                        e.forEach((e, n) => {
                            "string" == typeof e && (t[n] = e);
                        });
                    } catch (e) {
                        o.DEBUG_BUILD && i.logger.warn("Sentry failed extracting headers from a request object. If you see this, please file an issue.");
                    }
                    return t;
                }

                function y(e) {
                    const t = Object.create(null);
                    try {
                        Object.entries(e).forEach(([e, n]) => {
                            "string" == typeof n && (t[e] = n);
                        });
                    } catch (e) {
                        o.DEBUG_BUILD && i.logger.warn("Sentry failed extracting headers from a request object. If you see this, please file an issue.");
                    }
                    return t;
                }

                function S(e) {
                    if (e) {
                        try {
                            const t = new URL(e, "http://dogs.are.great").search.slice(1);
                            return t.length ? t : undefined;
                        } catch (e) {
                            return;
                        }
                    }
                };;;;;;;;;;;
            },
            3389: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const n = ["fatal", "error", "warning", "log", "info", "debug"];;;;
            },
            8051: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;

                function o(...e) {
                    const t = e.sort((e, t) => e[0] - t[0]).map(e => e[1]);
                    return (e, r = 0, o = 0) => {
                        const i = [],
                            a = e.split("\n");
                        for (let e = r; e < a.length; e++) {
                            const r = a[e];
                            if (r.length > 1024) {
                                continue;
                            }
                            const s = /\(error: (.*)\)/.test(r) ? r.replace(/\(error: (.*)\)/, "$1") : r;
                            if (!s.match(/\S*Error: /)) {
                                for (const e of t) {
                                    const t = e(s);
                                    if (t) {
                                        i.push(t);
                                        break;
                                    }
                                }
                                if (i.length >= 50 + o) {
                                    break;
                                }
                            }
                        }
                        return s(i.slice(o));
                    };
                }

                function s(e) {
                    if (!e.length) {
                        return [];
                    }
                    const t = Array.from(e);
                    return /sentryWrapped/.test((t[t.length - 1] || {}).function || "") && t.pop(), t.reverse(), /captureMessage|captureException/.test((t[t.length - 1] || {}).function || "") && (t.pop(), /captureMessage|captureException/.test((t[t.length - 1] || {}).function || "") && t.pop()), t.slice(0, 50).map(e => ({
                        ...e,
                        filename: e.filename || (t[t.length - 1] || {}).filename,
                        function: e.function || "?"
                    }));
                };;;;;;;;
            },
            3591: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478);

                function o(e, t, n = false) {
                    return !!r.isString(e) && (r.isRegExp(t) ? t.test(e) : !!r.isString(t) && (n ? e === t : e.includes(t)));
                };;;;;;
            },
            1002: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8950),
                    o = n(3910),
                    s = n(4987).GLOBAL_OBJ;

                function i() {
                    if (!("fetch" in s)) {
                        return false;
                    }
                    try {
                        return new Headers, new Request("http://www.example.com"), new Response, true;
                    } catch (e) {
                        return false;
                    }
                };;;;;;;;;
            },
            7120: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478);
                var o;
                ! function(e) {
                    e[e.PENDING = 0] = "PENDING";
                    e[e.RESOLVED = 1] = "RESOLVED";
                    e[e.REJECTED = 2] = "REJECTED";;
                }(o || (o = {}));
                class s {
                    constructor(e) {
                        s.prototype.__init.call(this);
                        s.prototype.__init2.call(this);
                        s.prototype.__init3.call(this);
                        s.prototype.__init4.call(this);
                        this._state = o.PENDING;
                        this._handlers = [];;
                        try {
                            e(this._resolve, this._reject);
                        } catch (e) {
                            this._reject(e);
                        }
                    }
                    then(e, t) {
                        return new s((n, r) => {
                            this._handlers.push([false, t => {
                                if (e) {
                                    try {
                                        n(e(t));
                                    } catch (e) {
                                        r(e);
                                    }
                                } else {
                                    n(t);
                                }
                            }, e => {
                                if (t) {
                                    try {
                                        n(t(e));
                                    } catch (e) {
                                        r(e);
                                    }
                                } else {
                                    r(e);
                                }
                            }]);
                            this._executeHandlers();;
                        });
                    }
                    catch (e) {
                        return this.then(e => e, e);
                    } finally(e) {
                        return new s((t, n) => {
                            let r, o;
                            return this.then(t => {
                                o = false;
                                r = t;
                                e && e();;
                            }, t => {
                                o = true;
                                r = t;
                                e && e();;
                            }).then(() => {
                                o ? n(r) : t(r);
                            });
                        });
                    }
                    __init() {
                        this._resolve = e => {
                            this._setResult(o.RESOLVED, e);
                        };
                    }
                    __init2() {
                        this._reject = e => {
                            this._setResult(o.REJECTED, e);
                        };
                    }
                    __init3() {
                        this._setResult = (e, t) => {
                            this._state === o.PENDING && (r.isThenable(t) ? t.then(this._resolve, this._reject) : (this._state = e, this._value = t, this._executeHandlers()));
                        };
                    }
                    __init4() {
                        this._executeHandlers = () => {
                            if (this._state === o.PENDING) {
                                return;
                            }
                            const e = this._handlers.slice();
                            this._handlers = [];
                            e.forEach(e => {
                                e[0] || (this._state === o.RESOLVED && e[1](this._value), this._state === o.REJECTED && e[2](this._value), e[0] = true);
                            });;
                        };
                    }
                };;;;
            },
            8587: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4987);
                const s = function() {
                    const {
                        performance: e
                    } = r.GLOBAL_OBJ;
                    if (!e || !e.now) {
                        return o;
                    }
                    const t = Date.now() - e.now(),
                        n = null == e.timeOrigin ? t : e.timeOrigin;
                    return () => (n + e.now()) / 1e3;
                }();;
                const i = (() => {
                    const {
                        performance: e
                    } = r.GLOBAL_OBJ;
                    if (!e || !e.now) {
                        return void(t._browserPerformanceTimeOriginMode = "none");
                    }
                    const o = e.now(),
                        s = Date.now(),
                        i = e.timeOrigin ? Math.abs(e.timeOrigin + o - s) : 36e5,
                        a = i < 36e5,
                        c = e.timing && e.timing.navigationStart,
                        l = "number" == typeof c ? Math.abs(c + o - s) : 36e5;
                    return a || l < 36e5 ? i <= l ? (t._browserPerformanceTimeOriginMode = "timeOrigin", e.timeOrigin) : (t._browserPerformanceTimeOriginMode = "navigationStart", c) : (t._browserPerformanceTimeOriginMode = "dateNow", s);
                })();;;;;
            },
            4890: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8558),
                    o = n(2322),
                    s = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");

                function i(e) {
                    if (!e) {
                        return;
                    }
                    const t = e.match(s);
                    if (!t) {
                        return;
                    }
                    let n;
                    return "1" === t[3] ? n = true : "0" === t[3] && (n = false), {
                        traceId: t[1],
                        parentSampled: n,
                        parentSpanId: t[2]
                    };
                };;;;;
            },
            9657: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;;;;
            },
            2123: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            8940: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const n = ["X-Client-IP", "X-Forwarded-For", "Fly-Client-IP", "CF-Connecting-IP", "Fastly-Client-Ip", "True-Client-Ip", "X-Real-IP", "X-Cluster-Client-IP", "X-Forwarded", "Forwarded-For", "Forwarded", "X-Vercel-Forwarded-For"];;;;
            },
            3423: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4987).GLOBAL_OBJ;;
            },
            306: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4987);;
            },
            9572: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            4987: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9572),
                    o = globalThis;;;;
            },
            5013: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(3754);
                n(9572);
                n(8950);
                n(3910);;
                const o = n(2093);
                n(8587);
                n(7120);;
                const s = n(9090),
                    i = n(4583);

                function a(e, t, n) {
                    e[t] = s.merge(e[t], n, 1);
                };;;;
            },
            6354: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(4478);;
            },
            73: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9564);;
            },
            6877: (e, t) => {
                function n(e) {
                    return "/" === e[e.length - 1] ? e.slice(0, -1) : e;
                }
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            9090: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            145: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(647);;
            },
            2979: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });;;
            },
            393: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(8974),
                    o = n(3910);;
            },
            1485: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2501),
                    o = n(9564),
                    s = n(1929),
                    i = n(9640),
                    a = n(4008),
                    c = n(2322),
                    l = n(6507),
                    u = n(3591),
                    d = n(8587),
                    p = n(5013);

                function h(e, t) {
                    const n = a.getFilenameToDebugIdMap(t);
                    try {
                        e.exception.values.forEach(e => {
                            e.stacktrace.frames.forEach(e => {
                                e.filename && (e.debug_id = n[e.filename]);
                            });
                        });
                    } catch (e) {}
                }

                function m(e) {
                    const t = {
                        applyDebugIds: h,
                        applyDebugMeta: m,
                        parseEventHintOrCaptureContext: function(e) {
                            if (e) {
                                return function(e) {
                                    return e instanceof i.Scope || "function" == typeof e;
                                }(e) || function(e) {
                                    return Object.keys(e).some(e => g.includes(e));
                                }(e) ? {
                                    captureContext: e
                                } : e;
                            }
                        },
                        prepareEvent: function(e, t, n, i, a, g) {
                            const {
                                normalizeDepth: _ = 3,
                                normalizeMaxBreadth: y = 1e3
                            } = e, S = {
                                ...t,
                                event_id: t.event_id || n.event_id || c.uuid4(),
                                timestamp: t.timestamp || d.dateTimestampInSeconds()
                            }, v = n.integrations || e.integrations.map(e => e.name);
                            ! function(e, t) {
                                const {
                                    environment: n,
                                    release: o,
                                    dist: s,
                                    maxValueLength: i = 250
                                } = t;
                                "environment" in e || (e.environment = "environment" in t ? n : r.DEFAULT_ENVIRONMENT);
                                undefined === e.release && undefined !== o && (e.release = o);
                                undefined === e.dist && undefined !== s && (e.dist = s);
                                e.message && (e.message = u.truncate(e.message, i));;
                                const a = e.exception && e.exception.values && e.exception.values[0];
                                a && a.value && (a.value = u.truncate(a.value, i));
                                const c = e.request;
                                c && c.url && (c.url = u.truncate(c.url, i));
                            }(S, e);
                            (function(e, t) {
                                if (t.length > 0) {
                                    e.sdk = e.sdk || {};
                                    e.sdk.integrations = [...e.sdk.integrations || [], ...t];
                                }
                            }(S, v));
                            a && a.emit("applyFrameMetadata", t);
                            undefined === t.type && h(S, e.stackParser);;
                            const b = f(i, n.captureContext);
                            n.mechanism && c.addExceptionMechanism(S, n.mechanism);
                            const E = a ? a.getEventProcessors() : [],
                                T = o.getGlobalScope().getScopeData();
                            if (g) {
                                const e = g.getScopeData();
                                p.mergeScopeData(T, e);
                            }
                            if (b) {
                                const e = b.getScopeData();
                                p.mergeScopeData(T, e);
                            }
                            const I = [...n.attachments || [], ...T.attachments];
                            I.length && (n.attachments = I);
                            p.applyScopeDataToEvent(S, T);;
                            const C = [...E, ...T.eventProcessors];
                            return s.notifyEventProcessors(C, S, n).then(e => (e && m(e), "number" == typeof _ && _ > 0 ? function(e, t, n) {
                                if (!e) {
                                    return null;
                                }
                                const r = {
                                    ...e,
                                    ...e.breadcrumbs && {
                                        breadcrumbs: e.breadcrumbs.map(e => ({
                                            ...e,
                                            ...e.data && {
                                                data: l.normalize(e.data, t, n)
                                            }
                                        }))
                                    },
                                    ...e.user && {
                                        user: l.normalize(e.user, t, n)
                                    },
                                    ...e.contexts && {
                                        contexts: l.normalize(e.contexts, t, n)
                                    },
                                    ...e.extra && {
                                        extra: l.normalize(e.extra, t, n)
                                    }
                                };
                                return e.contexts && e.contexts.trace && r.contexts && (r.contexts.trace = e.contexts.trace, e.contexts.trace.data && (r.contexts.trace.data = l.normalize(e.contexts.trace.data, t, n))), e.spans && (r.spans = e.spans.map(e => ({
                                    ...e,
                                    ...e.data && {
                                        data: l.normalize(e.data, t, n)
                                    }
                                }))), r;
                            }(e, _, y) : e));
                        }
                    };
                    try {
                        e.exception.values.forEach(e => {
                            e.stacktrace.frames.forEach(e => {
                                e.debug_id && (e.abs_path ? t[e.abs_path] = e.debug_id : e.filename && (t[e.filename] = e.debug_id), delete e.debug_id);
                            });
                        });
                    } catch (e) {}
                    if (0 === Object.keys(t).length) {
                        return;
                    }
                    e.debug_meta = e.debug_meta || {};
                    e.debug_meta.images = e.debug_meta.images || [];;
                    const n = e.debug_meta.images;
                    Object.entries(t).forEach(([e, t]) => {
                        n.push({
                            type: "sourcemap",
                            code_file: e,
                            debug_id: t
                        });
                    });
                }

                function f(e, t) {
                    if (!t) {
                        return e;
                    }
                    const n = e ? e.clone() : new i.Scope;
                    return n.update(t), n;
                }
                const g = ["user", "level", "extra", "contexts", "tags", "fingerprint", "requestSession", "propagationContext"];;;;;;
            },
            5303: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(9572);;
            },
            4865: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2093);;;;
            },
            4583: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2810),
                    o = n(3220),
                    s = n(9564),
                    i = n(4021),
                    a = n(2751),
                    c = n(5363),
                    l = n(2093),
                    u = n(8587),
                    d = n(4890),
                    p = n(4865);

                function h(e) {
                    return "number" == typeof e ? m(e) : Array.isArray(e) ? e[0] + e[1] / 1e9 : e instanceof Date ? m(e.getTime()) : u.timestampInSeconds();
                }

                function m(e) {
                    return e > 9999999999 ? e / 1e3 : e;
                }

                function f(e) {
                    if (function(e) {
                            return "function" == typeof e.getSpanJSON;
                        }(e)) {
                        return e.getSpanJSON();
                    }
                    try {
                        const {
                            spanId: t,
                            traceId: n
                        } = e.spanContext();
                        if (function(e) {
                                const t = e;
                                return !!(t.attributes && t.startTime && t.name && t.endTime && t.status);
                            }(e)) {
                            const {
                                attributes: r,
                                startTime: o,
                                name: s,
                                endTime: c,
                                parentSpanId: u,
                                status: d
                            } = e;
                            return l.dropUndefinedKeys({
                                span_id: t,
                                trace_id: n,
                                data: r,
                                description: s,
                                parent_span_id: u,
                                start_timestamp: h(o),
                                timestamp: h(c) || undefined,
                                status: _(d),
                                op: r[a.SEMANTIC_ATTRIBUTE_SENTRY_OP],
                                origin: r[a.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
                                _metrics_summary: i.getMetricSummaryJsonForSpan(e)
                            });
                        }
                        return {
                            span_id: t,
                            trace_id: n
                        };
                    } catch (e) {
                        return {};
                    }
                }

                function g(e) {
                    const {
                        traceFlags: t
                    } = e.spanContext();
                    return 1 === t;
                }

                function _(e) {
                    if (e && e.code !== c.SPAN_STATUS_UNSET) {
                        return e.code === c.SPAN_STATUS_OK ? "ok" : e.message || "unknown_error";
                    }
                };

                function v() {
                    const e = o.getMainCarrier(),
                        t = r.getAsyncContextStrategy(e);
                    return t.getActiveSpan ? t.getActiveSpan() : p._getSpanForScope(s.getCurrentScope());
                };;;;;;;;;;;;;;;;
            },
            647: (e, t, n) => {
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                const r = n(2810),
                    o = n(3220),
                    s = n(9564),
                    i = n(9183);
                n(4038);
                n(9572);
                n(8950);;
                const a = n(3910);
                n(8974);
                n(8587);;
                const c = n(4583),
                    l = n(4890),
                    u = n(3754),
                    d = n(8558);

                function p(e) {
                    if (!e || !e.length) {
                        return false;
                    };
                    return new RegExp(`^${"[-!#$%&'*+.^_`|~A-Za-z0-9]+"}${"\\s*"}=${"\\s*"}${"[!#-+-./0-9:<=>?@A-Z\\[\\]a-z{-}]+"}(${"\\s*"},${"\\s*"}${"[-!#$%&'*+.^_`|~A-Za-z0-9]+"}${"\\s*"}=${"\\s*"}${"[!#-+-./0-9:<=>?@A-Z\\[\\]a-z{-}]+"})*$`).test(e);
  }
  ;
  ;
  ;
}, 2841: (e, t) => {
  "use strict";
  var n;
  Object.defineProperty(t, "__esModule", {value: true});
  ;
  (n = t.EVerdictAction || (t.EVerdictAction = {}))[n.BLOCK = 0] = "BLOCK";
  n[n.ALLOW = 1] = "ALLOW";
  ;
}, 8436: (e, t) => {
  "use strict";
  var n;
  Object.defineProperty(t, "__esModule", {value: true});
  ;
  (n = t.ContentScriptMessageType || (t.ContentScriptMessageType = {})).ASYNC_VERDICT = "ASYNC_VERDICT";
  ;
  ;
}, 5333: (e, t) => {
  "use strict";
  var n, r, o, s, i, a, c, l, u, d, p, h, m, f, g, _, y, S, v, b, E, T, I;
  Object.defineProperty(t, "__esModule", {value: true});
  ;
  (I = t.UpdaterConstants || (t.UpdaterConstants = {})).FcmMessagesCacheId = "lw_updater_fcm_messages_cache_id";
  I.GeneralCacheId = "lw_updater_general_cache_id";
  I.RegistrationCacheId = "lw_updater_registration_cache";
  (T = t.DMSManagerConstants || (t.DMSManagerConstants = {})).DmsDataCacheId = "lw_dms_data_cache";
  T.DmsManagerConfigCacheId = "lw_dms_manager_config_cache";
  T.CheckInDeviceInterval = "lw_dms_check_in";
  T.RetryDMSRegTimeout = "lw_retry_dms_registration_timeout";
  T[T.CheckInDeviceElapsed_ms = 3e5] = "CheckInDeviceElapsed_ms";
  (E = t.FzboxConstants || (t.FzboxConstants = {}))[E.WalledGardenBasedInterval = 3e4] = "WalledGardenBasedInterval";
  E[E.DefaultPollingInterval = 3e5] = "DefaultPollingInterval";
  (t.KeepAliveConstants || (t.KeepAliveConstants = {})).KeepAliveCacheId = "lw_keep_alive_cache_id";
  (t.FirestoreDocIds || (t.FirestoreDocIds = {})).ContentAware = "ca";
  (b = t.FilteringConstants || (t.FilteringConstants = {})).HandleVerdictQueueInterval = "lw_handle_verdict_queue_interval";
  b.EvictOldResponsesInterval = "lw_evict_old_responses";
  b.VerdictRawResponseCacheId = "lw_verdict_raw_response_cache";
  b.FallbackVerdictsCacheId = "lw_fallback_verdicts_cache";
  b.VerdictResponseTimeCacheId = "verdict_response_time_cache";
  b.VerdictYoutubeQueryCacheId = "verdict_youtube_query_cache";
  b.VerdictClientFallback = "client_fallback";
  b.CustomHeaderCacheId = "lw_custom_header_cache";
  b.CustomHeaderCacheCleanIntervalId = "lw_custom_header_cache_interval_id";
  b[b.CustomHeaderCacheCleanInterval = 3e5] = "CustomHeaderCacheCleanInterval";
  b[b.CustomHeaderCacheExpireTime = 36e5] = "CustomHeaderCacheExpireTime";
  (t.FallbackVerdictStoreConstants || (t.FallbackVerdictStoreConstants = {})).PurgeOldVerdictEntries = "purge_old_verdict_entries";
  (v = t.VerdictStoreConstants || (t.VerdictStoreConstants = {})).EvictOldResponsesInterval = "lw_evict_old_responses";
  v.VerdictResponseCacheId = "lw_verdict_response_cache";
  (S = t.ConfigConstants || (t.ConfigConstants = {})).ConfigurationCacheId = "lw_configuration_cache";
  S[S.ConfigLoadTimeout_ms = 1e4] = "ConfigLoadTimeout_ms";
  S[S.ConfigFetchInitialInterval = 1e3] = "ConfigFetchInitialInterval";
  S[S.ConfigFetchMaxInterval = 3e4] = "ConfigFetchMaxInterval";
  S[S.ConfigFetchMaxElapsedTime = 9e4] = "ConfigFetchMaxElapsedTime";
  S[S.ConfigFetchRandomizationFactor = 0.1] = "ConfigFetchRandomizationFactor";
  S[S.ConfigFetchMultiplier = 3] = "ConfigFetchMultiplier";
  (y = t.ChatConstants || (t.ChatConstants = {})).ChatDataCacheId = "lw_chat_data_cache";
  y.OpenChatTimeout = "lw_open_chat_timeout";
  (t.ConfigFetcherConstants || (t.ConfigFetcherConstants = {})).ClassConfigRefreshTimeout = "lw_class_config_refresh";
  (_ = t.TabsConstants || (t.TabsConstants = {})).FocusLockCheckTimeout = "lw_tabs_focuslock_check";
  _.ScreenshotUploadInterval = "lw_screenshot_upload_interval";
  _.TabsDataCacheId = "lw_tabs_data_cache";
  (g = t.MainConstants || (t.MainConstants = {})).PeriodicLoginInterval = "lw_periodic_login";
  g.WhoamiLoginInterval = "lw_whoami_login";
  g.FzboxPollInterval = "lw_fzbox_poll";
  g.PeriodicLogsUploadInterval = "lw_periodic_logs_upload_interval";
  g.MainDataCacheId = "lw_main_data_cache";
  g.DevDataCacheId = "lw_dev_data_cache";
  g.LoadingConfiKey = "lw_loading_config_key";
  g.ConfigUpdateBackoffRetryStateKey = "lw_config_update_backoff_retry_state_key";
  g.RemainingUpdatesKey = "lw_remaining_updates_key";
  g.DevBuildReloadedKey = "lw_dev_build_reloaded_key";
  g[g.ResourceLimitThresholdCheckInterval = 72e5] = "ResourceLimitThresholdCheckInterval";
  (f = t.CompanionConstants || (t.CompanionConstants = {})).CacheId = "lw_companion_cache";
  f[f.MaxReconnectionAttempts = 5] = "MaxReconnectionAttempts";
  f[f.DeltaTimeout = 5e3] = "DeltaTimeout";
  f[f.MaxRetryRegistrationInterval_ms = 3e4] = "MaxRetryRegistrationInterval_ms";
  (t.SystemConfigConstants || (t.SystemConfigConstants = {})).CacheId = "lw_system_config_cache";
  (m = t.DelegationConstants || (t.DelegationConstants = {})).CacheId = "lw_delegation_config_cache";
  m.DelegationChangeScheduleId = "lw_delegation_change_schedule_id";
  (h = t.DelegationReporting || (t.DelegationReporting = {})).ALL = "all";
  ;
  ;
  (t.ContentAwareConstants || (t.ContentAwareConstants = {})).CacheId = "lw_content_aware_config_cache";
  (p = t.ContentAwareIECMessageTypes || (t.ContentAwareIECMessageTypes = {})).login = "LOGIN";
  ;
  ;
  ;
  ;
  (d = t.ContentAwareLicenseStatus || (t.ContentAwareLicenseStatus = {})).active = "ACTIVE";
  ;
  (u = t.AuthenticateConstants || (t.AuthenticateConstants = {})).PartialFailedCacheId = "lw_partial_failed_cache";
  u.AuthenticationData = "lw_authentication_data_cache";
  u.AuthTokenKey = "auth_token";
  (l = t.ConnectionsConstants || (t.ConnectionsConstants = {})).ConnectionsCacheId = "lw_connections_cache";
  l.ConnectionsUploadInterval = "lw_Connections_upload_interval";
  l.TabsCacheId = "lw_tabs_cache";
  l.UploadInfoCacheId = "lw_upload_info_cache";
  l.mainFrameRequestType = "main_frame";
  l.eventTypeSendHeaders = "sendHeaders";
  l.eventTypeBeforeRequest = "beforeRequest";
  l.eventTypeHeadersReceived = "headersReceived";
  l.eventTypeCompleted = "completed";
  (t.ScreenshotPersisterConstants || (t.ScreenshotPersisterConstants = {})).LastScreenshotCacheId = "last_screenshot_cache";
  (t.SchedulesConstants || (t.SchedulesConstants = {})).SchedulesDataCacheId = "lw_schedule_manager_data_cache_id";
  (c = t.UniqueScheduleIds || (t.UniqueScheduleIds = {})).ConfigUpdate = "config_update_with_delay";
  ;
  ;
  ;
  ;
  ;
  (a = t.EventTypes || (t.EventTypes = {})).CONFIG_UPDATE = "CONFIG_UPDATE";
  a.OPEN_TAB = "OPEN_TAB";
  a.CLOSE_TAB = "CLOSE_TAB";
  a.MESSAGE = "MESSAGE";
  a.CLASS_STARTED = "CLASS_STARTED";
  a.POLICY_UPDATE = "POLICY_UPDATE";
  a.INIT_P2P = "INIT_P2P";
  (i = t.LogLevelTypes || (t.LogLevelTypes = {})).Error = "logging__error";
  ;
  ;
  ;
  (s = t.LogLevel || (t.LogLevel = {})).INFO = "INFO";
  ;
  ;
  ;
  (o = t.MessageTypes || (t.MessageTypes = {})).InitOffscreenDocument = "init_offscreen_socument_message";
  o.RegisterExtension = "register_extension_with_native_agent";
  o.UnregisterExtension = "unregister_extension_from_native_agent";
  o.RegisterClasswizeEventFail = "register_extension_with_native_agent_classwize_events_fail";
  o.RegisterClasswizeEventMessage = "register_extension_with_native_agent_classwize_events_Message";
  o.IsExtensionRegistered = "is_extension_registered_with_native_agent";
  o.CompanionMessage = "message_from_native_agent";
  o.CompanionErrorMessage = "error_message_from_native_agent";
  o.RecoverCompanionStream = "recover_companion_stream";
  o.RetryRegistration = "retry_registration_with_native_agent";
  o.IpAddressChangeRoutine = "ip_address_change_routine";
  o.TabsActivated = "tabs_activated_message";
  o.UrlUpdatedInTab = "url_updated_in_tab";
  o.P2PInitSignaler = "p2p_init_signaler_message";
  o.P2PSetCloseTimeouts = "p2p_set_close_timeouts_message";
  o.P2PGetScreenshot = "p2p_get_screenshot_message";
  o.P2PGetTabs = "p2p_get_tabs_message";
  o.UtilLocalIpUpdated = "util_local_ip_updated_message";
  o.UtilResizeAndCompressImage = "util_resize_and_compress_image";
  o.BroadcastWakeUpCall = "cachescheduler_broadcast_wakeup_call";
  o.BroadcastScheduleTime = "schedule-time-ee236fce-1426-4975-9d56-2ce4e8becd02";
  o.ChatBubbleStatus = "chat_status";
  o.ChatInfo = "chat_info";
  o.ChatGetLastMessage = "last_chat_message";
  o.ChatClearLastMessage = "clear_last_chat_message";
  o.UIGetStatus = "ui_get_status";
  o.UIReloadConfig = "ui_reload_config";
  o.UISendLogs = "ui_send_logs";
  o.UserOverride = "user_override";
  o.UpdaterNewMessage = "updater_new_message";
  o.GetSafeguardVerdict = "get_safe_guard_verdict";
  o.RedirectWebPage = "redirect_web_page";
  o.EventMessage = "event_service_message";
  o.InitAutoAuth = "init_auto_auth";
  o.GetAuthCookie = "get_auth_cookie";
  o.GetAuthToken = "get_auth_token";
  o.UploadLogData = "upload_log_data";
  o.UpdateOffscreenConfig = "update_offscreen_config";
  o.MainConfigUpdated = "main_config_updated";
  o.OffScreenLogMessage = "Off_screen_log_message";
  o.GetManifestInfo = "get_manifest_info";
  o.Token = "TOKEN";
  o.ChatConfigUpdate = "CHAT_CONFIG_UPDATE";
  o.UpdateTotalUnreadCount = "UPDATE_TOTAL_UNREAD_COUNT";
  o.OpenChatClassroom = "OPEN_CHAT_CLASSROOM";
  o.GoogleAuthenticate = "GOOGLE_AUTHENTICATE";
  o.NativeTokenAuthenticate = "NATIVE_TOKEN_AUTHENTICATE";
  o.GetBrowserType = "get_browser_type";
  o.GetBrowserDetails = "get_browser_details";
  o.CheckIfDomainIsBlocked = "check_if_domain_is_blocked";
  o.ExtractFallbackDomains = "extract_fallback_domains";
  o.LogMessage = "log_message";
  o.InitOffscreenOpenTelemetry = "init-offscreen-opentelemetry";
  o.SentryGetUserDetails = "sentry-get-user-details";
  o.ChatLogMessage = "chat-log-message";
  o.ReloadPopUp = "reload-popup";
  o.PopupIsReloading = "popup-is-reloading";
  o.PopupIsNotReloading = "popup-is-not-reloading";
  (r = t.CompanionFeatures || (t.CompanionFeatures = {})).companion = "companion";
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  (n = t.BrowserTypes || (t.BrowserTypes = {})).chrome = "chrome";
  ;
  ;
}, 2790: function (e, t, n) {
  "use strict";
  var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) {
    undefined === r && (r = n);
    var o = Object.getOwnPropertyDescriptor(t, n);
    o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = {enumerable: true, get: function () {
      return t[n];
    }});
    Object.defineProperty(e, r, o);
    ;
  } : function (e, t, n, r) {
    undefined === r && (r = n);
    e[r] = t[n];
    ;
  }), o = this && this.__setModuleDefault || (Object.create ? function (e, t) {
    Object.defineProperty(e, "default", {enumerable: true, value: t});
  } : function (e, t) {
    e.default = t;
  }), s = this && this.__importStar || function (e) {
    if (e && e.__esModule) {
      return e;
    }
    var t = {sentryErrorEventHandler: t.updateSentryUserDetails = t.setSentryUserDetails = t.setPostInitRelease = t.getReleaseString = t.getExtensionDetails = t.logErrorInSentry = t.isExtensionError = t.InitSentry = t.InitSentryCoexist = t.sharedSentryConfig = undefined, sharedSentryConfig: {dsn: "https://c17cd3300c4e109ad958146b698040aa@o4507960794546176.ingest.us.sentry.io/4507960797102080", tracesSampleRate: 1, sampleRate: 1, ignoreErrors: ["Could not establish connection. Receiving end does not exist."]}, InitSentryCoexist: e => {
      const n = (0, t.getReleaseString)(e), r = (0, c.getDefaultIntegrations)({}).filter(e => !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(e.name)), o = {transport: a.makeFetchTransport, stackParser: a.defaultStackParser, integrations: r, release: n}, s = new c.BrowserClient(Object.assign(Object.assign({}, t.sharedSentryConfig), o));
      u = new c.Scope;
      u.setClient(s);
      s.init();
      ;
    }, InitSentry: e => {
      const n = (0, t.getReleaseString)(e);
      a.init(Object.assign(Object.assign({}, t.sharedSentryConfig), {release: n}));
    }, isExtensionError: e => {
      const t = `chrome-extension://${chrome.runtime.id}/`;
                        return e.includes(t);
                    }, logErrorInSentry: e => u ? u.captureException(e) : a.captureException(e), getExtensionDetails: () => {
                        var e;
                        if (undefined === (null === (e = null === chrome || undefined === chrome ? undefined : chrome.runtime) || undefined === e ? undefined : e.getManifest)) {
                            return;
                        }
                        const t = chrome.runtime.getManifest();
                        return {
                            extensionVersion: t.version,
                            extensionName: t.name,
                            buildENV: "production"
                        };
                    }, getReleaseString: e => {
                        var t;
                        if (!(e && e.extensionVersion && e.extensionName && e.buildENV)) {
                            return;
                        }
                        const n = null == e ? undefined : e.extensionVersion,
                            r = null === (t = null == e ? undefined : e.extensionName) || undefined === t ? undefined : t.toLowerCase().replace(/ /g, "-");
                        let o = "prod";
                        return "development" === (null == e ? undefined : e.buildENV) && (o = "local-dev"), `${r}.${o}@${n}`;
                    }, setPostInitRelease: e => {
                        const n = (0, t.getReleaseString)(e),
                            r = e => (e.release = n, e);
                        a.getGlobalScope().addEventProcessor(r);
                        a.getCurrentScope().addEventProcessor(r);
                        a.addEventProcessor(r);;
                    }, setSentryUserDetails: e => {
                        e.userIdentifier && e.applianceId && (u ? (u.setUser({
                            id: e.userIdentifier
                        }), u.setTag("applianceId", e.applianceId)) : (a.setUser({
                            id: e.userIdentifier
                        }), a.setTag("applianceId", e.applianceId)));
                    }, updateSentryUserDetails: function() {
                        return i(this, undefined, undefined, function*() {
                            chrome.runtime.sendMessage({
                                type: l.MessageTypes.SentryGetUserDetails
                            }, e => {
                                e && (0, t.setSentryUserDetails)(e);
                            });
                        });
                    }, sentryErrorEventHandler: function(e) {
                        e.error && (0, t.isExtensionError)(e.filename) && (0, t.logErrorInSentry)(e.error);
                    }
                };
                if (null != e) {
                    for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && r(t, e, n);
                }
                return o(t, e), t;
            },
            i = this && this.__awaiter || function(e, t, n, r) {
                return new(n || (n = Promise))(function(o, s) {
                    function i(e) {
                        try {
                            c(r.next(e));
                        } catch (e) {
                            s(e);
                        }
                    }

                    function a(e) {
                        try {
                            c(r.throw(e));
                        } catch (e) {
                            s(e);
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
                            e(t);
                        })).then(i, a);
                    }
                    c((r = r.apply(e, t || [])).next());
                });
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });;;
            const a = s(n(327)),
                c = n(327),
                l = n(5333);
            let u;;;;;;;;;;;;;
        },
        7477: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            const r = n(2790);;
        }, 8658: function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                return new(n || (n = Promise))(function(o, s) {
                    function i(e) {
                        try {
                            c(r.next(e));
                        } catch (e) {
                            s(e);
                        }
                    }

                    function a(e) {
                        try {
                            c(r.throw(e));
                        } catch (e) {
                            s(e);
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
                            e(t);
                        })).then(i, a);
                    }
                    c((r = r.apply(e, t || [])).next());
                });
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            const o = n(2790),
                s = new class {
                    constructor() {
                        this.maxPageHideAttempts = 5;
                        this.documentHiderId = "linewize-protect";
                        this.blockCounter = 0;;
                    }
                    tryHidingPage() {
                        return r(this, undefined, undefined, function*() {
                            return new Promise(e => {
                                window.requestAnimationFrame(() => r(this, undefined, undefined, function*() {
                                    try {
                                        yield this.hidePage.bind(this)();
                                        e();;
                                    } catch (t) {
                                        yield this.tryHidingPage.bind(this)();
                                        e();;
                                    }
                                }));
                            });
                        });
                    }
                    hidePage() {
                        return r(this, undefined, undefined, function*() {
                            return new Promise(e => {
                                this.blockCounter += 1;
                                this.blockCounter <= this.maxPageHideAttempts && !this.checkHiderIsStillPresent() ? (console.log("Hiding page content"), this.documentHider = document.createElement("div"), this.documentHider.style.position = "fixed", this.documentHider.style.width = "100%", this.documentHider.style.height = "100%", this.documentHider.style.zIndex = "2147483647", this.documentHider.style.background = "rgba(255,255,255,1)", this.documentHider.style.display = "block", this.documentHider.style.left = "0", this.documentHider.style.top = "0", this.documentHider.id = this.documentHiderId, document.body.appendChild(this.documentHider), console.log("Successfully hid page content")) : console.log("Hiding page content failed after the max page hide attemps");
                                e();;
                            });
                        });
                    }
                    unHidePage() {
                        console.log("Displaying page again");
                        try {
                            this.checkHiderIsStillPresent() && (this.documentHider.remove(), document.querySelectorAll(`[id=${this.documentHiderId}]`).forEach(e => e.remove()));
                        } catch (e) {
                            console.log("Failed to un-hide document", e);
                            try {
                                document.getElementById(this.documentHiderId).remove();
                            } catch (e) {
                                (0, o.logErrorInSentry)(e);
                                console.log("Failed to find element in document", e);;
                            }
                        }
                    }
                    checkHiderIsStillPresent() {
                        return !!(this.documentHider && this.documentHider.parentNode || document.getElementById(this.documentHiderId));
                    }
                };;
        }, 6032: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            class n {
                static checkPage() {
                    return this.checkTitle() || this.checkContent();
                }
                static checkTitle() {
                    return document.title.length > 0 && this.titleRegex.test(document.title);
                }
                static checkContent() {
                    const e = document.evaluate(this.contentQuery, document, null, XPathResult.ANY_TYPE, null).iterateNext();
                    if (e && e.textContent) {
                        const t = e.textContent.toLowerCase();
                        for (const e of this.contentKeywords)
                            if (-1 !== t.indexOf(e)) {
                                return true;
                            }
                    }
                    return false;
                }
            };;;;;
        }, 9344: function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, s) {
                        function i(e) {
                            try {
                                c(r.next(e));
                            } catch (e) {
                                s(e);
                            }
                        }

                        function a(e) {
                            try {
                                c(r.throw(e));
                            } catch (e) {
                                s(e);
                            }
                        }

                        function c(e) {
                            var t;
                            e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
                                e(t);
                            })).then(i, a);
                        }
                        c((r = r.apply(e, t || [])).next());
                    });
                },
                o = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                };
            Object.defineProperty(t, "__esModule", {
                value: true
            });;;
            const s = n(2841),
                i = n(2790),
                a = n(8436),
                c = n(5333),
                l = o(n(7477)),
                u = o(n(8658)),
                d = o(n(6032));
            class p {
                constructor() {
                    this.currentUrl = window.location.href;
                    this.connectedToInternet = undefined;
                    this.whitePageRemoveMs = 5500;;
                }
                init() {
                    return r(this, undefined, undefined, function*() {
                        window.location.href.includes("alwebctrl.polk-fl.net") || (console.log("Hiding page and executing checks to ensure it is safe to show"), yield u.default.tryHidingPage(), chrome.runtime.onMessage.addListener(e => {
                            e.type === c.MessageTypes.TabsActivated && this.getVerdictAndUnhide.bind(this).call();
                        }), chrome.runtime.onMessage.addListener(e => {
                            e.type === c.MessageTypes.UrlUpdatedInTab && this.currentUrl !== window.location.href && (this.currentUrl = window.location.href, this.getVerdictAndUnhide.bind(this, true).call());
                        }), chrome.runtime.onMessage.addListener((e, t, n) => {
                            if (e.type === c.MessageTypes.GetSafeguardVerdict) {
                                const t = window.top == window.self;
                                return this.documentLoadFallbackCheck().then(o => r(this, undefined, undefined, function*() {
                                    t && (o || (undefined === this.connectedToInternet && (this.connectedToInternet = yield this.sendRuntimeMessage({
                                        type: a.ContentScriptMessageType.CHECK_INTERNET_CONNECTION
                                    })), o = !this.connectedToInternet), n(o ? s.EVerdictAction.ALLOW : s.EVerdictAction.BLOCK));
                                    o || this.redirectToBlockPage(e.blockPageUrl);;
                                })), t;
                            }
                        }), this.getVerdictAndUnhide(true));
                    });
                }
                redirectToBlockPage(e) {
                    return r(this, undefined, undefined, function*() {
                        setTimeout(() => {
                            console.warn("Fallback check failed, redirecting to block page");
                            window.location.href = e;;
                        }, 500);
                    });
                }
                sendRuntimeMessage(e) {
                    return r(this, undefined, undefined, function*() {
                        return new Promise(t => {
                            chrome.runtime.sendMessage(e, e => {
                                t(e);
                            });
                        });
                    });
                }
                getVerdictAndUnhide(e = false) {
                    return r(this, undefined, undefined, function*() {
                        if (e || u.default.checkHiderIsStillPresent()) {
                            console.log("Requesting verdict for this page");
                            const e = setTimeout(() => {
                                this.documentLoadFallbackCheck().then(e => {
                                    e && u.default.unHidePage();
                                });
                            }, this.whitePageRemoveMs);
                            if (this.verdict = yield this.sendRuntimeMessage({
                                    type: a.ContentScriptMessageType.ASYNC_VERDICT,
                                    url: this.currentUrl
                                }), clearTimeout(e), console.log("Verdict received:", this.verdict), !(yield this.checkRequest())) {
                                return;
                            }
                            console.log("Page checks passed, showing page again");
                            u.default.unHidePage();;
                        }
                    });
                }
                checkRequest() {
                    return r(this, undefined, undefined, function*() {
                        if (!this.verdict) {
                            return true;
                        }
                        if (this.verdict.redirect_uri) {
                            return window.location.href = this.verdict.redirect_uri, false;
                        }
                        if (this.verdict.verdict === s.EVerdictAction.BLOCK) {
                            return false;
                        }
                        if (this.verdict.content_mod) {
                            console.log("Verdict contains content modifications, applying them");
                            for (const e of this.verdict.content_mod) l.default.handleContentMod(e);
                        }
                        return console.log("Verdict checks passed"), true;
                    });
                }
                documentLoadFallbackCheck() {
                    return r(this, undefined, undefined, function*() {
                        return new Promise(e => {
                            "interactive" === document.readyState || "complete" === document.readyState ? e(this.runFallbackChecks()) : document.addEventListener("DOMContentLoaded", () => {
                                e(this.runFallbackChecks());
                            }, true);
                        });
                    });
                }
                runFallbackChecks() {
                    return r(this, undefined, undefined, function*() {
                        return console.log("Checking page against fallback filter to ensure CIPA compliance"), !d.default.checkPage() && (console.log("Fallback check passed"), true);
                    });
                }
            };
            (0, i.InitSentryCoexist)((0, i.getExtensionDetails)());
            (0, i.updateSentryUserDetails)();
            window.addEventListener("error", i.sentryErrorEventHandler);
            (new p).init().catch(e => {
                console.error("Failed to filter page, hiding it permanently to protect the student", e);
                u.default.tryHidingPage();
                (0, i.logErrorInSentry)(e);;
            });;
        }
}, t = {
    DEBUG_BUILD: n,
    hidden: true,
    clearCachedImplementation: function(e) {
        ;
    },
    fetch: function(...e) {
        return a("fetch")(...e);
    },
    getNativeImplementation: a,
    setTimeout: function(...e) {
        return a("setTimeout")(...e);
    },
    addClsInstrumentationHandler: r.addClsInstrumentationHandler,
    addFidInstrumentationHandler: r.addFidInstrumentationHandler,
    addInpInstrumentationHandler: r.addInpInstrumentationHandler,
    addLcpInstrumentationHandler: r.addLcpInstrumentationHandler,
    addPerformanceInstrumentationHandler: r.addPerformanceInstrumentationHandler,
    addTtfbInstrumentationHandler: r.addTtfbInstrumentationHandler,
    addPerformanceEntries: o.addPerformanceEntries,
    startTrackingInteractions: o.startTrackingInteractions,
    startTrackingLongAnimationFrames: o.startTrackingLongAnimationFrames,
    startTrackingLongTasks: o.startTrackingLongTasks,
    startTrackingWebVitals: o.startTrackingWebVitals,
    addClickKeypressInstrumentationHandler: s.addClickKeypressInstrumentationHandler,
    addHistoryInstrumentationHandler: i.addHistoryInstrumentationHandler,
    clearCachedImplementation: a.clearCachedImplementation,
    fetch: a.fetch,
    getNativeImplementation: a.getNativeImplementation,
    setTimeout: a.setTimeout,
    SENTRY_XHR_DATA_KEY: c.SENTRY_XHR_DATA_KEY,
    addXhrInstrumentationHandler: c.addXhrInstrumentationHandler,
    registerInpInteractionListener: l.registerInpInteractionListener,
    startTrackingINP: l.startTrackingINP,
    addClickKeypressInstrumentationHandler: function(e) {
        r.addHandler("dom", e);
        r.maybeInstrument("dom", c);;
    },
    instrumentDOM: c,
    addHistoryInstrumentationHandler: function(e) {
        ;
        r.addHandler("history", e);
        r.maybeInstrument("history", i);;
    },
    SENTRY_XHR_DATA_KEY: "__sentry_xhr_v3__",
    addXhrInstrumentationHandler: function(e) {
        r.addHandler("xhr", e);
        r.maybeInstrument("xhr", i);;
    },
    instrumentXHR: i,
    _addMeasureSpans: g,
    _addResourceSpans: y,
    addPerformanceEntries: function(e, t) {
        const n = c.getBrowserPerformanceAPI();
        if (!n || !s.WINDOW.performance.getEntries || !r.browserPerformanceTimeOrigin) {
            return;
        }
        o.DEBUG_BUILD && r.logger.log("[Tracing] Adding & adjusting spans using Performance API");
        const i = c.msToSec(r.browserPerformanceTimeOrigin),
            a = n.getEntries(),
            {
                op: S,
                start_timestamp: v
            } = r.spanToJSON(e);
        if (a.slice(m).forEach(t => {
                const n = c.msToSec(t.startTime),
                    s = c.msToSec(Math.max(0, t.duration));
                if (!("navigation" === S && v && i + n < v)) {
                    switch (t.entryType) {
                        case "navigation":
                            ! function(e, t, n) {
                                ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach(r => {
                                    _(e, t, r, n);
                                });
                                _(e, t, "secureConnection", n, "TLS/SSL", "connectEnd");
                                _(e, t, "fetch", n, "cache", "domainLookupStart");
                                _(e, t, "domainLookup", n, "DNS");
                                (function(e, t, n) {
                                    const o = n + c.msToSec(t.requestStart),
                                        s = n + c.msToSec(t.responseEnd),
                                        i = n + c.msToSec(t.responseStart);
                                    t.responseEnd && (c.startAndEndSpan(e, o, s, {
                                        op: "browser.request",
                                        name: t.name,
                                        attributes: {
                                            [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
                                        }
                                    }), c.startAndEndSpan(e, i, s, {
                                        op: "browser.response",
                                        name: t.name,
                                        attributes: {
                                            [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
                                        }
                                    }));
                                }(e, t, n));;
                            }(e, t, i);
                            break;
                        case "mark":
                        case "paint":
                        case "measure": {
                            g(e, t, n, s, i);
                            const a = d.getVisibilityWatcher(),
                                c = t.startTime < a.firstHiddenTime;
                            "first-paint" === t.name && c && (o.DEBUG_BUILD && r.logger.log("[Measurements] Adding FP"), f.fp = {
                                value: t.startTime,
                                unit: "millisecond"
                            });
                            "first-contentful-paint" === t.name && c && (o.DEBUG_BUILD && r.logger.log("[Measurements] Adding FCP"), f.fcp = {
                                value: t.startTime,
                                unit: "millisecond"
                            });;
                            break;
                        }
                        case "resource":
                            y(e, t, t.name, n, s, i);
                    }
                }
            }), m = Math.max(a.length - 1, 0), function(e) {
                const t = s.WINDOW.navigator;
                if (!t) {
                    return;
                }
                const n = t.connection;
                n && (n.effectiveType && e.setAttribute("effectiveConnectionType", n.effectiveType), n.type && e.setAttribute("connectionType", n.type), c.isMeasurementValue(n.rtt) && (f["connection.rtt"] = {
                    value: n.rtt,
                    unit: "millisecond"
                }));
                c.isMeasurementValue(t.deviceMemory) && e.setAttribute("deviceMemory", `${t.deviceMemory} GB`);
                c.isMeasurementValue(t.hardwareConcurrency) && e.setAttribute("hardwareConcurrency", String(t.hardwareConcurrency));;
            }(e), "pageload" === S) {
            ! function(e) {
                const t = u.getNavigationEntry();
                if (!t) {
                    return;
                }
                const {
                    responseStart: n,
                    requestStart: s
                } = t;
                if (s <= n) {
                    o.DEBUG_BUILD && r.logger.log("[Measurements] Adding TTFB Request Time");
                    e["ttfb.requestTime"] = {
                        value: n - s,
                        unit: "millisecond"
                    };
                }
            }(f);
            const n = f["mark.fid"];
            n && f.fid && (c.startAndEndSpan(e, n.value, n.value + c.msToSec(f.fid.value), {
                name: "first input delay",
                op: "ui.action",
                attributes: {
                    [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
                }
            }), delete f["mark.fid"]);
            "fcp" in f && t.recordClsOnPageloadSpan || delete f.cls;
            Object.entries(f).forEach(([e, t]) => {
                r.setMeasurement(e, t.value, t.unit);
            });
            e.setAttribute("performance.timeOrigin", i);
            e.setAttribute("performance.activationStart", l.getActivationStart());
            (function(e) {
                p && (o.DEBUG_BUILD && r.logger.log("[Measurements] Adding LCP Data"), p.element && e.setAttribute("lcp.element", r.htmlTreeAsString(p.element)), p.id && e.setAttribute("lcp.id", p.id), p.url && e.setAttribute("lcp.url", p.url.trim().slice(0, 200)), null != p.loadTime && e.setAttribute("lcp.loadTime", p.loadTime), null != p.renderTime && e.setAttribute("lcp.renderTime", p.renderTime), e.setAttribute("lcp.size", p.size));
                h && h.sources && (o.DEBUG_BUILD && r.logger.log("[Measurements] Adding CLS Data"), h.sources.forEach((t, n) => e.setAttribute(`cls.source.${n + 1}`, r.htmlTreeAsString(t.node))));;
            }(e));;
        }
        p = undefined;
        h = undefined;
        f = {};;
    },
    startTrackingInteractions: function() {
        a.addPerformanceInstrumentationHandler("event", ({
            entries: e
        }) => {
            const t = r.getActiveSpan();
            if (t) {
                for (const n of e)
                    if ("click" === n.name) {
                        const e = c.msToSec(r.browserPerformanceTimeOrigin + n.startTime),
                            o = c.msToSec(n.duration),
                            s = {
                                name: r.htmlTreeAsString(n.target),
                                op: `ui.interaction.${n.name}`,
                                startTime: e,
                                attributes: {
                                    [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
                                }
                            },
                            i = r.getComponentName(n.target);
                        i && (s.attributes["ui.component_name"] = i);
                        c.startAndEndSpan(t, e, e + o, s);;
                    }
            }
        });
    },
    startTrackingLongAnimationFrames: function() {
        new PerformanceObserver(e => {
            const t = r.getActiveSpan();
            if (t) {
                for (const n of e.getEntries()) {
                    if (!n.scripts[0]) {
                        continue;
                    }
                    const e = c.msToSec(r.browserPerformanceTimeOrigin + n.startTime),
                        {
                            start_timestamp: o,
                            op: s
                        } = r.spanToJSON(t);
                    if ("navigation" === s && o && e < o) {
                        continue;
                    }
                    const i = c.msToSec(n.duration),
                        a = {
                            [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
                        },
                        l = n.scripts[0],
                        {
                            invoker: u,
                            invokerType: d,
                            sourceURL: p,
                            sourceFunctionName: h,
                            sourceCharPosition: m
                        } = l;
                    a["browser.script.invoker"] = u;
                    a["browser.script.invoker_type"] = d;
                    p && (a["code.filepath"] = p);
                    h && (a["code.function"] = h); -
                    1 !== m && (a["browser.script.source_char_position"] = m);
                    c.startAndEndSpan(t, e, e + i, {
                        name: "Main UI thread blocked",
                        op: "ui.long-animation-frame",
                        attributes: a
                    });;
                }
            }
        }).observe({
            type: "long-animation-frame",
            buffered: true
        });
    },
    startTrackingLongTasks: function() {
        a.addPerformanceInstrumentationHandler("longtask", ({
            entries: e
        }) => {
            const t = r.getActiveSpan();
            if (!t) {
                return;
            }
            const {
                op: n,
                start_timestamp: o
            } = r.spanToJSON(t);
            for (const s of e) {
                const e = c.msToSec(r.browserPerformanceTimeOrigin + s.startTime),
                    i = c.msToSec(s.duration);
                "navigation" === n && o && e < o || c.startAndEndSpan(t, e, e + i, {
                    name: "Main UI thread blocked",
                    op: "ui.long-task",
                    attributes: {
                        [r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
                    }
                });
            }
        });
    },
    startTrackingWebVitals: function({
        recordClsStandaloneSpans: e
    }) {
        const t = c.getBrowserPerformanceAPI();
        if (t && r.browserPerformanceTimeOrigin) {
            t.mark && s.WINDOW.performance.mark("sentry-tracing-init");
            const n = a.addFidInstrumentationHandler(({
                    metric: e
                }) => {
                    const t = e.entries[e.entries.length - 1];
                    if (!t) {
                        return;
                    }
                    const n = c.msToSec(r.browserPerformanceTimeOrigin),
                        s = c.msToSec(t.startTime);
                    o.DEBUG_BUILD && r.logger.log("[Measurements] Adding FID");;
                    f["mark.fid"] = {
                        value: n + s,
                        unit: "second"
                    };;
                }),
                l = a.addLcpInstrumentationHandler(({
                    metric: e
                }) => {
                    const t = e.entries[e.entries.length - 1];
                    t && (o.DEBUG_BUILD && r.logger.log("[Measurements] Adding LCP"), f.lcp = {
                        value: e.value,
                        unit: "millisecond"
                    }, p = t);
                }, true),
                u = a.addTtfbInstrumentationHandler(({
                    metric: e
                }) => {
                    e.entries[e.entries.length - 1] && (o.DEBUG_BUILD && r.logger.log("[Measurements] Adding TTFB"), f.ttfb = {
                        value: e.value,
                        unit: "millisecond"
                    });
                }),
                d = e ? i.trackClsAsStandaloneSpan() : a.addClsInstrumentationHandler(({
                    metric: e
                }) => {
                    const t = e.entries[e.entries.length - 1];
                    t && (o.DEBUG_BUILD && r.logger.log(`[Measurements] Adding CLS ${e.value}`), f.cls = {
                        value: e.value,
                        unit: ""
                    }, h = t);
                }, true);
            return () => {
                n();
                l();
                u();
                d && d();;
            };
        }
        return () => {};
    },
    trackClsAsStandaloneSpan: function() {
        let e, t, n = 0;
        if (! function() {
                try {
                    return r([PerformanceObserver, "access", e => e.supportedEntryTypes, "optionalAccess", e => e.includes, "call", e => e("layout-shift")]);
                } catch (e) {
                    return false;
                }
            }()) {
            return;
        }
        let l = false;

        function u() {
            l || (l = true, t && function(e, t, n) {
                s.DEBUG_BUILD && o.logger.log(`Sending CLS span (${e})`);
                const i = a.msToSec((o.browserPerformanceTimeOrigin || 0) + (r([t, "optionalAccess", e => e.startTime]) || 0)),
                    c = o.getCurrentScope().getScopeData().transactionName,
                    l = t ? o.htmlTreeAsString(r([t, "access", e => e.sources, "access", e => e[0], "optionalAccess", e => e.node])) : "Layout shift",
                    u = o.dropUndefinedKeys({
                        [o.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser.cls",
                        [o.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "ui.webvital.cls",
                        [o.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME]: r([t, "optionalAccess", e => e.duration]) || 0,
                        "sentry.pageload.span_id": n
                    }),
                    d = a.startStandaloneWebVitalSpan({
                        name: l,
                        transaction: c,
                        attributes: u,
                        startTime: i
                    });
                r([d, "optionalAccess", e => e.addEvent, "call", t => t("cls", {
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT]: "",
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE]: e
                })]);
                r([d, "optionalAccess", e => e.end, "call", e => e(i)]);;
            }(n, e, t), d());
        }
        const d = i.addClsInstrumentationHandler(({
            metric: t
        }) => {
            const r = t.entries[t.entries.length - 1];
            r && (n = t.value, e = r);
        }, true);
        c.onHidden(() => {
            u();
        });
        setTimeout(() => {
            const e = o.getClient(),
                n = r([e, "optionalAccess", e => e.on, "call", e => e("startNavigationSpan", () => {
                    u();
                    n && n();;
                })]),
                s = o.getActiveSpan(),
                i = s && o.getRootSpan(s),
                a = i && o.spanToJSON(i);
            a && "pageload" === a.op && (t = i.spanContext().spanId);
        }, 0);;
    },
    registerInpInteractionListener: function(e) {
        const t = ({
            entries: e
        }) => {
            const t = o.getActiveSpan(),
                n = t && o.getRootSpan(t);
            e.forEach(e => {
                if (!s.isPerformanceEventTiming(e) || !n) {
                    return;
                }
                const t = e.interactionId;
                if (null != t && !c.has(t)) {
                    if (a.length > 10) {
                        const e = a.shift();
                        c.delete(e);
                    }
                    a.push(t);
                    c.set(t, n);;
                }
            });
        };
        s.addPerformanceInstrumentationHandler("event", t);
        s.addPerformanceInstrumentationHandler("first-input", t);;
    },
    startTrackingINP: function() {
        if (i.getBrowserPerformanceAPI() && o.browserPerformanceTimeOrigin) {
            const e = s.addInpInstrumentationHandler(({
                metric: e
            }) => {
                if (null == e.value) {
                    return;
                }
                const t = e.entries.find(t => t.duration === e.value && l[t.name]);
                if (!t) {
                    return;
                }
                const {
                    interactionId: n
                } = t, s = l[t.name], a = i.msToSec(o.browserPerformanceTimeOrigin + t.startTime), u = i.msToSec(e.value), d = o.getActiveSpan(), p = d ? o.getRootSpan(d) : undefined, h = (null != n ? c.get(n) : undefined) || p, m = h ? o.spanToJSON(h).description : o.getCurrentScope().getScopeData().transactionName, f = o.htmlTreeAsString(t.target), g = o.dropUndefinedKeys({
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser.inp",
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_OP]: `ui.interaction.${s}`,
                    [o.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME]: t.duration
                }), _ = i.startStandaloneWebVitalSpan({
                    name: f,
                    transaction: m,
                    attributes: g,
                    startTime: a
                });
                r([_, "optionalAccess", e => e.addEvent, "call", t => t("inp", {
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT]: "millisecond",
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE]: e.value
                })]);
                r([_, "optionalAccess", e => e.end, "call", e => e(a + u)]);;
            });
            return () => {
                e();
            };
        }
        return () => {};
    },
    getBrowserPerformanceAPI: function() {
        return o.WINDOW && o.WINDOW.addEventListener && o.WINDOW.performance;
    },
    isMeasurementValue: function(e) {
        return "number" == typeof e && isFinite(e);
    },
    msToSec: function(e) {
        return e / 1e3;
    },
    startAndEndSpan: function(e, t, n, {
        ...o
    }) {
        const s = r.spanToJSON(e).start_timestamp;
        return s && s > t && "function" == typeof e.updateStartTime && e.updateStartTime(t), r.withActiveSpan(e, () => {
            const e = r.startInactiveSpan({
                startTime: t,
                ...o
            });
            return e && e.end(n), e;
        });
    },
    startStandaloneWebVitalSpan: function(e) {
        const t = r.getClient();
        if (!t) {
            return;
        }
        const {
            name: n,
            transaction: s,
            attributes: i,
            startTime: a
        } = e, {
            release: c,
            environment: l
        } = t.getOptions(), u = t.getIntegrationByName("Replay"), d = u && u.getReplayId(), p = r.getCurrentScope(), h = p.getUser(), m = undefined !== h ? h.email || h.id || h.ip_address : undefined;
        let f;
        try {
            f = p.getScopeData().contexts.profile.profile_id;
        } catch (e) {}
        const g = {
            release: c,
            environment: l,
            user: m || undefined,
            profile_id: f || undefined,
            replay_id: d || undefined,
            transaction: s,
            "user_agent.original": o.WINDOW.navigator && o.WINDOW.navigator.userAgent,
            ...i
        };
        return r.startInactiveSpan({
            name: n,
            attributes: g,
            startTime: a,
            experimental: {
                standalone: true
            }
        });
    },
    CLSThresholds: l,
    onCLS: (e, t = {}) => {
        c.onFCP(a.runOnce(() => {
            const n = o.initMetric("CLS", 0);
            let a, c = 0,
                u = [];
            const d = e => {
                    e.forEach(e => {
                        if (!e.hadRecentInput) {
                            const t = u[0],
                                n = u[u.length - 1];
                            c && t && n && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (c += e.value, u.push(e)) : (c = e.value, u = [e]);
                        }
                    });
                    if (c > n.value) {
                        n.value = c;
                        n.entries = u;
                        a();
                    };
                },
                p = s.observe("layout-shift", d);
            p && (a = r.bindReporter(e, n, l, t.reportAllChanges), i.onHidden(() => {
                d(p.takeRecords());
                a(true);;
            }), setTimeout(a, 0));
        }));
    },
    FIDThresholds: u,
    onFID: (e, t = {}) => {
        l.whenActivated(() => {
            const n = o.getVisibilityWatcher(),
                l = s.initMetric("FID");
            let d;
            const p = e => {
                    if (e.startTime < n.firstHiddenTime) {
                        l.value = e.processingStart - e.startTime;
                        l.entries.push(e);
                        d(true);
                    }
                },
                h = e => {
                    e.forEach(p);
                },
                m = i.observe("first-input", h);
            d = r.bindReporter(e, l, u, t.reportAllChanges);
            m && a.onHidden(c.runOnce(() => {
                h(m.takeRecords());
                m.disconnect();;
            }));;
        });
    },
    INPThresholds: u,
    onINP: (e, t = {}) => {
        l.whenActivated(() => {
            c.initInteractionCountPolyfill();
            const n = s.initMetric("INP");
            let l;
            const h = e => {
                    e.forEach(e => {
                        e.interactionId && m(e);
                        "first-input" === e.entryType && !p.some(t => t.entries.some(t => e.duration === t.duration && e.startTime === t.startTime)) && m(e);;
                    });
                    const t = (() => {
                        const e = Math.min(p.length - 1, Math.floor(d() / 50));
                        return p[e];
                    })();
                    t && t.latency !== n.value && (n.value = t.latency, n.entries = t.entries, l());
                },
                f = i.observe("event", h, {
                    durationThreshold: null != t.durationThreshold ? t.durationThreshold : 40
                });
            l = o.bindReporter(e, n, u, t.reportAllChanges);
            f && ("PerformanceEventTiming" in r.WINDOW && "interactionId" in PerformanceEventTiming.prototype && f.observe({
                type: "first-input",
                buffered: true
            }), a.onHidden(() => {
                h(f.takeRecords());
                n.value < 0 && d() > 0 && (n.value = 0, n.entries = []);
                l(true);;
            }));;
        });
    },
    LCPThresholds: p,
    onLCP: (e, t = {}) => {
        d.whenActivated(() => {
            const n = i.getVisibilityWatcher(),
                d = a.initMetric("LCP");
            let m;
            const f = e => {
                    const t = e[e.length - 1];
                    t && t.startTime < n.firstHiddenTime && (d.value = Math.max(t.startTime - s.getActivationStart(), 0), d.entries = [t], m());
                },
                g = c.observe("largest-contentful-paint", f);
            if (g) {
                m = o.bindReporter(e, d, p, t.reportAllChanges);
                const n = u.runOnce(() => {
                    h[d.id] || (f(g.takeRecords()), g.disconnect(), h[d.id] = true, m(true));
                });
                ["keydown", "click"].forEach(e => {
                    r.WINDOW.document && addEventListener(e, () => setTimeout(n, 0), true);
                });
                l.onHidden(n);;
            }
        });
    },
    bindReporter: (e, t, n, r) => {
        let o, s;
        return i => {
            t.value >= 0 && (i || r) && (s = t.value - (o || 0), (s || undefined === o) && (o = t.value, t.delta = s, t.rating = ((e, t) => e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good")(t.value, n), e(t)));
        };
    },
    generateUniqueID: () => `v3-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 1e12}`,
    getActivationStart: () => {
        const e = r.getNavigationEntry();
        return e && e.activationStart || 0;
    },
    getNavigationEntry: () => r.WINDOW.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0],
    getVisibilityWatcher: () => (r.WINDOW.document && o < 0 && (o = "hidden" !== r.WINDOW.document.visibilityState || r.WINDOW.document.prerendering ? Infinity : 0, addEventListener("visibilitychange", s, true), addEventListener("prerenderingchange", s, true)), {
        get firstHiddenTime() {
            return o;
        }
    }),
    initMetric: (e, t) => {
        const n = i.getNavigationEntry();
        let a = "navigate";
        return n && (r.WINDOW.document && r.WINDOW.document.prerendering || s.getActivationStart() > 0 ? a = "prerender" : r.WINDOW.document && r.WINDOW.document.wasDiscarded ? a = "restore" : n.type && (a = n.type.replace(/_/g, "-"))), {
            name: e,
            value: undefined === t ? -1 : t,
            rating: "good",
            delta: 0,
            entries: [],
            id: o.generateUniqueID(),
            navigationType: a
        };
    },
    observe: (e, t, n) => {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                const r = new PerformanceObserver(e => {
                    Promise.resolve().then(() => {
                        t(e.getEntries());
                    });
                });
                return r.observe(Object.assign({
                    type: e,
                    buffered: true
                }, n || {})), r;
            }
        } catch (e) {}
    },
    onHidden: e => {
        const t = t => {
            ("pagehide" === t.type || r.WINDOW.document && "hidden" === r.WINDOW.document.visibilityState) && e(t);
        };
        r.WINDOW.document && (addEventListener("visibilitychange", t, true), addEventListener("pagehide", t, true));
    },
    getInteractionCount: () => c ? o : performance.interactionCount || 0,
    initInteractionCountPolyfill: () => {
        "interactionCount" in performance || c || (c = r.observe("event", a, {
            type: "event",
            buffered: true,
            durationThreshold: 0
        }));
    },
    runOnce: e => {
        let t = false;
        return n => {
            t || (e(n), t = true);
        };
    },
    whenActivated: e => {
        r.WINDOW.document && r.WINDOW.document.prerendering ? addEventListener("prerenderingchange", () => e(), true) : e();
    },
    FCPThresholds: l,
    onFCP: (e, t = {}) => {
        c.whenActivated(() => {
            const n = s.getVisibilityWatcher(),
                c = i.initMetric("FCP");
            let u;
            const d = a.observe("paint", e => {
                e.forEach(e => {
                    if ("first-contentful-paint" === e.name) {
                        d.disconnect();
                        if (e.startTime < n.firstHiddenTime) {
                            ;
                            c.entries.push(e);
                            u(true);
                        }
                    }
                });
            });
            d && (u = r.bindReporter(e, c, l, t.reportAllChanges));
        });
    },
    TTFBThresholds: l,
    onTTFB: (e, t = {}) => {
        const n = a.initMetric("TTFB"),
            r = o.bindReporter(e, n, l, t.reportAllChanges);
        u(() => {
            const e = i.getNavigationEntry();
            if (e) {
                const t = e.responseStart;
                if (t <= 0 || t > performance.now()) {
                    return;
                };;
                r(true);;
            }
        });
    },
    WINDOW: r,
    __u: -161,
    __v: null,
    __h: [],
    __k: [],
    fillStyle: "rgba(0, 0, 0, 0.5)",
    strokeStyle: "#ffffff",
    lineWidth: 3,
    strokeStyle: "#000000",
    lineWidth: 1,
    id: String(e.id),
    buildFeedbackIntegration: ({
        lazyLoadIntegration: e,
        getModalIntegration: t,
        getScreenshotIntegration: n
    }) => ({
        id: p = "sentry-feedback",
        autoInject: g = true,
        showBranding: _ = true,
        isEmailRequired: y = false,
        isNameRequired: S = false,
        showEmail: v = true,
        showName: b = true,
        enableScreenshot: E = true,
        useSentryUser: T = {
            email: "email",
            name: "username"
        },
        tags: I,
        styleNonce: C,
        scriptNonce: w,
        colorScheme: k = "system",
        themeLight: A = {},
        themeDark: M = {},
        addScreenshotButtonLabel: x = "Add a screenshot",
        cancelButtonLabel: O = "Cancel",
        confirmButtonLabel: R = "Confirm",
        emailLabel: D = "Email",
        emailPlaceholder: N = "your.email@example.org",
        formTitle: P = "Report a Bug",
        isRequiredLabel: L = "(required)",
        messageLabel: U = "Description",
        messagePlaceholder: B = "What's the bug? What did you expect?",
        nameLabel: F = "Name",
        namePlaceholder: H = "Your Name",
        removeScreenshotButtonLabel: j = "Remove screenshot",
        submitButtonLabel: W = "Send Bug Report",
        successMessageText: G = "Thank you for your report!",
        triggerLabel: $ = "Report a Bug",
        triggerAriaLabel: z = "",
        onFormOpen: q,
        onFormClose: Y,
        onSubmitSuccess: V,
        onSubmitError: J,
        onFormSubmitted: K
    } = {}) => {
        const X = {
            id: p,
            autoInject: g,
            showBranding: _,
            isEmailRequired: y,
            isNameRequired: S,
            showEmail: v,
            showName: b,
            enableScreenshot: E,
            useSentryUser: T,
            tags: I,
            styleNonce: C,
            scriptNonce: w,
            colorScheme: k,
            themeDark: M,
            themeLight: A,
            triggerLabel: $,
            triggerAriaLabel: z,
            cancelButtonLabel: O,
            submitButtonLabel: W,
            confirmButtonLabel: R,
            formTitle: P,
            emailLabel: D,
            emailPlaceholder: N,
            messageLabel: U,
            messagePlaceholder: B,
            nameLabel: F,
            namePlaceholder: H,
            successMessageText: G,
            isRequiredLabel: L,
            addScreenshotButtonLabel: x,
            removeScreenshotButtonLabel: j,
            onFormClose: Y,
            onFormOpen: q,
            onSubmitError: J,
            onSubmitSuccess: V,
            onFormSubmitted: K
        };
        let Z = null,
            Q = [];
        const ee = e => {
                if (!Z) {
                    const t = s.createElement("div");;
                    s.body.appendChild(t);
                    Z = t.attachShadow({
                        mode: "open"
                    });
                    Z.appendChild(function({
                        colorScheme: e,
                        themeDark: t,
                        themeLight: n,
                        styleNonce: r
                    }) {
                        const o = s.createElement("style");
                        return o.textContent = `\n:host {\n  --font-family: system-ui, 'Helvetica Neue', Arial, sans-serif;\n  --font-size: 14px;\n  --z-index: 100000;\n\n  --page-margin: 16px;\n  --inset: auto 0 0 auto;\n  --actor-inset: var(--inset);\n\n  font-family: var(--font-family);\n  font-size: var(--font-size);\n\n  ${"system" !== e ? "color-scheme: only light;" : ""}\n\n  ${f("dark" === e ? {...m, ...t} : {...h, ...n})}\n}\n\n${"system" === e ? `\n@media (prefers-color-scheme: dark) {\n  :host {\n    ${f({...m, ...t})}\n  }\n}` : ""}\n}\n`, r && o.setAttribute("nonce", r), o;
                    }(e));;
                }
                return Z;
            },
            te = async (t, n, o) => {
                const s = r.getClient(),
                    i = s && s.getIntegrationByName(t);
                if (i) {
                    return i;
                }
                const a = (n && n() || await e(o, w))();
                return s && s.addIntegration(a), a;
            }, ne = async e => {
                const o = e.enableScreenshot && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(i.userAgent) || /Macintosh/i.test(i.userAgent) && i.maxTouchPoints && i.maxTouchPoints > 1 || !isSecureContext),
                    [s, a] = await Promise.all([te("FeedbackModal", t, "feedbackModalIntegration"), o ? te("FeedbackScreenshot", n, "feedbackScreenshotIntegration") : undefined]);
                if (!s) {
                    throw l && r.logger.error("[Feedback] Missing feedback modal integration. Try using `feedbackSyncIntegration` in your `Sentry.init`."), new Error("[Feedback] Missing feedback modal integration!");
                }
                o && !a && l && r.logger.error("[Feedback] Missing feedback screenshot integration. Proceeding without screenshots.");
                const u = s.createDialog({
                    options: {
                        ...e,
                        onFormClose: () => {
                            u && u.close();
                            e.onFormClose && e.onFormClose();;
                        },
                        onFormSubmitted: () => {
                            u && u.close();
                            e.onFormSubmitted && e.onFormSubmitted();;
                        }
                    },
                    screenshotIntegration: o ? a : undefined,
                    sendFeedback: c,
                    shadow: ee(e)
                });
                return u;
            }, re = (e, t = {}) => {
                const n = u(X, t),
                    o = "string" == typeof e ? s.querySelector(e) : "function" == typeof e.addEventListener ? e : null;
                if (!o) {
                    throw l && r.logger.error("[Feedback] Unable to attach to target element"), new Error("Unable to attach to target element");
                }
                let i = null;
                const a = async () => {
                    i || (i = await ne({
                        ...n,
                        onFormSubmitted: () => {
                            i && i.removeFromDom();
                            n.onFormSubmitted && n.onFormSubmitted();;
                        }
                    }));
                    i.appendToDom();
                    i.open();;
                };
                o.addEventListener("click", a);
                const c = () => {
                    Q = Q.filter(e => e !== c);
                    i && i.removeFromDom();
                    i = null;
                    o.removeEventListener("click", a);;
                };
                return Q.push(c), c;
            }, oe = (e = {}) => {
                const t = u(X, e),
                    n = ee(t),
                    r = function({
                        triggerLabel: e,
                        triggerAriaLabel: t,
                        shadow: n,
                        styleNonce: r
                    }) {
                        const i = s.createElement("button");
                        if (i.type = "button", i.className = "widget__actor", i.ariaHidden = "false", i.ariaLabel = t || e || "Report a Bug", i.appendChild(function() {
                                const e = e => o.document.createElementNS("http://www.w3.org/2000/svg", e),
                                    t = d(e("svg"), {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 20 20",
                                        fill: "var(--actor-color, var(--foreground))"
                                    }),
                                    n = d(e("g"), {
                                        clipPath: "url(#clip0_57_80)"
                                    }),
                                    r = d(e("path"), {
                                        "fill-rule": "evenodd",
                                        "clip-rule": "evenodd",
                                        d: "M15.6622 15H12.3997C12.2129 14.9959 12.031 14.9396 11.8747 14.8375L8.04965 12.2H7.49956V19.1C7.4875 19.3348 7.3888 19.5568 7.22256 19.723C7.05632 19.8892 6.83435 19.9879 6.59956 20H2.04956C1.80193 19.9968 1.56535 19.8969 1.39023 19.7218C1.21511 19.5467 1.1153 19.3101 1.11206 19.0625V12.2H0.949652C0.824431 12.2017 0.700142 12.1783 0.584123 12.1311C0.468104 12.084 0.362708 12.014 0.274155 11.9255C0.185602 11.8369 0.115689 11.7315 0.0685419 11.6155C0.0213952 11.4995 -0.00202913 11.3752 -0.00034808 11.25V3.75C-0.00900498 3.62067 0.0092504 3.49095 0.0532651 3.36904C0.0972798 3.24712 0.166097 3.13566 0.255372 3.04168C0.344646 2.94771 0.452437 2.87327 0.571937 2.82307C0.691437 2.77286 0.82005 2.74798 0.949652 2.75H8.04965L11.8747 0.1625C12.031 0.0603649 12.2129 0.00407221 12.3997 0H15.6622C15.9098 0.00323746 16.1464 0.103049 16.3215 0.278167C16.4966 0.453286 16.5964 0.689866 16.5997 0.9375V3.25269C17.3969 3.42959 18.1345 3.83026 18.7211 4.41679C19.5322 5.22788 19.9878 6.32796 19.9878 7.47502C19.9878 8.62209 19.5322 9.72217 18.7211 10.5333C18.1345 11.1198 17.3969 11.5205 16.5997 11.6974V14.0125C16.6047 14.1393 16.5842 14.2659 16.5395 14.3847C16.4948 14.5035 16.4268 14.6121 16.3394 14.7042C16.252 14.7962 16.147 14.8698 16.0307 14.9206C15.9144 14.9714 15.7891 14.9984 15.6622 15ZM1.89695 10.325H1.88715V4.625H8.33715C8.52423 4.62301 8.70666 4.56654 8.86215 4.4625L12.6872 1.875H14.7247V13.125H12.6872L8.86215 10.4875C8.70666 10.3835 8.52423 10.327 8.33715 10.325H2.20217C2.15205 10.3167 2.10102 10.3125 2.04956 10.3125C1.9981 10.3125 1.94708 10.3167 1.89695 10.325ZM2.98706 12.2V18.1625H5.66206V12.2H2.98706ZM16.5997 9.93612V5.01393C16.6536 5.02355 16.7072 5.03495 16.7605 5.04814C17.1202 5.13709 17.4556 5.30487 17.7425 5.53934C18.0293 5.77381 18.2605 6.06912 18.4192 6.40389C18.578 6.73866 18.6603 7.10452 18.6603 7.47502C18.6603 7.84552 18.578 8.21139 18.4192 8.54616C18.2605 8.88093 18.0293 9.17624 17.7425 9.41071C17.4556 9.64518 17.1202 9.81296 16.7605 9.90191C16.7072 9.91509 16.6536 9.9265 16.5997 9.93612Z"
                                    });
                                t.appendChild(n).appendChild(r);
                                const s = e("defs"),
                                    i = d(e("clipPath"), {
                                        id: "clip0_57_80"
                                    }),
                                    a = d(e("rect"), {
                                        width: "20",
                                        height: "20",
                                        fill: "white"
                                    });
                                return i.appendChild(a), s.appendChild(i), t.appendChild(s).appendChild(i).appendChild(a), t;
                            }()), e) {
                            const t = s.createElement("span");
                            t.appendChild(s.createTextNode(e));
                            i.appendChild(t);;
                        }
                        const c = function(e) {
                            const t = s.createElement("style");
                            return t.textContent = '\n.widget__actor {\n  position: fixed;\n  z-index: var(--z-index);\n  margin: var(--page-margin);\n  inset: var(--actor-inset);\n\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n\n  font-family: inherit;\n  font-size: var(--font-size);\n  font-weight: 600;\n  line-height: 1.14em;\n  text-decoration: none;\n\n  background: var(--actor-background, var(--background));\n  border-radius: var(--actor-border-radius, 1.7em/50%);\n  border: var(--actor-border, var(--border));\n  box-shadow: var(--actor-box-shadow, var(--box-shadow));\n  color: var(--actor-color, var(--foreground));\n  fill: var(--actor-color, var(--foreground));\n  cursor: pointer;\n  opacity: 1;\n  transition: transform 0.2s ease-in-out;\n  transform: translate(0, 0) scale(1);\n}\n.widget__actor[aria-hidden="true"] {\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  transform: translate(0, 16px) scale(0.98);\n}\n\n.widget__actor:hover {\n  background: var(--actor-hover-background, var(--background));\n  filter: var(--interactive-filter);\n}\n\n.widget__actor svg {\n  width: 1.14em;\n  height: 1.14em;\n}\n\n@media (max-width: 600px) {\n  .widget__actor span {\n    display: none;\n  }\n}\n', e && t.setAttribute("nonce", e), t;
                        }(r);
                        return {
                            el: i,
                            appendToDom() {
                                n.appendChild(c);
                                n.appendChild(i);;
                            },
                            removeFromDom() {
                                n.removeChild(i);
                                n.removeChild(c);;
                            },
                            show() {
                                ;
                            },
                            hide() {
                                ;
                            }
                        };
                    }({
                        triggerLabel: t.triggerLabel,
                        triggerAriaLabel: t.triggerAriaLabel,
                        shadow: n,
                        styleNonce: C
                    });
                return re(r.el, {
                    ...t,
                    onFormOpen() {
                        r.hide();
                    },
                    onFormClose() {
                        r.show();
                    },
                    onFormSubmitted() {
                        r.show();
                    }
                }), r;
            };
        return {
            name: "Feedback",
            setupOnce() {
                r.isBrowser() && X.autoInject && ("loading" === s.readyState ? s.addEventListener("DOMContentLoaded", () => oe().appendToDom()) : oe().appendToDom());
            },
            attachTo: re,
            createWidget(e = {}) {
                const t = oe(u(X, e));
                return t.appendToDom(), t;
            },
            createForm: async (e = {}) => ne(u(X, e)),
            remove() {
                Z && (Z.parentElement && Z.parentElement.remove(), Z = null);
                Q.forEach(e => e());
                Q = [];;
            }
        };
    },
    feedbackModalIntegration: () => ({
        name: "FeedbackModal",
        setupOnce() {},
        createDialog: ({
            options: e,
            screenshotIntegration: t,
            sendFeedback: n,
            shadow: o
        }) => {
            const i = o,
                a = e.useSentryUser,
                c = function() {
                    const e = r.getCurrentScope().getUser(),
                        t = r.getIsolationScope().getUser(),
                        n = r.getGlobalScope().getUser();
                    return e && Object.keys(e).length ? e : t && Object.keys(t).length ? t : n;
                }(),
                l = s.createElement("div"),
                u = function(e) {
                    const t = s.createElement("style");
                    return t.textContent = "\n:host {\n  --dialog-inset: var(--inset);\n}\n\n\n.dialog {\n  position: fixed;\n  z-index: var(--z-index);\n  margin: 0;\n  inset: 0;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  height: 100vh;\n  width: 100vw;\n\n  color: var(--dialog-color, var(--foreground));\n  fill: var(--dialog-color, var(--foreground));\n  line-height: 1.75em;\n\n  background-color: rgba(0, 0, 0, 0.05);\n  border: none;\n  inset: 0;\n  opacity: 1;\n  transition: opacity 0.2s ease-in-out;\n}\n\n.dialog__position {\n  position: fixed;\n  z-index: var(--z-index);\n  inset: var(--dialog-inset);\n  padding: var(--page-margin);\n  display: flex;\n  max-height: calc(100vh - (2 * var(--page-margin)));\n}\n@media (max-width: 600px) {\n  .dialog__position {\n    inset: var(--page-margin);\n    padding: 0;\n  }\n}\n\n.dialog__position:has(.editor) {\n  inset: var(--page-margin);\n  padding: 0;\n}\n\n.dialog:not([open]) {\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n}\n.dialog:not([open]) .dialog__content {\n  transform: translate(0, -16px) scale(0.98);\n}\n\n.dialog__content {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: var(--dialog-padding, 24px);\n  max-width: 100%;\n  width: var(--form-width, 272px);\n  max-height: 100%;\n  overflow: auto;\n\n  background: var(--dialog-background, var(--background));\n  border-radius: var(--dialog-border-radius, 20px);\n  border: var(--dialog-border, var(--border));\n  box-shadow: var(--dialog-box-shadow, var(--box-shadow));\n  transform: translate(0, 0) scale(1);\n  transition: transform 0.2s ease-in-out;\n}\n\n@media (max-width: 600px) {\n  .dialog__content {\n    width: var(--form-width, 100%);\n  }\n}\n\n\n\n.dialog__header {\n  display: flex;\n  gap: 4px;\n  justify-content: space-between;\n  font-weight: var(--dialog-header-weight, 600);\n  margin: 0;\n}\n.dialog__title {\n  align-self: center;\n}\n.brand-link {\n  display: inline-flex;\n}\n.brand-link:focus-visible {\n  outline: var(--outline);\n}\n\n\n.form {\n  display: flex;\n  overflow: auto;\n  flex-direction: row;\n  gap: 16px;\n  flex: 1 0;\n}\n\n.form__right {\n  flex: 0 0 auto;\n  display: flex;\n  overflow: auto;\n  flex-direction: column;\n  justify-content: space-between;\n  gap: 20px;\n  width: 100%;\n}\n\n.form__top {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.form__error-container {\n  color: var(--error-color);\n  fill: var(--error-color);\n}\n\n.form__label {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin: 0px;\n}\n\n.form__label__text {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n\n.form__label__text--required {\n  font-size: 0.85em;\n}\n\n.form__input {\n  font-family: inherit;\n  line-height: inherit;\n  background: transparent;\n  box-sizing: border-box;\n  border: var(--input-border, var(--border));\n  border-radius: var(--input-border-radius, 6px);\n  color: var(--input-color, inherit);\n  fill: var(--input-color, inherit);\n  font-size: var(--input-font-size, inherit);\n  font-weight: var(--input-font-weight, 500);\n  padding: 6px 12px;\n}\n\n.form__input::placeholder {\n  opacity: 0.65;\n  color: var(--input-placeholder-color, inherit);\n  filter: var(--interactive-filter);\n}\n\n.form__input:focus-visible {\n  outline: var(--input-focus-outline, var(--outline));\n}\n\n.form__input--textarea {\n  font-family: inherit;\n  resize: vertical;\n}\n\n.error {\n  color: var(--error-color);\n  fill: var(--error-color);\n}\n\n\n.btn-group {\n  display: grid;\n  gap: 8px;\n}\n\n.btn {\n  line-height: inherit;\n  border: var(--button-border, var(--border));\n  border-radius: var(--button-border-radius, 6px);\n  cursor: pointer;\n  font-family: inherit;\n  font-size: var(--button-font-size, inherit);\n  font-weight: var(--button-font-weight, 600);\n  padding: var(--button-padding, 6px 16px);\n}\n.btn[disabled] {\n  opacity: 0.6;\n  pointer-events: none;\n}\n\n.btn--primary {\n  color: var(--button-primary-color, var(--accent-foreground));\n  fill: var(--button-primary-color, var(--accent-foreground));\n  background: var(--button-primary-background, var(--accent-background));\n  border: var(--button-primary-border, var(--border));\n  border-radius: var(--button-primary-border-radius, 6px);\n  font-weight: var(--button-primary-font-weight, 500);\n}\n.btn--primary:hover {\n  color: var(--button-primary-hover-color, var(--accent-foreground));\n  fill: var(--button-primary-hover-color, var(--accent-foreground));\n  background: var(--button-primary-hover-background, var(--accent-background));\n  filter: var(--interactive-filter);\n}\n.btn--primary:focus-visible {\n  background: var(--button-primary-hover-background, var(--accent-background));\n  filter: var(--interactive-filter);\n  outline: var(--button-primary-focus-outline, var(--outline));\n}\n\n.btn--default {\n  color: var(--button-color, var(--foreground));\n  fill: var(--button-color, var(--foreground));\n  background: var(--button-background, var(--background));\n  border: var(--button-border, var(--border));\n  border-radius: var(--button-border-radius, 6px);\n  font-weight: var(--button-font-weight, 500);\n}\n.btn--default:hover {\n  color: var(--button-color, var(--foreground));\n  fill: var(--button-color, var(--foreground));\n  background: var(--button-hover-background, var(--background));\n  filter: var(--interactive-filter);\n}\n.btn--default:focus-visible {\n  background: var(--button-hover-background, var(--background));\n  filter: var(--interactive-filter);\n  outline: var(--button-focus-outline, var(--outline));\n}\n\n\n.success__position {\n  position: fixed;\n  inset: var(--dialog-inset);\n  padding: var(--page-margin);\n  z-index: var(--z-index);\n}\n.success__content {\n  background: var(--success-background, var(--background));\n  border: var(--success-border, var(--border));\n  border-radius: var(--success-border-radius, 1.7em/50%);\n  box-shadow: var(--success-box-shadow, var(--box-shadow));\n  font-weight: var(--success-font-weight, 600);\n  color: var(--success-color);\n  fill: var(--success-color);\n  padding: 12px 24px;\n  line-height: 1.75em;\n\n  display: grid;\n  align-items: center;\n  grid-auto-flow: column;\n  gap: 6px;\n  cursor: default;\n}\n\n.success__icon {\n  display: flex;\n}\n\n", e && t.setAttribute("nonce", e), t;
                }(e.styleNonce);
            let d = "";
            const p = {
                    get el() {
                        return l;
                    },
                    appendToDom() {
                        i.contains(u) || i.contains(l) || (i.appendChild(u), i.appendChild(l));
                    },
                    removeFromDom() {
                        i.removeChild(l);
                        i.removeChild(u);
                        s.body.style.overflow = d;;
                    },
                    open() {
                        m(true);
                        e.onFormOpen && e.onFormOpen();
                        d = s.body.style.overflow;
                        s.body.style.overflow = "hidden";;
                    },
                    close() {
                        m(false);
                        s.body.style.overflow = d;;
                    }
                },
                h = t && t.createInput({
                    h: M,
                    hooks: Ie,
                    dialog: p,
                    options: e
                }),
                m = t => {
                    ! function(e, t) {
                        var n, r, o, s;
                        _.__ && _.__(e, t);
                        r = (n = false) ? null : t.__k;
                        o = [];
                        s = [];
                        z(t, e = t.__k = M(O, null, [e]), r || T, T, undefined !== t.ownerSVGElement, r ? null : t.firstChild ? g.call(t.childNodes) : null, o, r ? r.__e : t.firstChild, n, s);
                        e.__d = undefined;
                        q(o, e, s);;
                    }(M(Oe, {
                        options: e,
                        screenshotInput: h,
                        showName: e.showName || e.isNameRequired,
                        showEmail: e.showEmail || e.isEmailRequired,
                        defaultName: a && c && c[a.name] || "",
                        defaultEmail: a && c && c[a.email] || "",
                        onFormClose: () => {
                            m(false);
                            e.onFormClose && e.onFormClose();;
                        },
                        onSubmit: n,
                        onSubmitSuccess: t => {
                            m(false);
                            e.onSubmitSuccess && e.onSubmitSuccess(t);;
                        },
                        onSubmitError: t => {
                            e.onSubmitError && e.onSubmitError(t);
                        },
                        onFormSubmitted: () => {
                            e.onFormSubmitted && e.onFormSubmitted();
                        },
                        open: t
                    }), l);
                };
            return p;
        }
    }),
    feedbackScreenshotIntegration: () => ({
        name: "FeedbackScreenshot",
        setupOnce() {},
        createInput: ({
            h: e,
            hooks: t,
            dialog: n,
            options: r
        }) => {
            const o = s.createElement("canvas");
            return {
                input: Ue({
                    h: e,
                    hooks: t,
                    imageBuffer: o,
                    dialog: n,
                    options: r
                }),
                value: async () => {
                    const e = await new Promise(e => {
                        o.toBlob(e, "image/png");
                    });
                    if (e) {
                        return {
                            data: new Uint8Array(await e.arrayBuffer()),
                            filename: "screenshot.png",
                            contentType: "application/png"
                        };
                    }
                }
            };
        }
    }),
    getFeedback: function() {
        const e = r.getClient();
        return e && e.getIntegrationByName("Feedback");
    },
    sendFeedback: c,
    hidden: true,
    replayCanvasIntegration: N,
    hidden: true,
    hidden: true,
    next: n,
    previous: e.previousSibling.__ln,
    previous: n,
    next: e.nextSibling.__ln,
    next: this.head,
    cause: e,
    getReplay: function() {
        const e = s.getClient();
        return e && e.getIntegrationByName("Replay");
    },
    replayIntegration: e => new Gn(e),
    BrowserClient: c,
    DEBUG_BUILD: n,
    eventFromException: function(e, t, n, o) {
        const s = d(e, t, n && n.syntheticException || undefined, o);
        return r.addExceptionMechanism(s), s.level = "error", n && n.event_id && (s.event_id = n.event_id), r.resolvedSyncPromise(s);
    },
    eventFromMessage: function(e, t, n = "info", o, s) {
        const i = p(e, t, o && o.syntheticException || undefined, s);
        return i.level = n, o && o.event_id && (i.event_id = o.event_id), r.resolvedSyncPromise(i);
    },
    eventFromUnknownInput: d,
    exceptionFromError: o,
    extractMessage: u,
    extractType: l,
    feedbackAsyncIntegration: s,
    feedbackSyncIntegration: s,
    WINDOW: o,
    ignoreNextOnError: i,
    shouldIgnoreOnError: function() {
        return s > 0;
    },
    wrap: function e(t, n = {}, o) {
        if ("function" != typeof t) {
            return t;
        }
        try {
            const e = t.__sentry_wrapped__;
            if (e) {
                return "function" == typeof e ? e : t;
            }
            if (r.getOriginalFunction(t)) {
                return t;
            }
        } catch (e) {
            return t;
        }
        const s = function() {
            const o = Array.prototype.slice.call(arguments);
            try {
                const r = o.map(t => e(t, n));
                return t.apply(this, r);
            } catch (e) {
                throw i(), r.withScope(t => {
                    t.addEventProcessor(e => (n.mechanism && (r.addExceptionTypeValue(e, undefined, undefined), r.addExceptionMechanism(e, n.mechanism)), e.extra = {
                        ...e.extra,
                        arguments: o
                    }, e));
                    r.captureException(e);;
                }), e;
            }
        };
        try {
            for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && (s[e] = t[e]);
        } catch (e) {}
        r.markFunctionWrapped(s, t);
        r.addNonEnumerableProperty(t, "__sentry_wrapped__", s);;
        try {
            Object.getOwnPropertyDescriptor(s, "name").configurable && Object.defineProperty(s, "name", {
                get: () => t.name
            });
        } catch (e) {}
        return s;
    },
    SDK_VERSION: r.SDK_VERSION,
    SEMANTIC_ATTRIBUTE_SENTRY_OP: r.SEMANTIC_ATTRIBUTE_SENTRY_OP,
    SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN: r.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
    SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE: r.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
    SEMANTIC_ATTRIBUTE_SENTRY_SOURCE: r.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
    Scope: r.Scope,
    addBreadcrumb: r.addBreadcrumb,
    addEventProcessor: r.addEventProcessor,
    addIntegration: r.addIntegration,
    addTracingExtensions: r.addTracingExtensions,
    captureConsoleIntegration: r.captureConsoleIntegration,
    captureEvent: r.captureEvent,
    captureException: r.captureException,
    captureFeedback: r.captureFeedback,
    captureMessage: r.captureMessage,
    captureSession: r.captureSession,
    close: r.close,
    continueTrace: r.continueTrace,
    createTransport: r.createTransport,
    debugIntegration: r.debugIntegration,
    dedupeIntegration: r.dedupeIntegration,
    endSession: r.endSession,
    extraErrorDataIntegration: r.extraErrorDataIntegration,
    flush: r.flush,
    functionToStringIntegration: r.functionToStringIntegration,
    getActiveSpan: r.getActiveSpan,
    getClient: r.getClient,
    getCurrentHub: r.getCurrentHub,
    getCurrentScope: r.getCurrentScope,
    getGlobalScope: r.getGlobalScope,
    getIsolationScope: r.getIsolationScope,
    getRootSpan: r.getRootSpan,
    getSpanDescendants: r.getSpanDescendants,
    getSpanStatusFromHttpCode: r.getSpanStatusFromHttpCode,
    inboundFiltersIntegration: r.inboundFiltersIntegration,
    isInitialized: r.isInitialized,
    lastEventId: r.lastEventId,
    makeMultiplexedTransport: r.makeMultiplexedTransport,
    moduleMetadataIntegration: r.moduleMetadataIntegration,
    parameterize: r.parameterize,
    registerSpanErrorInstrumentation: r.registerSpanErrorInstrumentation,
    rewriteFramesIntegration: r.rewriteFramesIntegration,
    sessionTimingIntegration: r.sessionTimingIntegration,
    setContext: r.setContext,
    setCurrentClient: r.setCurrentClient,
    setExtra: r.setExtra,
    setExtras: r.setExtras,
    setHttpStatus: r.setHttpStatus,
    setMeasurement: r.setMeasurement,
    setTag: r.setTag,
    setTags: r.setTags,
    setUser: r.setUser,
    spanToBaggageHeader: r.spanToBaggageHeader,
    spanToJSON: r.spanToJSON,
    spanToTraceHeader: r.spanToTraceHeader,
    startInactiveSpan: r.startInactiveSpan,
    startNewTrace: r.startNewTrace,
    startSession: r.startSession,
    startSpan: r.startSpan,
    startSpanManual: r.startSpanManual,
    suppressTracing: r.suppressTracing,
    thirdPartyErrorFilterIntegration: r.thirdPartyErrorFilterIntegration,
    withActiveSpan: r.withActiveSpan,
    withIsolationScope: r.withIsolationScope,
    withScope: r.withScope,
    zodErrorsIntegration: r.zodErrorsIntegration,
    WINDOW: o.WINDOW,
    BrowserClient: s.BrowserClient,
    makeFetchTransport: i.makeFetchTransport,
    chromeStackLineParser: a.chromeStackLineParser,
    defaultStackLineParsers: a.defaultStackLineParsers,
    defaultStackParser: a.defaultStackParser,
    geckoStackLineParser: a.geckoStackLineParser,
    opera10StackLineParser: a.opera10StackLineParser,
    opera11StackLineParser: a.opera11StackLineParser,
    winjsStackLineParser: a.winjsStackLineParser,
    eventFromException: c.eventFromException,
    eventFromMessage: c.eventFromMessage,
    exceptionFromError: c.exceptionFromError,
    createUserFeedbackEnvelope: l.createUserFeedbackEnvelope,
    captureUserFeedback: u.captureUserFeedback,
    forceLoad: u.forceLoad,
    getDefaultIntegrations: u.getDefaultIntegrations,
    init: u.init,
    onLoad: u.onLoad,
    showReportDialog: u.showReportDialog,
    breadcrumbsIntegration: d.breadcrumbsIntegration,
    globalHandlersIntegration: p.globalHandlersIntegration,
    httpContextIntegration: h.httpContextIntegration,
    linkedErrorsIntegration: m.linkedErrorsIntegration,
    browserApiErrorsIntegration: f.browserApiErrorsIntegration,
    lazyLoadIntegration: g.lazyLoadIntegration,
    reportingObserverIntegration: _.reportingObserverIntegration,
    httpClientIntegration: y.httpClientIntegration,
    contextLinesIntegration: S.contextLinesIntegration,
    getReplay: v.getReplay,
    replayIntegration: v.replayIntegration,
    replayCanvasIntegration: b.replayCanvasIntegration,
    feedbackAsyncIntegration: E.feedbackAsyncIntegration,
    feedbackIntegration: T.feedbackSyncIntegration,
    feedbackSyncIntegration: T.feedbackSyncIntegration,
    getFeedback: I.getFeedback,
    sendFeedback: I.sendFeedback,
    metrics: C.metrics,
    defaultRequestInstrumentationOptions: w.defaultRequestInstrumentationOptions,
    instrumentOutgoingRequests: w.instrumentOutgoingRequests,
    browserTracingIntegration: k.browserTracingIntegration,
    startBrowserTracingNavigationSpan: k.startBrowserTracingNavigationSpan,
    startBrowserTracingPageLoadSpan: k.startBrowserTracingPageLoadSpan,
    makeBrowserOfflineTransport: A.makeBrowserOfflineTransport,
    browserProfilingIntegration: M.browserProfilingIntegration,
    spotlightBrowserIntegration: x.spotlightBrowserIntegration,
    breadcrumbsIntegration: a,
    browserApiErrorsIntegration: i,
    applySourceContextToFrame: i,
    contextLinesIntegration: s,
    globalHandlersIntegration: a,
    httpClientIntegration: i,
    httpContextIntegration: s,
    linkedErrorsIntegration: s,
    reportingObserverIntegration: i,
    INTEGRATION_NAME: "SpotlightBrowser",
    isSpotlightInteraction: c,
    spotlightBrowserIntegration: a,
    metrics: o,
    browserProfilingIntegration: a,
    startProfileForSpan: function(e) {
        let t;
        i.isAutomatedPageLoadSpan(e) && (t = 1e3 * r.timestampInSeconds());
        const n = i.startJSSelfProfile();
        if (!n) {
            return;
        }
        o.DEBUG_BUILD && r.logger.log(`[Profiling] started profiling span: ${r.spanToJSON(e).description}`);
        const a = r.uuid4();
        async function c() {
            if (e && n) {
                return n.stop().then(t => {
                    l && (s.WINDOW.clearTimeout(l), l = undefined);
                    o.DEBUG_BUILD && r.logger.log(`[Profiling] stopped profiling of span: ${r.spanToJSON(e).description}`);
                    t ? i.addProfileToGlobalCache(a, t) : o.DEBUG_BUILD && r.logger.log(`[Profiling] profiler returned null profile for: ${r.spanToJSON(e).description}`, "this may indicate an overlapping span or a call to stopProfiling with a profile title that was never started");;
                }).catch(e => {
                    o.DEBUG_BUILD && r.logger.log("[Profiling] error while stopping profiler:", e);
                });
            }
        }
        r.getCurrentScope().setContext("profile", {
            profile_id: a,
            start_timestamp: t
        });
        let l = s.WINDOW.setTimeout(() => {
            o.DEBUG_BUILD && r.logger.log("[Profiling] max profile duration elapsed, stopping profiling for:", r.spanToJSON(e).description);
            c();;
        }, i.MAX_PROFILE_DURATION_MS);
        const u = e.end.bind(e);
        e.end = function() {
            return e ? (c().then(() => {
                u();
            }, () => {
                u();
            }), e) : u();
        };
    },
    MAX_PROFILE_DURATION_MS: 3e4,
    addProfileToGlobalCache: function(e, t) {
        if (E.set(e, t), E.size > 30) {
            const e = E.keys().next().value;
            E.delete(e);
        }
    },
    addProfilesToEnvelope: function(e, t) {
        if (!t.length) {
            return e;
        }
        for (const n of t) e[1].push([{
            type: "profile"
        }, n]);
        return e;
    },
    applyDebugMetadata: S,
    convertJSSelfProfileToSampledFormat: y,
    createProfilePayload: _,
    createProfilingEvent: function(e, t, n, s) {
        return function(e) {
            return e.samples.length < 2 ? (o.DEBUG_BUILD && r.logger.log("[Profiling] Discarding profile because it contains less than 2 samples"), false) : !!e.frames.length || (o.DEBUG_BUILD && r.logger.log("[Profiling] Discarding profile because it contains no frames"), false);
        }(n) ? _(e, t, n, s) : null;
    },
    enrichWithThreadInformation: g,
    findProfiledTransactionsFromEnvelope: function(e) {
        const t = [];
        return r.forEachEnvelopeItem(e, (e, n) => {
            if ("transaction" === n) {
                for (let n = 1; n < e.length; n++) {
                    const r = e[n];
                    r && r.contexts && r.contexts.profile && r.contexts.profile.profile_id && t.push(e[n]);
                }
            }
        }), t;
    },
    getActiveProfilesCount: function() {
        return E.size;
    },
    isAutomatedPageLoadSpan: function(e) {
        return "pageload" === r.spanToJSON(e).op;
    },
    isValidSampleRate: v,
    shouldProfileSpan: function(e) {
        if (b) {
            return o.DEBUG_BUILD && r.logger.log("[Profiling] Profiling has been disabled for the duration of the current user session."), false;
        }
        if (!e.isRecording()) {
            return o.DEBUG_BUILD && r.logger.log("[Profiling] Discarding profile because transaction was not sampled."), false;
        }
        const t = r.getClient(),
            n = t && t.getOptions();
        if (!n) {
            return o.DEBUG_BUILD && r.logger.log("[Profiling] Profiling disabled, no options found."), false;
        }
        const s = n.profilesSampleRate;
        return v(s) ? s ? !!(true === s || Math.random() < s) || (o.DEBUG_BUILD && r.logger.log(`[Profiling] Discarding profile because it's not included in the random sample (sampling rate = ${Number(s)})`), false) : (o.DEBUG_BUILD && r.logger.log("[Profiling] Discarding profile because a negative sampling decision was inherited or profileSampleRate is set to 0"), false) : (o.DEBUG_BUILD && r.logger.warn("[Profiling] Discarding profile because of invalid sample rate."), false);
    },
    startJSSelfProfile: function() {
        const e = s.WINDOW.Profiler;
        if ("function" != typeof e) {
            return void(o.DEBUG_BUILD && r.logger.log("[Profiling] Profiling is not supported by this browser, Profiler interface missing on window object."));
        }
        const t = Math.floor(3e3);
        try {
            return new e({
                sampleInterval: 10,
                maxBufferSize: t
            });
        } catch (e) {
            o.DEBUG_BUILD && (r.logger.log("[Profiling] Failed to initialize the Profiling constructor, this is likely due to a missing 'Document-Policy': 'js-profiling' header."), r.logger.log("[Profiling] Disabling profiling for current user session."));
            b = true;;
        }
    },
    takeProfileFromGlobalCache: function(e) {
        const t = E.get(e);
        return t && E.delete(e), t;
    },
    captureUserFeedback: function(e) {
        const t = r.getClient();
        t && t.captureUserFeedback(e);
    },
    forceLoad: function() {},
    getDefaultIntegrations: f,
    init: function(e = {}) {
        const t = function(e = {}) {
            const t = {
                defaultIntegrations: f(),
                release: "string" == typeof __SENTRY_RELEASE__ ? __SENTRY_RELEASE__ : a.WINDOW.SENTRY_RELEASE && a.WINDOW.SENTRY_RELEASE.id ? a.WINDOW.SENTRY_RELEASE.id : undefined,
                autoSessionTracking: true,
                sendClientReports: true
            };
            return null == e.defaultIntegrations && delete e.defaultIntegrations, {
                ...t,
                ...e
            };
        }(e);
        if (!t.skipBrowserExtensionCheck && function() {
                const e = undefined !== a.WINDOW.window && a.WINDOW;
                if (!e) {
                    return false;
                }
                const t = e[e.chrome ? "chrome" : "browser"],
                    n = t && t.runtime && t.runtime.id,
                    r = a.WINDOW.location && a.WINDOW.location.href || "",
                    o = !!n && a.WINDOW === a.WINDOW.top && ["chrome-extension:", "moz-extension:", "ms-browser-extension:", "safari-web-extension:"].some(e => r.startsWith(`${e}//`)),
                    s = undefined !== e.nw;
                return !!n && !o && !s;
            }()) {
            return void r.consoleSandbox(() => {
                console.error("[Sentry] You cannot run Sentry this way in a browser extension, check: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/");
            });
        }
        i.DEBUG_BUILD && (r.supportsFetch() || r.logger.warn("No Fetch API detected. The Sentry SDK requires a Fetch API compatible environment to send events. Please add a Fetch API polyfill."));
        const n = {
                ...t,
                stackParser: r.stackParserFromStackParserOptions(t.stackParser || h.defaultStackParser),
                integrations: r.getIntegrationsToSetup(t),
                transport: t.transport || m.makeFetchTransport
            },
            c = r.initAndBind(s.BrowserClient, n);
        return t.autoSessionTracking && (undefined !== a.WINDOW.document ? (r.startSession({
            ignoreDuration: true
        }), r.captureSession(), o.addHistoryInstrumentationHandler(({
            from: e,
            to: t
        }) => {
            undefined !== e && e !== t && (r.startSession({
                ignoreDuration: true
            }), r.captureSession());
        })) : i.DEBUG_BUILD && r.logger.warn("Session tracking in non-browser environment with @sentry/browser is not supported.")), c;
    },
    onLoad: function(e) {
        e();
    },
    showReportDialog: function(e = {}) {
        if (!a.WINDOW.document) {
            return void(i.DEBUG_BUILD && r.logger.error("Global document not defined in showReportDialog call"));
        }
        const t = r.getCurrentScope(),
            n = t.getClient(),
            o = n && n.getDsn();
        if (!o) {
            return void(i.DEBUG_BUILD && r.logger.error("DSN not configured for showReportDialog call"));
        }
        if (t && (e.user = {
                ...t.getUser(),
                ...e.user
            }), !e.eventId) {
            const t = r.lastEventId();
            t && (e.eventId = t);
        }
        const s = a.WINDOW.document.createElement("script");;;;
        e.onLoad && (s.onload = e.onLoad);;
        const {
            onClose: c
        } = e;
        if (c) {
            const e = t => {
                if ("__sentry_reportdialog_closed__" === t.data) {
                    try {
                        c();
                    } finally {
                        a.WINDOW.removeEventListener("message", e);
                    }
                }
            };
            a.WINDOW.addEventListener("message", e);
        }
        const l = a.WINDOW.document.head || a.WINDOW.document.body;
        l ? l.appendChild(s) : i.DEBUG_BUILD && r.logger.error("Not injecting report dialog. No injection point found in HTML");
    },
    chromeStackLineParser: c,
    defaultStackLineParsers: y,
    defaultStackParser: S,
    geckoStackLineParser: d,
    opera10StackLineParser: f,
    opera11StackLineParser: _,
    winjsStackLineParser: h,
    registerBackgroundTabDetection: function() {
        s.WINDOW && s.WINDOW.document ? s.WINDOW.document.addEventListener("visibilitychange", () => {
            const e = r.getActiveSpan();
            if (!e) {
                return;
            }
            const t = r.getRootSpan(e);
            if (s.WINDOW.document.hidden && t) {
                const e = "cancelled",
                    {
                        op: n,
                        status: s
                    } = r.spanToJSON(t);
                o.DEBUG_BUILD && r.logger.log(`[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${n}`);
                s || t.setStatus({
                    code: r.SPAN_STATUS_ERROR,
                    message: e
                });
                t.setAttribute("sentry.cancellation_reason", "document.hidden");
                t.end();;
            }
        }) : o.DEBUG_BUILD && r.logger.warn("[Tracing] Could not set up background tab detection due to lack of global document");
    },
    BROWSER_TRACING_INTEGRATION_ID: "BrowserTracing",
    browserTracingIntegration: (e = {}) => {
        o.registerSpanErrorInstrumentation();
        const {
            enableInp: t,
            enableLongTask: n,
            enableLongAnimationFrame: m,
            _experiments: {
                enableInteractions: f,
                enableStandaloneClsSpans: g
            },
            beforeStartSpan: _,
            idleTimeout: y,
            finalTimeout: S,
            childSpanTimeout: v,
            markBackgroundSpan: b,
            traceFetch: E,
            traceXHR: T,
            trackFetchStreamPerformance: I,
            shouldCreateSpanForRequest: C,
            enableHTTPTimings: w,
            instrumentPageLoad: k,
            instrumentNavigation: A
        } = {
            ...u,
            ...e
        }, M = r.startTrackingWebVitals({
            recordClsStandaloneSpans: g || false
        });
        t && r.startTrackingINP();
        m && o.GLOBAL_OBJ.PerformanceObserver && PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes("long-animation-frame") ? r.startTrackingLongAnimationFrames() : n && r.startTrackingLongTasks();
        f && r.startTrackingInteractions();;
        const x = {
            name: undefined,
            source: undefined
        };

        function O(e, t) {
            const n = "pageload" === t.op,
                s = _ ? _(t) : t,
                a = s.attributes || {};
            if (t.name !== s.name) {
                a[o.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "custom";
                s.attributes = a;
            }
            x.name = s.name;
            x.source = a[o.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];;
            const c = o.startIdleSpan(s, {
                idleTimeout: y,
                finalTimeout: S,
                childSpanTimeout: v,
                disableAutoFinish: n,
                beforeSpanEnd: e => {
                    M();
                    r.addPerformanceEntries(e, {
                        recordClsOnPageloadSpan: !g
                    });;
                }
            });

            function l() {
                ["interactive", "complete"].includes(i.WINDOW.document.readyState) && e.emit("idleSpanEnableAutoFinish", c);
            }
            return n && i.WINDOW.document && (i.WINDOW.document.addEventListener("readystatechange", () => {
                l();
            }), l()), c;
        }
        return {
            name: "BrowserTracing",
            afterAllSetup(e) {
                let n, l = i.WINDOW.location && i.WINDOW.location.href;
                e.on("startNavigationSpan", t => {
                    if (o.getClient() === e) {
                        n && !o.spanToJSON(n).timestamp && (s.DEBUG_BUILD && o.logger.log(`[Tracing] Finishing current root span with op: ${o.spanToJSON(n).op}`), n.end());
                        n = O(e, {
                            op: "navigation",
                            ...t
                        });
                    }
                });
                e.on("startPageLoadSpan", (t, r = {}) => {
                    if (o.getClient() !== e) {
                        return;
                    }
                    n && !o.spanToJSON(n).timestamp && (s.DEBUG_BUILD && o.logger.log(`[Tracing] Finishing current root span with op: ${o.spanToJSON(n).op}`), n.end());
                    const i = r.sentryTrace || h("sentry-trace"),
                        a = r.baggage || h("baggage"),
                        c = o.propagationContextFromHeaders(i, a);
                    o.getCurrentScope().setPropagationContext(c);
                    n = O(e, {
                        op: "pageload",
                        ...t
                    });;
                });
                e.on("spanEnd", e => {
                    const t = o.spanToJSON(e).op;
                    if (e !== o.getRootSpan(e) || "navigation" !== t && "pageload" !== t) {
                        return;
                    }
                    const n = o.getCurrentScope(),
                        r = n.getPropagationContext();
                    n.setPropagationContext({
                        ...r,
                        sampled: undefined !== r.sampled ? r.sampled : o.spanIsSampled(e),
                        dsc: r.dsc || o.getDynamicSamplingContextFromSpan(e)
                    });
                });
                i.WINDOW.location && (k && d(e, {
                    name: i.WINDOW.location.pathname,
                    startTime: o.browserPerformanceTimeOrigin ? o.browserPerformanceTimeOrigin / 1e3 : undefined,
                    attributes: {
                        [o.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
                        [o.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.pageload.browser"
                    }
                }), A && r.addHistoryInstrumentationHandler(({
                    to: t,
                    from: n
                }) => {
                    undefined === n && l && -1 !== l.indexOf(t) ? l = undefined : n !== t && (l = undefined, p(e, {
                        name: i.WINDOW.location.pathname,
                        attributes: {
                            [o.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
                            [o.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.navigation.browser"
                        }
                    }));
                }));
                b && a.registerBackgroundTabDetection();
                f && function(e, t, n, r) {
                    let a;
                    i.WINDOW.document && addEventListener("click", () => {
                        const c = o.getActiveSpan(),
                            l = c && o.getRootSpan(c);
                        if (l) {
                            const e = o.spanToJSON(l).op;
                            if (["navigation", "pageload"].includes(e)) {
                                return void(s.DEBUG_BUILD && o.logger.warn(`[Tracing] Did not create ${"ui.action.click"} span because a pageload or navigation span is in progress.`));
                            }
                        }
                        a && (a.setAttribute(o.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, "interactionInterrupted"), a.end(), a = undefined);
                        r.name ? a = o.startIdleSpan({
                            name: r.name,
                            op: "ui.action.click",
                            attributes: {
                                [o.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: r.source || "url"
                            }
                        }, {
                            idleTimeout: e,
                            finalTimeout: t,
                            childSpanTimeout: n
                        }) : s.DEBUG_BUILD && o.logger.warn(`[Tracing] Did not create ${"ui.action.click"} transaction because _latestRouteName is missing.`);;
                    }, {
                        once: false,
                        capture: true
                    });
                }(y, S, v, x);
                t && r.registerInpInteractionListener();
                c.instrumentOutgoingRequests(e, {
                    traceFetch: E,
                    traceXHR: T,
                    trackFetchStreamPerformance: I,
                    tracePropagationTargets: e.getOptions().tracePropagationTargets,
                    shouldCreateSpanForRequest: C,
                    enableHTTPTimings: w
                });;
            }
        };
    },
    getMetaContent: h,
    startBrowserTracingNavigationSpan: p,
    startBrowserTracingPageLoadSpan: d,
    defaultRequestInstrumentationOptions: c,
    extractNetworkProtocol: u,
    instrumentOutgoingRequests: function(e, t) {
        const {
            traceFetch: n,
            traceXHR: s,
            trackFetchStreamPerformance: u,
            shouldCreateSpanForRequest: d,
            enableHTTPTimings: f,
            tracePropagationTargets: g
        } = {
            traceFetch: true,
            traceXHR: true,
            trackFetchStreamPerformance: false,
            ...t
        }, _ = "function" == typeof d ? d : e => true, y = e => p(e, g), S = {};
        n && (e.addEventProcessor(e => ("transaction" === e.type && e.spans && e.spans.forEach(e => {
            if ("http.client" === e.op) {
                const t = a.get(e.span_id);
                t && (e.timestamp = t / 1e3, a.delete(e.span_id));
            }
        }), e)), u && o.addFetchEndInstrumentationHandler(e => {
            if (e.response) {
                const t = i.get(e.response);
                t && e.endTimestamp && a.set(t, e.endTimestamp);
            }
        }), o.addFetchInstrumentationHandler(e => {
            const t = o.instrumentFetchRequest(e, _, y, S);
            if (e.response && e.fetchData.__span && i.set(e.response, e.fetchData.__span), t) {
                const n = m(e.fetchData.url),
                    r = n ? o.parseUrl(n).host : undefined;
                t.setAttributes({
                    "http.url": n,
                    "server.address": r
                });
            }
            f && t && l(t);
        }));
        s && r.addXhrInstrumentationHandler(e => {
            const t = h(e, _, y, S);
            f && t && l(t);
        });;
    },
    shouldAttachHeaders: p,
    xhrCallback: h,
    makeFetchTransport: function(e, t = r.getNativeImplementation("fetch")) {
        let n = 0,
            s = 0;
        return o.createTransport(e, function(i) {
            const a = i.body.length;
            n += a;
            s++;;
            const c = {
                body: i.body,
                method: "POST",
                referrerPolicy: "origin",
                headers: e.headers,
                keepalive: n <= 6e4 && s < 15,
                ...e.fetchOptions
            };
            if (!t) {
                return r.clearCachedImplementation("fetch"), o.rejectedSyncPromise("No fetch implementation available");
            }
            try {
                return t(e.url, c).then(e => (n -= a, s--, {
                    statusCode: e.status,
                    headers: {
                        "x-sentry-rate-limits": e.headers.get("X-Sentry-Rate-Limits"),
                        "retry-after": e.headers.get("Retry-After")
                    }
                }));
            } catch (e) {
                return r.clearCachedImplementation("fetch"), n -= a, s--, o.rejectedSyncPromise(e);
            }
        });
    },
    createStore: i,
    makeBrowserOfflineTransport: function(e = o.makeFetchTransport) {
        return t => e({
            ...t,
            createStore: d
        });
    },
    push: c,
    shift: u,
    unshift: l,
    createUserFeedbackEnvelope: function(e, {
        metadata: t,
        tunnel: n,
        dsn: o
    }) {
        const s = {
                event_id: e.event_id,
                sent_at: (new Date).toISOString(),
                ...t && t.sdk && {
                    sdk: {
                        name: t.sdk.name,
                        version: t.sdk.version
                    }
                },
                ...!!n && !!o && {
                    dsn: r.dsnToString(o)
                }
            },
            i = function(e) {
                return [{
                    type: "user_report"
                }, e];
            }(e);
        return r.createEnvelope(s, [i]);
    },
    lazyLoadIntegration: async function(e, t) {
        const n = s[e],
            a = i.Sentry = i.Sentry || {};
        if (!n) {
            throw new Error(`Cannot lazy load integration: ${e}`);
        }
        const c = a[e];
        if ("function" == typeof c && !("_isShim" in c)) {
            return c;
        }
        const l = function(e) {
                const t = r.getClient(),
                    n = t && t.getOptions(),
                    o = n && n.cdnBaseUrl || "https://browser.sentry-cdn.com";
                return new URL(`/${r.SDK_VERSION}/${e}.min.js`, o).toString();
            }(n),
            u = o.WINDOW.document.createElement("script");
        u.src = l;
        u.crossOrigin = "anonymous";
        u.referrerPolicy = "origin";
        t && u.setAttribute("nonce", t);;
        const d = new Promise((e, t) => {
                u.addEventListener("load", () => e());
                u.addEventListener("error", t);;
            }),
            p = o.WINDOW.document.currentScript,
            h = o.WINDOW.document.body || o.WINDOW.document.head || p && p.parentElement;
        if (!h) {
            throw new Error(`Could not find parent element to insert lazy-loaded ${e} script`);
        }
        h.appendChild(u);
        try {
            await d;
        } catch (t) {
            throw new Error(`Error when loading integration: ${e}`);
        }
        const m = a[e];
        if ("function" != typeof m) {
            throw new Error(`Could not load integration: ${e}`);
        }
        return m;
    },
    getEnvelopeEndpointWithUrlEncodedAuth: function(e, t, n) {
        return t || `${function (e) {
    return `${s(e)}${e.projectId}/envelope/`;
  }(e)}?${o.urlEncode({sentry_key: e.publicKey, sentry_version: "7", ...n && {sentry_client: `${n.name}/${n.version}`}})}`;
    },
    getReportDialogEndpoint: function(e, t) {
        const n = r.makeDsn(e);
        if (!n) {
            return "";
        }
        const o = `${s(n)}embed/error-page/`;
        let i = `dsn=${r.dsnToString(n)}`;
        for (const e in t)
            if ("dsn" !== e && "onClose" !== e) {
                if ("user" === e) {
                    const e = t.user;
                    if (!e) {
                        continue;
                    }
                    e.name && (i += `&name=${encodeURIComponent(e.name)}`);
                    e.email && (i += `&email=${encodeURIComponent(e.email)}`);;
                } else {
                    i += `&${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`;
                }
            }
        return `${o}?${i}`;
    },
    getAsyncContextStrategy: function(e) {
        const t = r.getSentryCarrier(e);
        return t.acs ? t.acs : o.getStackAsyncContextStrategy();
    },
    setAsyncContextStrategy: function(e) {
        const t = r.getMainCarrier();
        r.getSentryCarrier(t).acs = e;
    },
    AsyncContextStack: a,
    getStackAsyncContextStrategy: function() {
        return {
            withIsolationScope: d,
            withScope: l,
            withSetScope: u,
            withSetIsolationScope: (e, t) => c().withScope(() => t(c().getIsolationScope())),
            getCurrentScope: () => c().getScope(),
            getIsolationScope: () => c().getIsolationScope()
        };
    },
    BaseClient: class {
        constructor(e) {
            if (this._options = e, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], e.dsn ? this._dsn = d.makeDsn(e.dsn) : s.DEBUG_BUILD && f.logger.warn("No DSN provided, client will not send events."), this._dsn) {
                const t = r.getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, e.tunnel, e._metadata ? e._metadata.sdk : undefined);
                this._transport = e.transport({
                    tunnel: this._options.tunnel,
                    recordDroppedEvent: this.recordDroppedEvent.bind(this),
                    ...e.transportOptions,
                    url: t
                });
            }
        }
        captureException(e, t, n) {
            const r = g.uuid4();
            if (g.checkOrSetAlreadyCaught(e)) {
                return s.DEBUG_BUILD && f.logger.log("Not capturing exception because it's already been captured."), r;
            }
            const o = {
                event_id: r,
                ...t
            };
            return this._process(this.eventFromException(e, o).then(e => this._captureEvent(e, o, n))), o.event_id;
        }
        captureMessage(e, t, n, r) {
            const o = {
                    event_id: g.uuid4(),
                    ...n
                },
                s = m.isParameterizedString(e) ? e : String(e),
                i = m.isPrimitive(e) ? this.eventFromMessage(s, t, o) : this.eventFromException(e, o);
            return this._process(i.then(e => this._captureEvent(e, o, r))), o.event_id;
        }
        captureEvent(e, t, n) {
            const r = g.uuid4();
            if (t && t.originalException && g.checkOrSetAlreadyCaught(t.originalException)) {
                return s.DEBUG_BUILD && f.logger.log("Not capturing exception because it's already been captured."), r;
            }
            const o = {
                    event_id: r,
                    ...t
                },
                i = (e.sdkProcessingMetadata || {}).capturedSpanScope;
            return this._process(this._captureEvent(e, o, i || n)), o.event_id;
        }
        captureSession(e) {
            "string" != typeof e.release ? s.DEBUG_BUILD && f.logger.warn("Discarded session because of missing or non-string release") : (this.sendSession(e), c.updateSession(e, {
                init: false
            }));
        }
        getDsn() {
            return this._dsn;
        }
        getOptions() {
            return this._options;
        }
        getSdkMetadata() {
            return this._options._metadata;
        }
        getTransport() {
            return this._transport;
        }
        flush(e) {
            const t = this._transport;
            return t ? (this.emit("flush"), this._isClientDoneProcessing(e).then(n => t.flush(e).then(e => n && e))) : y.resolvedSyncPromise(true);
        }
        close(e) {
            return this.flush(e).then(e => (this.getOptions().enabled = false, this.emit("close"), e));
        }
        getEventProcessors() {
            return this._eventProcessors;
        }
        addEventProcessor(e) {
            this._eventProcessors.push(e);
        }
        init() {
            (this._isEnabled() || this._options.integrations.some(({
                name: e
            }) => e.startsWith("Spotlight"))) && this._setupIntegrations();
        }
        getIntegrationByName(e) {
            return this._integrations[e];
        }
        addIntegration(e) {
            const t = this._integrations[e.name];
            a.setupIntegration(this, e, this._integrations);
            t || a.afterSetupIntegrations(this, [e]);;
        }
        sendEvent(e, t = {}) {
            this.emit("beforeSendEvent", e, t);
            let n = i.createEventEnvelope(e, this._dsn, this._options._metadata, this._options.tunnel);
            for (const e of t.attachments || []) n = p.addItemToEnvelope(n, p.createAttachmentEnvelopeItem(e));
            const r = this.sendEnvelope(n);
            r && r.then(t => this.emit("afterSendEvent", e, t), null);
        }
        sendSession(e) {
            const t = i.createSessionEnvelope(e, this._dsn, this._options._metadata, this._options.tunnel);
            this.sendEnvelope(t);
        }
        recordDroppedEvent(e, t, n) {
            if (this._options.sendClientReports) {
                const r = "number" == typeof n ? n : 1,
                    o = `${e}:${t}`;
                s.DEBUG_BUILD && f.logger.log(`Recording outcome: "${o}"${r > 1 ? ` (${r} times)` : ""}`);
                this._outcomes[o] = (this._outcomes[o] || 0) + r;;
            }
        }
        on(e, t) {
            const n = this._hooks[e] = this._hooks[e] || [];
            return n.push(t), () => {
                const e = n.indexOf(t);
                e > -1 && n.splice(e, 1);
            };
        }
        emit(e, ...t) {
            const n = this._hooks[e];
            n && n.forEach(e => e(...t));
        }
        sendEnvelope(e) {
            return this.emit("beforeEnvelope", e), this._isEnabled() && this._transport ? this._transport.send(e).then(null, e => (s.DEBUG_BUILD && f.logger.error("Error while sending envelope:", e), e)) : (s.DEBUG_BUILD && f.logger.error("Transport disabled"), y.resolvedSyncPromise({}));
        }
        _setupIntegrations() {
            const {
                integrations: e
            } = this._options;
            this._integrations = a.setupIntegrations(this, e);
            a.afterSetupIntegrations(this, e);;
        }
        _updateSessionFromEvent(e, t) {
            let n = false,
                r = false;
            const o = t.exception && t.exception.values;
            if (o) {
                r = true;
                for (const e of o) {
                    const t = e.mechanism;
                    if (t && false === t.handled) {
                        n = true;
                        break;
                    }
                }
            }
            const s = "ok" === e.status;
            (s && 0 === e.errors || s && n) && (c.updateSession(e, {
                ...n && {
                    status: "crashed"
                },
                errors: e.errors || Number(r || n)
            }), this.captureSession(e));
        }
        _isClientDoneProcessing(e) {
            return new y.SyncPromise(t => {
                let n = 0;
                const r = setInterval(() => {
                    0 == this._numProcessing ? (clearInterval(r), t(true)) : (n += 1, e && n >= e && (clearInterval(r), t(false)));
                }, 1);
            });
        }
        _isEnabled() {
            return false !== this.getOptions().enabled && undefined !== this._transport;
        }
        _prepareEvent(e, t, n, r = o.getIsolationScope()) {
            const s = this.getOptions(),
                i = Object.keys(this._integrations);
            return !t.integrations && i.length > 0 && (t.integrations = i), this.emit("preprocessEvent", e, t), e.type || r.setLastEventId(e.event_id || t.event_id), v.prepareEvent(s, e, t, n, this, r).then(e => {
                if (null === e) {
                    return e;
                }
                const t = {
                    ...r.getPropagationContext(),
                    ...n ? n.getPropagationContext() : undefined
                };
                if ((!e.contexts || !e.contexts.trace) && t) {
                    const {
                        traceId: n,
                        spanId: r,
                        parentSpanId: o,
                        dsc: s
                    } = t;
                    e.contexts = {
                        trace: _.dropUndefinedKeys({
                            trace_id: n,
                            span_id: r,
                            parent_span_id: o
                        }),
                        ...e.contexts
                    };
                    const i = s || l.getDynamicSamplingContextFromClient(n, this);
                    e.sdkProcessingMetadata = {
                        dynamicSamplingContext: i,
                        ...e.sdkProcessingMetadata
                    };
                }
                return e;
            });
        }
        _captureEvent(e, t = {}, n) {
            return this._processEvent(e, t, n).then(e => e.event_id, e => {
                if (s.DEBUG_BUILD) {
                    const t = e;
                    "log" === t.logLevel ? f.logger.log(t.message) : f.logger.warn(t);
                }
            });
        }
        _processEvent(e, t, n) {
            const r = this.getOptions(),
                {
                    sampleRate: o
                } = r,
                s = "transaction" === e.type,
                i = undefined === e.type,
                a = e.type || "error",
                c = `before send for type \`${a}\``,
                l = undefined === o ? undefined : S.parseSampleRate(o);
            if (i && "number" == typeof l && Math.random() > l) {
                return this.recordDroppedEvent("sample_rate", "error", e), y.rejectedSyncPromise(new h.SentryError(`Discarding event because it's not included in the random sample (sampling rate = ${o})`, "log"));
            }
            const u = "replay_event" === a ? "replay" : a,
                d = (e.sdkProcessingMetadata || {}).capturedSpanIsolationScope;
            return this._prepareEvent(e, t, n, d).then(n => {
                if (null === n) {
                    throw this.recordDroppedEvent("event_processor", u, e), new h.SentryError("An event processor returned `null`, will not send event.", "log");
                }
                if (t.data && true === t.data.__sentry__) {
                    return n;
                }
                const o = function(e, t, n, r) {
                    const {
                        beforeSend: o,
                        beforeSendTransaction: s,
                        beforeSendSpan: i
                    } = t;
                    if (undefined === n.type && o) {
                        return o(n, r);
                    }
                    if ("transaction" === n.type) {
                        if (n.spans && i) {
                            const t = [];
                            for (const r of n.spans) {
                                const n = i(r);
                                n ? t.push(n) : e.recordDroppedEvent("before_send", "span");
                            };
                        }
                        if (s) {
                            if (n.spans) {
                                const e = n.spans.length;;
                            }
                            return s(n, r);
                        }
                    }
                    return n;
                }(this, r, n, t);
                return function(e, t) {
                    const n = `${t} must return \`null\` or a valid event.`;
                    if (m.isThenable(e)) {
                        return e.then(e => {
                            if (!m.isPlainObject(e) && null !== e) {
                                throw new h.SentryError(n);
                            }
                            return e;
                        }, e => {
                            throw new h.SentryError(`${t} rejected with ${e}`);
                        });
                    }
                    if (!m.isPlainObject(e) && null !== e) {
                        throw new h.SentryError(n);
                    }
                    return e;
                }(o, c);
            }).then(r => {
                if (null === r) {
                    if (this.recordDroppedEvent("before_send", u, e), s) {
                        const t = 1 + (e.spans || []).length;
                        this.recordDroppedEvent("before_send", "span", t);
                    }
                    throw new h.SentryError(`${c} returned \`null\`, will not send event.`, "log");
                }
                const o = n && n.getSession();
                if (!s && o && this._updateSessionFromEvent(o, r), s) {
                    const e = (r.sdkProcessingMetadata && r.sdkProcessingMetadata.spanCountBeforeProcessing || 0) - (r.spans ? r.spans.length : 0);
                    e > 0 && this.recordDroppedEvent("before_send", "span", e);
                }
                const i = r.transaction_info;
                if (s && i && r.transaction !== e.transaction) {
                    const e = "custom";;
                }
                return this.sendEvent(r, t), r;
            }).then(null, e => {
                if (e instanceof h.SentryError) {
                    throw e;
                }
                throw this.captureException(e, {
                    data: {
                        __sentry__: true
                    },
                    originalException: e
                }), new h.SentryError(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`);
            });
        }
        _process(e) {
            this._numProcessing++;
            e.then(e => (this._numProcessing--, e), e => (this._numProcessing--, e));;
        }
        _clearOutcomes() {
            const e = this._outcomes;
            return this._outcomes = {}, Object.entries(e).map(([e, t]) => {
                const [n, r] = e.split(":");
                return {
                    reason: n,
                    category: r,
                    quantity: t
                };
            });
        }
        _flushOutcomes() {
            s.DEBUG_BUILD && f.logger.log("Flushing outcomes...");
            const e = this._clearOutcomes();
            if (0 === e.length) {
                return void(s.DEBUG_BUILD && f.logger.log("No outcomes to send"));
            }
            if (!this._dsn) {
                return void(s.DEBUG_BUILD && f.logger.log("No dsn provided, will not send outcomes"));
            }
            s.DEBUG_BUILD && f.logger.log("Sending outcomes:", e);
            const t = u.createClientReportEnvelope(e, this._options.tunnel && d.dsnToString(this._dsn));
            this.sendEnvelope(t);
        }
    },
    addBreadcrumb: function(e, t) {
        const n = r.getClient(),
            a = r.getIsolationScope();
        if (!n) {
            return;
        }
        const {
            beforeBreadcrumb: c = null,
            maxBreadcrumbs: l = 100
        } = n.getOptions();
        if (l <= 0) {
            return;
        }
        const u = {
                timestamp: s.dateTimestampInSeconds(),
                ...e
            },
            d = c ? o.consoleSandbox(() => c(u, t)) : u;
        if (null !== d) {
            n.emit && n.emit("beforeAddBreadcrumb", d, t);
            a.addBreadcrumb(d, l);
        }
    },
    getMainCarrier: function() {
        return s(o.GLOBAL_OBJ), o.GLOBAL_OBJ;
    },
    getSentryCarrier: s,
    createCheckInEnvelope: function(e, t, n, i, a) {
        const c = {
            sent_at: (new Date).toISOString()
        };
        n && n.sdk && (c.sdk = {
            name: n.sdk.name,
            version: n.sdk.version
        });
        i && a && (c.dsn = r.dsnToString(a));
        t && (c.trace = s.dropUndefinedKeys(t));;
        const l = function(e) {
            return [{
                type: "check_in"
            }, e];
        }(e);
        return o.createEnvelope(c, [l]);
    },
    DEFAULT_ENVIRONMENT: "production",
    getClient: function() {
        return a().getClient();
    },
    getCurrentScope: a,
    getGlobalScope: function() {
        return i.getGlobalSingleton("globalScope", () => new s.Scope);
    },
    getIsolationScope: function() {
        const e = o.getMainCarrier();
        return r.getAsyncContextStrategy(e).getIsolationScope();
    },
    withIsolationScope: function(...e) {
        const t = o.getMainCarrier(),
            n = r.getAsyncContextStrategy(t);
        if (2 === e.length) {
            const [t, r] = e;
            return t ? n.withSetIsolationScope(t, r) : n.withIsolationScope(r);
        }
        return n.withIsolationScope(e[0]);
    },
    withScope: function(...e) {
        const t = o.getMainCarrier(),
            n = r.getAsyncContextStrategy(t);
        if (2 === e.length) {
            const [t, r] = e;
            return t ? n.withSetScope(t, r) : n.withScope(r);
        }
        return n.withScope(e[0]);
    },
    DEBUG_BUILD: n,
    getDefaultCurrentScope: function() {
        return o.getGlobalSingleton("defaultCurrentScope", () => new r.Scope);
    },
    getDefaultIsolationScope: function() {
        return o.getGlobalSingleton("defaultIsolationScope", () => new r.Scope);
    },
    createEventEnvelope: function(e, t, n, r) {
        const o = s.getSdkMetadataForEnvelopeHeader(n),
            i = e.type && "replay_event" !== e.type ? e.type : "event";
        ! function(e, t) {
            t && (e.sdk = e.sdk || {}, e.sdk.name = e.sdk.name || t.name, e.sdk.version = e.sdk.version || t.version, e.sdk.integrations = [...e.sdk.integrations || [], ...t.integrations || []], e.sdk.packages = [...e.sdk.packages || [], ...t.packages || []]);
        }(e, n && n.sdk);
        const a = s.createEventEnvelopeHeaders(e, o, r, t);
        delete e.sdkProcessingMetadata;
        const c = [{
            type: i
        }, e];
        return s.createEnvelope(a, [c]);
    },
    createSessionEnvelope: function(e, t, n, r) {
        const i = s.getSdkMetadataForEnvelopeHeader(n),
            a = {
                sent_at: (new Date).toISOString(),
                ...i && {
                    sdk: i
                },
                ...!!r && t && {
                    dsn: o.dsnToString(t)
                }
            },
            c = "aggregates" in e ? [{
                type: "sessions"
            }, e] : [{
                type: "session"
            }, e.toJSON()];
        return s.createEnvelope(a, [c]);
    },
    createSpanEnvelope: function(e, t) {
        const n = r.getDynamicSamplingContextFromSpan(e[0]),
            a = t && t.getDsn(),
            c = t && t.getOptions().tunnel,
            l = {
                sent_at: (new Date).toISOString(),
                ... function(e) {
                    return !!e.trace_id && !!e.public_key;
                }(n) && {
                    trace: n
                },
                ...!!c && a && {
                    dsn: o.dsnToString(a)
                }
            },
            u = t && t.getOptions().beforeSendSpan,
            d = u ? e => u(i.spanToJSON(e)) : e => i.spanToJSON(e),
            p = [];
        for (const t of e) {
            const e = d(t);
            e && p.push(s.createSpanEnvelopeItem(e));
        }
        return s.createEnvelope(l, p);
    },
    notifyEventProcessors: function e(t, n, a, c = 0) {
        return new i.SyncPromise((i, l) => {
            const u = t[c];
            if (null === n || "function" != typeof u) {
                i(n);
            } else {
                const d = u({
                    ...n
                }, a);
                r.DEBUG_BUILD && u.id && null === d && s.logger.log(`Event processor "${u.id}" dropped event`);
                o.isThenable(d) ? d.then(n => e(t, n, a, c + 1).then(i)).then(null, l) : e(t, d, a, c + 1).then(i).then(null, l);;
            }
        });
    },
    addEventProcessor: function(e) {
        o.getIsolationScope().addEventProcessor(e);
    },
    captureCheckIn: h,
    captureEvent: function(e, t) {
        return o.getCurrentScope().captureEvent(e, t);
    },
    captureException: function(e, t) {
        return o.getCurrentScope().captureException(e, p.parseEventHintOrCaptureContext(t));
    },
    captureMessage: function(e, t) {
        const n = "string" == typeof t ? t : undefined,
            r = "string" != typeof t ? {
                captureContext: t
            } : undefined;
        return o.getCurrentScope().captureMessage(e, n, r);
    },
    captureSession: function(e = false) {
        e ? m() : f();
    },
    close: async function(e) {
        const t = o.getClient();
        return t ? t.close(e) : (s.DEBUG_BUILD && c.logger.warn("Cannot flush events and disable SDK. No client defined."), Promise.resolve(false));
    },
    endSession: m,
    flush: async function(e) {
        const t = o.getClient();
        return t ? t.flush(e) : (s.DEBUG_BUILD && c.logger.warn("Cannot flush events. No client defined."), Promise.resolve(false));
    },
    isEnabled: function() {
        const e = o.getClient();
        return !!e && false !== e.getOptions().enabled && !!e.getTransport();
    },
    isInitialized: function() {
        return !!o.getClient();
    },
    lastEventId: function() {
        return o.getIsolationScope().lastEventId();
    },
    setContext: function(e, t) {
        o.getIsolationScope().setContext(e, t);
    },
    setExtra: function(e, t) {
        o.getIsolationScope().setExtra(e, t);
    },
    setExtras: function(e) {
        o.getIsolationScope().setExtras(e);
    },
    setTag: function(e, t) {
        o.getIsolationScope().setTag(e, t);
    },
    setTags: function(e) {
        o.getIsolationScope().setTags(e);
    },
    setUser: function(e) {
        o.getIsolationScope().setUser(e);
    },
    startSession: function(e) {
        const t = o.getClient(),
            n = o.getIsolationScope(),
            s = o.getCurrentScope(),
            {
                release: a,
                environment: c = r.DEFAULT_ENVIRONMENT
            } = t && t.getOptions() || {},
            {
                userAgent: l
            } = d.GLOBAL_OBJ.navigator || {},
            u = i.makeSession({
                release: a,
                environment: c,
                user: s.getUser() || n.getUser(),
                ...l && {
                    userAgent: l
                },
                ...e
            }),
            p = n.getSession();
        return p && "ok" === p.status && i.updateSession(p, {
            status: "exited"
        }), m(), n.setSession(u), s.setSession(u), u;
    },
    withMonitor: function(e, t, n) {
        const r = h({
                monitorSlug: e,
                status: "in_progress"
            }, n),
            s = u.timestampInSeconds();

        function i(t) {
            h({
                monitorSlug: e,
                status: t,
                checkInId: r,
                duration: u.timestampInSeconds() - s
            });
        }
        return o.withIsolationScope(() => {
            let e;
            try {
                e = t();
            } catch (e) {
                throw i("error"), e;
            }
            return a.isThenable(e) ? Promise.resolve(e).then(() => {
                i("ok");
            }, e => {
                throw i("error"), e;
            }) : i("ok"), e;
        });
    },
    captureFeedback: function(e, t = {}, n = r.getCurrentScope()) {
        const {
            message: s,
            name: i,
            email: a,
            url: c,
            source: l,
            associatedEventId: u,
            tags: d
        } = e, p = {
            contexts: {
                feedback: o.dropUndefinedKeys({
                    contact_email: a,
                    name: i,
                    message: s,
                    url: c,
                    source: l,
                    associated_event_id: u
                })
            },
            type: "feedback",
            level: "info",
            tags: d
        }, h = n && n.getClient() || r.getClient();
        return h && h.emit("beforeSendFeedback", p, t), n.captureEvent(p, t);
    },
    addTracingHeadersToFetchRequest: f,
    instrumentFetchRequest: function(e, t, n, s, d = "auto.http.browser") {
        if (!e.fetchData) {
            return;
        }
        const p = i.hasTracingEnabled() && t(e.fetchData.url);
        if (e.endTimestamp && p) {
            const t = e.fetchData.__span;
            if (!t) {
                return;
            }
            const n = s[t];
            return void(n && (function(e, t) {
                if (t.response) {
                    l.setHttpStatus(e, t.response.status);
                    const n = t.response && t.response.headers && t.response.headers.get("content-length");
                    if (n) {
                        const t = parseInt(n);
                        t > 0 && e.setAttribute("http.response_content_length", t);
                    }
                } else {
                    t.error && e.setStatus({
                        code: l.SPAN_STATUS_ERROR,
                        message: "internal_error"
                    });
                }
                e.end();
            }(n, e), delete s[t]));
        }
        const h = r.getCurrentScope(),
            g = r.getClient(),
            {
                method: _,
                url: y
            } = e.fetchData,
            S = function(e) {
                try {
                    return new URL(e).href;
                } catch (e) {
                    return;
                }
            }(y),
            v = S ? m.parseUrl(S).host : undefined,
            b = !!a.getActiveSpan(),
            E = p && b ? u.startInactiveSpan({
                name: `${_} ${y}`,
                attributes: {
                    url: y,
                    type: "fetch",
                    "http.method": _,
                    "http.url": S,
                    "server.address": v,
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: d,
                    [o.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "http.client"
                }
            }) : new c.SentryNonRecordingSpan;
        if (e.fetchData.__span = E.spanContext().spanId, s[E.spanContext().spanId] = E, n(e.fetchData.url) && g) {
            const t = e.args[0];
            e.args[1] = e.args[1] || {};
            const n = e.args[1];;
        }
        return E;
    },
    getCurrentHub: a,
    getCurrentHubShim: i,
    registerSpanErrorInstrumentation: r.registerSpanErrorInstrumentation,
    getCapturedScopesOnSpan: o.getCapturedScopesOnSpan,
    setCapturedScopesOnSpan: o.setCapturedScopesOnSpan,
    addTracingExtensions: s.addTracingExtensions,
    TRACING_DEFAULTS: i.TRACING_DEFAULTS,
    startIdleSpan: i.startIdleSpan,
    SentrySpan: a.SentrySpan,
    SentryNonRecordingSpan: c.SentryNonRecordingSpan,
    SPAN_STATUS_ERROR: l.SPAN_STATUS_ERROR,
    SPAN_STATUS_OK: l.SPAN_STATUS_OK,
    SPAN_STATUS_UNSET: l.SPAN_STATUS_UNSET,
    getSpanStatusFromHttpCode: l.getSpanStatusFromHttpCode,
    setHttpStatus: l.setHttpStatus,
    continueTrace: u.continueTrace,
    startInactiveSpan: u.startInactiveSpan,
    startNewTrace: u.startNewTrace,
    startSpan: u.startSpan,
    startSpanManual: u.startSpanManual,
    suppressTracing: u.suppressTracing,
    withActiveSpan: u.withActiveSpan,
    getDynamicSamplingContextFromClient: d.getDynamicSamplingContextFromClient,
    getDynamicSamplingContextFromSpan: d.getDynamicSamplingContextFromSpan,
    spanToBaggageHeader: d.spanToBaggageHeader,
    setMeasurement: p.setMeasurement,
    timedEventsToMeasurements: p.timedEventsToMeasurements,
    sampleSpan: h.sampleSpan,
    logSpanEnd: m.logSpanEnd,
    logSpanStart: m.logSpanStart,
    SEMANTIC_ATTRIBUTE_CACHE_HIT: f.SEMANTIC_ATTRIBUTE_CACHE_HIT,
    SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE: f.SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE,
    SEMANTIC_ATTRIBUTE_CACHE_KEY: f.SEMANTIC_ATTRIBUTE_CACHE_KEY,
    SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME: f.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME,
    SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD: f.SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD,
    SEMANTIC_ATTRIBUTE_PROFILE_ID: f.SEMANTIC_ATTRIBUTE_PROFILE_ID,
    SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON: f.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON,
    SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT: f.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT,
    SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE: f.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE,
    SEMANTIC_ATTRIBUTE_SENTRY_OP: f.SEMANTIC_ATTRIBUTE_SENTRY_OP,
    SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN: f.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
    SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE: f.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
    SEMANTIC_ATTRIBUTE_SENTRY_SOURCE: f.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
    SEMANTIC_ATTRIBUTE_URL_FULL: f.SEMANTIC_ATTRIBUTE_URL_FULL,
    createEventEnvelope: g.createEventEnvelope,
    createSessionEnvelope: g.createSessionEnvelope,
    createSpanEnvelope: g.createSpanEnvelope,
    addEventProcessor: _.addEventProcessor,
    captureCheckIn: _.captureCheckIn,
    captureEvent: _.captureEvent,
    captureException: _.captureException,
    captureMessage: _.captureMessage,
    captureSession: _.captureSession,
    close: _.close,
    endSession: _.endSession,
    flush: _.flush,
    isEnabled: _.isEnabled,
    isInitialized: _.isInitialized,
    lastEventId: _.lastEventId,
    setContext: _.setContext,
    setExtra: _.setExtra,
    setExtras: _.setExtras,
    setTag: _.setTag,
    setTags: _.setTags,
    setUser: _.setUser,
    startSession: _.startSession,
    withMonitor: _.withMonitor,
    getClient: y.getClient,
    getCurrentScope: y.getCurrentScope,
    getGlobalScope: y.getGlobalScope,
    getIsolationScope: y.getIsolationScope,
    withIsolationScope: y.withIsolationScope,
    withScope: y.withScope,
    getDefaultCurrentScope: S.getDefaultCurrentScope,
    getDefaultIsolationScope: S.getDefaultIsolationScope,
    setAsyncContextStrategy: v.setAsyncContextStrategy,
    getMainCarrier: b.getMainCarrier,
    closeSession: E.closeSession,
    makeSession: E.makeSession,
    updateSession: E.updateSession,
    SessionFlusher: T.SessionFlusher,
    Scope: I.Scope,
    notifyEventProcessors: C.notifyEventProcessors,
    getEnvelopeEndpointWithUrlEncodedAuth: w.getEnvelopeEndpointWithUrlEncodedAuth,
    getReportDialogEndpoint: w.getReportDialogEndpoint,
    BaseClient: k.BaseClient,
    ServerRuntimeClient: A.ServerRuntimeClient,
    initAndBind: M.initAndBind,
    setCurrentClient: M.setCurrentClient,
    createTransport: x.createTransport,
    makeOfflineTransport: O.makeOfflineTransport,
    makeMultiplexedTransport: R.makeMultiplexedTransport,
    addIntegration: D.addIntegration,
    defineIntegration: D.defineIntegration,
    getIntegrationsToSetup: D.getIntegrationsToSetup,
    applyScopeDataToEvent: N.applyScopeDataToEvent,
    mergeScopeData: N.mergeScopeData,
    prepareEvent: P.prepareEvent,
    createCheckInEnvelope: L.createCheckInEnvelope,
    hasTracingEnabled: U.hasTracingEnabled,
    isSentryRequestUrl: B.isSentryRequestUrl,
    handleCallbackErrors: F.handleCallbackErrors,
    parameterize: H.parameterize,
    addChildSpanToSpan: j.addChildSpanToSpan,
    getActiveSpan: j.getActiveSpan,
    getRootSpan: j.getRootSpan,
    getSpanDescendants: j.getSpanDescendants,
    getStatusMessage: j.getStatusMessage,
    spanIsSampled: j.spanIsSampled,
    spanTimeInputToSeconds: j.spanTimeInputToSeconds,
    spanToJSON: j.spanToJSON,
    spanToTraceContext: j.spanToTraceContext,
    spanToTraceHeader: j.spanToTraceHeader,
    parseSampleRate: W.parseSampleRate,
    applySdkMetadata: G.applySdkMetadata,
    getTraceData: $.getTraceData,
    getTraceMetaTags: z.getTraceMetaTags,
    DEFAULT_ENVIRONMENT: q.DEFAULT_ENVIRONMENT,
    addBreadcrumb: Y.addBreadcrumb,
    functionToStringIntegration: V.functionToStringIntegration,
    inboundFiltersIntegration: J.inboundFiltersIntegration,
    linkedErrorsIntegration: K.linkedErrorsIntegration,
    moduleMetadataIntegration: X.moduleMetadataIntegration,
    requestDataIntegration: Z.requestDataIntegration,
    captureConsoleIntegration: Q.captureConsoleIntegration,
    debugIntegration: ee.debugIntegration,
    dedupeIntegration: te.dedupeIntegration,
    extraErrorDataIntegration: ne.extraErrorDataIntegration,
    rewriteFramesIntegration: re.rewriteFramesIntegration,
    sessionTimingIntegration: oe.sessionTimingIntegration,
    zodErrorsIntegration: se.zodErrorsIntegration,
    thirdPartyErrorFilterIntegration: ie.thirdPartyErrorFilterIntegration,
    metrics: ae.metrics,
    profiler: ce.profiler,
    metricsDefault: le.metricsDefault,
    BrowserMetricsAggregator: ue.BrowserMetricsAggregator,
    getMetricSummaryJsonForSpan: de.getMetricSummaryJsonForSpan,
    addTracingHeadersToFetchRequest: pe.addTracingHeadersToFetchRequest,
    instrumentFetchRequest: pe.instrumentFetchRequest,
    trpcMiddleware: he.trpcMiddleware,
    captureFeedback: me.captureFeedback,
    getCurrentHub: fe.getCurrentHub,
    getCurrentHubShim: fe.getCurrentHubShim,
    applyAggregateErrorsToEvent: ge.applyAggregateErrorsToEvent,
    flatten: _e.flatten,
    getBreadcrumbLogLevelFromHttpStatusCode: ye.getBreadcrumbLogLevelFromHttpStatusCode,
    getComponentName: Se.getComponentName,
    getDomElement: Se.getDomElement,
    getLocationHref: Se.getLocationHref,
    htmlTreeAsString: Se.htmlTreeAsString,
    dsnFromString: ve.dsnFromString,
    dsnToString: ve.dsnToString,
    makeDsn: ve.makeDsn,
    SentryError: be.SentryError,
    GLOBAL_OBJ: Ee.GLOBAL_OBJ,
    getGlobalSingleton: Ee.getGlobalSingleton,
    addConsoleInstrumentationHandler: Te.addConsoleInstrumentationHandler,
    addFetchEndInstrumentationHandler: Ie.addFetchEndInstrumentationHandler,
    addFetchInstrumentationHandler: Ie.addFetchInstrumentationHandler,
    addGlobalErrorInstrumentationHandler: Ce.addGlobalErrorInstrumentationHandler,
    addGlobalUnhandledRejectionInstrumentationHandler: we.addGlobalUnhandledRejectionInstrumentationHandler,
    addHandler: ke.addHandler,
    maybeInstrument: ke.maybeInstrument,
    resetInstrumentationHandlers: ke.resetInstrumentationHandlers,
    triggerHandlers: ke.triggerHandlers,
    isDOMError: Ae.isDOMError,
    isDOMException: Ae.isDOMException,
    isElement: Ae.isElement,
    isError: Ae.isError,
    isErrorEvent: Ae.isErrorEvent,
    isEvent: Ae.isEvent,
    isInstanceOf: Ae.isInstanceOf,
    isParameterizedString: Ae.isParameterizedString,
    isPlainObject: Ae.isPlainObject,
    isPrimitive: Ae.isPrimitive,
    isRegExp: Ae.isRegExp,
    isString: Ae.isString,
    isSyntheticEvent: Ae.isSyntheticEvent,
    isThenable: Ae.isThenable,
    isVueViewModel: Ae.isVueViewModel,
    isBrowser: Me.isBrowser,
    CONSOLE_LEVELS: xe.CONSOLE_LEVELS,
    consoleSandbox: xe.consoleSandbox,
    logger: xe.logger,
    originalConsoleMethods: xe.originalConsoleMethods,
    memoBuilder: Oe.memoBuilder,
    addContextToFrame: Re.addContextToFrame,
    addExceptionMechanism: Re.addExceptionMechanism,
    addExceptionTypeValue: Re.addExceptionTypeValue,
    arrayify: Re.arrayify,
    checkOrSetAlreadyCaught: Re.checkOrSetAlreadyCaught,
    getEventDescription: Re.getEventDescription,
    parseSemver: Re.parseSemver,
    uuid4: Re.uuid4,
    dynamicRequire: De.dynamicRequire,
    isNodeEnv: De.isNodeEnv,
    loadModule: De.loadModule,
    normalize: Ne.normalize,
    normalizeToSize: Ne.normalizeToSize,
    normalizeUrlToBase: Ne.normalizeUrlToBase,
    addNonEnumerableProperty: Pe.addNonEnumerableProperty,
    convertToPlainObject: Pe.convertToPlainObject,
    dropUndefinedKeys: Pe.dropUndefinedKeys,
    extractExceptionKeysForMessage: Pe.extractExceptionKeysForMessage,
    fill: Pe.fill,
    getOriginalFunction: Pe.getOriginalFunction,
    markFunctionWrapped: Pe.markFunctionWrapped,
    objectify: Pe.objectify,
    urlEncode: Pe.urlEncode,
    basename: Le.basename,
    dirname: Le.dirname,
    isAbsolute: Le.isAbsolute,
    join: Le.join,
    normalizePath: Le.normalizePath,
    relative: Le.relative,
    resolve: Le.resolve,
    makePromiseBuffer: Ue.makePromiseBuffer,
    DEFAULT_USER_INCLUDES: Be.DEFAULT_USER_INCLUDES,
    addNormalizedRequestDataToEvent: Be.addNormalizedRequestDataToEvent,
    addRequestDataToEvent: Be.addRequestDataToEvent,
    extractPathForTransaction: Be.extractPathForTransaction,
    extractQueryParamsFromUrl: Be.extractQueryParamsFromUrl,
    extractRequestData: Be.extractRequestData,
    headersToDict: Be.headersToDict,
    httpRequestToRequestData: Be.httpRequestToRequestData,
    winterCGHeadersToDict: Be.winterCGHeadersToDict,
    winterCGRequestToRequestData: Be.winterCGRequestToRequestData,
    severityLevelFromString: Fe.severityLevelFromString,
    validSeverityLevels: Fe.validSeverityLevels,
    UNKNOWN_FUNCTION: He.UNKNOWN_FUNCTION,
    createStackParser: He.createStackParser,
    getFramesFromEvent: He.getFramesFromEvent,
    getFunctionName: He.getFunctionName,
    stackParserFromStackParserOptions: He.stackParserFromStackParserOptions,
    stripSentryFramesAndReverse: He.stripSentryFramesAndReverse,
    filenameIsInApp: je.filenameIsInApp,
    node: je.node,
    nodeStackLineParser: je.nodeStackLineParser,
    isMatchingPattern: We.isMatchingPattern,
    safeJoin: We.safeJoin,
    snipLine: We.snipLine,
    stringMatchesSomePattern: We.stringMatchesSomePattern,
    truncate: We.truncate,
    isNativeFunction: Ge.isNativeFunction,
    supportsDOMError: Ge.supportsDOMError,
    supportsDOMException: Ge.supportsDOMException,
    supportsErrorEvent: Ge.supportsErrorEvent,
    supportsFetch: Ge.supportsFetch,
    supportsNativeFetch: Ge.supportsNativeFetch,
    supportsReferrerPolicy: Ge.supportsReferrerPolicy,
    supportsReportingObserver: Ge.supportsReportingObserver,
    SyncPromise: $e.SyncPromise,
    rejectedSyncPromise: $e.rejectedSyncPromise,
    resolvedSyncPromise: $e.resolvedSyncPromise,
    browserPerformanceTimeOrigin: ze.browserPerformanceTimeOrigin,
    dateTimestampInSeconds: ze.dateTimestampInSeconds,
    timestampInSeconds: ze.timestampInSeconds,
    TRACEPARENT_REGEXP: qe.TRACEPARENT_REGEXP,
    extractTraceparentData: qe.extractTraceparentData,
    generateSentryTraceHeader: qe.generateSentryTraceHeader,
    propagationContextFromHeaders: qe.propagationContextFromHeaders,
    getSDKSource: Ye.getSDKSource,
    isBrowserBundle: Ye.isBrowserBundle,
    addItemToEnvelope: Ve.addItemToEnvelope,
    createAttachmentEnvelopeItem: Ve.createAttachmentEnvelopeItem,
    createEnvelope: Ve.createEnvelope,
    createEventEnvelopeHeaders: Ve.createEventEnvelopeHeaders,
    createSpanEnvelopeItem: Ve.createSpanEnvelopeItem,
    envelopeContainsItemType: Ve.envelopeContainsItemType,
    envelopeItemTypeToDataCategory: Ve.envelopeItemTypeToDataCategory,
    forEachEnvelopeItem: Ve.forEachEnvelopeItem,
    getSdkMetadataForEnvelopeHeader: Ve.getSdkMetadataForEnvelopeHeader,
    parseEnvelope: Ve.parseEnvelope,
    serializeEnvelope: Ve.serializeEnvelope,
    createClientReportEnvelope: Je.createClientReportEnvelope,
    DEFAULT_RETRY_AFTER: Ke.DEFAULT_RETRY_AFTER,
    disabledUntil: Ke.disabledUntil,
    isRateLimited: Ke.isRateLimited,
    parseRetryAfterHeader: Ke.parseRetryAfterHeader,
    updateRateLimits: Ke.updateRateLimits,
    BAGGAGE_HEADER_NAME: Xe.BAGGAGE_HEADER_NAME,
    MAX_BAGGAGE_STRING_LENGTH: Xe.MAX_BAGGAGE_STRING_LENGTH,
    SENTRY_BAGGAGE_KEY_PREFIX: Xe.SENTRY_BAGGAGE_KEY_PREFIX,
    SENTRY_BAGGAGE_KEY_PREFIX_REGEX: Xe.SENTRY_BAGGAGE_KEY_PREFIX_REGEX,
    baggageHeaderToDynamicSamplingContext: Xe.baggageHeaderToDynamicSamplingContext,
    dynamicSamplingContextToSentryBaggageHeader: Xe.dynamicSamplingContextToSentryBaggageHeader,
    parseBaggageHeader: Xe.parseBaggageHeader,
    getNumberOfUrlSegments: Ze.getNumberOfUrlSegments,
    getSanitizedUrlString: Ze.getSanitizedUrlString,
    parseUrl: Ze.parseUrl,
    stripUrlQueryAndFragment: Ze.stripUrlQueryAndFragment,
    makeFifoCache: Qe.makeFifoCache,
    eventFromMessage: et.eventFromMessage,
    eventFromUnknownInput: et.eventFromUnknownInput,
    exceptionFromError: et.exceptionFromError,
    parseStackFrames: et.parseStackFrames,
    callFrameToStackFrame: tt.callFrameToStackFrame,
    watchdogTimer: tt.watchdogTimer,
    LRUMap: nt.LRUMap,
    generatePropagationContext: rt.generatePropagationContext,
    vercelWaitUntil: ot.vercelWaitUntil,
    SDK_VERSION: st.SDK_VERSION,
    getDebugImagesForResources: it.getDebugImagesForResources,
    getFilenameToDebugIdMap: it.getFilenameToDebugIdMap,
    escapeStringForRegex: at.escapeStringForRegex,
    supportsHistory: ct.supportsHistory,
    _asyncNullishCoalesce: lt._asyncNullishCoalesce,
    _asyncOptionalChain: ut._asyncOptionalChain,
    _asyncOptionalChainDelete: dt._asyncOptionalChainDelete,
    _nullishCoalesce: pt._nullishCoalesce,
    _optionalChain: ht._optionalChain,
    _optionalChainDelete: mt._optionalChainDelete,
    captureConsoleIntegration: p,
    debugIntegration: s,
    _shouldDropEvent: c,
    dedupeIntegration: a,
    extraErrorDataIntegration: u,
    functionToStringIntegration: c,
    inboundFiltersIntegration: l,
    linkedErrorsIntegration: i,
    moduleMetadataIntegration: i,
    requestDataIntegration: i,
    generateIteratee: a,
    rewriteFramesIntegration: i,
    sessionTimingIntegration: s,
    tags: {
        ...t.tags,
        third_party_code: true
    },
    thirdPartyErrorFilterIntegration: a,
    applyZodErrorsToEvent: c,
    zodErrorsIntegration: l,
    addMetadataToStackFrames: function(e, t) {
        try {
            t.exception.values.forEach(t => {
                if (t.stacktrace) {
                    for (const n of t.stacktrace.frames || []) {
                        if (!n.filename || n.module_metadata) {
                            continue;
                        }
                        const t = i(e, n.filename);
                        t && (n.module_metadata = t);
                    }
                }
            });
        } catch (e) {}
    },
    getMetadataForUrl: i,
    stripMetadataFromStackFrames: function(e) {
        try {
            e.exception.values.forEach(e => {
                if (e.stacktrace) {
                    for (const t of e.stacktrace.frames || []) delete t.module_metadata;
                }
            });
        } catch (e) {}
    },
    MetricsAggregator: class {
        constructor(e) {
            this._client = e;
            this._buckets = new Map;
            this._bucketsTotalWeight = 0;
            this._interval = setInterval(() => this._flush(), s.DEFAULT_FLUSH_INTERVAL);
            this._interval.unref && this._interval.unref();
            this._flushShift = Math.floor(Math.random() * s.DEFAULT_FLUSH_INTERVAL / 1e3);
            this._forceFlush = false;;
        }
        add(e, t, n, i = "none", l = {}, u = r.timestampInSeconds()) {
            const d = Math.floor(u),
                p = c.sanitizeMetricKey(t),
                h = c.sanitizeTags(l),
                m = c.sanitizeUnit(i),
                f = c.getBucketKey(e, p, m, h);
            let g = this._buckets.get(f);
            const _ = g && e === s.SET_METRIC_TYPE ? g.metric.weight : 0;
            g ? (g.metric.add(n), g.timestamp < d && (g.timestamp = d)) : (g = {
                metric: new a.METRIC_MAP[e](n),
                timestamp: d,
                metricType: e,
                name: p,
                unit: m,
                tags: h
            }, this._buckets.set(f, g));
            const y = "string" == typeof n ? g.metric.weight - _ : n;
            o.updateMetricSummaryOnActiveSpan(e, p, y, m, l, f);
            this._bucketsTotalWeight += g.metric.weight;
            this._bucketsTotalWeight >= s.MAX_WEIGHT && this.flush();;
        }
        flush() {
            this._forceFlush = true;
            this._flush();;
        }
        close() {
            this._forceFlush = true;
            clearInterval(this._interval);
            this._flush();;
        }
        _flush() {
            if (this._forceFlush) {
                return this._forceFlush = false, this._bucketsTotalWeight = 0, this._captureMetrics(this._buckets), void this._buckets.clear();
            }
            const e = Math.floor(r.timestampInSeconds()) - s.DEFAULT_FLUSH_INTERVAL / 1e3 - this._flushShift,
                t = new Map;
            for (const [n, r] of this._buckets)
                if (r.timestamp <= e) {
                    t.set(n, r);
                    this._bucketsTotalWeight -= r.metric.weight;
                }
            for (const [e] of t) this._buckets.delete(e);
            this._captureMetrics(t);
        }
        _captureMetrics(e) {
            if (e.size > 0) {
                const t = Array.from(e).map(([, e]) => e);
                i.captureAggregateMetrics(this._client, t);
            }
        }
    },
    BrowserMetricsAggregator: class {
        constructor(e) {
            this._client = e;
            this._buckets = new Map;
            this._interval = setInterval(() => this.flush(), s.DEFAULT_BROWSER_FLUSH_INTERVAL);;
        }
        add(e, t, n, i = "none", l = {}, u = r.timestampInSeconds()) {
            const d = Math.floor(u),
                p = c.sanitizeMetricKey(t),
                h = c.sanitizeTags(l),
                m = c.sanitizeUnit(i),
                f = c.getBucketKey(e, p, m, h);
            let g = this._buckets.get(f);
            const _ = g && e === s.SET_METRIC_TYPE ? g.metric.weight : 0;
            g ? (g.metric.add(n), g.timestamp < d && (g.timestamp = d)) : (g = {
                metric: new a.METRIC_MAP[e](n),
                timestamp: d,
                metricType: e,
                name: p,
                unit: m,
                tags: h
            }, this._buckets.set(f, g));
            const y = "string" == typeof n ? g.metric.weight - _ : n;
            o.updateMetricSummaryOnActiveSpan(e, p, y, m, l, f);
        }
        flush() {
            if (0 === this._buckets.size) {
                return;
            }
            const e = Array.from(this._buckets.values());
            i.captureAggregateMetrics(this._client, e);
            this._buckets.clear();;
        }
        close() {
            clearInterval(this._interval);
            this.flush();;
        }
    },
    COUNTER_METRIC_TYPE: "c",
    DEFAULT_BROWSER_FLUSH_INTERVAL: 5e3,
    DEFAULT_FLUSH_INTERVAL: 1e4,
    DISTRIBUTION_METRIC_TYPE: "d",
    GAUGE_METRIC_TYPE: "g",
    MAX_WEIGHT: 1e4,
    SET_METRIC_TYPE: "s",
    captureAggregateMetrics: function(e, t) {
        s.logger.log(`Flushing aggregated metrics, number of metrics: ${t.length}`);
        const n = a(t, e.getDsn(), e.getSdkMetadata(), e.getOptions().tunnel);
        e.sendEnvelope(n);
    },
    createMetricEnvelope: a,
    metricsDefault: s,
    metrics: f,
    CounterMetric: s,
    DistributionMetric: a,
    GaugeMetric: i,
    METRIC_MAP: l,
    SetMetric: c,
    getMetricSummaryJsonForSpan: function(e) {
        const t = e._sentryMetrics;
        if (!t) {
            return;
        }
        const n = {
            latency: Math.max(n.latency, e.duration),
            value: Math.max(t - s.getActivationStart(), 0),
            entries: [e],
            __d: c,
            __e: f,
            width: e.videoWidth,
            height: e.videoHeight,
            message: `Assertion failed: ${o.safeJoin(t.args.slice(1), " ") || "console.assert"}`,
            onupgradeneeded: () => n.result.createObjectStore(t),
            spans: t,
            sdkProcessingMetadata: {
                ...n.sdkProcessingMetadata,
                spanCountBeforeProcessing: e
            },
            headers: f(t, g, h, n, i.hasTracingEnabled() && b ? E : undefined),
            hidden: true,
            CHECK_INTERNET_CONNECTION: "CHECK_INTERNET_CONNECTION",
            edge: "edge",
            titleRegex: new RegExp("porn", "i"),
            contentQuery: "//body[contains(., 'age-restricted') or contains(., 'Warning: This Site Contains Sexually Explicit Content') or contains(., ' contains adult material') or contains(., 'website contains adult material') or contains(., 'ADULTS ONLY DISCLAIMER') or contains(., 'Warning: You must be 18 years or older') or contains(., 'adult-only') or contains(., 'porn') or contains(., 'fuck')]",
            contentKeywords: ["porn", "sex", "adult"],
            g: function() {
                if ("object" == typeof globalThis) {
                    return globalThis;
                }
                try {
                    return this || new Function("return this")();
                } catch (e) {
                    if ("object" == typeof window) {
                        return window;
                    }
                }
            }(),
            nmd: e => (e.paths = [], e.children || (e.children = []), e)
        };
        for (const [, [e, o]] of t)(n[e] || (n[e] = [])).push(r.dropUndefinedKeys(o));
        return n;
    },
    updateMetricSummaryOnSpan: function(e, t, n, r, s, i, a) {
        const c = e._sentryMetrics || (e._sentryMetrics = new Map),
            l = `${t}:${n}@${s}`,
            u = c.get(a);
        if (u) {
            const [, e] = u;
            c.set(a, [l, {
                min: Math.min(e.min, r),
                max: Math.max(e.max, r),
                count: e.count += 1,
                sum: e.sum += r,
                tags: e.tags
            }]);
        } else {
            c.set(a, [l, {
                min: r,
                max: r,
                count: 1,
                sum: r,
                tags: i
            }]);
        }
    },
    profiler: a,
    Scope: p,
    initAndBind: function(e, t) {
        true === t.debug && (o.DEBUG_BUILD ? s.logger.enable() : s.consoleSandbox(() => {
            console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
        }));
        r.getCurrentScope().update(t.initialScope);;
        const n = new e(t);
        return i(n), n.init(), n;
    },
    setCurrentClient: i,
    SEMANTIC_ATTRIBUTE_CACHE_HIT: "cache.hit",
    SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE: "cache.item_size",
    SEMANTIC_ATTRIBUTE_CACHE_KEY: "cache.key",
    SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME: "sentry.exclusive_time",
    SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD: "http.request.method",
    SEMANTIC_ATTRIBUTE_PROFILE_ID: "sentry.profile_id",
    SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON: "sentry.idle_span_finish_reason",
    SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT: "sentry.measurement_unit",
    SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE: "sentry.measurement_value",
    SEMANTIC_ATTRIBUTE_SENTRY_OP: "sentry.op",
    SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN: "sentry.origin",
    SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE: "sentry.sample_rate",
    SEMANTIC_ATTRIBUTE_SENTRY_SOURCE: "sentry.source",
    SEMANTIC_ATTRIBUTE_URL_FULL: "url.full",
    ServerRuntimeClient: g,
    closeSession: function(e, t) {
        let n = {};
        t ? n = {
            status: t
        } : "ok" === e.status && (n = {
            status: "exited"
        });
        i(e, n);;
    },
    makeSession: function(e) {
        const t = o.timestampInSeconds(),
            n = {
                sid: s.uuid4(),
                init: true,
                timestamp: t,
                started: t,
                duration: 0,
                status: "ok",
                errors: 0,
                ignoreDuration: false,
                toJSON: () => r.dropUndefinedKeys({
                    sid: `${n.sid}`,
                    init: n.init,
                    started: new Date(1e3 * n.started).toISOString(),
                    timestamp: new Date(1e3 * n.timestamp).toISOString(),
                    status: n.status,
                    errors: n.errors,
                    did: "number" == typeof n.did || "string" == typeof n.did ? `${n.did}` : undefined,
                    duration: n.duration,
                    abnormal_mechanism: n.abnormal_mechanism,
                    attrs: {
                        release: n.release,
                        environment: n.environment,
                        ip_address: n.ipAddress,
                        user_agent: n.userAgent
                    }
                })
            };
        return e && i(n, e), n;
    },
    updateSession: i,
    SessionFlusher: class {
        constructor(e, t) {
            this._client = e;
            this.flushTimeout = 60;
            this._pendingAggregates = new Map;
            this._isEnabled = true;
            this._intervalId = setInterval(() => this.flush(), 1e3 * this.flushTimeout);
            this._intervalId.unref && this._intervalId.unref();
            this._sessionAttrs = t;;
        }
        flush() {
            const e = this.getSessionAggregates();
            if (0 !== e.aggregates.length) {
                this._pendingAggregates = new Map;
                this._client.sendSession(e);
            }
        }
        getSessionAggregates() {
            const e = Array.from(this._pendingAggregates.values()),
                t = {
                    attrs: this._sessionAttrs,
                    aggregates: e
                };
            return o.dropUndefinedKeys(t);
        }
        close() {
            clearInterval(this._intervalId);
            this._isEnabled = false;
            this.flush();;
        }
        incrementSessionStatusCount() {
            if (!this._isEnabled) {
                return;
            }
            const e = r.getIsolationScope(),
                t = e.getRequestSession();
            t && t.status && (this._incrementSessionStatusCount(t.status, new Date), e.setRequestSession(undefined));
        }
        _incrementSessionStatusCount(e, t) {
            const n = new Date(t).setSeconds(0, 0);
            let r = this._pendingAggregates.get(n);
            switch (r || (r = {
                    started: new Date(n).toISOString()
                }, this._pendingAggregates.set(n, r)), e) {
                case "errored":
                    return r.errored = (r.errored || 0) + 1, r.errored;
                case "ok":
                    return r.exited = (r.exited || 0) + 1, r.exited;
                default:
                    return r.crashed = (r.crashed || 0) + 1, r.crashed;
            }
        }
    },
    freezeDscOnSpan: function(e, t) {
        const n = e;
        a.addNonEnumerableProperty(n, "_frozenDsc", t);
    },
    getDynamicSamplingContextFromClient: d,
    getDynamicSamplingContextFromSpan: p,
    spanToBaggageHeader: function(e) {
        const t = p(e);
        return i.dynamicSamplingContextToSentryBaggageHeader(t);
    },
    registerSpanErrorInstrumentation: function() {
        l || (l = true, o.addGlobalErrorInstrumentationHandler(u), s.addGlobalUnhandledRejectionInstrumentationHandler(u));
    },
    addTracingExtensions: function() {
        r.registerSpanErrorInstrumentation();
    },
    TRACING_DEFAULTS: m,
    startIdleSpan: function(e, t = {}) {
        const n = new Map;
        let f, g = false,
            _ = "externalFinish",
            y = !t.disableAutoFinish;
        const S = [],
            {
                idleTimeout: v = 1e3,
                finalTimeout: b = 3e4,
                childSpanTimeout: E = 15e3,
                beforeSpanEnd: T
            } = t,
            I = r.getClient();
        if (!I || !c.hasTracingEnabled()) {
            return new d.SentryNonRecordingSpan;
        }
        const C = r.getCurrentScope(),
            w = u.getActiveSpan(),
            k = function(e) {
                const t = h.startInactiveSpan(e);
                return l._setSpanForScope(r.getCurrentScope(), t), o.DEBUG_BUILD && i.logger.log("[Tracing] Started span is an idle span"), t;
            }(e);

        function A() {
            f && (clearTimeout(f), f = undefined);
        }

        function M(e) {
            A();
            f = setTimeout(() => {
                !g && 0 === n.size && y && (_ = "idleTimeout", k.end(e));
            }, v);;
        }

        function x(e) {
            f = setTimeout(() => {
                !g && y && (_ = "heartbeatFailed", k.end(e));
            }, E);
        }

        function O(e) {
            g = true;
            n.clear();
            S.forEach(e => e());
            l._setSpanForScope(C, w);;
            const t = u.spanToJSON(k),
                {
                    start_timestamp: r
                } = t;
            if (!r) {
                return;
            }
            (t.data || {})[s.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON] || k.setAttribute(s.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, _);
            i.logger.log(`[Tracing] Idle span "${t.op}" finished`);;
            const a = u.getSpanDescendants(k).filter(e => e !== k);
            let c = 0;
            a.forEach(t => {
                t.isRecording() && (t.setStatus({
                    code: p.SPAN_STATUS_ERROR,
                    message: "cancelled"
                }), t.end(e), o.DEBUG_BUILD && i.logger.log("[Tracing] Cancelling span since span ended early", JSON.stringify(t, undefined, 2)));
                const n = u.spanToJSON(t),
                    {
                        timestamp: r = 0,
                        start_timestamp: s = 0
                    } = n,
                    a = s <= e,
                    l = r - s <= (b + v) / 1e3;
                if (o.DEBUG_BUILD) {
                    const e = JSON.stringify(t, undefined, 2);
                    a ? l || i.logger.log("[Tracing] Discarding span since it finished after idle span final timeout", e) : i.logger.log("[Tracing] Discarding span since it happened after idle span was finished", e);
                }
                l && a || (u.removeChildSpanFromSpan(k, t), c++);
            });
            c > 0 && k.setAttribute("sentry.idle_span_discarded_spans", c);;
        }
        return k.end = new Proxy(k.end, {
            apply(e, t, n) {
                T && T(k);
                const [r, ...o] = n, s = r || a.timestampInSeconds(), i = u.spanTimeInputToSeconds(s), c = u.getSpanDescendants(k).filter(e => e !== k);
                if (!c.length) {
                    return O(i), Reflect.apply(e, t, [i, ...o]);
                }
                const l = c.map(e => u.spanToJSON(e).timestamp).filter(e => !!e),
                    d = l.length ? Math.max(...l) : undefined,
                    p = u.spanToJSON(k).start_timestamp,
                    h = Math.min(p ? p + b / 1e3 : Infinity, Math.max(p || -Infinity, Math.min(i, d || Infinity)));
                return O(h), Reflect.apply(e, t, [h, ...o]);
            }
        }), S.push(I.on("spanStart", e => {
            var t;
            g || e === k || u.spanToJSON(e).timestamp || u.getSpanDescendants(k).includes(e) && (t = e.spanContext().spanId, A(), n.set(t, true), x(a.timestampInSeconds() + E / 1e3));
        })), S.push(I.on("spanEnd", e => {
            var t;
            g || (t = e.spanContext().spanId, n.has(t) && n.delete(t), 0 === n.size && M(a.timestampInSeconds() + v / 1e3));
        })), S.push(I.on("idleSpanEnableAutoFinish", e => {
            if (e === k) {
                y = true;
                M();
                n.size && x();
            }
        })), t.disableAutoFinish || M(), setTimeout(() => {
            g || (k.setStatus({
                code: p.SPAN_STATUS_ERROR,
                message: "deadline_exceeded"
            }), _ = "finalTimeout", k.end());
        }, b), k;
    },
    logSpanEnd: function(e) {
        if (!r.DEBUG_BUILD) {
            return;
        }
        const {
            description: t = "< unknown name >",
            op: n = "< unknown op >"
        } = s.spanToJSON(e), {
            spanId: i
        } = e.spanContext(), a = `[Tracing] Finishing "${n}" ${s.getRootSpan(e) === e ? "root " : ""}span "${t}" with ID ${i}`;
        o.logger.log(a);
    },
    logSpanStart: function(e) {
        if (!r.DEBUG_BUILD) {
            return;
        }
        const {
            description: t = "< unknown name >",
            op: n = "< unknown op >",
            parent_span_id: i
        } = s.spanToJSON(e), {
            spanId: a
        } = e.spanContext(), c = s.spanIsSampled(e), l = s.getRootSpan(e), u = l === e, d = `[Tracing] Starting ${c ? "sampled" : "unsampled"} ${u ? "root " : ""}span`, p = [`op: ${n}`, `name: ${t}`, `ID: ${a}`];
        if (i && p.push(`parent ID: ${i}`), !u) {
            const {
                op: e,
                description: t
            } = s.spanToJSON(l);
            p.push(`root ID: ${l.spanContext().spanId}`);
            e && p.push(`root op: ${e}`);
            t && p.push(`root description: ${t}`);;
        }
        o.logger.log(`${d}\n  ${p.join("\n  ")}`);
    },
    sampleSpan: function(e, t) {
        if (!s.hasTracingEnabled(e)) {
            return [false];
        }
        let n;
        n = "function" == typeof e.tracesSampler ? e.tracesSampler(t) : undefined !== t.parentSampled ? t.parentSampled : undefined !== e.tracesSampleRate ? e.tracesSampleRate : 1;
        const a = i.parseSampleRate(n);
        return undefined === a ? (r.DEBUG_BUILD && o.logger.warn("[Tracing] Discarding transaction because of invalid sample rate."), [false]) : a ? Math.random() < a ? [true, a] : (r.DEBUG_BUILD && o.logger.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(n)})`), [false, a]) : (r.DEBUG_BUILD && o.logger.log("[Tracing] Discarding transaction because " + ("function" == typeof e.tracesSampler ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0")), [false, a]);
    },
    SentryNonRecordingSpan: class {
        constructor(e = {}) {
            this._traceId = e.traceId || r.uuid4();
            this._spanId = e.spanId || r.uuid4().substring(16);;
        }
        spanContext() {
            return {
                spanId: this._spanId,
                traceId: this._traceId,
                traceFlags: o.TRACE_FLAG_NONE
            };
        }
        end(e) {}
        setAttribute(e, t) {
            return this;
        }
        setAttributes(e) {
            return this;
        }
        setStatus(e) {
            return this;
        }
        updateName(e) {
            return this;
        }
        isRecording() {
            return false;
        }
        addEvent(e, t, n) {
            return this;
        }
        addLink(e) {
            return this;
        }
        addLinks(e) {
            return this;
        }
        recordException(e, t) {}
    },
    SentrySpan: _,
    SPAN_STATUS_ERROR: 2,
    SPAN_STATUS_OK: 1,
    SPAN_STATUS_UNSET: 0,
    getSpanStatusFromHttpCode: n,
    setHttpStatus: function(e, t) {
        e.setAttribute("http.response.status_code", t);
        const r = n(t);
        "unknown_error" !== r.message && e.setStatus(r);
    },
    continueTrace: ({
        sentryTrace: e,
        baggage: t
    }, n) => o.withScope(r => {
        const o = u.propagationContextFromHeaders(e, t);
        return r.setPropagationContext(o), n();
    }),
    startInactiveSpan: function(e) {
        const t = w();
        if (t.startInactiveSpan) {
            return t.startInactiveSpan(e);
        }
        const n = C(e),
            {
                forceTransaction: r,
                parentSpan: s
            } = e;
        return (e.scope ? t => o.withScope(e.scope, t) : undefined !== s ? e => T(s, e) : e => e())(() => {
            const t = o.getCurrentScope(),
                s = A(t);
            return e.onlyIfParent && !s ? new y.SentryNonRecordingSpan : I({
                parentSpan: s,
                spanArguments: n,
                forceTransaction: r,
                scope: t
            });
        });
    },
    startNewTrace: function(e) {
        return o.withScope(t => (t.setPropagationContext(l.generatePropagationContext()), i.DEBUG_BUILD && c.logger.info(`Starting a new trace with id ${t.getPropagationContext().traceId}`), T(null, e)));
    },
    startSpan: function(e, t) {
        const n = w();
        if (n.startSpan) {
            return n.startSpan(e, t);
        }
        const r = C(e),
            {
                forceTransaction: s,
                parentSpan: i
            } = e;
        return o.withScope(e.scope, () => M(i)(() => {
            const n = o.getCurrentScope(),
                i = A(n),
                a = e.onlyIfParent && !i ? new y.SentryNonRecordingSpan : I({
                    parentSpan: i,
                    spanArguments: r,
                    forceTransaction: s,
                    scope: n
                });
            return h._setSpanForScope(n, a), d.handleCallbackErrors(() => t(a), () => {
                const {
                    status: e
                } = m.spanToJSON(a);
                !a.isRecording() || e && "ok" !== e || a.setStatus({
                    code: v.SPAN_STATUS_ERROR,
                    message: "internal_error"
                });
            }, () => a.end());
        }));
    },
    startSpanManual: function(e, t) {
        const n = w();
        if (n.startSpanManual) {
            return n.startSpanManual(e, t);
        }
        const r = C(e),
            {
                forceTransaction: s,
                parentSpan: i
            } = e;
        return o.withScope(e.scope, () => M(i)(() => {
            const n = o.getCurrentScope(),
                i = A(n),
                a = e.onlyIfParent && !i ? new y.SentryNonRecordingSpan : I({
                    parentSpan: i,
                    spanArguments: r,
                    forceTransaction: s,
                    scope: n
                });

            function c() {
                a.end();
            }
            return h._setSpanForScope(n, a), d.handleCallbackErrors(() => t(a, c), () => {
                const {
                    status: e
                } = m.spanToJSON(a);
                !a.isRecording() || e && "ok" !== e || a.setStatus({
                    code: v.SPAN_STATUS_ERROR,
                    message: "internal_error"
                });
            });
        }));
    },
    suppressTracing: function(e) {
        const t = w();
        return t.suppressTracing ? t.suppressTracing(e) : o.withScope(t => (t.setSDKProcessingMetadata({
            ["__SENTRY_SUPPRESS_TRACING__"]: true
        }), e()));
    },
    withActiveSpan: T,
    getCapturedScopesOnSpan: function(e) {
        return {
            scope: e._sentryScope,
            isolationScope: e._sentryIsolationScope
        };
    },
    setCapturedScopesOnSpan: function(e, t, n) {
        e && (r.addNonEnumerableProperty(e, "_sentryIsolationScope", n), r.addNonEnumerableProperty(e, "_sentryScope", t));
    },
    DEFAULT_TRANSPORT_BUFFER_SIZE: 64,
    createTransport: function(e, t, n = a.makePromiseBuffer(e.bufferSize || 64)) {
        let d = {
            _sb: [],
            _sb: [],
            __d: false,
            state: d.__s,
            state: d.__s,
            base: t.__e,
            suspended: "SUSPENDED"
        };
        return {
            send: function(a) {
                const p = [];
                if (o.forEachEnvelopeItem(a, (t, n) => {
                        const r = o.envelopeItemTypeToDataCategory(n);
                        if (c.isRateLimited(d, r)) {
                            const o = u(t, n);
                            e.recordDroppedEvent("ratelimit_backoff", r, o);
                        } else {
                            p.push(t);
                        }
                    }), 0 === p.length) {
                    return l.resolvedSyncPromise({});
                }
                const h = o.createEnvelope(a[0], p),
                    m = t => {
                        o.forEachEnvelopeItem(h, (n, r) => {
                            const s = u(n, r);
                            e.recordDroppedEvent(t, o.envelopeItemTypeToDataCategory(r), s);
                        });
                    };
                return n.add(() => t({
                    body: o.serializeEnvelope(h)
                }).then(e => (undefined !== e.statusCode && (e.statusCode < 200 || e.statusCode >= 300) && r.DEBUG_BUILD && i.logger.warn(`Sentry responded with status code ${e.statusCode} to sent event.`), d = c.updateRateLimits(d, e), e), e => {
                    throw m("network_error"), e;
                })).then(e => e, e => {
                    if (e instanceof s.SentryError) {
                        return r.DEBUG_BUILD && i.logger.error("Skipped sending event because buffer is full."), m("queue_overflow"), l.resolvedSyncPromise({});
                    }
                    throw e;
                });
            },
            flush: e => n.drain(e)
        };
    },
    eventFromEnvelope: i,
    makeMultiplexedTransport: function(e, t) {
        return n => {
            const s = e(n),
                c = new Map;

            function l(t, s) {
                const a = s ? `${t}:${s}` : t;
                let l = c.get(a);
                if (!l) {
                    const u = o.dsnFromString(t);
                    if (!u) {
                        return;
                    }
                    const d = r.getEnvelopeEndpointWithUrlEncodedAuth(u, n.tunnel);
                    l = s ? (n => {
                        const r = e(n);
                        return {
                            ...r,
                            send: async e => {
                                const n = i(e, ["event", "transaction", "profile", "replay_event"]);
                                return n && (n.release = t), r.send(e);
                            }
                        };
                    })({
                        ...n,
                        url: d
                    }) : e({
                        ...n,
                        url: d
                    });
                    c.set(a, l);;
                }
                return [t, l];
            }
            return {
                send: async function(e) {
                    const n = t({
                            envelope: e,
                            getEvent: function(t) {
                                const n = t && t.length ? t : ["event"];
                                return i(e, n);
                            }
                        }).map(e => "string" == typeof e ? l(e, undefined) : l(e.dsn, e.release)).filter(e => !!e),
                        r = n.length ? n : [
                            ["", s]
                        ],
                        o = await Promise.all(r.map(([t, n]) => n.send(s.createEnvelope(t ? {
                            ...e[0],
                            dsn: t
                        } : e[0], e[1]))));
                    return o[0];
                },
                flush: async function(e) {
                    const t = [...c.values(), s];
                    return (await Promise.all(t.map(t => t.flush(e)))).every(e => e);
                }
            };
        };
    },
    MIN_DELAY: 100,
    START_DELAY: 5e3,
    makeOfflineTransport: function(e) {
        function t(...e) {
            r.DEBUG_BUILD && s.logger.info("[Offline]:", ...e);
        }
        return n => {
            const r = e(n);
            if (!n.createStore) {
                throw new Error("No `createStore` function was provided");
            }
            const s = n.createStore(n);
            let c, l = 5e3;

            function u(e) {
                c && clearTimeout(c);
                c = setTimeout(async () => {
                    c = undefined;
                    const e = await s.shift();
                    e && (t("Attempting to send previously queued event"), e[0].sent_at = (new Date).toISOString(), p(e, true).catch(e => {
                        t("Failed to retry sending", e);
                    }));
                }, e);
                "number" != typeof c && c.unref && c.unref();;
            }

            function d() {
                c || (u(l), l = Math.min(2 * l, 36e5));
            }
            async function p(e, c = false) {
                if (!c && o.envelopeContainsItemType(e, ["replay_event", "replay_recording"])) {
                    return await s.push(e), u(100), {};
                }
                try {
                    const t = await r.send(e);
                    let n = 100;
                    if (t) {
                        if (t.headers && t.headers["retry-after"]) {
                            n = i.parseRetryAfterHeader(t.headers["retry-after"]);
                        } else {
                            if (t.headers && t.headers["x-sentry-rate-limits"]) {
                                n = 6e4;
                            } else {
                                if ((t.statusCode || 0) >= 400) {
                                    return t;
                                }
                            }
                        }
                    }
                    return u(n), l = 5e3, t;
                } catch (r) {
                    if (await
                        function(e, t, r) {
                            return !o.envelopeContainsItemType(e, ["client_report"]) && (!n.shouldStore || n.shouldStore(e, t, r));
                        }(e, r, l)) {
                        return c ? await s.unshift(e) : await s.push(e), d(), t("Error sending. Event queued.", r), {};
                    }
                    throw r;
                }
            }
            return n.flushAtStartup && d(), {
                send: p,
                flush: e => r.flush(e)
            };
        };
    },
    trpcMiddleware: function(e = {}) {
        return async function(t) {
            const {
                path: n,
                type: l,
                next: u,
                rawInput: d,
                getRawInput: p
            } = t, h = r.getClient(), m = h && h.getOptions(), f = {
                procedure_path: n,
                procedure_type: l
            };
            if ((undefined !== e.attachRpcInput ? e.attachRpcInput : m && m.sendDefaultPii) && (undefined !== d && (f.input = i.normalize(d)), undefined !== p && "function" == typeof p)) {
                try {
                    const e = await p();
                    f.input = i.normalize(e);
                } catch (e) {}
            }
            return r.withScope(e => (e.setContext("trpc", f), a.startSpanManual({
                name: `trpc/${n}`,
                op: "rpc.server",
                attributes: {
                    [s.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "route",
                    [s.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.rpc.trpc"
                }
            }, async e => {
                try {
                    const t = await u();
                    return function(e) {
                        "object" == typeof e && null !== e && "ok" in e && !e.ok && "error" in e && o.captureException(e.error, c);
                    }(t), e.end(), t;
                } catch (t) {
                    throw o.captureException(t, c), e.end(), t;
                }
            })));
        };
    },
    applyAggregateErrorsToEvent: function(e, t, n = 250, i, a, c, l) {
        if (!(c.exception && c.exception.values && l && r.isInstanceOf(l.originalException, Error))) {
            return;
        }
        const u = c.exception.values.length > 0 ? c.exception.values[c.exception.values.length - 1] : undefined;
        var d, p;
        u && (c.exception.values = (d = s(e, t, a, l.originalException, i, c.exception.values, u, 0), p = n, d.map(e => (e.value && (e.value = o.truncate(e.value, p)), e))));
    },
    callFrameToStackFrame: function(e, t, n) {
        const i = t ? t.replace(/^file:\/\//, "") : undefined,
            a = e.location.columnNumber ? e.location.columnNumber + 1 : undefined,
            c = e.location.lineNumber ? e.location.lineNumber + 1 : undefined;
        return o.dropUndefinedKeys({
            filename: i,
            module: n(i),
            function: e.functionName || s.UNKNOWN_FUNCTION,
            colno: a,
            lineno: c,
            in_app: i ? r.filenameIsInApp(i) : undefined
        });
    },
    watchdogTimer: function(e, t, n, r) {
        const o = e();
        let s = false,
            i = true;
        return setInterval(() => {
            const e = o.getTimeMs();
            false === s && e > t + n && (s = true, i && r());
            e < t + n && (s = false);;
        }, 20), {
            poll: () => {
                o.reset();
            },
            enabled: e => {
                i = e;
            }
        };
    },
    flatten: function(e) {
        const t = [],
            n = e => {
                e.forEach(e => {
                    Array.isArray(e) ? n(e) : t.push(e);
                });
            };
        return n(e), t;
    },
    BAGGAGE_HEADER_NAME: "baggage",
    MAX_BAGGAGE_STRING_LENGTH: 8192,
    SENTRY_BAGGAGE_KEY_PREFIX: "sentry-",
    SENTRY_BAGGAGE_KEY_PREFIX_REGEX: /^sentry-/,
    baggageHeaderToDynamicSamplingContext: function(e) {
        const t = c(e);
        if (!t) {
            return;
        }
        const n = Object.entries(t).reduce((e, [t, n]) => (t.match(/^sentry-/) && (e[t.slice(7)] = n), e), {});
        return Object.keys(n).length > 0 ? n : undefined;
    },
    dynamicSamplingContextToSentryBaggageHeader: function(e) {
        if (e) {
            return function(e) {
                if (0 !== Object.keys(e).length) {
                    return Object.entries(e).reduce((e, [t, n], o) => {
                        const i = `${encodeURIComponent(t)}=${encodeURIComponent(n)}`,
                            a = 0 === o ? i : `${e},${i}`;
                        return a.length > 8192 ? (r.DEBUG_BUILD && s.logger.warn(`Not adding key: ${t} with val: ${n} to baggage header due to exceeding baggage size limits.`), e) : a;
                    }, "");
                }
            }(Object.entries(e).reduce((e, [t, n]) => (n && (e[`${"sentry-"}${t}`] = n), e), {}));
        }
    },
    parseBaggageHeader: c,
    getBreadcrumbLogLevelFromHttpStatusCode: function(e) {
        return undefined === e ? undefined : e >= 400 && e < 500 ? "warning" : e >= 500 ? "error" : undefined;
    },
    getComponentName: function(e) {
        if (!o.HTMLElement) {
            return null;
        }
        let t = e;
        for (let e = 0; e < 5; e++) {
            if (!t) {
                return null;
            }
            if (t instanceof HTMLElement) {
                if (t.dataset.sentryComponent) {
                    return t.dataset.sentryComponent;
                }
                if (t.dataset.sentryElement) {
                    return t.dataset.sentryElement;
                }
            }
            t = t.parentNode;
        }
        return null;
    },
    getDomElement: function(e) {
        return o.document && o.document.querySelector ? o.document.querySelector(e) : null;
    },
    getLocationHref: function() {
        try {
            return o.document.location.href;
        } catch (e) {
            return "";
        }
    },
    htmlTreeAsString: function(e, t = {}) {
        if (!e) {
            return "<unknown>";
        }
        try {
            let n = e;
            const o = [];
            let i = 0,
                a = 0;
            const l = " > ".length;
            let u;
            const d = Array.isArray(t) ? t : t.keyAttrs,
                p = !Array.isArray(t) && t.maxStringLength || 80;
            for (; n && i++ < 5 && (u = s(n, d), !("html" === u || i > 1 && a + o.length * l + u.length >= p));) {
                o.push(u);
                a += u.length;
                n = n.parentNode;;
            }
            return o.reverse().join(" > ");
        } catch (e) {
            return "<unknown>";
        }
    },
    _asyncNullishCoalesce: async function(e, t) {
        return r._nullishCoalesce(e, t);
    },
    _asyncOptionalChain: async function(e) {
        let t, n = e[0],
            r = 1;
        for (; r < e.length;) {
            const o = e[r],
                s = e[r + 1];
            if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) {
                return;
            }
            "access" === o || "optionalAccess" === o ? (t = n, n = await s(n)) : "call" !== o && "optionalCall" !== o || (n = await s((...e) => n.call(t, ...e)), t = undefined);
        }
        return n;
    },
    _asyncOptionalChainDelete: async function(e) {
        const t = await r._asyncOptionalChain(e);
        return null == t || t;
    },
    _nullishCoalesce: function(e, t) {
        return null != e ? e : t();
    },
    _optionalChain: function(e) {
        let t, n = e[0],
            r = 1;
        for (; r < e.length;) {
            const o = e[r],
                s = e[r + 1];
            if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) {
                return;
            }
            "access" === o || "optionalAccess" === o ? (t = n, n = s(n)) : "call" !== o && "optionalCall" !== o || (n = s((...e) => n.call(t, ...e)), t = undefined);
        }
        return n;
    },
    _optionalChainDelete: function(e) {
        const t = r._optionalChain(e);
        return null == t || t;
    },
    makeFifoCache: function(e) {
        let t = [],
            n = {
                r: o
            };
        return {
            add(r, o) {
                for (; t.length >= e;) {
                    const e = t.shift();
                    undefined !== e && delete n[e];
                }
                n[r] && this.delete(r);
                t.push(r);;;
            },
            clear() {
                n = {};
                t = [];;
            },
            get: e => n[e],
            size: () => t.length,
            delete(e) {
                if (!n[e]) {
                    return false;
                }
                delete n[e];
                for (let n = 0; n < t.length; n++) {
                    if (t[n] === e) {
                        t.splice(n, 1);
                        break;
                    }
                }
                return true;
            }
        };
    },
    createClientReportEnvelope: function(e, t, n) {
        const s = [{
            type: "client_report"
        }, {
            timestamp: n || o.dateTimestampInSeconds(),
            discarded_events: e
        }];
        return r.createEnvelope(t ? {
            dsn: t
        } : {}, [s]);
    },
    parseCookie: function(e) {
        const t = {
            s: -1 !== n.indexOf("%") ? decodeURIComponent(n) : n,
            s: n
        };
        let n = 0;
        for (; n < e.length;) {
            const r = e.indexOf("=", n);
            if (-1 === r) {
                break;
            }
            let o = e.indexOf(";", n);
            if (-1 === o) {
                o = e.length;
            } else {
                if (o < r) {
                    n = e.lastIndexOf(";", r - 1) + 1;
                    continue;
                }
            }
            const s = e.slice(n, r).trim();
            if (undefined === t[s]) {
                let n = e.slice(r + 1, o).trim();
                34 === n.charCodeAt(0) && (n = n.slice(1, -1));
                try {
                    ;
                } catch (e) {
                    ;
                }
            }
            n = o + 1;
        }
        return t;
    },
    DEBUG_BUILD: n,
    getDebugImagesForResources: function(e, t) {
        const n = s(e),
            r = [];
        for (const e of t) e && n[e] && r.push({
            type: "sourcemap",
            code_file: e,
            debug_id: n[e]
        });
        return r;
    },
    getFilenameToDebugIdMap: s,
    dsnFromString: i,
    dsnToString: function(e, t = false) {
        const {
            host: n,
            path: r,
            pass: o,
            port: s,
            projectId: i,
            protocol: a,
            publicKey: c
        } = e;
        return `${a}://${c}${t && o ? `:${o}` : ""}@${n}${s ? `:${s}` : ""}/${r ? `${r}/` : r}${i}`;
    },
    makeDsn: function(e) {
        const t = "string" == typeof e ? i(e) : a(e);
        if (t && function(e) {
                if (!r.DEBUG_BUILD) {
                    return true;
                }
                const {
                    port: t,
                    projectId: n,
                    protocol: s
                } = e;
                return !(["protocol", "publicKey", "host", "projectId"].find(t => !e[t] && (o.logger.error(`Invalid Sentry Dsn: ${t} missing`), true)) || (n.match(/^\d+$/) ? function(e) {
                    return "http" === e || "https" === e;
                }(s) ? t && isNaN(parseInt(t, 10)) && (o.logger.error(`Invalid Sentry Dsn: Invalid port ${t}`), 1) : (o.logger.error(`Invalid Sentry Dsn: Invalid protocol ${s}`), 1) : (o.logger.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), 1)));
            }(t)) {
            return t;
        }
    },
    getSDKSource: function() {
        return "npm";
    },
    isBrowserBundle: function() {
        return "undefined" != typeof __SENTRY_BROWSER_BUNDLE__ && !!__SENTRY_BROWSER_BUNDLE__;
    },
    addItemToEnvelope: function(e, t) {
        const [n, r] = e;
        return [n, [...r, t]];
    },
    createAttachmentEnvelopeItem: function(e) {
        const t = "string" == typeof e.data ? c(e.data) : e.data;
        return [s.dropUndefinedKeys({
            type: "attachment",
            length: t.length,
            filename: e.filename,
            content_type: e.contentType,
            attachment_type: e.attachmentType
        }), t];
    },
    createEnvelope: function(e, t = []) {
        return [e, t];
    },
    createEventEnvelopeHeaders: function(e, t, n, o) {
        const i = e.sdkProcessingMetadata && e.sdkProcessingMetadata.dynamicSamplingContext;
        return {
            event_id: e.event_id,
            sent_at: (new Date).toISOString(),
            ...t && {
                sdk: t
            },
            ...!!n && o && {
                dsn: r.dsnToString(o)
            },
            ...i && {
                trace: s.dropUndefinedKeys({
                    ...i
                })
            }
        };
    },
    createSpanEnvelopeItem: function(e) {
        return [{
            type: "span"
        }, e];
    },
    envelopeContainsItemType: function(e, t) {
        return a(e, (e, n) => t.includes(n));
    },
    envelopeItemTypeToDataCategory: function(e) {
        return l[e];
    },
    forEachEnvelopeItem: a,
    getSdkMetadataForEnvelopeHeader: function(e) {
        if (!e || !e.sdk) {
            return;
        }
        const {
            name: t,
            version: n
        } = e.sdk;
        return {
            name: t,
            version: n
        };
    },
    parseEnvelope: function(e) {
        let t = "string" == typeof e ? c(e) : e;

        function n(e) {
            const n = t.subarray(0, e);
            return t = t.subarray(e + 1), n;
        }

        function r() {
            let e = t.indexOf(10);
            return e < 0 && (e = t.length), JSON.parse((r = n(e), i.GLOBAL_OBJ.__SENTRY__ && i.GLOBAL_OBJ.__SENTRY__.decodePolyfill ? i.GLOBAL_OBJ.__SENTRY__.decodePolyfill(r) : (new TextDecoder).decode(r)));
            var r;
        }
        const o = r(),
            s = [];
        for (; t.length;) {
            const e = r(),
                t = "number" == typeof e.length ? e.length : undefined;
            s.push([e, t ? n(t) : r()]);
        }
        return [o, s];
    },
    serializeEnvelope: function(e) {
        const [t, n] = e;
        let r = JSON.stringify(t);

        function s(e) {
            "string" == typeof r ? r = "string" == typeof e ? r + e : [c(r), e] : r.push("string" == typeof e ? c(e) : e);
        }
        for (const e of n) {
            const [t, n] = e;
            if (s(`\n${JSON.stringify(t)}\n`), "string" == typeof n || n instanceof Uint8Array) {
                s(n);
            } else {
                let e;
                try {
                    e = JSON.stringify(n);
                } catch (t) {
                    e = JSON.stringify(o.normalize(n));
                }
                s(e);
            }
        }
        return "string" == typeof r ? r : function(e) {
            const t = e.reduce((e, t) => e + t.length, 0),
                n = new Uint8Array(t);
            let r = 0;
            for (const t of e) n.set(t, r), r += t.length;
            return n;
        }(r);
    },
    SentryError: n,
    eventFromMessage: function(e, t, n = "info", o, s) {
        const i = {
            event_id: o && o.event_id,
            level: n
        };
        if (s && o && o.syntheticException) {
            const n = e(o.syntheticException.stack || "", 1);
            n.length && (i.exception = {
                values: [{
                    value: t,
                    stacktrace: {
                        frames: n
                    }
                }]
            });
        }
        if (r.isParameterizedString(t)) {
            const {
                __sentry_template_string__: e,
                __sentry_template_values__: n
            } = t;
            return i.logentry = {
                message: e,
                params: n
            }, i;
        }
        return i.message = t, i;
    },
    eventFromUnknownInput: function(e, t, n, r) {
        const s = r && r.data && r.data.mechanism || {
                handled: true,
                type: "generic"
            },
            [i, a] = l(e, s, n, r),
            u = {
                exception: {
                    values: [c(t, i)]
                }
            };
        return a && (u.extra = a), o.addExceptionTypeValue(u, undefined, undefined), o.addExceptionMechanism(u, s), {
            ...u,
            event_id: r && r.event_id
        };
    },
    exceptionFromError: c,
    parseStackFrames: a,
    addConsoleInstrumentationHandler: function(e) {
        ;
        i.addHandler("console", e);
        i.maybeInstrument("console", a);;
    },
    addFetchEndInstrumentationHandler: function(e) {
        ;
        c.addHandler("fetch-body-resolved", e);
        c.maybeInstrument("fetch-body-resolved", () => l(u));;
    },
    addFetchInstrumentationHandler: function(e, t) {
        ;
        c.addHandler("fetch", e);
        c.maybeInstrument("fetch", () => l(undefined, t));;
    },
    parseFetchArgs: h,
    addGlobalErrorInstrumentationHandler: function(e) {
        ;
        o.addHandler("error", e);
        o.maybeInstrument("error", i);;
    },
    addGlobalUnhandledRejectionInstrumentationHandler: function(e) {
        ;
        o.addHandler("unhandledrejection", e);
        o.maybeInstrument("unhandledrejection", i);;
    },
    addHandler: function(e, t) {
        ;
        i[e].push(t);;
    },
    maybeInstrument: function(e, t) {
        if (!a[e]) {
            ;
            try {
                t();
            } catch (t) {
                r.DEBUG_BUILD && o.logger.error(`Error while instrumenting ${e}`, t);
            }
        }
    },
    resetInstrumentationHandlers: function() {
        Object.keys(i).forEach(e => {
            ;
        });
    },
    triggerHandlers: function(e, t) {
        const n = e && i[e];
        if (n) {
            for (const i of n) try {
                i(t);
            } catch (t) {
                r.DEBUG_BUILD && o.logger.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${s.getFunctionName(i)}\nError:`, t);
            }
        }
    },
    isDOMError: function(e) {
        return n.call(e) === `[object ${"DOMError"}]`;
    },
    isDOMException: function(e) {
        return n.call(e) === `[object ${"DOMException"}]`;
    },
    isElement: function(e) {
        return "undefined" != typeof Element && i(e, Element);
    },
    isError: function(e) {
        switch (n.call(e)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
            case "[object WebAssembly.Exception]":
                return true;
            default:
                return i(e, Error);
        }
    },
    isErrorEvent: function(e) {
        return n.call(e) === `[object ${"ErrorEvent"}]`;
    },
    isEvent: function(e) {
        return "undefined" != typeof Event && i(e, Event);
    },
    isInstanceOf: i,
    isParameterizedString: o,
    isPlainObject: s,
    isPrimitive: function(e) {
        return null === e || "object" == typeof e && null !== e && "__sentry_template_string__" in e && "__sentry_template_values__" in e || "object" != typeof e && "function" != typeof e;
    },
    isRegExp: function(e) {
        return n.call(e) === `[object ${"RegExp"}]`;
    },
    isString: function(e) {
        return n.call(e) === `[object ${"String"}]`;
    },
    isSyntheticEvent: function(e) {
        return n.call(e) === `[object ${"Object"}]` && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e;
    },
    isThenable: function(e) {
        return Boolean(e && e.then && "function" == typeof e.then);
    },
    isVueViewModel: function(e) {
        return !("object" != typeof e || null === e || !e.__isVue && !e._isVue);
    },
    isBrowser: function() {
        return "undefined" != typeof window && (!r.isNodeEnv() || undefined !== o.GLOBAL_OBJ.process && "renderer" === o.GLOBAL_OBJ.process.type);
    },
    e: r,
    e: n[e],
    n: (...t) => {
        e && a(() => {
            o.GLOBAL_OBJ.console[n](`Sentry Logger [${n}]:`, ...t);
        });
    },
    e: () => {},
    CONSOLE_LEVELS: s,
    consoleSandbox: a,
    logger: c,
    originalConsoleMethods: i,
    LRUMap: class {
        constructor(e) {
            this._maxSize = e;
            this._cache = new Map;;
        }
        get size() {
            return this._cache.size;
        }
        get(e) {
            const t = this._cache.get(e);
            if (undefined !== t) {
                return this._cache.delete(e), this._cache.set(e, t), t;
            }
        }
        set(e, t) {
            this._cache.size >= this._maxSize && this._cache.delete(this._cache.keys().next().value);
            this._cache.set(e, t);;
        }
        remove(e) {
            const t = this._cache.get(e);
            return t && this._cache.delete(e), t;
        }
        clear() {
            this._cache.clear();
        }
        keys() {
            return Array.from(this._cache.keys());
        }
        values() {
            const e = [];
            return this._cache.forEach(t => e.push(t)), e;
        }
    },
    memoBuilder: function() {
        const e = "function" == typeof WeakSet,
            t = e ? new WeakSet : [];
        return [function(n) {
            if (e) {
                return !!t.has(n) || (t.add(n), false);
            }
            for (let e = 0; e < t.length; e++) {
                if (t[e] === n) {
                    return true;
                }
            }
            return t.push(n), false;
        }, function(n) {
            if (e) {
                t.delete(n);
            } else {
                for (let e = 0; e < t.length; e++) {
                    if (t[e] === n) {
                        t.splice(e, 1);
                        break;
                    }
                }
            }
        }];
    },
    pre_context: e.slice(Math.max(0, s - n), s).map(e => o.snipLine(e, 0)),
    context_line: o.snipLine(e[i], t.colno || 0),
    post_context: e.slice(Math.min(s + 1, r), s + 1 + n).map(e => o.snipLine(e, 0)),
    addContextToFrame: function(e, t, n = 5) {
        if (undefined === t.lineno) {
            return;
        }
        const r = e.length,
            s = Math.max(Math.min(r - 1, t.lineno - 1), 0);;
        const i = Math.min(r - 1, s);;;;
    },
    addExceptionMechanism: function(e, t) {
        const n = i(e);
        if (!n) {
            return;
        }
        const r = n.mechanism;
        if (n.mechanism = {
                type: "generic",
                handled: true,
                ...r,
                ...t
            }, t && "data" in t) {
            const e = {
                ...r && r.data,
                ...t.data
            };
            n.mechanism.data = e;
        }
    },
    addExceptionTypeValue: function(e, t, n) {
        const r = e.exception = e.exception || {},
            o = r.values = r.values || [],
            s = o[0] = o[0] || {};
        s.value || (s.value = t || "");
        s.type || (s.type = n || "Error");;
    },
    arrayify: function(e) {
        return Array.isArray(e) ? e : [e];
    },
    checkOrSetAlreadyCaught: function(e) {
        if (e && e.__sentry_captured__) {
            return true;
        }
        try {
            r.addNonEnumerableProperty(e, "__sentry_captured__", true);
        } catch (e) {}
        return false;
    },
    getEventDescription: function(e) {
        const {
            message: t,
            event_id: n
        } = e;
        if (t) {
            return t;
        }
        const r = i(e);
        return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
    },
    parseSemver: function(e) {
        const t = e.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/) || [],
            n = parseInt(t[1] || "", 10),
            r = parseInt(t[2] || "", 10),
            o = parseInt(t[3] || "", 10);
        return {
            buildmetadata: t[5],
            major: isNaN(n) ? undefined : n,
            minor: isNaN(r) ? undefined : r,
            patch: isNaN(o) ? undefined : o,
            prerelease: t[4]
        };
    },
    uuid4: function() {
        const e = s.GLOBAL_OBJ,
            t = e.crypto || e.msCrypto;
        let n = () => 16 * Math.random();
        try {
            if (t && t.randomUUID) {
                return t.randomUUID().replace(/-/g, "");
            }
            t && t.getRandomValues && (n = () => {
                const e = new Uint8Array(1);
                return t.getRandomValues(e), e[0];
            });
        } catch (e) {}
        return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, e => (e ^ (15 & n()) >> e / 4).toString(16));
    },
    filenameIsInApp: o,
    node: s,
    nodeStackLineParser: function(e) {
        return [90, s(e)];
    },
    dynamicRequire: o,
    isNodeEnv: function() {
        return !r.isBrowserBundle() && "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0);
    },
    loadModule: function(t) {
        let n;
        try {
            n = e.require(t);
        } catch (e) {}
        if (!n) {
            try {
                const {
                    cwd: r
                } = e.require("process");
                n = e.require(`${r()}/node_modules/${t}`);
            } catch (e) {}
        }
        return n;
    },
    normalize: a,
    normalizeToSize: function e(t, n = 3, r = 102400) {
        const o = a(t, n);
        return s = o,
            function(e) {
                return ~-encodeURI(e).split(/%..|./).length;
            }(JSON.stringify(s)) > r ? e(t, n - 1, r) : o;
        var s;
    },
    normalizeUrlToBase: function(e, t) {
        const n = t.replace(/\\/g, "/").replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
        let r = e;
        try {
            r = decodeURI(e);
        } catch (e) {}
        return r.replace(/\\/g, "/").replace(/webpack:\/?/g, "").replace(new RegExp(`(file://)?/*${n}/*`, "ig"), "app:///");
    },
    basename: function(e, t) {
        let n = o(e)[2] || "";
        return t && n.slice(-1 * t.length) === t && (n = n.slice(0, n.length - t.length)), n;
    },
    dirname: function(e) {
        const t = o(e),
            n = t[0] || "";
        let r = t[1];
        return n || r ? (r && (r = r.slice(0, r.length - 1)), n + r) : ".";
    },
    isAbsolute: c,
    join: function(...e) {
        return a(e.join("/"));
    },
    normalizePath: a,
    relative: function(e, t) {
        e = s(e).slice(1);
        t = s(t).slice(1);;
        const n = i(e.split("/")),
            r = i(t.split("/")),
            o = Math.min(n.length, r.length);
        let a = o;
        for (let e = 0; e < o; e++) {
            if (n[e] !== r[e]) {
                a = e;
                break;
            }
        }
        let c = [];
        for (let e = a; e < n.length; e++) {
            c.push("..");
        }
        return c = c.concat(r.slice(a)), c.join("/");
    },
    resolve: s,
    makePromiseBuffer: function(e) {
        const t = [];
        return {
            $: t,
            add: function(s) {
                if (!(undefined === e || t.length < e)) {
                    return o.rejectedSyncPromise(new r.SentryError("Not adding Promise because buffer limit was reached."));
                }
                const i = s();
                return -1 === t.indexOf(i) && t.push(i), i.then(() => t.splice(t.indexOf(i), 1)[0] || Promise.resolve(undefined)).then(null, () => (t.splice(t.indexOf(i), 1)[0] || Promise.resolve(undefined)).then(null, () => {})), i;
            },
            drain: function(e) {
                return new o.SyncPromise((n, r) => {
                    let s = t.length;
                    if (!s) {
                        return t.splice(t.indexOf(true), 1)[0] || Promise.resolve(undefined);
                    }
                    const i = setTimeout(() => {
                        e && e > 0 && (t.splice(t.indexOf(false), 1)[0] || Promise.resolve(undefined));
                    }, e);
                    t.forEach(e => {
                        o.resolvedSyncPromise(e).then(() => {
                            --s || (clearTimeout(i), t.splice(t.indexOf(true), 1)[0] || Promise.resolve(undefined));
                        }, r);
                    });
                });
            }
        };
    },
    generatePropagationContext: function() {
        return {
            traceId: r.uuid4(),
            spanId: r.uuid4().substring(16)
        };
    },
    DEFAULT_RETRY_AFTER: 6e4,
    disabledUntil: r,
    isRateLimited: function(e, t, n = Date.now()) {
        return (e[t] || e.all || 0) > n;
    },
    parseRetryAfterHeader: n,
    updateRateLimits: function(e, {
        statusCode: t,
        headers: r
    }, o = Date.now()) {
        const s = {
                ...e
            },
            i = r && r["x-sentry-rate-limits"],
            a = r && r["retry-after"];
        if (i) {
            for (const e of i.trim().split(",")) {
                const [t, n, , , r] = e.split(":", 5), i = parseInt(t, 10), a = 1e3 * (isNaN(i) ? 60 : i);
                if (n) {
                    for (const e of n.split(";")) "metric_bucket" === e && r && !r.split(";").includes("custom") || (s[e] = o + a);
                } else {
                    ;
                }
            }
        } else {
            a ? s.all = o + n(a, o) : 429 === t && (s.all = o + 6e4);
        }
        return s;
    },
    severityLevelFromString: function(e) {
        return "warn" === e ? "warning" : n.includes(e) ? e : "log";
    },
    validSeverityLevels: n,
    UNKNOWN_FUNCTION: "?",
    createStackParser: o,
    getFramesFromEvent: function(e) {
        const t = e.exception;
        if (t) {
            const e = [];
            try {
                return t.values.forEach(t => {
                    t.stacktrace.frames && e.push(...t.stacktrace.frames);
                }), e;
            } catch (e) {
                return;
            }
        }
    },
    getFunctionName: function(e) {
        try {
            return e && "function" == typeof e && e.name || "<anonymous>";
        } catch (e) {
            return "<anonymous>";
        }
    },
    stackParserFromStackParserOptions: function(e) {
        return Array.isArray(e) ? o(...e) : e;
    },
    stripSentryFramesAndReverse: s,
    isMatchingPattern: o,
    safeJoin: function(e, t) {
        if (!Array.isArray(e)) {
            return "";
        }
        const n = [];
        for (let t = 0; t < e.length; t++) {
            const o = e[t];
            try {
                r.isVueViewModel(o) ? n.push("[VueViewModel]") : n.push(String(o));
            } catch (e) {
                n.push("[value cannot be serialized]");
            }
        }
        return n.join(t);
    },
    snipLine: function(e, t) {
        let n = e;
        const r = n.length;
        if (r <= 150) {
            return n;
        }
        t > r && (t = r);
        let o = Math.max(t - 60, 0);
        o < 5 && (o = 0);
        let s = Math.min(o + 140, r);
        return s > r - 5 && (s = r), s === r && (o = Math.max(s - 140, 0)), n = n.slice(o, s), o > 0 && (n = `'{snip} ${n}`), s < r && (n += " {snip}"), n;
    },
    stringMatchesSomePattern: function(e, t = [], n = false) {
        return t.some(t => o(e, t, n));
    },
    truncate: function(e, t = 0) {
        return "string" != typeof e || 0 === t || e.length <= t ? e : `${e.slice(0, t)}...`;
    },
    isNativeFunction: a,
    supportsDOMError: function() {
        try {
            return new DOMError(""), true;
        } catch (e) {
            return false;
        }
    },
    supportsDOMException: function() {
        try {
            return new DOMException(""), true;
        } catch (e) {
            return false;
        }
    },
    supportsErrorEvent: function() {
        try {
            return new ErrorEvent(""), true;
        } catch (e) {
            return false;
        }
    },
    supportsFetch: i,
    supportsNativeFetch: function() {
        if ("string" == typeof EdgeRuntime) {
            return true;
        }
        if (!i()) {
            return false;
        }
        if (s.fetch && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(s.fetch.toString())) {
            return true;
        }
        let e = false;
        const t = s.document;
        if (t && "function" == typeof t.createElement) {
            try {
                const n = t.createElement("iframe");;
                t.head.appendChild(n);
                n.contentWindow && n.contentWindow.fetch && (e = n.contentWindow.fetch && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(n.contentWindow.fetch.toString()));
                t.head.removeChild(n);;
            } catch (e) {
                r.DEBUG_BUILD && o.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", e);
            }
        }
        return e;
    },
    supportsReferrerPolicy: function() {
        if (!i()) {
            return false;
        }
        try {
            return new Request("_", {
                referrerPolicy: "origin"
            }), true;
        } catch (e) {
            return false;
        }
    },
    supportsReportingObserver: function() {
        return "ReportingObserver" in s;
    },
    SyncPromise: s,
    rejectedSyncPromise: function(e) {
        return new s((t, n) => {
            n(e);
        });
    },
    resolvedSyncPromise: function(e) {
        return new s(t => {
            t(e);
        });
    },
    _browserPerformanceTimeOriginMode: undefined,
    browserPerformanceTimeOrigin: i,
    dateTimestampInSeconds: o,
    timestampInSeconds: s,
    TRACEPARENT_REGEXP: s,
    extractTraceparentData: i,
    generateSentryTraceHeader: function(e = o.uuid4(), t = o.uuid4().substring(16), n) {
        let r = "";
        return undefined !== n && (r = n ? "-1" : "-0"), `${e}-${t}${r}`;
    },
    propagationContextFromHeaders: function(e, t) {
        const n = i(e),
            s = r.baggageHeaderToDynamicSamplingContext(t),
            {
                traceId: a,
                parentSpanId: c,
                parentSampled: l
            } = n || {};
        return n ? {
            traceId: a || o.uuid4(),
            parentSpanId: c || o.uuid4().substring(16),
            spanId: o.uuid4().substring(16),
            sampled: l,
            dsc: s || {}
        } : {
            traceId: a || o.uuid4(),
            spanId: o.uuid4().substring(16)
        };
    },
    getNumberOfUrlSegments: function(e) {
        return e.split(/\\?\//).filter(e => e.length > 0 && "," !== e).length;
    },
    getSanitizedUrlString: function(e) {
        const {
            protocol: t,
            host: n,
            path: r
        } = e;
        return `${t ? `${t}://` : ""}${n && n.replace(/^.*@/, "[filtered]:[filtered]@").replace(/(:80)$/, "").replace(/(:443)$/, "") || ""}${r}`;
    },
    parseUrl: function(e) {
        if (!e) {
            return {};
        }
        const t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!t) {
            return {};
        }
        const n = t[6] || "",
            r = t[8] || "";
        return {
            host: t[4],
            path: t[5],
            protocol: t[2],
            search: n,
            hash: r,
            relative: t[5] + n + r
        };
    },
    stripUrlQueryAndFragment: function(e) {
        return e.split(/[?#]/, 1)[0];
    },
    escapeStringForRegex: function(e) {
        return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    },
    getClientIPAddress: function(e) {
        return n.map(t => {
            const n = e[t],
                r = Array.isArray(n) ? n.join(";") : n;
            return "Forwarded" === t ? function(e) {
                if (!e) {
                    return null;
                }
                for (const t of e.split(";"))
                    if (t.startsWith("for=")) {
                        return t.slice(4);
                    }
                return null;
            }(r) : r && r.split(",").map(e => e.trim());
        }).reduce((e, t) => t ? e.concat(t) : e, []).find(e => null !== e && /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/.test(e)) || null;
    },
    ipHeaderNames: n,
    supportsHistory: function() {
        const e = r.chrome,
            t = e && e.app && e.app.runtime,
            n = "history" in r && !!r.history.pushState && !!r.history.replaceState;
        return !t && n;
    },
    vercelWaitUntil: function(e) {
        const t = r.GLOBAL_OBJ[Symbol.for("@vercel/request-context")],
            n = t && t.get && t.get() ? t.get() : {};
        n && n.waitUntil && n.waitUntil(e);
    },
    SDK_VERSION: "8.40.0",
    GLOBAL_OBJ: o,
    getGlobalSingleton: function(e, t, n) {
        const s = n || o,
            i = s.__SENTRY__ = s.__SENTRY__ || {},
            a = i[r.SDK_VERSION] = i[r.SDK_VERSION] || {};
        return a[e] || (a[e] = t());
    },
    applyScopeDataToEvent: function(e, t) {
        const {
            fingerprint: n,
            span: s,
            breadcrumbs: a,
            sdkProcessingMetadata: c
        } = t;
        ! function(e, t) {
            const {
                extra: n,
                tags: r,
                user: s,
                contexts: i,
                level: a,
                transactionName: c
            } = t, l = o.dropUndefinedKeys(n);
            l && Object.keys(l).length && (e.extra = {
                ...l,
                ...e.extra
            });
            const u = o.dropUndefinedKeys(r);
            u && Object.keys(u).length && (e.tags = {
                ...u,
                ...e.tags
            });
            const d = o.dropUndefinedKeys(s);
            d && Object.keys(d).length && (e.user = {
                ...d,
                ...e.user
            });
            const p = o.dropUndefinedKeys(i);
            p && Object.keys(p).length && (e.contexts = {
                ...p,
                ...e.contexts
            });
            a && (e.level = a);
            c && "transaction" !== e.type && (e.transaction = c);;
        }(e, t);
        s && function(e, t) {
            e.contexts = {
                trace: i.spanToTraceContext(t),
                ...e.contexts
            };
            e.sdkProcessingMetadata = {
                dynamicSamplingContext: r.getDynamicSamplingContextFromSpan(t),
                ...e.sdkProcessingMetadata
            };;
            const n = i.getRootSpan(t),
                o = i.spanToJSON(n).description;
            o && !e.transaction && "transaction" === e.type && (e.transaction = o);
        }(e, s);
        (function(e, t) {
            e.fingerprint = e.fingerprint ? Array.isArray(e.fingerprint) ? e.fingerprint : [e.fingerprint] : [];
            t && (e.fingerprint = e.fingerprint.concat(t));
            e.fingerprint && !e.fingerprint.length && delete e.fingerprint;;
        }(e, n));
        (function(e, t) {
            const n = [...e.breadcrumbs || [], ...t];
            e.breadcrumbs = n.length ? n : undefined;
        }(e, a));
        (function(e, t) {
            e.sdkProcessingMetadata = {
                ...e.sdkProcessingMetadata,
                ...t
            };
        }(e, c));;
    },
    mergeAndOverwriteScopeData: a,
    mergeScopeData: function(e, t) {
        const {
            extra: n,
            tags: r,
            user: o,
            contexts: i,
            level: c,
            sdkProcessingMetadata: l,
            breadcrumbs: u,
            fingerprint: d,
            eventProcessors: p,
            attachments: h,
            propagationContext: m,
            transactionName: f,
            span: g
        } = t;
        a(e, "extra", n);
        a(e, "tags", r);
        a(e, "user", o);
        a(e, "contexts", i);
        e.sdkProcessingMetadata = s.merge(e.sdkProcessingMetadata, l, 2);
        c && (e.level = c);
        f && (e.transactionName = f);
        g && (e.span = g);
        u.length && (e.breadcrumbs = [...e.breadcrumbs, ...u]);
        d.length && (e.fingerprint = [...e.fingerprint, ...d]);
        p.length && (e.eventProcessors = [...e.eventProcessors, ...p]);
        h.length && (e.attachments = [...e.attachments, ...h]);
        e.propagationContext = {
            ...e.propagationContext,
            ...m
        };;
    },
    handleCallbackErrors: function(e, t, n = () => {}) {
        let o;
        try {
            o = e();
        } catch (e) {
            throw t(e), n(), e;
        }
        return function(e, t, n) {
            return r.isThenable(e) ? e.then(e => (n(), e), e => {
                throw t(e), n(), e;
            }) : (n(), e);
        }(o, t, n);
    },
    hasTracingEnabled: function(e) {
        if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__) {
            return false;
        }
        const t = r.getClient(),
            n = e || t && t.getOptions();
        return !!n && (n.enableTracing || "tracesSampleRate" in n || "tracesSampler" in n);
    },
    isSentryRequestUrl: function(e, t) {
        const r = t && t.getDsn(),
            o = t && t.getOptions().tunnel;
        return function(e, t) {
            return !!t && e.includes(t.host);
        }(e, r) || function(e, t) {
            return !!t && n(e) === n(t);
        }(e, o);
    },
    merge: function e(t, n, r = 2) {
        if (!n || "object" != typeof n || r <= 0) {
            return n;
        }
        if (t && n && 0 === Object.keys(n).length) {
            return t;
        }
        const o = {
            ...t
        };
        for (const t in n) Object.prototype.hasOwnProperty.call(n, t) && (o[t] = e(o[t], n[t], r - 1));
        return o;
    },
    getTraceMetaTags: function() {
        return Object.entries(r.getTraceData()).map(([e, t]) => `<meta name="${e}" content="${t}"/>`).join("\n");
    },
    parameterize: function(e, ...t) {
        const n = new String(String.raw(e, ...t));
        return n.__sentry_template_string__ = e.join("").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = t, n;
    },
    parseSampleRate: function(e) {
        if ("boolean" == typeof e) {
            return Number(e);
        }
        const t = "string" == typeof e ? parseFloat(e) : e;
        if (!("number" != typeof t || isNaN(t) || t < 0 || t > 1)) {
            return t;
        }
        r.DEBUG_BUILD && o.logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(e)} of type ${JSON.stringify(typeof e)}.`);
    },
    applySdkMetadata: function(e, t, n = [t], o = "npm") {
        const s = e._metadata || {};
        s.sdk || (s.sdk = {
            name: `sentry.javascript.${t}`,
            packages: n.map(e => ({
                name: `${o}:@sentry/${e}`,
                version: r.SDK_VERSION
            })),
            version: r.SDK_VERSION
        });
        e._metadata = s;;
    },
    _getSpanForScope: function(e) {
        return e._sentrySpan;
    },
    _setSpanForScope: function(e, t) {
        t ? r.addNonEnumerableProperty(e, "_sentrySpan", t) : delete e._sentrySpan;
    },
    TRACE_FLAG_NONE: 0,
    TRACE_FLAG_SAMPLED: 1,
    addChildSpanToSpan: function(e, t) {
        const n = e._sentryRootSpan || e;
        l.addNonEnumerableProperty(t, "_sentryRootSpan", n);
        e._sentryChildSpans ? e._sentryChildSpans.add(t) : l.addNonEnumerableProperty(e, "_sentryChildSpans", new Set([t]));;
    },
    getActiveSpan: v,
    getRootSpan: function(e) {
        return e._sentryRootSpan || e;
    },
    getSpanDescendants: function(e) {
        const t = new Set;
        return function e(n) {
            if (!t.has(n) && g(n)) {
                t.add(n);
                const r = n._sentryChildSpans ? Array.from(n._sentryChildSpans) : [];
                for (const t of r) e(t);
            }
        }(e), Array.from(t);
    },
    getStatusMessage: _,
    removeChildSpanFromSpan: function(e, t) {
        e._sentryChildSpans && e._sentryChildSpans.delete(t);
    },
    spanIsSampled: g,
    spanTimeInputToSeconds: h,
    spanToJSON: f,
    spanToTraceContext: function(e) {
        const {
            spanId: t,
            traceId: n
        } = e.spanContext(), {
            parent_span_id: r
        } = f(e);
        return l.dropUndefinedKeys({
            parent_span_id: r,
            span_id: t,
            trace_id: n
        });
    },
    spanToTraceHeader: function(e) {
        const {
            traceId: t,
            spanId: n
        } = e.spanContext(), r = g(e);
        return d.generateSentryTraceHeader(t, n, r);
    },
    spanToTransactionTraceContext: function(e) {
        const {
            spanId: t,
            traceId: n
        } = e.spanContext(), {
            data: r,
            op: o,
            parent_span_id: s,
            status: i,
            origin: a
        } = f(e);
        return l.dropUndefinedKeys({
            parent_span_id: s,
            span_id: t,
            trace_id: n,
            data: r,
            op: o,
            status: i,
            origin: a
        });
    },
    updateMetricSummaryOnActiveSpan: function(e, t, n, r, o, s) {
        const a = v();
        a && i.updateMetricSummaryOnSpan(a, e, t, n, r, o, s);
    },
    getTraceData: function() {
        if (!i.isEnabled()) {
            return {};
        }
        const e = o.getMainCarrier(),
            t = r.getAsyncContextStrategy(e);
        if (t.getTraceData) {
            return t.getTraceData();
        }
        const n = s.getClient(),
            h = s.getCurrentScope(),
            m = c.getActiveSpan(),
            {
                dsc: f,
                sampled: g,
                traceId: _
            } = h.getPropagationContext(),
            y = m && c.getRootSpan(m),
            S = m ? c.spanToTraceHeader(m) : l.generateSentryTraceHeader(_, undefined, g),
            v = y ? u.getDynamicSamplingContextFromSpan(y) : f || (n ? u.getDynamicSamplingContextFromClient(_, n) : undefined),
            b = d.dynamicSamplingContextToSentryBaggageHeader(v);
        if (!l.TRACEPARENT_REGEXP.test(S)) {
            return a.logger.warn("Invalid sentry-trace data. Cannot generate trace data"), {};
        }
        const E = p(b);
        return E || a.logger.warn('Invalid baggage data. Not returning "baggage" value'), {
            "sentry-trace": S,
            ...E && {
                baggage: b
            }
        };
    },
    isValidBaggageString: p,
    EVerdictAction: undefined,
    ContentScriptMessageType: undefined,
    BrowserTypes: t.youtubeStrictSafesearch = t.companionWebGrpcUrl = t.CompanionFeatures = t.MessageTypes = t.LogLevel = t.LogLevelTypes = t.EventTypes = t.UniqueScheduleIds = t.SchedulesConstants = t.ScreenshotPersisterConstants = t.ConnectionsConstants = t.AuthenticateConstants = t.ContentAwareLicenseStatus = t.ContentAwareIECMessageTypes = t.ContentAwareConstants = t.DelegationReporting = t.DelegationConstants = t.SystemConfigConstants = t.CompanionConstants = t.MainConstants = t.TabsConstants = t.ConfigFetcherConstants = t.ChatConstants = t.ConfigConstants = t.VerdictStoreConstants = t.FallbackVerdictStoreConstants = t.FilteringConstants = t.FirestoreDocIds = t.KeepAliveConstants = t.FzboxConstants = t.DMSManagerConstants = t.UpdaterConstants = undefined,
    companionWebGrpcUrl: "http://127.0.0.1:5769",
    youtubeStrictSafesearch: "STRICT",
    default: class {
        static handleContentMod(e) {
            switch (e.action) {
                case "remove":
                    this.hideDomBySelector(e.target);
                    break;
                case "replace":
                    this.replaceDomBySelector(e.target, e.value);
                    break;
                default:
                    console.warn(`[ContentMods] Unknown action: ${e.action}`);
            }
        }
        static hideDomBySelector(e) {
            try {
                const t = e + " {display: none !important;}",
                    n = document.createElement("style");
                if (n.type = "text/css", n.styleSheet) {
                    n.styleSheet.cssText = t;
                } else {
                    const e = document.createTextNode(t);
                    n.appendChild(e);
                }
                const r = document.getElementsByTagName("head");
                if (r.length > 0) {
                    r[0].appendChild(n);
                } else {
                    console.warn('document error: missing the "head" element');
                    const e = document.createElement("head");
                    e.appendChild(n);
                    const t = document.getElementsByTagName("html");
                    if (t.length <= 0) {
                        return void console.error('document error: missing the "html" element');
                    }
                    t[0].appendChild(e);
                }
                console.log(`Succeeded in removing the selector '${e}'`);
            } catch (t) {
                (0, r.logErrorInSentry)(t);
                console.warn(`Failed to remove the selector '${e}':`, t);;
            }
        }
        static replaceDomBySelector(e, t) {
            try {
                const n = document.querySelectorAll(e);
                for (let e = 0; e < n.length; ++e) {
                    n[e].innerText = t;
                }
                console.log(`Succeeded in replacing ${n.length} DOM elements to '${t}' with the selector '${e}`);
            } catch (t) {
                (0, r.logErrorInSentry)(t);
                console.warn(`Failed to replace the selector '${e}':`, t);;
            }
        }
    },
    default: s,
    default: n,
    ContentFilter: undefined,
    ContentFilter: p
};

function n(r) {
    var o = t[r];
    if (undefined !== o) {
        return o.exports;
    }
    var s = t[r] = {
        id: r,
        loaded: false,
        exports: {}
    };
    return e[r].call(s.exports, s, s.exports, n), s.loaded = true, s.exports;
}; n(9344);
})();