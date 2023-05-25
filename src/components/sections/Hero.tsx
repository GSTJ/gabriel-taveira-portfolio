import { getTranslations } from "next-intl/server";

const AnimatedButton = ({ children }) => (
  <a
    href="#socials"
    className="w-48 h-12 animate-fade-up-shine md:flex-initial rounded-md text-md p-0.5 bg-gradient-to-br from-[#00000010] dark:from-[#ffffff70] group to-transparent font-semibold shadow-sm hover:bg-[#00000010] dark:hover:bg-[#ffffff30] transition-all"
  >
    <div className="h-12 w-48 rounded-[0.31rem] bg-gradient-rotate from-pink-500 via-yellow-500 to-rose-500 blur-lg absolute z-[-1] group-hover:blur-xl transition-all" />
    <p className="heading h-12 rounded-[0.31rem] py-3.5 pb-2.5 px-5 bg-[#fcf7fc] dark:bg-black dark:text-gray-50">
      {children}
    </p>
  </a>
);

export const Hero = async () => {
  const t = await getTranslations();
  return (
    <div className="flex w-full justify-center">
      <div className="py-20 lg:mx-0 lg:py-32 max-w-2xl text-center items-center flex flex-col">
        <h1 className="text-3xl md:text-5xl flex gap-6 flex-wrap justify-center">
          <p className="text-zinc-700 dark:text-zinc-500">
            {t("hero.welcome")}
          </p>
          <div className="heading font-bold text-7xl flex sm:gap-4 flex-wrap justify-center">
            <p>{t("hero.name")}</p>
            <p className="colorful-text">{t("hero.surname")}</p>
          </div>
        </h1>
        <p className="mt-2 leading-8 text-gray-800 dark:text-gray-300">
          {t("hero.intro")}
        </p>
        <div className="mt-10 flex gap-x-6 lg:justify-start">
          <AnimatedButton>{t("hero.getInTouch")}</AnimatedButton>
        </div>
      </div>
    </div>
  );
};
