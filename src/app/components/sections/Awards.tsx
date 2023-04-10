import awards, { AwardsData } from "@/consts/awards";
import Image from "next/image";

interface AwardLineProps {
  index: number;
  award: AwardsData;
}

const AwardLine: React.FC<AwardLineProps> = ({ index, award }) => {
  return (
    <div
      className={`p-4 border border-zinc-300 dark:border-zinc-700 rounded-md w-full hover:bg-gray-200 dark:hover:bg-zinc-900 transition-colors ${
        index % 2
          ? ""
          : "bg-gradient-to-r from-gray-200 dark:from-zinc-900 to-transparent"
      }`}
    >
      <div className="flex flex-1 justify-between">
        <div className="flex items-center">
          <Image
            src={`trophies/${award.trophy}.svg`}
            width={12}
            height={12}
            alt={award.trophy}
            className="mr-2"
          />
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {award.position}
          </p>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 ml-2 text-sm">
          {award.year}
        </p>
      </div>
      <p className="mt-1">{award.title}</p>
    </div>
  );
};

export const Awards = () => {
  return (
    <div className="font-light flex items-center flex-col gap-2 w-full max-w-md">
      {awards.map((award, index) => (
        <AwardLine key={award.title} index={index} award={award} />
      ))}
      <a
        href="https://www.linkedin.com/in/gabrieltaveira/details/certifications/"
        target="_blank"
        className="mt-6 uppercase py-2 px-6 border-2 border-zinc-600 text-zinc-800 dark:text-zinc-100 dark:border-white underline w-min whitespace-nowrap text-sm font-semibold transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
      >
        See more
      </a>
    </div>
  );
};
