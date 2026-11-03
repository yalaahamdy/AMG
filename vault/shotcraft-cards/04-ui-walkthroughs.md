# Shotcraft Family 04: UI Walkthroughs & Bento Grids
## بطاقات استعراض الواجهات وبطاقات Bento التفاعلية

---

### SC-046: Cursor Spotlight Click
- **الهدف السردي:** إبراز ميزة استثنائية في المنتج من خلال مؤشر ماوس ناعم يتحرك بانسيابية وينقر لتنشيط البطاقة.
- **تكوين المشهد (Visual Setup):**
  - بطاقة داكنة ذات إطار دقيق `1px border: rgba(255,255,255,0.14)`.
  - مؤشر SVG بتصميم تقني أنيق مع ظل ناعم `drop-shadow`.
- **إعدادات الكاميرا:** حركة زووم مقترب تدريجي `scale: 1.0 -> 1.15` مع تركيز البصر على منطقة النقر.
- **كود التحريك المعياري (Pure HTML + Anime.js v4):**
```javascript
export function playSC046(timeline, { cursorSelector, cardSelector, camera, start = 0 }) {
  // 1. حركة الكاميرا
  camera.keyframe(timeline, { scale: 1.12, duration: 1200, ease: AMG_STUDIO_EASES.snappyOut, start });

  // 2. انزلاق المؤشر نحو الزر
  timeline.add(cursorSelector, {
    translateX: [100, 0],
    translateY: [80, 0],
    opacity: [0, 1],
    duration: 700,
    ease: AMG_STUDIO_EASES.snappyOut
  }, start + 200);

  // 3. النقر والارتداد
  timeline.add(cursorSelector, {
    scale: [1, 0.85, 1],
    duration: 300,
    ease: AMG_STUDIO_EASES.overshoot
  }, start + 850);

  // 4. استجابة البطاقة وتوهج الإطار
  timeline.add(cardSelector, {
    scale: [1, 1.03, 1],
    borderColor: ['rgba(255,255,255,0.14)', '#38bdf8', 'rgba(56,189,248,0.4)'],
    boxShadow: ['0 10px 30px rgba(0,0,0,0.5)', '0 20px 60px rgba(56,189,248,0.3)', '0 15px 40px rgba(56,189,248,0.15)'],
    duration: 600,
    ease: AMG_STUDIO_EASES.overshoot
  }, start + 950);
}
```

---

### SC-047: Bento Grid Cascade
- **الهدف السردي:** إظهار منظومة الميزات دفعة واحدة بتكوين شبكي مرن يدخل بفيزياء النوابض المتتابعة.
- **تكوين المشهد:** شبكة Bento ثلاثية أو رباعية الأعمدة متناسقة بنظام أبعاد 1920x1080.
- **كود التحريك المعياري:**
```javascript
export function playSC047(timeline, { gridCardsSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { scale: 1.0, rotateZ: 0, duration: 1000, ease: AMG_STUDIO_EASES.snappyOut, start });
  
  timeline.add(gridCardsSelector, {
    translateY: [60, 0],
    opacity: [0, 1],
    scale: [0.92, 1],
    duration: 750,
    ease: AMG_STUDIO_EASES.overshoot,
    delay: stagger(90, { from: 'center' })
  }, start);
}
```
