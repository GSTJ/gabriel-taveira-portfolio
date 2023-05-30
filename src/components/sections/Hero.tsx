import { getTranslations } from "next-intl/server";

const AnimatedButton = ({ children, href }) => (
  <a
    href={href}
    className="w-48 h-16 animate-fade-up-shine md:flex-initial rounded-md text-md p-0.5 bg-gradient-to-br from-[#00000010] dark:from-[#ffffff70] group to-transparent font-semibold shadow-sm hover:bg-[#00000010] dark:hover:bg-[#ffffff30] transition-all"
  >
    <div className="w-48 h-16 rounded-md bg-gradient-to-br from-pink-500 via-yellow-500 to-rose-500 blur-lg absolute z-[-1] group-hover:blur-xl transition-all" />
    <p className="heading h-full pt-1 justify-center items-center flex rounded-md bg-black text-gray-50">
      {children}
    </p>
  </a>
);

export const Hero = async () => {
  const t = await getTranslations();
  return (
    <div className="flex w-full justify-center">
      <div className="py-20 lg:mx-0 lg:py-32 max-w-3xl text-center items-center flex flex-col">
        <h1 className="text-3xl gap-5 flex flex-col text-center">
          <p className="tracking-[.3em] heading text-2xl uppercase dark:text-white/70">
            {t("hero.welcome")}
          </p>
          <div className="heading font-bold text-7xl flex md:gap-5 flex-wrap justify-center">
            <p>{t("hero.name")}</p>
            <p className="colorful-text">{t("hero.surname")}</p>
          </div>
        </h1>
        <p className="text-lg mt-2 leading-8 text-gray-800 dark:text-gray-300">
          {t("hero.intro")}
        </p>
        <div className="mt-10 flex gap-x-6 lg:justify-start">
          <AnimatedButton href="#socials">
            {t("hero.getInTouch")}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};
