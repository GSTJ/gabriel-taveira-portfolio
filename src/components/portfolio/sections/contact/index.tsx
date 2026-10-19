import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight, CHANNEL_ICONS } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { CopyEmail } from "./copy-email";
import { CHANNELS, EMAIL, EMAIL_ADDR, ROUTES, type Channel } from "./data";

import styles from "./contact.module.css";

const ADDRESS_ID = "contact-address";

const BY_ID = Object.fromEntries(CHANNELS.map((c) => [c.id, c])) as Record<
  Channel["id"],
  Channel
>;
const channel = (id: Channel["id"]) => BY_ID[id];

const draft = (subject: string, body: string) =>
  `${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/**
 * The ask, routed: the visitor finds their situation and gets the right
 * door, with the email already started when email is the door. Works on its
 * own, so it also closes /security.
 */
export const ContactSection = async () => {
  const t = await getTranslations("contact");
  const locale = await getLocale();

  return (
    <section
      id="contact"
      className="section wrap"
      aria-labelledby="contact-title"
    >
      <h2
        id="contact-title"
        className={cn("t-display", styles.title)}
        {...reveal()}
      >
        {t("title")}
      </h2>
      <p className={cn("t-lede", styles.sub)} {...reveal(1)}>
        {t("sub")}
      </p>
      <p className={cn("t-meta", styles.status)} {...reveal(2)}>
        {t("status", { month: currentMonthLabel(locale) })}
      </p>
      <div className={styles.mail} {...reveal(3)}>
        <a id={ADDRESS_ID} className={styles.address} href={EMAIL}>
          <PenUnderline delay={240}>{EMAIL_ADDR}</PenUnderline>
        </a>
        <CopyEmail
          addressId={ADDRESS_ID}
          copy={{
            copy: t("copy"),
            copied: t("copied"),
            copyFailed: t("copyFailed"),
          }}
        />
      </div>
      <ul className={styles.routes}>
        {ROUTES.map((route, index) => {
          const key = `routes.${route.id}` as const;
          return (
            <li key={route.id} className={styles.route} {...reveal(index)}>
              <div className={styles.situation}>
                <h3 className="t-title">{t(`${key}.title`)}</h3>
                <p className={cn("t-small", styles.body)}>{t(`${key}.body`)}</p>
              </div>
              {"channels" in route ? (
                <p className={styles.quiet}>
                  {route.channels.map((id) => (
                    <a
                      key={id}
                      className={styles.action}
                      href={channel(id).url}
                    >
                      <span className={styles.icon}>{CHANNEL_ICONS[id]}</span>
                      <span className={styles.label}>
                        {t(`channels.${id}`)}
                      </span>
                      <span className={cn("t-meta", styles.handle)}>
                        {channel(id).handle}
                      </span>
                      <ArrowUpRight />
                    </a>
                  ))}
                </p>
              ) : (
                <a
                  className={cn(styles.action, styles.stretch)}
                  href={
                    "mail" in route
                      ? draft(t(`${key}.subject`), t(`${key}.draft`))
                      : channel(route.channel).url
                  }
                >
                  <span className={styles.icon}>
                    {CHANNEL_ICONS["mail" in route ? "email" : route.channel]}
                  </span>
                  <span className={styles.label}>{t(`${key}.action`)}</span>
                  <span className={cn("t-meta", styles.handle)}>
                    {"mail" in route
                      ? t("draftHint")
                      : channel(route.channel).handle}
                  </span>
                  <ArrowUpRight />
                  {route.id === "project" ? (
                    <Marginalia
                      placement="inline"
                      note={t("startHere")}
                      delay={400}
                    />
                  ) : null}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
