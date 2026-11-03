#!/usr/bin/env node
/**
 * AMG Stage Gate & Discipline Checker CLI
 * Usage: node scripts/amg-stage-gate.mjs <project-slug> <stage-number: 1..7>
 */
import fs from 'node:fs';
import path from 'node:path';

const [projectSlug, stageNumStr] = process.argv.slice(2);
if (!projectSlug || !stageNumStr) {
  console.log(`استخدام الأداة: node scripts/amg-stage-gate.mjs <project-slug> <1..7>`);
  process.exit(1);
}

const stageNum = parseInt(stageNumStr, 10);
const projectDir = path.resolve('workspace', projectSlug);

if (!fs.existsSync(projectDir)) {
  console.error(`[AMG Gate Error] المجلد غير موجود: ${projectDir}`);
  process.exit(1);
}

console.log(`[AMG Gate] فحص بوابة المرحلة ${stageNum} للمشروع: ${projectSlug}`);

let passed = true;
const errors = [];

if (stageNum === 1) {
  const visionFile = path.join(projectDir, 'stage-01-vision', '01_creative_vision.md');
  if (!fs.existsSync(visionFile) || fs.readFileSync(visionFile, 'utf-8').length < 200) {
    passed = false;
    errors.push('ملف 01_creative_vision.md مفقود أو غير مكتمل.');
  }
} else if (stageNum === 2) {
  const scriptFile = path.join(projectDir, 'stage-02-shotcraft', '02_shotcraft_script.json');
  if (!fs.existsSync(scriptFile)) {
    passed = false;
    errors.push('ملف 02_shotcraft_script.json غير موجود.');
  } else {
    try {
      const script = JSON.parse(fs.readFileSync(scriptFile, 'utf-8'));
      if (!script.scenes || script.scenes.length < 2) {
        passed = false;
        errors.push('المشروع يجب أن يحتوي على مشهدين على الأقل.');
      }
      // فحص عدم تكرار نفس عائلة اللقطة متتالياً
      for (let i = 1; i < script.scenes.length; i++) {
        if (script.scenes[i].shotcraftCardId === script.scenes[i - 1].shotcraftCardId) {
          passed = false;
          errors.push(`تكرار لنفس بطاقة اللقطة في مشهدين متتاليين (${script.scenes[i].shotcraftCardId}). خرق لقانون التنوع الحركي!`);
        }
      }
    } catch (e) {
      passed = false;
      errors.push(`خطأ في صياغة JSON: ${e.message}`);
    }
  }
} else if (stageNum === 5) {
  const styleframeDir = path.join(projectDir, 'stage-05-styleframes');
  const files = fs.readdirSync(styleframeDir).filter(f => f.endsWith('.html'));
  if (files.length === 0) {
    passed = false;
    errors.push('لا توجد ملفات لوحات ثابتة في stage-05-styleframes/.');
  } else {
    files.forEach(f => {
      const content = fs.readFileSync(path.join(styleframeDir, f), 'utf-8');
      if (content.includes('anime(') || content.includes('animate(') || content.includes('createTimeline(')) {
        passed = false;
        errors.push(`الملف ${f} يحتوي على كود تحريك! خرق صارم لقاعدة المرحلة 5 (يمنع كتابة أي كود تحريك في مرحلة اللوحات الثابتة).`);
      }
      // فحص الإدراك الفراغي
      if (!content.includes('viewBox') && content.includes('<svg')) {
        passed = false;
        errors.push(`الملف ${f}: عنصر SVG يفتقر إلى سمة viewBox صالحة.`);
      }
    });
  }
} else if (stageNum === 6) {
  const motionDir = path.join(projectDir, 'stage-06-motion-scenes');
  if (!fs.existsSync(motionDir)) {
    passed = false;
    errors.push('مجلد المشاهد المحركة stage-06-motion-scenes/ غير موجود.');
  } else {
    const files = fs.readdirSync(motionDir).filter(f => f.endsWith('.html'));
    if (files.length === 0) {
      passed = false;
      errors.push('لا توجد ملفات مشاهد محركة في stage-06-motion-scenes/.');
    }
  }
}

if (passed) {
  console.log(`✅ [AMG Gate] اجتاز المشروع فحص المرحلة ${stageNum} بنجاح!`);
  console.log(`[AMG Gate] يمكنك الآن وضع ختم STAGE_${stageNum}_LOCKED والانتقال للمرحلة التالية.`);
  process.exit(0);
} else {
  console.error(`❌ [AMG Gate Fail] فشل الفحص لوجود الأخطاء التالية:`);
  errors.forEach(err => console.error(` - ${err}`));
  process.exit(1);
}
