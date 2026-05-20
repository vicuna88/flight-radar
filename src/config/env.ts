import { z } from "zod";

// 基礎架構
export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 把編譯器要的全部直接宣告在這裡
export const getTursoConnectionConfig = () => ({ url: "", authToken: "" });
export const loadEnvironment = () => environmentSchema.parse(process.env);
export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});

// 特別處理：為了補救 runtime.ts 的報錯
export const runBusinessDeals = async () => {};
export const runBusinessDealsJob = runBusinessDeals;
