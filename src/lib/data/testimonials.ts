export type TestimonialAuthor = {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  company: string;
};

export type Testimonial = {
  author: TestimonialAuthor;
  text: string;
  highlights: string[];
  href?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    author: {
      name: "Ritika S.",
      handle: "@ritika_product",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      role: "Product Lead",
      company: "Fintech Startup",
    },
    text: "Akxost Studio took our rough product brief and shipped a clean, stable platform in weeks. Delivery was fast, structured, and technically solid.",
    highlights: ["clean, stable platform", "fast, structured"],
    href: "https://www.linkedin.com",
  },
  {
    author: {
      name: "Aditya K.",
      handle: "@aditya_builds",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Founder",
      company: "B2B SaaS Company",
    },
    text: "What stood out was engineering clarity. Architecture decisions were explained well, timelines were realistic, and production quality was excellent.",
    highlights: [
      "engineering clarity",
      "timelines were realistic",
      "production quality",
    ],
    href: "https://www.linkedin.com",
  },
  {
    author: {
      name: "Naina P.",
      handle: "@naina_ops",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      role: "Operations Head",
      company: "Logistics Platform",
    },
    text: "From backend systems to polished UI, Akxost handled the full stack with ownership. Our team got a reliable launch without hand-holding.",
    highlights: ["full stack with ownership", "reliable launch"],
    href: "https://www.linkedin.com",
  },
];
