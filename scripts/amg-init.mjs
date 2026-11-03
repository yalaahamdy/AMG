#!/usr/bin/env node
/**
 * AMG Project Initializer CLI
 * Usage: node scripts/amg-init.mjs <project-slug> --track=<track-name> --aspect=16:9
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const projectSlug = args[0] || 'motion-project-' + Date.now();
const trackArg = args.find(a => a.startsWith('--track='))?.split('=')[1] || '02-flagship-product-launch';
const aspectArg = args.find(a => a.startsWith('--aspect='))?.split('=')[1] || '16:9';

const projectDir = path.resolve('workspace', projectSlug);
const stages = [
  'stage-01-vision',
  'stage-02-shotcraft',
  'stage-03-arsenal',
  'stage-04-animatic',
  'stage-05-styleframes',
  'stage-06-motion-scenes',
  'stage-07-master'
];

console.log(`[AMG Init] تهيئة مشروع موشن جرافيك جديد: ${projectSlug}`);
console.log(`[AMG Init] المسار الإبداعي: ${trackArg} | نسبة الأبعاد: ${aspectArg}`);

// إنشاء مجلدات المشروع
stages.forEach(stage => {
  fs.mkdirSync(path.join(projectDir, stage), { recursive: true });
});

// نسخ قوالب التخطيط الأساسية
const templateDir = path.resolve('.amg-planning', 'templates');

// 1. task_plan.md
let planContent = fs.readFileSync(path.join(templateDir, 'task_plan.template.md'), 'utf-8');
planContent = planContent.replace(/{{PROJECT_NAME}}/g, projectSlug)
  .replace(/{{TRACK_NAME}}/g, trackArg)
  .replace(/{{ASPECT_RATIO}}/g, aspectArg)
  .replace(/{{DURATION_SECONDS}}/g, '15');
fs.writeFileSync(path.join(projectDir, 'task_plan.md'), planContent, 'utf-8');

// 2. findings.md
let findingsContent = fs.readFileSync(path.join(templateDir, 'findings.template.md'), 'utf-8');
findingsContent = findingsContent.replace(/{{PROJECT_NAME}}/g, projectSlug);
fs.writeFileSync(path.join(projectDir, 'findings.md'), findingsContent, 'utf-8');

// 3. progress.md
let progressContent = fs.readFileSync(path.join(templateDir, 'progress.template.md'), 'utf-8');
progressContent = progressContent.replace(/{{PROJECT_NAME}}/g, projectSlug);
fs.writeFileSync(path.join(projectDir, 'progress.md'), progressContent, 'utf-8');

// 4. 01_creative_vision.md
let visionContent = fs.readFileSync(path.join(templateDir, '01_creative_vision.template.md'), 'utf-8');
visionContent = visionContent.replace(/{{PROJECT_NAME}}/g, projectSlug).replace(/{{TRACK_SLUG}}/g, trackArg);
fs.writeFileSync(path.join(projectDir, 'stage-01-vision', '01_creative_vision.md'), visionContent, 'utf-8');

console.log(`[AMG Init] تم إنشاء هيكل المراحل السبع بنجاح في:\n-> ${projectDir}`);
console.log(`[AMG Init] ابدأ الآن بالمرحلة 1: تحرير stage-01-vision/01_creative_vision.md`);
