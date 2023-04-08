export enum Trophy {
  Gold = "gold",
  Silver = "silver",
  Bronze = "bronze",
}

export interface AwardsData {
  title: string;
  trophy: Trophy;
}

export default [
  {
    title: "First place - Global Legal Hackathon SP (2020)",
    trophy: Trophy.Gold,
  },
  {
    title: "First place - Mão na Cevada (2019)",
    trophy: Trophy.Gold,
  },
  {
    title: "Second place - Hackribeirão (2019)",
    trophy: Trophy.Silver,
  },
  {
    title: "Second place - Prêmio Jovem Inovador (2019)",
    trophy: Trophy.Silver,
  },
  {
    title: "Finalist - NASA Space Apps Challenge RP (2019)",
    trophy: Trophy.Bronze,
  },
] as AwardsData[];
