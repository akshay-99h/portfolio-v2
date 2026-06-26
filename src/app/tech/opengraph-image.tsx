import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Tech — Akxost";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 04 / Tech",
    eyebrow: "Tech",
    headline: "What I usually build.",
    note: "Products, backend systems, internal tools, and the stack behind them.",
  });
}
