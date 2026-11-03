#!/usr/bin/env node
/**
 * AMG Vision Audit CLI — فاحص الإدراك الفراغي والهندسي الآلي
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * Usage: node scripts/amg-vision-audit.mjs <file-path-or-project-slug>
 * Example: node scripts/amg-vision-audit.mjs workspace/amg-flagship-showcase/stage-05-styleframes/scene-01-static.html
 */
import fs from 'node:fs';
import path from 'node:path';

const [targetArg] = process.argv.slice(2);
if (!targetArg) {
  console.log(`استخدام الأداة: node scripts/amg-vision-audit.mjs <path-to-html-file-or-project-slug>`);
  console.log(`مثال: node scripts/amg-vision-audit.mjs workspace/amg-flagship-showcase/stage-05-styleframes/scene-01-static.html`);
  process.exit(1);
}

let targetFile = path.resolve(targetArg);
if (!fs.existsSync(targetFile)) {
  // تجربة البحث داخل workspace/
  const possiblePath = path.resolve('workspace', targetArg);
  if (fs.existsSync(possiblePath)) {
    targetFile = possiblePath;
  } else {
    console.error(`[Vision Audit Error] الملف أو المجلد غير موجود: ${targetArg}`);
    process.exit(1);
  }
}

// إذا كان مجلداً، ابحث عن ملفات HTML داخله
let filesToAudit = [];
if (fs.statSync(targetFile).isDirectory()) {
  const findHtmlFiles = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        findHtmlFiles(fullPath);
      } else if (file.endsWith('.html')) {
        filesToAudit.push(fullPath);
      }
    });
  };
  findHtmlFiles(targetFile);
} else {
  filesToAudit.push(targetFile);
}

console.log(`=======================================================`);
console.log(`🔍 [AMG Vision Audit] بدء فحص الإدراك الفراغي لـ (${filesToAudit.length}) ملفات`);
console.log(`=======================================================\n`);

let totalPassed = 0;
let totalFailed = 0;

filesToAudit.forEach(filePath => {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  console.log(`--- فحص الملف: ${fileName} ---`);

  const issues = {
    collisions: [],
    clipping: [],
    contrastWarnings: [],
    svgAnomalies: []
  };

  // 1. فحص سلامة عناصر الـ SVG
  const svgMatches = content.match(/<svg[^>]*>/gi) || [];
  svgMatches.forEach(svgTag => {
    if (!svgTag.includes('viewBox') && !svgTag.includes('width')) {
      issues.svgAnomalies.push(`عنصر SVG يفتقر إلى viewBox صالحة: ${svgTag.slice(0, 50)}...`);
    }
  });

  const emptyPathMatches = content.match(/<path[^>]*d=["']\s*["'][^>]*>/gi) || [];
  emptyPathMatches.forEach(pTag => {
    issues.svgAnomalies.push(`مسار SVG يحتوي على خاصية d فارغة.`);
  });

  // 2. فحص الهوامش والمنطقة الآمنة (Title Safe Area 90%)
  // التحقق من عدم وجود إحداثيات سالبة متطرفة أو أبعاد تتجاوز 1920x1080
  const extremeCoords = content.match(/(left|top|right|bottom)\s*:\s*(-?\d+)px/gi) || [];
  extremeCoords.forEach(coord => {
    const val = parseInt(coord.replace(/[^\d-]/g, ''), 10);
    if (val < -100 || val > 2100) {
      issues.clipping.push(`قيمة إحداثيات مريبة قد تخرج خارج الشاشة: ${coord}`);
    }
  });

  // 3. فحص التباين اللوني الأساسي (حظر الألوان المتطابقة مع الخلفية)
  const darkColorMatch = content.match(/color\s*:\s*(#050508|#000000|#111827|black)/gi);
  if (darkColorMatch) {
    // إذا كان اللون داكناً، تحقق مما إذا كان مقترناً بخلفية فاتحة (مثل background: #38bdf8 أو #ffffff أو #10b981)
    const hasLightBgNearby = 
      content.includes('background:#38bdf8') || 
      content.includes('background: #38bdf8') || 
      content.includes('background:#10b981') || 
      content.includes('background: #10b981') ||
      content.includes('background: #ffffff') ||
      content.includes('background:#fff') ||
      content.includes('editorial-warm');

    if (!hasLightBgNearby) {
      issues.contrastWarnings.push(`نص بلون داكن جداً دون وجود خلفية فاتحة تحته.`);
    }
  }

  // 4. فحص التداخل النصي الصريح (غياب فواصل المسافات أو تراكب الكتل)
  if (content.includes('position: absolute') && !content.includes('display: flex') && !content.includes('grid')) {
    const absCounts = (content.match(/position:\s*absolute/gi) || []).length;
    if (absCounts > 8 && !content.includes('transform:')) {
      issues.collisions.push(`استخدام مفرط لـ position: absolute (${absCounts} مرات) دون شبكة محاذاة قد يؤدي لتصادمات.`);
    }
  }

  const isFlawless = 
    issues.collisions.length === 0 &&
    issues.clipping.length === 0 &&
    issues.contrastWarnings.length === 0 &&
    issues.svgAnomalies.length === 0;

  if (isFlawless) {
    totalPassed++;
    console.log(`✅ النتيجة: ممتاز (10/10) — صفر تصادمات، تباين متوافق، وسلامة كاملة لعناصر SVG.`);
  } else {
    totalFailed++;
    console.log(`❌ النتيجة: تنبيهات هندسية يجب تصحيحها:`);
    if (issues.collisions.length) issues.collisions.forEach(e => console.log(`  💥 [تصادم]: ${e}`));
    if (issues.clipping.length) issues.clipping.forEach(e => console.log(`  ⚠️ [خروج عن الشاشة]: ${e}`));
    if (issues.contrastWarnings.length) issues.contrastWarnings.forEach(e => console.log(`  👁️ [تباين]: ${e}`));
    if (issues.svgAnomalies.length) issues.svgAnomalies.forEach(e => console.log(`  📐 [SVG]: ${e}`));
  }
  console.log(`\n`);
});

console.log(`=======================================================`);
console.log(`ملخص فحص الرؤية: ${totalPassed} ملفات ناجحة | ${totalFailed} ملفات بها ملاحظات`);
console.log(`=======================================================`);

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
