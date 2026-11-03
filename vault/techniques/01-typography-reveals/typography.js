/**
 * AMG Typography Reveals Vault Module
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { prepareKineticText, animateKineticReveal } from '../../../core/amg-text-engine.js';
import { AMGArabicTypographyPro, AMG_ARABIC_SCALES } from '../../../core/amg-arabic-typography-pro.js';
import { AMG_STUDIO_EASES } from '../../../core/amg-studio-physics.js';
import { stagger } from '../../../core/vendor/anime.esm.js';

export const typographyTechniques = {
  /**
   * صعود الكلمات من خلف قناع غير مرئي
   */
  maskSlideUp(timeline, targetSelector, { start = 0, duration = 800, staggerMs = 50, ease = 'outExpo' } = {}) {
    const units = prepareKineticText(targetSelector, { mode: 'auto' });
    animateKineticReveal(timeline, units, { start, duration, staggerMs, ease });
    return units;
  },

  /**
   * صعود الكلمات العربية السينمائي مع القناع المائل وعزل الحروف المتصلة (Cinematic Arabic Slanted Mask)
   */
  arabicSlantedMaskSlide(timeline, targetSelector, {
    start = 0,
    duration = 750,
    staggerMs = 65,
    slantedAngle = 3.5,
    ease = AMG_STUDIO_EASES.snappyOut
  } = {}) {
    const units = AMGArabicTypographyPro.prepareText(targetSelector, { mode: 'words', slantedAngle });
    AMGArabicTypographyPro.animateReveal(timeline, units, { start, duration, staggerMs, ease });
    return units;
  },

  /**
   * قلم التظليل العربي المتوافق مع اتجاه اليمين إلى اليسار (RTL Highlighter Sweep)
   */
  arabicRTLHighlighter(timeline, highlighterSelector, {
    start = 0,
    duration = 600,
    ease = AMG_STUDIO_EASES.snappyOut
  } = {}) {
    AMGArabicTypographyPro.animateRTLHighlight(timeline, highlighterSelector, { start, duration, ease });
  },

  /**
   * نبض وزن الخط المتغير للكلمات البارزة (Variable Font Weight Punch)
   */
  arabicVariableWeightPunch(timeline, targetSelector, {
    fromWeight = 300,
    toWeight = 800,
    duration = 500,
    start = 0,
    ease = AMG_STUDIO_EASES.overshoot
  } = {}) {
    AMGArabicTypographyPro.animateWeight(timeline, targetSelector, { fromWeight, toWeight, duration, start, ease });
  },

  /**
   * تظليل الكلمات بشريط ينمو خلفها (Highlighter Sweep)
   */
  highlighterSweep(timeline, highlighterSelector, { start = 0, duration = 650, ease = 'inOutQuad' } = {}) {
    timeline.add(highlighterSelector, {
      clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
      duration,
      ease
    }, start);
  },

  /**
   * عداد أرقام إحصائي يدور عمودياً
   */
  odometerCounter(timeline, numberElement, { from = 0, to = 100, prefix = '', suffix = '', start = 0, duration = 1200, ease = 'outExpo' } = {}) {
    const el = typeof numberElement === 'string' ? document.querySelector(numberElement) : numberElement;
    if (!el) return;
    const proxy = { val: from };
    timeline.add(proxy, {
      val: to,
      duration,
      ease,
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`;
      }
    }, start);
  }
};
