import { z } from "zod";
import type { TursoConnectionConfig } from "../db/repositories.js";

export const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1).default("libsql://flight-radar.turso.io"), // 預設防止空白
  DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
  TURSO_URL: z.string().min(1).optional(),
  TURSO_AUTH_TOKEN: z.string().min(1).optional(),
  SERPAPI_API_KEY: z.string().min(1).optional(),
  SCRAPERAPI_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL: z.string().min(1).default("gpt-4o-mini"),
  GROQ_API_KEY: z.string().min(1).optional(),
  RSS_FEED_URLS: z.string().min(1).default("https://example.com/rss"), // 預設防止空白
  DISCORD_WEBHOOK_URL: z.string().url().default("https://discord.com/api/webhooks/example"), // 預設防止空白
  BUSINESS_DEAL_THRESHOLD_GBP: z.coerce.number().int().nonnegative().default(1000),
  BUSINESS_DEAL_MIN_CONFIDENCE: z.coerce.number().min(0).max(1).default(0.8),
  SCHEDULER_LEASE_DURATION_MS: z.coerce.number().int().nonnegative().default(30 * 60 * 1000),
  ORIGIN_AIRPORT_CODE: z.string().min(1).default("TPE"), // 直接把桃園寫在這裡
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("SYD"), // 直接把雪梨寫在這裡
  LIMIT_DAYS: z.coerce.number().int().positive().default(30) // 直接把30天寫在這裡
});

export type Environment = z.infer<typeof environmentSchema>;

export interface AppConfig {
  env: Environment;
  db: TursoConnectionConfig;
}

export const getConfig = (): AppConfig => {
  // 使用放寬後的環境變數，如果缺漏就帶入上面的 default 預設值
  const env = environmentSchema.parse(process.env);
  return {
    env,
    db: {
      url: env.DATABASE_URL,
      authToken: env.DATABASE_AUTH_TOKEN || ""
    }
  };
};
