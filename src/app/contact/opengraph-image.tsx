import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Start a brief — Akxost Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 06 / Brief",
    eyebrow: "Start a brief",
    headline: "Tell us what needs to exist.",
    note: "The product, the bottleneck, or the system that keeps breaking — reply within two working days.",
  });
}
