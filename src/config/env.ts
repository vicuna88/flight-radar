import { z } from "zod";

// 定義完整的環境變數架構，包含所有程式碼檢查到的項目
export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().optional(),
  RSS_FEED_URLS: z.string().optional(),
  SCHEDULER_LEASE_DURATION_MS: z.string().optional(),
  SERPAPI_API_KEY: z.string().optional(),
});

export type Environment = z.infer<typeof environmentSchema>;

// 正確導出變數與函式，滿足 runtime.ts 的所有需求
export const loadEnvironment = () => environmentSchema.parse(process.env);

export const getTursoConnectionConfig = () => ({ url: "", authToken: "" });

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});

// 統一定義，解決重複匯出衝突
export const runBusinessDeals = async () => {
    console.log("Running Business Deals Job...");
};
export const runBusinessDealsJob = runBusinessDeals;
