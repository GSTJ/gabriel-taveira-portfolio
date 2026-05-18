"use client";

import { useState, type FormEvent } from "react";
import Balancer from "react-wrap-balancer";
import { useTranslations } from "next-intl";
import { CHANNELS, EMAIL_ADDR } from "./data";
import { Marginalia } from "./Marginalia";
import { ArrowRight, ArrowUpRight, BrandMark, Eyebrow, richTags } from "./Shared";
import { SOCIAL_ICONS } from "./SocialIcons";
import { LanguageSwitcher } from "./LanguageSwitcher";

const EMPTY = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const tChannels = useTranslations("contact.channels");
  const tMarg = useTranslations("marginalia");

  const [form, setForm] = useState(EMPTY);

  const update =
    (k: keyof typeof EMPTY) =>
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
      "—",
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

  return (
    <section className="ws-section ws-contact" id="contact">
      <div className="ws-contact-grid">
        <div className="ws-contact-left">
          <Eyebrow accent>{t("eyebrow")}</Eyebrow>
          <h2 className="ws-contact-title">
            <Balancer>{t.rich("title", richTags)}</Balancer>
          </h2>
          <p className="ws-contact-sub">{t("sub")}</p>
          <div className="ws-contact-channels">
            {CHANNELS.map((c) => (
              <a
                key={c.id}
                className="ws-channel"
                href={c.url}
                target="_blank"
                rel="noreferrer"
              >
                {SOCIAL_ICONS[c.icon]}
                <span className="ws-channel-label">{tChannels(c.id)}</span>
                <span className="ws-channel-handle">{c.handle}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>

        <form className="ws-contact-form ws-pdf-hide" onSubmit={submit}>
          <div className="ws-field-grid">
            <div className="ws-field">
              <label>{tForm("name")}</label>
              <input
                className="ws-input"
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder={tForm("namePh")}
              />
            </div>
            <div className="ws-field">
              <label>{tForm("email")}</label>
              <input
                className="ws-input"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder={tForm("emailPh")}
              />
            </div>
          </div>
          <div className="ws-field">
            <label>{tForm("subject")}</label>
            <input
              className="ws-input"
              type="text"
              value={form.subject}
              onChange={update("subject")}
              placeholder={tForm("subjectPh")}
            />
          </div>
          <div className="ws-field">
            <label>{tForm("message")}</label>
            <textarea
              className="ws-input ws-textarea"
              value={form.message}
              onChange={update("message")}
              placeholder={tForm("messagePh")}
            />
          </div>
          <div className="ws-form-foot">
            <button type="submit" className="ws-btn ws-btn-primary">
              {tForm("send")}
              <ArrowRight />
            </button>
            <span className="ws-kbd-hint">
              <kbd>/</kbd> · <kbd>gt</kbd> · <kbd>↑↑↓↓←→←→BA</kbd>
            </span>
          </div>
        </form>
      </div>

      <footer className="ws-footer ws-pdf-hide">
        <address className="ws-sr-only">
          Gabriel Taveira, Engineering Lead. Ribeirão Preto, SP, Brazil.
          Reach out via{" "}
          <a href="mailto:gabrielstaveira@gmail.com">gabrielstaveira@gmail.com</a>
          .
        </address>
        <div className="ws-footer-row">
          <BrandMark size={18} withText={false} />
          <span className="ws-footer-meta">{t("footerMeta")}</span>
          <span className="ws-footer-spacer" />
          <span className="ws-footer-meta">{t("footerTag")}</span>
          <div className="ws-footer-end">
            <LanguageSwitcher />
            <span className="ws-footer-marginalia">
              <Marginalia tilt={-3}>{tMarg("madeWith")}</Marginalia>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
