export enum Trophy {
  Gold = "gold",
  Silver = "silver",
  Bronze = "bronze",
}

export interface AwardsData {
  title: string;
  trophy: Trophy;
  year: number;
  position: string;
}

export default [
  {
    title: "Global Legal Hackathon SP",
    year: 2020,
    position: "First place",
    trophy: Trophy.Gold,
  },
  {
    title: "Mão na Cevada",
    trophy: Trophy.Gold,
    position: "First place",
    year: 2019,
  },
  {
    title: "Hackribeirão",
    trophy: Trophy.Silver,
    position: "Second place",
    year: 2019,
  },
  {
    title: "Prêmio Jovem Inovador",
    trophy: Trophy.Silver,
    position: "Second place",
    year: 2019,
  },
  {
    title: "NASA Space Apps Challenge RP",
    trophy: Trophy.Bronze,
    position: "Finalist",
    year: 2019,
  },
] as AwardsData[];
