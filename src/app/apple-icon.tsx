import { ImageResponse } from "next/og";

/** Apple touch icon — the cube glyph on the studio's paper-dark ground. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a09",
      }}
    >
      <svg width="116" height="135" viewBox="0 0 24 28" aria-hidden="true">
        <path d="M12 2 22 8 12 14 2 8Z" fill="#2dbab4" />
        <path d="M2 8 12 14v12L2 20Z" fill="#2dbab4" opacity="0.72" />
        <path d="M22 8 12 14v12l10-6Z" fill="#2dbab4" opacity="0.45" />
      </svg>
    </div>,
    { ...size },
  );
}
