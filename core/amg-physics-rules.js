/**
 * AMG Physics Principles & Ambient Motion Loops
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { spring } from './vendor/anime.esm.js';

export const AMG_PHYSICS_SPRINGS = {
  snappy: spring({ mass: 1, stiffness: 180, damping: 14 }),
  heavy: spring({ mass: 2.2, stiffness: 130, damping: 20 }),
  bouncy: spring({ mass: 0.8, stiffness: 220, damping: 10 }),
  gentle: spring({ mass: 1, stiffness: 80, damping: 15 })
};

/**
 * حركة التمهيد الكلاسيكية (Anticipation Recoil)
 */
export function addAnticipation(timeline, target, {
  recoilX = 0,
  recoilY = 16,
  recoilScale = 0.94,
  duration = 180,
  start = 0,
  ease = 'inOutQuad'
} = {}) {
  timeline.add(target, {
    translateX: recoilX ? `-=${recoilX}` : undefined,
    translateY: recoilY ? `+=${recoilY}` : undefined,
    scale: recoilScale,
    duration,
    ease
  }, start);
}

/**
 * حلقة النبض الحي المستمر (Mandatory Ambient Alive Loop)
 * تضمن عدم تجمد أي إطار حتى أثناء فترات قراءة النصوص
 */
export function registerAmbientAliveLoop(clock, stageElement) {
  const el = typeof stageElement === 'string' ? document.querySelector(stageElement) : stageElement;
  if (!el) return;

  clock.onTick((timeMs) => {
    // حركة تنفسية دقيقة للكاميرا والمسرح (±2.5px)
    const breathY = Math.sin(timeMs * 0.0018) * 2.5;
    const breathScale = 1 + Math.cos(timeMs * 0.0014) * 0.002;

    el.style.setProperty('--amg-ambient-y', `${breathY.toFixed(2)}px`);
    el.style.setProperty('--amg-ambient-scale', `${breathScale.toFixed(5)}`);

    // تحريك أي عنصر يحمل سمة data-amg-ambient="float"
    const floaters = el.querySelectorAll('[data-amg-ambient="float"]');
    floaters.forEach((item, idx) => {
      const offset = idx * 1.3;
      const fy = Math.sin(timeMs * 0.002 + offset) * 6;
      item.style.transform = `translateY(${fy.toFixed(2)}px)`;
    });

    // تحريك أي عنصر يحمل سمة data-amg-ambient="pulse"
    const pulses = el.querySelectorAll('[data-amg-ambient="pulse"]');
    pulses.forEach((item, idx) => {
      const offset = idx * 0.8;
      const op = 0.7 + Math.sin(timeMs * 0.003 + offset) * 0.3;
      item.style.opacity = op.toFixed(3);
    });
  });
}
