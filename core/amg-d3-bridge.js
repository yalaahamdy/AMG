/**
 * AMG D3 Bridge & Deterministic Mathematical Animator
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import d3, { scaleLinear, line, curveCatmullRom, interpolate } from './vendor/d3.esm.js';

/**
 * تحريك حالة بيانية لـ D3 من حالة أولى لحالة ثانية بشكل حتمي تماماً
 */
export function animateD3State(timeline, {
  fromData,
  toData,
  duration = 1200,
  start = 0,
  ease = 'inOutCubic',
  onUpdateRender
}) {
  const interp = interpolate || d3.interpolate;
  const interpolator = interp(fromData, toData);
  const proxy = { progress: 0 };

  timeline.add(proxy, {
    progress: [0, 1],
    duration,
    ease,
    onUpdate: () => {
      if (typeof onUpdateRender === 'function') {
        onUpdateRender(interpolator(proxy.progress), proxy.progress);
      }
    }
  }, start);
}

/**
 * بناء مقاييس D3 القياسية لشاشة 1920x1080
 */
export function createChartScales({
  xDomain = [0, 100],
  yDomain = [0, 100],
  width = 1200,
  height = 600,
  padding = { top: 40, right: 40, bottom: 60, left: 80 }
} = {}) {
  const sLinear = scaleLinear || d3.scaleLinear;
  const xScale = sLinear()
    .domain(xDomain)
    .range([padding.left, width - padding.right]);

  const yScale = sLinear()
    .domain(yDomain)
    .range([height - padding.bottom, padding.top]);

  return { xScale, yScale, d3 };
}

/**
 * توليد مسار منحنى بياني ناعم
 */
export function generateCurvedPath(data, xScale, yScale) {
  const lineGenerator = line || d3.line;
  const curveMethod = (curveCatmullRom || d3.curveCatmullRom).alpha(0.5);
  const lineGen = lineGenerator()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(curveMethod);

  return lineGen(data);
}
