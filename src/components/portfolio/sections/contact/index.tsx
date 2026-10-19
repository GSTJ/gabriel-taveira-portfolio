import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight, CHANNEL_ICONS } from "../../ui/icons";
import { Annotated, Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { CopyEmail } from "./copy-email";
import { CHANNELS, EMAIL, EMAIL_ADDR } from "./data";

import styles from "./contact.module.css";

const ASKS = ["app", "team", "timeline"] as const;

const ADDRESS_ID = "contact-address";

/**
 * One address and two ways to use it: copy it, or open a draft that already
 * asks the three things on the page. Then the other channels, each with what
 * it's for. Self-contained: it also closes /security.
 */
export const ContactSection = async () => {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const channels = CHANNELS.filter((channel) => channel.id !== "email");

  const draft = [
    t("draft.greeting"),
    "",
    ...ASKS.flatMap((ask) => [`${t(`asks.${ask}.label`)}:`, ""]),
  ].join("\n");
  const mailto =
    `${EMAIL}?subject=${encodeURIComponent(t("draft.subject"))}` +
    `&body=${encodeURIComponent(draft)}`;

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

      <div className={styles.mail} {...reveal(2)}>
        <Annotated className={styles.line}>
          <a id={ADDRESS_ID} className={styles.address} href={EMAIL}>
            <PenUnderline delay={240}>{EMAIL_ADDR}</PenUnderline>
          </a>
          <Marginalia
            note={t("note", { month: currentMonthLabel(locale) })}
            delay={520}
          />
        </Annotated>
        <div className={styles.actions}>
          <a className="btn btn-small" href={mailto}>
            {t("write")}
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
      </div>

      <div className={styles.rest}>
        <div {...reveal(3)}>
          <h3 className={cn("t-title", styles.restTitle)}>{t("asksTitle")}</h3>
          <ul className={styles.asks}>
            {ASKS.map((ask) => (
              <li key={ask}>
                <span className={styles.askLabel}>
                  {t(`asks.${ask}.label`)}
                </span>
                <span className={styles.askHint}>{t(`asks.${ask}.hint`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div {...reveal(4)}>
          <h3 className={cn("t-title", styles.restTitle)}>{t("elsewhere")}</h3>
          <ul className={styles.channels}>
            {channels.map((channel) => (
              <li key={channel.id}>
                <a href={channel.url}>
                  <span className={styles.name}>
                    <span className={styles.icon}>
                      {CHANNEL_ICONS[channel.id]}
                    </span>
                    {t(`channels.${channel.id}`)}
                    <ArrowUpRight />
                  </span>
                  <span className={cn("t-meta", styles.handle)}>
                    {channel.handle}
                  </span>
                  <span className={cn("t-small", styles.purpose)}>
                    {t(`purpose.${channel.id}`)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
