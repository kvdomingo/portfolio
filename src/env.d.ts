/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "juxtaposejs/build/js/juxtapose.min.js";

interface ImportMeta {
  readonly PUBLIC_POSTHOG_TOKEN: string;
}

interface ImportMetaEnv {
  readonly env: ImportMeta;
}
