# Goal: Scroll-scrubbed video hero (the actual vision)

**Directive:** "i don't think your getting my vision the people go along
the path, and then have the [scroll-driven background video effect, per
the linked tutorial: a video clip where scroll position drives which
frame is showing — scroll down plays it forward, scroll up reverses it,
like Apple product pages / the Rolls-Royce Dribbble-mockup-to-video
example in the tutorial]."
**Created:** 2026-08-30
**Status:** in-progress

## Correction (recorded so a resume doesn't re-litigate this)

Two prior goals (`cinematic-scroll-4-chapters.md`,
`cinematic-3d-photo-parallax.md`) built increasingly elaborate *still-image*
approaches (CSS Ken Burns, then a full react-three-fiber depth-parallax
scene with photo planes + particles). Both missed the actual ask: the user
wants **an actual video clip** of the two figures walking, bound to scroll
position (`video.currentTime = scrollProgress * video.duration`), not a
3D scene built from stills. This is a fundamentally different, much
simpler technique — no WebGL at all, which also sidesteps the real
`WebGLRenderer: Context Lost` bug found in the 3D-scene goal.

**No ffmpeg available in this environment** (checked, not installed) — so
the implementation binds directly to an HTML5 `<video>` element's
`currentTime` rather than extracting frames to a canvas image-sequence
(the more frame-perfect technique big product sites use, but it needs a
frame-extraction pipeline this environment can't run). Direct
`<video>.currentTime` scrubbing is the simpler, still-solid fallback
technique and doesn't require any new tooling.

**No video-generation tool is connected in this session** (imaginepro
failed to connect; no working video-gen MCP tool found). The actual video
clip has to come from the user the same way the photos did — generate it
externally (image-to-video, from an existing still) and hand it back.

## Sub-goals

- [x] 1. Write and deliver the image-to-video generation prompt (source:
      the existing `hero-walking.jpg`) for the user to run externally.
- [x] 2. Remove the now-wrong three.js/react-three-fiber depth-parallax
      code (`DepthScene.tsx`, `DepthSceneLoader.tsx`) and the
      `three`/`@react-three/*` dependencies — this is the second time
      this dependency has been added and removed in this project; do not
      re-add it again without a real 3D requirement.
- [x] 3. Build `ScrollVideoHero` (or rework `CinematicHero`): tall
      scroll wrapper, sticky pinned `<video>` (muted, `playsInline`,
      `preload="auto"`, no native controls/autoplay), scroll listener
      (reuse the proven `getBoundingClientRect` pattern) sets
      `video.currentTime` directly. Keep the existing 4-chapter text
      overlay (kicker/title/body crossfade) layered on top, driven by the
      same scroll progress — same content, new background mechanism.
      Placeholder: until the real video file exists, `<video>` `onError`
      falls back to the already-built, already-verified Ken-Burns static
      photo (reuse that exact fallback component/logic, don't rebuild it).
- [x] 4. Verify: build/lint/typecheck clean; confirm the graceful
      fallback actually engages while no real video file exists yet
      (verify via DOM, same technique as prior goals); confirm chapter
      text still crossfades correctly.
- [x] 5. **Revised scope (user request):** two ~10s clips instead of one
      long one — matches real image-to-video tool limits better than one
      stretched clip. First half of scroll (0–50%, Passion+Purpose
      chapters) plays clip 1; second half (50–100%, Power+Path chapters)
      plays clip 2, each independently scroll-scrubbed within its own
      half, with a short crossfade at the handoff. Built and verified —
      see log. Still **blocked on the user** for the two actual video
      files.

## Log

- Sub-goal 1: Delivered an image-to-video prompt in chat, using
  `hero-walking.jpg` as the source frame (slow forward dolly following
  the two figures, natural walking motion, gentle fabric/wheat sway, no
  new elements introduced, single continuous 6–8s shot).
- Sub-goals 2–4: Removed `DepthScene.tsx`/`DepthSceneLoader.tsx` and
  `three`/`@react-three/fiber`/`@react-three/drei`/`@types/three` (second
  time this dependency has been added then removed in this project —
  worth remembering before reaching for it a third time). Rebuilt
  `CinematicHero.tsx`'s `ScrollHero`: a `<video>` element (muted,
  playsInline, no controls/autoplay) whose `currentTime` is set directly
  from the same proven `getBoundingClientRect` scroll listener
  (`video.currentTime = t * video.duration`) — genuine scroll-scrubbing,
  reversible by scrolling up, no WebGL involved.
  **Real bug found and fixed:** a native `<video>` `error` event for a
  fast local 404 fires before React finishes attaching its synthetic
  event listeners, so the `onError` JSX prop alone silently missed it
  (confirmed: `video.error` was set — code 4, format error — but
  `videoFailed` state never flipped, reproduced across a full clean
  `.next` + dev-server restart, ruling out HMR staleness). Fixed by
  attaching a native `addEventListener("error", ...)` directly to the
  video DOM node in a `useEffect`, plus a proactive check for
  `video.error` already being set when the effect first runs. Verified
  live: fresh navigation with no video file present correctly shows the
  fallback Ken-Burns photo (`fallbackImgFound: true`,
  `videoStillPresent: false`) with no manual intervention, and chapter
  progression through the fallback still resolves correctly
  (scrollY 1500 → "power", matching prior verification).

**Status:** complete — real video files are live and verified working.

- Sub-goal 5 (revised): rebuilt `CinematicHero.tsx` around a new
  `VideoLayer` component — two independent instances stacked, each with
  its own local scroll-progress window (clip 1: global t 0→0.5 mapped to
  local 0→1; clip 2: t 0.5→1), each with its own ready/failed state and
  its own Ken-Burns photo fallback (clip 1 falls back to
  `CHAPTERS[0].photo` i.e. passion.jpg, clip 2 to `CHAPTERS[2].photo` i.e.
  power.jpg). A short crossfade (±0.03 scroll-progress around the 0.5
  handoff) blends opacity between the two layers rather than a hard cut.
  Each layer runs its own `requestAnimationFrame` loop reading shared refs
  (`localProgress1/2`, `opacity1/2`) set by the single scroll listener, so
  the continuous per-frame values stay smooth independent of the
  listener's cadence — same pattern used for the fallback Ken Burns
  transform in the prior single-video version.
  Verified live end to end: both layers correctly fall back independently
  with no video files present (`fallbackSrcs: ["passion","power"]`,
  `videoCount: 0`); crossfade opacity is clean at both edges (t=0.3 →
  `["1","0"]`, t=0.75 → `["0","1"]`) and blends correctly at the
  handoff; chapter text still resolves correctly across the whole scroll
  range (spot-checked at t=0.75 → "The Path", after allowing render
  settle time — same known short delay as previous goals' verification,
  not a bug). Build/lint/typecheck all clean.

User provided both real clips (`path-walk-1.mp4` 10.0s, `path-walk-2.mp4`
20.0s — longer than the requested ~10s, but the scrubbing math doesn't
assume a fixed duration so this needed no code change). Copied into
`public/videos/`.

**Real bug #2 found and fixed:** the exact same race-condition class as
the earlier `onError` bug, this time on `loadedmetadata` — a video that
loads instantly from local disk fires that event before React's synthetic
handler attaches, so the one-time "ready" ref (`videoReadyRef`) never got
set, and `currentTime` silently stayed frozen at 0 even though
`video.duration` resolved correctly and no error occurred. Root-caused by
checking `video.currentTime` directly after a real scroll (stayed 0)
while confirming the surrounding rAF tick loop and shared refs *were*
running correctly (opacity crossfade updated fine, isolating the bug to
the `videoReadyRef` gate specifically). Fixed by removing the one-time
ready flag entirely and polling `video.readyState >= 1 &&
!Number.isNaN(video.duration) && video.duration > 0` directly inside the
per-frame tick — no event-timing race possible since it reads live
element state every frame instead of relying on an event having fired.

Verified live end to end with the real files: both videos load with
`error: null`, `readyState: 4`; forward scrub confirmed (video1 reaches
exactly `10.005` — its full duration — once scroll passes the halfway
handoff, an exact match proving the mapping is correct, not approximate);
reverse scrub confirmed (scrolling from t=0.55 back to t=0.52 dropped
video2's `currentTime` from `20.01` to `19.32` — genuine reversal, not
just a different forward position).

**Not yet done, not blocking:** combined video weight is ~18MB (6.9MB +
11.2MB), fairly heavy for a marketing page's hero, especially mobile. No
ffmpeg available in this environment to compress. Worth a follow-up pass
(client-side compression tool, or a hosted transcoding step) before this
goes live, but not addressed in this goal.

**Status: complete.**

## Follow-up: user feedback "its not great" (2026-08-31)

Diagnosed via `AskUserQuestion` rather than guessing again (this project
already burned two prior goals on wrong-direction guesses) — user selected
all three: janky scroll, doesn't feel cinematic/premium, something looks
broken. Investigated directly instead of asking for more description:

1. **Root cause of "janky":** installed `ffmpeg-static` +
   `ffprobe-static` (both npm-installable, no system ffmpeg needed —
   confirmed working on Windows) and probed the actual video files.
   `path-walk-1.mp4` had exactly **1 keyframe for its entire 10s**;
   `path-walk-2.mp4` had **2 keyframes across 20s**. Scroll-scrubbing
   requires seeking to arbitrary timestamps constantly — with almost no
   keyframes, the browser must decode forward from the one keyframe every
   time, which is inherently slow. Measured empirically: original avg
   seek latency **251ms** (worst case 514ms) vs. re-encoded avg **16ms**
   (worst case 37ms) — re-encoded with `ffmpeg -c:v libx264 -crf 23 -g 6
   -keyint_min 6 -sc_threshold 0 -an` (dropped the unused audio track
   too, the element is always `muted`). Originals backed up to
   `public/videos/original/` (gitignored). Fixed files also came out
   smaller despite the added keyframes (5.6MB vs 6.9MB, 10.3MB vs
   11.2MB) thanks to CRF encoding + no audio.
2. **Root cause of "not cinematic" / "something broken":** extracted
   frame 0 of both videos via ffmpeg and compared directly against the
   intended source stills. Both videos turned out to be generated from
   **the same source image** — the dramatic god-rays/olive-tree scene
   (matching `power.jpg`), not the two *different* images the prompts
   specified (`hero-walking.jpg` for clip 1, `power.jpg` for clip 2).
   This is a real content problem, not something fixable in code: the
   "Passion"/"Purpose" chapter text was sitting over dramatic storm
   imagery it was never meant to, and there was no visual variety across
   the scroll (both clips looking near-identical). Reported to the user
   with the extracted comparison frames as evidence, asking them to
   regenerate clip 1 from the correct `hero-walking.jpg` source.

**Status:** jankiness fixed and verified; content-mismatch flagged to
user, blocked on a regenerated clip 1.
