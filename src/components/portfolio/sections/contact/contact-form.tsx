"use client";

import { useId, useState, type FormEvent } from "react";

import { EMAIL_ADDR } from "./data";

import styles from "./contact.module.css";

const FIELDS = ["name", "email", "subject", "message"] as const;
type Field = (typeof FIELDS)[number];

export type ContactFormCopy = Record<Field | `${Field}Ph` | "send", string>;

const AUTOCOMPLETE: Record<Field, string> = {
  name: "name",
  email: "email",
  subject: "off",
  message: "off",
};

const EMPTY: Record<Field, string> = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Hands off to the visitor's mail client: no backend for the handful of
 * messages this gets, and their own SMTP handles delivery. Copy arrives as
 * props from the server section, so no translations ship to the client.
 */
export const ContactForm = ({ copy }: { copy: ContactFormCopy }) => {
  const id = useId();
  const [form, setForm] = useState(EMPTY);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = [
      form.message,
      "",
      "--",
      form.name ? `From: ${form.name}` : null,
      `Reply: ${form.email}`,
    ]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href =
      `mailto:${EMAIL_ADDR}` +
      `?subject=${encodeURIComponent(form.subject.trim() || "Hi from your portfolio")}` +
      `&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      {FIELDS.map((field) => {
        const fieldId = `${id}-${field}`;
        const props = {
          id: fieldId,
          name: field,
          value: form[field],
          placeholder: copy[`${field}Ph`],
          required: field === "email" || field === "message",
          onChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => setForm((prev) => ({ ...prev, [field]: e.target.value })),
        };
        return (
          <div key={field} className={styles.field}>
            <label htmlFor={fieldId}>{copy[field]}</label>
            {field === "message" ? (
              <textarea rows={5} {...props} />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                autoComplete={AUTOCOMPLETE[field]}
                {...props}
              />
            )}
          </div>
        );
      })}
      <button type="submit" className="btn">
        {copy.send}
      </button>
    </form>
  );
};
