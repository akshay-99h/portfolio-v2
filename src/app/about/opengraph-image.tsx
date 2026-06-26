import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "About — Akxost";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 02 / About",
    eyebrow: "About",
    headline: "One desk, end to end.",
    note: "Full-stack products, backend systems, launches, and the fixes that come after.",
  });
}
