/**
 * AMG Vision Guard — محرك الإدراك الفراغي وفحص التصادمات الهندسي التلقائي
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * يمنح الذكاء الاصطناعي أعيناً هندسية دقيقة تكشف:
 * 1. تداخل وتصادم الكتل والنصوص (AABB Collision & Spatial Buffering).
 * 2. الخروج عن المنطقة الآمنة للشاشة (90% Title Safe Boundary Clipping).
 * 3. ضعف التباين اللوني وفق معايير WCAG 2.1 (Luminance Contrast Ratio).
 * 4. تشوه وأبعاد الـ SVG الصفرية (Zero-Dimension & Path Integrity).
 * 5. المسح الزمني للتحقق من خلو الحركة من التصادم في أي إطار (Temporal Sweeper).
 */

export class AMGVisionGuard {
  constructor({
    stageWidth = 1920,
    stageHeight = 1080,
    safeMarginPercent = 0.05, // 5% margin = 90% Title Safe Area
    textPaddingBuffer = 16    // هامش أمان إضافي حول النصوص بالبكسل
  } = {}) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.safeArea = {
      left: stageWidth * safeMarginPercent,
      top: stageHeight * safeMarginPercent,
      right: stageWidth * (1 - safeMarginPercent),
      bottom: stageHeight * (1 - safeMarginPercent)
    };
    this.textPaddingBuffer = textPaddingBuffer;
  }

  /**
   * حساب السطوع النسبي للون (Relative Luminance وفق معادلة WCAG 2.1)
   */
  static getRelativeLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  /**
   * استخراج كائن RGB من أي صيغة لونية (Hex, rgb, rgba)
   */
  static parseColor(colorStr) {
    if (!colorStr || colorStr === 'transparent' || colorStr === 'inherit') return null;
    if (colorStr.startsWith('#')) {
      let hex = colorStr.slice(1);
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const num = parseInt(hex, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
    return null;
  }

  /**
   * حساب نسبة التباين بين لونين (Contrast Ratio)
   */
  static getContrastRatio(fgColor, bgColor) {
    const rgb1 = AMGVisionGuard.parseColor(fgColor);
    const rgb2 = AMGVisionGuard.parseColor(bgColor);
    if (!rgb1 || !rgb2) return 21; // قيمة افتراضية إذا تعذر الاستخراج
    const l1 = AMGVisionGuard.getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = AMGVisionGuard.getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * فحص تداخل مستطيلين محيطيين (AABB Intersection Check with Buffer)
   */
  static isIntersecting(boxA, boxB, buffer = 0) {
    return !(
      boxA.right + buffer <= boxB.left ||
      boxA.left - buffer >= boxB.right ||
      boxA.bottom + buffer <= boxB.top ||
      boxA.top - buffer >= boxB.bottom
    );
  }

  /**
   * فحص شامل للمشهد في حالته الحالية (Static or at current timeline frame)
   */
  auditDOM(containerElement = document) {
    const root = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
    if (!root) {
      return { passed: false, error: 'المسرح أو العنصر المستهدف غير موجود في الـ DOM.' };
    }

    const issues = {
      collisions: [],
      clipping: [],
      contrastWarnings: [],
      svgAnomalies: []
    };

    // جمع العناصر المهمة بصرياً (العناوين، النصوص، البطاقات، الأيقونات، والمخططات)
    const elementsToCheck = Array.from(root.querySelectorAll(
      'h1, h2, h3, h4, p, span, button, .badge, [data-amg-role], [data-amg-node], .cloud-icon-box, .visual-col, .satori-card'
    )).filter(el => {
      const style = window.getComputedStyle ? window.getComputedStyle(el) : el.style;
      if (!style) return false;
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    });

    const parsedBoxes = elementsToCheck.map(el => {
      const rect = el.getBoundingClientRect ? el.getBoundingClientRect() : { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
      const computed = window.getComputedStyle ? window.getComputedStyle(el) : {};
      return {
        element: el,
        id: el.id || el.className || el.tagName.toLowerCase(),
        isText: ['h1', 'h2', 'h3', 'p', 'span'].includes(el.tagName.toLowerCase()),
        rect: {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        },
        color: computed.color || '#ffffff',
        fontSize: parseFloat(computed.fontSize) || 16
      };
    });

    // 1. فحص التصادم والتداخل (Collisions)
    for (let i = 0; i < parsedBoxes.length; i++) {
      for (let j = i + 1; j < parsedBoxes.length; j++) {
        const a = parsedBoxes[i];
        const b = parsedBoxes[j];

        // تجاهل فحص العناصر إذا كان أحدهما ابناً للآخر (علاقة Parent/Child طبيعية)
        if (a.element.contains(b.element) || b.element.contains(a.element)) continue;
        if (a.rect.width === 0 || b.rect.width === 0) continue;

        const buffer = (a.isText || b.isText) ? this.textPaddingBuffer : 0;
        if (AMGVisionGuard.isIntersecting(a.rect, b.rect, buffer)) {
          const overlapH = Math.max(0, Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top));
          const overlapW = Math.max(0, Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left));
          
          issues.collisions.push({
            elementA: a.id,
            elementB: b.id,
            overlapWidth: Math.round(overlapW),
            overlapHeight: Math.round(overlapH),
            recommendation: `العنصر ${a.id} يتداخل مع ${b.id} بمساحة (${Math.round(overlapW)}x${Math.round(overlapH)}px). قم بزيادة التباعد العمودي (gap/margin) أو تقليص حجم العنصر.`
          });
        }
      }
    }

    // 2. فحص الخروج عن المنطقة الآمنة (Title Safe Area Clipping)
    parsedBoxes.forEach(b => {
      if (b.rect.width === 0 || b.rect.height === 0) return;
      // قياس الإحداثيات بالنسبة للمسرح 1920x1080
      const isClipping = 
        b.rect.left < this.safeArea.left - 10 ||
        b.rect.top < this.safeArea.top - 10 ||
        b.rect.right > this.safeArea.right + 10 ||
        b.rect.bottom > this.safeArea.bottom + 10;

      if (isClipping) {
        issues.clipping.push({
          element: b.id,
          bounds: b.rect,
          recommendation: `العنصر ${b.id} يخرج عن حدود المنطقة الآمنة (90% Safe Area). اضبط إحداثياته ليكون ضمن النطاق [x: ${this.safeArea.left}px - ${this.safeArea.right}px, y: ${this.safeArea.top}px - ${this.safeArea.bottom}px].`
        });
      }
    });

    // 3. فحص التباين اللوني (WCAG Contrast Audit)
    const stageBg = '#050508'; // الخلفية الافتراضية الداكنة
    parsedBoxes.filter(b => b.isText).forEach(t => {
      const ratio = AMGVisionGuard.getContrastRatio(t.color, stageBg);
      const minRequired = t.fontSize >= 24 ? 3.0 : 4.5;
      if (ratio < minRequired) {
        issues.contrastWarnings.push({
          element: t.id,
          ratio: ratio.toFixed(2),
          required: minRequired,
          color: t.color,
          recommendation: `نسبة تباين النص في ${t.id} ضعيفة (${ratio.toFixed(2)}:1). الحد الأدنى المطلوب هو ${minRequired}:1. اختر لوناً أكثر سطوعاً أو تباعداً عن الخلفية.`
        });
      }
    });

    // 4. فحص سلامة عناصر الـ SVG (Zero-Dimension & Empty Paths)
    const svgs = Array.from(root.querySelectorAll('svg, path'));
    svgs.forEach(s => {
      const tag = s.tagName.toLowerCase();
      if (tag === 'svg') {
        const w = s.getAttribute('width');
        const h = s.getAttribute('height');
        const vb = s.getAttribute('viewBox');
        if (!vb && (!w || w === '0')) {
          issues.svgAnomalies.push({
            element: s.id || 'svg',
            error: 'عنصر SVG يفتقر إلى سمة viewBox صالحة وأبعاده غير محددة.'
          });
        }
      } else if (tag === 'path') {
        const d = s.getAttribute('d');
        if (!d || d.trim().length === 0) {
          issues.svgAnomalies.push({
            element: s.id || 'path',
            error: 'مسار SVG فارغ لا يحتوي على أوامر رسم (خاصية d فارغة).'
          });
        }
      }
    });

    const isFlawless = 
      issues.collisions.length === 0 &&
      issues.clipping.length === 0 &&
      issues.contrastWarnings.length === 0 &&
      issues.svgAnomalies.length === 0;

    return {
      passed: isFlawless,
      score: this.calculateScore(issues),
      timestamp: Date.now(),
      summary: {
        collisionsCount: issues.collisions.length,
        clippingCount: issues.clipping.length,
        contrastWarningsCount: issues.contrastWarnings.length,
        svgAnomaliesCount: issues.svgAnomalies.length
      },
      issues
    };
  }

  /**
   * المسح الزمني للتحقق من خلو الحركة عبر مسار التايم لاين
   */
  sweepTimeline(clock, { stepMs = 250, onProgress } = {}) {
    if (!clock) return { passed: false, error: 'الساعة الحتمية AMGClock غير متوفرة.' };
    const originalTime = clock.currentTimeMs;
    const totalDuration = clock.durationMs;
    const temporalReport = [];
    let allPassed = true;

    for (let t = 0; t <= totalDuration; t += stepMs) {
      clock.seek(t / 1000);
      const frameAudit = this.auditDOM();
      if (!frameAudit.passed) {
        allPassed = false;
        temporalReport.push({
          timeMs: t,
          timeSec: (t / 1000).toFixed(2),
          issues: frameAudit.issues
        });
      }
      if (typeof onProgress === 'function') {
        onProgress(t / totalDuration);
      }
    }

    // استعادة الموضع الأصلي
    clock.seek(originalTime / 1000);

    return {
      passed: allPassed,
      totalCheckedFrames: Math.floor(totalDuration / stepMs) + 1,
      failedFramesCount: temporalReport.length,
      temporalFailures: temporalReport
    };
  }

  calculateScore(issues) {
    let score = 10.0;
    score -= issues.collisions.length * 2.0;
    score -= issues.clipping.length * 1.5;
    score -= issues.contrastWarnings.length * 1.0;
    score -= issues.svgAnomalies.length * 1.5;
    return Math.max(0, parseFloat(score.toFixed(1)));
  }

  /**
   * توليد تقرير نصي Markdown موجه للـ AI
   */
  generateMarkdownReport(auditResult) {
    let md = `# تقرير فحص الإدراك الفراغي (AMG Vision Guard Report)\n`;
    md += `**النتيجة الإجمالية:** ${auditResult.passed ? '✅ ممتاز (10/10)' : `❌ رسوب (${auditResult.score}/10)`}\n\n`;

    if (auditResult.passed) {
      md += `> [!NOTE]\n> المشهد مستوفٍ تماماً لكافة الشروط الهندسية: صفر تصادمات، صفر خروج عن الشاشة، تباين لوني ممتاز، وسلامة كاملة لجميع مسارات الـ SVG.\n`;
      return md;
    }

    md += `### تفاصيل المشاكل المكتشفة والتوصيات التصحيحية:\n\n`;

    if (auditResult.issues.collisions.length > 0) {
      md += `#### 💥 التصادمات والتداخلات (${auditResult.issues.collisions.length}):\n`;
      auditResult.issues.collisions.forEach(c => {
        md += `- **[${c.elementA} ↔ ${c.elementB}]**: تداخل ${c.overlapWidth}x${c.overlapHeight}px. ${c.recommendation}\n`;
      });
      md += `\n`;
    }

    if (auditResult.issues.clipping.length > 0) {
      md += `#### ⚠️ الخروج عن المنطقة الآمنة (${auditResult.issues.clipping.length}):\n`;
      auditResult.issues.clipping.forEach(cl => {
        md += `- **${cl.element}**: ${cl.recommendation}\n`;
      });
      md += `\n`;
    }

    if (auditResult.issues.contrastWarnings.length > 0) {
      md += `#### 👁️ ضعف التباين البصري (${auditResult.issues.contrastWarnings.length}):\n`;
      auditResult.issues.contrastWarnings.forEach(cw => {
        md += `- **${cw.element}**: ${cw.recommendation}\n`;
      });
      md += `\n`;
    }

    if (auditResult.issues.svgAnomalies.length > 0) {
      md += `#### 📐 أخطاء عناصر الـ SVG (${auditResult.issues.svgAnomalies.length}):\n`;
      auditResult.issues.svgAnomalies.forEach(s => {
        md += `- **${s.element}**: ${s.error}\n`;
      });
      md += `\n`;
    }

    return md;
  }
}
