/**
 * Who Gabriel is, as data: the links and facts more than one section, route
 * or parser reads. Section-only data lives in `sections/<id>/data.ts`. Copy
 * lives in `src/i18n/locales`.
 */

export const LINKEDIN = "https://www.linkedin.com/in/gabrieltaveira/";
export const GITHUB = "https://github.com/GSTJ";
export const EMAIL_ADDR = "gabrielstaveira@gmail.com";
export const EMAIL = `mailto:${EMAIL_ADDR}`;
export const MEDIUM = "https://medium.com/@gabrieltaveira";
/** The npm user that publishes his packages (registry `maintainers`). */
export const NPM = "https://www.npmjs.com/~gabrieltaveira";
/** This site's own code, public. */
export const SITE_SOURCE = "https://github.com/GSTJ/gabriel-taveira-portfolio";
export const SPACE_CAST = "https://www.youtube.com/@spacesquad-rocketseat";
export const SPACE_CAST_PLAYLIST =
  "https://www.youtube.com/playlist?list=PLRqjZNegpUk8KgQxIvOh49093Iu-vFc9V";
export const CURRICULUM_PDF = "/curriculum.pdf";

/**
 * Skill keywords by group, written the way recruiters and ATS filters search
 * for them. English in both locales; the resume localizes the group labels.
 * Leadership leads: the stack is one strength among several, not the identity.
 */
export const SKILL_GROUPS = {
  leadership: [
    "Engineering management",
    "Technical hiring",
    "Mentoring",
    "Roadmaps",
    "Remote teams",
  ],
  engineering: [
    "App architecture",
    "Migrations",
    "Design systems",
    "Testing",
    "CI/CD",
    "Developer experience",
  ],
  stack: [
    "TypeScript",
    "React",
    "React Native",
    "Expo",
    "Next.js",
    "Node.js",
    "Swift",
    "SwiftUI",
  ],
  ai: ["RL training environments", "Model evaluation", "AI agents"],
} as const;

/** Every keyword, flat: the JSON-LD `knowsAbout` and llms.txt. */
export const SKILLS = Object.values(SKILL_GROUPS).flat();
