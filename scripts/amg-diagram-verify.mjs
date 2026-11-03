#!/usr/bin/env node
/**
 * AMG Editorial Diagrams & Isometric Anatomy Verifier CLI
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */

import { AMGEditorialDiagramEngine } from '../core/amg-editorial-diagram-engine.js';
import { AMGIsometricAnatomyPro } from '../core/amg-isometric-anatomy-pro.js';

console.log('=======================================================');
console.log('📐 [AMG Diagram Verifier] فحص منظومة المخططات والتشريح الإيزومتري');
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
  // 1. اختبار مخطط Microservices Mesh
  const meshHtml = AMGEditorialDiagramEngine.createMicroservicesMesh();
  assertTest(
    'Microservices Mesh HTML & Connectors',
    meshHtml.includes('ENTRYPOINT') && meshHtml.includes('PERSISTENCE') && meshHtml.includes('diag-connector'),
    'قالب شبكة الخدمات المصغرة يفتقر للمكونات الأساسية'
  );

  // 2. اختبار شريط Linear Stepper
  const stepperHtml = AMGEditorialDiagramEngine.createLinearStepper();
  assertTest(
    'Linear Stepper Progress Bar',
    stepperHtml.includes('stepper-line-fill') && stepperHtml.includes('step-badge'),
    'شريط التقدم المرحلي غير مكتمل'
  );

  // 3. اختبار مصفوفة 2x2 Matrix
  const quadHtml = AMGEditorialDiagramEngine.createQuadrantMatrix();
  assertTest(
    'Quadrant 2x2 Strategic Matrix',
    quadHtml.includes('quad-q1') && quadHtml.includes('quad-q2'),
    'مصفوفة 2x2 تفتقر للأرباع المطلوبة'
  );

  // 4. اختبار البصلة المعمارية Concentric Onion
  const onionHtml = AMGEditorialDiagramEngine.createConcentricOnion();
  assertTest(
    'Concentric Onion Architecture',
    onionHtml.includes('diag-onion-ring') && onionHtml.includes('viewBox'),
    'مخطط الطبقات المتراكزة يفتقر لدوائر SVG'
  );

  // 5. اختبار المكعب الإيزومتري IsoCube
  const cubeSvg = AMGIsometricAnatomyPro.renderIsoCube();
  assertTest(
    'Isometric 3D Cube (3 Planes Geometry)',
    cubeSvg.includes('amg-iso-cube') && (cubeSvg.match(/<path/g) || []).length === 3,
    'المكعب الإيزومتري يجب أن يحتوي على 3 أسطح بالضبط (Top, Left, Right)'
  );

  // 6. اختبار التفكيك الطبقي الإيزومتري Exploded View Stack
  const stackHtml = AMGIsometricAnatomyPro.createExplodedViewStack();
  assertTest(
    'Isometric Exploded View Stack',
    stackHtml.includes('iso-exploded-layer') && stackHtml.includes('preserve-3d'),
    'منظومة التفكيك الطبقي تفتقر لخاصية preserve-3d'
  );

} catch (err) {
  console.error(`❌ خطأ استثنائي أثناء الفحص: ${err.message}`);
  errors.push(err.message);
}

console.log('\n=======================================================');
console.log(`ملخص فحص المخططات والتشريح: ${passedCount}/6 اختبارات ناجحة`);
console.log('=======================================================');

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('✨ منظومة المخططات والتشريح الإيزومتري جاهزة بنسبة 100%!');
  process.exit(0);
}
