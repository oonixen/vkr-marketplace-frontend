/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FRONT_API_BASE_PATH: string
  readonly FRONT_BEARER: string
  readonly FRONT_RECAPTCHA_SITE_KEY: string
  readonly FRONT_RECAPTCHA_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}