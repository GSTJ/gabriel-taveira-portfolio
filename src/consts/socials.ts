import videos from "@/consts/videos.json";

export interface SocialsData {
  name: string;
  url: string;
  image?: string;
}

export default [
  videos[0],
  {
    name: "Email",
    url: "mailto:gabrielstaveira@gmail.com",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/gabrieltaveira/",
  },
  {
    name: "Github",
    url: "https://github.com/GSTJ",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/gabrielstaveira/",
  },
  {
    name: "Medium Blog",
    url: "https://medium.com/@gabrieltaveira",
  },
  {
    name: "Awari Mentorship",
    url: "https://app.awari.com.br/mentores/gabriel-taveira",
  },
  {
    name: "Space Cast",
    url: "https://www.youtube.com/playlist?list=PLRqjZNegpUk8KgQxIvOh49093Iu-vFc9V",
  },
  {
    name: "Figma Design System Workshop",
    url: "https://www.figma.com/file/akUxU8w0nWgm4VtsdHGCgv/Projeto-Design-System-Contador-Digital?node-id=0%3A1&t=fkuHvgR20aBjXJCM-1",
  },
  {
    name: "Github Repo Design System Workshop",
    url: "https://github.com/GSTJ/design-system-example",
  },
  {
    name: "Slides Design System Workshop",
    url: "https://docs.google.com/presentation/d/1geAf0VrnB-LVac9F6Xhr8QD4CnLAA48_u1bsS1GlFZo/edit?usp=sharing",
  },
] as SocialsData[];
