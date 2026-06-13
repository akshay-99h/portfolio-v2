export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Basics {
  name: string;
  title: string;
  location: string;
  experienceLevel: string;
  summary: string;
  contact: Contact;
}

export interface TechStack {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  orms: string[];
  cloud: string[];
  devops: string[];
  realtimeAndQueues: string[];
  authenticationAndSecurity: string[];
  observabilityAndQuality: string[];
}

export interface Experience {
  summary: string;
  highlights: string[];
}

export interface Community {
  involvement: string[];
  activities: string[];
}

export interface Interests {
  technical: string[];
  personal: string[];
}

export interface PortfolioMeta {
  availability: string;
  preferredWork: string[];
  lastUpdated: string;
}
