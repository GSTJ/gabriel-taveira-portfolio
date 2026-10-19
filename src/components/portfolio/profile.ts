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
export const SPACE_CAST = "https://www.youtube.com/@spacesquad-rocketseat";
export const SPACE_CAST_PLAYLIST =
  "https://www.youtube.com/playlist?list=PLRqjZNegpUk8KgQxIvOh49093Iu-vFc9V";
export const SPACE_SQUAD = "https://www.rocketseat.com.br/space-squad";
export const CURRICULUM_PDF = "/curriculum.pdf";

/**
 * Plain skill keywords, listed on the resume and emitted as `knowsAbout` in
 * the JSON-LD. Written the way recruiters and ATS filters search for them.
 */
export const SKILLS = [
  "React Native",
  "Expo",
  "React",
  "TypeScript",
  "React Compiler",
  "React Native New Architecture",
  "iOS & Android",
  "Mobile Architecture",
  "Design Systems",
  "Testing (Jest, MSW)",
  "CI/CD & App Releases",
  "Engineering Leadership",
  "Technical Hiring",
  "Mentoring",
] as const;
