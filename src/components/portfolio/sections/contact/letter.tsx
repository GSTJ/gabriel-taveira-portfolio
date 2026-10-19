"use client";

import { useId, useState, type FormEvent } from "react";

import { cn } from "@/utils/cn";

import { EMAIL, EMAIL_ADDR, TOPICS, type Topic } from "./data";
import { useToast } from "./toast";

import styles from "./contact.module.css";

export type LetterCopy = {
  label: string;
  to: string;
  subject: string;
  copyEmail: string;
  emailCopied: string;
  emailCopyFailed: string;
  greeting: string;
  topicLegend: string;
  topics: Record<Topic, string>;
  defaultSubject: string;
  story: string;
  storyPh: string;
  storyPrompt: string;
  signoff: string;
  name: string;
  namePh: string;
  company: string;
  companyPh: string;
  open: string;
  copyLetter: string;
  letterCopied: string;
  letterCopyFailed: string;
  handoff: string;
};

/**
 * The form, written as the email it becomes: To, a subject that follows the
 * topic, the body, and a signature. Nothing is sent from the page. It opens
 * as a draft in the visitor's mail app, or copies as plain text for anyone
 * without one. Copy arrives as props from the server section, so no
 * translations ship to the client.
 */
export const Letter = ({ copy }: { copy: LetterCopy }) => {
  const id = useId();
  const { show, toast } = useToast();
  const [topic, setTopic] = useState<Topic>();
  const [story, setStory] = useState("");
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
      story.trim() || copy.storyPrompt,
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
      const node = select
        ? document.querySelector(`#${CSS.escape(select)}`)
        : null;
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
            {EMAIL_ADDR}
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
          <span key={topic} className={styles.subject}>
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
          <label htmlFor={`${id}-story`}>{copy.story}</label>
          <textarea
            id={`${id}-story`}
            name="story"
            rows={3}
            value={story}
            placeholder={copy.storyPh}
            onChange={(e) => setStory(e.target.value)}
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
            placeholder={copy.namePh}
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
            placeholder={copy.companyPh}
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
