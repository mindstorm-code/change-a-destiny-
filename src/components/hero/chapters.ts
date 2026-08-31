export type Chapter = {
  kicker: string;
  title: string;
  body: string;
  /** CSS color used for the static-fallback color wash. */
  tint: string;
  /** 3D-scene fog color for this chapter, as 0..1 RGB. */
  fog: [number, number, number];
  /** Public path to this chapter's photo plane — each chapter has its
   *  own distinct photo. */
  photo: string;
};

export const CHAPTERS: Chapter[] = [
  {
    kicker: "Passion",
    title: "Something in you refuses to stay comfortable.",
    body: "Not burnout exactly — more like restlessness with a life that performs faith instead of living it. That restlessness isn't a problem to medicate. It's the start of the path.",
    tint: "rgba(90, 100, 150, 0.28)",
    fog: [0.09, 0.1, 0.16],
    photo: "/images/passion.jpg",
  },
  {
    kicker: "Purpose",
    title: "Every path begins with a question.",
    body: "Not “what should I do” — “who am I, created to be?” Rooted in the Hebrew foundations of faith, before it becomes a framework for living.",
    tint: "rgba(224, 168, 96, 0.22)",
    fog: [0.55, 0.4, 0.22],
    photo: "/images/purpose.jpg",
  },
  {
    kicker: "Power",
    title: "Real change was never a matter of willpower.",
    body: "You don't need more willpower. You need something greater than willpower working underneath you — a real clinical framework, not another self-help slogan. That's what actually carries you from knowing to becoming.",
    tint: "rgba(168, 108, 40, 0.3)",
    fog: [0.4, 0.32, 0.3],
    photo: "/images/power.jpg",
  },
  {
    kicker: "The Path",
    title: "This becomes your daily discipline.",
    body: "Not a weekend high you chase again next month. A framework you actually walk — name the hurt, practice the discipline, become whole. Daily, not theoretically.",
    tint: "rgba(240, 197, 120, 0.24)",
    fog: [0.6, 0.46, 0.24],
    photo: "/images/hero-walking.jpg",
  },
];
