"use client";

import { useId, useState, type FormEvent } from "react";

import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { CHANNELS, EMAIL_ADDR } from "./data";
import { LanguageSwitcher } from "./language-switcher";
import { Marginalia } from "./marginalia";
import { ArrowRight, ArrowUpRight, richTags } from "./shared";
import { SOCIAL_ICONS } from "./social-icons";

const EMPTY = { name: "", email: "", subject: "", message: "" };
type Field = keyof typeof EMPTY;

/** The graphite face at the bottom of the device: contact, then the footer. */
export const Contact = ({
  showFooterTag = true,
}: {
  showFooterTag?: boolean;
}) => {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const tChannels = useTranslations("contact.channels");
  const tMarg = useTranslations("marginalia");
  const id = useId();

  const [form, setForm] = useState(EMPTY);

  const update =
    (k: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    // Hand off to the user's mail client. Cheaper than running a backend
    // for the handful of inbound messages this form actually gets, and
    // the submitter's own SMTP handles delivery + spam reputation.
    const subjectLine = form.subject?.trim() || "Hi from your portfolio";
    const body = [
      form.message,
      "",
      "--",
      form.name ? `From: ${form.name}` : null,
      form.email ? `Reply: ${form.email}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    const href =
      `mailto:${EMAIL_ADDR}` +
      `?subject=${encodeURIComponent(subjectLine)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const input = (k: Field, type = "text", required = false) => (
    <div className="gt-field">
      <label htmlFor={`${id}-${k}`}>{tForm(k)}</label>
      {k === "message" ? (
        <textarea
          id={`${id}-${k}`}
          className="gt-input gt-textarea"
          value={form[k]}
          onChange={update(k)}
          placeholder={tForm(`${k}Ph`)}
          required={required}
        />
      ) : (
        <input
          id={`${id}-${k}`}
          className="gt-input"
          type={type}
          value={form[k]}
          onChange={update(k)}
          placeholder={tForm(`${k}Ph`)}
          required={required}
        />
      )}
    </div>
  );

  return (
    <section className="gt-face gt-contact" id="contact">
      <div className="gt-contact-grid">
        <div className="gt-contact-copy">
          <h2 className="gt-contact-title">
            <Balancer>{t.rich("title", richTags)}</Balancer>
          </h2>
          <p className="gt-contact-sub">{t("sub")}</p>
          <ul className="gt-channels">
            {CHANNELS.map((c) => (
              <li key={c.id}>
                <a href={c.url} target="_blank" rel="noreferrer">
                  {SOCIAL_ICONS[c.icon]}
                  <span className="gt-channel-label">{tChannels(c.id)}</span>
                  <span className="gt-channel-handle">{c.handle}</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="gt-form" onSubmit={submit}>
          <div className="gt-field-pair">
            {input("name")}
            {input("email", "email", true)}
          </div>
          {input("subject")}
          {input("message", "text", true)}
          <button type="submit" className="gt-key gt-key-go">
            {tForm("send")}
            <ArrowRight />
          </button>
        </form>
      </div>

      <footer className="gt-footer">
        <address className="gt-sr-only">
          Gabriel Taveira. Ribeirão Preto, SP, Brazil.{" "}
          <a href={`mailto:${EMAIL_ADDR}`}>{EMAIL_ADDR}</a>
        </address>
        <span>{t("footerMeta")}</span>
        {showFooterTag ? <span>{t("footerTag")}</span> : null}
        <span className="gt-footer-end">
          <LanguageSwitcher />
          <Marginalia tilt={-3}>{tMarg("madeWith")}</Marginalia>
        </span>
      </footer>
    </section>
  );
};
