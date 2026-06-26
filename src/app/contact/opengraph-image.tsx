import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Collaborate — Akxost";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 06 / Contact",
    eyebrow: "Collaborate",
    headline: "Want to work together?",
    note: "Products, games, tools, experiments, or interesting systems — reply within two working days.",
  });
}
