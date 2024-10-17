/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL_PROD: string;
    readonly VITE_BASE_URL_DEV: string;
    readonly MODE: 'development' | 'production';
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
