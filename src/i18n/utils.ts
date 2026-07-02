import { ui, defaultLang } from './ui';

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    // Return translation or fallback to default English
    return ui[lang]?.[key] || ui[defaultLang]?.[key] || (key as string);
  };
}

export function getLocalizedPath(pathname: string, targetLang: string) {
  // Remove trailing slashes for consistency
  let cleanPathname = pathname.replace(/\/$/, "");
  if (!cleanPathname.startsWith("/")) {
    cleanPathname = "/" + cleanPathname;
  }

  // Remove existing language prefix
  const parts = cleanPathname.split("/");
  // parts[0] is empty, parts[1] is the first segment (e.g. 'es' or 'pt')
  if (parts[1] === "es" || parts[1] === "pt") {
    parts.splice(1, 1);
  }
  const pathWithoutLang = parts.join("/");

  if (targetLang === "en") {
    return pathWithoutLang === "" ? "/" : pathWithoutLang;
  } else {
    return `/${targetLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
  }
}
