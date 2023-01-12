!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports._vantaEffect = t() : e._vantaEffect = t()
}("undefined" != typeof self ? self : this, (() => (() => {
    "use strict";
    var e = {
        d: (t, i) => {
            for (var s in i) e.o(i, s) && !e.o(t, s) && Object.defineProperty(t, s, {enumerable: !0, get: i[s]})
        }, o: (e, t) => Object.prototype.hasOwnProperty.call(e, t), r: e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }
    }, t = {};

    function i() {
        return "undefined" != typeof navigator ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600 : null
    }

    e.r(t), e.d(t, {default: () => m}), Number.prototype.clamp = function (e, t) {
        return Math.min(Math.max(this, e), t)
    };
    const s = e => "number" == typeof e ? "#" + ("00000" + e.toString(16)).slice(-6) : e;

    function o(e) {
        for (; e.children && e.children.length > 0;) o(e.children[0]), e.remove(e.children[0]);
        e.geometry && e.geometry.dispose(), e.material && (Object.keys(e.material).forEach((t => {
            e.material[t] && null !== e.material[t] && "function" == typeof e.material[t].dispose && e.material[t].dispose()
        })), e.material.dispose())
    }

    const n = "object" == typeof window;
    let r = n && window.THREE || {};
    n && !window.VANTA && (window.VANTA = {});
    const h = n && window.VANTA || {};
    h.register = (e, t) => h[e] = e => new t(e), h.version = "0.5.24";
    const a = function () {
        return Array.prototype.unshift.call(arguments, "[VANTA]"), console.error.apply(this, arguments)
    };
    h.VantaBase = class {
        constructor(e = {}) {
            if (!n) return !1;
            h.current = this, this.windowMouseMoveWrapper = this.windowMouseMoveWrapper.bind(this), this.windowTouchWrapper = this.windowTouchWrapper.bind(this), this.windowGyroWrapper = this.windowGyroWrapper.bind(this), this.resize = this.resize.bind(this), this.animationLoop = this.animationLoop.bind(this), this.restart = this.restart.bind(this);
            const t = "function" == typeof this.getDefaultOptions ? this.getDefaultOptions() : this.defaultOptions;
            if (this.options = Object.assign({
                mouseControls: !0,
                touchControls: !0,
                gyroControls: !1,
                minHeight: 200,
                minWidth: 200,
                scale: 1,
                scaleMobile: 1
            }, t), (e instanceof HTMLElement || "string" == typeof e) && (e = {el: e}), Object.assign(this.options, e), this.options.THREE && (r = this.options.THREE), this.el = this.options.el, null == this.el) a('Instance needs "el" param!'); else if (!(this.options.el instanceof HTMLElement)) {
                const e = this.el;
                if (this.el = (i = e, document.querySelector(i)), !this.el) return void a("Cannot find element", e)
            }
            var i;
            this.prepareEl(), this.initThree(), this.setSize();
            try {
                this.init()
            } catch (e) {
                return a("Init error", e), this.renderer && this.renderer.domElement && this.el.removeChild(this.renderer.domElement), void (this.options.backgroundColor && (console.log("[VANTA] Falling back to backgroundColor"), this.el.style.background = s(this.options.backgroundColor)))
            }
            this.initMouse(), this.resize(), this.animationLoop();
            const o = window.addEventListener;
            o("resize", this.resize), window.requestAnimationFrame(this.resize), this.options.mouseControls && (o("scroll", this.windowMouseMoveWrapper), o("mousemove", this.windowMouseMoveWrapper)), this.options.touchControls && (o("touchstart", this.windowTouchWrapper), o("touchmove", this.windowTouchWrapper)), this.options.gyroControls && o("deviceorientation", this.windowGyroWrapper)
        }

        setOptions(e = {}) {
            Object.assign(this.options, e), this.triggerMouseMove()
        }

        prepareEl() {
            let e, t;
            if ("undefined" != typeof Node && Node.TEXT_NODE) for (e = 0; e < this.el.childNodes.length; e++) {
                const t = this.el.childNodes[e];
                if (t.nodeType === Node.TEXT_NODE) {
                    const e = document.createElement("span");
                    e.textContent = t.textContent, t.parentElement.insertBefore(e, t), t.remove()
                }
            }
            for (e = 0; e < this.el.children.length; e++) t = this.el.children[e], "static" === getComputedStyle(t).position && (t.style.position = "relative"), "auto" === getComputedStyle(t).zIndex && (t.style.zIndex = 1);
            "static" === getComputedStyle(this.el).position && (this.el.style.position = "relative")
        }

        applyCanvasStyles(e, t = {}) {
            Object.assign(e.style, {
                position: "absolute",
                zIndex: 0,
                top: 0,
                left: 0,
                background: ""
            }), Object.assign(e.style, t), e.classList.add("vanta-canvas")
        }

        initThree() {
            r.WebGLRenderer ? (this.renderer = new r.WebGLRenderer({
                alpha: !0,
                antialias: !0
            }), this.el.appendChild(this.renderer.domElement), this.applyCanvasStyles(this.renderer.domElement), isNaN(this.options.backgroundAlpha) && (this.options.backgroundAlpha = 1), this.scene = new r.Scene) : console.warn("[VANTA] No THREE defined on window")
        }

        getCanvasElement() {
            return this.renderer ? this.renderer.domElement : this.p5renderer ? this.p5renderer.canvas : void 0
        }

        getCanvasRect() {
            const e = this.getCanvasElement();
            return !!e && e.getBoundingClientRect()
        }

        windowMouseMoveWrapper(e) {
            const t = this.getCanvasRect();
            if (!t) return !1;
            const i = e.clientX - t.left, s = e.clientY - t.top;
            i >= 0 && s >= 0 && i <= t.width && s <= t.height && (this.mouseX = i, this.mouseY = s, this.options.mouseEase || this.triggerMouseMove(i, s))
        }

        windowTouchWrapper(e) {
            const t = this.getCanvasRect();
            if (!t) return !1;
            if (1 === e.touches.length) {
                const i = e.touches[0].clientX - t.left, s = e.touches[0].clientY - t.top;
                i >= 0 && s >= 0 && i <= t.width && s <= t.height && (this.mouseX = i, this.mouseY = s, this.options.mouseEase || this.triggerMouseMove(i, s))
            }
        }

        windowGyroWrapper(e) {
            const t = this.getCanvasRect();
            if (!t) return !1;
            const i = Math.round(2 * e.alpha) - t.left, s = Math.round(2 * e.beta) - t.top;
            i >= 0 && s >= 0 && i <= t.width && s <= t.height && (this.mouseX = i, this.mouseY = s, this.options.mouseEase || this.triggerMouseMove(i, s))
        }

        triggerMouseMove(e, t) {
            void 0 === e && void 0 === t && (this.options.mouseEase ? (e = this.mouseEaseX, t = this.mouseEaseY) : (e = this.mouseX, t = this.mouseY)), this.uniforms && (this.uniforms.iMouse.value.x = e / this.scale, this.uniforms.iMouse.value.y = t / this.scale);
            const i = e / this.width, s = t / this.height;
            "function" == typeof this.onMouseMove && this.onMouseMove(i, s)
        }

        setSize() {
            this.scale || (this.scale = 1), i() && this.options.scaleMobile ? this.scale = this.options.scaleMobile : this.options.scale && (this.scale = this.options.scale), this.width = Math.max(this.el.offsetWidth, this.options.minWidth), this.height = Math.max(this.el.offsetHeight, this.options.minHeight)
        }

        initMouse() {
            (!this.mouseX && !this.mouseY || this.mouseX === this.options.minWidth / 2 && this.mouseY === this.options.minHeight / 2) && (this.mouseX = this.width / 2, this.mouseY = this.height / 2, this.triggerMouseMove(this.mouseX, this.mouseY))
        }

        resize() {
            this.setSize(), this.camera && (this.camera.aspect = this.width / this.height, "function" == typeof this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix()), this.renderer && (this.renderer.setSize(this.width, this.height), this.renderer.setPixelRatio(window.devicePixelRatio / this.scale)), "function" == typeof this.onResize && this.onResize()
        }

        isOnScreen() {
            const e = this.el.offsetHeight, t = this.el.getBoundingClientRect(),
                i = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop,
                s = t.top + i;
            return s - window.innerHeight <= i && i <= s + e
        }

        animationLoop() {
            this.t || (this.t = 0), this.t2 || (this.t2 = 0);
            const e = performance.now();
            if (this.prevNow) {
                let t = (e - this.prevNow) / (1e3 / 60);
                t = Math.max(.2, Math.min(t, 5)), this.t += t, this.t2 += (this.options.speed || 1) * t, this.uniforms && (this.uniforms.iTime.value = .016667 * this.t2)
            }
            return this.prevNow = e, this.options.mouseEase && (this.mouseEaseX = this.mouseEaseX || this.mouseX || 0, this.mouseEaseY = this.mouseEaseY || this.mouseY || 0, Math.abs(this.mouseEaseX - this.mouseX) + Math.abs(this.mouseEaseY - this.mouseY) > .1 && (this.mouseEaseX += .05 * (this.mouseX - this.mouseEaseX), this.mouseEaseY += .05 * (this.mouseY - this.mouseEaseY), this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY))), (this.isOnScreen() || this.options.forceAnimate) && ("function" == typeof this.onUpdate && this.onUpdate(), this.scene && this.camera && (this.renderer.render(this.scene, this.camera), this.renderer.setClearColor(this.options.backgroundColor, this.options.backgroundAlpha)), this.fps && this.fps.update && this.fps.update(), "function" == typeof this.afterRender && this.afterRender()), this.req = window.requestAnimationFrame(this.animationLoop)
        }

        restart() {
            if (this.scene) for (; this.scene.children.length;) this.scene.remove(this.scene.children[0]);
            "function" == typeof this.onRestart && this.onRestart(), this.init()
        }

        init() {
            "function" == typeof this.onInit && this.onInit()
        }

        destroy() {
            "function" == typeof this.onDestroy && this.onDestroy();
            const e = window.removeEventListener;
            e("touchstart", this.windowTouchWrapper), e("touchmove", this.windowTouchWrapper), e("scroll", this.windowMouseMoveWrapper), e("mousemove", this.windowMouseMoveWrapper), e("deviceorientation", this.windowGyroWrapper), e("resize", this.resize), window.cancelAnimationFrame(this.req);
            const t = this.scene;
            t && t.children && o(t), this.renderer && (this.renderer.domElement && this.el.removeChild(this.renderer.domElement), this.renderer = null, this.scene = null), h.current === this && (h.current = null)
        }
    };
    const p = h.VantaBase;
    let c = "object" == typeof window && window.p5;

    class d extends p {
        constructor(e) {
            c = e.p5 || c, super(e), this.mode = "p5"
        }

        initP5(e) {
            const t = this, i = e.createCanvas(t.width, t.height);
            i.parent(t.el), t.applyCanvasStyles(e.canvas, {background: s(t.options.backgroundColor)}), t.p5renderer = i, t.p5canvas = e.canvas, t.p5 = e
        }

        restart() {
            this.p5 && "object" == typeof this.p5 && this.p5.remove(), super.restart()
        }

        destroy() {
            this.p5 && "object" == typeof this.p5 && this.p5.remove(), super.destroy()
        }

        resize() {
            super.resize(), this.p5 && this.p5.resizeCanvas && this.p5.resizeCanvas(this.width, this.height)
        }
    }

    let l = "object" == typeof window && window.p5;

    class u extends d {
        static initClass() {
            this.prototype.p5 = !0, this.prototype.defaultOptions = {
                color: 9979487,
                backgroundColor: 2237478,
                spacing: 0,
                chaos: 1
            }
        }

        constructor(e) {
            l = e.p5 || l, super(e)
        }

        onInit() {
            const e = this;
            this.p5 = new l((function (t) {
                let o = i() ? 35 : 55, n = t.random(1e4), r = t.random(1e4), h = t.random(1e4);

                function a(e, i, s) {
                    let o = e % t.TWO_PI;
                    return o < 0 && (o += t.TWO_PI), t.noise(n + t.cos(o) * i, r + t.sin(o) * i, h + s)
                }

                t.setup = function () {
                    e.initP5(t), t.strokeWeight(1), t.stroke(s(e.options.color)), t.smooth(), t.noFill()
                }, t.draw = function () {
                    t.clear(), t.translate(t.width / 2, t.height / 2), function () {
                        r -= .02, h += 5e-5;
                        for (let i = 0; i < o; i++) {
                            t.beginShape();
                            for (let s = 0; s < 360; s++) {
                                let o = t.radians(s),
                                    n = 20 * e.options.chaos * a(o, .12 * i + .2, h) + (4 * i + 50) + (i * e.options.spacing || 0);
                                t.vertex(n * t.cos(o), n * t.sin(o))
                            }
                            t.endShape(t.CLOSE)
                        }
                    }()
                }
            }))
        }
    }

    u.initClass();
    const m = h.register("TRUNK", u);
    return t
})()));