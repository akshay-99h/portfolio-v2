import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "The agency — Akxost Studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 02 / Agency",
    eyebrow: "The agency",
    headline: "One desk, end to end.",
    note: "Discovery, architecture, build, deploy, and post-launch iteration.",
  });
}
