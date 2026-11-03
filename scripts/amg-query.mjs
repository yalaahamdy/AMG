#!/usr/bin/env node
/**
 * AMG Fast Asset & Recipe Query CLI
 * Usage: node scripts/amg-query.mjs <type: icon|shot|diagram|tech> <keyword>
 */
import fs from 'node:fs';
import path from 'node:path';

const [type, keyword] = process.argv.slice(2);

if (!type || !keyword) {
  console.log(`استخدام الأداة: node scripts/amg-query.mjs <icon|shot|diagram|tech> <keyword>`);
  console.log(`أمثلة:\n  node scripts/amg-query.mjs icon cloud\n  node scripts/amg-query.mjs shot slam\n  node scripts/amg-query.mjs tech morph`);
  process.exit(0);
}

const catalogDir = path.resolve('vault', 'catalog');
const normKeyword = keyword.toLowerCase();

if (type === 'icon') {
  const data = JSON.parse(fs.readFileSync(path.join(catalogDir, 'icons-index.json'), 'utf-8'));
  const matches = [];
  data.domains.forEach(domain => {
    if (domain.keywords.some(k => k.includes(normKeyword)) || domain.name.includes(normKeyword)) {
      matches.push({ domain: domain.name, icons: domain.icons });
    }
  });
  console.log(`[AMG Query] نتائج البحث عن أيقونات (${keyword}):`);
  console.log(JSON.stringify(matches, null, 2));
} else if (type === 'shot' || type === 'recipe') {
  const data = JSON.parse(fs.readFileSync(path.join(catalogDir, 'shots-index.json'), 'utf-8'));
  const matches = [];
  const executableShots = ['SC-001', 'SC-047', 'SC-076', 'SC-137'];

  data.families.forEach(family => {
    family.featured.forEach(shot => {
      if (shot.name.toLowerCase().includes(normKeyword) || shot.vibe.includes(normKeyword) || shot.id.toLowerCase().includes(normKeyword)) {
        const isExec = executableShots.includes(shot.id);
        const matchObj = { family: family.name, ...shot, hasExecutableRecipe: isExec };
        if (isExec) {
          matchObj.importSnippet = `import { AMGShotcraftEngine } from './core/amg-runtime.js';\nAMGShotcraftEngine.mountAndAnimate(stageEl, timeline, '${shot.id}', { camera, start: 0 });`;
        }
        matches.push(matchObj);
      }
    });
  });
  console.log(`[AMG Query] نتائج البحث عن بطاقات اللقطات والوصفات البرمجية (${keyword}):`);
  console.log(JSON.stringify(matches, null, 2));
} else if (type === 'diagram') {
  const data = JSON.parse(fs.readFileSync(path.join(catalogDir, 'diagrams-index.json'), 'utf-8'));
  const matches = [];
  data.families.forEach(family => {
    family.diagrams.forEach(diag => {
      if (diag.toLowerCase().includes(normKeyword) || family.name.includes(normKeyword)) {
        matches.push({ family: family.name, diagram: diag });
      }
    });
  });
  console.log(`[AMG Query] نتائج البحث عن المخططات التحريرية (${keyword}):`);
  console.log(JSON.stringify(matches, null, 2));
} else if (type === 'tech') {
  const data = JSON.parse(fs.readFileSync(path.join(catalogDir, 'techniques-index.json'), 'utf-8'));
  const matches = [];
  data.categories.forEach(cat => {
    if (cat.items) {
      cat.items.forEach(tech => {
        if (tech.name.toLowerCase().includes(normKeyword) || tech.desc.includes(normKeyword)) {
          matches.push({ category: cat.name, ...tech });
        }
      });
    }
  });
  console.log(`[AMG Query] نتائج البحث عن التقنيات الحركية (${keyword}):`);
  console.log(JSON.stringify(matches, null, 2));
}
