#!/usr/bin/env node
/**
 * AMG Unified CLI Master Hub
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * Usage:
 *   node scripts/amg-cli.mjs [command] [args...]
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const command = args[0] || 'help';

function printHeader() {
  console.log('================================================================');
  console.log('⚡ AMG MASTER CLI HUB — The Ultimate Pure-HTML Motion Graphics');
  console.log('================================================================');
}

switch (command) {
  case 'help':
  case '--help':
  case '-h':
    printHeader();
    console.log(`
الأوامر المتاحة في المنظومة الموحدة:
  help                     عرض رسالة المساعدة هذه
  verify                   تشغيل الفحص الشامل الموحد لكافة الأنظمة
  critic [project]         تقييم المشروع بواسطة الناقد المستقل الخماسي المحاور
  audit [project]          تدقيق الإدراك الفراغي ورشاقة DOM (عمق <= 5)
  shotcraft                فحص ومعاينة ترسانة اللقطات الـ 150
  diagrams                 فحص ومعاينة المخططات التحريرية الـ 45 والتشريح 3D
  studio                   فحص استوديو NullMotion Pro ومسجل WebCodecs
  query <type> <term>      البحث الفوري في خزائن الأيقونات واللقطات والتقنيات
  init <name> [--track=]   بدء مشروع موشن جرافيك جديد بالمراحل السبع
  preview                  تشغيل خادم المعاينة المحلي (http://localhost:3000)

أمثلة:
  node scripts/amg-cli.mjs verify
  node scripts/amg-cli.mjs critic amg-flagship-showcase
  node scripts/amg-cli.mjs query shot slam
  node scripts/amg-cli.mjs audit workspace/amg-flagship-showcase/
`);
    break;

  case 'verify':
    printHeader();
    console.log('🚀 تشغيل الفحص الشامل الموحد لكافة الأنظمة والمحركات...\n');
    const verifyScript = fs.existsSync('scripts/amg-grand-verify.mjs') 
      ? 'scripts/amg-grand-verify.mjs' 
      : 'scripts/amg-shotcraft-verify.mjs';
    spawnSync('node', [verifyScript], { stdio: 'inherit' });
    break;

  case 'critic':
    printHeader();
    const targetProject = args[1] || 'amg-flagship-showcase';
    console.log(`🧐 استدعاء الناقد المستقل لفحص المشروع: ${targetProject}\n`);
    spawnSync('node', ['scripts/amg-critic.mjs', targetProject], { stdio: 'inherit' });
    break;

  case 'audit':
    printHeader();
    const auditDir = args[1] || 'workspace/amg-flagship-showcase/';
    console.log(`👁️ تدقيق الإدراك الفراغي ورشاقة الشفرة في: ${auditDir}\n`);
    spawnSync('node', ['scripts/amg-vision-audit.mjs', auditDir], { stdio: 'inherit' });
    console.log('\n------------------------------------------------');
    spawnSync('node', ['scripts/amg-ponytail-audit.mjs', auditDir], { stdio: 'inherit' });
    break;

  case 'shotcraft':
    spawnSync('node', ['scripts/amg-shotcraft-verify.mjs'], { stdio: 'inherit' });
    break;

  case 'diagrams':
    spawnSync('node', ['scripts/amg-diagram-verify.mjs'], { stdio: 'inherit' });
    break;

  case 'studio':
    spawnSync('node', ['scripts/amg-studio-verify.mjs'], { stdio: 'inherit' });
    break;

  case 'query':
    const qType = args[1] || 'all';
    const qTerm = args[2] || '';
    spawnSync('node', ['scripts/amg-query.mjs', qType, qTerm], { stdio: 'inherit' });
    break;

  case 'init':
    const initArgs = args.slice(1);
    spawnSync('node', ['scripts/amg-init.mjs', ...initArgs], { stdio: 'inherit' });
    break;

  case 'preview':
  case 'start':
    spawnSync('node', ['scripts/amg-preview.mjs'], { stdio: 'inherit' });
    break;

  default:
    printHeader();
    console.error(`❌ أمر غير معروف: ${command}`);
    console.log('استخدم: node scripts/amg-cli.mjs help لعرض كافة الأوامر.');
    process.exit(1);
}
