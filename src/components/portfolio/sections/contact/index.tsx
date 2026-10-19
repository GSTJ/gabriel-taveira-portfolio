import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { ArrowUpRight, CHANNEL_ICONS } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";
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

const ADDRESS_ID = "contact-address";

/**
 * The ask, then the address (copy it or open the mail app), the other
 * channels, and a form that drafts the email for you. Self-contained: it also
 * closes /security.
 */
export const ContactSection = async () => {
  const t = await getTranslations("contact");
  const formCopy = Object.fromEntries(
    FORM_KEYS.map((key) => [key, t(`form.${key}`)]),
  ) as Record<(typeof FORM_KEYS)[number], string>;
  const channels = CHANNELS.filter((channel) => channel.id !== "email");

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
      <div className={styles.rest}>
        <ul className={styles.ledger} {...reveal(3)}>
          {channels.map((channel) => (
            <li key={channel.id}>
              <a href={channel.url}>
                <span className={styles.icon}>{CHANNEL_ICONS[channel.id]}</span>
                <span className={styles.label}>
                  {t(`channels.${channel.id}`)}
                </span>
                <span className={cn("t-meta", styles.handle)}>
                  {channel.handle}
                </span>
                <ArrowUpRight />
              </a>
            </li>
          ))}
        </ul>
        <div {...reveal(4)}>
          <ContactForm copy={formCopy} />
        </div>
      </div>
    </section>
  );
};
