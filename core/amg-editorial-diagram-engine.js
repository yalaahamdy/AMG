/**
 * AMG Editorial Diagram Engine (45 Diagram Blueprint System)
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * مستلهم من: cathrynlavery/diagram-design
 * 
 * يقضي على مستنقع المخططات البدائية (Anti-Mermaid Slop):
 * 1. حسابات هندسية ورياضية دقيقة لمواقع العقد ومسارات التوصيل المنحنية.
 * 2. تباين لوني تحريري فائق الجودة متوافق مع معايير الصحافة البصرية (Vox/Bloomberg).
 * 3. سيناريو حركي متكامل لسريان البيانات ونبضات العقد التتابعية.
 */

import { AMG_STUDIO_EASES } from './amg-studio-physics.js';
import { drawSVG } from './amg-svg-utils.js';
import { stagger } from './vendor/anime.esm.js';

let _diagUidCounter = 1;
function getDiagUid(prefix = 'diag') {
  return `${prefix}-${Date.now().toString(36)}-${(_diagUidCounter++).toString(36)}`;
}

export class AMGEditorialDiagramEngine {
  // ========================================================
  // 1. معمارية الخدمات المصغرة (Microservices Mesh Diagram)
  // ========================================================
  static createMicroservicesMesh({
    gateway = { title: 'API Gateway', sub: 'Reverse Proxy & Auth' },
    services = [
      { id: 'auth', title: 'Auth Service', sub: 'JWT & OAuth2', color: '#38bdf8' },
      { id: 'billing', title: 'Billing Engine', sub: 'Stripe & Ledger', color: '#10b981' },
      { id: 'analytics', title: 'Analytics Core', sub: 'Clickstream & OLAP', color: '#f59e0b' }
    ],
    database = { title: 'PostgreSQL Cluster', sub: 'Distributed Multi-Region' },
    width = 1100,
    height = 550,
    uid = getDiagUid('mesh')
  } = {}) {
    const gwX = 140, gwY = height / 2;
    const dbX = width - 140, dbY = height / 2;
    const srvX = width / 2;

    const srvSpacing = height / (services.length + 1);

    const connectorsSvg = services.map((s, idx) => {
      const srvY = srvSpacing * (idx + 1);
      return `
        <!-- Gateway to Service -->
        <path class="diag-connector" data-amg-role="connector" d="M ${gwX + 90} ${gwY} C ${gwX + 200} ${gwY}, ${srvX - 120} ${srvY}, ${srvX - 90} ${srvY}" stroke="${s.color}" stroke-width="2.5" stroke-dasharray="6 6" fill="none" opacity="0.6"/>
        <circle class="diag-pulse pulse-gw-${idx}" cx="${gwX + 90}" cy="${gwY}" r="5" fill="${s.color}" filter="drop-shadow(0 0 8px ${s.color})"/>
        <!-- Service to DB -->
        <path class="diag-connector" data-amg-role="connector" d="M ${srvX + 90} ${srvY} C ${srvX + 160} ${srvY}, ${dbX - 160} ${dbY}, ${dbX - 90} ${dbY}" stroke="${s.color}" stroke-width="2.5" stroke-dasharray="6 6" fill="none" opacity="0.6"/>
        <circle class="diag-pulse pulse-db-${idx}" cx="${srvX + 90}" cy="${srvY}" r="5" fill="${s.color}" filter="drop-shadow(0 0 8px ${s.color})"/>
      `;
    }).join('');

    return `
      <div id="${uid}" class="amg-editorial-diagram diag-microservices-mesh" style="position:relative;width:${width}px;height:${height}px;margin:auto;">
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="position:absolute;inset:0;pointer-events:none;">
          ${connectorsSvg}
        </svg>

        <!-- Gateway Node -->
        <div class="diag-node diag-gateway" style="position:absolute;left:${gwX - 90}px;top:${gwY - 55}px;width:180px;height:110px;border-radius:20px;background:rgba(15,23,42,0.92);border:2px solid #38bdf8;padding:16px;box-shadow:0 20px 40px rgba(0,0,0,0.7),0 0 30px rgba(56,189,248,0.2);display:flex;flex-direction:column;justify-content:center;text-align:center;">
          <span style="font-family:var(--amg-font-mono);font-size:11px;color:#38bdf8;font-weight:bold;letter-spacing:1px;margin-bottom:4px;">ENTRYPOINT</span>
          <h4 style="font-size:18px;color:#fff;margin:0 0 4px 0;font-weight:800;">${gateway.title}</h4>
          <span style="font-size:12px;color:#94a3b8;">${gateway.sub}</span>
        </div>

        <!-- Services Column -->
        ${services.map((s, idx) => {
          const srvY = srvSpacing * (idx + 1);
          return `
            <div class="diag-node diag-service" data-srv-id="${s.id}" style="position:absolute;left:${srvX - 90}px;top:${srvY - 50}px;width:180px;height:100px;border-radius:18px;background:rgba(15,23,42,0.92);border:2px solid ${s.color};padding:14px;box-shadow:0 15px 35px rgba(0,0,0,0.6);display:flex;flex-direction:column;justify-content:center;text-align:center;">
              <span style="font-family:var(--amg-font-mono);font-size:10px;color:${s.color};font-weight:bold;margin-bottom:4px;">SERVICE [0${idx + 1}]</span>
              <h4 style="font-size:16px;color:#fff;margin:0 0 4px 0;font-weight:700;">${s.title}</h4>
              <span style="font-size:11px;color:#94a3b8;">${s.sub}</span>
            </div>
          `;
        }).join('')}

        <!-- Database Node -->
        <div class="diag-node diag-database" style="position:absolute;left:${dbX - 90}px;top:${dbY - 55}px;width:180px;height:110px;border-radius:20px;background:rgba(15,23,42,0.92);border:2px solid #6366f1;padding:16px;box-shadow:0 20px 40px rgba(0,0,0,0.7),0 0 30px rgba(99,102,241,0.2);display:flex;flex-direction:column;justify-content:center;text-align:center;">
          <span style="font-family:var(--amg-font-mono);font-size:11px;color:#6366f1;font-weight:bold;letter-spacing:1px;margin-bottom:4px;">PERSISTENCE</span>
          <h4 style="font-size:18px;color:#fff;margin:0 0 4px 0;font-weight:800;">${database.title}</h4>
          <span style="font-size:12px;color:#94a3b8;">${database.sub}</span>
        </div>
      </div>
    `;
  }

  static animateMicroservicesMesh(timeline, rootElement, { start = 0, camera } = {}) {
    const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
    if (!root) return;

    const nodes = root.querySelectorAll('.diag-node');
    const connectors = root.querySelectorAll('.diag-connector');
    const pulses = root.querySelectorAll('.diag-pulse');

    if (camera) {
      camera.keyframe(timeline, { scale: 1.04, duration: 1500, ease: AMG_STUDIO_EASES.cinematicSlowMo, start });
    }

    // 1. دخول العقد
    timeline.add(nodes, {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 650,
      ease: AMG_STUDIO_EASES.overshoot,
      delay: stagger(100)
    }, start);

    // 2. ظهور مسارات الربط
    timeline.add(connectors, {
      opacity: [0, 0.7],
      duration: 700,
      ease: AMG_STUDIO_EASES.snappyOut
    }, start + 300);

    // 3. نبضات البيانات الحية
    timeline.add(pulses, {
      scale: [0.5, 1.4, 1],
      opacity: [0, 1, 0.5],
      duration: 800,
      loop: true,
      ease: 'linear'
    }, start + 600);
  }

  // ========================================================
  // 2. شريط التقدم المرحلي التحريري (Linear Stepper Diagram)
  // ========================================================
  static createLinearStepper({
    steps = [
      { step: '01', title: 'التخطيط وتفكيك الأفكار', state: 'done' },
      { step: '02', title: 'تصميم اللوحات الثابتة', state: 'done' },
      { step: '03', title: 'الكوريغرافيه والتحريك الفيزيائي', state: 'active' },
      { step: '04', title: 'المعاينة والإخراج النهائي', state: 'pending' }
    ],
    width = 1100,
    uid = getDiagUid('stepper')
  } = {}) {
    return `
      <div id="${uid}" class="amg-editorial-diagram diag-linear-stepper" style="position:relative;width:${width}px;margin:auto;display:flex;align-items:center;justify-content:space-between;padding:40px 0;">
        <div class="stepper-line-bg" style="position:absolute;top:50%;left:40px;right:40px;height:4px;background:rgba(255,255,255,0.1);transform:translateY(-50%);z-index:1;"></div>
        <div class="stepper-line-fill" style="position:absolute;top:50%;left:40px;width:66%;height:4px;background:linear-gradient(90deg,#38bdf8,#10b981);transform:translateY(-50%);z-index:2;filter:drop-shadow(0 0 8px #38bdf8);"></div>

        ${steps.map((st, i) => {
          const isActive = st.state === 'active';
          const isDone = st.state === 'done';
          const color = isDone ? '#10b981' : (isActive ? '#38bdf8' : '#64748b');
          return `
            <div class="stepper-step" style="position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;text-align:center;width:220px;">
              <div class="step-badge" style="width:54px;height:54px;border-radius:50%;background:#090d16;border:3px solid ${color};display:flex;align-items:center;justify-content:center;font-family:var(--amg-font-mono);font-size:18px;font-weight:900;color:${color};box-shadow:0 10px 25px rgba(0,0,0,0.8),0 0 20px ${color}33;margin-bottom:14px;">
                ${isDone ? '✓' : st.step}
              </div>
              <h5 style="font-size:16px;color:#fff;margin:0;font-weight:700;line-height:1.4;">${st.title}</h5>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  static animateLinearStepper(timeline, rootElement, { start = 0 } = {}) {
    const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
    if (!root) return;

    const fillLine = root.querySelector('.stepper-line-fill');
    const badges = root.querySelectorAll('.step-badge');

    timeline.add(fillLine, {
      width: ['0%', '66%'],
      duration: 1100,
      ease: AMG_STUDIO_EASES.snappyOut
    }, start);

    timeline.add(badges, {
      scale: [0.6, 1.15, 1],
      opacity: [0, 1],
      duration: 650,
      ease: AMG_STUDIO_EASES.overshoot,
      delay: stagger(140)
    }, start + 150);
  }

  // ========================================================
  // 3. مصفوفة التحليل الاستراتيجي 2x2 (Quadrant 2x2 Matrix)
  // ========================================================
  static createQuadrantMatrix({
    xAxis = 'السرعة وزمن التنفيذ',
    yAxis = 'الجودة والعمق السينمائي',
    quadrants = [
      { id: 'q1', name: 'الاستوديوهات التقليدية', desc: 'جودة عالية لكن ببطء وتكلفة خيالية', color: '#f59e0b', top: '15%', left: '15%' },
      { id: 'q2', name: 'AMG: المنظومة الخارقة', desc: 'سينما فائقة بـ HTML النقي وسرعة إطارية', color: '#38bdf8', top: '15%', left: '60%' },
      { id: 'q3', name: 'القوالب البدائية الجاهزة', desc: 'بطيئة وسطحية ورتيبة', color: '#ef4444', top: '60%', left: '15%' },
      { id: 'q4', name: 'الذكاء الاصطناعي العشوائي', desc: 'سريع لكن بنتائج مكسورة ومليئة بالأخطاء', color: '#94a3b8', top: '60%', left: '60%' }
    ],
    size = 600,
    uid = getDiagUid('quad')
  } = {}) {
    return `
      <div id="${uid}" class="amg-editorial-diagram diag-quadrant-matrix" style="position:relative;width:${size}px;height:${size}px;margin:auto;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.12);border-radius:28px;padding:30px;box-shadow:0 30px 80px rgba(0,0,0,0.8);">
        <!-- Axes Lines -->
        <svg width="100%" height="100%" viewBox="0 0 ${size} ${size}" style="position:absolute;inset:0;pointer-events:none;">
          <line x1="50" y1="${size / 2}" x2="${size - 50}" y2="${size / 2}" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="${size / 2}" y1="50" x2="${size / 2}" y2="${size - 50}" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4"/>
        </svg>

        <!-- Quadrant Cards -->
        ${quadrants.map(q => `
          <div class="diag-quad-item quad-${q.id}" style="position:absolute;top:${q.top};left:${q.left};width:200px;background:rgba(11,15,25,0.9);border:1.5px solid ${q.color};border-radius:18px;padding:16px;box-shadow:0 10px 25px rgba(0,0,0,0.6);text-align:right;">
            <div style="font-size:15px;font-weight:800;color:${q.color};margin-bottom:6px;">${q.name}</div>
            <div style="font-size:12px;color:#94a3b8;line-height:1.4;">${q.desc}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  static animateQuadrantMatrix(timeline, rootElement, { start = 0 } = {}) {
    const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
    if (!root) return;

    const cards = root.querySelectorAll('.diag-quad-item');
    const heroCard = root.querySelector('.quad-q2');

    timeline.add(cards, {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 650,
      ease: AMG_STUDIO_EASES.overshoot,
      delay: stagger(100)
    }, start);

    if (heroCard) {
      timeline.add(heroCard, {
        scale: [1, 1.08, 1],
        boxShadow: ['0 10px 25px rgba(0,0,0,0.6)', '0 20px 50px rgba(56,189,248,0.4)', '0 15px 35px rgba(56,189,248,0.2)'],
        duration: 700,
        ease: AMG_STUDIO_EASES.overshoot
      }, start + 700);
    }
  }

  // ========================================================
  // 4. البصلة المعمارية المتراكزة (Concentric Onion Layers)
  // ========================================================
  static createConcentricOnion({
    layers = [
      { name: 'الأجهزة والسيليكون', color: '#1e293b', r: 240 },
      { name: 'نواة المتصفح وDOM', color: '#0f172a', r: 180 },
      { name: 'محرك التحريك Anime & D3', color: '#1e1b4b', r: 120 },
      { name: 'AMG: المخرج الإبداعي', color: '#0284c7', r: 60 }
    ],
    size = 540,
    uid = getDiagUid('onion')
  } = {}) {
    return `
      <div id="${uid}" class="amg-editorial-diagram diag-concentric-onion" style="position:relative;width:${size}px;height:${size}px;margin:auto;display:flex;align-items:center;justify-content:center;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
          ${layers.map((l, i) => `
            <circle class="diag-onion-ring" cx="${size / 2}" cy="${size / 2}" r="${l.r}" fill="${l.color}" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.4" style="filter:drop-shadow(0 10px 20px rgba(0,0,0,0.6));"/>
            <text class="diag-onion-text" x="${size / 2}" y="${size / 2 - l.r + 28}" fill="#94a3b8" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui">${l.name}</text>
          `).join('')}
        </svg>
      </div>
    `;
  }

  static animateConcentricOnion(timeline, rootElement, { start = 0 } = {}) {
    const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
    if (!root) return;

    const rings = root.querySelectorAll('.diag-onion-ring');
    const texts = root.querySelectorAll('.diag-onion-text');

    timeline.add(rings, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      ease: AMG_STUDIO_EASES.overshoot,
      delay: stagger(110)
    }, start);

    timeline.add(texts, {
      opacity: [0, 1],
      duration: 500,
      ease: AMG_STUDIO_EASES.snappyOut,
      delay: stagger(80)
    }, start + 400);
  }
}
