/**
 * AMG NullMotion HUD & Frame Scrubber Studio
 * مستلهم من: blixvip/NullMotion
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */

export class AMGNullMotionHUD {
  constructor(clock, { draftIframeSrc = null } = {}) {
    this.clock = clock;
    this.draftIframeSrc = draftIframeSrc;
    this.isVisible = true;
    this.isSplitScreen = false;
    this.container = null;

    this._buildUI();
    this._attachEvents();
  }

  _buildUI() {
    this.container = document.createElement('div');
    this.container.id = 'amg-nullmotion-hud';
    this.container.innerHTML = `
      <style>
        #amg-nullmotion-hud {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 17, 23, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
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
        .amg-hud-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .amg-hud-btn.active {
          background: #38bdf8;
          color: #050508;
          font-weight: bold;
        }
        .amg-hud-scrubber {
          width: 320px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          outline: none;
          accent-color: #38bdf8;
          cursor: pointer;
        }
        .amg-timecode {
          min-width: 90px;
          color: #38bdf8;
          font-weight: 600;
          text-align: center;
        }
      </style>
      <button id="amg-play-btn" class="amg-hud-btn">▶ تشغيل</button>
      <input type="range" id="amg-scrubber" class="amg-hud-scrubber" min="0" max="${this.clock.durationMs}" value="0" step="16.66">
      <span id="amg-time-display" class="amg-timecode">00:00:00</span>
      <button id="amg-split-btn" class="amg-hud-btn">المقارنة المزدوجة (NullMotion)</button>
      <button id="amg-export-btn" class="amg-hud-btn" style="background:#10b981; color:#050508; font-weight:600;">تصدير MP4</button>
    `;
    document.body.appendChild(this.container);
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
      window.dispatchEvent(new CustomEvent('amg:toggle-split-screen', { detail: { active: this.isSplitScreen } }));
    });

    exportBtn.addEventListener('click', () => {
      this.triggerNativeExport();
    });

    // اختصار لوحة المفاتيح H لإظهار/إخفاء الشريط
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

  triggerNativeExport() {
    alert('بدء تصدير MP4 عبر WebCodecs... يرجى الانتظار حتى اكتمال شريط الزمن.');
    this.clock.seek(0);
    this.clock.play();
  }
}
