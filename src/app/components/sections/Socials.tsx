import socials from "@/consts/socials";

export const Socials = () => (
  <div className="flex flex-col gap-2 w-full items-center">
    {socials.map((social) => (
      <a
        key={social.name}
        href={social.url}
        target="_blank"
        className="flex gap-2 items-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 p-5 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 w-full justify-center max-w-md"
      >
        <span>{social.name}</span>
      </a>
    ))}
  </div>
);
