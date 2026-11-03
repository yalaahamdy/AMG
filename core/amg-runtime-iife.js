/**
 * AMG Standalone IIFE Runtime (Zero-CORS / File-Protocol Compatible)
 * Works directly with file:/// without triggering browser CORS restrictions.
 */
(function(global) {
  'use strict';

  const anime = global.anime;
  const d3 = global.d3;

  // 1. Clock Class
  class AMGClock {
    constructor({ durationMs = 15000, fps = 60, seed = 1337 } = {}) {
      this.durationMs = durationMs;
      this.fps = fps;
      this.baseSeed = seed;
      this.currentTimeMs = 0;
      this.isPlaying = false;
      this.rafId = null;
      this.lastFrameTimestamp = 0;
      this.tickListeners = new Set();

      this.masterTimeline = (anime && anime.createTimeline) ? anime.createTimeline({
        autoplay: false,
        defaults: { ease: 'outQuart', duration: 800 }
      }) : null;

      this._setupResponsiveScaler();
      this._installGlobalHooks();
    }

    seededRandom(customOffset = 0) {
      let t = (this.baseSeed + customOffset + 0x6D2B79F5) | 0;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    onTick(callback) {
      this.tickListeners.add(callback);
      return () => this.tickListeners.delete(callback);
    }

    seek(timeInSeconds) {
      this.pause();
      const clampedMs = Math.max(0, Math.min(this.durationMs, timeInSeconds * 1000));
      this.currentTimeMs = clampedMs;
      if (this.masterTimeline) {
        this.masterTimeline.seek(clampedMs);
      }
      for (const listener of this.tickListeners) {
        listener(clampedMs, clampedMs / this.durationMs);
      }
      window.dispatchEvent(new CustomEvent('amg:seek', { 
        detail: { timeMs: clampedMs, timeSec: clampedMs / 1000, progress: clampedMs / this.durationMs } 
      }));
      return clampedMs;
    }

    play() {
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.lastFrameTimestamp = performance.now();
      const loop = (now) => {
        if (!this.isPlaying) return;
        const deltaMs = now - this.lastFrameTimestamp;
        this.lastFrameTimestamp = now;
        let nextMs = this.currentTimeMs + deltaMs;
        if (nextMs >= this.durationMs) {
          nextMs = 0;
        }
        this.currentTimeMs = nextMs;
        if (this.masterTimeline) {
          this.masterTimeline.seek(nextMs);
        }
        for (const listener of this.tickListeners) {
          listener(nextMs, nextMs / this.durationMs);
        }
        this.rafId = requestAnimationFrame(loop);
      };
      this.rafId = requestAnimationFrame(loop);
      window.dispatchEvent(new CustomEvent('amg:play'));
    }

    pause() {
      this.isPlaying = false;
      if (this.rafId) cancelAnimationFrame(this.rafId);
      window.dispatchEvent(new CustomEvent('amg:pause'));
    }

    togglePlay() {
      if (this.isPlaying) this.pause();
      else this.play();
    }

    _setupResponsiveScaler() {
      const scaleStage = () => {
        const stage = document.getElementById('amg-stage');
        if (!stage) return;
        const aspect = stage.getAttribute('data-aspect') || '16:9';
        let targetW = 1920;
        let targetH = 1080;
        if (aspect === '9:16') {
          targetW = 1080;
          targetH = 1920;
        } else if (aspect === '1:1') {
          targetW = 1080;
          targetH = 1080;
        }
        const scale = Math.min(window.innerWidth / targetW, window.innerHeight / targetH) * 0.96;
        stage.style.transform = `scale(${scale.toFixed(4)})`;
      };

      window.addEventListener('resize', scaleStage);
      window.addEventListener('DOMContentLoaded', scaleStage);
      setTimeout(scaleStage, 60);
    }

    _installGlobalHooks() {
      window.AMG_CLOCK = this;
      window.seek = (seconds) => this.seek(seconds);
      window.seekMs = (ms) => this.seek(ms / 1000);
      window.AMG_READY = document.fonts ? document.fonts.ready : Promise.resolve();
    }
  }

  // 2. Camera Rig Class
  class AMGCameraRig {
    constructor(stageElement, clock) {
      this.stageEl = typeof stageElement === 'string' ? document.querySelector(stageElement) : stageElement;
      this.clock = clock;
      this.state = {
        x: 0, y: 0, scale: 1, rotateZ: 0,
        isoTiltX: 0, isoRotateZ: 0,
        shakeIntensity: 0, dofBlurPx: 0
      };

      if (this.clock) {
        this.clock.onTick((timeMs) => this._applyTransform(timeMs));
      }
    }

    keyframe(timeline, {
      x, y, translateX, translateY, scale, rotateZ, isoTiltX, isoRotateZ, shakeIntensity, dofBlurPx,
      start = 0, duration = 1000, ease = 'inOutCubic'
    }) {
      const animProps = { duration, ease };
      const targetX = x !== undefined ? x : translateX;
      const targetY = y !== undefined ? y : translateY;
      if (targetX !== undefined) animProps.x = targetX;
      if (targetY !== undefined) animProps.y = targetY;
      if (scale !== undefined) animProps.scale = scale;
      if (rotateZ !== undefined) animProps.rotateZ = rotateZ;
      if (isoTiltX !== undefined) animProps.isoTiltX = isoTiltX;
      if (isoRotateZ !== undefined) animProps.isoRotateZ = isoRotateZ;
      if (shakeIntensity !== undefined) animProps.shakeIntensity = shakeIntensity;
      if (dofBlurPx !== undefined) animProps.dofBlurPx = dofBlurPx;

      timeline.add(this.state, animProps, start);
    }

    impulse(timeline, intensity = 0.5, start = 0, duration = 600) {
      timeline.add(this.state, {
        shakeIntensity: [intensity, 0],
        duration,
        ease: 'outExpo'
      }, start);
    }

    _applyTransform(timeMs) {
      if (!this.stageEl) return;
      let shakeX = 0, shakeY = 0, shakeRot = 0;
      if (this.state.shakeIntensity > 0.001) {
        const s = this.state.shakeIntensity;
        shakeX = Math.sin(timeMs * 0.085) * Math.cos(timeMs * 0.043) * 28 * s;
        shakeY = Math.cos(timeMs * 0.078) * Math.sin(timeMs * 0.051) * 28 * s;
        shakeRot = Math.sin(timeMs * 0.062) * 2.5 * s;
      }

      const tx = -(this.state.x + shakeX);
      const ty = -(this.state.y + shakeY);
      const rz = this.state.rotateZ + shakeRot;

      this.stageEl.style.transform = `
        perspective(1600px)
        scale(${this.state.scale.toFixed(4)})
        rotateX(${this.state.isoTiltX.toFixed(2)}deg)
        rotateZ(${(rz + this.state.isoRotateZ).toFixed(2)}deg)
        translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0px)
      `;

      if (this.state.dofBlurPx > 0.1) {
        this.stageEl.style.filter = `blur(${this.state.dofBlurPx.toFixed(2)}px)`;
      } else {
        this.stageEl.style.filter = 'none';
      }
    }
  }

  // 3. SVG Utilities
  function drawSVG(timeline, selector, { start = 0, duration = 800, ease = 'inOutQuad' } = {}) {
    if (anime && anime.createDrawable) {
      const drawable = anime.createDrawable(selector);
      timeline.add(drawable, { draw: ['0 0', '0 1'], duration, ease }, start);
    } else {
      // Fallback
      timeline.add(selector, { strokeDashoffset: [100, 0], duration, ease }, start);
    }
  }

  // 4. Kinetic Text Utilities
  const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  function prepareKineticText(targetElement, { mode = 'auto' } = {}) {
    const el = typeof targetElement === 'string' ? document.querySelector(targetElement) : targetElement;
    if (!el) return [];

    const rawText = el.textContent.trim();
    const isArabic = ARABIC_REGEX.test(rawText);

    if (isArabic) {
      el.setAttribute('dir', 'rtl');
      el.classList.add('amg-rtl-text');
    }

    el.innerHTML = '';
    const words = rawText.split(/\s+/);
    const createdUnits = [];

    words.forEach((word, wIdx) => {
      const maskSpan = document.createElement('span');
      maskSpan.className = 'amg-word-mask';
      maskSpan.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom; padding-bottom:0.06em;';

      const innerSpan = document.createElement('span');
      innerSpan.className = 'amg-kinetic-unit amg-word';
      innerSpan.style.cssText = 'display:inline-block; will-change:transform,opacity; transform:translateY(110%); opacity:0;';
      innerSpan.textContent = word;

      maskSpan.appendChild(innerSpan);
      el.appendChild(maskSpan);
      createdUnits.push(innerSpan);

      if (wIdx < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });

    return createdUnits;
  }

  function animateKineticReveal(timeline, units, { start = 0, duration = 800, staggerMs = 60, ease = 'outExpo' } = {}) {
    if (!units || units.length === 0) return;
    const staggerFn = (anime && anime.stagger) ? anime.stagger(staggerMs) : 0;
    timeline.add(units, {
      translateY: ['110%', '0%'],
      opacity: [0, 1],
      duration,
      ease,
      delay: staggerFn
    }, start);
  }

  // 5. Ambient Alive Loop
  function registerAmbientAliveLoop(clock, stageElement) {
    const el = typeof stageElement === 'string' ? document.querySelector(stageElement) : stageElement;
    if (!el) return;

    clock.onTick((timeMs) => {
      const floaters = el.querySelectorAll('[data-amg-ambient="float"]');
      floaters.forEach((item, idx) => {
        const offset = idx * 1.3;
        const fy = Math.sin(timeMs * 0.002 + offset) * 6;
        item.style.transform = `translateY(${fy.toFixed(2)}px)`;
      });

      const pulses = el.querySelectorAll('[data-amg-ambient="pulse"]');
      pulses.forEach((item, idx) => {
        const offset = idx * 0.8;
        const op = 0.7 + Math.sin(timeMs * 0.003 + offset) * 0.3;
        item.style.opacity = op.toFixed(3);
      });
    });
  }

  // 6. NullMotion HUD
  class AMGNullMotionHUD {
    constructor(clock) {
      this.clock = clock;
      this.isVisible = true;
      this.isSplitScreen = false;
      this._buildUI();
      this._attachEvents();
    }

    _buildUI() {
      const container = document.createElement('div');
      container.id = 'amg-nullmotion-hud';
      container.innerHTML = `
        <style>
          #amg-nullmotion-hud {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 17, 23, 0.94);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 40px;
            padding: 8px 24px;
            display: flex;
            align-items: center;
            gap: 16px;
            z-index: 99999;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
            font-family: 'JetBrains Mono', -apple-system, monospace;
            color: #ffffff;
            font-size: 13px;
          }
          .amg-hud-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #ffffff;
            padding: 6px 14px;
            border-radius: 20px;
            cursor: pointer;
            font-family: inherit;
            font-size: 12px;
            transition: background 0.15s;
          }
          .amg-hud-btn:hover { background: rgba(255, 255, 255, 0.2); }
          .amg-hud-btn.active { background: #38bdf8; color: #050508; font-weight: bold; }
          .amg-hud-scrubber {
            width: 320px;
            height: 6px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            outline: none;
            accent-color: #38bdf8;
            cursor: pointer;
          }
          .amg-timecode { min-width: 90px; color: #38bdf8; font-weight: 600; text-align: center; }
        </style>
        <button id="amg-play-btn" class="amg-hud-btn">▶ تشغيل</button>
        <input type="range" id="amg-scrubber" class="amg-hud-scrubber" min="0" max="${this.clock.durationMs}" value="0" step="16.66">
        <span id="amg-time-display" class="amg-timecode">00:00:00</span>
        <button id="amg-split-btn" class="amg-hud-btn">المقارنة المزدوجة (NullMotion)</button>
        <button id="amg-export-btn" class="amg-hud-btn" style="background:#10b981; color:#050508; font-weight:600;">تصدير MP4</button>
      `;
      document.body.appendChild(container);
      this.container = container;
    }

    _attachEvents() {
      const playBtn = this.container.querySelector('#amg-play-btn');
      const scrubber = this.container.querySelector('#amg-scrubber');
      const timeDisplay = this.container.querySelector('#amg-time-display');
      const splitBtn = this.container.querySelector('#amg-split-btn');
      const exportBtn = this.container.querySelector('#amg-export-btn');

      playBtn.addEventListener('click', () => {
        this.clock.togglePlay();
        playBtn.textContent = this.clock.isPlaying ? '❚❚ إيقاف' : '▶ تشغيل';
      });

      scrubber.addEventListener('input', (e) => {
        const ms = parseFloat(e.target.value);
        this.clock.seek(ms / 1000);
        playBtn.textContent = '▶ تشغيل';
      });

      this.clock.onTick((timeMs) => {
        scrubber.value = timeMs;
        const totalSec = timeMs / 1000;
        const mins = Math.floor(totalSec / 60);
        const secs = Math.floor(totalSec % 60);
        const frames = Math.floor((totalSec % 1) * this.clock.fps);
        timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
      });

      splitBtn.addEventListener('click', () => {
        this.isSplitScreen = !this.isSplitScreen;
        splitBtn.classList.toggle('active', this.isSplitScreen);
      });

      exportBtn.addEventListener('click', () => {
        alert('جاري إعداد إطارات الفيديو... يمكنك أيضاً تصدير MP4 عبر الأمر: node scripts/amg-bundle-master.mjs');
      });

      window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'h') {
          this.isVisible = !this.isVisible;
          this.container.style.display = this.isVisible ? 'flex' : 'none';
        } else if (e.code === 'Space') {
          e.preventDefault();
          playBtn.click();
        }
      });
    }
  }

  function initAMGStage({ durationMs = 15000, fps = 60, seed = 1337 } = {}) {
    const clock = new AMGClock({ durationMs, fps, seed });
    const camera = new AMGCameraRig('#amg-camera-rig', clock);
    const hud = new AMGNullMotionHUD(clock);
    return { clock, camera, hud, timeline: clock.masterTimeline };
  }

  // Export to global AMG namespace
  global.AMG = {
    AMGClock,
    AMGCameraRig,
    drawSVG,
    prepareKineticText,
    animateKineticReveal,
    registerAmbientAliveLoop,
    AMGNullMotionHUD,
    initAMGStage
  };

})(typeof window !== 'undefined' ? window : globalThis);
