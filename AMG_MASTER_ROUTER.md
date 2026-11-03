# AMG Master Router (دليل التوجيه السريع لأي AI)
## The Ultimate Pure-HTML Motion Graphics AI Ecosystem (`AMG`)

> **مهمتك:** إنتاج موشن جرافيك سينمائي عالي الجودة باستخدام **HTML فقط (HTML5 / CSS3 / SVG / Canvas / JS)** عبر مراحل صارمة معزولة وبدون تشتيت أو عمل دفعة واحدة.

---

### جدول القرار السريع: ما هي خطوتك الحالية؟

افحص أولاً ملف `task_plan.md` داخل مجلد مشروعك في `workspace/<project-slug>/`:

| المرحلة النشطة | ما تقرأه فقط | ما تبنيه وتنتجه | بوابة القفل (Exit Gate) |
| :--- | :--- | :--- | :--- |
| **المرحلة 1: الرؤية والمسار** | هذا الملف + `tracks/TRACKS_OVERVIEW.md` | `stage-01-vision/01_creative_vision.md` (الاستعارة البصرية + منحنى الطاقة + الألوان) | تقييم إبداعي >= 9/10 وختم `STAGE_1_LOCKED` |
| **المرحلة 2: الإخراج واللقطات** | `01_creative_vision.md` + `vault/catalog/shots-index.json` | `stage-02-shotcraft/02_shotcraft_script.json` (بطاقات اللقطات + الكاميرا + التحول المتصل) | لا تكرار لنفس الحركة متتالياً وختم `STAGE_2_LOCKED` |
| **المرحلة 3: الذخيرة البصرية** | `02_shotcraft_script.json` + `vault/catalog/` | `stage-03-arsenal/` (الأيقونات المحددة + بطاقات Satori + المخططات) | فحص سلامة مسارات SVG وختم `STAGE_3_LOCKED` |
| **المرحلة 4: المسودة الزمنية** | `02_shotcraft_script.json` + `core/amg-clock.js` | `stage-04-animatic/04_animatic_draft.html` (مسودة أبيض وأسود لاختبار التوقيت) | فحص الإيقاع بـ `window.seek(t)` وختم `STAGE_4_LOCKED` |
| **المرحلة 5: اللوحات الثابتة** | `03_assets/` + `04_animatic_draft.html` | `stage-05-styleframes/scene-XX-static.html` (**لوحات ثابتة فائقة الجمال بدون تحريك!**) | فحص تداخل النصوص والمنطقة الآمنة وختم `STAGE_5_LOCKED` |
| **المرحلة 6: التحريك الفيزيائي** | اللوحة الثابتة من Stage 5 + `core/` + `vault/techniques/` | `stage-06-motion-scenes/scene-XX-motion.html` (**مشهد واحد في كل مرة بـ Anime.js v4**) | فحص 5 إطارات مفتاحية وتسليم `exitStateSnapshot` |
| **المرحلة 7: التجميع والتصدير** | المشاهد المحركة من Stage 6 + `core/amg-nullmotion-hud.js` | `stage-07-master/amg-master-standalone.html` (المقارنة المزدوجة + MP4) | فحص التزامن الكامل والتصدير النهائي |

---

### القوانين الذهبية الإلزامية:
1. **ممنوع العمل الدفعي (Zero Batch-Jumping):** لا تبدأ مرحلة قبل ختم سابقتها بـ `FOUNDATION_LOCKED`.
2. **فصل التصميم عن التحريك:** في المرحلة 5 تبني لوحة المشهد الثابتة وتتأكد من جمالها واستقرارها، وفي المرحلة 6 تحركها فقط.
3. **سلم Ponytail للاختصار:** استخدم المكونات الموجودة في `vault/techniques/` و`vault/icons/` أولاً، ولا تكتب كوداً مكرراً.
4. **الحتمية الزمنية:** كل التحريكات تقاد بـ `AMG.clock` وتستجيب بدقة لـ `window.seek(seconds)`.
