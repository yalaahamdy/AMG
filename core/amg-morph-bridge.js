/**
 * AMG Topological Morphing & Seamless Match-Cut Bridges
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * يقضي على القطع الجاف والانتقالات المفككة لدى الذكاء الاصطناعي:
 * 1. معادل المسارات الطوبولوجي (N-to-M Path Equalizer).
 * 2. أنماط جسور الانتقال الأربعة (Shape Morph, Camera Dive, Whip Pan, Geometry Mask).
 * 3. بروتوكول تسليم الحالة الفراغية (Spatial Handoff).
 * 4. التنظيف التلقائي لطبقات الـ GPU لتحرير الذاكرة بعد الانتقال.
 */

import { morphTo } from './vendor/anime.esm.js';
import { normalizeToPath } from './amg-svg-utils.js';
import { AMG_STUDIO_EASES } from './amg-studio-physics.js';

export class AMGMorphBridge {
  /**
   * إعادة تجزئة أي مساري SVG ليمتلكا نفس عدد النقاط المحسوبة مكانياً
   * مما يمنع التواء المسارات أثناء الـ Morph
   */
  static equalizePaths(pathElementA, pathElementB, sampleCount = 64) {
    const pA = normalizeToPath(typeof pathElementA === 'string' ? document.querySelector(pathElementA) : pathElementA);
    const pB = normalizeToPath(typeof pathElementB === 'string' ? document.querySelector(pathElementB) : pathElementB);
    if (!pA || !pB || !pA.getTotalLength || !pB.getTotalLength) return { pathA: pA, pathB: pB };

    const lenA = pA.getTotalLength();
    const lenB = pB.getTotalLength();

    const generateEqualizedD = (pathEl, totalLen) => {
      let dStr = '';
      for (let i = 0; i < sampleCount; i++) {
        const pt = pathEl.getPointAtLength((i / (sampleCount - 1)) * totalLen);
        dStr += (i === 0 ? `M ${pt.x.toFixed(2)} ${pt.y.toFixed(2)} ` : `L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)} `);
      }
      return dStr + 'Z';
    };

    const eqDA = generateEqualizedD(pA, lenA);
    const eqDB = generateEqualizedD(pB, lenB);

    pA.setAttribute('d', eqDA);
    pB.setAttribute('d', eqDB);

    return { pathA: pA, pathB: pB, dSource: eqDA, dTarget: eqDB };
  }

  /**
   * الجسر 1: التحول الشكلي الطوبولوجي المباشر (Topological Shape Morph)
   */
  static bridgeShapeMorph(timeline, sourceSelector, targetSelector, {
    start = 0,
    duration = 900,
    ease = AMG_STUDIO_EASES.snappyOut,
    sampleCount = 64
  } = {}) {
    const { pathA, pathB } = AMGMorphBridge.equalizePaths(sourceSelector, targetSelector, sampleCount);
    if (!pathA || !pathB) return;

    timeline.add(pathA, {
      d: morphTo(pathB),
      duration,
      ease
    }, start);
  }

  /**
   * الجسر 2: اختراق الكاميرا لداخل الكائن المرساة (Camera Dive-Through)
   */
  static bridgeCameraDive(timeline, camera, {
    portalSelector,
    currentSceneSelector,
    nextSceneSelector,
    start = 0,
    duration = 1000,
    zoomScale = 22,
    ease = AMG_STUDIO_EASES.dramaticInOut
  } = {}) {
    const portal = typeof portalSelector === 'string' ? document.querySelector(portalSelector) : portalSelector;
    let targetX = 0, targetY = 0;
    if (portal && portal.getBoundingClientRect) {
      const rect = portal.getBoundingClientRect();
      targetX = (rect.left + rect.width / 2) - 960;
      targetY = (rect.top + rect.height / 2) - 540;
    }

    // 1. اقتراب الكاميرا الهائل لداخل فتحة الكائن
    camera.keyframe(timeline, {
      x: targetX,
      y: targetY,
      scale: zoomScale,
      duration,
      ease,
      start
    });

    // 2. إظهار المشهد التالي تدريجياً في قلب الاختراق
    timeline.add(nextSceneSelector, {
      opacity: [0, 1],
      scale: [0.3, 1.0],
      duration: duration * 0.7,
      ease: AMG_STUDIO_EASES.snappyOut
    }, start + (duration * 0.35));

    // 3. تنظيف المشهد السابق بعد اكتمال الاختراق
    timeline.add(currentSceneSelector, {
      opacity: [1, 0],
      duration: duration * 0.3,
      ease: 'linear'
    }, start + (duration * 0.7));
  }

  /**
   * الجسر 3: الانتقال الخاطف متطابق السرعة (Whip Pan Match-Cut)
   */
  static bridgeWhipPan(timeline, camera, {
    currentSceneSelector,
    nextSceneSelector,
    direction = 'left', // 'left', 'right', 'up', 'down'
    start = 0,
    duration = 750,
    distance = 1920,
    ease = AMG_STUDIO_EASES.dramaticInOut
  } = {}) {
    const isHorizontal = direction === 'left' || direction === 'right';
    const sign = (direction === 'left' || direction === 'up') ? -1 : 1;
    const moveProp = isHorizontal ? 'x' : 'y';

    // حركة الكاميرا الخاطفة
    camera.keyframe(timeline, {
      [moveProp]: sign * distance,
      duration,
      ease,
      start
    });

    // تفعيل ضبابية الحركة الخاطفة في منتصف اللقطة
    if (camera.stageEl) {
      const blurProp = isHorizontal ? '24px 0' : '0 24px';
      timeline.add(camera.stageEl, {
        filter: [`blur(0px)`, `blur(12px)`, `blur(0px)`],
        duration,
        ease: 'linear'
      }, start);
    }

    // تسليم المشاهد
    timeline.add(currentSceneSelector, {
      opacity: [1, 0],
      duration: duration * 0.5,
      ease: 'linear'
    }, start + (duration * 0.25));

    timeline.add(nextSceneSelector, {
      opacity: [0, 1],
      duration: duration * 0.6,
      ease: 'linear'
    }, start + (duration * 0.4));
  }

  /**
   * الجسر 4: القناع الهندسي المتوسع من الكائن المرساة (Geometry Mask Expand)
   */
  static bridgeGeometryMask(timeline, {
    maskContainerSelector,
    nextSceneSelector,
    start = 0,
    duration = 850,
    ease = AMG_STUDIO_EASES.snappyOut
  } = {}) {
    const maskEl = typeof maskContainerSelector === 'string' ? document.querySelector(maskContainerSelector) : maskContainerSelector;
    if (!maskEl) return;

    timeline.add(maskEl, {
      clipPath: ['circle(0% at 50% 50%)', 'circle(120% at 50% 50%)'],
      duration,
      ease
    }, start);

    timeline.add(nextSceneSelector, {
      opacity: [0, 1],
      duration: duration * 0.8,
      ease: 'linear'
    }, start);
  }

  /**
   * بروتوكول تسليم الحالة وتنظيف طبقات الـ GPU (Scene Handoff Protocol)
   */
  static completeHandoff(prevSceneElement, nextSceneElement) {
    if (prevSceneElement) {
      prevSceneElement.style.visibility = 'hidden';
      prevSceneElement.style.pointerEvents = 'none';
      if ('contentVisibility' in prevSceneElement.style) {
        prevSceneElement.style.contentVisibility = 'hidden';
      }
    }
    if (nextSceneElement) {
      nextSceneElement.style.visibility = 'visible';
      nextSceneElement.style.pointerEvents = 'auto';
      if ('contentVisibility' in nextSceneElement.style) {
        nextSceneElement.style.contentVisibility = 'visible';
      }
    }
  }
}
