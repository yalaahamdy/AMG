# Shotcraft Family 10: Climax & Outro Lockups
## بطاقات الذروة والخاتمة وشعار الإطلاق النهائي

---

### SC-136: Tagline Stagger Lockup
- **الهدف السردي:** ختم الفيديو بشعار المنتج والعنوان التسويقي النهائي مع ظهور واثق وفخم للعناصر.
- **كود التحريك المعياري:**
```javascript
export function playSC136(timeline, { logoSelector, titleUnits, subSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { scale: 1.0, rotateZ: 0, duration: 900, ease: AMG_STUDIO_EASES.snappyOut, start });

  // 1. الشعار المركزي
  timeline.add(logoSelector, {
    scale: [0.85, 1],
    opacity: [0, 1],
    duration: 700,
    ease: AMG_STUDIO_EASES.overshoot
  }, start);

  // 2. الكلمات بالعربية
  AMGArabicTypographyPro.animateReveal(timeline, titleUnits, { start: start + 250, duration: 650 });

  // 3. النص الفرعي
  timeline.add(subSelector, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    ease: AMG_STUDIO_EASES.snappyOut
  }, start + 500);
}
```

---

### SC-137: CTA Magnetic Button Climax
- **الهدف السردي:** دفع المشاهد لاتخاذ إجراء فوري (Call To Action) بزر إطلاق سينمائي يشع طاقة وموجات نيون.
- **كود التحريك المعياري:**
```javascript
export function playSC137(timeline, { buttonSelector, glowRingSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { scale: 1.08, duration: 1000, ease: AMG_STUDIO_EASES.snappyOut, start });

  timeline.add(buttonSelector, {
    scale: [0.7, 1.05, 1],
    opacity: [0, 1],
    duration: 650,
    ease: AMG_STUDIO_EASES.overshoot
  }, start);

  // موجات الإشعاع النبضي
  timeline.add(glowRingSelector, {
    scale: [1, 2.2],
    opacity: [0.8, 0],
    duration: 1200,
    ease: AMG_STUDIO_EASES.cinematicSlowMo,
    loop: true
  }, start + 400);
}
```
