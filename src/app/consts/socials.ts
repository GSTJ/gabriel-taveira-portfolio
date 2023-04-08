import { getChannelVideos } from "usetube";

export interface SocialsData {
  name: string;
  url: string;
}

export default [
  {
    name: "Instagram",
    url: "https://www.instagram.com/gabrielstaveira/",
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
    name: "Medium",
    url: "https://medium.com/@gabrieltaveira",
  },
  {
    name: "Mentorship",
    url: "https://app.awari.com.br/mentores/gabriel-taveira",
  },
] as SocialsData[];
