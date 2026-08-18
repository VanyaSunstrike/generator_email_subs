export type Locale = "es" | "en" | "ru" | "uk";

export const LOCALES: { id: Locale; label: string }[] = [
  { id: "es", label: "ES" },
  { id: "en", label: "EN" },
  { id: "ru", label: "RU" },
  { id: "uk", label: "UK" },
];

export type Translations = {
  meta: { title: string; description: string };
  eyebrow: string;
  h1Prefix: string;
  lead: string;
  company: {
    cardTitle: string;
    tag: string;
    companyLabel: string;
    siteLabel: string;
    colorLabel: string;
    logoLabel: string;
    logoPlaceholder: string;
    taglineLabel: string;
    taglinePlaceholder: string;
  };
  banner: {
    before1: string;
    bold1: string;
    between: string;
    after: string;
  };
  employee: {
    cardTitle: string;
    nameLabel: string;
    titleLabel: string;
    deptLabel: string;
    phoneLabel: string;
    emailLabel: string;
    photoLabel: string;
    photoPlaceholder: string;
  };
  templateCardTitle: string;
  templates: { classic: string; modern: string; minimal: string };
  previewCardTitle: string;
  mailhint: string;
  actions: { copyRich: string; copyHtml: string; showCode: string; hideCode: string };
  note: { gmailBold: string; gmailText: string; outlookBold: string; outlookText: string };
  toast: { htmlCopied: string; signatureCopied: string; copyViaShowCode: string };
};

export const translations: Record<Locale, Translations> = {
  uk: {
    meta: {
      title: "ProCraft · Генератор підписів",
      description: "Генератор корпоративних email-підписів ProCraft",
    },
    eyebrow: "Корпоративні підписи",
    h1Prefix: "Підпис",
    lead: "Заповніть дані, оберіть шаблон і скопіюйте готовий підпис у Gmail чи Outlook. Логотип, кольори й стиль однакові для всіх галузей.",
    company: {
      cardTitle: "Компанія",
      tag: "спільне",
      companyLabel: "Назва компанії",
      siteLabel: "Вебсайт",
      colorLabel: "Акцентний колір",
      logoLabel: "URL логотипа (публічне посилання на картинку)",
      logoPlaceholder: "https://procraft.ua/img/logo.png",
      taglineLabel: "Слоган або дисклеймер (необов'язково)",
      taglinePlaceholder: "напр. Професійний інструмент для справжніх майстрів",
    },
    banner: {
      before1: "Логотип у прев'ю",
      bold1: "вбудовано лише для перегляду",
      between: ". Щоб він показувався в реальних листах, завантажте файл",
      after: "на сайт чи хостинг і вставте його URL у поле вище — Gmail та Outlook не показують вбудовані (data-URI) картинки.",
    },
    employee: {
      cardTitle: "Співробітник",
      nameLabel: "Ім'я та прізвище",
      titleLabel: "Посада",
      deptLabel: "Відділ / галузь",
      phoneLabel: "Телефон",
      emailLabel: "Email",
      photoLabel: "URL фото (необов'язково)",
      photoPlaceholder: "https://.../photo.jpg",
    },
    templateCardTitle: "Шаблон",
    templates: { classic: "Класичний", modern: "Сучасний", minimal: "Мінімальний" },
    previewCardTitle: "Попередній перегляд",
    mailhint: "Так підпис виглядатиме в листі ↓",
    actions: {
      copyRich: "Копіювати готовий підпис",
      copyHtml: "Копіювати HTML-код",
      showCode: "Показати код",
      hideCode: "Сховати код",
    },
    note: {
      gmailBold: "Gmail:",
      gmailText: "«Копіювати готовий підпис» → Налаштування → Підпис → вставити (Ctrl/Cmd+V).",
      outlookBold: "Outlook / інші:",
      outlookText: "зазвичай приймають «Копіювати готовий підпис». Якщо поле просить HTML — беріть «Копіювати HTML-код».",
    },
    toast: {
      htmlCopied: "HTML-код скопійовано",
      signatureCopied: "Підпис скопійовано",
      copyViaShowCode: "Скопіюйте через «Показати код»",
    },
  },
  en: {
    meta: {
      title: "ProCraft · Signature Generator",
      description: "ProCraft corporate email signature generator",
    },
    eyebrow: "Corporate Signatures",
    h1Prefix: "Signature",
    lead: "Fill in the details, choose a template, and copy the ready-made signature into Gmail or Outlook. The logo, colors, and style stay consistent across every department.",
    company: {
      cardTitle: "Company",
      tag: "shared",
      companyLabel: "Company name",
      siteLabel: "Website",
      colorLabel: "Accent color",
      logoLabel: "Logo URL (public link to an image)",
      logoPlaceholder: "https://procraft.com/img/logo.png",
      taglineLabel: "Tagline or disclaimer (optional)",
      taglinePlaceholder: "e.g. Professional tools for true craftsmen",
    },
    banner: {
      before1: "The logo shown in the preview is",
      bold1: "embedded for preview only",
      between: ". To make it appear in real emails, upload the file",
      after: "to your website or hosting, then paste its URL in the field above — Gmail and Outlook don't display embedded (data-URI) images.",
    },
    employee: {
      cardTitle: "Employee",
      nameLabel: "Full name",
      titleLabel: "Job title",
      deptLabel: "Department / field",
      phoneLabel: "Phone",
      emailLabel: "Email",
      photoLabel: "Photo URL (optional)",
      photoPlaceholder: "https://.../photo.jpg",
    },
    templateCardTitle: "Template",
    templates: { classic: "Classic", modern: "Modern", minimal: "Minimal" },
    previewCardTitle: "Preview",
    mailhint: "This is how the signature will look in an email ↓",
    actions: {
      copyRich: "Copy ready-made signature",
      copyHtml: "Copy HTML code",
      showCode: "Show code",
      hideCode: "Hide code",
    },
    note: {
      gmailBold: "Gmail:",
      gmailText: "“Copy ready-made signature” → Settings → Signature → paste (Ctrl/Cmd+V).",
      outlookBold: "Outlook / other apps:",
      outlookText: "usually accept “Copy ready-made signature”. If the field asks for HTML, use “Copy HTML code”.",
    },
    toast: {
      htmlCopied: "HTML code copied",
      signatureCopied: "Signature copied",
      copyViaShowCode: "Copy it via “Show code”",
    },
  },
  es: {
    meta: {
      title: "ProCraft · Generador de firmas",
      description: "Generador de firmas de correo corporativas ProCraft",
    },
    eyebrow: "Firmas corporativas",
    h1Prefix: "Firma",
    lead: "Complete los datos, elija una plantilla y copie la firma lista para usar en Gmail u Outlook. El logotipo, los colores y el estilo son iguales para todos los departamentos.",
    company: {
      cardTitle: "Empresa",
      tag: "compartido",
      companyLabel: "Nombre de la empresa",
      siteLabel: "Sitio web",
      colorLabel: "Color de acento",
      logoLabel: "URL del logotipo (enlace público a una imagen)",
      logoPlaceholder: "https://procraft.es/img/logo.png",
      taglineLabel: "Eslogan o descargo de responsabilidad (opcional)",
      taglinePlaceholder: "p. ej. Herramientas profesionales para verdaderos artesanos",
    },
    banner: {
      before1: "El logotipo que se muestra en la vista previa está",
      bold1: "incrustado solo para la vista previa",
      between: ". Para que aparezca en los correos reales, suba el archivo",
      after: "a su sitio web o hosting y pegue su URL en el campo de arriba — Gmail y Outlook no muestran imágenes incrustadas (data-URI).",
    },
    employee: {
      cardTitle: "Empleado",
      nameLabel: "Nombre y apellido",
      titleLabel: "Cargo",
      deptLabel: "Departamento / área",
      phoneLabel: "Teléfono",
      emailLabel: "Correo electrónico",
      photoLabel: "URL de la foto (opcional)",
      photoPlaceholder: "https://.../photo.jpg",
    },
    templateCardTitle: "Plantilla",
    templates: { classic: "Clásico", modern: "Moderno", minimal: "Minimalista" },
    previewCardTitle: "Vista previa",
    mailhint: "Así se verá la firma en un correo ↓",
    actions: {
      copyRich: "Copiar firma lista",
      copyHtml: "Copiar código HTML",
      showCode: "Mostrar código",
      hideCode: "Ocultar código",
    },
    note: {
      gmailBold: "Gmail:",
      gmailText: "«Copiar firma lista» → Configuración → Firma → pegar (Ctrl/Cmd+V).",
      outlookBold: "Outlook / otros:",
      outlookText: "normalmente aceptan «Copiar firma lista». Si el campo pide HTML, use «Copiar código HTML».",
    },
    toast: {
      htmlCopied: "Código HTML copiado",
      signatureCopied: "Firma copiada",
      copyViaShowCode: "Cópiela mediante «Mostrar código»",
    },
  },
  ru: {
    meta: {
      title: "ProCraft · Генератор подписей",
      description: "Генератор корпоративных email-подписей ProCraft",
    },
    eyebrow: "Корпоративные подписи",
    h1Prefix: "Подпись",
    lead: "Заполните данные, выберите шаблон и скопируйте готовую подпись в Gmail или Outlook. Логотип, цвета и стиль одинаковы для всех отделов.",
    company: {
      cardTitle: "Компания",
      tag: "общее",
      companyLabel: "Название компании",
      siteLabel: "Веб-сайт",
      colorLabel: "Акцентный цвет",
      logoLabel: "URL логотипа (публичная ссылка на изображение)",
      logoPlaceholder: "https://procraft.ru/img/logo.png",
      taglineLabel: "Слоган или дисклеймер (необязательно)",
      taglinePlaceholder: "напр. Профессиональный инструмент для настоящих мастеров",
    },
    banner: {
      before1: "Логотип в предпросмотре",
      bold1: "встроен только для просмотра",
      between: ". Чтобы он отображался в реальных письмах, загрузите файл",
      after: "на сайт или хостинг и вставьте его URL в поле выше — Gmail и Outlook не показывают встроенные (data-URI) изображения.",
    },
    employee: {
      cardTitle: "Сотрудник",
      nameLabel: "Имя и фамилия",
      titleLabel: "Должность",
      deptLabel: "Отдел / направление",
      phoneLabel: "Телефон",
      emailLabel: "Email",
      photoLabel: "URL фото (необязательно)",
      photoPlaceholder: "https://.../photo.jpg",
    },
    templateCardTitle: "Шаблон",
    templates: { classic: "Классический", modern: "Современный", minimal: "Минимальный" },
    previewCardTitle: "Предварительный просмотр",
    mailhint: "Так подпись будет выглядеть в письме ↓",
    actions: {
      copyRich: "Копировать готовую подпись",
      copyHtml: "Копировать HTML-код",
      showCode: "Показать код",
      hideCode: "Скрыть код",
    },
    note: {
      gmailBold: "Gmail:",
      gmailText: "«Копировать готовую подпись» → Настройки → Подпись → вставить (Ctrl/Cmd+V).",
      outlookBold: "Outlook / другие:",
      outlookText: "обычно принимают «Копировать готовую подпись». Если поле просит HTML — используйте «Копировать HTML-код».",
    },
    toast: {
      htmlCopied: "HTML-код скопирован",
      signatureCopied: "Подпись скопирована",
      copyViaShowCode: "Скопируйте через «Показать код»",
    },
  },
};
