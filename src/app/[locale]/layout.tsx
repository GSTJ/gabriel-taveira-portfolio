import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const LocaleLayout = async ({
  children,
  params,
}: React.PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>) => {
  const { locale } = await params;
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
