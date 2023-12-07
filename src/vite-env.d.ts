/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_AWS_BUCKET_NAME: string;
  readonly VITE_AWS_REGION: string;
  readonly VITE_AWS_ACCESS_KEY: string;
  readonly VITE_AWS_SECRET_ACCESS_KEY: string;
}