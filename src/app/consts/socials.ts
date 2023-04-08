import videos from "@/consts/videos.json";

export interface SocialsData {
  name: string;
  url: string;
  image?: string;
}

export default [
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
    name: "Medium",
    url: "https://medium.com/@gabrieltaveira",
  },
  {
    name: "Mentorship",
    url: "https://app.awari.com.br/mentores/gabriel-taveira",
  },
  {
    name: "Space Cast",
    url: "https://www.youtube.com/playlist?list=PLRqjZNegpUk8KgQxIvOh49093Iu-vFc9V",
  },
  videos[0],
] as SocialsData[];
