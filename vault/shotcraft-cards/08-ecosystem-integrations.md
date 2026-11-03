# Shotcraft Family 08: Ecosystem Integrations
## بطاقات تكامل المنظومة والمدارات الكوكبية للشعارات

---

### SC-106: Brand Constellation Orbit
- **الهدف السردي:** إبراز تكامل المنتج مع كافة الأدوات والتقنيات عبر دوران كوكبي ثلاثي الأبعاد للأيقونات حول المنصة المركزية.
- **تكوين المشهد:** أيقونة مركزية كبرى محاطة بـ 6 إلى 8 أيقونات تدور في مدار بيضاوي `preserve-3d`.
- **كود التحريك المعياري:**
```javascript
export function playSC106(timeline, { orbitContainerSelector, coreLogoSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { isoTiltX: 25, scale: 1.05, duration: 1400, ease: AMG_STUDIO_EASES.cinematicSlowMo, start });

  // نبضة النواة المركزية
  timeline.add(coreLogoSelector, {
    scale: [0.8, 1.0],
    opacity: [0, 1],
    duration: 800,
    ease: AMG_STUDIO_EASES.overshoot
  }, start);

  // دوران المدار
  timeline.add(orbitContainerSelector, {
    rotateZ: [0, 360],
    duration: 10000,
    ease: 'linear',
    loop: true
  }, start + 300);
}
```

---

### SC-107: Central Hub Magnet
- **الهدف السردي:** جذب كافة الخدمات والأدوات السحابية من أطراف الشاشة واستقرارها مغناطيسياً في المركز.
