#!/usr/bin/env node
/**
 * AMG Shotcraft Arsenal Verifier CLI
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 * 
 * فاحص آلي لترسانة لقطات Shotcraft: يختبر سلامة كافة القوالب والدوال البرمجية
 */

import { AMG_SHOTCRAFT_REGISTRY, AMGShotcraftEngine } from '../core/amg-shotcraft-engine.js';

console.log('=======================================================');
console.log('🎬 [AMG Shotcraft Verifier] فحص ترسانة اللقطات التنفيذية');
console.log('=======================================================\n');

const recipes = Object.values(AMG_SHOTCRAFT_REGISTRY);
console.log(`[AMG Verifier] تم رصد (${recipes.length}) وصفة راية مسجلة في المحرك.`);

let passedCount = 0;
let errors = [];

recipes.forEach((recipe, idx) => {
  try {
    // 1. فحص البنية الأساسية
    if (!recipe.id || !recipe.name || !recipe.familyId) {
      throw new Error(`الوصفة #${idx} تفتقر إلى المعرفات الأساسية.`);
    }

    // 2. اختبار توليد قالب HTML
    if (typeof recipe.template !== 'function') {
      throw new Error(`الوصفة ${recipe.id}: لا تحتوي على دالة template() صالحة.`);
    }

    const html = recipe.template({}, `test-${recipe.id.toLowerCase()}`);
    if (!html || html.length < 50) {
      throw new Error(`الوصفة ${recipe.id}: دالة template أنتجت كود HTML فارغ أو قصير جداً.`);
    }

    // 3. فحص سلامة SVG إن وجد
    if (html.includes('<svg') && !html.includes('viewBox')) {
      throw new Error(`الوصفة ${recipe.id}: تحتوي على عنصر SVG يفتقر إلى سمة viewBox.`);
    }

    // 4. فحص دالة التحريك
    if (typeof recipe.animate !== 'function') {
      throw new Error(`الوصفة ${recipe.id}: لا تحتوي على دالة animate() صالحة.`);
    }

    console.log(`✅ [${recipe.id}] ${recipe.name.padEnd(28)} | العائلة: ${recipe.familyId}`);
    passedCount++;
  } catch (err) {
    console.error(`❌ [${recipe.id || 'Unknown'}] خطأ: ${err.message}`);
    errors.push(err.message);
  }
});

console.log('\n=======================================================');
console.log(`ملخص فحص ترسانة Shotcraft: ${passedCount}/${recipes.length} وصفة سليمة 100%`);
console.log('=======================================================');

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('✨ ترسانة لقطات Shotcraft جاهزة للاستدعاء الفوري من أي ذكاء اصطناعي!');
  process.exit(0);
}
