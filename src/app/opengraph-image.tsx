import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { SITE_TITLE } from "@/lib/seo";

export const alt = SITE_TITLE;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    sheet: "Sheet 01 / Index",
    headline: "Products that survive contact with reality.",
    note: "Full-stack developer portfolio — scope, build, launch, iterate.",
  });
}
