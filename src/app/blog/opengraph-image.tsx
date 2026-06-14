import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Writing — Akxost Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 05 / Writing",
    eyebrow: "Writing",
    headline: "Notes from the agency side.",
    note: "Product delivery, architecture decisions, and the tradeoffs of client work.",
  });
}
