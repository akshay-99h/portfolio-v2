/**
 * The only easings allowed site-wide. Fast-out, no bounce, no elastic.
 * Mirrors --ease-out-strong / --ease-in-out-strong in globals.css.
 */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [
  0.77, 0, 0.175, 1,
];

/** GSAP-compatible ease strings for the same curves. */
export const GSAP_EASE_OUT = "expo.out";
export const GSAP_EASE_IN_OUT = "power3.inOut";
