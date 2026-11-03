/**
 * AMG Visual Accents & Micro-Interactions Vault Module
 * The Ultimate Pure-HTML Motion Graphics AI Ecosystem
 */
export const visualAccents = {
  /**
   * شرارة انفجار هندسي صغير عند ظهور عنصر (Burst Spark)
   */
  burstSpark(timeline, containerSelector, { x = 0, y = 0, count = 8, start = 0, duration = 500 } = {}) {
    const root = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
    if (!root) return;

    const burstGroup = document.createElement('div');
    burstGroup.className = 'amg-burst-spark';
    burstGroup.style.cssText = `position:absolute; left:${x}px; top:${y}px; pointer-events:none; z-index:99;`;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 360;
      const rad = (angle * Math.PI) / 180;
      const dist = 32;
      const spark = document.createElement('div');
      spark.style.cssText = `
        position:absolute; width:4px; height:4px; border-radius:50%; background:#38bdf8;
        transform: translate(${Math.cos(rad) * 4}px, ${Math.sin(rad) * 4}px);
        opacity: 1;
      `;
      burstGroup.appendChild(spark);

      timeline.add(spark, {
        translateX: Math.cos(rad) * dist,
        translateY: Math.sin(rad) * dist,
        opacity: [1, 0],
        scale: [1, 0.2],
        duration,
        ease: 'outExpo'
      }, start);
    }

    root.appendChild(burstGroup);
  }
};
