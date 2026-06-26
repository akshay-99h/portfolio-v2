import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Writing — Akxost";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 05 / Writing",
    eyebrow: "Writing",
    headline: "Notes from the build side.",
    note: "Architecture decisions, debugging, delivery tradeoffs, and practical engineering work.",
  });
}
