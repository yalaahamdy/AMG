# CLAUDE.md — Claude Code Guidelines for AMG

## Operational Principles for Claude
1. Follow `AGENTS.md` and `AMG_MASTER_ROUTER.md` at all times.
2. Adhere strictly to the 7-stage isolated pipeline. Never batch stages together.
3. Every scene must be purely executable HTML/CSS/SVG/JS (Zero build required for the browser to run it).
4. Do not use React, JSX, or external bundlers for the output videos.
5. In Stage 5, build static styleframes with zero animation code. Verify visual balance first.
6. In Stage 6, add motion to one scene at a time using Anime.js v4 and D3.
7. Always verify that `window.seek(seconds)` deterministically seeks every frame.
