/**
 * AMG SVG Draw & Morph Vault Module
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { drawSVG, morphShape, normalizeToPath } from '../../../core/amg-svg-utils.js';

export const svgMorphTechniques = {
  drawIn: drawSVG,
  morph: morphShape,

  /**
   * إرسال نبضة ضوئية متحركة عبر مسار خط ربط
   */
  pulseConnector(timeline, pulseSelector, pathSelector, { start = 0, duration = 1000, ease = 'inOutQuad' } = {}) {
    const p = typeof pathSelector === 'string' ? document.querySelector(pathSelector) : pathSelector;
    if (!p) return;
    const len = p.getTotalLength();
    const proxy = { offset: 0 };

    timeline.add(proxy, {
      offset: [0, len],
      duration,
      ease,
      onUpdate: () => {
        const pt = p.getPointAtLength(proxy.offset);
        const pulse = typeof pulseSelector === 'string' ? document.querySelector(pulseSelector) : pulseSelector;
        if (pulse) {
          pulse.setAttribute('cx', pt.x);
          pulse.setAttribute('cy', pt.y);
        }
      }
    }, start);
  }
};
