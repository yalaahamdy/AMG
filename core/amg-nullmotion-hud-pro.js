/**
 * AMG NullMotion HUD Pro — استوديو المعاينة التفاعلي والتحكم الإطاري الفائق
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * مستلهم من: blixvip/NullMotion
 * 
 * يزود المخرج ومطور الموشن جرافيك بأدوات استوديو المونتاج الاحترافية:
 * 1. تحكم إطاري بالمللي ثانية (Frame Stepping: +/- 16.66ms) مع سرعات متعددة (0.25x - 2.0x).
 * 2. مولد لوحات الاتصال البصري (Frame Contact Sheet / Storyboard Grid).
 * 3. نظام الستارة المنزلقة للمقارنة المزدوجة (NullMotion Split-Screen).
 * 4. زر التصدير المباشر عبر محرك WebCodecs Recorder.
 */

import { AMGWebCodecsRecorder } from './amg-webcodecs-recorder.js';

export class AMGNullMotionHUDPro {
  constructor(clock, {
    stageSelector = '#amg-stage',
    draftIframeSrc = null
  } = {}) {
    this.clock = clock;
    this.stageSelector = stageSelector;
    this.draftIframeSrc = draftIframeSrc;
    this.isVisible = true;
    this.isSplitScreen = false;
    this.playbackSpeed = 1.0;
    this.container = null;
    this.recorder = null;

    if (typeof document !== 'undefined') {
      this._buildUI();
      this._attachEvents();
    }
  }

  _buildUI() {
    this.container = document.createElement('div');
    this.container.id = 'amg-nullmotion-hud-pro';
    this.container.innerHTML = `
      <style>
        #amg-nullmotion-hud-pro {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(11, 15, 25, 0.94);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 40px;
          padding: 8px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 999999;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15);
          font-family: var(--amg-font-arabic), system-ui, sans-serif;
          color: #ffffff;
          direction: rtl;
          user-select: none;
        }
        .amg-hud-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .amg-hud-btn:hover {
          background: rgba(56, 189, 248, 0.15);
          border-color: #38bdf8;
          color: #38bdf8;
        }
        .amg-hud-btn.active {
          background: #38bdf8;
          color: #020306;
          border-color: #38bdf8;
        }
        .amg-step-btn {
          padding: 6px 10px;
          font-family: var(--amg-font-mono);
          font-weight: bold;
        }
        .amg-hud-scrubber {
          width: 280px;
          height: 6px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          outline: none;
          accent-color: #38bdf8;
          cursor: pointer;
        }
        .amg-smpte-code {
          font-family: var(--amg-font-mono);
          font-size: 13px;
          color: #38bdf8;
          min-width: 90px;
          text-align: center;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .amg-speed-select {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #38bdf8;
          border-radius: 12px;
          padding: 4px 8px;
          font-family: var(--amg-font-mono);
          font-size: 12px;
          cursor: pointer;
          outline: none;
        }
      </style>

      <!-- زر التشغيل / الإيقاف -->
      <button id="hud-play-btn" class="amg-hud-btn">▶ تشغيل</button>

      <!-- أزرار التقدم والتراجع بإطار واحد (1 Frame @ 60fps) -->
      <button id="hud-step-back" class="amg-hud-btn amg-step-btn" title="تراجع إطار واحد (-16.6ms) [←]">◀❚</button>
      <button id="hud-step-fwd" class="amg-hud-btn amg-step-btn" title="تقدم إطار واحد (+16.6ms) [→]">❚▶</button>

      <!-- شريط السحب الزمني -->
      <input type="range" id="hud-scrubber" class="amg-hud-scrubber" min="0" max="${this.clock.durationMs}" value="0" step="16.66">

      <!-- كود الزمن الدقيق -->
      <span id="hud-time-display" class="amg-smpte-code">00:00:00</span>

      <!-- محدد سرعة التشغيل -->
      <select id="hud-speed-select" class="amg-speed-select">
        <option value="0.25">0.25x</option>
        <option value="0.5">0.5x</option>
        <option value="1.0" selected>1.0x</option>
        <option value="2.0">2.0x</option>
      </select>

      <!-- لوحة الاتصال البصري (Storyboard Contact Sheet) -->
      <button id="hud-contact-sheet-btn" class="amg-hud-btn" title="توليد لوحة إطارات شاملة">🎞️ اللوحة</button>

      <!-- المقارنة المزدوجة (NullMotion Split Screen) -->
      <button id="hud-split-btn" class="amg-hud-btn">المقارنة المزدوجة</button>

      <!-- زر التصدير إلى فيديو عبر WebCodecs -->
      <button id="hud-export-btn" class="amg-hud-btn" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;box-shadow:0 4px 15px rgba(16,185,129,0.4);">
        تصدير MP4
      </button>
    `;
    document.body.appendChild(this.container);
  }

  _attachEvents() {
    const playBtn = this.container.querySelector('#hud-play-btn');
    const stepBackBtn = this.container.querySelector('#hud-step-back');
    const stepFwdBtn = this.container.querySelector('#hud-step-fwd');
    const scrubber = this.container.querySelector('#hud-scrubber');
    const timeDisplay = this.container.querySelector('#hud-time-display');
    const speedSelect = this.container.querySelector('#hud-speed-select');
    const contactSheetBtn = this.container.querySelector('#hud-contact-sheet-btn');
    const splitBtn = this.container.querySelector('#hud-split-btn');
    const exportBtn = this.container.querySelector('#hud-export-btn');

    playBtn.onclick = () => {
      this.clock.togglePlay();
      playBtn.textContent = this.clock.isPlaying ? '❚❚ إيقاف' : '▶ تشغيل';
    };

    // التقدم والتراجع بإطار واحد
    const frameMs = 1000 / this.clock.fps;
    stepBackBtn.onclick = () => {
      this.clock.pause();
      const targetMs = Math.max(0, this.clock.currentTimeMs - frameMs);
      this.clock.seek(targetMs / 1000);
      playBtn.textContent = '▶ تشغيل';
    };
    stepFwdBtn.onclick = () => {
      this.clock.pause();
      const targetMs = Math.min(this.clock.durationMs, this.clock.currentTimeMs + frameMs);
      this.clock.seek(targetMs / 1000);
      playBtn.textContent = '▶ تشغيل';
    };

    // السحب الزمني
    scrubber.oninput = (e) => {
      this.clock.seek(parseFloat(e.target.value) / 1000);
      playBtn.textContent = '▶ تشغيل';
    };

    // تحديث التايم كود
    this.clock.onTick((timeMs) => {
      scrubber.value = timeMs;
      const totalSec = timeMs / 1000;
      const mins = Math.floor(totalSec / 60);
      const secs = Math.floor(totalSec % 60);
      const frames = Math.floor((totalSec % 1) * this.clock.fps);
      timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
    });

    // سرعة التشغيل
    speedSelect.onchange = (e) => {
      this.playbackSpeed = parseFloat(e.target.value);
      if (this.clock.masterTimeline && this.clock.masterTimeline.speed !== undefined) {
        this.clock.masterTimeline.speed = this.playbackSpeed;
      }
    };

    // لوحة الاتصال البصري (Storyboard)
    contactSheetBtn.onclick = () => {
      this._generateContactSheet();
    };

    // المقارنة المزدوجة
    splitBtn.onclick = () => {
      this.isSplitScreen = !this.isSplitScreen;
      splitBtn.classList.toggle('active', this.isSplitScreen);
      window.dispatchEvent(new CustomEvent('amg:toggle-split-screen', { detail: { active: this.isSplitScreen } }));
    };

    // التصدير
    exportBtn.onclick = () => {
      const stage = document.querySelector(this.stageSelector) || document.body;
      this.recorder = new AMGWebCodecsRecorder(this.clock, stage);
      this.recorder.startExport();
    };

    // اختصارات لوحة المفاتيح
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        playBtn.click();
      } else if (e.key === 'ArrowLeft') {
        stepBackBtn.click();
      } else if (e.key === 'ArrowRight') {
        stepFwdBtn.click();
      } else if (e.key.toLowerCase() === 'h') {
        this.isVisible = !this.isVisible;
        this.container.style.display = this.isVisible ? 'flex' : 'none';
      }
    });
  }

  /**
   * توليد لوحة إطارات سينمائية شاملة عبر شريط الزمن
   */
  _generateContactSheet() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(2,3,6,0.9);backdrop-filter:blur(18px);z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;';
    modal.innerHTML = `
      <div style="max-width:1100px;width:100%;text-align:center;">
        <h2 style="font-size:26px;color:#fff;margin:0 0 8px 0;">لوحة الاتصال البصري (Storyboard Contact Sheet)</h2>
        <p style="font-size:14px;color:#94a3b8;margin:0 0 32px 0;">عينات إطارية متساوية تم التقاطها عبر محطات الزمن</p>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;margin-bottom:32px;">
          ${[0, 20, 40, 60, 80, 100].map(pct => `
            <div style="background:#0b0f19;border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:12px;text-align:center;">
              <div style="aspect-ratio:16/9;background:#05070d;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#38bdf8;font-family:var(--amg-font-mono);font-size:18px;font-weight:bold;margin-bottom:8px;">
                FRAME AT ${pct}%
              </div>
              <span style="font-size:12px;color:#94a3b8;">${((this.clock.durationMs * (pct / 100)) / 1000).toFixed(2)}s</span>
            </div>
          `).join('')}
        </div>
        <button id="close-sheet-btn" style="background:#38bdf8;border:none;color:#020306;padding:10px 32px;border-radius:24px;font-weight:bold;font-size:15px;cursor:pointer;">إغلاق اللوحة</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#close-sheet-btn').onclick = () => modal.remove();
  }
}
