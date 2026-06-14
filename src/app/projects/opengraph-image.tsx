import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Work index — Akxost Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 03 / Work",
    eyebrow: "Work index",
    headline: "Shipped, in production, in use.",
    note: "Mobile products, public platforms, operational web systems, and browser games.",
  });
}
