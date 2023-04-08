import socials from "@/consts/socials";
import { memoize } from "@/utils/memoize";
import { getChannelVideos } from "usetube";

const getLastVideoSocial = async () => {
  const videos = await getChannelVideos("UCQ_RmjT0te7n5RLlG381T5A");
  const lastVideo = videos[0];

  return {
    name: lastVideo.title,
    url: `https://www.youtube.com/watch?v=${lastVideo.id}`,
  };
};

// Cache the last video social for 1 day
const oneDay = 1000 * 60 * 60 * 24;
const getLastVideoSocialMemoized = memoize(getLastVideoSocial, {
  maxAge: oneDay,
});

export const Socials = async () => {
  const lastVideoSocial = await getLastVideoSocialMemoized();

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      {[lastVideoSocial, ...socials].map((social) => (
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
};
