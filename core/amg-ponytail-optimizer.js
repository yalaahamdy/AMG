/**
 * AMG Ponytail Optimizer & Anti-Bloat Guard
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * مستلهم من: DietrichGebert/ponytail
 * 
 * يحمي المستودع من التضخم البرمجي وهلوسة وسوم DOM:
 * 1. حساب وفرض حد أقصى لعمق شجرة DOM (<= 5 مستويات كما في AGENTS.md).
 * 2. قياس كثافة العقد وكشف تكرار التنسيقات الفردية.
 * 3. رصد وإزالة إطارات CSS الميتة (@keyframes غير المنضبطة).
 * 4. تقليص الأرقام العشرية الزائدة في مسارات SVG لتوفير التوكنات والذاكرة.
 */

export class AMGPonytailOptimizer {
  /**
   * حساب أقصى عمق حقيقي لشجرة DOM للمشهد الداخلي
   */
  static calculateDOMDepth(node) {
    if (!node || !node.children || node.children.length === 0) {
      return 1;
    }
    // عناصر SVG الداخلية لا تشكل صناديق تخطيط DOM بل مسارات رسم
    if (node.tagName && node.tagName.toLowerCase() === 'svg') {
      return 1;
    }
    let maxChildDepth = 0;
    for (const child of node.children) {
      if (child.tagName === 'STYLE' || child.tagName === 'SCRIPT') continue;
      const d = this.calculateDOMDepth(child);
      if (d > maxChildDepth) maxChildDepth = d;
    }
    return 1 + maxChildDepth;
  }

  /**
   * تحليل بنية المشهد وإنتاج تقرير الكفاءة
   */
  static analyzeSceneHTML(htmlString) {
    const report = {
      maxDepth: 1,
      nodeCount: 0,
      hasDeadKeyframes: false,
      svgPrecisionIssues: 0,
      score: 100,
      warnings: []
    };

    if (!htmlString || typeof htmlString !== 'string') return report;

    // 1. فحص كتل CSS @keyframes الميتة (التي تخالف الحتمية الزمنية لـ AMG)
    if (/@keyframes\s+[\w-]+\s*\{/i.test(htmlString)) {
      report.hasDeadKeyframes = true;
      report.warnings.push('تم رصد كتل CSS @keyframes ميتة. يفضل ربط التحريك دائماً بجدول AMG.masterTimeline لضمان الحتمية الزمنية.');
      report.score -= 20;
    }

    // 2. فحص الأرقام العشرية المفرطة في مسارات SVG (أكثر من خانتين عشريتين)
    const excessiveDecimals = htmlString.match(/\d+\.\d{3,}/g);
    if (excessiveDecimals && excessiveDecimals.length > 5) {
      report.svgPrecisionIssues = excessiveDecimals.length;
      report.warnings.push(`تم رصد (${excessiveDecimals.length}) رقم عشري مفرط الدقة في مسارات SVG. تقليصها إلى خانتين يوفر حتى 30% من التوكنات.`);
      report.score -= 15;
    }

    // 3. تقدير عمق DOM التقريبي عبر خوارزمية تداخل الوسوم في النص
    const tagStack = [];
    let currentDepth = 0;
    let maxTextDepth = 0;
    let totalTags = 0;

    const tagRegex = /<\/?([a-zA-Z0-9-]+)(?:\s+[^>]*?)?(\/?)>/g;
    let match;
    while ((match = tagRegex.exec(htmlString)) !== null) {
      const isClosing = match[0].startsWith('</');
      const isSelfClosing = match[2] === '/' || ['img', 'br', 'hr', 'input', 'line', 'circle', 'path', 'rect', 'polygon', 'ellipse'].includes(match[1].toLowerCase());
      const tagName = match[1].toLowerCase();

      // استثناء ترويسات الصفحة ومسارات SVG الداخلية وحاويات المسرح من عمق المشهد الفعلي
      if (['html', 'head', 'body', 'style', 'script', 'meta', 'title', 'link', 'g', 'defs', 'filter', 'feGaussianBlur', 'feMerge', 'feMergeNode'].includes(tagName)) continue;
      
      // استثناء إطار المسرح الرئيسي والكاميرا باعتبارهما هيكل الحاوية الثابت
      if (match[0].includes('amg-stage') || match[0].includes('amg-camera-rig')) continue;

      totalTags++;

      if (isSelfClosing) {
        // وسم ذاتي الإغلاق
      } else if (isClosing) {
        if (tagStack.length > 0 && tagStack[tagStack.length - 1] === tagName) {
          tagStack.pop();
          currentDepth--;
        }
      } else {
        tagStack.push(tagName);
        currentDepth++;
        if (currentDepth > maxTextDepth) {
          maxTextDepth = currentDepth;
        }
      }
    }

    report.maxDepth = Math.max(1, maxTextDepth);
    report.nodeCount = Math.round(totalTags / 2);

    if (report.maxDepth > 5) {
      report.warnings.push(`عمق شجرة DOM يبلغ (${report.maxDepth}) وهو يتجاوز الحد الأقصى المسموح به في AGENTS.md (عمق <= 5). قم بتبسيط التداخل.`);
      report.score -= 25;
    }

    if (report.nodeCount > 70) {
      report.warnings.push(`عدد عناصر المشهد (${report.nodeCount}) مرتفع نسبياً. يفضل أن لا يتجاوز المشهد الواحد 60 عنصراً وفق مبدأ Ponytail.`);
      report.score -= 10;
    }

    report.score = Math.max(0, Math.min(100, report.score));
    return report;
  }

  /**
   * ضغط وترشيد كود المشهد تلقائياً
   */
  static compactSceneHTML(htmlString) {
    if (!htmlString || typeof htmlString !== 'string') return htmlString;

    let compacted = htmlString;

    // 1. تقليص الأرقام العشرية الزائدة في مسارات SVG إلى خانتين فقط
    compacted = compacted.replace(/(\d+)\.(\d{2})\d+/g, '$1.$2');

    // 2. إزالة المسافات المتكررة داخل مسارات SVG path d="..."
    compacted = compacted.replace(/d="([^"]+)"/g, (match, pathStr) => {
      const cleanPath = pathStr.replace(/\s+/g, ' ').trim();
      return `d="${cleanPath}"`;
    });

    return compacted;
  }
}
