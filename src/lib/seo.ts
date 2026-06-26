export const SITE_URL = "https://akxost.com";

export const SITE_NAME = "Akxost";

export const SITE_TITLE = "Akxost — Full-Stack Developer Portfolio";

export const SITE_DESCRIPTION =
  "Akxost is the portfolio of Akshay Prabhat Mishra, a full-stack developer in New Delhi who builds web apps, mobile products, backend systems, and internal tools.";

/** Absolute URL for a path, for canonical/OG/JSON-LD use. */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
