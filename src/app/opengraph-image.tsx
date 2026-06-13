import { ImageResponse } from "next/og";

import { SITE_TITLE } from "@/lib/seo";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#e8e5de";
const PAPER = "#0a0a09";
const SIGNAL = "#2dbab4";
const RULE = "rgba(232, 229, 222, 0.22)";

export default function OpengraphImage() {
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
        <span style={{ color: "rgba(232,229,222,0.6)" }}>Sheet 01</span>
      </div>

      {/* Wordmark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 36,
          marginTop: "auto",
        }}
      >
        <svg width="120" height="140" viewBox="0 0 24 28" aria-hidden="true">
          <path d="M12 2 22 8 12 14 2 8Z" fill={SIGNAL} />
          <path d="M2 8 12 14v12L2 20Z" fill={SIGNAL} opacity="0.72" />
          <path d="M22 8 12 14v12l10-6Z" fill={SIGNAL} opacity="0.45" />
        </svg>
        <span
          style={{
            fontSize: 168,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Akxost
        </span>
      </div>

      <div
        style={{
          marginTop: 28,
          fontSize: 34,
          color: "rgba(232,229,222,0.78)",
        }}
      >
        Product engineering agency — scope, build, launch, iterate.
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
          color: "rgba(232,229,222,0.6)",
        }}
      >
        <span>New Delhi · IST</span>
        <span>akxost.com</span>
      </div>
    </div>,
    { ...size },
  );
}
