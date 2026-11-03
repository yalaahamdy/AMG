# Shotcraft Family 06: Data Metric Slams
## بطاقات الأرقام والإحصائيات الصادمة والانفجار البياني

---

### SC-076: Odometer Rolling Stat
- **الهدف السردي:** إبراز إنجاز كمي ضخم أو سرعة قياسية عبر عداد رقمي يتدحرج بسرعة فائقة ثم يستقر بنعومة.
- **تكوين المشهد:** رقم عملاق بخط Monospace وتدرج لوني معدني أو زمردي `#10b981`.
- **كود التحريك المعياري:**
```javascript
export function playSC076(timeline, { numberElement, from = 0, to = 99.9, suffix = '%', camera, start = 0 }) {
  const el = typeof numberElement === 'string' ? document.querySelector(numberElement) : numberElement;
  if (!el) return;

  const proxy = { val: from };
  timeline.add(proxy, {
    val: to,
    duration: 1400,
    ease: AMG_STUDIO_EASES.snappyOut,
    onUpdate: () => {
      el.textContent = `${proxy.val.toFixed(1)}${suffix}`;
    }
  }, start);

  // نبضة تكبير طفيفة عند اكتمال الرقم
  timeline.add(el, {
    scale: [1, 1.08, 1],
    duration: 400,
    ease: AMG_STUDIO_EASES.overshoot
  }, start + 1200);
}
```

---

### SC-077: Chart Line Breakout
- **الهدف السردي:** إظهار تفوق كاسح لبيانات المنظومة باختراق سقف المخطط البياني.
- **كود التحريك المعياري:**
```javascript
export function playSC077(timeline, { chartPathSelector, breakoutPointSelector, camera, start = 0 }) {
  camera.keyframe(timeline, { scale: 1.1, translateY: -50, duration: 1200, ease: AMG_STUDIO_EASES.snappyOut, start });

  timeline.add(chartPathSelector, {
    strokeDashoffset: [100, 0],
    duration: 1000,
    ease: AMG_STUDIO_EASES.snappyOut
  }, start);

  timeline.add(breakoutPointSelector, {
    scale: [0, 1.5, 1],
    opacity: [0, 1],
    duration: 500,
    ease: AMG_STUDIO_EASES.overshoot
  }, start + 850);
}
```
