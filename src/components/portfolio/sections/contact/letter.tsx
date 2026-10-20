"use client";

import { useId, useState, type FormEvent } from "react";

import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

import { PenUnderline } from "../../ui/pen-underline";
import { EMAIL, EMAIL_ADDR, TOPICS, type Topic } from "./data";
import { useToast } from "./toast";

import styles from "./contact.module.css";

export type LetterCopy = Record<
  | "label"
  | "to"
  | "subject"
  | "copyEmail"
  | "emailCopied"
  | "emailCopyFailed"
  | "greeting"
  | "topicLegend"
  | "defaultSubject"
  | "message"
  | "messagePh"
  | "messagePrompt"
  | "signoff"
  | "name"
  | "company"
  | "open"
  | "copyLetter"
  | "letterCopied"
  | "letterCopyFailed"
  | "handoff",
  string
> & { topics: Record<Topic, string> };

/**
 * The form, written as the email it becomes: To, a subject that writes
 * itself from the topic and the company, the message, and a signature.
 * Nothing is sent from the page. It opens as a draft in the visitor's mail
 * app, or copies as plain text for anyone without one. Copy arrives as props
 * from the server section, so no translations ship to the client.
 */
export const Letter = ({ copy }: { copy: LetterCopy }) => {
  const id = useId();
  const { show, toast } = useToast();
  // On /security the letter is most likely about a finding.
  const [topic, setTopic] = useState<Topic | undefined>(
    usePathname().endsWith("/security") ? "security" : undefined,
  );
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const addressId = `${id}-address`;
  const handoffId = `${id}-handoff`;
  const org = company.trim();
  const base =
    topic && topic !== "other" ? copy.topics[topic] : copy.defaultSubject;
  const subject = org ? `${base} · ${org}` : base;

  const body = () =>
    [
      copy.greeting,
      "",
      message.trim() || copy.messagePrompt,
      "",
      copy.signoff,
      name.trim() || null,
      org || null,
    ]
      .filter((line) => line !== null)
      .join("\n");

  const open = (e: FormEvent) => {
    e.preventDefault();
    window.location.href =
      `${EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body())}`;
  };

  const copyText = async (
    text: string,
    done: string,
    failed: string,
    select?: string,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      show(done, true);
    } catch {
      // No clipboard (insecure context, denied): select it for a manual copy.
      const node = select && document.querySelector(`#${CSS.escape(select)}`);
      if (node) window.getSelection()?.selectAllChildren(node);
      show(failed, false);
    }
  };

  return (
    <form
      className={styles.letter}
      onSubmit={open}
      aria-label={copy.label}
      aria-describedby={handoffId}
    >
      <div className={styles.head}>
        <p className={styles.headRow}>
          <span className={styles.key}>{copy.to}</span>
          <a id={addressId} className={styles.to} href={EMAIL}>
            <PenUnderline delay={240}>{EMAIL_ADDR}</PenUnderline>
          </a>
          <button
            type="button"
            className={cn("btn btn-ghost btn-small", styles.copyEmail)}
            onClick={() =>
              copyText(
                EMAIL_ADDR,
                copy.emailCopied,
                copy.emailCopyFailed,
                addressId,
              )
            }
          >
            {copy.copyEmail}
          </button>
        </p>
        <p className={styles.headRow}>
          <span className={styles.key}>{copy.subject}</span>
          <span
            key={topic}
            className={styles.subject}
            data-default={base === copy.defaultSubject || undefined}
          >
            {subject}
          </span>
        </p>
      </div>

      <div className={styles.body}>
        <p className={styles.greeting}>{copy.greeting}</p>

        <fieldset className={styles.topics}>
          <legend>{copy.topicLegend}</legend>
          {TOPICS.map((item) => (
            <label key={item} className={styles.chip}>
              <input
                type="radio"
                name="topic"
                value={item}
                checked={topic === item}
                onChange={() => setTopic(item)}
              />
              {copy.topics[item]}
            </label>
          ))}
        </fieldset>

        <div className={styles.field}>
          <label htmlFor={`${id}-message`}>{copy.message}</label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            value={message}
            placeholder={copy.messagePh}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className={styles.signature}>
          <p>{copy.signoff}</p>
          <label className="visually-hidden" htmlFor={`${id}-name`}>
            {copy.name}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            placeholder={copy.name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="visually-hidden" htmlFor={`${id}-company`}>
            {copy.company}
          </label>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            value={company}
            placeholder={copy.company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn">
          {copy.open}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            copyText(
              `${copy.to}: ${EMAIL_ADDR}\n${copy.subject}: ${subject}\n\n${body()}`,
              copy.letterCopied,
              copy.letterCopyFailed,
            )
          }
        >
          {copy.copyLetter}
        </button>
        <p id={handoffId} className={cn("t-small", styles.handoff)}>
          {copy.handoff}
        </p>
      </div>
      {toast}
    </form>
  );
};
