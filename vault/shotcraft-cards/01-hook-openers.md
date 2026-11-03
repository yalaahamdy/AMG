# Shotcraft Family 01: Hook Openers (0s - 3s)
## بطاقات اللقطات الافتتاحية الخاطفة

---

### SC-001: Kinetic Slam
- **الهدف السردي:** كسر حاجز الملل الفوري لدى المشاهد بضربة عنوان ضخمة مع ارتداد فيزيائي.
- **إعدادات الكاميرا الافتراضية:**
  - البداية: `scale: 1.35, rotateZ: -2deg`
  - الهدف: `scale: 1.0, rotateZ: 0deg`
  - المنحنى: `outExpo` بمدة `450ms` + هزة كاميرا `impulse(0.5)`.
- **كود التحريك المعياري (Pure HTML + Anime.js v4):**
```javascript
export function playSC001(timeline, { titleSelector = '.hero-title', camera, start = 0 }) {
  camera.keyframe(timeline, { scale: 1.0, rotateZ: 0, duration: 450, ease: 'outExpo', start });
  camera.impulse(timeline, 0.45, start + 300, 500);

  timeline.add(titleSelector, {
    scale: [1.8, 1.0],
    opacity: [0, 1],
    duration: 500,
    ease: 'outExpo'
  }, start);
}
```

---

### SC-002: Question Typewriter
- **الهدف السردي:** إلقاء تساؤل جوهري على المشاهد بنمط كتابة متسارع يثير الفضول.
- **إعدادات الكاميرا:** حركة `BreathingIdle` بطيئة مع تقريب تدريجي `scale: 1.0 -> 1.08`.
```javascript
export function playSC002(timeline, { textSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { scale: 1.06, duration: 2500, ease: 'inOutQuad', start });
  // يستخدم تقنية maskSlideUp أو typewriter
}
```
