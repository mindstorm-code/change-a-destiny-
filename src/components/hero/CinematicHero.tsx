"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CHAPTERS } from "./chapters";

// Two ~10s clips instead of one long one — matches what image-to-video
// tools actually produce well (most degrade past ~10s), and gives two
// distinct moods instead of one clip stretched thin. Clip 1 covers the
// first half of the scroll (Passion + Purpose), clip 2 the second half
// (Power + The Path).
const VIDEO_SOURCES = ["/videos/path-walk-1.mp4", "/videos/path-walk-2.mp4"] as const;
const HANDOFF = 0.5; // scroll progress where clip 1 hands off to clip 2
const CROSSFADE = 0.03; // +/- window around the handoff for a soft blend

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // One-time client-only read (unknowable during SSR) — not a
    // synchronization loop, so the cascading-render concern this rule
    // targets doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function CinematicHero() {
  const reducedMotion = usePrefersReducedMotion();
  return reducedMotion ? <StaticHero /> : <ScrollHero />;
}

function StaticHero() {
  const chapter = CHAPTERS[0];
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="relative flex h-[80vh] min-h-[520px] w-full items-end justify-center">
        <Image
          src={chapter.photo}
          alt="A man walking a golden path alongside a figure of light, seen from behind"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-xl px-6 pb-14 text-center">
          <h1 className="font-serif-display text-3xl leading-[1.15] text-cream text-balance sm:text-5xl">
            Passion, Purpose, Power
            <span className="block italic text-gold-bright">and The Path.</span>
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-14 px-6 py-20">
        {CHAPTERS.map((c) => (
          <div key={c.kicker}>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-bright">
              {c.kicker}
            </p>
            <h2 className="mt-2 font-serif-display text-2xl text-cream text-balance sm:text-3xl">
              {c.title}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">{c.body}</p>
          </div>
        ))}
        <div className="text-center">
          <a
            href="#book"
            className="inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
          >
            Begin your path
          </a>
        </div>
      </div>
    </section>
  );
}

/** One half of the two-clip handoff: an actual <video>, scroll-scrubbed
 *  within its own local progress window, falling back to a static
 *  Ken-Burns photo if that specific clip fails to load. Each half is
 *  independent — clip 1 failing doesn't affect clip 2. */
function VideoLayer({
  src,
  fallbackPhoto,
  localProgressRef,
  opacityRef,
}: {
  src: string;
  fallbackPhoto: string;
  localProgressRef: React.MutableRefObject<number>;
  opacityRef: React.MutableRefObject<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const fallbackImgWrapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // A native <video error> for a fast local 404 can fire before React's
    // synthetic event system finishes attaching listeners, so the
    // `onError` prop alone misses it. Attach a listener directly to the
    // DOM node, and also proactively check `video.error` in case it was
    // already set by the time this effect runs.
    const video = videoRef.current;
    if (!video) return;
    if (video.error) {
      setFailed(true);
      return;
    }
    const onError = () => setFailed(true);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = Math.min(Math.max(localProgressRef.current, 0), 1);
      const video = videoRef.current;
      // Checked live every frame rather than via an onLoadedMetadata flag:
      // a video that loads instantly from local disk/cache can fire that
      // event before React finishes attaching the handler (the same race
      // already found and fixed for the error listener below), so a
      // one-time "became ready" flag can permanently miss it. Polling
      // readyState/duration directly has no such race.
      if (video && video.readyState >= 1 && !Number.isNaN(video.duration) && video.duration > 0) {
        video.currentTime = t * video.duration;
      }
      if (fallbackImgWrapRef.current) {
        const scale = 1 + t * 0.22;
        fallbackImgWrapRef.current.style.transform = `scale(${scale}) translate(${t * -4}%, ${t * 3}%)`;
      }
      if (layerRef.current) {
        layerRef.current.style.opacity = String(opacityRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={layerRef} className="absolute inset-0">
      {failed ? (
        <div ref={fallbackImgWrapRef} className="absolute inset-0">
          <Image
            src={fallbackPhoto}
            alt="A man walking a golden path alongside a figure of light, seen from behind"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function ScrollHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const localProgress1 = useRef(0);
  const localProgress2 = useRef(0);
  const opacity1 = useRef(1);
  const opacity2 = useRef(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [showCue, setShowCue] = useState(true);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    // Deliberately not throttled through requestAnimationFrame for the
    // discrete React state below: rAF can be suspended while the tab/pane
    // isn't visible, which would silently freeze chapter-text updates.
    // The continuous per-frame values (video currentTime, layer opacity)
    // are driven by each VideoLayer's own rAF loop reading the refs this
    // sets, so they stay smooth regardless of this listener's cadence.
    const measure = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const t = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;

      // Map global scroll progress onto each clip's own local 0..1 window,
      // and compute a short crossfade around the handoff point so the two
      // clips blend rather than hard-cut.
      localProgress1.current = Math.min(Math.max(t / HANDOFF, 0), 1);
      localProgress2.current = Math.min(Math.max((t - HANDOFF) / (1 - HANDOFF), 0), 1);
      const fade = Math.min(Math.max((t - (HANDOFF - CROSSFADE)) / (CROSSFADE * 2), 0), 1);
      opacity2.current = fade;
      opacity1.current = 1 - fade;

      const idx = Math.min(Math.floor(t * CHAPTERS.length), CHAPTERS.length - 1);
      setChapterIndex((prev) => (prev !== idx ? idx : prev));
      setNearEnd((prev) => (t > 0.94 ? true : t > 0.9 ? prev : false));
      if (t > 0.02) setShowCue((prev) => (prev ? false : prev));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const chapter = CHAPTERS[chapterIndex];

  return (
    <div ref={wrapperRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <VideoLayer
          src={VIDEO_SOURCES[0]}
          fallbackPhoto={CHAPTERS[0].photo}
          localProgressRef={localProgress1}
          opacityRef={opacity1}
        />
        <VideoLayer
          src={VIDEO_SOURCES[1]}
          fallbackPhoto={CHAPTERS[2].photo}
          localProgressRef={localProgress2}
          opacityRef={opacity2}
        />

        {/* Stronger scrim, weighted toward the bottom where text sits, so
            the chapter copy stays legible against any part of the video. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/15 to-ink/45" />

        {/* Small brand mark, bottom-right — also covers the AI-generator
            watermark burned into that corner of both source clips. */}
        <div className="pointer-events-none absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 backdrop-blur-sm sm:bottom-7 sm:right-7">
          <Image src="/images/logo-mark.png" alt="" width={22} height={22} className="opacity-90" />
        </div>

        <div className="absolute inset-x-0 bottom-24 flex justify-center px-6 sm:bottom-28 sm:justify-start sm:pl-16">
          <AnimatePresence mode="wait">
            {!showCue && (
            <motion.div
              key={chapterIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md rounded-2xl bg-ink/55 p-5 text-center backdrop-blur-md sm:p-6 sm:text-left"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-bright">
                {chapter.kicker}
              </p>
              <h2 className="mt-3 font-serif-display text-2xl leading-tight text-cream text-balance sm:text-4xl">
                {chapter.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream sm:text-base">
                {chapter.body}
              </p>
            </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {nearEnd && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 bottom-10 flex justify-center px-6"
            >
              <a
                href="#book"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
              >
                Begin your path
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Opening title card — the framework name itself is the headline
            of the whole experience, shown large before the first chapter
            beat takes over as the user starts scrolling. */}
        <AnimatePresence>
          {showCue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <h1 className="font-serif-display text-3xl leading-[1.15] text-cream text-balance sm:text-6xl">
                Passion, Purpose, Power
                <span className="block italic text-gold-bright">and The Path.</span>
              </h1>
              <div className="mt-10 flex flex-col items-center gap-1 text-muted">
                <span className="text-[11px] uppercase tracking-[0.28em]">Scroll to begin</span>
                <ChevronDown size={16} className="animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
