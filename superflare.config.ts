import { defineConfig } from "superflare";

export default defineConfig<Env>((ctx) => {
  return {
    appKey: ctx.env.APP_KEY,
    database: {
      default: ctx.env.DB,
    },
  };
});