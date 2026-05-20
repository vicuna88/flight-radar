import { z } from "zod";

// 1. 定義環境變數架構
export const environmentSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_AUTH_TOKEN: z.string().min(1),
  DISCORD_WEBHOOK_URL: z.string().url(),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"), // 你想要的鄭州機場
  LIMIT_DAYS: z.coerce.number().int().positive().default(30),
});

export type Environment = z.infer<typeof environmentSchema>;

// 2. 這是程式碼強烈依賴的函式，之前缺了就是因為刪掉了這段
export interface TursoConnectionConfig {
  url: string;
  authToken: string;
}

export const getTursoConnectionConfig = (): TursoConnectionConfig => {
  return {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  };
};

export const loadEnvironment = (): Environment => {
  return environmentSchema.parse(process.env);
};

// 3. 保持原有的配置邏輯
export interface AppConfig {
  env: Environment;
  db: TursoConnectionConfig;
}

export const getConfig = (): AppConfig => {
  const env = loadEnvironment();
  return {
    env,
    db: getTursoConnectionConfig(),
  };
};
