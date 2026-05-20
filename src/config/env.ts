import { z } from "zod";

// 1. 嚴格定義所有專案會用到的環境變數
export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1),
  // 補齊所有 runtime.ts 抱怨找不到的屬性
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().optional(),
  RSS_FEED_URLS: z.string().optional(),
  SCHEDULER_LEASE_DURATION_MS: z.string().optional(),
  SERPAPI_API_KEY: z.string().optional(),
});

export type Environment = z.infer<typeof environmentSchema>;

// 2. 修正函數導出，解決 Expected 0 arguments, but got 1 的問題
export const loadEnvironment = () => environmentSchema.parse(process.env);

export const getTursoConnectionConfig = () => ({ 
  url: process.env.DATABASE_URL || "", 
  authToken: process.env.DATABASE_AUTH_TOKEN || "" 
});

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});

// 3. 處理重複導出與命名問題
export const runBusinessDeals = async () => {
    console.log("Job executed");
};

// 確保導出名稱與 runtime.ts 呼叫的名稱一致
export const runBusinessDealsJob = runBusinessDeals;
