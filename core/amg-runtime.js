/**
 * AMG Central Runtime Bundle
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
export * from './vendor/anime.esm.js';
export { AMGClock } from './amg-clock.js';
export { AMGCameraRig } from './amg-camera.js';
export * from './amg-svg-utils.js';
export * from './amg-d3-bridge.js';
export * from './amg-text-engine.js';
export * from './amg-physics-rules.js';
export { AMGNullMotionHUD } from './amg-nullmotion-hud.js';

/**
 * دالة التهيئة السريعة لمشهد كامل بسطر واحد (نمط Ponytail)
 */
export function initAMGStage({ durationMs = 15000, fps = 60, seed = 1337 } = {}) {
  const clock = new AMGClock({ durationMs, fps, seed });
  const camera = new AMGCameraRig('#amg-camera-rig', clock);
  const hud = new AMGNullMotionHUD(clock);

  return { clock, camera, hud, timeline: clock.masterTimeline };
}
