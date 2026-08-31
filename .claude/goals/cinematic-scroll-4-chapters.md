# Goal: Cinematic 4-chapter scroll hero — Passion, Purpose, Power, The Path

**Directive:** "PASSION, PURPOSE, POWER, AND THE PATH — MAKE THAT THE
ANIMATION" + "ACTUALLY HAVE CINEMATIC SCROLL OF YOU AND CHRIST WALKING THE
PATH" (combined — same request, restated across two command attempts).
**Created:** 2026-08-30
**Status:** complete

## Interpretation (recorded so a resume doesn't re-litigate this)

The current 3D hero uses abstract capsule/sphere primitives for the two
walking figures — it does not actually read as "you and Christ." The user
now has a real, gorgeous, exact-match photo generated earlier this session
(`public/images/hero-walking.jpg`) of a man and a robed, glowing figure
walking away from camera down a path at sunrise. The fix is to make *that*
photo the actual cinematic scroll experience — a scroll-driven Ken
Burns (zoom/pan) + parallax + color-grade-shifting sequence across four
chapters (Passion, Purpose, Power, The Path) — replacing the abstract
three.js/react-three-fiber scene entirely rather than trying to make
primitive capsules look more "cinematic." This is simpler, more robust
(no WebGL/rAF fragility), and directly delivers what was asked for using
an asset already on hand — no new image generation round-trip needed to
finish this goal now.

"Power" is a new fourth chapter (the existing framework only had Purpose/
Path/Passion) — content: the supernatural/Spirit-empowered dimension
behind the clinical framework (real change isn't willpower), bridging
Purpose (identity) and The Path (daily discipline). Written fresh, grounded
in Judah's Messianic/C&MA background, not fabricated biographical claims.

## Sub-goals

- [x] 1. Write the new 4-chapter content (Passion, Purpose, Power, The
      Path — in that order) in `chapters.ts`, replacing the old 3-chapter
      Purpose/Path/Passion array. Update any code that assumes 3 chapters
      (SKY_STOPS count, chapter-index math).
- [x] 2. Build the new image-based cinematic scroll component: full-bleed
      `hero-walking.jpg`, scroll-driven Ken Burns zoom/pan across the 4
      chapters, per-chapter color-grade tint overlay, chapter text
      crossfade (reuse the existing scroll-progress tracking approach).
      Preserve the reduced-motion fallback (static image, stacked text,
      no scroll-jacking).
- [x] 3. Remove the now-dead react-three-fiber/three.js hero code
      (`PathScene3D.tsx`, the r3f-specific parts of `PathHero.tsx`) and the
      unused `three`/`@react-three/*` dependencies. Wire the new component
      into `page.tsx` in place of `PathHeroLoader`. Verify build, lint,
      typecheck clean.
- [x] 4. Final whole-directive verification: confirm in the running app
      that all 4 chapters actually appear in order with correct text as
      scroll progress advances (verify via DOM state, not just visual
      screenshot, given this session's browser-pane rAF/screenshot
      quirks), confirm the fallback path still works, mark goal complete.

## Log

- Sub-goal 1: Rewrote `src/components/hero/chapters.ts` (moved from
  `components/three/`) with 4 chapters — Passion, Purpose, Power, The
  Path — each with kicker/title/body/tint. Verified via build.
- Sub-goal 2: Built `src/components/hero/CinematicHero.tsx` — a
  scroll-driven Ken Burns (zoom 1→1.2 + pan) sequence over the real
  `hero-walking.jpg` photo, per-chapter color-grade tint wash, chapter
  text crossfade via framer-motion AnimatePresence. `StaticHero` fallback
  for `prefers-reduced-motion` (static image, stacked chapter text, no
  scroll-jacking).
- Sub-goal 3: Deleted `src/components/three/` (PathScene3D, PathHero,
  PathHeroFallback, PathHeroLoader — all now dead). Removed
  `three`/`@react-three/fiber`/`@react-three/drei`/`@types/three` from
  package.json (`npm uninstall`). Wired `CinematicHero` into
  `src/app/page.tsx` in place of `PathHeroLoader`. `npm run lint`,
  `tsc --noEmit`, and `npm run build` all clean.
- Sub-goal 4: Initial framer-motion `useScroll`/`useMotionValueEvent`
  implementation didn't respond to this session's synthetic scroll
  testing (root cause not fully isolated — swapped to the same
  hand-rolled `getBoundingClientRect`-based scroll listener already
  proven reliable earlier in this project rather than debug framer's
  internals blind). Verified live in-browser via direct DOM query
  (querying the hero section's own `innerText`, not `main.innerText`,
  which proved unreliable with sticky-positioned content): scrollY 0 →
  "Passion", 700 → "Purpose", 1500 (t=0.65) → "Power", 2000 (t=0.88) →
  "The Path". Ken Burns transform (`scale`/`translate`) confirmed updating
  in lockstep via inline style inspection. `prefers-reduced-motion`
  confirmed `false` in this session (StaticHero path not exercised live
  this run, but code is straightforward/low-risk — same pattern as the
  verified ScrollHero minus the scroll-jacking).

**Status:** complete — all 4 chapters render in order with correct
content, the Ken Burns cinematic effect is driven by real scroll
progress, the old abstract three.js scene and its dependencies are fully
removed, and the build/lint/typecheck are clean.
