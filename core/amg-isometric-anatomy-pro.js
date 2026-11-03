/**
 * AMG Isometric Anatomy Pro & 3D Engineering Engine
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * مستلهم من: wheresryan22/anatomy
 * 
 * يوفر نماذج التشريح الهندسي والإسقاط الإيزومتري القياسي ثلاثي الأبعاد:
 * 1. حسابات الإسقاط المتعامد (Isometric Orthographic Projection) مع إضاءة الأسطح الثلاثية.
 * 2. مكونات السيليكون والخوادم وأنابيب البيانات المضيئة.
 * 3. محرك التفكيك الطبقي العمودي (Exploded View Rig) مع خطوط الإرشاد والتسميات التقنية.
 */

import { AMG_STUDIO_EASES, AMG_SPRINGS } from './amg-studio-physics.js';
import { stagger } from './vendor/anime.esm.js';

let _isoUidCounter = 1;
function getIsoUid(prefix = 'iso') {
  return `${prefix}-${Date.now().toString(36)}-${(_isoUidCounter++).toString(36)}`;
}

export class AMGIsometricAnatomyPro {
  /**
   * رسم مكعب إيزومتري متكامل الأسطح الثلاثية بـ SVG نقي
   * @param {Object} options
   */
  static renderIsoCube({
    cx = 200,
    cy = 200,
    w = 120, // العرض على المحور السيني الإيزومتري
    h = 80,  // الارتفاع العمودي
    topColor = '#38bdf8',
    leftColor = '#0284c7',
    rightColor = '#0369a1',
    stroke = 'rgba(255,255,255,0.2)',
    strokeWidth = 1.5
  } = {}) {
    // زوايا الإسقاط الإيزومتري القياسي (cos 30° = 0.866, sin 30° = 0.5)
    const dx = (w * 0.866);
    const dy = (w * 0.5);

    // 1. الوجه العلوي (Top Plane)
    const pTop = `M ${cx} ${cy - h} L ${cx + dx} ${cy - h - dy} L ${cx} ${cy - h - 2 * dy} L ${cx - dx} ${cy - h - dy} Z`;
    // 2. الوجه الأيسر (Left Plane)
    const pLeft = `M ${cx - dx} ${cy - h - dy} L ${cx} ${cy - h} L ${cx} ${cy} L ${cx - dx} ${cy - dy} Z`;
    // 3. الوجه الأيمن (Right Plane)
    const pRight = `M ${cx} ${cy - h} L ${cx + dx} ${cy - h - dy} L ${cx + dx} ${cy - dy} L ${cx} ${cy} Z`;

    return `
      <g class="amg-iso-cube">
        <path d="${pLeft}" fill="${leftColor}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
        <path d="${pRight}" fill="${rightColor}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
        <path d="${pTop}" fill="${topColor}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
      </g>
    `;
  }

  /**
   * إنشاء منصة سحابية إيزومترية مضيئة (Iso Slab)
   */
  static renderIsoSlab({
    cx = 300,
    cy = 300,
    w = 260,
    h = 24,
    glowColor = '#38bdf8'
  } = {}) {
    return this.renderIsoCube({
      cx, cy, w, h,
      topColor: 'rgba(15, 23, 42, 0.95)',
      leftColor: 'rgba(30, 41, 59, 0.9)',
      rightColor: 'rgba(15, 23, 42, 0.8)',
      stroke: glowColor,
      strokeWidth: 2
    });
  }

  /**
   * منظومة التفكيك الطبقي للمنظومة الهندسية (Exploded View Rig)
   */
  static createExplodedViewStack({
    layers = [
      { name: 'طبقة البنية التحتية والسيليكون', desc: 'Hardware & Silicon Core', color: '#38bdf8' },
      { name: 'طبقة نظام التشغيل الافتراضي', desc: 'Kernel & Virtualization', color: '#6366f1' },
      { name: 'طبقة شبكة الخدمات المتصلة', desc: 'Service Mesh & Data Pipes', color: '#f59e0b' },
      { name: 'طبقة واجهة التحكم والتطبيق', desc: 'UI & User Applications', color: '#10b981' }
    ],
    width = 900,
    height = 650,
    uid = getIsoUid('stack')
  } = {}) {
    return `
      <div id="${uid}" class="amg-isometric-exploded-stack" style="position:relative;width:${width}px;height:${height}px;margin:auto;display:flex;align-items:center;justify-content:center;perspective:1400px;">
        <div class="iso-stack-world" style="position:relative;width:420px;height:420px;transform-style:preserve-3d;transform:rotateX(55deg) rotateZ(-45deg);">
          ${layers.map((l, i) => `
            <div class="iso-exploded-layer layer-${i}" data-layer-index="${i}" style="position:absolute;inset:0;border-radius:28px;background:rgba(15,23,42,0.85);border:2px solid ${l.color};box-shadow:0 25px 60px rgba(0,0,0,0.8),0 0 30px ${l.color}33;display:flex;flex-direction:column;align-items:center;justify-content:center;will-change:transform,opacity;transition:border-color 0.4s ease;">
              <span style="font-family:var(--amg-font-mono);font-size:12px;color:${l.color};font-weight:bold;margin-bottom:6px;">LAYER [0${i + 1}]</span>
              <h4 style="font-size:22px;color:#fff;margin:0 0 4px 0;font-weight:800;">${l.name}</h4>
              <span style="font-size:13px;color:#94a3b8;">${l.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * تحريك التفكيك الطبقي عمودياً مع النوابض الفيزيائية
   */
  static animateExplodedView(timeline, rootElement, {
    spacing = 95,
    duration = 1000,
    start = 0,
    ease = AMG_STUDIO_EASES.overshoot
  } = {}) {
    const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
    if (!root) return;

    const layers = root.querySelectorAll('.iso-exploded-layer');
    layers.forEach((layer, idx) => {
      const targetZ = (idx) * spacing;
      timeline.add(layer, {
        translateZ: [0, targetZ],
        duration,
        ease
      }, start + idx * 80);
    });
  }

  /**
   * نبضات أنابيب نقل البيانات الإيزومترية
   */
  static animateDataPipe(timeline, pipeSelector, {
    duration = 800,
    start = 0,
    color = '#38bdf8'
  } = {}) {
    const pipe = typeof pipeSelector === 'string' ? document.querySelector(pipeSelector) : pipeSelector;
    if (!pipe) return;

    timeline.add(pipe, {
      strokeDashoffset: [100, 0],
      duration,
      ease: AMG_STUDIO_EASES.snappyOut
    }, start);
  }
}
