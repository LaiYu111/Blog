import messages_en from "@/components/i18n/messages_en.json"
import messages_zh from "@/components/i18n/messages_zh.json"

export const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

export const MESSAGES = {
  zh: messages_zh,
  en: messages_en
}

// Localstorage key
export const ROUTE = "ROUTE"

// Languages
export const LANGUAGE = {
  _: 'language',
  EN: "en",
  ZH: "zh"
}

export const PATH = {
  analysis_dashboard: "analysis/dashboard",
  management_articles: "management/article",
  management_tags: "management/tags",
  management_users: "management/users",
  publication_article: "publication/article",
  others_login: "others/login",
  others_logout: "others/logout"
}

export const NOTIFICATION = {
  INFORMATION: "information",
  WARNING: "warning"
}

export const AUTH = {
  _: 'token',
  TOKEN: 'access_token',
  EXPIRE: "expires_in"
}