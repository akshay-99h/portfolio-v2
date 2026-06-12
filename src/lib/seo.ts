export const SITE_URL = "https://akxost.com";

export const SITE_NAME = "Akxost Studio";

export const SITE_TITLE = "Akxost Studio — Product engineering agency";

export const SITE_DESCRIPTION =
  "Akxost Studio is a product engineering agency in New Delhi for teams that need one partner to scope, build, launch, and improve digital products — web, mobile, backend systems, and post-launch iteration.";

/** Absolute URL for a path, for canonical/OG/JSON-LD use. */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
