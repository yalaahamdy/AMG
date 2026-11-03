/**
 * AMG Shotcraft Engine — ترسانة لقطات الموشن جرافيك السينمائية القابلة للتنفيذ المباشر
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * يضم 17 وصفة راية تنفيذية (Flagship Executable Recipes) تغطي كافة العائلات الـ 10:
 * 1. توليد كود HTML/SVG نقي ومنضبط فراغياً (Zero Collisions / Title Safe).
 * 2. ربط التحريك بفيزياء الاستوديو (AMG_STUDIO_EASES / AMG_SPRINGS).
 * 3. حماية التايبوجرافي العربي والأقنعة المائلة (AMGArabicTypographyPro).
 * 4. تكامل مع الكاميرا الافتراضية وساعة النظام window.seek(t).
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

      if (camera) {
        camera.keyframe(timeline, { scale: 1.0, rotateZ: 0, duration: 550, ease: AMG_STUDIO_EASES.snappyOut, start });
        camera.impulse(timeline, 0.45, start + 300, 500);
      }
      timeline.add(badge, { translateY: [-20, 0], opacity: [0, 1], duration: 500, ease: AMG_STUDIO_EASES.snappyOut }, start);
      if (isArabic) {
        const units = AMGArabicTypographyPro.prepareText(title);
        AMGArabicTypographyPro.animateReveal(timeline, units, { start: start + 150, duration: 650, ease: AMG_STUDIO_EASES.overshoot });
      } else {
        timeline.add(title, { scale: [1.35, 1.0], opacity: [0, 1], duration: 600, ease: AMG_STUDIO_EASES.overshoot }, start + 150);
      }
      timeline.add(sub, { translateY: [25, 0], opacity: [0, 1], duration: 600, ease: AMG_STUDIO_EASES.snappyOut }, start + 450);
    }
  },

  'SC-002': {
    id: 'SC-002',
    familyId: '01-hook-openers',
    name: 'Question Typewriter',
    vibe: 'سؤال استفهامي يكتب بسرعة مع مؤشر وامض يثير الفضول',
    defaultDurationMs: 3200,
    template: (data = {}, uid = getNextUid('sc002')) => {
      const question = data.question || 'هل تساءلت يوماً كيف تُبنى أعظم أفكار المستقبل؟';
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-002-root" data-shot="SC-002" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;">
          <div class="sc-q-box" style="display:inline-flex;align-items:center;gap:12px;max-width:1100px;">
            <h2 class="sc-q-text" style="font-size:56px;font-weight:700;color:#ffffff;line-height:1.3;margin:0;">
              ${question}
            </h2>
            <span class="sc-q-cursor" style="display:inline-block;width:4px;height:50px;background:#38bdf8;border-radius:2px;box-shadow:0 0 12px #38bdf8;"></span>
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const text = root.querySelector('.sc-q-text');
      const cursor = root.querySelector('.sc-q-cursor');

      if (camera) {
        camera.keyframe(timeline, { scale: 1.05, duration: 2500, ease: AMG_STUDIO_EASES.cinematicSlowMo, start });
      }
      const units = AMGArabicTypographyPro.prepareText(text);
      AMGArabicTypographyPro.animateReveal(timeline, units, { start, duration: 550, staggerMs: 50 });
      timeline.add(cursor, { opacity: [1, 0, 1], duration: 600, loop: true, ease: 'linear' }, start);
    }
  },

  // ========================================================
  // Family 02: Problem & Tension
  // ========================================================
  'SC-016': {
    id: 'SC-016',
    familyId: '02-problem-tension',
    name: 'Chaos Clutter',
    vibe: 'تراكم فوضوي لبطاقات متصادمة مع ظهور تنبيه خطأ أحمر',
    defaultDurationMs: 3500,
    template: (data = {}, uid = getNextUid('sc016')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-016-root" data-shot="SC-016" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
          <div class="sc-clutter-container" style="position:relative;width:800px;height:450px;">
            <div class="sc-bad-card card-1" style="position:absolute;top:40px;left:50px;width:340px;padding:24px;border-radius:16px;background:#1e1b24;border:1px solid #ef4444;box-shadow:0 20px 40px rgba(0,0,0,0.8);transform:rotate(-8deg);opacity:0;">
              <span style="font-family:var(--amg-font-mono);color:#ef4444;font-size:14px;font-weight:bold;">ERROR 504: GATEWAY TIMEOUT</span>
              <p style="color:#94a3b8;font-size:14px;margin:8px 0 0 0;">فشل الاتصال وتراكم الطلبات</p>
            </div>
            <div class="sc-bad-card card-2" style="position:absolute;top:100px;right:60px;width:360px;padding:24px;border-radius:16px;background:#1e1b24;border:1px solid #f59e0b;box-shadow:0 20px 40px rgba(0,0,0,0.8);transform:rotate(6deg);opacity:0;">
              <span style="font-family:var(--amg-font-mono);color:#f59e0b;font-size:14px;font-weight:bold;">WARNING: CPU OVERHEAT 98%</span>
              <p style="color:#94a3b8;font-size:14px;margin:8px 0 0 0;">استهلاك مفرط للموارد وبطء حاد</p>
            </div>
            <div class="sc-bad-card card-3" style="position:absolute;bottom:30px;left:220px;width:380px;padding:28px;border-radius:20px;background:#2a1215;border:2px solid #ef4444;box-shadow:0 30px 60px rgba(239,68,68,0.25);transform:scale(0.8);opacity:0;text-align:center;">
              <span style="font-size:48px;display:block;margin-bottom:8px;">⚠️</span>
              <h3 style="color:#fff;font-size:24px;margin:0 0 8px 0;">انهيار خط الإنتاج التقليدي</h3>
              <p style="color:#fca5a5;font-size:16px;margin:0;">الوقت ينفد والتكاليف تتضاعف</p>
            </div>
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const cards = root.querySelectorAll('.sc-bad-card');

      if (camera) {
        camera.keyframe(timeline, { scale: 1.08, rotateZ: 1.5, duration: 1200, ease: AMG_STUDIO_EASES.snappyOut, start });
        camera.impulse(timeline, 0.4, start + 600, 400);
      }
      timeline.add(cards, {
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: 650,
        ease: AMG_STUDIO_EASES.overshoot,
        delay: stagger(180)
      }, start);
    }
  },

  'SC-017': {
    id: 'SC-017',
    familyId: '02-problem-tension',
    name: 'Red Bottleneck',
    vibe: 'أنبوب تدفق بيانات يختنق وتتحول عناصره للون الأحمر المحذر',
    defaultDurationMs: 3200,
    template: (data = {}, uid = getNextUid('sc017')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-017-root" data-shot="SC-017" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
          <h2 style="font-size:48px;font-weight:800;color:#ef4444;margin:0 0 32px 0;">عنق الزجاجة (Bottleneck)</h2>
          <svg width="800" height="120" viewBox="0 0 800 120" fill="none">
            <path d="M 50 20 H 300 L 400 50 H 500 L 600 20 H 750" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50 100 H 300 L 400 70 H 500 L 600 100 H 750" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
            <circle class="sc-choke-dot" cx="420" cy="60" r="14" fill="#ef4444" filter="drop-shadow(0 0 12px #ef4444)"/>
            <circle class="sc-choke-dot" cx="450" cy="60" r="14" fill="#ef4444" filter="drop-shadow(0 0 12px #ef4444)"/>
            <circle class="sc-choke-dot" cx="480" cy="60" r="14" fill="#ef4444" filter="drop-shadow(0 0 12px #ef4444)"/>
          </svg>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const dots = root.querySelectorAll('.sc-choke-dot');

      if (camera) {
        camera.keyframe(timeline, { scale: 1.1, duration: 1000, ease: AMG_STUDIO_EASES.snappyOut, start });
      }
      timeline.add(dots, {
        scale: [0.8, 1.25, 0.9, 1],
        duration: 700,
        ease: AMG_STUDIO_EASES.overshoot,
        delay: stagger(120)
      }, start);
    }
  },

  // ========================================================
  // Family 03: Hero Reveals
  // ========================================================
  'SC-031': {
    id: 'SC-031',
    familyId: '03-hero-reveals',
    name: 'Silhouette Rim Reveal',
    vibe: 'إضاءة حواف المنتج في الظلام الدامس قبل وضوحه التام',
    defaultDurationMs: 3800,
    template: (data = {}, uid = getNextUid('sc031')) => {
      const title = data.title || 'ظهور المنظومة الثورية';
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-031-root" data-shot="SC-031" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
          <div class="sc-rim-monolith" style="width:400px;height:400px;border-radius:40px;background:#05070d;border:2px solid rgba(56,189,248,0.1);box-shadow:0 0 0 rgba(56,189,248,0);display:flex;align-items:center;justify-content:center;position:relative;opacity:0;">
            <div class="sc-rim-glow" style="position:absolute;inset:-4px;border-radius:44px;border:2px solid #38bdf8;filter:drop-shadow(0 0 30px #38bdf8);opacity:0;"></div>
            <span style="font-size:72px;color:#fff;font-weight:900;">AMG</span>
          </div>
          <h2 class="sc-rim-title" style="font-size:48px;font-weight:800;color:#fff;margin-top:40px;opacity:0;">${title}</h2>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const monolith = root.querySelector('.sc-rim-monolith');
      const glow = root.querySelector('.sc-rim-glow');
      const title = root.querySelector('.sc-rim-title');

      if (camera) {
        camera.keyframe(timeline, { scale: 1.0, duration: 1400, ease: AMG_STUDIO_EASES.snappyOut, start });
      }
      timeline.add(monolith, { scale: [0.85, 1], opacity: [0, 1], duration: 800, ease: AMG_STUDIO_EASES.overshoot }, start);
      timeline.add(glow, { opacity: [0, 1, 0.4], duration: 1000, ease: AMG_STUDIO_EASES.dramaticInOut }, start + 400);
      timeline.add(title, { translateY: [20, 0], opacity: [0, 1], duration: 600, ease: AMG_STUDIO_EASES.snappyOut }, start + 700);
    }
  },

  'SC-032': {
    id: 'SC-032',
    familyId: '03-hero-reveals',
    name: 'Blueprint to Reality Morph',
    vibe: 'تحول المخطط الهندسي الأزرق إلى واجهة حية ملونة بالكامل',
    defaultDurationMs: 4000,
    template: (data = {}, uid = getNextUid('sc032')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-032-root" data-shot="SC-032" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
          <div class="sc-blueprint-card" style="width:640px;height:380px;border-radius:24px;border:2px dashed #38bdf8;background:rgba(56,189,248,0.04);padding:32px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 0 50px rgba(56,189,248,0.1);transition:all 0.8s ease;">
            <div style="font-family:var(--amg-font-mono);font-size:14px;color:#38bdf8;">CAD BLUEPRINT v4.0</div>
            <div style="font-size:42px;font-weight:800;color:#fff;">واجهة الإنتاج الفائق</div>
            <div style="display:flex;gap:16px;">
              <div style="height:12px;width:120px;border-radius:6px;background:rgba(56,189,248,0.3);"></div>
              <div style="height:12px;width:80px;border-radius:6px;background:rgba(56,189,248,0.2);"></div>
            </div>
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const card = root.querySelector('.sc-blueprint-card');

      timeline.add(card, {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderStyle: 'solid',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(56,189,248,0.25)',
        duration: 900,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start + 400);
    }
  },

  // ========================================================
  // Family 04: UI Walkthroughs
  // ========================================================
  'SC-046': {
    id: 'SC-046',
    familyId: '04-ui-walkthroughs',
    name: 'Cursor Spotlight Click',
    vibe: 'مؤشر ماوس ذكي يتحرك وينقر لتنشيط ميزة استثنائية',
    defaultDurationMs: 3500,
    template: (data = {}, uid = getNextUid('sc046')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-046-root" data-shot="SC-046" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
          <div class="sc-target-card" style="width:520px;padding:36px;border-radius:24px;background:#0d131f;border:1px solid rgba(255,255,255,0.12);box-shadow:0 20px 60px rgba(0,0,0,0.6);text-align:center;">
            <h3 style="font-size:32px;color:#fff;margin:0 0 12px 0;">تفعيل السرعة القصوى</h3>
            <button class="sc-btn" style="padding:12px 32px;border-radius:16px;background:#38bdf8;color:#050508;font-size:18px;font-weight:bold;border:none;">تنشيط الآن</button>
          </div>
          <svg class="sc-cursor" width="40" height="40" viewBox="0 0 24 24" fill="none" style="position:absolute;top:55%;left:52%;filter:drop-shadow(0 6px 12px rgba(0,0,0,0.7));opacity:0;">
            <path d="M4 4L11 20L14 13L21 10L4 4Z" fill="#ffffff" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const cursor = root.querySelector('.sc-cursor');
      const card = root.querySelector('.sc-target-card');

      timeline.add(cursor, { translateX: [80, 0], translateY: [60, 0], opacity: [0, 1], duration: 700, ease: AMG_STUDIO_EASES.snappyOut }, start);
      timeline.add(cursor, { scale: [1, 0.85, 1], duration: 300, ease: AMG_STUDIO_EASES.overshoot }, start + 800);
      timeline.add(card, { borderColor: ['rgba(255,255,255,0.12)', '#38bdf8'], boxShadow: ['0 20px 60px rgba(0,0,0,0.6)', '0 30px 80px rgba(56,189,248,0.35)'], duration: 500, ease: AMG_STUDIO_EASES.overshoot }, start + 950);
    }
  },

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

      if (camera) camera.keyframe(timeline, { scale: 1.0, duration: 1000, ease: AMG_STUDIO_EASES.snappyOut, start });
      timeline.add(title, { translateY: [-20, 0], opacity: [0, 1], duration: 600, ease: AMG_STUDIO_EASES.snappyOut }, start);
      timeline.add(cards, { translateY: [60, 0], scale: [0.92, 1], opacity: [0, 1], duration: 750, ease: AMG_STUDIO_EASES.overshoot, delay: stagger(110) }, start + 200);
    }
  },

  // ========================================================
  // Family 05: System Architecture
  // ========================================================
  'SC-061': {
    id: 'SC-061',
    familyId: '05-system-architecture',
    name: 'Node Graph Pulse',
    vibe: 'نبضات ضوئية تنتقل بين خوادم وقواعد بيانات سحابية',
    defaultDurationMs: 4000,
    template: (data = {}, uid = getNextUid('sc061')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-061-root" data-shot="SC-061" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
          <svg width="1000" height="400" viewBox="0 0 1000 400" fill="none">
            <path id="graph-link-1" d="M 200 200 H 500" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 6"/>
            <path id="graph-link-2" d="M 500 200 L 800 100" stroke="#f59e0b" stroke-width="3" stroke-dasharray="6 6"/>
            <path id="graph-link-3" d="M 500 200 L 800 300" stroke="#10b981" stroke-width="3" stroke-dasharray="6 6"/>
            <circle class="sc-node" cx="200" cy="200" r="40" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
            <circle class="sc-node" cx="500" cy="200" r="50" fill="#0f172a" stroke="#6366f1" stroke-width="4"/>
            <circle class="sc-node" cx="800" cy="100" r="35" fill="#0f172a" stroke="#f59e0b" stroke-width="3"/>
            <circle class="sc-node" cx="800" cy="300" r="35" fill="#0f172a" stroke="#10b981" stroke-width="3"/>
            <circle id="pulse-packet" cx="200" cy="200" r="8" fill="#38bdf8" filter="drop-shadow(0 0 10px #38bdf8)"/>
          </svg>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const nodes = root.querySelectorAll('.sc-node');
      const pulse = root.querySelector('#pulse-packet');

      timeline.add(nodes, { scale: [0, 1], opacity: [0, 1], duration: 600, ease: AMG_STUDIO_EASES.overshoot, delay: stagger(100) }, start);
      timeline.add(pulse, { cx: [200, 500], duration: 700, ease: AMG_STUDIO_EASES.snappyOut }, start + 700);
    }
  },

  'SC-062': {
    id: 'SC-062',
    familyId: '05-system-architecture',
    name: 'Isometric Layer Explode',
    vibe: 'تفكيك طبقات المعالج والسحابة عمودياً في الفضاء ثلاثي الأبعاد',
    defaultDurationMs: 4000,
    template: (data = {}, uid = getNextUid('sc062')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-062-root" data-shot="SC-062" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;perspective:1400px;">
          <div class="sc-iso-stack" style="width:400px;height:400px;position:relative;transform-style:preserve-3d;transform:rotateX(55deg) rotateZ(-45deg);">
            <div class="sc-iso-layer layer-0" style="position:absolute;inset:0;background:rgba(15,23,42,0.9);border:2px solid #38bdf8;border-radius:24px;box-shadow:0 30px 60px rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;color:#38bdf8;font-size:24px;font-weight:bold;">SILICON SUBSTRATE</div>
            <div class="sc-iso-layer layer-1" style="position:absolute;inset:0;background:rgba(99,102,241,0.2);border:2px solid #6366f1;border-radius:24px;display:flex;align-items:center;justify-content:center;color:#6366f1;font-size:24px;font-weight:bold;">LOGIC GATE ARRAY</div>
            <div class="sc-iso-layer layer-2" style="position:absolute;inset:0;background:rgba(245,158,11,0.2);border:2px solid #f59e0b;border-radius:24px;display:flex;align-items:center;justify-content:center;color:#f59e0b;font-size:24px;font-weight:bold;">HIGH-SPEED MEMORY</div>
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const l1 = root.querySelector('.layer-1');
      const l2 = root.querySelector('.layer-2');

      timeline.add(l1, { translateZ: [0, 80], duration: 800, ease: AMG_STUDIO_EASES.overshoot }, start + 300);
      timeline.add(l2, { translateZ: [0, 160], duration: 800, ease: AMG_STUDIO_EASES.overshoot }, start + 500);
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

      if (camera) camera.keyframe(timeline, { scale: 1.05, duration: 1400, ease: AMG_STUDIO_EASES.cinematicSlowMo, start });
      timeline.add(label, { translateY: [-15, 0], opacity: [0, 1], duration: 500, ease: AMG_STUDIO_EASES.snappyOut }, start);
      timeline.add(numberEl, { scale: [0.8, 1], opacity: [0, 1], duration: 400, ease: AMG_STUDIO_EASES.snappyOut }, start + 100);

      const proxy = { val: 0 };
      timeline.add(proxy, {
        val: targetNumber,
        duration: 1500,
        ease: AMG_STUDIO_EASES.snappyOut,
        onUpdate: () => { numberEl.textContent = `${proxy.val.toFixed(1)}${suffix}`; }
      }, start + 150);
      timeline.add(sub, { translateY: [15, 0], opacity: [0, 1], duration: 600, ease: AMG_STUDIO_EASES.snappyOut }, start + 800);
    }
  },

  'SC-077': {
    id: 'SC-077',
    familyId: '06-data-metric-slams',
    name: 'Chart Line Breakout',
    vibe: 'منحنى بياني يخترق سقف المخطط للأعلى بتسارع هائل',
    defaultDurationMs: 3600,
    template: (data = {}, uid = getNextUid('sc077')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-077-root" data-shot="SC-077" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
          <svg width="800" height="400" viewBox="0 0 800 400" fill="none">
            <line x1="100" y1="350" x2="700" y2="350" stroke="#334155" stroke-width="2"/>
            <line x1="100" y1="50" x2="700" y2="50" stroke="#ef4444" stroke-dasharray="4 4" stroke-width="1.5"/>
            <path id="sc-breakout-line" d="M 100 320 Q 250 300 400 240 T 700 20" stroke="#10b981" stroke-width="4" stroke-linecap="round" fill="none" pathLength="100"/>
            <circle id="sc-breakout-dot" cx="700" cy="20" r="10" fill="#10b981" filter="drop-shadow(0 0 16px #10b981)" opacity="0"/>
          </svg>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const line = root.querySelector('#sc-breakout-line');
      const dot = root.querySelector('#sc-breakout-dot');

      timeline.add(line, { strokeDashoffset: [100, 0], duration: 1100, ease: AMG_STUDIO_EASES.snappyOut }, start);
      timeline.add(dot, { scale: [0, 1.4, 1], opacity: [0, 1], duration: 450, ease: AMG_STUDIO_EASES.overshoot }, start + 950);
    }
  },

  // ========================================================
  // Family 07: Comparisons & Versus
  // ========================================================
  'SC-091': {
    id: 'SC-091',
    familyId: '07-comparisons-versus',
    name: 'Wipe Slider Split',
    vibe: 'خط فاصل متحرك يقارن بين الوضع القديم والجديد',
    defaultDurationMs: 3800,
    template: (data = {}, uid = getNextUid('sc091')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-091-root" data-shot="SC-091" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
          <div style="position:relative;width:960px;height:540px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.15);">
            <div class="sc-before-layer" style="position:absolute;inset:0;background:#18181b;display:flex;align-items:center;justify-content:flex-start;padding:60px;">
              <h2 style="font-size:42px;color:#71717a;">قبل: تعقيد وبطء</h2>
            </div>
            <div class="sc-after-layer" style="position:absolute;inset:0;background:#064e3b;display:flex;align-items:center;justify-content:flex-end;padding:60px;clip-path:inset(0 100% 0 0);">
              <h2 style="font-size:42px;color:#34d399;">بعد: سرعة سينمائية</h2>
            </div>
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const afterLayer = root.querySelector('.sc-after-layer');

      timeline.add(afterLayer, { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'], duration: 1200, ease: AMG_STUDIO_EASES.dramaticInOut }, start + 300);
    }
  },

  // ========================================================
  // Family 08: Ecosystem Integrations
  // ========================================================
  'SC-106': {
    id: 'SC-106',
    familyId: '08-ecosystem-integrations',
    name: 'Brand Constellation Orbit',
    vibe: 'شعارات التقنيات تدور ككواكب حول المنصة المركزية',
    defaultDurationMs: 4000,
    template: (data = {}, uid = getNextUid('sc106')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-106-root" data-shot="SC-106" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;perspective:1200px;">
          <div class="sc-orbit-system" style="position:relative;width:500px;height:500px;border-radius:50%;border:1px dashed rgba(56,189,248,0.3);transform-style:preserve-3d;">
            <div class="sc-orbit-center" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;border-radius:50%;background:#0f172a;border:2px solid #38bdf8;box-shadow:0 0 40px #38bdf8;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:28px;">AMG</div>
            <div class="sc-satellite sat-1" style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);width:44px;height:44px;border-radius:50%;background:#38bdf8;box-shadow:0 0 15px #38bdf8;"></div>
            <div class="sc-satellite sat-2" style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);width:44px;height:44px;border-radius:50%;background:#f59e0b;box-shadow:0 0 15px #f59e0b;"></div>
          </div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const orbit = root.querySelector('.sc-orbit-system');

      timeline.add(orbit, { rotateZ: [0, 360], duration: 12000, loop: true, ease: 'linear' }, start);
    }
  },

  // ========================================================
  // Family 09: Kinetic Transitions
  // ========================================================
  'SC-121': {
    id: 'SC-121',
    familyId: '09-kinetic-transitions',
    name: 'Shape Morph Bridge',
    vibe: 'شكل المشهد الحالي يتحول إلى شكل المشهد التالي بسلاسة',
    defaultDurationMs: 3000,
    template: (data = {}, uid = getNextUid('sc121')) => {
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-121-root" data-shot="SC-121" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
          <div class="sc-morph-box" style="width:160px;height:160px;background:#38bdf8;border-radius:50%;box-shadow:0 0 50px rgba(56,189,248,0.5);"></div>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const box = root.querySelector('.sc-morph-box');

      timeline.add(box, {
        borderRadius: ['50%', '16px'],
        scale: [1, 2.2],
        rotateZ: [0, 90],
        duration: 900,
        ease: AMG_STUDIO_EASES.snappyOut
      }, start + 200);
    }
  },

  // ========================================================
  // Family 10: Climax & Outro Lockups
  // ========================================================
  'SC-136': {
    id: 'SC-136',
    familyId: '10-climax-outro-lockups',
    name: 'Tagline Stagger Lockup',
    vibe: 'تجمع أنيق للشعار والعنوان النهائي والروابط',
    defaultDurationMs: 4000,
    template: (data = {}, uid = getNextUid('sc136')) => {
      const title = data.title || 'AMG: المنظومة القياسية لموشن جرافيك الويب';
      return `
        <div id="${uid}" class="amg-shotcraft-scene sc-136-root" data-shot="SC-136" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;">
          <div class="sc-outro-logo" style="width:100px;height:100px;border-radius:28px;background:linear-gradient(135deg,#38bdf8,#6366f1);display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:900;color:#020306;margin-bottom:28px;box-shadow:0 20px 50px rgba(56,189,248,0.3);opacity:0;">AMG</div>
          <h1 class="sc-outro-title" style="font-size:56px;font-weight:800;color:#fff;margin:0 0 16px 0;opacity:0;">${title}</h1>
          <p class="sc-outro-link" style="font-family:var(--amg-font-mono);font-size:20px;color:#94a3b8;margin:0;opacity:0;">github.com/yalaahamdy/AMG</p>
        </div>
      `;
    },
    animate: (timeline, rootElement, { camera, start = 0 } = {}) => {
      const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
      if (!root) return;
      const logo = root.querySelector('.sc-outro-logo');
      const title = root.querySelector('.sc-outro-title');
      const link = root.querySelector('.sc-outro-link');

      timeline.add(logo, { scale: [0.7, 1], opacity: [0, 1], duration: 700, ease: AMG_STUDIO_EASES.overshoot }, start);
      timeline.add(title, { translateY: [20, 0], opacity: [0, 1], duration: 600, ease: AMG_STUDIO_EASES.snappyOut }, start + 250);
      timeline.add(link, { opacity: [0, 1], duration: 500, ease: AMG_STUDIO_EASES.snappyOut }, start + 500);
    }
  },

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

      if (camera) camera.keyframe(timeline, { scale: 1.06, duration: 1200, ease: AMG_STUDIO_EASES.snappyOut, start });
      timeline.add(title, { translateY: [-25, 0], opacity: [0, 1], duration: 700, ease: AMG_STUDIO_EASES.overshoot }, start);
      timeline.add(btnWrapper, { scale: [0.75, 1.05, 1], opacity: [0, 1], duration: 750, ease: AMG_STUDIO_EASES.overshoot }, start + 250);
      timeline.add(glowRing, { scale: [1, 1.8], opacity: [0.8, 0], duration: 1200, ease: AMG_STUDIO_EASES.cinematicSlowMo, loop: true }, start + 450);
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
