export type TemplateId = "classic" | "modern" | "minimal";

export type SignatureFields = {
  company: string;
  site: string;
  color: string;
  logo: string;
  tagline: string;
  name: string;
  title: string;
  dept: string;
  phone: string;
  email: string;
  photo: string;
};

const INK = "#1D1D1B";
const BODY_COLOR = "#201F1B";
const BRONZE = "#896D2B";
const GRAY = "#8a8578";

function esc(s: string): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function urlify(u: string): string {
  if (!u) return "";
  return /^(https?:)?\/\//i.test(u) || /^data:/i.test(u) || /^\//.test(u) ? u : "https://" + u;
}

function link(href: string, txt: string, color: string): string {
  return `<a href="${esc(href)}" style="color:${color};text-decoration:none;">${txt}</a>`;
}

// forExport=false рендерить прев'ю (з плейсхолдер-логотипом, якщо свій ще не вказано);
// forExport=true — це той HTML, що йде в буфер обміну / поле "код", плейсхолдера там нема.
export function buildSignatureHtml(
  fields: SignatureFields,
  template: TemplateId,
  forExport: boolean,
  fallbackLogo: string
): string {
  const accent = fields.color.trim() || "#F9BF3C";
  const name = esc(fields.name.trim());
  const title = esc(fields.title.trim());
  const dept = esc(fields.dept.trim());
  const phone = fields.phone.trim();
  const email = fields.email.trim();
  const site = fields.site.trim();
  const company = esc(fields.company.trim());
  const tagline = esc(fields.tagline.trim());
  const logoField = fields.logo.trim();
  const photoField = fields.photo.trim();

  const logo = logoField ? urlify(logoField) : forExport ? "" : fallbackLogo;
  const photo = photoField ? urlify(photoField) : "";

  const siteHref = site ? urlify(site) : "";
  const siteText = esc(site.replace(/^https?:\/\//i, ""));
  const telHref = phone.replace(/[^\d+]/g, "");
  const roleLine = title + (title && dept ? ` <span style="color:${GRAY};">·</span> ` : "") + dept;

  let rows = "";
  if (phone) rows += `<div style="margin:2px 0;">${link("tel:" + telHref, esc(phone), BODY_COLOR)}</div>`;
  if (email) rows += `<div style="margin:2px 0;">${link("mailto:" + email, esc(email), BRONZE)}</div>`;
  if (site) rows += `<div style="margin:2px 0;">${link(siteHref, siteText, BODY_COLOR)}</div>`;

  if (template === "classic") {
    let top = "";
    if (photo) {
      top = `<tr><td style="padding-bottom:10px;"><img src="${esc(photo)}" alt="${company}" width="60" style="display:block;border:0;border-radius:50%;width:60px;height:60px;object-fit:cover;"></td></tr>`;
    } else if (logo) {
      top = `<tr><td style="padding-bottom:10px;"><img src="${esc(logo)}" alt="${company}" style="display:block;border:0;height:42px;width:auto;"></td></tr>`;
    }
    return (
      `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:${BODY_COLOR};font-size:14px;line-height:1.45;">` +
      top +
      `<tr><td style="border-top:3px solid ${esc(accent)};padding-top:10px;">` +
      `<div style="font-size:16px;font-weight:bold;color:${INK};">${name}</div>` +
      (roleLine ? `<div style="font-size:13px;color:${BRONZE};margin-top:2px;">${roleLine}</div>` : "") +
      `<div style="font-size:0;line-height:0;height:9px;">&nbsp;</div>${rows}` +
      (tagline ? `<div style="margin-top:9px;font-size:11px;color:${GRAY};font-style:italic;">${tagline}</div>` : "") +
      `</td></tr></table>`
    );
  }

  if (template === "modern") {
    return (
      `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:${BODY_COLOR};font-size:14px;line-height:1.45;"><tr>` +
      `<td style="width:4px;background:${esc(accent)};border-radius:3px;">&nbsp;</td>` +
      `<td style="padding-left:16px;vertical-align:top;">` +
      `<div style="font-size:17px;font-weight:bold;color:${INK};">${name}</div>` +
      (roleLine ? `<div style="font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:${BRONZE};margin-top:4px;">${roleLine}</div>` : "") +
      `<div style="font-size:0;line-height:0;height:10px;">&nbsp;</div>${rows}` +
      (logo && !photo ? `<div style="margin-top:11px;"><img src="${esc(logo)}" alt="${company}" style="display:block;border:0;height:32px;width:auto;"></div>` : "") +
      (tagline ? `<div style="margin-top:8px;font-size:11px;color:${GRAY};">${tagline}</div>` : "") +
      `</td></tr></table>`
    );
  }

  // minimal
  const contactLine = [
    phone ? link("tel:" + telHref, esc(phone), BODY_COLOR) : "",
    email ? link("mailto:" + email, esc(email), BRONZE) : "",
    site ? link(siteHref, siteText, BODY_COLOR) : "",
  ]
    .filter(Boolean)
    .join(` <span style="color:${GRAY};">|</span> `);

  return (
    `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:${BODY_COLOR};font-size:14px;line-height:1.5;"><tr><td style="vertical-align:top;">` +
    `<div><span style="font-weight:bold;color:${INK};">${name}</span>${company ? `<span style="color:${BRONZE};"> — ${company}</span>` : ""}</div>` +
    (roleLine ? `<div style="font-size:13px;color:${BODY_COLOR};">${roleLine}</div>` : "") +
    `<div style="font-size:0;line-height:0;height:7px;">&nbsp;</div>` +
    `<div style="font-size:13px;">${contactLine}</div>` +
    (logo && !photo ? `<div style="margin-top:10px;"><img src="${esc(logo)}" alt="${company}" style="display:block;border:0;height:26px;width:auto;"></div>` : "") +
    (tagline ? `<div style="margin-top:7px;font-size:11px;color:${GRAY};font-style:italic;">${tagline}</div>` : "") +
    `</td></tr></table>`
  );
}
