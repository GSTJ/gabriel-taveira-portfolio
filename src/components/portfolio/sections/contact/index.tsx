import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight, CHANNEL_ICONS } from "../../ui/icons";
import { Annotated, Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import { CHANNELS, TOPICS } from "./data";
import { Letter, type LetterCopy } from "./letter";

import styles from "./contact.module.css";

const LETTER_KEYS = [
  "label",
  "to",
  "subject",
  "copyEmail",
  "emailCopied",
  "emailCopyFailed",
  "greeting",
  "topicLegend",
  "defaultSubject",
  "story",
  "storyPh",
  "storyPrompt",
  "signoff",
  "name",
  "namePh",
  "company",
  "companyPh",
  "open",
  "copyLetter",
  "letterCopied",
  "letterCopyFailed",
  "handoff",
] as const;

/**
 * The ask, then the email itself: the visitor writes to Gabriel on the page
 * and takes it to their own mail app (or copies it). The other doors sit
 * beside it with their real handles. Self-contained: it also closes
 * /security.
 */
export const ContactSection = async () => {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const letter = {
    ...Object.fromEntries(LETTER_KEYS.map((key) => [key, t(`letter.${key}`)])),
    topics: Object.fromEntries(
      TOPICS.map((topic) => [topic, t(`letter.topics.${topic}`)]),
    ),
  } as LetterCopy;
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
      <Annotated as="p" className={cn("t-lede", styles.sub)} {...reveal(1)}>
        {t("subLead")}{" "}
        <Marginalia
          note={t("asOf", { month: currentMonthLabel(locale) })}
          delay={320}
        >
          {t("subOpen")}
        </Marginalia>{" "}
        {t("subReasons")}
      </Annotated>

      <div className={styles.rest}>
        <div {...reveal(2)}>
          <Letter copy={letter} />
        </div>
        <aside className={styles.aside} aria-labelledby="contact-elsewhere">
          <h3
            id="contact-elsewhere"
            className={cn("t-title", styles.asideTitle)}
            {...reveal(3)}
          >
            {t("elsewhere")}
          </h3>
          <ul className={styles.ledger}>
            {channels.map((channel, index) => (
              <li key={channel.id} {...reveal(4 + index)}>
                <a href={channel.url}>
                  <span className={styles.icon}>
                    {CHANNEL_ICONS[channel.id]}
                  </span>
                  <span className={styles.label}>
                    {t(`channels.${channel.id}`)}
                    <span className={cn("t-meta", styles.handle)}>
                      {channel.handle}
                    </span>
                  </span>
                  <span className={cn("t-small", styles.why)}>
                    {t(`why.${channel.id}`)}
                  </span>
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};
