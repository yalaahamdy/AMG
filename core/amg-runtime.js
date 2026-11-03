/**
 * AMG Central Runtime Bundle
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
export * from './vendor/anime.esm.js';
export { AMGClock } from './amg-clock.js';
export { AMGCameraRig } from './amg-camera.js';
export { AMGCinematicCameraPro, AMG_LENS_PRESETS } from './amg-cinematic-camera-pro.js';
export { AMGMorphBridge } from './amg-morph-bridge.js';
export { AMGArabicTypographyPro, AMG_ARABIC_SCALES } from './amg-arabic-typography-pro.js';
export { AMGShotcraftEngine, AMG_SHOTCRAFT_REGISTRY } from './amg-shotcraft-engine.js';
export { AMGEditorialDiagramEngine } from './amg-editorial-diagram-engine.js';
export { AMGIsometricAnatomyPro } from './amg-isometric-anatomy-pro.js';
export * from './amg-svg-utils.js';
export * from './amg-d3-bridge.js';
export * from './amg-text-engine.js';
export * from './amg-physics-rules.js';
export * from './amg-studio-physics.js';
export { AMGVisionGuard } from './amg-vision-guard.js';
export { AMGNullMotionHUD } from './amg-nullmotion-hud.js';

/**
 * دالة التهيئة السريعة لمشهد كامل بسطر واحد (نمط Ponytail)
 */
export function initAMGStage({ durationMs = 15000, fps = 60, seed = 1337 } = {}) {
  const clock = new AMGClock({ durationMs, fps, seed });
  const camera = new AMGCameraRig('#amg-camera-rig', clock);
  const hud = new AMGNullMotionHUD(clock);
  const vision = new AMGVisionGuard({ stageWidth: 1920, stageHeight: 1080 });

  return { clock, camera, hud, vision, timeline: clock.masterTimeline };
}
