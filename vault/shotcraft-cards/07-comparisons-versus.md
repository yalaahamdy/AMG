# Shotcraft Family 07: Comparisons & Versus
## بطاقات المقارنات الحاسمة قبل وبعد (Before vs. After)

---

### SC-091: Wipe Slider Split
- **الهدف السردي:** إبراز الفرق الهائل بين العالم القديم المعقد والعالم الجديد النقي عبر شريط مسح متحرك.
- **تكوين المشهد:** شاشتان متطابقتان مفصولتان بقناع قطري أو عمودي `clip-path` وشريط فاصل متوهج.
- **كود التحريك المعياري:**
```javascript
export function playSC091(timeline, { dividerSelector, maskContainerSelector, camera, start = 0 }) {
  // حركة الكاميرا المتزامنة
  camera.keyframe(timeline, { rotateZ: -1.0, scale: 1.04, duration: 1000, ease: AMG_STUDIO_EASES.snappyOut, start });

  // حركة شريط التقسيم
  timeline.add(dividerSelector, {
    left: ['15%', '65%'],
    duration: 1100,
    ease: AMG_STUDIO_EASES.dramaticInOut
  }, start + 200);

  // تحديث قناع الشاشة العلوية
  timeline.add(maskContainerSelector, {
    clipPath: ['inset(0 85% 0 0)', 'inset(0 35% 0 0)'],
    duration: 1100,
    ease: AMG_STUDIO_EASES.dramaticInOut
  }, start + 200);
}
```

---

### SC-092: Old-vs-New Speed Race
- **الهدف السردي:** مقارنة سرعة الإنجاز بين الطريقة التقليدية (بطيئة ومتعثرة) والمنظومة الجديدة (فورية وناجحة).
