/**
 * Tiny global scroll-lock bridge.
 *
 * The mobile nav needs to freeze the page while it's open, but the Lenis
 * smooth-scroll instance lives inside its own provider effect. Rather than
 * thread a context through the tree, the provider registers stop/start
 * callbacks here, and any component can call lockScroll/unlockScroll.
 *
 * When Lenis is disabled (reduced motion) the callbacks are no-ops and the
 * <html> overflow toggle below still freezes native scrolling.
 */

type ScrollController = {
  stop: () => void;
  start: () => void;
};

let controller: ScrollController | null = null;

export function registerScrollController(next: ScrollController | null) {
  controller = next;
}

export function lockScroll() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("scroll-locked");
  controller?.stop();
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("scroll-locked");
  controller?.start();
}
