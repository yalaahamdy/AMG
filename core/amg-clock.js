/**
 * AMG Master Deterministic Clock & Frame Controller
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { createTimeline } from './vendor/anime.esm.js';

export class AMGClock {
  constructor({ durationMs = 15000, fps = 60, seed = 1337 } = {}) {
    this.durationMs = durationMs;
    this.fps = fps;
    this.baseSeed = seed;
    this.currentTimeMs = 0;
    this.isPlaying = false;
    this.rafId = null;
    this.lastFrameTimestamp = 0;
    this.tickListeners = new Set();

    // إنشاء الجدول الزمني الرئيسي بوضع الإيقاف التلقائي لضمان الحتمية
    this.masterTimeline = createTimeline({
      autoplay: false,
      defaults: { ease: 'outQuart', duration: 800 }
    });

    this._setupResponsiveScaler();
    this._installGlobalHooks();
  }

  /**
   * مولد أرقام عشوائية حتمي ثابت البذرة (Mulberry32 PRNG)
   */
  seededRandom(customOffset = 0) {
    let t = (this.baseSeed + customOffset + 0x6D2B79F5) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * تسجيل دالة استماع للتحديث الزمني
   */
  onTick(callback) {
    this.tickListeners.add(callback);
    return () => this.tickListeners.delete(callback);
  }

  /**
   * القفز الحتمي الفوري إلى أي لحظة بالثواني
   */
  seek(timeInSeconds) {
    this.pause();
    const clampedMs = Math.max(0, Math.min(this.durationMs, timeInSeconds * 1000));
    this.currentTimeMs = clampedMs;
    this.masterTimeline.seek(clampedMs);
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
        nextMs = 0; // حلقة مستمرة في وضع المعاينة
      }
      this.currentTimeMs = nextMs;
      this.masterTimeline.seek(nextMs);
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
    setTimeout(scaleStage, 50);
  }

  _installGlobalHooks() {
    window.AMG_CLOCK = this;
    window.seek = (seconds) => this.seek(seconds);
    window.seekMs = (ms) => this.seek(ms / 1000);
    window.AMG_READY = document.fonts ? document.fonts.ready : Promise.resolve();
  }
}
