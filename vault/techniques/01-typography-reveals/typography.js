/**
 * AMG Typography Reveals Vault Module
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { prepareKineticText, animateKineticReveal } from '../../../core/amg-text-engine.js';
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
