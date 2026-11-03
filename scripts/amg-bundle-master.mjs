#!/usr/bin/env node
/**
 * AMG Scene Bundler & Standalone HTML Compiler
 * Usage: node scripts/amg-bundle-master.mjs <project-slug>
 */
import fs from 'node:fs';
import path from 'node:path';

const [projectSlug] = process.argv.slice(2);
if (!projectSlug) {
  console.log(`استخدام الأداة: node scripts/amg-bundle-master.mjs <project-slug>`);
  process.exit(1);
}

const projectDir = path.resolve('workspace', projectSlug);
const masterDir = path.join(projectDir, 'stage-07-master');
fs.mkdirSync(masterDir, { recursive: true });

console.log(`[AMG Bundler] تجميع مشاهد المشروع: ${projectSlug}`);

// قراءة المشاهد المحركة
const motionDir = path.join(projectDir, 'stage-06-motion-scenes');
let scenesContent = '';

if (fs.existsSync(motionDir)) {
  const sceneFiles = fs.readdirSync(motionDir).filter(f => f.endsWith('.html')).sort();
  console.log(`[AMG Bundler] تم العثور على ${sceneFiles.length} مشهد محرك.`);
  sceneFiles.forEach(sf => {
    scenesContent += `\n<!-- Embedded ${sf} -->\n` + fs.readFileSync(path.join(motionDir, sf), 'utf-8') + '\n';
  });
}

// إنشاء ملف HTML المستقل المدمج
const bundleHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AMG Master Release: ${projectSlug}</title>
  <link rel="stylesheet" href="../../core/amg-tokens.css">
  <link rel="stylesheet" href="../../core/amg-stage.css">
</head>
<body class="amg-body">
  <div id="amg-stage" class="amg-stage amg-crisp-stroke" data-aspect="16:9">
    <div id="amg-camera-rig" class="amg-camera-rig">
      ${scenesContent || '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:32px;">جاهز للتجميع النهائي للمشاهد</div>'}
    </div>
  </div>

  <script type="module">
    import { initAMGStage } from '../../core/amg-runtime.js';
    const { clock, camera, hud, timeline } = initAMGStage({ durationMs: 15000, fps: 60 });
    console.log('AMG Master Scene Initialized Successfully.');
  </script>
</body>
</html>`;

const outputPath = path.join(masterDir, 'amg-master-standalone.html');
fs.writeFileSync(outputPath, bundleHtml, 'utf-8');

console.log(`✅ [AMG Bundler] تم إنشاء ملف العرض النهائي بنجاح:\n-> ${outputPath}`);
