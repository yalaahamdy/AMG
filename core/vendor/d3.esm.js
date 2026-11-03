/**
 * Standalone D3 ESM Bundle
 * Universal wrapper around d3.min.js for pure zero-dependency browser & node execution
 */
import './d3.min.js';

const d3 = (typeof window !== 'undefined' && window.d3) || (typeof globalThis !== 'undefined' && globalThis.d3) || {};

export default d3;
export const interpolate = d3.interpolate;
export const interpolateNumber = d3.interpolateNumber;
export const interpolateRound = d3.interpolateRound;
export const interpolateRgb = d3.interpolateRgb;
export const scaleLinear = d3.scaleLinear;
export const scaleLog = d3.scaleLog;
export const scaleBand = d3.scaleBand;
export const scalePoint = d3.scalePoint;
export const line = d3.line;
export const area = d3.area;
export const arc = d3.arc;
export const curveCatmullRom = d3.curveCatmullRom;
export const curveMonotoneX = d3.curveMonotoneX;
