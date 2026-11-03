#!/usr/bin/env node
/**
 * AMG Autonomous Critic & Quality Evaluator CLI
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * Usage: node scripts/amg-critic.mjs <project-slug>
 * Example: node scripts/amg-critic.mjs amg-flagship-showcase
 */

import fs from 'node:fs';
import path from 'node:path';
import { AMGPonytailOptimizer } from '../core/amg-ponytail-optimizer.js';

const projectSlug = process.argv[2] || 'amg-flagship-showcase';
const projectDir = path.resolve('workspace', projectSlug);

if (!fs.existsSync(projectDir)) {
  console.error(`[AMG Critic Error] مجلد المشروع غير موجود: ${projectDir}`);
  process.exit(1);
}

console.log('=======================================================');
console.log(`🧐 [AMG Critic] بدء التقييم النقدي المستقل للمشروع: ${projectSlug}`);
console.log('=======================================================\n');

let totalScore = 0;
const critiqueResults = {
  spatialScore: 20,
  ponytailScore: 20,
  physicsScore: 20,
  typographyScore: 20,
  continuityScore: 20,
  findings: []
};

// ----------------------------------------------------
// 1. المحور الأول: الإدراك الفراغي والأمان البصري (20 نقطة)
// ----------------------------------------------------
const styleframeDir = path.join(projectDir, 'stage-05-styleframes');
if (fs.existsSync(styleframeDir)) {
  const files = fs.readdirSync(styleframeDir).filter(f => f.endsWith('.html'));
  let contrastIssues = 0;
  let svgIssues = 0;
  files.forEach(f => {
    const c = fs.readFileSync(path.join(styleframeDir, f), 'utf-8');
    if (c.includes('<svg') && !c.includes('viewBox')) svgIssues++;
    if (c.includes('color: #050508') && !c.includes('background') && !c.includes('#38bdf8')) contrastIssues++;
  });
  if (svgIssues > 0) {
    critiqueResults.spatialScore -= 10;
    critiqueResults.findings.push(`[الإدراك الفراغي] وُجدت (${svgIssues}) عناصر SVG تفتقر لسمة viewBox.`);
  }
  if (contrastIssues > 0) {
    critiqueResults.spatialScore -= 5;
    critiqueResults.findings.push(`[التباين البصري] وُجدت نصوص داكنة تفتقر إلى خلفية فاتحة تحمي قراءتها.`);
  }
} else {
  critiqueResults.spatialScore -= 10;
  critiqueResults.findings.push('[الإدراك الفراغي] مجلد اللوحات الثابتة غير مكتمل.');
}
totalScore += critiqueResults.spatialScore;

// ----------------------------------------------------
// 2. المحور الثاني: رشاقة شجرة DOM وعمق Ponytail (20 نقطة)
// ----------------------------------------------------
const htmlFiles = [];
const findHtml = (dir) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(f => {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) findHtml(full);
      else if (f.endsWith('.html')) htmlFiles.push(full);
    });
  }
};
findHtml(projectDir);

let maxProjectDepth = 0;
htmlFiles.forEach(file => {
  const c = fs.readFileSync(file, 'utf-8');
  const r = AMGPonytailOptimizer.analyzeSceneHTML(c);
  if (r.maxDepth > maxProjectDepth) maxProjectDepth = r.maxDepth;
  if (r.maxDepth > 5) {
    critiqueResults.ponytailScore -= 5;
    critiqueResults.findings.push(`[رشاقة DOM] الملف ${path.basename(file)} تجاوز عمق 5 مستويات (العمق: ${r.maxDepth}).`);
  }
});
critiqueResults.ponytailScore = Math.max(0, critiqueResults.ponytailScore);
totalScore += critiqueResults.ponytailScore;

// ----------------------------------------------------
// 3. المحور الثالث: انضباط فيزياء الحركة ونبذ التصلب (20 نقطة)
// ----------------------------------------------------
const motionDir = path.join(projectDir, 'stage-06-motion-scenes');
if (fs.existsSync(motionDir)) {
  const mFiles = fs.readdirSync(motionDir).filter(f => f.endsWith('.html'));
  let linearCount = 0;
  mFiles.forEach(f => {
    const c = fs.readFileSync(path.join(motionDir, f), 'utf-8');
    if (c.includes("ease: 'linear'") || c.includes('ease: "linear"')) linearCount++;
  });
  if (linearCount > 0) {
    critiqueResults.physicsScore -= 10;
    critiqueResults.findings.push(`[فيزياء الحركة] تم رصد استخدام لمنحنيات خطية جامدة (linear) في ${linearCount} ملفات.`);
  }
} else {
  critiqueResults.physicsScore -= 10;
}
totalScore += critiqueResults.physicsScore;

// ----------------------------------------------------
// 4. المحور الرابع: سلامة التايبوجرافي العربي والـ BiDi (20 نقطة)
// ----------------------------------------------------
let brokenArabicCount = 0;
htmlFiles.forEach(file => {
  const c = fs.readFileSync(file, 'utf-8');
  if (/[\u0600-\u06FF]/.test(c)) {
    if (c.includes("mode: 'chars'") || (c.includes('amg-char') && /<span[^>]*class="[^"]*amg-char[^"]*"[^>]*>[\u0600-\u06FF]/.test(c))) {
      brokenArabicCount++;
    }
  }
});
if (brokenArabicCount > 0) {
  critiqueResults.typographyScore -= 15;
  critiqueResults.findings.push(`[التايبوجرافي العربي] تم رصد تفكيك للحروف العربية يكسر اتصال الكلمات في ${brokenArabicCount} ملفات.`);
}
totalScore += critiqueResults.typographyScore;

// ----------------------------------------------------
// 5. المحور الخامس: جسور التحول السلس والاتصال السردي (20 نقطة)
// ----------------------------------------------------
const scriptFile = path.join(projectDir, 'stage-02-shotcraft', '02_shotcraft_script.json');
if (fs.existsSync(scriptFile)) {
  try {
    const script = JSON.parse(fs.readFileSync(scriptFile, 'utf-8'));
    let missingBridges = 0;
    for (let i = 0; i < (script.scenes.length - 1); i++) {
      if (!script.scenes[i].morphBridgeToNext) missingBridges++;
    }
    if (missingBridges > 0) {
      critiqueResults.continuityScore -= 10;
      critiqueResults.findings.push(`[الاتصال السردي] وُجدت (${missingBridges}) مشاهد تفتقر لعقد جسر تحول متصل (morphBridgeToNext).`);
    }
  } catch (e) {
    critiqueResults.continuityScore -= 10;
  }
} else {
  critiqueResults.continuityScore -= 10;
}
totalScore += critiqueResults.continuityScore;

// ----------------------------------------------------
// طباعة التقرير النهائي
// ----------------------------------------------------
console.log('📊 تقييم المحاور الخمسة للجودة السينمائية:');
console.log(`  1. الإدراك الفراغي والتباين : ${critiqueResults.spatialScore} / 20`);
console.log(`  2. رشاقة DOM وعمق Ponytail : ${critiqueResults.ponytailScore} / 20 (أقصى عمق: ${maxProjectDepth})`);
console.log(`  3. فيزياء الحركة والاستوديو: ${critiqueResults.physicsScore} / 20`);
console.log(`  4. التايبوجرافي العربي وBiDi: ${critiqueResults.typographyScore} / 20`);
console.log(`  5. جسور التحول السلس      : ${critiqueResults.continuityScore} / 20`);
console.log('-------------------------------------------------------');
console.log(`🏆 التقييم الكلي للجودة السينمائية: ${totalScore} / 100\n`);

if (critiqueResults.findings.length > 0) {
  console.log('⚠️ ملاحظات وتوجيهات الناقد:');
  critiqueResults.findings.forEach(f => console.log(`  • ${f}`));
  console.log('');
}

// حفظ التقرير في مجلد المشروع
const reportMd = `# تقرير التقييم النقدي المستقل: ${projectSlug}
**تاريخ التقييم:** ${new Date().toISOString()}  
**المعدل الإجمالي:** ${totalScore} / 100 (${totalScore >= 85 ? 'APPROVED ✅' : 'NEEDS REFINEMENT ❌'})

### درجات المحاور الخمسة:
- **1. الإدراك الفراغي والتباين:** ${critiqueResults.spatialScore} / 20
- **2. رشاقة DOM وعمق Ponytail:** ${critiqueResults.ponytailScore} / 20
- **3. فيزياء الحركة والاستوديو:** ${critiqueResults.physicsScore} / 20
- **4. التايبوجرافي العربي وBiDi:** ${critiqueResults.typographyScore} / 20
- **5. جسور التحول السلس:** ${critiqueResults.continuityScore} / 20

### ملاحظات وتوصيات الناقد:
${critiqueResults.findings.length === 0 ? '- لا توجد أي ملاحظات سلبية. العمل يلتزم بالمعايير السينمائية الكاملة!' : critiqueResults.findings.map(f => `- ${f}`).join('\n')}
`;
fs.writeFileSync(path.join(projectDir, 'critic_report.md'), reportMd, 'utf-8');
console.log(`📝 تم حفظ تقرير الناقد في: workspace/${projectSlug}/critic_report.md`);

if (totalScore >= 85) {
  console.log('\n🌟 [APPROVED] تم اعتماد المشروع بنجاح ويحق له وضع ختم: FOUNDATION_LOCKED: STAGE_07_APPROVED!');
  process.exit(0);
} else {
  console.error(`\n❌ [REJECTED] المشروع يحتاج إلى تحسين قبل الإصدار الماستر (الدرجة المطلوبة >= 85).`);
  process.exit(1);
}
