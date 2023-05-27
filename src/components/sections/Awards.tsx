import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { AwardsData, getAwards } from "@/consts/awards";

interface AwardLineProps {
  index: number;
  award: AwardsData;
}

const AwardLine: React.FC<AwardLineProps> = ({ index, award }) => {
  return (
    <div
      className={`p-4 border-l-4 border-black/5 dark:border-zinc-900 w-full transition-colors ${
        index % 2
          ? ""
          : "bg-gradient-to-r from-black/5 dark:from-zinc-900 to-transparent"
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
      <p className="mt-1 font-normal">{award.title}</p>
    </div>
  );
};

export const Awards = async () => {
  const t = await getTranslations();
  const awards = await getAwards();

  return (
    <div className="font-light flex items-center flex-col w-full ">
      {awards.map((award, index) => (
        <AwardLine key={award.title} index={index} award={award} />
      ))}
      <Link
        href="https://www.linkedin.com/in/gabrieltaveira/details/certifications/"
        target="_blank"
        className="mt-8 uppercase py-2 px-6 border-2 border-zinc-600 text-zinc-800 dark:text-zinc-100 dark:border-white underline w-min whitespace-nowrap text-sm font-semibold transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
      >
        {t("awards.seeMoreAwards")}
      </Link>
    </div>
  );
};
