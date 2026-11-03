/**
 * AMG Editorial Diagram Runner (45 Diagram Engine)
 * مستلهم من: cathrynlavery/diagram-design
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { drawSVG } from '../../../core/amg-svg-utils.js';
import { stagger } from '../../../core/vendor/anime.esm.js';

export const editorialDiagramEngine = {
  /**
   * تحريك أي مخطط تحريري تتابعياً
   */
  animateDiagram(timeline, diagramSelector, { start = 0, duration = 1200, mode = 'sequential' } = {}) {
    const root = typeof diagramSelector === 'string' ? document.querySelector(diagramSelector) : diagramSelector;
    if (!root) return;

    // 1. رسم خطوط الربط والأسهم
    const connectors = root.querySelectorAll('[data-amg-connector]');
    if (connectors.length > 0) {
      drawSVG(timeline, connectors, { start, duration: duration * 0.6, ease: 'inOutQuad' });
    }

    // 2. ظهور العقد والصناديق التحريرية
    const nodes = root.querySelectorAll('[data-amg-node]');
    if (nodes.length > 0) {
      timeline.add(nodes, {
        scale: [0.85, 1.0],
        opacity: [0, 1],
        duration: duration * 0.7,
        ease: 'outExpo',
        delay: stagger(90)
      }, start + 250);
    }

    // 3. ظهور الشارات والنصوص التوضيحية
    const badges = root.querySelectorAll('[data-amg-badge]');
    if (badges.length > 0) {
      timeline.add(badges, {
        opacity: [0, 1],
        duration: 400,
        ease: 'outQuad',
        delay: stagger(60)
      }, start + 600);
    }
  }
};
