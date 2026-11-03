# Shotcraft Family 05: System Architecture & Data Flow
## بطاقات معمارية الأنظمة وتدفق البيانات الحية

---

### SC-061: Node Graph Pulse
- **الهدف السردي:** إبراز ترابط العقد البرمجية وسريان حزم البيانات بين الخدمات السحابية وقواعد البيانات.
- **تكوين المشهد:** عقد SVG متباعدة متصلة بمسارات منحنية `stroke` مع نقاط نبضية مضيئة.
- **إعدادات الكاميرا:** `camera.keyframe(timeline, { scale: 1.05, duration: 1500, ease: AMG_STUDIO_EASES.cinematicSlowMo })`.
- **كود التحريك المعياري:**
```javascript
export function playSC061(timeline, { nodesSelector, pathsSelector, pulsesSelector, camera, start = 0 }) {
  // 1. رسم مسارات الربط
  timeline.add(pathsSelector, {
    strokeDashoffset: [100, 0],
    duration: 800,
    ease: AMG_STUDIO_EASES.snappyOut
  }, start);

  // 2. ظهور العقد وتوهجها
  timeline.add(nodesSelector, {
    scale: [0, 1],
    opacity: [0, 1],
    duration: 600,
    ease: AMG_STUDIO_EASES.overshoot,
    delay: stagger(100)
  }, start + 200);

  // 3. تدفق نبضات البيانات
  timeline.add(pulsesSelector, {
    opacity: [0, 1, 0],
    duration: 1000,
    ease: 'linear',
    loop: true
  }, start + 800);
}
```

---

### SC-062: Isometric Layer Explode
- **الهدف السردي:** تفكيك النظام السحابي أو المعالج إلى طبقاته الداخلية عمودياً (Exploded View).
- **تكوين المشهد:** حاوية إيزومترية ثلاثية الأبعاد `transform: rotateX(55deg) rotateZ(-45deg)`.
- **كود التحريك المعياري:**
```javascript
export function playSC062(timeline, { layers, camera, start = 0 }) {
  camera.keyframe(timeline, { isoTiltX: 55, isoRotateZ: -45, scale: 1.0, duration: 1200, ease: AMG_STUDIO_EASES.dramaticInOut, start });

  layers.forEach((layer, idx) => {
    timeline.add(layer, {
      translateZ: [0, (idx + 1) * 90],
      opacity: [0.3, 1],
      duration: 900,
      ease: AMG_STUDIO_EASES.overshoot
    }, start + 300 + idx * 120);
  });
}
```
