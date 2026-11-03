/**
 * AMG Camera Choreography Vault Module (Pro 3D Edition)
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
import { AMG_STUDIO_EASES } from '../../../core/amg-studio-physics.js';

export const cameraChoreographyTechniques = {
  /**
   * اقتراب ماكرو سينمائي نحو نقطة تركيز بصرية محددة (Macro Push-In)
   */
  macroPushIn(camera, timeline, { targetX = 0, targetY = 0, zoomZ = 450, duration = 1200, start = 0, ease = AMG_STUDIO_EASES.snappyOut } = {}) {
    if (camera.macroPushIn) {
      camera.macroPushIn(timeline, { targetX, targetY, zoomZ, duration, start, ease });
    } else {
      camera.keyframe(timeline, { x: targetX, y: targetY, scale: 1.35, duration, start, ease });
    }
  },

  /**
   * لقطة رافعة سينمائية ترتفع للأعلى مع إمالة الرؤية للأسفل (Crane Up & Tilt Down)
   */
  craneUpAndTilt(camera, timeline, { liftY = -280, tiltPitch = 14, duration = 1500, start = 0, ease = AMG_STUDIO_EASES.dramaticInOut } = {}) {
    if (camera.craneUp) {
      camera.craneUp(timeline, { liftY, tiltPitch, duration, start, ease });
    } else {
      camera.keyframe(timeline, { y: liftY, duration, start, ease });
    }
  },

  /**
   * نقل التركيز البؤري بين الطبقات (Rack Focus Shift)
   */
  rackFocus(camera, timeline, targetLayerName, { duration = 800, start = 0, ease = AMG_STUDIO_EASES.cinematicSlowMo } = {}) {
    if (camera.rackFocusShift) {
      camera.rackFocusShift(timeline, targetLayerName, { duration, start, ease });
    }
  },

  /**
   * هزة صدمة فيزيائية عند وقوع حدث مؤثر (Impact Trauma Shake)
   */
  cameraTraumaImpulse(camera, timeline, intensity = 0.5, start = 0, duration = 600) {
    camera.impulse(timeline, intensity, start, duration);
  }
};
