import { LocationIcon } from "./illustrations/LocationIcon";

export const WorkLocation = () => {
  return (
    <div className="flex text-sm items-center fill-zinc-900 dark:fill-zinc-100">
      <LocationIcon className="mt-1 mr-1" width={22} height={22} />
      Remote
    </div>
  );
};
