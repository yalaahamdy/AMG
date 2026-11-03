/**
 * AMG Shotcraft Engine — ترسانة لقطات الموشن جرافيك السينمائية القابلة للتنفيذ المباشر
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * يحول بطاقات Shotcraft إلى مكونات برمجية حية:
 * 1. توليد كود الـ HTML/SVG المنضبط فراغياً بنظام Scoped CSS.
 * 2. ربط التحريك بفيزياء الاستوديو (AMG_STUDIO_EASES / AMG_SPRINGS).
 * 3. حماية النصوص العربية وعزل BiDi تلقائياً.
 * 4. تكامل مع الكاميرا السينمائية وساعة النظام window.seek(t).
 */

import { AMG_STUDIO_EASES, AMG_SPRINGS } from './amg-studio-physics.js';
import { AMGArabicTypographyPro } from './amg-arabic-typography-pro.js';
import { stagger } from './vendor/anime.esm.js';

let _uidCounter = 1;
function getNextUid(prefix = 'sc') {
  return `${prefix}-${Date.now().toString(36)}-${(_uidCounter++).toString(36)}`;
}

export const AMG_SHOTCRAFT_REGISTRY = {
  // ========================================================
  // Family 01: Hook Openers (0s - 3s)
  // ========================================================
  'SC-001': {
    id: 'SC-001',
    familyId: '01-hook-openers',
    name: 'Kinetic Slam',
    vibe: 'ضربة عنوان ضخمة مع ارتداد فيزيائي وهزة كاميرا',
    defaultDurationMs: 3000,
    template: (data = {}, uid = getNextUid('sc001')) => {
      const badge = data.badge || 'الجيل القادم من موشن جرافيك الويب';
      const title = data.title || 'قوة كود الويب النقي';
      const sub = data.sub || 'سينما بصرية متكاملة تقاد بأذكى مراحل التخطيط';
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-001-root" data-shot="SC-001" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;">
          <div class="sc-badge" style="display:inline-flex;align-items:center;padding:6px 18px;border-radius:24px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;font-size:16px;font-weight:600;margin-bottom:24px;opacity:0;">
            ${badge}
          </div>
          <h1 class="sc-hero-title" style="font-size:82px;font-weight:800;color:#ffffff;line-height:1.15;margin:0 0 20px 0;letter-spacing:-0.02em;opacity:0;">
            ${title}
          </h1>
          <p class="sc-hero-sub" style="font-size:24px;color:#94a3b8;margin:0;max-width:850px;line-height:1.6;opacity:0;">
            ${sub}
          </p>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0, isArabic = true } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;

      const badge = root.querySelector('.sc-badge');
      const title = root.querySelector('.sc-hero-title');
      const sub = root.querySelector('.sc-hero-sub');

      // 1. حركة الكاميرا الصادمة
      if (camera) {
        camera.keyframe(timeline, { scale: 1.0, rotateZ: 0, duration: 550, ease: AMG_STUDIO_EASES.snappyOut, start });
        camera.impulse(timeline, 0.45, start + 300, 500);
      }

      // 2. ظهور الشارة
      timeline.add(badge, {
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 500,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start);

      // 3. ضربة العنوان بفيزياء التجاوز
      if (isArabic) {
        const units = AMGArabicTypographyPro.prepareText(title);
        AMGArabicTypographyPro.animateReveal(timeline, units, { start: start + 150, duration: 650, ease: AMG_STUDIO_EASES.overshoot });
      } else {
        timeline.add(title, {
          scale: [1.35, 1.0],
          opacity: [0, 1],
          duration: 600,
          ease: AMG_STUDIO_EASES.overshoot
        }, start + 150);
      }

      // 4. النص الفرعي
      timeline.add(sub, {
        translateY: [25, 0],
        opacity: [0, 1],
        duration: 600,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start + 450);
    }
  },

  // ========================================================
  // Family 04: UI Walkthroughs (Bento Grid)
  // ========================================================
  'SC-047': {
    id: 'SC-047',
    familyId: '04-ui-walkthroughs',
    name: 'Bento Grid Cascade',
    vibe: 'تتابع دخول بطاقات شبكية بمرونة فيزيائية ونوابض متناسقة',
    defaultDurationMs: 4000,
    template: (data = {}, uid = getNextUid('sc047')) => {
      const title = data.title || 'منظومة متكاملة في شاشة واحدة';
      const cards = data.cards || [
        { title: 'أداء حتمي 60fps', desc: 'تحكم إطاري بالمللي ثانية', stat: '0.0ms' },
        { title: 'محرك فيزياء الاستوديو', desc: 'نوابض متوازنة بدون تصلب', stat: '100%' },
        { title: 'تايبوجرافي عربي فخم', desc: 'حماية اتصال الحروف وعزل BiDi', stat: 'RTL' }
      ];
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-047-root" data-shot="SC-047" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
          <h2 class="sc-bento-title" style="font-size:54px;font-weight:800;color:#fff;margin:0 0 40px 0;text-align:center;opacity:0;">${title}</h2>
          <div class="sc-bento-grid" style="display:grid;grid-template-columns:repeat(3, 400px);gap:24px;">
            ${cards.map((c, i) => `
              <div class="sc-bento-card" style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px;box-shadow:0 20px 50px rgba(0,0,0,0.6);opacity:0;will-change:transform,opacity;">
                <div style="font-family:var(--amg-font-mono);font-size:36px;font-weight:800;color:#38bdf8;margin-bottom:12px;">${c.stat}</div>
                <h3 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 8px 0;">${c.title}</h3>
                <p style="font-size:15px;color:#94a3b8;margin:0;line-height:1.5;">${c.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;

      const title = root.querySelector('.sc-bento-title');
      const cards = root.querySelectorAll('.sc-bento-card');

      if (camera) {
        camera.keyframe(timeline, { scale: 1.0, duration: 1000, ease: AMG_STUDIO_EASES.snappyOut, start });
      }

      timeline.add(title, {
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 600,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start);

      timeline.add(cards, {
        translateY: [60, 0],
        scale: [0.92, 1],
        opacity: [0, 1],
        duration: 750,
        ease: AMG_STUDIO_EASES.overshoot,
        delay: stagger(110)
      }, start + 200);
    }
  },

  // ========================================================
  // Family 06: Data Metric Slams
  // ========================================================
  'SC-076': {
    id: 'SC-076',
    familyId: '06-data-metric-slams',
    name: 'Odometer Rolling Stat',
    vibe: 'دوران أرقام متسارع يستقر على إنجاز قياسي',
    defaultDurationMs: 3500,
    template: (data = {}, uid = getNextUid('sc076')) => {
      const label = data.label || 'نسبة كفاءة الأداء';
      const targetVal = data.targetVal || '99.9%';
      const sub = data.sub || 'معدل استقرار الإطارات دون أدنى هبوط';
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-076-root" data-shot="SC-076" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;">
          <div class="sc-stat-label" style="font-size:20px;color:#94a3b8;font-weight:600;margin-bottom:16px;opacity:0;">${label}</div>
          <div class="sc-stat-number" style="font-family:var(--amg-font-mono);font-size:120px;font-weight:900;color:#10b981;line-height:1;margin-bottom:20px;filter:drop-shadow(0 0 40px rgba(16,185,129,0.3));opacity:0;">
            0.0%
          </div>
          <div class="sc-stat-sub" style="font-size:22px;color:#cbd5e1;max-width:600px;opacity:0;">${sub}</div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { targetNumber = 99.9, suffix = '%', camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;

      const label = root.querySelector('.sc-stat-label');
      const numberEl = root.querySelector('.sc-stat-number');
      const sub = root.querySelector('.sc-stat-sub');

      if (camera) {
        camera.keyframe(timeline, { scale: 1.05, duration: 1400, ease: AMG_STUDIO_EASES.cinematicSlowMo, start });
      }

      timeline.add(label, {
        translateY: [-15, 0],
        opacity: [0, 1],
        duration: 500,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start);

      timeline.add(numberEl, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 400,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start + 100);

      // عداد الأرقام المتدحرج
      const proxy = { val: 0 };
      timeline.add(proxy, {
        val: targetNumber,
        duration: 1500,
        ease: AMG_STUDIO_EASES.snappyOut,
        onUpdate: () => {
          numberEl.textContent = `${proxy.val.toFixed(1)}${suffix}`;
        }
      }, start + 150);

      timeline.add(sub, {
        translateY: [15, 0],
        opacity: [0, 1],
        duration: 600,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start + 800);
    }
  },

  // ========================================================
  // Family 10: Climax & Outro Lockups
  // ========================================================
  'SC-137': {
    id: 'SC-137',
    familyId: '10-climax-outro-lockups',
    name: 'CTA Magnetic Button Climax',
    vibe: 'زر إطلاق سينمائي يشع طاقة وموجات نيون مع شعار الختام',
    defaultDurationMs: 4000,
    template: (data = {}, uid = getNextUid('sc137')) => {
      const title = data.title || 'ابدأ رحلة الإخراج السينمائي الآن';
      const buttonText = data.buttonText || 'انطلق مع AMG';
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-137-root" data-shot="SC-137" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;">
          <h2 class="sc-cta-title" style="font-size:62px;font-weight:800;color:#fff;margin:0 0 40px 0;opacity:0;">${title}</h2>
          <div class="sc-btn-wrapper" style="position:relative;display:inline-flex;align-items:center;justify-content:center;opacity:0;">
            <div class="sc-glow-ring" style="position:absolute;inset:-16px;border-radius:40px;border:2px solid #38bdf8;pointer-events:none;opacity:0;"></div>
            <button class="sc-cta-btn" style="padding:18px 48px;border-radius:30px;background:linear-gradient(135deg,#38bdf8,#6366f1);color:#020306;font-size:24px;font-weight:800;border:none;box-shadow:0 15px 40px rgba(56,189,248,0.4);cursor:pointer;">
              ${buttonText}
            </button>
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;

      const title = root.querySelector('.sc-cta-title');
      const btnWrapper = root.querySelector('.sc-btn-wrapper');
      const glowRing = root.querySelector('.sc-glow-ring');

      if (camera) {
        camera.keyframe(timeline, { scale: 1.06, duration: 1200, ease: AMG_STUDIO_EASES.snappyOut, start });
      }

      timeline.add(title, {
        translateY: [-25, 0],
        opacity: [0, 1],
        duration: 700,
        ease: AMG_STUDIO_EASES.overshoot
      }, start);

      timeline.add(btnWrapper, {
        scale: [0.75, 1.05, 1],
        opacity: [0, 1],
        duration: 750,
        ease: AMG_STUDIO_EASES.overshoot
      }, start + 250);

      timeline.add(glowRing, {
        scale: [1, 1.8],
        opacity: [0.8, 0],
        duration: 1200,
        ease: AMG_STUDIO_EASES.cinematicSlowMo,
        loop: true
      }, start + 450);
    }
  }
};

/**
 * محرك Shotcraft المركزي
 */
export class AMGShotcraftEngine {
  static get(shotId) {
    return AMG_SHOTCRAFT_REGISTRY[shotId] || null;
  }

  static list() {
    return Object.values(AMG_SHOTCRAFT_REGISTRY);
  }

  static mount(container, shotId, data = {}) {
    const parent = typeof container === 'string' ? document.querySelector(container) : container;
    if (!parent) return null;

    const recipe = this.get(shotId);
    if (!recipe) {
      console.warn(`[AMG Shotcraft] اللقطة غير مسجلة: ${shotId}`);
      return null;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = recipe.template(data).trim();
    const element = tempDiv.firstElementChild;
    parent.appendChild(element);
    return element;
  }

  static mountAndAnimate(container, timeline, shotId, { data = {}, camera, start = 0, ...options } = {}) {
    const el = this.mount(container, shotId, data);
    if (!el) return null;

    const recipe = this.get(shotId);
    recipe.animate(timeline, el, { camera, start, ...options });
    return el;
  }
}
