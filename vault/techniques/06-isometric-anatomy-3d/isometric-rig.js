/**
 * AMG Isometric 3D Anatomy Engine
 * مستلهم من: wheresryan22/anatomy
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { stagger } from '../../../core/vendor/anime.esm.js';

export const isometricAnatomyEngine = {
  /**
   * تفكيك طبقات المنظومة عمودياً في الفضاء (Exploded View Animation)
   */
  explodeStack(timeline, stackContainerSelector, { spacing = 80, duration = 1000, start = 0, ease = 'outExpo' } = {}) {
    const root = typeof stackContainerSelector === 'string' ? document.querySelector(stackContainerSelector) : stackContainerSelector;
    if (!root) return;

    const layers = root.querySelectorAll('[data-amg-iso-layer]');
    layers.forEach((layer, idx) => {
      const targetY = -((layers.length - 1 - idx) * spacing);
      timeline.add(layer, {
        translateY: [0, targetY],
        opacity: [0.6, 1.0],
        duration,
        ease
      }, start);
    });

    // إظهار خطوط الإشارة والتسميات
    const callouts = root.querySelectorAll('[data-amg-iso-callout]');
    if (callouts.length > 0) {
      timeline.add(callouts, {
        opacity: [0, 1],
        scale: [0.8, 1.0],
        duration: 500,
        ease: 'outBack',
        delay: stagger(70)
      }, start + duration * 0.6);
    }
  }
};
