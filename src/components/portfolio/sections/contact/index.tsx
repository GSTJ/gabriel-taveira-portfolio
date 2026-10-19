import { getTranslations } from "next-intl/server";

import { ArrowUpRight, CHANNEL_ICONS } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { ContactForm } from "./contact-form";
import { CHANNELS, EMAIL, EMAIL_ADDR } from "./data";

import styles from "./contact.module.css";

const FORM_KEYS = [
  "name",
  "namePh",
  "email",
  "emailPh",
  "subject",
  "subjectPh",
  "message",
  "messagePh",
  "send",
] as const;

/** Placeholder: the ask, the address, every channel, and the mail form. */
export const ContactSection = async () => {
  const t = await getTranslations("contact");
  const copy = Object.fromEntries(
    FORM_KEYS.map((key) => [key, t(`form.${key}`)]),
  ) as Record<(typeof FORM_KEYS)[number], string>;

  return (
    <section
      id="contact"
      className="section wrap"
      aria-labelledby="contact-title"
    >
      <div className={styles.grid}>
        <div className={styles.ask} {...reveal()}>
          <h2 id="contact-title" className="t-display">
            {t("title")}
          </h2>
          <p className="t-lede">{t("sub")}</p>
          <a className={styles.address} href={EMAIL}>
            {EMAIL_ADDR}
          </a>
          <ul className={styles.channels}>
            {CHANNELS.filter((channel) => channel.id !== "email").map(
              (channel) => (
                <li key={channel.id}>
                  <a className="link-arrow" href={channel.url}>
                    <span className={styles.icon}>
                      {CHANNEL_ICONS[channel.id]}
                    </span>
                    {t(`channels.${channel.id}`)}
                    <ArrowUpRight />
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div {...reveal(1)}>
          <ContactForm copy={copy} />
        </div>
      </div>
    </section>
  );
};
