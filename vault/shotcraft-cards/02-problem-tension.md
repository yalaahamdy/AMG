# Shotcraft Family 02: Problem Tension
## بطاقات لقطات عرض المشكلة والتوتر

---

### SC-017: Red Bottleneck
- **الهدف السردي:** إبراز الاختناق أو البطء في المنظومة التقليدية.
- **إعدادات الكاميرا:** `cameraDutchRoll` مع إمالة `rotateZ: 4deg` وتقريب بطيء إلى عنق الزجاجة.
- **كود التحريك المعياري:**
```javascript
export function playSC017(timeline, { pipeSelector, nodeSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { x: 120, rotateZ: 3.5, scale: 1.15, duration: 1800, ease: 'inOutCubic', start });
  
  timeline.add(pipeSelector, {
    stroke: '#ef4444',
    duration: 600,
    ease: 'inOutQuad'
  }, start + 400);

  timeline.add(nodeSelector, {
    scale: [1, 1.25, 0.95, 1.1],
    fill: '#ef4444',
    duration: 800,
    ease: 'inOutQuad'
  }, start + 600);
}
```

---

### SC-018: Broken Pipeline
- **الهدف:** إظهار انقطاع اتصال أو فشل عمليات.
- **الكاميرا:** اهتزاز لحظي `impulse(0.6)` عند نقطة الانقطاع.
