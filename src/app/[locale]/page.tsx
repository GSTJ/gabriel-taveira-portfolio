import { setRequestLocale } from "next-intl/server";

import { Portfolio } from "@/components/portfolio";

/** Static, rebuilt daily so the month in the letterhead and Now stays current. */
export const revalidate = 86400;

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Portfolio />;
};

export default Page;
