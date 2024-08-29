/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
!(function (a, b) {
	'use strict';
	var c = {},
		d = a.document,
		e = (a.GreenSockGlobals = a.GreenSockGlobals || a),
		f = e[b];
	if (f) return 'undefined' != typeof module && module.exports && (module.exports = f), f;
	var g,
		h,
		i,
		j,
		k,
		l = function (a) {
			var b,
				c = a.split('.'),
				d = e;
			for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
			return d;
		},
		m = l('com.greensock'),
		n = 1e-10,
		o = function (a) {
			var b,
				c = [],
				d = a.length;
			for (b = 0; b !== d; c.push(a[b++]));
			return c;
		},
		p = function () {},
		q = (function () {
			var a = Object.prototype.toString,
				b = a.call([]);
			return function (c) {
				return (
					null != c && (c instanceof Array || ('object' == typeof c && !!c.push && a.call(c) === b))
				);
			};
		})(),
		r = {},
		s = function (d, f, g, h) {
			(this.sc = r[d] ? r[d].sc : []), (r[d] = this), (this.gsClass = null), (this.func = g);
			var i = [];
			(this.check = function (j) {
				for (var k, m, n, o, p = f.length, q = p; --p > -1; )
					(k = r[f[p]] || new s(f[p], [])).gsClass
						? ((i[p] = k.gsClass), q--)
						: j && k.sc.push(this);
				if (0 === q && g) {
					if (
						((m = ('com.greensock.' + d).split('.')),
						(n = m.pop()),
						(o = l(m.join('.'))[n] = this.gsClass = g.apply(g, i)),
						h)
					)
						if (((e[n] = c[n] = o), 'undefined' != typeof module && module.exports))
							if (d === b) {
								module.exports = c[b] = o;
								for (p in c) o[p] = c[p];
							} else c[b] && (c[b][n] = o);
						else
							'function' == typeof define &&
								define.amd &&
								define(
									(a.GreenSockAMDPath ? a.GreenSockAMDPath + '/' : '') + d.split('.').pop(),
									[],
									function () {
										return o;
									}
								);
					for (p = 0; p < this.sc.length; p++) this.sc[p].check();
				}
			}),
				this.check(!0);
		},
		t = (a._gsDefine = function (a, b, c, d) {
			return new s(a, b, c, d);
		}),
		u = (m._class = function (a, b, c) {
			return (
				(b = b || function () {}),
				t(
					a,
					[],
					function () {
						return b;
					},
					c
				),
				b
			);
		});
	t.globals = e;
	var v = [0, 0, 1, 1],
		w = u(
			'easing.Ease',
			function (a, b, c, d) {
				(this._func = a),
					(this._type = c || 0),
					(this._power = d || 0),
					(this._params = b ? v.concat(b) : v);
			},
			!0
		),
		x = (w.map = {}),
		y = (w.register = function (a, b, c, d) {
			for (
				var e,
					f,
					g,
					h,
					i = b.split(','),
					j = i.length,
					k = (c || 'easeIn,easeOut,easeInOut').split(',');
				--j > -1;

			)
				for (
					f = i[j], e = d ? u('easing.' + f, null, !0) : m.easing[f] || {}, g = k.length;
					--g > -1;

				)
					(h = k[g]), (x[f + '.' + h] = x[h + f] = e[h] = a.getRatio ? a : a[h] || new a());
		});
	for (
		i = w.prototype,
			i._calcEnd = !1,
			i.getRatio = function (a) {
				if (this._func) return (this._params[0] = a), this._func.apply(null, this._params);
				var b = this._type,
					c = this._power,
					d = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
				return (
					1 === c
						? (d *= d)
						: 2 === c
						? (d *= d * d)
						: 3 === c
						? (d *= d * d * d)
						: 4 === c && (d *= d * d * d * d),
					1 === b ? 1 - d : 2 === b ? d : 0.5 > a ? d / 2 : 1 - d / 2
				);
			},
			g = ['Linear', 'Quad', 'Cubic', 'Quart', 'Quint,Strong'],
			h = g.length;
		--h > -1;

	)
		(i = g[h] + ',Power' + h),
			y(new w(null, null, 1, h), i, 'easeOut', !0),
			y(new w(null, null, 2, h), i, 'easeIn' + (0 === h ? ',easeNone' : '')),
			y(new w(null, null, 3, h), i, 'easeInOut');
	(x.linear = m.easing.Linear.easeIn), (x.swing = m.easing.Quad.easeInOut);
	var z = u('events.EventDispatcher', function (a) {
		(this._listeners = {}), (this._eventTarget = a || this);
	});
	(i = z.prototype),
		(i.addEventListener = function (a, b, c, d, e) {
			e = e || 0;
			var f,
				g,
				h = this._listeners[a],
				i = 0;
			for (
				this !== j || k || j.wake(), null == h && (this._listeners[a] = h = []), g = h.length;
				--g > -1;

			)
				(f = h[g]), f.c === b && f.s === c ? h.splice(g, 1) : 0 === i && f.pr < e && (i = g + 1);
			h.splice(i, 0, { c: b, s: c, up: d, pr: e });
		}),
		(i.removeEventListener = function (a, b) {
			var c,
				d = this._listeners[a];
			if (d) for (c = d.length; --c > -1; ) if (d[c].c === b) return void d.splice(c, 1);
		}),
		(i.dispatchEvent = function (a) {
			var b,
				c,
				d,
				e = this._listeners[a];
			if (e)
				for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1; )
					(d = e[b]), d && (d.up ? d.c.call(d.s || c, { type: a, target: c }) : d.c.call(d.s || c));
		});
	var A = a.requestAnimationFrame,
		B = a.cancelAnimationFrame,
		C =
			Date.now ||
			function () {
				return new Date().getTime();
			},
		D = C();
	for (g = ['ms', 'moz', 'webkit', 'o'], h = g.length; --h > -1 && !A; )
		(A = a[g[h] + 'RequestAnimationFrame']),
			(B = a[g[h] + 'CancelAnimationFrame'] || a[g[h] + 'CancelRequestAnimationFrame']);
	u('Ticker', function (a, b) {
		var c,
			e,
			f,
			g,
			h,
			i = this,
			l = C(),
			m = b !== !1 && A ? 'auto' : !1,
			o = 500,
			q = 33,
			r = 'tick',
			s = function (a) {
				var b,
					d,
					j = C() - D;
				j > o && (l += j - q),
					(D += j),
					(i.time = (D - l) / 1e3),
					(b = i.time - h),
					(!c || b > 0 || a === !0) && (i.frame++, (h += b + (b >= g ? 0.004 : g - b)), (d = !0)),
					a !== !0 && (f = e(s)),
					d && i.dispatchEvent(r);
			};
		z.call(i),
			(i.time = i.frame = 0),
			(i.tick = function () {
				s(!0);
			}),
			(i.lagSmoothing = function (a, b) {
				return arguments.length ? ((o = a || 1 / n), void (q = Math.min(b, o, 0))) : 1 / n > o;
			}),
			(i.sleep = function () {
				null != f && (m && B ? B(f) : clearTimeout(f), (e = p), (f = null), i === j && (k = !1));
			}),
			(i.wake = function (a) {
				null !== f ? i.sleep() : a ? (l += -D + (D = C())) : i.frame > 10 && (D = C() - o + 5),
					(e =
						0 === c
							? p
							: m && A
							? A
							: function (a) {
									return setTimeout(a, (1e3 * (h - i.time) + 1) | 0);
							  }),
					i === j && (k = !0),
					s(2);
			}),
			(i.fps = function (a) {
				return arguments.length
					? ((c = a), (g = 1 / (c || 60)), (h = this.time + g), void i.wake())
					: c;
			}),
			(i.useRAF = function (a) {
				return arguments.length ? (i.sleep(), (m = a), void i.fps(c)) : m;
			}),
			i.fps(a),
			setTimeout(function () {
				'auto' === m && i.frame < 5 && 'hidden' !== (d || {}).visibilityState && i.useRAF(!1);
			}, 1500);
	}),
		(i = m.Ticker.prototype = new m.events.EventDispatcher()),
		(i.constructor = m.Ticker);
	var E = u('core.Animation', function (a, b) {
		if (
			((this.vars = b = b || {}),
			(this._duration = this._totalDuration = a || 0),
			(this._delay = Number(b.delay) || 0),
			(this._timeScale = 1),
			(this._active = b.immediateRender === !0),
			(this.data = b.data),
			(this._reversed = b.reversed === !0),
			Y)
		) {
			k || j.wake();
			var c = this.vars.useFrames ? X : Y;
			c.add(this, c._time), this.vars.paused && this.paused(!0);
		}
	});
	(j = E.ticker = new m.Ticker()),
		(i = E.prototype),
		(i._dirty = i._gc = i._initted = i._paused = !1),
		(i._totalTime = i._time = 0),
		(i._rawPrevTime = -1),
		(i._next = i._last = i._onUpdate = i._timeline = i.timeline = null),
		(i._paused = !1);
	var F = function () {
		k && C() - D > 2e3 && ('hidden' !== (d || {}).visibilityState || !j.lagSmoothing()) && j.wake();
		var a = setTimeout(F, 2e3);
		a.unref && a.unref();
	};
	F(),
		(i.play = function (a, b) {
			return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
		}),
		(i.pause = function (a, b) {
			return null != a && this.seek(a, b), this.paused(!0);
		}),
		(i.resume = function (a, b) {
			return null != a && this.seek(a, b), this.paused(!1);
		}),
		(i.seek = function (a, b) {
			return this.totalTime(Number(a), b !== !1);
		}),
		(i.restart = function (a, b) {
			return this.reversed(!1)
				.paused(!1)
				.totalTime(a ? -this._delay : 0, b !== !1, !0);
		}),
		(i.reverse = function (a, b) {
			return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1);
		}),
		(i.render = function (a, b, c) {}),
		(i.invalidate = function () {
			return (
				(this._time = this._totalTime = 0),
				(this._initted = this._gc = !1),
				(this._rawPrevTime = -1),
				(this._gc || !this.timeline) && this._enabled(!0),
				this
			);
		}),
		(i.isActive = function () {
			var a,
				b = this._timeline,
				c = this._startTime;
			return (
				!b ||
				(!this._gc &&
					!this._paused &&
					b.isActive() &&
					(a = b.rawTime(!0)) >= c &&
					a < c + this.totalDuration() / this._timeScale - 1e-7)
			);
		}),
		(i._enabled = function (a, b) {
			return (
				k || j.wake(),
				(this._gc = !a),
				(this._active = this.isActive()),
				b !== !0 &&
					(a && !this.timeline
						? this._timeline.add(this, this._startTime - this._delay)
						: !a && this.timeline && this._timeline._remove(this, !0)),
				!1
			);
		}),
		(i._kill = function (a, b) {
			return this._enabled(!1, !1);
		}),
		(i.kill = function (a, b) {
			return this._kill(a, b), this;
		}),
		(i._uncache = function (a) {
			for (var b = a ? this : this.timeline; b; ) (b._dirty = !0), (b = b.timeline);
			return this;
		}),
		(i._swapSelfInParams = function (a) {
			for (var b = a.length, c = a.concat(); --b > -1; ) '{self}' === a[b] && (c[b] = this);
			return c;
		}),
		(i._callback = function (a) {
			var b = this.vars,
				c = b[a],
				d = b[a + 'Params'],
				e = b[a + 'Scope'] || b.callbackScope || this,
				f = d ? d.length : 0;
			switch (f) {
				case 0:
					c.call(e);
					break;
				case 1:
					c.call(e, d[0]);
					break;
				case 2:
					c.call(e, d[0], d[1]);
					break;
				default:
					c.apply(e, d);
			}
		}),
		(i.eventCallback = function (a, b, c, d) {
			if ('on' === (a || '').substr(0, 2)) {
				var e = this.vars;
				if (1 === arguments.length) return e[a];
				null == b
					? delete e[a]
					: ((e[a] = b),
					  (e[a + 'Params'] =
							q(c) && -1 !== c.join('').indexOf('{self}') ? this._swapSelfInParams(c) : c),
					  (e[a + 'Scope'] = d)),
					'onUpdate' === a && (this._onUpdate = b);
			}
			return this;
		}),
		(i.delay = function (a) {
			return arguments.length
				? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay),
				  (this._delay = a),
				  this)
				: this._delay;
		}),
		(i.duration = function (a) {
			return arguments.length
				? ((this._duration = this._totalDuration = a),
				  this._uncache(!0),
				  this._timeline.smoothChildTiming &&
						this._time > 0 &&
						this._time < this._duration &&
						0 !== a &&
						this.totalTime(this._totalTime * (a / this._duration), !0),
				  this)
				: ((this._dirty = !1), this._duration);
		}),
		(i.totalDuration = function (a) {
			return (this._dirty = !1), arguments.length ? this.duration(a) : this._totalDuration;
		}),
		(i.time = function (a, b) {
			return arguments.length
				? (this._dirty && this.totalDuration(),
				  this.totalTime(a > this._duration ? this._duration : a, b))
				: this._time;
		}),
		(i.totalTime = function (a, b, c) {
			if ((k || j.wake(), !arguments.length)) return this._totalTime;
			if (this._timeline) {
				if ((0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming)) {
					this._dirty && this.totalDuration();
					var d = this._totalDuration,
						e = this._timeline;
					if (
						(a > d && !c && (a = d),
						(this._startTime =
							(this._paused ? this._pauseTime : e._time) -
							(this._reversed ? d - a : a) / this._timeScale),
						e._dirty || this._uncache(!1),
						e._timeline)
					)
						for (; e._timeline; )
							e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale &&
								e.totalTime(e._totalTime, !0),
								(e = e._timeline);
				}
				this._gc && this._enabled(!0, !1),
					(this._totalTime !== a || 0 === this._duration) &&
						(K.length && $(), this.render(a, b, !1), K.length && $());
			}
			return this;
		}),
		(i.progress = i.totalProgress =
			function (a, b) {
				var c = this.duration();
				return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio;
			}),
		(i.startTime = function (a) {
			return arguments.length
				? (a !== this._startTime &&
						((this._startTime = a),
						this.timeline &&
							this.timeline._sortChildren &&
							this.timeline.add(this, a - this._delay)),
				  this)
				: this._startTime;
		}),
		(i.endTime = function (a) {
			return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale;
		}),
		(i.timeScale = function (a) {
			if (!arguments.length) return this._timeScale;
			var b, c;
			for (
				a = a || n,
					this._timeline &&
						this._timeline.smoothChildTiming &&
						((b = this._pauseTime),
						(c = b || 0 === b ? b : this._timeline.totalTime()),
						(this._startTime = c - ((c - this._startTime) * this._timeScale) / a)),
					this._timeScale = a,
					c = this.timeline;
				c && c.timeline;

			)
				(c._dirty = !0), c.totalDuration(), (c = c.timeline);
			return this;
		}),
		(i.reversed = function (a) {
			return arguments.length
				? (a != this._reversed &&
						((this._reversed = a),
						this.totalTime(
							this._timeline && !this._timeline.smoothChildTiming
								? this.totalDuration() - this._totalTime
								: this._totalTime,
							!0
						)),
				  this)
				: this._reversed;
		}),
		(i.paused = function (a) {
			if (!arguments.length) return this._paused;
			var b,
				c,
				d = this._timeline;
			return (
				a != this._paused &&
					d &&
					(k || a || j.wake(),
					(b = d.rawTime()),
					(c = b - this._pauseTime),
					!a && d.smoothChildTiming && ((this._startTime += c), this._uncache(!1)),
					(this._pauseTime = a ? b : null),
					(this._paused = a),
					(this._active = this.isActive()),
					!a &&
						0 !== c &&
						this._initted &&
						this.duration() &&
						((b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale),
						this.render(b, b === this._totalTime, !0))),
				this._gc && !a && this._enabled(!0, !1),
				this
			);
		});
	var G = u('core.SimpleTimeline', function (a) {
		E.call(this, 0, a), (this.autoRemoveChildren = this.smoothChildTiming = !0);
	});
	(i = G.prototype = new E()),
		(i.constructor = G),
		(i.kill()._gc = !1),
		(i._first = i._last = i._recent = null),
		(i._sortChildren = !1),
		(i.add = i.insert =
			function (a, b, c, d) {
				var e, f;
				if (
					((a._startTime = Number(b || 0) + a._delay),
					a._paused &&
						this !== a._timeline &&
						(a._pauseTime = this.rawTime() - (a._timeline.rawTime() - a._pauseTime)),
					a.timeline && a.timeline._remove(a, !0),
					(a.timeline = a._timeline = this),
					a._gc && a._enabled(!0, !0),
					(e = this._last),
					this._sortChildren)
				)
					for (f = a._startTime; e && e._startTime > f; ) e = e._prev;
				return (
					e ? ((a._next = e._next), (e._next = a)) : ((a._next = this._first), (this._first = a)),
					a._next ? (a._next._prev = a) : (this._last = a),
					(a._prev = e),
					(this._recent = a),
					this._timeline && this._uncache(!0),
					this
				);
			}),
		(i._remove = function (a, b) {
			return (
				a.timeline === this &&
					(b || a._enabled(!1, !0),
					a._prev ? (a._prev._next = a._next) : this._first === a && (this._first = a._next),
					a._next ? (a._next._prev = a._prev) : this._last === a && (this._last = a._prev),
					(a._next = a._prev = a.timeline = null),
					a === this._recent && (this._recent = this._last),
					this._timeline && this._uncache(!0)),
				this
			);
		}),
		(i.render = function (a, b, c) {
			var d,
				e = this._first;
			for (this._totalTime = this._time = this._rawPrevTime = a; e; )
				(d = e._next),
					(e._active || (a >= e._startTime && !e._paused && !e._gc)) &&
						(e._reversed
							? e.render(
									(e._dirty ? e.totalDuration() : e._totalDuration) -
										(a - e._startTime) * e._timeScale,
									b,
									c
							  )
							: e.render((a - e._startTime) * e._timeScale, b, c)),
					(e = d);
		}),
		(i.rawTime = function () {
			return k || j.wake(), this._totalTime;
		});
	var H = u(
			'TweenLite',
			function (b, c, d) {
				if ((E.call(this, c, d), (this.render = H.prototype.render), null == b))
					throw 'Cannot tween a null target.';
				this.target = b = 'string' != typeof b ? b : H.selector(b) || b;
				var e,
					f,
					g,
					h =
						b.jquery ||
						(b.length &&
							b !== a &&
							b[0] &&
							(b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))),
					i = this.vars.overwrite;
				if (
					((this._overwrite = i =
						null == i ? W[H.defaultOverwrite] : 'number' == typeof i ? i >> 0 : W[i]),
					(h || b instanceof Array || (b.push && q(b))) && 'number' != typeof b[0])
				)
					for (
						this._targets = g = o(b), this._propLookup = [], this._siblings = [], e = 0;
						e < g.length;
						e++
					)
						(f = g[e]),
							f
								? 'string' != typeof f
									? f.length &&
									  f !== a &&
									  f[0] &&
									  (f[0] === a || (f[0].nodeType && f[0].style && !f.nodeType))
										? (g.splice(e--, 1), (this._targets = g = g.concat(o(f))))
										: ((this._siblings[e] = _(f, this, !1)),
										  1 === i &&
												this._siblings[e].length > 1 &&
												ba(f, this, null, 1, this._siblings[e]))
									: ((f = g[e--] = H.selector(f)), 'string' == typeof f && g.splice(e + 1, 1))
								: g.splice(e--, 1);
				else
					(this._propLookup = {}),
						(this._siblings = _(b, this, !1)),
						1 === i && this._siblings.length > 1 && ba(b, this, null, 1, this._siblings);
				(this.vars.immediateRender ||
					(0 === c && 0 === this._delay && this.vars.immediateRender !== !1)) &&
					((this._time = -n), this.render(Math.min(0, -this._delay)));
			},
			!0
		),
		I = function (b) {
			return (
				b &&
				b.length &&
				b !== a &&
				b[0] &&
				(b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))
			);
		},
		J = function (a, b) {
			var c,
				d = {};
			for (c in a)
				V[c] ||
					(c in b &&
						'transform' !== c &&
						'x' !== c &&
						'y' !== c &&
						'width' !== c &&
						'height' !== c &&
						'className' !== c &&
						'border' !== c) ||
					!(!S[c] || (S[c] && S[c]._autoCSS)) ||
					((d[c] = a[c]), delete a[c]);
			a.css = d;
		};
	(i = H.prototype = new E()),
		(i.constructor = H),
		(i.kill()._gc = !1),
		(i.ratio = 0),
		(i._firstPT = i._targets = i._overwrittenProps = i._startAt = null),
		(i._notifyPluginsOfEnabled = i._lazy = !1),
		(H.version = '2.0.2'),
		(H.defaultEase = i._ease = new w(null, null, 1, 1)),
		(H.defaultOverwrite = 'auto'),
		(H.ticker = j),
		(H.autoSleep = 120),
		(H.lagSmoothing = function (a, b) {
			j.lagSmoothing(a, b);
		}),
		(H.selector =
			a.$ ||
			a.jQuery ||
			function (b) {
				var c = a.$ || a.jQuery;
				return c
					? ((H.selector = c), c(b))
					: (d || (d = a.document),
					  d
							? d.querySelectorAll
								? d.querySelectorAll(b)
								: d.getElementById('#' === b.charAt(0) ? b.substr(1) : b)
							: b);
			});
	var K = [],
		L = {},
		M = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
		N = /[\+-]=-?[\.\d]/,
		O = function (a) {
			for (var b, c = this._firstPT, d = 1e-6; c; )
				(b = c.blob
					? 1 === a && null != this.end
						? this.end
						: a
						? this.join('')
						: this.start
					: c.c * a + c.s),
					c.m
						? (b = c.m.call(this._tween, b, this._target || c.t, this._tween))
						: d > b && b > -d && !c.blob && (b = 0),
					c.f ? (c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b)) : (c.t[c.p] = b),
					(c = c._next);
		},
		P = function (a, b, c, d) {
			var e,
				f,
				g,
				h,
				i,
				j,
				k,
				l = [],
				m = 0,
				n = '',
				o = 0;
			for (
				l.start = a,
					l.end = b,
					a = l[0] = a + '',
					b = l[1] = b + '',
					c && (c(l), (a = l[0]), (b = l[1])),
					l.length = 0,
					e = a.match(M) || [],
					f = b.match(M) || [],
					d && ((d._next = null), (d.blob = 1), (l._firstPT = l._applyPT = d)),
					i = f.length,
					h = 0;
				i > h;
				h++
			)
				(k = f[h]),
					(j = b.substr(m, b.indexOf(k, m) - m)),
					(n += j || !h ? j : ','),
					(m += j.length),
					o ? (o = (o + 1) % 5) : 'rgba(' === j.substr(-5) && (o = 1),
					k === e[h] || e.length <= h
						? (n += k)
						: (n && (l.push(n), (n = '')),
						  (g = parseFloat(e[h])),
						  l.push(g),
						  (l._firstPT = {
								_next: l._firstPT,
								t: l,
								p: l.length - 1,
								s: g,
								c:
									('=' === k.charAt(1)
										? parseInt(k.charAt(0) + '1', 10) * parseFloat(k.substr(2))
										: parseFloat(k) - g) || 0,
								f: 0,
								m: o && 4 > o ? Math.round : 0
						  })),
					(m += k.length);
			return (n += b.substr(m)), n && l.push(n), (l.setRatio = O), N.test(b) && (l.end = null), l;
		},
		Q = function (a, b, c, d, e, f, g, h, i) {
			'function' == typeof d && (d = d(i || 0, a));
			var j,
				k = typeof a[b],
				l =
					'function' !== k
						? ''
						: b.indexOf('set') || 'function' != typeof a['get' + b.substr(3)]
						? b
						: 'get' + b.substr(3),
				m = 'get' !== c ? c : l ? (g ? a[l](g) : a[l]()) : a[b],
				n = 'string' == typeof d && '=' === d.charAt(1),
				o = {
					t: a,
					p: b,
					s: m,
					f: 'function' === k,
					pg: 0,
					n: e || b,
					m: f ? ('function' == typeof f ? f : Math.round) : 0,
					pr: 0,
					c: n ? parseInt(d.charAt(0) + '1', 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
				};
			return (
				('number' != typeof m || ('number' != typeof d && !n)) &&
					(g || isNaN(m) || (!n && isNaN(d)) || 'boolean' == typeof m || 'boolean' == typeof d
						? ((o.fp = g),
						  (j = P(
								m,
								n ? parseFloat(o.s) + o.c + (o.s + '').replace(/[0-9\-\.]/g, '') : d,
								h || H.defaultStringFilter,
								o
						  )),
						  (o = { t: j, p: 'setRatio', s: 0, c: 1, f: 2, pg: 0, n: e || b, pr: 0, m: 0 }))
						: ((o.s = parseFloat(m)), n || (o.c = parseFloat(d) - o.s || 0))),
				o.c ? ((o._next = this._firstPT) && (o._next._prev = o), (this._firstPT = o), o) : void 0
			);
		},
		R = (H._internals = { isArray: q, isSelector: I, lazyTweens: K, blobDif: P }),
		S = (H._plugins = {}),
		T = (R.tweenLookup = {}),
		U = 0,
		V = (R.reservedProps = {
			ease: 1,
			delay: 1,
			overwrite: 1,
			onComplete: 1,
			onCompleteParams: 1,
			onCompleteScope: 1,
			useFrames: 1,
			runBackwards: 1,
			startAt: 1,
			onUpdate: 1,
			onUpdateParams: 1,
			onUpdateScope: 1,
			onStart: 1,
			onStartParams: 1,
			onStartScope: 1,
			onReverseComplete: 1,
			onReverseCompleteParams: 1,
			onReverseCompleteScope: 1,
			onRepeat: 1,
			onRepeatParams: 1,
			onRepeatScope: 1,
			easeParams: 1,
			yoyo: 1,
			immediateRender: 1,
			repeat: 1,
			repeatDelay: 1,
			data: 1,
			paused: 1,
			reversed: 1,
			autoCSS: 1,
			lazy: 1,
			onOverwrite: 1,
			callbackScope: 1,
			stringFilter: 1,
			id: 1,
			yoyoEase: 1
		}),
		W = {
			none: 0,
			all: 1,
			auto: 2,
			concurrent: 3,
			allOnStart: 4,
			preexisting: 5,
			true: 1,
			false: 0
		},
		X = (E._rootFramesTimeline = new G()),
		Y = (E._rootTimeline = new G()),
		Z = 30,
		$ = (R.lazyRender = function () {
			var a,
				b = K.length;
			for (L = {}; --b > -1; )
				(a = K[b]), a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), (a._lazy = !1));
			K.length = 0;
		});
	(Y._startTime = j.time),
		(X._startTime = j.frame),
		(Y._active = X._active = !0),
		setTimeout($, 1),
		(E._updateRoot = H.render =
			function () {
				var a, b, c;
				if (
					(K.length && $(),
					Y.render((j.time - Y._startTime) * Y._timeScale, !1, !1),
					X.render((j.frame - X._startTime) * X._timeScale, !1, !1),
					K.length && $(),
					j.frame >= Z)
				) {
					Z = j.frame + (parseInt(H.autoSleep, 10) || 120);
					for (c in T) {
						for (b = T[c].tweens, a = b.length; --a > -1; ) b[a]._gc && b.splice(a, 1);
						0 === b.length && delete T[c];
					}
					if (
						((c = Y._first),
						(!c || c._paused) && H.autoSleep && !X._first && 1 === j._listeners.tick.length)
					) {
						for (; c && c._paused; ) c = c._next;
						c || j.sleep();
					}
				}
			}),
		j.addEventListener('tick', E._updateRoot);
	var _ = function (a, b, c) {
			var d,
				e,
				f = a._gsTweenID;
			if (
				(T[f || (a._gsTweenID = f = 't' + U++)] || (T[f] = { target: a, tweens: [] }),
				b && ((d = T[f].tweens), (d[(e = d.length)] = b), c))
			)
				for (; --e > -1; ) d[e] === b && d.splice(e, 1);
			return T[f].tweens;
		},
		aa = function (a, b, c, d) {
			var e,
				f,
				g = a.vars.onOverwrite;
			return (
				g && (e = g(a, b, c, d)),
				(g = H.onOverwrite),
				g && (f = g(a, b, c, d)),
				e !== !1 && f !== !1
			);
		},
		ba = function (a, b, c, d, e) {
			var f, g, h, i;
			if (1 === d || d >= 4) {
				for (i = e.length, f = 0; i > f; f++)
					if ((h = e[f]) !== b) h._gc || (h._kill(null, a, b) && (g = !0));
					else if (5 === d) break;
				return g;
			}
			var j,
				k = b._startTime + n,
				l = [],
				m = 0,
				o = 0 === b._duration;
			for (f = e.length; --f > -1; )
				(h = e[f]) === b ||
					h._gc ||
					h._paused ||
					(h._timeline !== b._timeline
						? ((j = j || ca(b, 0, o)), 0 === ca(h, j, o) && (l[m++] = h))
						: h._startTime <= k &&
						  h._startTime + h.totalDuration() / h._timeScale > k &&
						  (((o || !h._initted) && k - h._startTime <= 2e-10) || (l[m++] = h)));
			for (f = m; --f > -1; )
				if (
					((h = l[f]),
					(i = h._firstPT),
					2 === d && h._kill(c, a, b) && (g = !0),
					2 !== d || (!h._firstPT && h._initted && i))
				) {
					if (2 !== d && !aa(h, b)) continue;
					h._enabled(!1, !1) && (g = !0);
				}
			return g;
		},
		ca = function (a, b, c) {
			for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline; ) {
				if (((f += d._startTime), (e *= d._timeScale), d._paused)) return -100;
				d = d._timeline;
			}
			return (
				(f /= e),
				f > b
					? f - b
					: (c && f === b) || (!a._initted && 2 * n > f - b)
					? n
					: (f += a.totalDuration() / a._timeScale / e) > b + n
					? 0
					: f - b - n
			);
		};
	(i._init = function () {
		var a,
			b,
			c,
			d,
			e,
			f,
			g = this.vars,
			h = this._overwrittenProps,
			i = this._duration,
			j = !!g.immediateRender,
			k = g.ease;
		if (g.startAt) {
			this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), (e = {});
			for (d in g.startAt) e[d] = g.startAt[d];
			if (
				((e.data = 'isStart'),
				(e.overwrite = !1),
				(e.immediateRender = !0),
				(e.lazy = j && g.lazy !== !1),
				(e.startAt = e.delay = null),
				(e.onUpdate = g.onUpdate),
				(e.onUpdateParams = g.onUpdateParams),
				(e.onUpdateScope = g.onUpdateScope || g.callbackScope || this),
				(this._startAt = H.to(this.target || {}, 0, e)),
				j)
			)
				if (this._time > 0) this._startAt = null;
				else if (0 !== i) return;
		} else if (g.runBackwards && 0 !== i)
			if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), (this._startAt = null);
			else {
				0 !== this._time && (j = !1), (c = {});
				for (d in g) (V[d] && 'autoCSS' !== d) || (c[d] = g[d]);
				if (
					((c.overwrite = 0),
					(c.data = 'isFromStart'),
					(c.lazy = j && g.lazy !== !1),
					(c.immediateRender = j),
					(this._startAt = H.to(this.target, 0, c)),
					j)
				) {
					if (0 === this._time) return;
				} else
					this._startAt._init(),
						this._startAt._enabled(!1),
						this.vars.immediateRender && (this._startAt = null);
			}
		if (
			((this._ease = k =
				k
					? k instanceof w
						? k
						: 'function' == typeof k
						? new w(k, g.easeParams)
						: x[k] || H.defaultEase
					: H.defaultEase),
			g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)),
			(this._easeType = this._ease._type),
			(this._easePower = this._ease._power),
			(this._firstPT = null),
			this._targets)
		)
			for (f = this._targets.length, a = 0; f > a; a++)
				this._initProps(
					this._targets[a],
					(this._propLookup[a] = {}),
					this._siblings[a],
					h ? h[a] : null,
					a
				) && (b = !0);
		else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
		if (
			(b && H._onPluginEvent('_onInitAllProps', this),
			h && (this._firstPT || ('function' != typeof this.target && this._enabled(!1, !1))),
			g.runBackwards)
		)
			for (c = this._firstPT; c; ) (c.s += c.c), (c.c = -c.c), (c = c._next);
		(this._onUpdate = g.onUpdate), (this._initted = !0);
	}),
		(i._initProps = function (b, c, d, e, f) {
			var g, h, i, j, k, l;
			if (null == b) return !1;
			L[b._gsTweenID] && $(),
				this.vars.css ||
					(b.style &&
						b !== a &&
						b.nodeType &&
						S.css &&
						this.vars.autoCSS !== !1 &&
						J(this.vars, b));
			for (g in this.vars)
				if (((l = this.vars[g]), V[g]))
					l &&
						(l instanceof Array || (l.push && q(l))) &&
						-1 !== l.join('').indexOf('{self}') &&
						(this.vars[g] = l = this._swapSelfInParams(l, this));
				else if (S[g] && (j = new S[g]())._onInitTween(b, this.vars[g], this, f)) {
					for (
						this._firstPT = k =
							{
								_next: this._firstPT,
								t: j,
								p: 'setRatio',
								s: 0,
								c: 1,
								f: 1,
								n: g,
								pg: 1,
								pr: j._priority,
								m: 0
							},
							h = j._overwriteProps.length;
						--h > -1;

					)
						c[j._overwriteProps[h]] = this._firstPT;
					(j._priority || j._onInitAllProps) && (i = !0),
						(j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0),
						k._next && (k._next._prev = k);
				} else c[g] = Q.call(this, b, g, 'get', l, g, 0, null, this.vars.stringFilter, f);
			return e && this._kill(e, b)
				? this._initProps(b, c, d, e, f)
				: this._overwrite > 1 && this._firstPT && d.length > 1 && ba(b, this, c, this._overwrite, d)
				? (this._kill(c, b), this._initProps(b, c, d, e, f))
				: (this._firstPT &&
						((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration)) &&
						(L[b._gsTweenID] = !0),
				  i);
		}),
		(i.render = function (a, b, c) {
			var d,
				e,
				f,
				g,
				h = this._time,
				i = this._duration,
				j = this._rawPrevTime;
			if (a >= i - 1e-7 && a >= 0)
				(this._totalTime = this._time = i),
					(this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
					this._reversed ||
						((d = !0), (e = 'onComplete'), (c = c || this._timeline.autoRemoveChildren)),
					0 === i &&
						(this._initted || !this.vars.lazy || c) &&
						(this._startTime === this._timeline._duration && (a = 0),
						(0 > j || (0 >= a && a >= -1e-7) || (j === n && 'isPause' !== this.data)) &&
							j !== a &&
							((c = !0), j > n && (e = 'onReverseComplete')),
						(this._rawPrevTime = g = !b || a || j === a ? a : n));
			else if (1e-7 > a)
				(this._totalTime = this._time = 0),
					(this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
					(0 !== h || (0 === i && j > 0)) && ((e = 'onReverseComplete'), (d = this._reversed)),
					0 > a &&
						((this._active = !1),
						0 === i &&
							(this._initted || !this.vars.lazy || c) &&
							(j >= 0 && (j !== n || 'isPause' !== this.data) && (c = !0),
							(this._rawPrevTime = g = !b || a || j === a ? a : n))),
					(!this._initted || (this._startAt && this._startAt.progress())) && (c = !0);
			else if (((this._totalTime = this._time = a), this._easeType)) {
				var k = a / i,
					l = this._easeType,
					m = this._easePower;
				(1 === l || (3 === l && k >= 0.5)) && (k = 1 - k),
					3 === l && (k *= 2),
					1 === m
						? (k *= k)
						: 2 === m
						? (k *= k * k)
						: 3 === m
						? (k *= k * k * k)
						: 4 === m && (k *= k * k * k * k),
					1 === l
						? (this.ratio = 1 - k)
						: 2 === l
						? (this.ratio = k)
						: 0.5 > a / i
						? (this.ratio = k / 2)
						: (this.ratio = 1 - k / 2);
			} else this.ratio = this._ease.getRatio(a / i);
			if (this._time !== h || c) {
				if (!this._initted) {
					if ((this._init(), !this._initted || this._gc)) return;
					if (
						!c &&
						this._firstPT &&
						((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration))
					)
						return (
							(this._time = this._totalTime = h),
							(this._rawPrevTime = j),
							K.push(this),
							void (this._lazy = [a, b])
						);
					this._time && !d
						? (this.ratio = this._ease.getRatio(this._time / i))
						: d &&
						  this._ease._calcEnd &&
						  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
				}
				for (
					this._lazy !== !1 && (this._lazy = !1),
						this._active || (!this._paused && this._time !== h && a >= 0 && (this._active = !0)),
						0 === h &&
							(this._startAt && (a >= 0 ? this._startAt.render(a, !0, c) : e || (e = '_dummyGS')),
							this.vars.onStart &&
								(0 !== this._time || 0 === i) &&
								(b || this._callback('onStart'))),
						f = this._firstPT;
					f;

				)
					f.f ? f.t[f.p](f.c * this.ratio + f.s) : (f.t[f.p] = f.c * this.ratio + f.s),
						(f = f._next);
				this._onUpdate &&
					(0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, !0, c),
					b || ((this._time !== h || d || c) && this._callback('onUpdate'))),
					e &&
						(!this._gc || c) &&
						(0 > a &&
							this._startAt &&
							!this._onUpdate &&
							a !== -1e-4 &&
							this._startAt.render(a, !0, c),
						d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
						!b && this.vars[e] && this._callback(e),
						0 === i && this._rawPrevTime === n && g !== n && (this._rawPrevTime = 0));
			}
		}),
		(i._kill = function (a, b, c) {
			if (('all' === a && (a = null), null == a && (null == b || b === this.target)))
				return (this._lazy = !1), this._enabled(!1, !1);
			b = 'string' != typeof b ? b || this._targets || this.target : H.selector(b) || b;
			var d,
				e,
				f,
				g,
				h,
				i,
				j,
				k,
				l,
				m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline,
				n = this._firstPT;
			if ((q(b) || I(b)) && 'number' != typeof b[0])
				for (d = b.length; --d > -1; ) this._kill(a, b[d], c) && (i = !0);
			else {
				if (this._targets) {
					for (d = this._targets.length; --d > -1; )
						if (b === this._targets[d]) {
							(h = this._propLookup[d] || {}),
								(this._overwrittenProps = this._overwrittenProps || []),
								(e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : 'all');
							break;
						}
				} else {
					if (b !== this.target) return !1;
					(h = this._propLookup),
						(e = this._overwrittenProps = a ? this._overwrittenProps || {} : 'all');
				}
				if (h) {
					if (
						((j = a || h),
						(k = a !== e && 'all' !== e && a !== h && ('object' != typeof a || !a._tempKill)),
						c && (H.onOverwrite || this.vars.onOverwrite))
					) {
						for (f in j) h[f] && (l || (l = []), l.push(f));
						if ((l || !a) && !aa(this, c, b, l)) return !1;
					}
					for (f in j)
						(g = h[f]) &&
							(m && (g.f ? g.t[g.p](g.s) : (g.t[g.p] = g.s), (i = !0)),
							g.pg && g.t._kill(j) && (i = !0),
							(g.pg && 0 !== g.t._overwriteProps.length) ||
								(g._prev
									? (g._prev._next = g._next)
									: g === this._firstPT && (this._firstPT = g._next),
								g._next && (g._next._prev = g._prev),
								(g._next = g._prev = null)),
							delete h[f]),
							k && (e[f] = 1);
					!this._firstPT && this._initted && n && this._enabled(!1, !1);
				}
			}
			return i;
		}),
		(i.invalidate = function () {
			return (
				this._notifyPluginsOfEnabled && H._onPluginEvent('_onDisable', this),
				(this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
				(this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
				(this._propLookup = this._targets ? {} : []),
				E.prototype.invalidate.call(this),
				this.vars.immediateRender && ((this._time = -n), this.render(Math.min(0, -this._delay))),
				this
			);
		}),
		(i._enabled = function (a, b) {
			if ((k || j.wake(), a && this._gc)) {
				var c,
					d = this._targets;
				if (d) for (c = d.length; --c > -1; ) this._siblings[c] = _(d[c], this, !0);
				else this._siblings = _(this.target, this, !0);
			}
			return (
				E.prototype._enabled.call(this, a, b),
				this._notifyPluginsOfEnabled && this._firstPT
					? H._onPluginEvent(a ? '_onEnable' : '_onDisable', this)
					: !1
			);
		}),
		(H.to = function (a, b, c) {
			return new H(a, b, c);
		}),
		(H.from = function (a, b, c) {
			return (c.runBackwards = !0), (c.immediateRender = 0 != c.immediateRender), new H(a, b, c);
		}),
		(H.fromTo = function (a, b, c, d) {
			return (
				(d.startAt = c),
				(d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender),
				new H(a, b, d)
			);
		}),
		(H.delayedCall = function (a, b, c, d, e) {
			return new H(b, 0, {
				delay: a,
				onComplete: b,
				onCompleteParams: c,
				callbackScope: d,
				onReverseComplete: b,
				onReverseCompleteParams: c,
				immediateRender: !1,
				lazy: !1,
				useFrames: e,
				overwrite: 0
			});
		}),
		(H.set = function (a, b) {
			return new H(a, 0, b);
		}),
		(H.getTweensOf = function (a, b) {
			if (null == a) return [];
			a = 'string' != typeof a ? a : H.selector(a) || a;
			var c, d, e, f;
			if ((q(a) || I(a)) && 'number' != typeof a[0]) {
				for (c = a.length, d = []; --c > -1; ) d = d.concat(H.getTweensOf(a[c], b));
				for (c = d.length; --c > -1; )
					for (f = d[c], e = c; --e > -1; ) f === d[e] && d.splice(c, 1);
			} else if (a._gsTweenID)
				for (d = _(a).concat(), c = d.length; --c > -1; )
					(d[c]._gc || (b && !d[c].isActive())) && d.splice(c, 1);
			return d || [];
		}),
		(H.killTweensOf = H.killDelayedCallsTo =
			function (a, b, c) {
				'object' == typeof b && ((c = b), (b = !1));
				for (var d = H.getTweensOf(a, b), e = d.length; --e > -1; ) d[e]._kill(c, a);
			});
	var da = u(
		'plugins.TweenPlugin',
		function (a, b) {
			(this._overwriteProps = (a || '').split(',')),
				(this._propName = this._overwriteProps[0]),
				(this._priority = b || 0),
				(this._super = da.prototype);
		},
		!0
	);
	if (
		((i = da.prototype),
		(da.version = '1.19.0'),
		(da.API = 2),
		(i._firstPT = null),
		(i._addTween = Q),
		(i.setRatio = O),
		(i._kill = function (a) {
			var b,
				c = this._overwriteProps,
				d = this._firstPT;
			if (null != a[this._propName]) this._overwriteProps = [];
			else for (b = c.length; --b > -1; ) null != a[c[b]] && c.splice(b, 1);
			for (; d; )
				null != a[d.n] &&
					(d._next && (d._next._prev = d._prev),
					d._prev
						? ((d._prev._next = d._next), (d._prev = null))
						: this._firstPT === d && (this._firstPT = d._next)),
					(d = d._next);
			return !1;
		}),
		(i._mod = i._roundProps =
			function (a) {
				for (var b, c = this._firstPT; c; )
					(b = a[this._propName] || (null != c.n && a[c.n.split(this._propName + '_').join('')])),
						b && 'function' == typeof b && (2 === c.f ? (c.t._applyPT.m = b) : (c.m = b)),
						(c = c._next);
			}),
		(H._onPluginEvent = function (a, b) {
			var c,
				d,
				e,
				f,
				g,
				h = b._firstPT;
			if ('_onInitAllProps' === a) {
				for (; h; ) {
					for (g = h._next, d = e; d && d.pr > h.pr; ) d = d._next;
					(h._prev = d ? d._prev : f) ? (h._prev._next = h) : (e = h),
						(h._next = d) ? (d._prev = h) : (f = h),
						(h = g);
				}
				h = b._firstPT = e;
			}
			for (; h; ) h.pg && 'function' == typeof h.t[a] && h.t[a]() && (c = !0), (h = h._next);
			return c;
		}),
		(da.activate = function (a) {
			for (var b = a.length; --b > -1; ) a[b].API === da.API && (S[new a[b]()._propName] = a[b]);
			return !0;
		}),
		(t.plugin = function (a) {
			if (!(a && a.propName && a.init && a.API)) throw 'illegal plugin definition.';
			var b,
				c = a.propName,
				d = a.priority || 0,
				e = a.overwriteProps,
				f = {
					init: '_onInitTween',
					set: 'setRatio',
					kill: '_kill',
					round: '_mod',
					mod: '_mod',
					initAll: '_onInitAllProps'
				},
				g = u(
					'plugins.' + c.charAt(0).toUpperCase() + c.substr(1) + 'Plugin',
					function () {
						da.call(this, c, d), (this._overwriteProps = e || []);
					},
					a.global === !0
				),
				h = (g.prototype = new da(c));
			(h.constructor = g), (g.API = a.API);
			for (b in f) 'function' == typeof a[b] && (h[f[b]] = a[b]);
			return (g.version = a.version), da.activate([g]), g;
		}),
		(g = a._gsQueue))
	) {
		for (h = 0; h < g.length; h++) g[h]();
		for (i in r) r[i].func || a.console.log('GSAP encountered missing dependency: ' + i);
	}
	k = !1;
})(
	'undefined' != typeof module && module.exports && 'undefined' != typeof global
		? global
		: this || window,
	'TweenLite'
);
