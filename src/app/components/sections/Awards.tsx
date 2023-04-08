import awards from "@/consts/awards";
import Image from "next/image";

export const Awards = () => {
  return (
    <div className="w-full font-light flex items-center flex-col">
      {awards.map((award, index) => (
        <div
          key={award.title}
          className={`flex justify-center w-full text-sm md:text-base py-2 ${
            !(index % 2) &&
            "from-transparent to-transparent via-zinc-200 dark:via-zinc-900 bg-gradient-to-r"
          }`}
        >
          <Image
            src={`trophies/${award.trophy}.svg`}
            width={10}
            height={10}
            alt={award.trophy}
            className="mr-2"
          />
          {award.title}
        </div>
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
