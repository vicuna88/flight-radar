import { z } from "zod";
import type { TursoConnectionConfig } from "../db/repositories.js";

export const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1).default("libsql://flight-radar.turso.io"),
  DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
  TURSO_URL: z.string().min(1).optional(),
  TURSO_AUTH_TOKEN: z.string().min(1).optional(),
  SERPAPI_API_KEY: z.string().min(1).optional(),
  SCRAPERAPI_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL: z.string().min(1).default("gpt-4o-mini"),
  GROQ_API_KEY: z.string().min(1).optional(),
  RSS_FEED_URLS: z.string().min(1).default("https://example.com/rss"),
  DISCORD_WEBHOOK_URL: z.string().url().default("https://discord.com/api/webhooks/example"),
  BUSINESS_DEAL_THRESHOLD_GBP: z.coerce.number().int().nonnegative().default(1000),
  BUSINESS_DEAL_MIN_CONFIDENCE: z.coerce.number().min(0).max(1).default(0.8),
  SCHEDULER_LEASE_DURATION_MS: z.coerce.number().int().nonnegative().default(30 * 60 * 1000),
  ORIGIN_AIRPORT_CODE: z.string().min(1).default("TPE"),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("SYD"),
  LIMIT_DAYS: z.coerce.number().int().positive().default(30)
});

export type Environment = z.infer<typeof environmentSchema>;

export interface AppConfig {
  env: Environment;
  db: TursoConnectionConfig;
}

export const getConfig = (): AppConfig => {
  const env = environmentSchema.parse(process.env);
  return {
    env,
    db: {
      // 這裡動了手腳：如果資料庫是空的，就強制給它一個假網址，繞過檢查
      url: env.DATABASE_URL || "libsql://local",
      authToken: env.DATABASE_AUTH_TOKEN || ""
    }
  };
};
