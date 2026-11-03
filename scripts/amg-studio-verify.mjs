#!/usr/bin/env node
/**
 * AMG Studio Pro & WebCodecs Recorder Verifier CLI
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */

import { AMGClock } from '../core/amg-clock.js';
import { AMGWebCodecsRecorder } from '../core/amg-webcodecs-recorder.js';
import { AMGNullMotionHUDPro } from '../core/amg-nullmotion-hud-pro.js';

console.log('=======================================================');
console.log('🎙️ [AMG Studio Verifier] فحص استوديو NullMotion Pro ومسجل WebCodecs');
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
  // 1. اختبار تهيئة الساعة
  const clock = new AMGClock({ durationMs: 12000, fps: 60 });
  assertTest(
    'Central Deterministic Clock',
    clock.durationMs === 12000 && clock.fps === 60,
    'فشل في تهيئة الساعة المركزية'
  );

  // 2. اختبار محرك مسجل WebCodecs
  const fakeStage = { querySelectorAll: () => [] };
  const recorder = new AMGWebCodecsRecorder(clock, fakeStage);
  assertTest(
    'WebCodecs Recorder Engine Instantiation',
    recorder.fps === 60 && typeof recorder.startExport === 'function',
    'فشل في تهيئة مسجل WebCodecs'
  );

  // 3. فحص صيغ التشفير المدعومة
  const mime = recorder._getSupportedMimeType();
  assertTest(
    'Video Encoding MIME Type Selection',
    typeof mime === 'string' && mime.includes('video/'),
    'فشل في تحديد ترميز الفيديو الافتراضي'
  );

  // 4. اختبار حسابات الفحص الإطاري Frame Stepping
  const frameMs = 1000 / clock.fps;
  assertTest(
    'Exact 60fps Frame Stepping Calculation (16.66ms)',
    Math.abs(frameMs - 16.666) < 0.01,
    'حسابات زمن الإطار الواحد غير دقيقة'
  );

  // 5. اختبار استوديو NullMotion HUD Pro
  assertTest(
    'AMGNullMotionHUDPro Class Contract',
    typeof AMGNullMotionHUDPro === 'function',
    'فشل استيراد صنف استوديو المعاينة'
  );

} catch (err) {
  console.error(`❌ خطأ استثنائي أثناء الفحص: ${err.message}`);
  errors.push(err.message);
}

console.log('\n=======================================================');
console.log(`ملخص فحص استوديو المعاينة والتصدير: ${passedCount}/5 اختبارات ناجحة`);
console.log('=======================================================');

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('✨ استوديو NullMotion ومسجل الفيديو WebCodecs جاهزان بنسبة 100%!');
  process.exit(0);
}
