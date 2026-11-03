# Shotcraft Family 09: Kinetic Transitions & Match-Cuts
## بطاقات التحولات الحركية وجسور الربط المتصلة

---

### SC-121: Shape Morph Bridge
- **الهدف السردي:** تحول هندسي متصل لعنصر المشهد الأول ليصبح العنصر المركزي في المشهد الثاني دون أي انقطاع.
- **التطبيق البرمجي:** يعتمد على `AMGMorphBridge.bridgeShapeMorph(timeline, srcPath, targetPath, options)`.

---

### SC-122: Whip Pan Match-Cut
- **الهدف السردي:** انتقال كاميرا خاطف وشديد السرعة بين زاويتين يطمس الفاصل بين المشهدين بحركة غشاوة حركية.
- **التطبيق البرمجي:** يعتمد على `AMGMorphBridge.bridgeWhipPan(timeline, camera, currentScene, nextScene)`.
