import { ImageResponse } from "next/og";

/**
 * Shared OpenGraph image template — the site's drafting-sheet language, reused
 * across every route so social previews stay consistent. Each page passes its
 * own sheet number, eyebrow, headline, and footer note.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#e8e5de";
const PAPER = "#0a0a09";
const SIGNAL = "#2dbab4";
const RULE = "rgba(232, 229, 222, 0.22)";
const MUTED = "rgba(232,229,222,0.6)";
const SUBTLE = "rgba(232,229,222,0.78)";

type SheetProps = {
  /** Top-right sheet marker, e.g. "Sheet 02 / Agency". */
  sheet: string;
  /** Small eyebrow above the headline, e.g. "Capabilities". */
  eyebrow?: string;
  /** The large headline — the page subject. */
  headline: string;
  /** One-line supporting note under the headline. */
  note?: string;
  /** Footer right slot; defaults to the domain. */
  footerRight?: string;
};

const CubeMark = () => (
  <svg width="96" height="112" viewBox="0 0 24 28" aria-hidden="true">
    <title>Akxost</title>
    <path d="M12 2 22 8 12 14 2 8Z" fill={SIGNAL} />
    <path d="M2 8 12 14v12L2 20Z" fill={SIGNAL} opacity="0.72" />
    <path d="M22 8 12 14v12l10-6Z" fill={SIGNAL} opacity="0.45" />
  </svg>
);

/** Renders the shared sheet as a Next.js ImageResponse. */
export function renderOgImage({
  sheet,
  eyebrow,
  headline,
  note,
  footerRight = "akxost.com",
}: SheetProps) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        color: INK,
        padding: "56px 72px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Sheet header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${RULE}`,
          paddingTop: 20,
          fontSize: 22,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: SIGNAL }}>Akxost Studio</span>
        <span style={{ color: MUTED }}>{sheet}</span>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <CubeMark />
          {eyebrow ? (
            <span
              style={{
                fontSize: 24,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: SIGNAL,
              }}
            >
              {eyebrow}
            </span>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            marginTop: 24,
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>
        {note ? (
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              color: SUBTLE,
              maxWidth: 900,
            }}
          >
            {note}
          </div>
        ) : null}
      </div>

      {/* Sheet footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          borderTop: `1px solid ${RULE}`,
          paddingTop: 20,
          fontSize: 20,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        <span>New Delhi · IST</span>
        <span>{footerRight}</span>
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
