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
    name: "Space Cast",
    url: "https://www.youtube.com/playlist?list=PLRqjZNegpUk8KgQxIvOh49093Iu-vFc9V",
  },
  {
    name: "Palestra - Eficiência com IA (Slides)",
    url: "https://www.figma.com/file/nBdwnIQxwLseSXicLhzRoB/Efici%C3%AAncia-Com-AI---The-Brooklyn-Brothers?type=design&node-id=0%3A1&mode=design&t=lvANu3jt45Npg2H4-1",
  },
] as SocialsData[];
