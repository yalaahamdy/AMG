#!/usr/bin/env node
/**
 * AMG Ponytail Audit CLI — فاحص التضخم البرمجي وعمق DOM
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * مستلهم من: DietrichGebert/ponytail
 * 
 * Usage: node scripts/amg-ponytail-audit.mjs <file-or-project-path>
 * Example: node scripts/amg-ponytail-audit.mjs workspace/amg-flagship-showcase/
 */

import fs from 'node:fs';
import path from 'node:path';
import { AMGPonytailOptimizer } from '../core/amg-ponytail-optimizer.js';

const targetArg = process.argv[2];
if (!targetArg) {
  console.log('استخدام الأداة: node scripts/amg-ponytail-audit.mjs <file-or-directory-path>');
  process.exit(1);
}

let targetPath = path.resolve(targetArg);
if (!fs.existsSync(targetPath)) {
  const possible = path.resolve('workspace', targetArg);
  if (fs.existsSync(possible)) {
    targetPath = possible;
  } else {
    console.error(`[Ponytail Error] المسار غير موجود: ${targetArg}`);
    process.exit(1);
  }
}

let filesToAudit = [];
if (fs.statSync(targetPath).isDirectory()) {
  const walk = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (file.endsWith('.html')) {
        filesToAudit.push(full);
      }
    });
  };
  walk(targetPath);
} else {
  filesToAudit.push(targetPath);
}

console.log('=======================================================');
console.log(`✂️ [AMG Ponytail Audit] فحص التضخم البرمجي لـ (${filesToAudit.length}) ملفات`);
console.log('=======================================================\n');

let totalPassed = 0;
let totalFailed = 0;

filesToAudit.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const report = AMGPonytailOptimizer.analyzeSceneHTML(content);
  const baseName = path.basename(file);

  const depthStatus = report.maxDepth <= 5 ? `✅ عمق: ${report.maxDepth} (ممتاز)` : `❌ عمق: ${report.maxDepth} (تجاوز حد 5!)`;
  const scoreBadge = report.score >= 80 ? `[درجة: ${report.score}/100]` : `[درجة منخفضة: ${report.score}/100]`;

  console.log(`--- ${baseName} ---`);
  console.log(`  ${depthStatus} | عناصر: ~${report.nodeCount} | ${scoreBadge}`);

  if (report.warnings.length > 0) {
    report.warnings.forEach(w => console.log(`  ⚠️ ${w}`));
  }

  if (report.maxDepth <= 5 && report.score >= 70) {
    totalPassed++;
  } else {
    totalFailed++;
  }
  console.log('');
});

console.log('=======================================================');
console.log(`ملخص فحص Ponytail: ${totalPassed} ملفات رشيقة | ${totalFailed} ملفات بها تضخم`);
console.log('=======================================================');

if (totalFailed > 0) {
  console.error('\n❌ فشل فحص Ponytail لوجود ملفات تتجاوز معايير الرشاقة البرمجية (AGENTS.md).');
  process.exit(1);
} else {
  console.log('\n✨ كافة المشاهد تلتزم بمبدأ الرشاقة والحد الأقصى لعمق DOM بنجاح!');
  process.exit(0);
}
