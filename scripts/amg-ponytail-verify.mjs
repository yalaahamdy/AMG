#!/usr/bin/env node
/**
 * AMG Ponytail Optimizer Verifier CLI
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */

import { AMGPonytailOptimizer } from '../core/amg-ponytail-optimizer.js';

console.log('=======================================================');
console.log('✂️ [AMG Ponytail Verifier] فحص كفاءة درع مكافحة التضخم البرمجي');
console.log('=======================================================\n');

let passedCount = 0;
const errors = [];

function assertTest(name, condition, errorMsg) {
  if (condition) {
    console.log(`✅ [ اجتاز ] ${name}`);
    passedCount++;
  } else {
    console.error(`❌ [ فشل ] ${name}: ${errorMsg}`);
    errors.push(`${name}: ${errorMsg}`);
  }
}

try {
  // 1. اختبار المشهد الرشيق (عمق <= 5)
  const leanHtml = `
    <section class="amg-scene">
      <div class="card">
        <div class="header">
          <h1>عنوان المشهد</h1>
        </div>
      </div>
    </section>
  `;
  const leanReport = AMGPonytailOptimizer.analyzeSceneHTML(leanHtml);
  assertTest(
    'Lean Scene Analysis (Depth <= 5)',
    leanReport.maxDepth <= 5 && leanReport.score === 100,
    `المشهد الرشيق يجب أن يحصل على 100 نقطة (النتيجة: ${leanReport.score}, العمق: ${leanReport.maxDepth})`
  );

  // 2. اختبار رصد المشهد المفرط في التداخل (عمق > 5)
  const bloatedHtml = `
    <section class="amg-scene">
      <div><div><div><div><div><div><div>
        <h1>مفرط التداخل</h1>
      </div></div></div></div></div></div></div>
    </section>
  `;
  const bloatReport = AMGPonytailOptimizer.analyzeSceneHTML(bloatedHtml);
  assertTest(
    'Bloated Deep DOM Detection (Depth > 5)',
    bloatReport.maxDepth > 5 && bloatReport.warnings.some(w => w.includes('عمق')),
    'فشل في رصد التداخل المفرط'
  );

  // 3. اختبار كشف الـ Keyframes الميتة
  const keyframesHtml = `
    <style>
      @keyframes floatSlow { 0% { transform: translateY(0); } 100% { transform: translateY(10px); } }
    </style>
    <div>محتوى</div>
  `;
  const keyframeReport = AMGPonytailOptimizer.analyzeSceneHTML(keyframesHtml);
  assertTest(
    'Dead CSS @keyframes Detection',
    keyframeReport.hasDeadKeyframes === true && keyframeReport.score < 100,
    'فشل في كشف كتل @keyframes الميتة'
  );

  // 4. اختبار ضغط وترشيد الأرقام العشرية الزائدة
  const uncompressedSvg = '<path d="M 120.39482938 240.84729104 L 300.99999999 400.12345678" />';
  const compressed = AMGPonytailOptimizer.compactSceneHTML(uncompressedSvg);
  assertTest(
    'SVG Decimal Precision Compaction',
    compressed.includes('120.39') && compressed.includes('240.84') && !compressed.includes('120.39482938'),
    'فشل في تقليص خانات الأرقام العشرية إلى خانتين'
  );

} catch (err) {
  console.error(`❌ خطأ استثنائي أثناء الفحص: ${err.message}`);
  errors.push(err.message);
}

console.log('\n=======================================================');
console.log(`ملخص فحص درع Ponytail: ${passedCount}/4 اختبارات ناجحة`);
console.log('=======================================================');

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('✨ درع Ponytail لمكافحة التضخم البرمجي يعمل بكفاءة 100%!');
  process.exit(0);
}
