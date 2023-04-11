import Image from "next/image";

import socials from "@/consts/socials";

export const Socials = () => {
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          className="flex gap-2 flex-col text-center items-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 p-5 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 w-full justify-center max-w-md"
        >
          {social.image && (
            <Image
              src={social.image}
              height={400}
              width={800}
              alt={`${social.name} Thumbnail`}
              className="mb-2"
            />
          )}
          <span>{social.name}</span>
        </a>
      ))}
    </div>
  );
};
