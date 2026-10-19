import { getTranslations, setRequestLocale } from "next-intl/server";

import { Portfolio } from "@/components/portfolio";
import { JsonLd } from "@/components/portfolio/structured-data";

import { BrandFonts } from "../brand-fonts";

/** Static, rebuilt daily so the month in the letterhead and Now stays current. */
export const revalidate = 86400;

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");
  return (
    <>
      <BrandFonts />
      <JsonLd locale={locale} type="ProfilePage" name={t("title")} />
      <Portfolio />
    </>
  );
};

export default Page;
