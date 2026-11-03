/**
 * AMG SVG Geometric Utilities & Path Normalizer
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { createDrawable, morphTo } from './vendor/anime.esm.js';

/**
 * تحويل أي عنصر هندسي (rect, circle, ellipse, line, polygon) إلى مسار path دقيق
 * لضمان نجاح دالة svg.morphTo بنسبة 100% دائماً
 */
export function normalizeToPath(element) {
  if (!element) return null;
  const tag = element.tagName.toLowerCase();
  if (tag === 'path') return element;

  let d = '';
  if (tag === 'rect') {
    const x = parseFloat(element.getAttribute('x') || 0);
    const y = parseFloat(element.getAttribute('y') || 0);
    const w = parseFloat(element.getAttribute('width') || 0);
    const h = parseFloat(element.getAttribute('height') || 0);
    const rx = parseFloat(element.getAttribute('rx') || 0);
    const ry = parseFloat(element.getAttribute('ry') || rx || 0);
    if (rx || ry) {
      d = `M ${x + rx} ${y} H ${x + w - rx} A ${rx} ${ry} 0 0 1 ${x + w} ${y + ry} V ${y + h - ry} A ${rx} ${ry} 0 0 1 ${x + w - rx} ${y + h} H ${x + rx} A ${rx} ${ry} 0 0 1 ${x} ${y + h - ry} V ${y + ry} A ${rx} ${ry} 0 0 1 ${x + rx} ${y} Z`;
    } else {
      d = `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
    }
  } else if (tag === 'circle') {
    const cx = parseFloat(element.getAttribute('cx') || 0);
    const cy = parseFloat(element.getAttribute('cy') || 0);
    const r = parseFloat(element.getAttribute('r') || 0);
    d = `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
  } else if (tag === 'ellipse') {
    const cx = parseFloat(element.getAttribute('cx') || 0);
    const cy = parseFloat(element.getAttribute('cy') || 0);
    const rx = parseFloat(element.getAttribute('rx') || 0);
    const ry = parseFloat(element.getAttribute('ry') || 0);
    d = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
  } else if (tag === 'line') {
    const x1 = parseFloat(element.getAttribute('x1') || 0);
    const y1 = parseFloat(element.getAttribute('y1') || 0);
    const x2 = parseFloat(element.getAttribute('x2') || 0);
    const y2 = parseFloat(element.getAttribute('y2') || 0);
    d = `M ${x1} ${y1} L ${x2} ${y2}`;
  } else if (tag === 'polygon' || tag === 'polyline') {
    const points = (element.getAttribute('points') || '').trim().split(/[\s,]+/);
    if (points.length >= 2) {
      d = `M ${points[0]} ${points[1]} `;
      for (let i = 2; i < points.length; i += 2) {
        d += `L ${points[i]} ${points[i+1]} `;
      }
      if (tag === 'polygon') d += 'Z';
    }
  }

  if (!d) return element;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    if (!['x', 'y', 'width', 'height', 'rx', 'ry', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'points'].includes(attr.name)) {
      path.setAttribute(attr.name, attr.value);
    }
  }
  path.setAttribute('d', d);
  element.parentNode.replaceChild(path, element);
  return path;
}

/**
 * تجهيز مسارات SVG وتوحيد مقاييسها
 */
export function normalizePathLengths(container) {
  const root = typeof container === 'string' ? document.querySelector(container) : (container || document);
  if (!root) return;
  const paths = root.querySelectorAll('path, line, polyline, polygon, circle, rect');
  paths.forEach(p => {
    p.setAttribute('pathLength', '100');
    p.classList.add('amg-drawable-path');
  });
}

/**
 * دالة مختصرة لرسم مسار SVG بنمط Ponytail (سطر واحد)
 */
export function drawSVG(timeline, selector, { start = 0, duration = 800, ease = 'inOutQuad' } = {}) {
  const drawable = createDrawable(selector);
  timeline.add(drawable, {
    draw: ['0 0', '0 1'],
    duration,
    ease
  }, start);
}

/**
 * دالة مختصرة للتحول الشكلي السلس بين شكلين هندسيين
 */
export function morphShape(timeline, sourceSelector, targetSelector, { start = 0, duration = 1000, ease = 'inOutCubic' } = {}) {
  const src = typeof sourceSelector === 'string' ? document.querySelector(sourceSelector) : sourceSelector;
  const tgt = typeof targetSelector === 'string' ? document.querySelector(targetSelector) : targetSelector;
  const normSrc = normalizeToPath(src);
  const normTgt = normalizeToPath(tgt);

  timeline.add(normSrc, {
    d: morphTo(normTgt),
    duration,
    ease
  }, start);
}
