import { useTranslations } from "next-intl";

import { LocationIcon } from "./illustrations/location-icon";

export const WorkLocation = () => {
  const t = useTranslations();

  return (
    <div className="flex text-sm items-center fill-zinc-900 dark:fill-zinc-100">
      <LocationIcon className="mt-1 mr-1" width={22} height={22} />
      {t("workLocation.remote")}
    </div>
  );
};
