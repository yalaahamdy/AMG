#!/usr/bin/env node
/**
 * AMG Zero-Dependency Local Preview Server
 * Launches a local HTTP server with correct CORS headers and auto-opens the browser.
 * Usage: node scripts/amg-preview.mjs [path-to-html]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';

const port = process.env.PORT || 3000;
const rootDir = process.cwd();

const targetFile = process.argv[2] || 'workspace/machine-language/stage-07-master/amg-master-machine-language.html';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // إضافة ترويسات CORS كاملة لحل أي قيود في المتصفح
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/' + targetFile.replace(/\\/g, '/');
  }

  const filePath = path.join(rootDir, reqPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`404: الملف غير موجود (${reqPath})`);
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    res.writeHead(403);
    res.end('Directory listing forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  const url = `http://localhost:${port}/${targetFile.replace(/\\/g, '/')}`;
  console.log(`\n======================================================`);
  console.log(`🎬 خادم المعاينة المباشر لـ AMG يعمل الآن:`);
  console.log(`👉 ${url}`);
  console.log(`======================================================\n`);

  // فتح المتصفح تلقائياً
  const startCmd = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
  exec(`${startCmd} ${url}`);
});
