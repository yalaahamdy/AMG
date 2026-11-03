/**
 * AMG Virtual Cinematic & Isometric Camera Rig
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */

export class AMGCameraRig {
  constructor(stageElement, clock) {
    this.stageEl = typeof stageElement === 'string' ? document.querySelector(stageElement) : stageElement;
    this.clock = clock;
    this.state = {
      x: 0,
      y: 0,
      scale: 1,
      rotateZ: 0,
      isoTiltX: 0,
      isoRotateZ: 0,
      shakeIntensity: 0,
      dofBlurPx: 0
    };

    // ربط الكاميرا بنبضات الساعة المركزية لضمان الحتمية الدقيقة
    this.clock.onTick((timeMs) => this._applyTransform(timeMs));
  }

  /**
   * إضافة حركة كاميرا إلى الجدول الزمني الرئيسي
   */
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

  /**
   * إحداث هزة صدمة فيزيائية سريعة متخامدة
   */
  impulse(timeline, intensity = 0.5, start = 0, duration = 600) {
    timeline.add(this.state, {
      shakeIntensity: [intensity, 0],
      duration,
      ease: 'outExpo'
    }, start);
  }

  _applyTransform(timeMs) {
    if (!this.stageEl) return;

    // حساب الاهتزاز الحتمي بدقة بناءً على معادلات الجيب وجيب التمام
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

    // تطبيق فلتر الضبابية بحذر للأداء الرسومي
    if (this.state.dofBlurPx > 0.1) {
      this.stageEl.style.filter = `blur(${this.state.dofBlurPx.toFixed(2)}px)`;
    } else {
      this.stageEl.style.filter = 'none';
    }
  }
}
