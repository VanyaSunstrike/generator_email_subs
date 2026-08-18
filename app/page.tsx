"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { DEFAULT_LOGO } from "@/lib/defaultLogo";
import { buildSignatureHtml, type SignatureFields, type TemplateId } from "@/lib/buildSignature";
import { LOCALES, translations, type Locale } from "@/lib/i18n";

const SWATCHES = ["#F9BF3C", "#896D2B", "#1D1D1B"];

const INITIAL_FIELDS: SignatureFields = {
  company: "ProCraft",
  site: "procraft.es",
  color: "#F9BF3C",
  logo: "https://generator-email-subs-b8gh.vercel.app/Logo_big.png",
  tagline: "",
  name: "Elena Cabrera",
  title: "Gerente de Ventas",
  dept: "Herramientas eléctricas",
  phone: "+34 91 123 45 67",
  email: "e.cabrera@procraft.es",
  photo: "",
};

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export default function Home() {
  const [fields, setFields] = useState<SignatureFields>(INITIAL_FIELDS);
  const [template, setTemplate] = useState<TemplateId>("classic");
  const [codeOpen, setCodeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>("es");

  const t = translations[locale];
  const TEMPLATES: { id: TemplateId; label: string }[] = [
    { id: "classic", label: t.templates.classic },
    { id: "modern", label: t.templates.modern },
    { id: "minimal", label: t.templates.minimal },
  ];

  const previewRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
  }, [locale, t.meta.title]);

  const previewHtml = useMemo(
    () => buildSignatureHtml(fields, template, false, DEFAULT_LOGO),
    [fields, template]
  );
  const exportHtml = useMemo(
    () => buildSignatureHtml(fields, template, true, DEFAULT_LOGO),
    [fields, template]
  );

  const pickerValue = HEX_RE.test(fields.color) ? fields.color : "#F9BF3C";

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  function set<K extends keyof SignatureFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function showToast(message: string) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1900);
  }

  function copyHtml() {
    navigator.clipboard
      .writeText(exportHtml)
      .then(() => showToast(t.toast.htmlCopied))
      .catch(() => {
        const el = codeRef.current;
        if (!el) return;
        el.select();
        document.execCommand("copy");
        showToast(t.toast.htmlCopied);
      });
  }

  function copyRich() {
    const done = () => showToast(t.toast.signatureCopied);
    const fallback = () => {
      const node = previewRef.current;
      if (!node) return;
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      try {
        document.execCommand("copy");
        done();
      } catch {
        showToast(t.toast.copyViaShowCode);
      }
      selection?.removeAllRanges();
    };

    if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
      const item = new ClipboardItem({
        "text/html": new Blob([previewHtml], { type: "text/html" }),
        "text/plain": new Blob([previewRef.current?.innerText ?? ""], { type: "text/plain" }),
      });
      navigator.clipboard.write([item]).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.top}>
        <div>
          <div className={styles.eyebrowRow}>
            <div className={styles.eyebrow}>{t.eyebrow}</div>
            <div className={styles.langSwitch}>
              {LOCALES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`${styles.langBtn} ${locale === l.id ? styles.langBtnActive : ""}`}
                  onClick={() => setLocale(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <h1 className={styles.h1}>
            {t.h1Prefix} <span className={styles.accent}>ProCraft</span>
          </h1>
        </div>
        <p className={styles.lead}>{t.lead}</p>
      </header>

      <div className={styles.grid}>
        <div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              {t.company.cardTitle} <span className={styles.tag}>{t.company.tag}</span>
            </h2>
            <div className={styles.field}>
              <label htmlFor="company">{t.company.companyLabel}</label>
              <input
                id="company"
                type="text"
                value={fields.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="site">{t.company.siteLabel}</label>
                <input
                  id="site"
                  type="text"
                  value={fields.site}
                  onChange={(e) => set("site", e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="color">{t.company.colorLabel}</label>
                <div className={styles.colorRow}>
                  <input
                    type="color"
                    value={pickerValue}
                    onChange={(e) => set("color", e.target.value)}
                  />
                  <input
                    id="color"
                    type="text"
                    value={fields.color}
                    onChange={(e) => set("color", e.target.value)}
                  />
                </div>
                <div className={styles.swatches}>
                  {SWATCHES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={c}
                      className={`${styles.sw} ${fields.color.toLowerCase() === c.toLowerCase() ? styles.swOn : ""}`}
                      style={{ background: c }}
                      onClick={() => set("color", c)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="logo">{t.company.logoLabel}</label>
              <input
                id="logo"
                type="text"
                placeholder={t.company.logoPlaceholder}
                value={fields.logo}
                onChange={(e) => set("logo", e.target.value)}
              />
            </div>
            <div className={styles.banner}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F9BF3C" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
              <div>
                {t.banner.before1} <b>{t.banner.bold1}</b>
                {t.banner.between} <b>procraft-logo.png</b> {t.banner.after}
              </div>
            </div>
            <div className={styles.field} style={{ marginTop: 14 }}>
              <label htmlFor="tagline">{t.company.taglineLabel}</label>
              <input
                id="tagline"
                type="text"
                placeholder={t.company.taglinePlaceholder}
                value={fields.tagline}
                onChange={(e) => set("tagline", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t.employee.cardTitle}</h2>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="name">{t.employee.nameLabel}</label>
                <input
                  id="name"
                  type="text"
                  value={fields.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="title">{t.employee.titleLabel}</label>
                <input
                  id="title"
                  type="text"
                  value={fields.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="dept">{t.employee.deptLabel}</label>
              <input
                id="dept"
                type="text"
                value={fields.dept}
                onChange={(e) => set("dept", e.target.value)}
              />
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="phone">{t.employee.phoneLabel}</label>
                <input
                  id="phone"
                  type="text"
                  value={fields.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">{t.employee.emailLabel}</label>
                <input
                  id="email"
                  type="text"
                  value={fields.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="photo">{t.employee.photoLabel}</label>
              <input
                id="photo"
                type="text"
                placeholder={t.employee.photoPlaceholder}
                value={fields.photo}
                onChange={(e) => set("photo", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t.templateCardTitle}</h2>
            <div className={styles.templates}>
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.tpl} ${template === t.id ? styles.tplActive : ""}`}
                  onClick={() => setTemplate(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.previewShell}>
          <div className={styles.card}>
            <div className={styles.previewHead}>
              <h2 className={styles.cardTitle}>{t.previewCardTitle}</h2>
            </div>
            <div className={styles.mailhint}>{t.mailhint}</div>
            <div
              className={styles.preview}
              ref={previewRef}
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />

            <div className={styles.actions}>
              <button type="button" className={`${styles.act} ${styles.primary}`} onClick={copyRich}>
                {t.actions.copyRich}
              </button>
              <button type="button" className={`${styles.act} ${styles.ghost}`} onClick={copyHtml}>
                {t.actions.copyHtml}
              </button>
              <button
                type="button"
                className={`${styles.act} ${styles.ghost}`}
                onClick={() => setCodeOpen((v) => !v)}
              >
                {codeOpen ? t.actions.hideCode : t.actions.showCode}
              </button>
            </div>

            <div className={`${styles.codeWrap} ${codeOpen ? styles.codeWrapOpen : ""}`}>
              <textarea
                ref={codeRef}
                className={styles.code}
                readOnly
                spellCheck={false}
                value={exportHtml}
              />
            </div>

            <p className={styles.note}>
              <b>{t.note.gmailBold}</b> {t.note.gmailText}
              <br />
              <b>{t.note.outlookBold}</b> {t.note.outlookText}
            </p>
          </div>
        </div>
      </div>

      <div className={`${styles.toast} ${toast ? styles.toastShow : ""}`}>{toast}</div>
    </div>
  );
}
