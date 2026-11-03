/**
 * AMG Cinematic 3D Camera & Multi-Plane Parallax Engine (Pro Edition)
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * يمنح المشاهد عمقاً سينمائياً ثلاثي الأبعاد حقيقياً بـ HTML:
 * 1. نظام الطبقات الخمس متوازية الحركة (5-Plane Parallax Stack).
 * 2. محاكاة العدسات السينمائية (24mm Wide, 50mm Prime, 85mm Macro).
 * 3. التركيز البؤري وعمق الميدان الحتمي (Depth-of-Field & Rack Focus).
 * 4. المحاكاة العضوية للكاميرا المحمولة (Organic Handheld Drift).
 * 5. لقطات الدوران المداري والرافعة السينمائية (Orbital Dolly & Crane Up).
 */

import { AMG_STUDIO_EASES } from './amg-studio-physics.js';

export const AMG_LENS_PRESETS = {
  wide24mm: { perspective: 1200, name: '24mm Wide-Angle Lens' },
  prime50mm: { perspective: 1600, name: '50mm Natural Human Eye' },
  macro85mm: { perspective: 2400, name: '85mm Cinematic Macro Portrait' }
};

export class AMGCinematicCameraPro {
  constructor(stageContainer, clock, {
    lens = AMG_LENS_PRESETS.prime50mm,
    enableDoF = true,
    enableOrganicDrift = true
  } = {}) {
    this.stageEl = typeof stageContainer === 'string' ? document.querySelector(stageContainer) : stageContainer;
    this.clock = clock;
    this.lens = lens;
    this.enableDoF = enableDoF;
    this.enableOrganicDrift = enableOrganicDrift;

    // حالة الكاميرا بـ 6 درجات حرية (6-DOF) + متغيرات العدسة
    this.state = {
      x: 0,
      y: 0,
      z: 0,
      pitch: 0,      // الدوران حول X (Tilt)
      yaw: 0,        // الدوران حول Y (Pan)
      roll: 0,       // الدوران حول Z (Dutch Angle)
      isoTilt: 0,    // زاوية الإسقاط الإيزومتري 3D
      focalPlaneZ: 0,// المستوى البؤري الحاد
      focalDepth: 400,// عمق النطاق الواضح
      maxBlurPx: 8,  // أقصى درجة ضبابية للطبقات الخارجة عن التركيز
      shakeIntensity: 0
    };

    // معاملات الحركة للطبقات الخمس (Parallax Depth Multipliers)
    this.parallaxRatios = {
      deep: { zPos: -800, moveRatio: 0.15 },
      bg: { zPos: -400, moveRatio: 0.35 },
      main: { zPos: 0, moveRatio: 1.0 },
      fore: { zPos: 300, moveRatio: 1.45 },
      hud: { zPos: 600, moveRatio: 0.0 } // ثابتة على الشاشة
    };

    this._cacheLayers();
    this._initPerspective();

    // ربط المحرك بالساعة الحتمية
    this.clock.onTick((timeMs) => this._renderFrame(timeMs));
  }

  _cacheLayers() {
    if (!this.stageEl) return;
    this.layers = {
      deep: this.stageEl.querySelector('[data-depth="deep"]'),
      bg: this.stageEl.querySelector('[data-depth="bg"]'),
      main: this.stageEl.querySelector('[data-depth="main"]') || this.stageEl.querySelector('#amg-camera-rig'),
      fore: this.stageEl.querySelector('[data-depth="fore"]'),
      hud: this.stageEl.querySelector('[data-depth="hud"]')
    };
  }

  _initPerspective() {
    if (!this.stageEl) return;
    this.stageEl.style.perspective = `${this.lens.perspective}px`;
    this.stageEl.style.perspectiveOrigin = '50% 50%';
  }

  /**
   * إضافة حركة كاميرا رئيسية للتايم لاين
   */
  keyframe(timeline, {
    x, y, z, pitch, yaw, roll, isoTilt, focalPlaneZ,
    start = 0, duration = 1000, ease = AMG_STUDIO_EASES.snappyOut
  }) {
    const props = { duration, ease };
    if (x !== undefined) props.x = x;
    if (y !== undefined) props.y = y;
    if (z !== undefined) props.z = z;
    if (pitch !== undefined) props.pitch = pitch;
    if (yaw !== undefined) props.yaw = yaw;
    if (roll !== undefined) props.roll = roll;
    if (isoTilt !== undefined) props.isoTilt = isoTilt;
    if (focalPlaneZ !== undefined) props.focalPlaneZ = focalPlaneZ;

    timeline.add(this.state, props, start);
  }

  /**
   * نقل التركيز البؤري سينمائياً (Rack Focus Shift)
   * ينقل وضوح العدسة من طبقة إلى أخرى
   */
  rackFocusShift(timeline, targetDepthName, { start = 0, duration = 800, ease = AMG_STUDIO_EASES.cinematicSlowMo } = {}) {
    const targetZ = this.parallaxRatios[targetDepthName]?.zPos || 0;
    timeline.add(this.state, {
      focalPlaneZ: targetZ,
      duration,
      ease
    }, start);
  }

  /**
   * اقتراب ماكرو درامي نحو نقطة محددة (Macro Push-In)
   */
  macroPushIn(timeline, { targetX = 0, targetY = 0, zoomZ = 450, duration = 1200, start = 0, ease = AMG_STUDIO_EASES.snappyOut } = {}) {
    this.keyframe(timeline, {
      x: targetX,
      y: targetY,
      z: zoomZ,
      start,
      duration,
      ease
    });
  }

  /**
   * لقطة رافعة سينمائية (Crane Up & Tilt Down)
   */
  craneUp(timeline, { liftY = -280, tiltPitch = 14, duration = 1500, start = 0, ease = AMG_STUDIO_EASES.dramaticInOut } = {}) {
    this.keyframe(timeline, {
      y: liftY,
      pitch: tiltPitch,
      start,
      duration,
      ease
    });
  }

  /**
   * صدمة اهتزاز فيزيائية متخامدة
   */
  impulse(timeline, intensity = 0.5, start = 0, duration = 600) {
    timeline.add(this.state, {
      shakeIntensity: [intensity, 0],
      duration,
      ease: 'outExpo'
    }, start);
  }

  _renderFrame(timeMs) {
    if (!this.stageEl) return;

    // 1. حساب الانجراف العضوي للكاميرا المحمولة (Organic Handheld Drift)
    let driftX = 0, driftY = 0, driftRoll = 0;
    if (this.enableOrganicDrift) {
      driftX = Math.sin(timeMs * 0.0016) * 3.2 + Math.cos(timeMs * 0.0009) * 1.5;
      driftY = Math.cos(timeMs * 0.0014) * 2.8;
      driftRoll = Math.sin(timeMs * 0.0012) * 0.35;
    }

    // 2. حساب الاهتزاز عند الصدمات
    let shakeX = 0, shakeY = 0;
    if (this.state.shakeIntensity > 0.001) {
      const s = this.state.shakeIntensity;
      shakeX = Math.sin(timeMs * 0.082) * 26 * s;
      shakeY = Math.cos(timeMs * 0.074) * 26 * s;
    }

    const curX = this.state.x + driftX + shakeX;
    const curY = this.state.y + driftY + shakeY;
    const curRoll = this.state.roll + driftRoll;
    const curPitch = this.state.pitch + (this.state.isoTilt * 0.55);
    const curYaw = this.state.yaw - (this.state.isoTilt * 0.45);

    // 3. تحريك وتحديث الطبقات الخمس بنسب التوازي الفيزيائي (Parallax Transforms)
    for (const [depthKey, layerEl] of Object.entries(this.layers)) {
      if (!layerEl) continue;
      const config = this.parallaxRatios[depthKey];
      const pRatio = config.moveRatio;

      const layerX = -curX * pRatio;
      const layerY = -curY * pRatio;
      const layerZ = (this.state.z * pRatio) + config.zPos;

      layerEl.style.transform = `
        translate3d(${layerX.toFixed(2)}px, ${layerY.toFixed(2)}px, ${layerZ.toFixed(2)}px)
        rotateX(${curPitch.toFixed(2)}deg)
        rotateY(${curYaw.toFixed(2)}deg)
        rotateZ(${curRoll.toFixed(2)}deg)
      `;

      // 4. تطبيق التركيز البؤري وعمق الميدان (Depth-of-Field Blur)
      if (this.enableDoF && depthKey !== 'hud') {
        const distFromFocal = Math.abs(config.zPos - this.state.focalPlaneZ);
        if (distFromFocal > this.state.focalDepth) {
          const blurAmount = Math.min(
            this.state.maxBlurPx,
            ((distFromFocal - this.state.focalDepth) / 300) * this.state.maxBlurPx
          );
          layerEl.style.filter = blurAmount > 0.5 ? `blur(${blurAmount.toFixed(1)}px)` : 'none';
        } else {
          layerEl.style.filter = 'none';
        }
      }
    }
  }
}
