/**
 * AMG Arabic Typography Pro & Fluid Mask Engine
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * يحمي ويطور التايبوجرافي العربي السينمائي في الويب:
 * 1. حماية اتصال الحروف العربية ومنع تفكيك الكلمات (Ligature Protection).
 * 2. عزل النصوص والأرقام الهجينة ثنائية الاتجاه (BiDi & Mixed Text Isolation).
 * 3. الأقنعة المنزلقة المائلة بزاوية هندسية رشيقة (Slanted Fluid Masks).
 * 4. قلم التظليل العربي المتوافق مع اتجاه اليمين لليسار (RTL Highlighter Sweep).
 * 5. مقاييس الخطوط العربية القياسية (Arabic Typography Scales).
 */

import { stagger } from './vendor/anime.esm.js';
import { AMG_STUDIO_EASES } from './amg-studio-physics.js';

const ARABIC_UNICODE_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
const LTR_TOKEN_REGEX = /^[A-Za-z0-9#@%_\-+]+$/;

export const AMG_ARABIC_SCALES = {
  hero: { fontSize: '82px', lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' },
  heading: { fontSize: '54px', lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' },
  title: { fontSize: '36px', lineHeight: '1.3', letterSpacing: '0em', fontWeight: '600' },
  body: { fontSize: '22px', lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' },
  label: { fontSize: '15px', lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }
};

export class AMGArabicTypographyPro {
  /**
   * معالجة وتجهيز النص العربي للتحريك السينمائي
   */
  static prepareText(targetElement, {
    mode = 'words', // 'words' | 'lines' | 'phrases'
    slantedAngle = 3.5, // زاوية ميل القناع بالدرجات
    isolateBiDi = true
  } = {}) {
    const el = typeof targetElement === 'string' ? document.querySelector(targetElement) : targetElement;
    if (!el) return [];

    const rawText = el.textContent.trim();
    const isArabic = ARABIC_UNICODE_REGEX.test(rawText);

    if (isArabic) {
      el.setAttribute('dir', 'rtl');
      el.classList.add('amg-arabic-root');
    }

    el.innerHTML = '';
    const tokens = rawText.split(/\s+/);
    const createdUnits = [];

    tokens.forEach((token, idx) => {
      // 1. حاوية القناع المائل
      const maskSpan = document.createElement('span');
      maskSpan.className = 'amg-arabic-mask';
      maskSpan.style.cssText = `
        display: inline-block;
        overflow: hidden;
        vertical-align: bottom;
        padding-bottom: 0.12em;
        margin-left: 0.22em;
        clip-path: polygon(0 0, 102% 0, 98% 100%, 0 100%);
      `;

      // 2. الكتلة الحركية الداخلية
      const unitSpan = document.createElement('span');
      unitSpan.className = 'amg-kinetic-unit amg-arabic-word';
      unitSpan.style.cssText = `
        display: inline-block;
        will-change: transform, opacity;
        transform: translateY(115%) rotateZ(${isArabic ? slantedAngle : 0}deg);
        opacity: 0;
      `;

      // 3. عزل الكلمات الإنجليزية والأرقام إن وجدت (BiDi Isolation)
      if (isolateBiDi && LTR_TOKEN_REGEX.test(token)) {
        const bdi = document.createElement('bdi');
        bdi.className = 'amg-ltr-isolate';
        bdi.style.cssText = 'direction: ltr; display: inline-block; font-family: var(--amg-font-sans, sans-serif);';
        bdi.textContent = token;
        unitSpan.appendChild(bdi);
      } else {
        unitSpan.textContent = token;
      }

      maskSpan.appendChild(unitSpan);
      el.appendChild(maskSpan);
      createdUnits.push(unitSpan);

      // مسافة عادية بين الكلمات
      if (idx < tokens.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });

    return createdUnits;
  }

  /**
   * صعود الكلمات السينمائي مع القناع المائل (Slanted Mask Slide)
   */
  static animateReveal(timeline, units, {
    start = 0,
    duration = 750,
    staggerMs = 65,
    ease = AMG_STUDIO_EASES.snappyOut
  } = {}) {
    if (!units || units.length === 0) return;

    timeline.add(units, {
      translateY: ['115%', '0%'],
      rotateZ: [2.5, 0],
      opacity: [0, 1],
      duration,
      ease,
      delay: stagger(staggerMs)
    }, start);
  }

  /**
   * قلم التظليل العربي المتوافق مع اتجاه اليمين إلى اليسار (RTL Highlighter)
   */
  static animateRTLHighlight(timeline, highlighterElement, {
    start = 0,
    duration = 600,
    ease = AMG_STUDIO_EASES.snappyOut
  } = {}) {
    const el = typeof highlighterElement === 'string' ? document.querySelector(highlighterElement) : highlighterElement;
    if (!el) return;

    el.style.direction = 'rtl';
    timeline.add(el, {
      clipPath: ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'],
      duration,
      ease
    }, start);
  }

  /**
   * نبض وزن الخط المتغير (Variable Font Weight Punch)
   */
  static animateWeight(timeline, targetElement, {
    fromWeight = 300,
    toWeight = 800,
    duration = 500,
    start = 0,
    ease = AMG_STUDIO_EASES.overshoot
  } = {}) {
    const el = typeof targetElement === 'string' ? document.querySelector(targetElement) : targetElement;
    if (!el) return;

    const proxy = { w: fromWeight };
    timeline.add(proxy, {
      w: toWeight,
      duration,
      ease,
      onUpdate: () => {
        el.style.fontWeight = Math.round(proxy.w);
        el.style.fontVariationSettings = `'wght' ${Math.round(proxy.w)}`;
      }
    }, start);
  }
}
