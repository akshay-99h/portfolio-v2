import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Capabilities — Akxost Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 04 / Capabilities",
    eyebrow: "Capabilities",
    headline: "What you can hand off.",
    note: "Customer-facing products, backend systems, internal tools, and launch reliability.",
  });
}
