import awards, { AwardsData } from "@/consts/awards";
import Image from "next/image";

interface AwardLineProps {
  index: number;
  award: AwardsData;
}

const AwardLine: React.FC<AwardLineProps> = ({ index, award }) => {
  return (
    <div
      className={`flex justify-center flex-col sm:flex-row items-center gap-2 text-sm md:text-base p-2 text-center ${
        !(index % 2) &&
        "from-transparent to-transparent via-zinc-200 dark:via-zinc-900 bg-gradient-to-r"
      }`}
    >
      <Image
        src={`trophies/${award.trophy}.svg`}
        width={12}
        height={12}
        alt={award.trophy}
      />
      {award.title}
    </div>
  );
};

export const Awards = () => {
  return (
    <div className="font-light flex items-center flex-col">
      {awards.map((award, index) => (
        <AwardLine key={award.title} index={index} award={award} />
      ))}

      <a
        href="https://www.linkedin.com/in/gabrieltaveira/details/certifications/"
        target="_blank"
        className="uppercase py-2 px-6 border-2 border-zinc-600 text-zinc-800 dark:text-zinc-100 dark:border-white underline w-min whitespace-nowrap mt-10 text-sm font-semibold transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
      >
        See more
      </a>
    </div>
  );
};
