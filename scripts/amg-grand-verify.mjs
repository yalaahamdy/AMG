#!/usr/bin/env node
/**
 * AMG Grand Verification Suite (المرحلة الشاملة)
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * Verifies the entire repository, all 10 phases, all 14 integrated tools,
 * galleries, and autonomous critic evaluation.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

console.log('================================================================');
console.log('🌟 [AMG Grand Verifier] بدء الفحص الشامل الموحد للمنظومة التتويجية');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assertCheck(name, condition) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`✅ [ اجتاز ] ${name}`);
  } else {
    console.error(`❌ [ فشل   ] ${name}`);
  }
}

// 1. التحقق من اكتمال النواة البرمجية الـ 10
console.log('📦 1. التحقق من سلامة النواة البرمجية (Core Modules):');
const coreFiles = [
  'core/amg-vision-guard.js',
  'core/amg-studio-physics.js',
  'core/amg-cinematic-camera-pro.js',
  'core/amg-morph-bridge.js',
  'core/amg-arabic-typography-pro.js',
  'core/amg-shotcraft-engine.js',
  'core/amg-editorial-diagram-engine.js',
  'core/amg-isometric-anatomy-pro.js',
  'core/amg-nullmotion-hud-pro.js',
  'core/amg-webcodecs-recorder.js',
  'core/amg-ponytail-optimizer.js',
  'core/amg-clock.js',
  'core/amg-text-engine.js',
  'core/vendor/anime.esm.js',
  'core/vendor/d3.esm.js'
];
coreFiles.forEach(f => {
  assertCheck(`ملف النواة: ${f}`, fs.existsSync(f));
});

// 2. التحقق من صالات العرض التفاعلية والبوابة
console.log('\n🎨 2. التحقق من البوابات وصالات العرض التفاعلية:');
assertCheck('بوابة AMG المركزية (index.html)', fs.existsSync('index.html'));
assertCheck('صالة لقطات Shotcraft (shotcraft-gallery.html)', fs.existsSync('vault/shotcraft-cards/shotcraft-gallery.html'));
assertCheck('صالة المخططات التحريرية والتشريح (diagram-gallery.html)', fs.existsSync('vault/techniques/05-editorial-diagrams-45/diagram-gallery.html'));
assertCheck('استعراض الأيقونات المتجهة (vault/icons/index.html)', fs.existsSync('vault/icons/index.html'));

// 3. التحقق من أدوار الوكلاء الذاتيين الخمسة
console.log('\n🤖 3. التحقق من بروتوكولات الوكلاء الذاتيين (.amg-agents/):');
const agentFiles = [
  '.amg-agents/01-director.md',
  '.amg-agents/02-architect.md',
  '.amg-agents/03-draftsman.md',
  '.amg-agents/04-animator.md',
  '.amg-agents/05-critic.md'
];
agentFiles.forEach(a => {
  assertCheck(`ميثاق الوكيل: ${a}`, fs.existsSync(a));
});

// 4. التحقق من محور الأوامر الموحد
console.log('\n⚡ 4. التحقق من محور سطر الأوامر الموحد:');
assertCheck('أداة CLI المركزية (scripts/amg-cli.mjs)', fs.existsSync('scripts/amg-cli.mjs'));

// 5. تشغيل حزم الاختبارات الداخلية
console.log('\n🧪 5. تنفيذ حزم التحقق التخصصية:');
const testScripts = [
  'scripts/amg-shotcraft-verify.mjs',
  'scripts/amg-diagram-verify.mjs',
  'scripts/amg-studio-verify.mjs',
  'scripts/amg-ponytail-verify.mjs'
];

for (const script of testScripts) {
  const res = spawnSync('node', [script], { encoding: 'utf-8' });
  assertCheck(`حزمة الفحص: ${path.basename(script)}`, res.status === 0);
}

// 6. تشغيل الناقد المستقل على المشروع الرائد
console.log('\n🧐 6. تشغيل الناقد المستقل (AMG Critic):');
const criticRes = spawnSync('node', ['scripts/amg-critic.mjs', 'amg-flagship-showcase'], { encoding: 'utf-8' });
const criticPassed = criticRes.status === 0 && criticRes.stdout.includes('100 / 100');
assertCheck('اعتماد الناقد المستقل بدرجة 100/100 كاملة', criticPassed);

console.log('\n================================================================');
console.log(`📊 ملخص الفحص الشامل الموحد: ${passedChecks}/${totalChecks} اختباراً ناجحاً بنسبة ${(passedChecks/totalChecks*100).toFixed(1)}%`);
console.log('================================================================');

if (passedChecks === totalChecks) {
  console.log('🎉 المنظومة التتويجية الشاملة مكتملة ومختومة بنسبة 100% بنجاح تام!\n');
  process.exit(0);
} else {
  console.error('❌ توجد بعض الملاحظات أو الفحوصات غير المكتملة.');
  process.exit(1);
}
