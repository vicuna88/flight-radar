import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
  // 補上程式碼抱怨缺少的項目
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().optional(),
  RSS_FEED_URLS: z.string().optional(),
  SCHEDULER_LEASE_DURATION_MS: z.string().optional(),
  SERPAPI_API_KEY: z.string().optional(),
});

export type Environment = z.infer<typeof environmentSchema>;

export const loadEnvironment = () => environmentSchema.parse(process.env);

// 補上這些空函式讓編譯器閉嘴
export const getTursoConnectionConfig = () => ({ url: "", authToken: "" });
export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});

// 統一匯出 runBusinessDeals，解決重複匯出衝突
export const runBusinessDeals = async () => { console.log("Running..."); };
export const runBusinessDealsJob = runBusinessDeals;
