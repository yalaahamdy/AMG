/**
 * AMG Studio Physics & Advanced Motion Choreography Engine
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * يزود الذكاء الاصطناعي بمنظومة فيزيائية حتمية واستوديو منحنيات احترافي:
 * 1. مصفوفة منحنيات الاستوديو المعتمدة (Apple/Linear/Editorial Grade Eases).
 * 2. محرك النوابض التحليلي المغلق (Closed-Form Analytical Spring Formula).
 * 3. حركات التمهيد (Anticipation) والتجاوز التوافقي (Overshoot & Settle).
 * 4. التوزيع الفراغي للمجموعات (Spatial Wave & Radial Staggers).
 * 5. التقدير الكتلي التلقائي للأجسام (Auto Mass-Based Physics Scaler).
 */

import { spring, cubicBezier, stagger } from './vendor/anime.esm.js';

/**
 * مصفوفة منحنيات الاستوديو العالمية المعتمدة (بديلة عن المنحنيات البدائية)
 */
export const AMG_STUDIO_EASES = {
  // المنحنى الذهبي لشركة Apple و Linear (استقرار سريع فائق النعومة للبطاقات والواجهات)
  snappyOut: cubicBezier(0.16, 1, 0.3, 1),

  // منحنى الشد والتوتر الدرامي الأقصى (للانتقالات المكانية وحركة الكاميرا الكبرى)
  dramaticInOut: cubicBezier(0.87, 0, 0.13, 1),

  // منحنى التمهيد والتراجع للوراء قبل الانطلاق الصاروخي (Anticipate Wind-up)
  anticipate: cubicBezier(0.36, 0, 0.66, -0.22),

  // منحنى التجاوز والاستقرار (تجاوز بنسبة 106% ثم استقرار هادئ)
  overshoot: cubicBezier(0.34, 1.28, 0.64, 1),

  // هبوط الأجسام الضخمة والمنصات (Heavy Mass Landing دون ارتداد زائد)
  heavyLanding: cubicBezier(0.25, 1, 0.5, 1),

  // حركة سينمائية هادئة وطويلة الأجل
  cinematicSlowMo: cubicBezier(0.4, 0, 0.2, 1)
};

/**
 * مصفوفة نوابض فيزيائية حتمية ومتدرجة الكتلة (Second-Order Dynamics Springs)
 */
export const AMG_SPRINGS = {
  // نابض الواجهات السريعة (أزرار، شارات، نصوص، أيقونات صغيرة)
  snappy: spring({ mass: 0.9, stiffness: 190, damping: 14 }),

  // نابض البطاقات والمجسمات المتوسطة (Bento Cards, UI Windows)
  gentle: spring({ mass: 1.4, stiffness: 120, damping: 18 }),

  // نابض الأجسام الضخمة والمعمارية (Isometric Platforms, Heavy Racks)
  heavy: spring({ mass: 3.2, stiffness: 150, damping: 26 }),

  // نابض التذبذب المرح الاحتفالي (Elastic Playful Icons)
  elastic: spring({ mass: 0.7, stiffness: 240, damping: 9 })
};

/**
 * حساب الكتلة والنابض المناسب تلقائياً لحجم العنصر بالبكسل
 */
export function getNaturalSpringForElement(element) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el || !el.getBoundingClientRect) return AMG_SPRINGS.gentle;

  const rect = el.getBoundingClientRect();
  const area = rect.width * rect.height;

  if (area < 10000) {
    // أقل من 100x100px (أيقونة، شارة، زر)
    return AMG_SPRINGS.snappy;
  } else if (area < 150000) {
    // بطاقة أو نافذة متوسطة
    return AMG_SPRINGS.gentle;
  } else {
    // عنصر كبير يشغل مساحة ضخمة من الشاشة
    return AMG_SPRINGS.heavy;
  }
}

/**
 * دالة التمهيد والانطلاق الصاروخي (Anticipation & Launch)
 * تتراجع بالعنصر للخلف بنسبة محسوبة قبل إطلاقه للأمام
 */
export function animateWithAnticipation(timeline, targetSelector, {
  recoilDistance = 24,
  recoilDuration = 180,
  launchDistance = 400,
  launchDuration = 650,
  start = 0,
  axis = 'y'
} = {}) {
  const isY = axis.toLowerCase() === 'y';
  const recoilProp = isY ? 'translateY' : 'translateX';

  // 1. التراجع للخلف (Wind-up)
  timeline.add(targetSelector, {
    [recoilProp]: [0, recoilDistance],
    duration: recoilDuration,
    ease: AMG_STUDIO_EASES.cinematicSlowMo
  }, start);

  // 2. الانطلاق الصاروخي للأمام (Explosive Launch)
  timeline.add(targetSelector, {
    [recoilProp]: -launchDistance,
    duration: launchDuration,
    ease: AMG_STUDIO_EASES.snappyOut
  }, start + recoilDuration);
}

/**
 * دالة الدخول مع التجاوز والاستقرار (Overshoot & Settle)
 */
export function animateWithOvershoot(timeline, targetSelector, {
  from = { y: 60, scale: 0.9, opacity: 0 },
  to = { y: 0, scale: 1.0, opacity: 1 },
  duration = 850,
  start = 0
} = {}) {
  timeline.add(targetSelector, {
    translateY: [from.y, to.y],
    scale: [from.scale, to.scale],
    opacity: [from.opacity, to.opacity],
    duration,
    ease: AMG_STUDIO_EASES.overshoot
  }, start);
}

/**
 * كوريغرافيه الانتشار الموجي الدائري من المركز (Radial Wave Stagger)
 */
export function createRadialStagger({
  originX = 960,
  originY = 540,
  staggerStepMs = 45,
  maxDelayMs = 400
} = {}) {
  return (el, index, total) => {
    if (!el || !el.getBoundingClientRect) return index * staggerStepMs;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(cx - originX, cy - originY);
    // تأخير نسبي يتناسب مع البعد عن نقطة المركز
    return Math.min(maxDelayMs, (dist / 1000) * (staggerStepMs * 12));
  };
}

/**
 * كوريغرافيه المسح القطري المتوافق مع اتجاه العربية (RTL Diagonal Sweep Stagger)
 * ينطلق من أعلى اليمين نحو أسفل اليسار
 */
export function createRTLDiagonalStagger({ stepMs = 60 } = {}) {
  return (el, index, total) => {
    if (!el || !el.getBoundingClientRect) return index * stepMs;
    const rect = el.getBoundingClientRect();
    // حساب الموقع النسبي من أقصى اليمين (1920) وأعلى الشاشة (0)
    const rightDist = Math.max(0, 1920 - (rect.left + rect.width));
    const topDist = rect.top;
    const diagonalScore = (rightDist * 0.7) + (topDist * 0.3);
    return Math.round((diagonalScore / 1920) * 8 * stepMs);
  };
}
