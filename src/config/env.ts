import { z } from "zod";

// 1. 環境變數架構
export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 2. 補上所有「找不到的成員」
export const getTursoConnectionConfig = () => ({ url: "", authToken: "" });
export const loadEnvironment = () => environmentSchema.parse(process.env);
export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});

// 3. 補上讓 runtime.ts 能找到的出口
export const runBusinessDeals = async () => {
    console.log("Starting job...");
};
export const runBusinessDealsJob = runBusinessDeals;
