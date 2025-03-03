887: function (t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var n = a(r(44)),
      i = a(r(36)),
      o = a(r(9)),
      s = a(r(886)),
      u = a(r(885));
    function a(t) {
      return t && t.__esModule ? t : { default: t };
    }
    var c = {
      _topLevel: window.self === window.top,
      _hasRun: !1,
      _lastUrl: window.location.href,
      RUN_INTERVAL_MS: 3e3,
      FLAGGED_ACTIVITY_RUN_INTERVAL_MS: 1e4,
      allMetadata: { flaggedActivity: [], docs: [] },
      _scripters: {
        docsScripter: s.default,
        flaggedActivityScripter: u.default,
      },
      start() {
        if (!this._hasRun)
          return (
            window.addEventListener(
              "hashchange",
              this._restart.bind(this, "hashchange")
            ),
            window.addEventListener(
              "beforeunload",
              this._sendEntityDelete.bind(this, this._lastUrl, "reload")
            ),
            n.default
              .all(
                i.default.values(this._scripters).map((t) => {
                  var e = Object.getPrototypeOf(t).isPrototypeOf(
                    this._scripters.flaggedActivityScripter
                  )
                    ? this.FLAGGED_ACTIVITY_RUN_INTERVAL_MS
                    : this.RUN_INTERVAL_MS;
                  return setInterval(this._reRun.bind(this, t), e), t.run();
                })
              )
              .then((t) => {
                t.forEach((t) => {
                  this.allMetadata[t.metadataType] = t.metadata;
                }),
                  this._onAllScriptersDone();
              })
          );
      },
      _restart(t) {
        return (
          this._resetMetadata(),
          this._sendEntityDelete(this._lastUrl, t),
          (this._hasRun = !1),
          (this._lastUrl = window.location.href),
          n.default
            .all(
              i.default
                .values(this._scripters)
                .map((t) => ((t._metadata = null), t.run()))
            )
            .then((e) => {
              if (i.default.some(e, (t) => void 0 === t))
                return this._restart(t);
              e.forEach((t) => {
                this.allMetadata[t.metadataType] = t.metadata;
              }),
                this._onAllScriptersDone();
            })
        );
      },
      _sendEntityDelete(t, e) {
        o.default.runtime.sendMessage({
          target: "PageUnloadListener",
          oldUrl: t,
          method: e,
        });
      },
      _reRun(t) {
        return this._topLevel && window.location.href !== this._lastUrl
          ? this._restart("hashchange")
          : t.run().then((t) => {
              t && this._updateMetadata(t);
            });
      },
      _updateMetadata(t) {
        this.allMetadata[t.metadataType] = this.allMetadata[
          t.metadataType
        ].concat(t.metadata);
        var e = {};
        (e[t.metadataType] = t.metadata),
          o.default.runtime.sendMessage({
            target: "EntityManager",
            isTopLevel: this._topLevel,
            type: "update",
            metadata: this.allMetadata,
            diff: e,
          });
      },
      _onAllScriptersDone() {
        o.default.runtime.sendMessage({
          target: "EntityManager",
          isTopLevel: this._topLevel,
          type: "initial",
          metadata: this.allMetadata,
        }),
          (this._hasRun = !0);
      },
      _resetMetadata() {
        this.allMetadata = { flaggedActivity: [], docs: [] };
      },
    };
    (e.default = c), (t.exports = e.default);
  },
  888: function (t, e, r) {
    "use strict";
    var n = s(r(286)),
      i = r(323),
      o = s(r(9));
    function s(t) {
      return t && t.__esModule ? t : { default: t };
    }
    const u = ["http:", "https:"],
      a = [
        i.Reason.BlockWebProxies,
        i.Reason.BlockDirectIPAccess,
        i.Reason.BlockConsumerAccounts,
        i.Reason.AdminSiteFilter,
        i.Reason.AdminSiteCategoryFilter,
        i.Reason.AdminSafeMode,
      ];
    if (
      (function (t) {
        if (!(0, i.isBlockUrl)(t)) return !1;
        try {
          const { blockContext: e } = (0, i.parseBlockUrl)(t);
          return a.includes(e.reason);
        } catch (t) {
          return !1;
        }
      })(window.location.href)
    ) {
      const t = document.createElement("div");
      t.className = "bypassCont";
      const e = document.createElement("button");
      (e.className = "btn btn-default btn-xs bypassfilter"),
        (e.innerHTML = "Bypass"),
        e.addEventListener("click", function () {
          let e = "";
          const r = (function (t) {
            if ((0, i.isBlockUrl)(t))
              try {
                const { blockContext: e } = (0, i.parseBlockUrl)(t);
                return e.originalURL;
              } catch (t) {
                return null;
              }
            try {
              const e = n.default.parse(t, !0);
              return e.query && e.query.url ? e.query.url : null;
            } catch (t) {
              return null;
            }
          })(window.location.href);
          if (r) {
            e = r;
            const t = n.default.parse(r, !0);
            t.hostname && (e = t.hostname),
              t.protocol &&
                !u.includes(t.protocol) &&
                (e = t.protocol + "//" + e);
          }
          (t.innerHTML = `\n      All attempts are logged.\n      <br/>\n      <label for="url" class="visuallyhidden">Website URL: </label>\n      <input class="url" placeholder="Website URL" value="${e}" readonly/>\n      <br/>\n      <label for="password" class="visuallyhidden">Password: </label>\n      <input class="password" placeholder="Password" type="password" />\n      <br/>\n    `),
            (t.style.cssText = "margin-top: 250px;");
          const s = document.createElement("button");
          (s.className = "btn submitAll btn-default"),
            (s.innerHTML = "Submit"),
            s.addEventListener("click", function () {
              let r = "";
              const n = document.querySelector("input.password");
              n instanceof HTMLInputElement && (r = n.value);
              let i = e;
              i.match(/^www\./) && (i = i.substring(4));
              const u = o.default.runtime.connect({ name: "bypass" });
              u.onMessage.addListener(({ response: e }) => {
                if ("fail" === e) {
                  if (!t.querySelector(".incorrectPassword")) {
                    const e = document.createElement("p");
                    e.setAttribute("class", "incorrectPassword"),
                      (e.style.color = "red"),
                      (e.innerHTML = "Incorrect password."),
                      t.insertBefore(e, s);
                  }
                  n.value = "";
                }
                u.disconnect();
              }),
                u.postMessage({ type: "bypass", url: i, pw: r });
            }),
            t.appendChild(s);
        }),
        t.appendChild(e);
      const r = document.querySelector(".content");
      r instanceof Element && r.appendChild(t);
    }
  },
  889: function (t, e, r) {
    "use strict";
    r(888), r(9);
    var n,
      i = r(887);
    ((n = i) && n.__esModule ? n : { default: n }).default.start(),
      chrome.runtime.onMessage.addListener((t, e, r) => {
        "BlockSubFrame" === t.target &&
          ((window.location.href = t.url), r({ success: !0 }));
      });
  },
  9: function (t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var n,
      i = r(44),
      o = (n = i) && n.__esModule ? n : { default: n };
    function s(t) {
      return function (...e) {
        return new o.default((r, n) => {
          e.push((t) => {
            window.chrome.runtime.lastError
              ? n(window.chrome.runtime.lastError.message)
              : r(t);
          }),
            t.apply(this, e);
        });
      };
    }
    !(function t(e) {
      Object.values(e)
        .filter(
          (t) =>
            "object" == typeof t &&
            null !== t &&
            !Object.keys(t).some((t) => /Async$/.test(t))
        )
        .forEach((e) => {
          o.default.promisifyAll(e, { promisifier: s }), t(e);
        });
    })(window.chrome);
    const u = window.chrome;
    (e.default = u), (t.exports = e.default);
  },
}