# Shotcraft Family 03: Hero Reveals
## بطاقات لقطات الكشف الساحر عن الحل والمنتج

---

### SC-032: Blueprint-to-Reality Satori Morph
- **الهدف السردي:** إظهار تحول الفكرة الهندسية من مخطط نظري خفيف إلى واجهة حية وقوية.
- **إعدادات الكاميرا:** `cameraDollyZoom` مع عودة الكاميرا إلى نقطة التوازن التام `(0, 0, 1.0)`.
- **كود التحريك المعياري:**
```javascript
import { drawSVG } from '../../core/amg-svg-utils.js';

export function playSC032(timeline, { wireframeSelector, solidCardSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { x: 0, y: 0, scale: 1.0, rotateZ: 0, duration: 1200, ease: 'outExpo', start });

  // 1. رسم خطوط المخطط أولاً
  drawSVG(timeline, `${wireframeSelector} path`, { start, duration: 700, ease: 'inOutQuad' });

  // 2. الكشف عن الواجهة الحية عبر قناع هندسي
  timeline.add(solidCardSelector, {
    opacity: [0, 1],
    scale: [0.92, 1.0],
    duration: 800,
    ease: 'outExpo'
  }, start + 500);
}
```

---

### SC-033: Isometric Rise
- **الهدف السردي:** صعود المنصة ثلاثية الأبعاد من الأسفل باستقرار مهيب.
- **الكاميرا:** تحول إيزومتري `isoTiltX: 55deg, isoRotateZ: -45deg`.
