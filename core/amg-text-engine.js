/**
 * AMG Bilingual Kinetic Typography Engine
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { stagger } from './vendor/anime.esm.js';

const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

/**
 * تجهيز النصوص للتحريك الحركي مع حماية اتصال الحروف العربية
 */
export function prepareKineticText(targetElement, { mode = 'auto' } = {}) {
  const el = typeof targetElement === 'string' ? document.querySelector(targetElement) : targetElement;
  if (!el) return [];

  const rawText = el.textContent.trim();
  const isArabic = ARABIC_REGEX.test(rawText);

  if (isArabic) {
    el.setAttribute('dir', 'rtl');
    el.classList.add('amg-rtl-text');
  }

  // في العربية: حظر تقسيم الحروف منعاً لكسر الاتصال
  const effectiveMode = (isArabic && (mode === 'chars' || mode === 'auto')) ? 'words' : (mode === 'auto' ? 'words' : mode);

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

    if (effectiveMode === 'chars' && !isArabic) {
      [...word].forEach((ch) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'amg-kinetic-unit amg-char';
        charSpan.style.cssText = 'display:inline-block; will-change:transform,opacity; transform:translateY(110%); opacity:0;';
        charSpan.textContent = ch;
        innerSpan.appendChild(charSpan);
        createdUnits.push(charSpan);
      });
    } else {
      innerSpan.textContent = word;
      createdUnits.push(innerSpan);
    }

    maskSpan.appendChild(innerSpan);
    el.appendChild(maskSpan);

    if (wIdx < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
  });

  return createdUnits;
}

/**
 * دالة دخول حركي سينمائي للنصوص (Masked Slide Up with Stagger)
 */
export function animateKineticReveal(timeline, units, { start = 0, duration = 800, staggerMs = 60, ease = 'outExpo' } = {}) {
  if (!units || units.length === 0) return;

  timeline.add(units, {
    translateY: ['110%', '0%'],
    opacity: [0, 1],
    duration,
    ease,
    delay: stagger(staggerMs)
  }, start);
}
