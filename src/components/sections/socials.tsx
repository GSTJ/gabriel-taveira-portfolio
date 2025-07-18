import socials from "@/consts/socials";

import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";

export const Socials = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          className="flex gap-2 flex-col text-center items-center text-black font-medium dark:hover:text-zinc-300 p-5 bg-black/5 dark:bg-zinc-900 dark:text-zinc-200 hover:bg-black/10 dark:hover:bg-zinc-800 w-full justify-center max-w-md"
        >
          {social.image ? (
            <img
              src={social.image}
              height={400}
              width={800}
              alt={t("socials.alt", { name: social.name })}
              className="mb-2"
            />
          ) : null}
          <span>{social.name}</span>
        </Link>
      ))}
    </div>
  );
};
